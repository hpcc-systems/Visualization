import { Cache, exists, StateObject } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { DFUQuery } from "../services/wsDFU";
import { WorkunitsService, WUInfo, WUResult } from "../services/wsWorkunits";
import { parseXSD, XSDSchema, XSDXMLNode } from "./xsdParser";

export interface ECLResultEx extends WUInfo.ECLResult {
    Wuid: string;
    ResultName?: string;
    ResultSequence?: number;
    LogicalFileName?: string;
    ResultViews: any[];
}

export class Result extends StateObject<ECLResultEx & DFUQuery.DFULogicalFile, ECLResultEx | DFUQuery.DFULogicalFile> implements ECLResultEx {
    protected connection: WorkunitsService;
    protected xsdSchema: XSDSchema;

    get properties(): WUInfo.ECLResult { return this.get(); }
    get Wuid(): string { return this.get("Wuid"); }
    get ResultName(): string | undefined { return this.get("ResultName"); }
    get ResultSequence(): number | undefined { return this.get("ResultSequence"); }
    get LogicalFileName(): string | undefined { return this.get("LogicalFileName"); }
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

    constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuidOrLogicalFile: string, resultName?: string | number);
    constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, eclResult: WUInfo.ECLResult, resultViews: any[]);
    constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuidOrLogicalFile: string, eclResultOrResultName?: WUInfo.ECLResult | string | number, resultViews: any[] = []) {
        super();
        if (optsConnection instanceof WorkunitsService) {
            this.connection = optsConnection;
        } else {
            this.connection = new WorkunitsService(optsConnection);
        }
        if (typeof eclResultOrResultName === "undefined") {
            this.set({
                LogicalFileName: wuidOrLogicalFile
            } as ECLResultEx);
        } else if (typeof eclResultOrResultName === "string") {
            this.set({
                Wuid: wuidOrLogicalFile,
                ResultName: eclResultOrResultName,
                ResultViews: resultViews
            } as ECLResultEx);
        } else if (typeof eclResultOrResultName === "number") {
            this.set({
                Wuid: wuidOrLogicalFile,
                ResultSequence: eclResultOrResultName,
                ResultViews: resultViews
            } as ECLResultEx);
        } else {
            this.set({
                Wuid: wuidOrLogicalFile,
                ResultName: eclResultOrResultName.Name,
                ResultViews: resultViews,
                ...eclResultOrResultName
            });
        }
    }

    isComplete() {
        return this.Total !== -1;
    }

    fetchXMLSchema(): Promise<XSDSchema | null> {
        if (this.xsdSchema) {
            return Promise.resolve(this.xsdSchema);
        }
        return this.WUResult().then((response) => {
            if (exists("Result.XmlSchema.xml", response)) {
                this.xsdSchema = parseXSD(response.Result.XmlSchema.xml);
                return this.xsdSchema;
            }
            return null;
        });
    }

    refresh(): Promise<Result> {
        return this.fetchRows(0, 1, true).then(response => this);
    }

    fetchRows(from: number = 0, count: number = -1, includeSchema: boolean = false): Promise<any[]> {
        return this.WUResult(from, count, !includeSchema).then((response) => {
            this.set({
                ...response
            } as any);
            if (exists("Result.XmlSchema.xml", response)) {
                this.xsdSchema = parseXSD(response.Result.XmlSchema.xml);
            }
            if (exists("Result.Row", response)) {
                return response.Result.Row;
            } else if (this.ResultName && exists(`Result.${this.ResultName}`, response)) {
                return response.Result[this.ResultName].Row;
            }
            return [];
        });
    }

    rootField(): XSDXMLNode | null {
        if (!this.xsdSchema) return null;
        return this.xsdSchema.root;
    }

    fields(): XSDXMLNode[] {
        if (!this.xsdSchema) return [];
        return this.xsdSchema.root.children();
    }

    protected WUResult(start: number = 0, count: number = 1, suppressXmlSchema: boolean = false): Promise<WUResult.Response> {
        const request: WUResult.Request = {} as WUResult.Request;
        if (this.Wuid && this.ResultName !== undefined) {
            request.Wuid = this.Wuid;
            request.ResultName = this.ResultName;
        } else if (this.Wuid && this.ResultSequence !== undefined) {
            request.Wuid = this.Wuid;
            request.Sequence = this.ResultSequence;
        } else if (this.LogicalFileName && this.NodeGroup) {
            request.LogicalName = this.LogicalFileName;
            request.Cluster = this.NodeGroup;
        } else if (this.LogicalFileName) {
            request.LogicalName = this.LogicalFileName;
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
