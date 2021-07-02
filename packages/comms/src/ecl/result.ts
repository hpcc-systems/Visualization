import { Cache, exists, StateObject } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { WsDfu } from "../services/wsDFU";
import { WorkunitsService, WUInfo, WUResult } from "../services/wsWorkunits";
import { parseXSD, XSDSchema, XSDXMLNode } from "./xsdParser";

export class GlobalResultCache extends Cache<{ BaseUrl: string, Wuid: string, ResultName: string }, Result> {
    constructor() {
        super((obj) => {
            return `${obj.BaseUrl}-${obj.Wuid}-${obj.ResultName}`;
        });
    }
}
const _results = new GlobalResultCache();

export type ResultFilter = { [key: string]: string | number };

export interface ECLResultEx extends WUInfo.ECLResult {
    Wuid: string;
    ResultName?: string;
    ResultSequence?: number;
    LogicalFileName?: string;
    NodeGroup?: string;
    ResultViews: string[];
}

export type UResulState = ECLResultEx & WsDfu.DFULogicalFile;
export type IResulState = ECLResultEx | WsDfu.DFULogicalFile;
export class Result extends StateObject<UResulState, IResulState> implements ECLResultEx {
    protected connection: WorkunitsService;
    get BaseUrl() { return this.connection.baseUrl; }
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
    get ResultViews(): string[] { return this.get("ResultViews"); }
    get XmlSchema(): string { return this.get("XmlSchema"); }

    static attach(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, name: string);
    static attach(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, sequence: number);
    static attach(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, eclResult: WUInfo.ECLResult, resultViews: string[]);
    static attach(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, name_sequence_eclResult?: string | number | WUInfo.ECLResult, resultViews?: string[]): Result {
        let retVal: Result;
        if (Array.isArray(resultViews)) {
            retVal = _results.get({ BaseUrl: optsConnection.baseUrl, Wuid: wuid, ResultName: (name_sequence_eclResult as WUInfo.ECLResult).Name }, () => {
                return new Result(optsConnection, wuid, name_sequence_eclResult as WUInfo.ECLResult, resultViews);
            });
        } else if (typeof resultViews === "undefined") {
            if (typeof name_sequence_eclResult === "number") {
                retVal = _results.get({ BaseUrl: optsConnection.baseUrl, Wuid: wuid, ResultName: "Sequence_" + name_sequence_eclResult }, () => {
                    return new Result(optsConnection, wuid, name_sequence_eclResult);
                });
            } else if (typeof name_sequence_eclResult === "string") {
                retVal = _results.get({ BaseUrl: optsConnection.baseUrl, Wuid: wuid, ResultName: name_sequence_eclResult }, () => {
                    return new Result(optsConnection, wuid, name_sequence_eclResult);
                });
            }
        }
        return retVal;
    }

    static attachLogicalFile(optsConnection: IOptions | IConnection | WorkunitsService, nodeGroup: string, logicalFile: string) {
        return _results.get({ BaseUrl: optsConnection.baseUrl, Wuid: nodeGroup, ResultName: logicalFile }, () => {
            return new Result(optsConnection, nodeGroup, logicalFile, true);
        });
    }

    private constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, name: string);
    private constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, sequence: number);
    private constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, eclResult: WUInfo.ECLResult, resultViews: any[]);
    private constructor(optsConnection: IOptions | IConnection | WorkunitsService, nodeGroup: string, logicalFile: string, isLogicalFiles: boolean);
    private constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuid_NodeGroup: string, name_sequence_eclResult_logicalFile?: string | number | WUInfo.ECLResult, resultViews_isLogicalFile?: any[] | boolean) {
        super();
        if (optsConnection instanceof WorkunitsService) {
            this.connection = optsConnection;
        } else {
            this.connection = new WorkunitsService(optsConnection);
        }

        if (typeof resultViews_isLogicalFile === "boolean" && resultViews_isLogicalFile === true) {
            this.set({
                NodeGroup: wuid_NodeGroup,
                LogicalFileName: name_sequence_eclResult_logicalFile
            } as ECLResultEx);
        } else if (Array.isArray(resultViews_isLogicalFile)) {
            this.set({
                Wuid: wuid_NodeGroup,
                ResultName: name_sequence_eclResult_logicalFile,
                ResultViews: resultViews_isLogicalFile
            } as ECLResultEx);
        } else if (typeof resultViews_isLogicalFile === "undefined") {
            if (typeof name_sequence_eclResult_logicalFile === "number") {
                this.set({
                    Wuid: wuid_NodeGroup,
                    ResultSequence: name_sequence_eclResult_logicalFile
                } as ECLResultEx);
            } else if (typeof name_sequence_eclResult_logicalFile === "string") {
                this.set({
                    Wuid: wuid_NodeGroup,
                    ResultName: name_sequence_eclResult_logicalFile
                } as ECLResultEx);
            }
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

    async refresh(): Promise<this> {
        await this.fetchRows(0, 1, true);
        return this;
    }

    fetchRows(from: number = 0, count: number = -1, includeSchema: boolean = false, filter: ResultFilter = {}, abortSignal?: AbortSignal): Promise<any[]> {
        return this.WUResult(from, count, !includeSchema, filter, abortSignal).then((response) => {
            const result = response.Result;
            delete response.Result; //  Do not want it in "set"
            this.set({
                ...response
            } as any);
            if (exists("XmlSchema.xml", result)) {
                this.xsdSchema = parseXSD(result.XmlSchema.xml);
            }
            if (exists("Row", result)) {
                return result.Row;
            } else if (this.ResultName && exists(this.ResultName, result)) {
                return result[this.ResultName].Row;
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

    protected WUResult(start: number = 0, count: number = 1, suppressXmlSchema: boolean = false, filter: { [key: string]: string | number } = {}, abortSignal?: AbortSignal): Promise<WUResult.Response> {
        const FilterBy = {
            NamedValue: {
                itemcount: 0
            }
        };
        for (const key in filter) {
            FilterBy.NamedValue[FilterBy.NamedValue.itemcount++] = {
                Name: key,
                Value: filter[key]
            };
        }
        const request: WUResult.Request = { FilterBy } as WUResult.Request;
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
        return this.connection.WUResult(request, abortSignal).then((response) => {
            return response;
        });
    }
}

export class ResultCache extends Cache<WUInfo.ECLResult, Result> {
    constructor() {
        super((obj) => {
            return Cache.hash([obj.Sequence, obj.Name, obj.Value, obj.FileName]);
        });
    }
}
