import { scopedLogger } from "@hpcc-js/util";
import { LogaccessServiceBase, WsLogaccess } from "./wsdl/ws_logaccess/v1.04/ws_logaccess";

const logger = scopedLogger("@hpcc-js/comms/services/wsLogaccess.ts");

export {
    WsLogaccess
};

export interface GetLogsExRequest {
    audience?: string;
    class?: string[];
    jobId?: string;
    message?: string;
    procId?: string;
    sequence?: string;
    threadId?: string;
    timestamp?: string;
    containerName?: string;
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

export interface LogLine {
    audience?: string;
    class?: string;
    jobId?: string;
    message?: string;
    procId?: number;
    sequence?: string;
    threadId?: number;
    timestamp?: string;
    containerName?: string;
}

enum ElasticKnownColumns {
    audience = "hpcc.log.audience",
    class = "hpcc.log.class",
    containerName = "kubernetes.container.name",
    jobId = "hpcc.log.jobid",
    message = "hpcc.log.message",
    procId = "hpcc.log.procid",
    sequence = "hpcc.log.sequence",
    threadId = "hpcc.log.threadid",
    timestamp = "hpcc.log.timestamp",
}

const RElasticKnownColumns: { [key: string]: string } = {};
for (const key in ElasticKnownColumns) {
    if (ElasticKnownColumns.hasOwnProperty(key)) {
        RElasticKnownColumns[ElasticKnownColumns[key]] = key;
    }
}

const elasticToLogLine = (line?: any): LogLine => {
    const retVal: LogLine = {};
    for (const key in RElasticKnownColumns) {
        retVal[RElasticKnownColumns[key]] = line?.fields[0][key];
    }
    return retVal;
};

enum AzureKnownColumns {
    audience = "hpcc_log_audience",      // #Target Audience
    class = "hpcc_log_class",            // #Log Entry type
    containerID = "ContainerID",
    containerName = "ContainerID",
    jobId = "hpcc_log_jobid",
    message = "hpcc_log_message",        // #The log message
    procId = "",
    sequence = "hpcc_log_sequence",
    threadId = "hpcc_log_threadid",
    timestamp = "hpcc_log_timestamp"
}

const RAzureKnownColumns: { [key: string]: string } = {};
for (const key in AzureKnownColumns) {
    if (AzureKnownColumns.hasOwnProperty(key)) {
        RAzureKnownColumns[AzureKnownColumns[key]] = key;
    }
}

const azureToLogLine = (line?: any): LogLine => {
    const retVal: LogLine = {};
    for (const key in RAzureKnownColumns) {
        retVal[RAzureKnownColumns[key]] = line?.fields[0][key] ?? "";
    }
    return retVal;
};

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
            switch (logInfo.RemoteLogManagerType) {
                case "azureloganalyticscurl":
                    if (key in AzureKnownColumns) {
                        searchField = AzureKnownColumns[key];
                    }
                    break;
                case "elasticstack":
                    if (key in ElasticKnownColumns) {
                        searchField = ElasticKnownColumns[key];
                    }
                    break;
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
                        lines = logLines.lines?.map(azureToLogLine) ?? [];
                        break;
                    case "elasticstack":
                        lines = logLines.lines?.map(elasticToLogLine) ?? [];
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
