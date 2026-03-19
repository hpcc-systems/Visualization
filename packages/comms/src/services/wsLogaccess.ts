import { scopedLogger } from "@hpcc-js/util";
import { LogaccessServiceBase, WsLogaccess } from "./wsdl/ws_logaccess/v1.08/ws_logaccess.ts";

const logger = scopedLogger("@hpcc-js/comms/services/wsLogaccess.ts");

export {
    WsLogaccess
};

export interface GetLogsExRequest {
    audience?: string;
    class?: string[];
    workunits?: string;
    message?: string;
    processid?: string;
    logid?: string;
    threadid?: string;
    timestamp?: string;
    components?: string;
    instance?: string;
    StartDate?: Date;
    EndDate?: Date;
    LogLineStartFrom: number,
    LogLineLimit: number
}

export const enum LogType {
    Disaster = "DIS",
    Error = "ERR",
    Warning = "WRN",
    Information = "INF",
    Progress = "PRO",
    Metric = "MET"
}

export const enum TargetAudience {
    Operator = "OPR",
    User = "USR",
    Programmer = "PRO",
    Audit = "ADT"
}

// properties here are "LogType" values in Ws_logaccess.GetLogAccessInfo
export interface LogLine {
    audience?: string;
    class?: string;
    workunits?: string;
    message?: string;
    processid?: number;
    logid?: string;
    threadid?: number;
    timestamp?: string;
    components?: string;
    instance?: string;
}

export interface GetLogsExResponse {
    lines: LogLine[],
    total: number,
}

const knownLogManagerTypes = new Set(["azureloganalyticscurl", "elasticstack", "grafanacurl"]);
const logColumnTypeValues = new Set(Object.values(WsLogaccess.LogColumnType));

function getLogCategory(searchField: string): WsLogaccess.LogAccessType {
    switch (searchField) {
        case WsLogaccess.LogColumnType.workunits:
        case "hpcc.log.jobid":
            return WsLogaccess.LogAccessType.ByJobID;
        case WsLogaccess.LogColumnType.audience:
        case "hpcc.log.audience":
            return WsLogaccess.LogAccessType.ByTargetAudience;
        case WsLogaccess.LogColumnType.class:
        case "hpcc.log.class":
            return WsLogaccess.LogAccessType.ByLogType;
        case WsLogaccess.LogColumnType.components:
        case "kubernetes.container.name":
            return WsLogaccess.LogAccessType.ByComponent;
        default:
            return WsLogaccess.LogAccessType.ByFieldName;
    }
}

// Explicit list of filter-bearing keys on GetLogsExRequest.
// Using an allowlist avoids accidentally treating control fields (StartDate, LogLineLimit, etc.)
// as log filters if the server ever returns a column whose name collides with them.
const FILTER_KEYS = ["audience", "class", "workunits", "message", "processid", "logid", "threadid", "timestamp", "components", "instance"] as const;

function buildFilters(request: GetLogsExRequest, columnMap: Record<string, string>): WsLogaccess.leftFilter[] {
    const filters: WsLogaccess.leftFilter[] = [];
    for (const key of FILTER_KEYS) {
        const value = request[key];
        if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) {
            continue;
        }
        if (!(key in columnMap)) continue;

        const isKnownLogType = logColumnTypeValues.has(key as WsLogaccess.LogColumnType);
        let searchField: string = isKnownLogType ? key : columnMap[key];
        const logCategory = getLogCategory(searchField);
        if (logCategory === WsLogaccess.LogAccessType.ByFieldName) {
            searchField = columnMap[key];
        }

        const appendWildcard = logCategory === WsLogaccess.LogAccessType.ByComponent;
        const rawValues: string[] = Array.isArray(value) ? value : [value as string];
        for (const raw of rawValues) {
            filters.push({
                LogCategory: logCategory,
                SearchField: searchField,
                // append wildcard to end of search value to include ephemeral
                // containers that aren't listed in ECL Watch's filters
                SearchByValue: appendWildcard ? raw + "*" : raw
            });
        }
    }
    return filters;
}

// Builds a left-leaning OR chain from filters that share the same SearchField.
function buildOrGroup(group: WsLogaccess.leftFilter[]): WsLogaccess.BinaryLogFilter {
    const root: WsLogaccess.BinaryLogFilter = { leftFilter: group[0] } as WsLogaccess.BinaryLogFilter;
    let node = root;
    for (let i = 1; i < group.length; i++) {
        node.Operator = WsLogaccess.LogAccessFilterOperator.OR;
        if (i === group.length - 1) {
            node.rightFilter = group[i] as WsLogaccess.rightFilter;
        } else {
            node.rightBinaryFilter = { BinaryLogFilter: [{ leftFilter: group[i] } as WsLogaccess.BinaryLogFilter] };
            node = node.rightBinaryFilter.BinaryLogFilter[0];
        }
    }
    return root;
}

