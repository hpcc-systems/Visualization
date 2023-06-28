import { Cache, StateObject, scopedLogger } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { EclService, IWsEclRequest, IWsEclResponse, IWsEclResult } from "../services/wsEcl";
import { WorkunitsService, WUQueryDetails } from "../services/wsWorkunits";
import { Topology } from "./topology";

const logger = scopedLogger("@hpcc-js/comms/ecl/query.ts");

export interface QueryEx extends WUQueryDetails.Response {
    BaseUrl: string;
}

class QueryCache extends Cache<QueryEx, Query> {
    constructor() {
        super((obj) => {
            return Cache.hash([obj.QueryId, obj.QuerySet]);
        });
    }
}
const _queries = new QueryCache();

export class Query extends StateObject<QueryEx, QueryEx> implements QueryEx {
    protected wsWorkunitsService: WorkunitsService;
    get BaseUrl() { return this.wsWorkunitsService.baseUrl; }
    protected topology: Topology;
    protected _requestSchema: IWsEclRequest;
    protected _responseSchema: IWsEclResponse;

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
            this.wsWorkunitsService = optsConnection;
        } else {
            this.wsWorkunitsService = new WorkunitsService(optsConnection);
        }
        this.topology = Topology.attach(this.wsWorkunitsService.opts());
        this.set({
            QuerySet: querySet,
            QueryId: queryID,
            ...queryDetails
        } as QueryEx);
    }

    static attach(optsConnection: IOptions | IConnection, querySet: string, queryId: string): Query {
        const retVal: Query = _queries.get({ BaseUrl: optsConnection.baseUrl, QuerySet: querySet, QueryId: queryId } as QueryEx, () => {
            return new Query(optsConnection, querySet, queryId);
        });
        return retVal;
    }

    private _eclService: Promise<EclService>;
    protected async wsEclService(): Promise<EclService | undefined> {
        if (!this._eclService) {
            this._eclService = this.topology.fetchServices({}).then(services => {
                for (const espServer of services?.TpEspServers?.TpEspServer ?? []) {
                    for (const binding of espServer?.TpBindings?.TpBinding ?? []) {
                        if (binding?.Service === "ws_ecl") {
                            const baseUrl = `${binding.Protocol}://${globalThis.location.hostname}:${binding.Port}`;
                            return new EclService({ baseUrl });
                        }
                    }
                }
                return undefined;
            });
        }
        return this._eclService;
    }

    private async fetchDetails(): Promise<void> {
        const queryDetails = await this.wsWorkunitsService.WUQueryDetails({
            QuerySet: this.QuerySet,
            QueryId: this.QueryId,
            IncludeStateOnClusters: true,
            IncludeSuperFiles: true,
            IncludeWsEclAddresses: true,
            CheckAllNodes: false
        });
        this.set({ ...queryDetails } as QueryEx);
    }

    private async fetchRequestSchema(): Promise<void> {
        const wsEclService = await this.wsEclService();
        try {
            this._requestSchema = await wsEclService?.requestJson(this.QuerySet, this.QueryId) ?? [];
        } catch (e) {
            //  See:  https://track.hpccsystems.com/browse/HPCC-29827
            logger.debug(e);
            this._requestSchema = [];
        }
    }

    private async fetchResponseSchema(): Promise<void> {
        const wsEclService = await this.wsEclService();
        try {
            this._responseSchema = await wsEclService?.responseJson(this.QuerySet, this.QueryId) ?? {};
        } catch (e) {
            //  See:  https://track.hpccsystems.com/browse/HPCC-29827
            logger.debug(e);
            this._responseSchema = {};
        }
    }

    private async fetchSchema(): Promise<void> {
        await Promise.all([this.fetchRequestSchema(), this.fetchResponseSchema()]);
    }

    fetchSummaryStats() {
        return this.wsWorkunitsService.WUQueryGetSummaryStats({ Target: this.QuerySet, QueryId: this.QueryId });
    }

    async submit(request: object): Promise<Array<{ [key: string]: object[] }>> {
        const wsEclService = await this.wsEclService();
        try {
            return wsEclService?.submit(this.QuerySet, this.QueryId, request).then(results => {
                for (const key in results) {
                    results[key] = results[key].Row;
                }
                return results;
            }) ?? [];
        } catch (e) {
            //  See:  https://track.hpccsystems.com/browse/HPCC-29827
            logger.debug(e);
            return [];
        }
    }

    async refresh(): Promise<this> {
        await Promise.all([
            this.fetchDetails(),
            this.fetchSchema()
        ]);
        return this;
    }

    requestFields(): IWsEclRequest {
        if (!this._requestSchema) return [];
        return this._requestSchema;
    }

    responseFields(): IWsEclResponse {
        if (!this._responseSchema) return {};
        return this._responseSchema;
    }

    resultNames(): string[] {
        const retVal: string[] = [];
        for (const key in this.responseFields()) {
            retVal.push(key);
        }
        return retVal;
    }

    resultFields(resultName: string): IWsEclResult {
        if (!this._responseSchema[resultName]) return [];
        return this._responseSchema[resultName];
    }
}
