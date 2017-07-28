import { Cache, StateObject, exists } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { DFUQuery } from "../services/wsDFU";
import { WorkunitsService, WUInfo, WUResult } from "../services/wsWorkunits";
import { parseXSD, XSDSchema } from "./xsdParser";

export interface ECLResultEx extends WUInfo.ECLResult {
    Wuid: string;
    ResultViews: any[];
}
export class Result extends StateObject<ECLResultEx & DFUQuery.DFULogicalFile, ECLResultEx | DFUQuery.DFULogicalFile> implements ECLResultEx {
    protected connection: WorkunitsService;
    protected xsdSchema: XSDSchema;

    get properties(): WUInfo.ECLResult { return this.get(); }
    get Wuid(): string { return this.get("Wuid"); }
    get Name(): string { return this.get("Name"); }
    get Sequence(): number { return this.get("Sequence"); }
    get Value(): string { return this.get("Value"); }
    get Link(): string { return this.get("Link"); }
    get FileName(): string { return this.get("FileName"); }
    get IsSupplied(): boolean { return this.get("IsSupplied"); }
    get ShowFileContent() { return this.get("ShowFileContent"); }
    get Total(): number { return this.get("Total"); }
    get ECLSchemas(): WUInfo.ECLSchemas { return this.get("ECLSchemas"); }
    get NodeGroup(): string { return this.get("NodeGroup"); }
    get ResultViews(): any[] { return this.get("ResultViews"); }
    get XmlSchema(): string { return this.get("XmlSchema"); }

    constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, eclResult: WUInfo.ECLResult, resultViews: any[]) {
        super();
        if (optsConnection instanceof WorkunitsService) {
            this.connection = optsConnection;
        } else {
            this.connection = new WorkunitsService(optsConnection);
        }
        this.set({
            Wuid: wuid,
            ResultViews: resultViews,
            ...eclResult
        });
    }

    isComplete() {
        return this.Total !== -1;
    }

    fetchXMLSchema(): Promise<XSDSchema> {
        if (this.xsdSchema) {
            return Promise.resolve(this.xsdSchema);
        }
        return this.WUResult().then((response) => {
            if (exists("Result.XmlSchema.xml", response)) {
                this.xsdSchema = parseXSD(response.Result.XmlSchema.xml);
                return this.xsdSchema;
            }
            return this;
        });
    }

    fetchRows(from: number = 0, to: number = -1): Promise<any[]> {
        return this.WUResult(from, to, true).then((response) => {
            if (exists("Result.Row", response)) {
                return response.Result.Row;
            }
            return [];
        });
    }

    protected WUResult(start: number = 0, count: number = 1, suppressXmlSchema: boolean = false): Promise<WUResult.Response> {
        const request: WUResult.Request = {} as WUResult.Request;
        if (this.Wuid && this.Sequence !== undefined) {
            request.Wuid = this.Wuid;
            request.Sequence = this.Sequence;
        } else if (this.Name && this.NodeGroup) {
            request.LogicalName = this.Name;
            request.Cluster = this.NodeGroup;
        } else if (this.Name) {
            request.LogicalName = this.Name;
        }
        request.Start = start;
        request.Count = count;
        request.SuppressXmlSchema = suppressXmlSchema;
        return this.connection.WUResult(request).then((response) => {
            return response;
        });
    }
}

export class ResultCache extends Cache<WUInfo.ECLResult, Result> {
    constructor() {
        super((obj) => {
            return Cache.hash([obj.Sequence, obj.Name, obj.FileName]);
        });
    }
}
