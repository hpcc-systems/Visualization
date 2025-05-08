import { deepMixin, xml2json, XMLNode } from "@hpcc-js/util";
import { WsWorkunits, WorkunitsServiceBase } from "./wsdl/WsWorkunits/v2.02/WsWorkunits";
import { IConnection, IOptions } from "../connection";

/*
    Response structures generated via:
    * http://localhost:8010/WsWorkunits/WUInfo?reqjson_
    * http://localhost:8010/WsWorkunits/WUInfo?respjson_
    * http://json2ts.com/
*/

export {
    WsWorkunits
};

export enum WUStateID {
    Unknown = 0,
    Compiled,
    Running,
    Completed,
    Failed,
    Archived,
    Aborting,
    Aborted,
    Blocked,
    Submitted,
    Scheduled,
    Compiling,
    Wait,
    UploadingFiled,
    DebugPaused,
    DebugRunning,
    Paused,
    LAST,
    NotFound = 999
}

export namespace WUUpdate {
    export enum Action {
        Unknown = 0,
        Compile,
        Check,
        Run,
        ExecuteExisting,
        Pause,
        PauseNow,
        Resume,
        Debug,
        __size
    }
}
export function isECLResult(_: any): _ is WsWorkunits.ECLResult {
    return typeof (_ as WsWorkunits.ECLResult).Name === "string";
}

export function isWUQueryECLWorkunit(_: WsWorkunits.ECLWorkunit | WsWorkunits.Workunit): _ is WsWorkunits.ECLWorkunit {
    return (_ as WsWorkunits.ECLWorkunit).TotalClusterTime !== undefined;
}

export function isWUInfoWorkunit(_: WsWorkunits.ECLWorkunit | WsWorkunits.Workunit): _ is WsWorkunits.Workunit {
    return (_ as WsWorkunits.Workunit).StateEx !== undefined;
}
export class WorkunitsService extends WorkunitsServiceBase {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection);
    }

    Ping(): Promise<WsWorkunits.WsWorkunitsPingResponse> {
        return this._connection.send("Ping", {}, "json", false, undefined, "WsWorkunitsPingResponse").then((response) => {
            return { result: true };
        }).catch((e: Error) => {
            return { result: false, error: e };
        });
    }

    WUQuery(request: Partial<WsWorkunits.WUQuery> = {}, abortSignal?: AbortSignal): Promise<WsWorkunits.WUQueryResponse> {
        return this._connection.send("WUQuery", request, "json", false, abortSignal).then((response) => {
            return deepMixin({ Workunits: { ECLWorkunit: [] } }, response);
        });
    }

    WUInfo(_request: Partial<WsWorkunits.WUInfo>): Promise<WsWorkunits.WUInfoResponse> {
        const request: Partial<WsWorkunits.WUInfo> = {
            Wuid: "",
            TruncateEclTo64k: true,
            IncludeExceptions: false,
            IncludeGraphs: false,
            IncludeSourceFiles: false,
            IncludeResults: false,
            IncludeResultsViewNames: false,
            IncludeVariables: false,
            IncludeTimers: false,
            IncludeDebugValues: false,
            IncludeApplicationValues: false,
            IncludeWorkflows: false,
            IncludeXmlSchemas: false,
            IncludeResourceURLs: false,
            IncludeECL: false,
            IncludeHelpers: false,
            IncludeAllowedClusters: false,
            IncludeTotalClusterTime: false,
            IncludeServiceNames: false,
            SuppressResultSchemas: true,
            ..._request
        };
        return super.WUInfo(request);
    }

    WUCreate(): Promise<WsWorkunits.WUCreateResponse> {
        return super.WUCreate({});
    }

    WUUpdate(request: Partial<WsWorkunits.WUUpdate>): Promise<WsWorkunits.WUUpdateResponse> {
        return this._connection.send("WUUpdate", request, "json", true);
    }

    WUResubmit(request: WsWorkunits.WUResubmit): Promise<WsWorkunits.WUResubmitResponse> {
        this._connection.toESPStringArray(request, "Wuids");
        return super.WUResubmit(request);
    }

    WUAction(request: Partial<WsWorkunits.WUAction>): Promise<WsWorkunits.WUActionResponse> {
        (request as any).ActionType = request.WUActionType; //  v5.x compatibility
        return super.WUAction(request);
    }

    WUResult(request: Partial<WsWorkunits.WUResult>, abortSignal?: AbortSignal): Promise<WsWorkunits.WUResultResponse> {
        return this._connection.send("WUResult", request, "json", false, abortSignal);
    }

    WUFileEx(request: Partial<WsWorkunits.WUFile>): Promise<string> {
        return this._connection.send("WUFile", request, "text");
    }

    private _WUDetailsMetaPromise: Promise<WsWorkunits.WUDetailsMetaResponse>;
    WUDetailsMeta(request: WsWorkunits.WUDetailsMeta): Promise<WsWorkunits.WUDetailsMetaResponse> {
        if (!this._WUDetailsMetaPromise) {
            this._WUDetailsMetaPromise = super.WUDetailsMeta(request);
        }
        return this._WUDetailsMetaPromise;
    }

    WUCDebugEx(request: WsWorkunits.WUCDebug): Promise<XMLNode | null> {
        return this._connection.send("WUCDebug", request, undefined, undefined, undefined, "WUDebug").then((response) => {
            const retVal = xml2json(response.Result);
            const children = retVal.children();
            if (children.length) {
                return children[0];
            }
            return null;
        });
    }
}

export class WorkunitsServiceEx extends WorkunitsServiceBase {
    WUPublishWorkunitEx(request: Partial<WsWorkunits.WUPublishWorkunit>): Promise<WsWorkunits.WUPublishWorkunitResponse> {
        return this._connection.send("WUPublishWorkunit", request);
    }
}
