import { scopedLogger } from "@hpcc-js/util";
import { LogaccessServiceBase, WsLogaccess } from "./wsdl/ws_logaccess/v1.04/ws_logaccess";

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
    Programmer = "PRG",
    Audit = "ADT"
}

//properties here are "LogType" values in Ws_logaccess.GetLogAccessInfo
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
}

export interface GetLogsExResponse {
    lines: LogLine[],
    total: number,
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

    async GetLogsEx(request: GetLogsExRequest): Promise<GetLogsExResponse> {
        const logInfo = await this.GetLogAccessInfo();
        const columnMap = {};
        logInfo.Columns.Column.forEach(column => columnMap[column.LogType] = column.Name);

        const convertLogLine = (line: any) => {
            const retVal: LogLine = {};
            for (const key in columnMap) {
                retVal[key] = line?.fields[0][columnMap[key]] ?? "";
            }
            return retVal;
        };

        const getLogsRequest: WsLogaccess.GetLogsRequest = {
            Filter: {
                leftBinaryFilter: {
                    BinaryLogFilter: [{
                        leftFilter: {
                            LogCategory: WsLogaccess.LogAccessType.All,
                        },
                    } as WsLogaccess.BinaryLogFilter]
                }
            },
            Range: {
                StartDate: new Date(0).toISOString(),
            },
            LogLineStartFrom: request.LogLineStartFrom ?? 0,
            LogLineLimit: request.LogLineLimit ?? 100,
            SelectColumnMode: WsLogaccess.LogSelectColumnMode.DEFAULT,
            Format: "JSON"
        };

        const filters: WsLogaccess.leftFilter[] = [];
        for (const key in request) {
            let searchField;
            if (key in columnMap) {
                searchField = columnMap[key];
            }
            if (searchField) {
                if (Array.isArray(request[key])) {
                    request[key].forEach(value => {
                        filters.push({
                            LogCategory: WsLogaccess.LogAccessType.ByFieldName,
                            SearchField: searchField,
                            SearchByValue: value
                        });
                    });
                } else {
                    filters.push({
                        LogCategory: WsLogaccess.LogAccessType.ByFieldName,
                        SearchField: searchField,
                        SearchByValue: request[key]
                    });
                }
            }
        }

        if (filters.length > 2) {
            let binaryLogFilter = getLogsRequest.Filter.leftBinaryFilter.BinaryLogFilter[0];
            filters.forEach((filter, i) => {
                let operator = WsLogaccess.LogAccessFilterOperator.AND;
                if (i > 0) {
                    if (filters[i - 1].SearchField === filter.SearchField) {
                        operator = WsLogaccess.LogAccessFilterOperator.OR;
                    }
                    if (i === filters.length - 1) {
                        binaryLogFilter.Operator = operator;
                        binaryLogFilter.rightFilter = filter as WsLogaccess.rightFilter;
                    } else {
                        binaryLogFilter.Operator = operator;
                        binaryLogFilter.rightBinaryFilter = {
                            BinaryLogFilter: [{
                                leftFilter: filter
                            } as WsLogaccess.BinaryLogFilter]
                        };
                        binaryLogFilter = binaryLogFilter.rightBinaryFilter.BinaryLogFilter[0];
                    }
                } else {
                    binaryLogFilter.leftFilter = filter as WsLogaccess.leftFilter;
                }
            });
        } else {
            delete getLogsRequest.Filter.leftBinaryFilter;
            getLogsRequest.Filter.leftFilter = {
                LogCategory: WsLogaccess.LogAccessType.All
            } as WsLogaccess.leftFilter;
            if (filters[0]?.SearchField) {
                getLogsRequest.Filter.leftFilter = {
                    LogCategory: filters[0]?.LogCategory,
                    SearchField: filters[0]?.SearchField,
                    SearchByValue: filters[0]?.SearchByValue
                };
            }
            if (filters[1]?.SearchField) {
                getLogsRequest.Filter.Operator = WsLogaccess.LogAccessFilterOperator.AND;
                if (filters[0].SearchField === filters[1].SearchField) {
                    getLogsRequest.Filter.Operator = WsLogaccess.LogAccessFilterOperator.OR;
                }
                getLogsRequest.Filter.rightFilter = {
                    LogCategory: filters[0]?.LogCategory,
                    SearchField: filters[1]?.SearchField,
                    SearchByValue: filters[1]?.SearchByValue
                };
            }
        }

        if (request.StartDate) {
            getLogsRequest.Range.StartDate = request.StartDate.toISOString();
        }
        if (request.EndDate) {
            getLogsRequest.Range.EndDate = request.EndDate.toISOString();
        }

        return this.GetLogs(getLogsRequest).then(response => {
            try {
                const logLines = JSON.parse(response.LogLines);
                let lines = [];
                switch (logInfo.RemoteLogManagerType) {
                    case "azureloganalyticscurl":
                    case "elasticstack":
                        lines = logLines.lines?.map(convertLogLine) ?? [];
                        break;
                    default:
                        logger.warning(`Unknown RemoteLogManagerType: ${logInfo.RemoteLogManagerType}`);
                        lines = [];
                }
                return {
                    lines: lines,
                    total: response.TotalLogLinesAvailable ?? 10000
                };
            } catch (e) {
                logger.error(e);
            }
            return {
                lines: [],
                total: 0
            };
        });
    }
}
