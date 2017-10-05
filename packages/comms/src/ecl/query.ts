import { AsyncCache, StateObject } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { EclService } from "../services/wsEcl";
import { WorkunitsService, WUQueryDetails } from "../services/wsWorkunits";
import { Topology } from "./topology";
import { Workunit } from "./workunit";
import { parseXSD, parseXSD2, XSDSchema, XSDXMLNode } from "./xsdParser";

export interface QueryEx extends WUQueryDetails.Response {
}

class QueryCache extends AsyncCache<QueryEx, Query> {
    constructor() {
        super((obj) => {
            return AsyncCache.hash([obj.QueryId, obj.QuerySet]);
        });
    }
}
const _queries = new QueryCache();

export class Query extends StateObject<QueryEx, QueryEx> implements QueryEx {
    protected connection: WorkunitsService;
    protected _topology: Topology;
    protected _wsEcl: EclService;
    protected _wu: Workunit;
    protected _requestSchema: XSDSchema;
    protected _resultNames: string[] = [];
    protected _resultSchemas: { [resultName: string]: XSDSchema } = {};

    get properties(): WUQueryDetails.Response { return this.get(); }
    get Exceptions(): WUQueryDetails.Exceptions { return this.get("Exceptions"); }
    get QueryId(): string { return this.get("QueryId"); }
    get QuerySet(): string { return this.get("QuerySet"); }
    get QueryName(): string { return this.get("QueryName"); }
    get Wuid(): string { return this.get("Wuid"); }
    get Dll(): string { return this.get("Dll"); }
    get Suspended(): boolean { return this.get("Suspended"); }
    get Activated(): boolean { return this.get("Activated"); }
    get SuspendedBy(): string { return this.get("SuspendedBy"); }
    get Clusters(): WUQueryDetails.Clusters { return this.get("Clusters"); }
    get PublishedBy(): string { return this.get("PublishedBy"); }
    get Comment() { return this.get("Comment"); }
    get LogicalFiles(): WUQueryDetails.LogicalFiles { return this.get("LogicalFiles"); }
    get SuperFiles(): WUQueryDetails.SuperFiles { return this.get("SuperFiles"); }
    get IsLibrary(): boolean { return this.get("IsLibrary"); }
    get Priority(): string { return this.get("Priority"); }
    get WUSnapShot(): string { return this.get("WUSnapShot"); }
    get CompileTime(): string { return this.get("CompileTime"); }
    get LibrariesUsed(): WUQueryDetails.LibrariesUsed { return this.get("LibrariesUsed"); }
    get CountGraphs(): number { return this.get("CountGraphs"); }
    get ResourceURLCount(): number { return this.get("ResourceURLCount"); }
    get WsEclAddresses(): WUQueryDetails.WsEclAddresses { return this.get("WsEclAddresses"); }
    get WUGraphs(): WUQueryDetails.WUGraphs { return this.get("WUGraphs"); }
    get WUTimers(): WUQueryDetails.WUTimers { return this.get("WUTimers"); }

    private constructor(optsConnection: IOptions | IConnection | WorkunitsService, querySet: string, queryID: string, queryDetails?: WUQueryDetails.Response) {
        super();
        if (optsConnection instanceof WorkunitsService) {
            this.connection = optsConnection;
            this._topology = new Topology(this.connection.opts());
        } else {
            this.connection = new WorkunitsService(optsConnection);
            this._topology = new Topology(optsConnection);
        }
        this.set({
            QuerySet: querySet,
            QueryId: queryID,
            ...queryDetails
        } as QueryEx);
    }

    static async attach(optsConnection: IOptions | IConnection, querySet: string, queryId: string): Promise<Query> {
        let newQuery: Query | undefined;
        const retVal: Query = await _queries.get({ QuerySet: querySet, QueryId: queryId } as WUQueryDetails.Response, async () => {
            newQuery = new Query(optsConnection, querySet, queryId);
            await Promise.all([newQuery.refresh(), newQuery.resolveWsEcl()]);
            await Promise.all([newQuery.fetchRequestSchema(), newQuery.fetchResponseSchemas()]);
            return newQuery;
        });
        return retVal;
    }

    private async resolveWsEcl() {
        const baseUrl = await this._topology.GetESPServiceBaseURL("ws_ecl");
        this._wsEcl = new EclService({ baseUrl });
    }

    private async fetchResultNames(): Promise<string[]> {
        const results = await this._wu.fetchResults();
        this._resultNames = results.map(result => result.Name);
        return this._resultNames;
    }

    private async fetchRequestSchema(): Promise<void> {
        const response = await this._wsEcl.requestSchema(this.QuerySet, this.QueryId);
        this._requestSchema = parseXSD2(response, `${this.QueryId}Request`);
    }

    private async fetchResponseSchema(resultName: string): Promise<void> {
        const response = await this._wsEcl.responseSchema(this.QuerySet, this.QueryId, resultName);
        this._resultSchemas[resultName] = parseXSD(response);
    }

    private async fetchResponseSchemas(): Promise<void> {
        const resultNames = await this.fetchResultNames();
        await Promise.all(resultNames.map(resultName => {
            return this.fetchResponseSchema(resultName);
        }));
        return;
    }

    submit(request: object): Promise<Array<{ [key: string]: object[] }>> {
        return this._wsEcl.submit(this.QuerySet, this.QueryId, request).then(results => {
            for (const key in results) {
                results[key] = results[key].Row;
            }
            return results;
        });
    }

    async refresh(): Promise<this> {
        await this.WUQueryDetails();
        this._wu = Workunit.attach(this.connection.opts(), this.Wuid);
        return this;
    }

    requestFields(): XSDXMLNode[] {
        if (!this._requestSchema) return [];
        return this._requestSchema.root.children();
    }

    resultNames(): string[] {
        return this._resultNames;
    }

    fields(resultName: string): XSDXMLNode[] {
        if (!this._resultSchemas[resultName]) return [];
        return this._resultSchemas[resultName].root.children();
    }

    protected WUQueryDetails(): Promise<WUQueryDetails.Response> {
        const request: WUQueryDetails.Request = {} as WUQueryDetails.Request;
        request.QueryId = this.QueryId;
        request.QuerySet = this.QuerySet;
        request.IncludeSuperFiles = true;
        request.IncludeStateOnClusters = true;
        return this.connection.WUQueryDetails(request).then((response) => {
            this.set(response);
            return response;
        });
    }
}