// Recursively AND-chains two or more groups into a BinaryLogFilter (used for nesting beyond depth 1).
function buildAndChain(groups: WsLogaccess.leftFilter[][]): WsLogaccess.BinaryLogFilter {
    const [firstGroup, ...remainingGroups] = groups;
    const node: WsLogaccess.BinaryLogFilter = {} as WsLogaccess.BinaryLogFilter;
    if (firstGroup.length === 1) {
        node.leftFilter = firstGroup[0];
    } else {
        node.leftBinaryFilter = { BinaryLogFilter: [buildOrGroup(firstGroup)] };
    }
    if (remainingGroups.length === 0) return node;
    node.Operator = WsLogaccess.LogAccessFilterOperator.AND;
    if (remainingGroups.length === 1) {
        const [secondGroup] = remainingGroups;
        if (secondGroup.length === 1) {
            node.rightFilter = secondGroup[0] as WsLogaccess.rightFilter;
        } else {
            node.rightBinaryFilter = { BinaryLogFilter: [buildOrGroup(secondGroup)] };
        }
    } else {
        node.rightBinaryFilter = { BinaryLogFilter: [buildAndChain(remainingGroups)] };
    }
    return node;
}

// Groups filters by SearchField, OR-chains each group, then AND-chains the groups together.
// This ensures e.g. [class_INF, class_ERR, audience_USR] always produces
// (class_INF OR class_ERR) AND audience_USR regardless of input order.
function buildFilterTree(filters: WsLogaccess.leftFilter[]): WsLogaccess.Filter {
    const groupMap = new Map<string, WsLogaccess.leftFilter[]>();
    for (const f of filters) {
        const existing = groupMap.get(f.SearchField);
        if (existing) existing.push(f); else groupMap.set(f.SearchField, [f]);
    }
    const groups = [...groupMap.values()];

    if (groups.length === 0) {
        return { leftFilter: { LogCategory: WsLogaccess.LogAccessType.All } as WsLogaccess.leftFilter };
    }

    const [firstGroup, ...remainingGroups] = groups;
    const filter: WsLogaccess.Filter = {};
    if (firstGroup.length === 1) {
        filter.leftFilter = firstGroup[0];
    } else {
        filter.leftBinaryFilter = { BinaryLogFilter: [buildOrGroup(firstGroup)] };
    }

    if (remainingGroups.length === 0) return filter;
    filter.Operator = WsLogaccess.LogAccessFilterOperator.AND;
    if (remainingGroups.length === 1) {
        const [secondGroup] = remainingGroups;
        if (secondGroup.length === 1) {
            filter.rightFilter = secondGroup[0] as WsLogaccess.rightFilter;
        } else {
            filter.rightBinaryFilter = { BinaryLogFilter: [buildOrGroup(secondGroup)] };
        }
    } else {
        filter.rightBinaryFilter = { BinaryLogFilter: [buildAndChain(remainingGroups)] };
    }
    return filter;
}

export class LogaccessService extends LogaccessServiceBase {

    protected _logAccessInfo: Promise<WsLogaccess.GetLogAccessInfoResponse>;

    GetLogAccessInfo(request: WsLogaccess.GetLogAccessInfoRequest = {}): Promise<WsLogaccess.GetLogAccessInfoResponse> {
        if (!this._logAccessInfo) {
            this._logAccessInfo = super.GetLogAccessInfo(request);
        }
        return this._logAccessInfo;
    }

    GetLogs(request: WsLogaccess.GetLogsRequest): Promise<WsLogaccess.GetLogsResponse> {
        return super.GetLogs(request);
    }

    private convertLogLine(columnMap: Record<string, string>, line: any): LogLine {
        const retVal: LogLine = {};
        const fields = line?.fields ? Object.assign({}, ...line.fields) : null;
        for (const key in columnMap) {
            retVal[key] = fields ? fields[columnMap[key]] ?? "" : "";
        }
        return retVal;
    }

    async GetLogsEx(request: GetLogsExRequest): Promise<GetLogsExResponse> {
        const logInfo = await this.GetLogAccessInfo();
        const columnMap: Record<string, string> = {};
        logInfo.Columns.Column.forEach(column => columnMap[column.LogType] = column.Name);

        const filters = buildFilters(request, columnMap);
        const range: Record<string, string> = {
            StartDate: request.StartDate instanceof Date ? request.StartDate.toISOString() : new Date(0).toISOString()
        };
        if (request.EndDate instanceof Date) {
            range.EndDate = request.EndDate.toISOString();
        }

        const getLogsRequest: WsLogaccess.GetLogsRequest = {
            Filter: buildFilterTree(filters),
            Range: range,
            LogLineStartFrom: request.LogLineStartFrom ?? 0,
            LogLineLimit: request.LogLineLimit ?? 100,
            SelectColumnMode: WsLogaccess.LogSelectColumnMode.DEFAULT,
            Format: "JSON",
            SortBy: {
                SortCondition: [{
                    BySortType: WsLogaccess.SortColumType.ByDate,
                    ColumnName: "",
                    Direction: 0
                }]
            }
        };

        return this.GetLogs(getLogsRequest).then(response => {
            try {
                const logLines = JSON.parse(response.LogLines);
                const lines = knownLogManagerTypes.has(logInfo.RemoteLogManagerType)
                    ? (logLines.lines?.map((line: any) => this.convertLogLine(columnMap, line)) ?? [])
                    : (logger.warning(`Unknown RemoteLogManagerType: ${logInfo.RemoteLogManagerType}`), []);
                return {
                    lines,
                    total: response.TotalLogLinesAvailable ?? 10000
                };
            } catch (e: any) {
                logger.error(e.message ?? e);
            }
            return {
                lines: [],
                total: 0
            };
        });
    }
}
