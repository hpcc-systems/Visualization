import { scopedLogger } from "@hpcc-js/util";
import { LogaccessServiceBase, WsLogaccess } from "./wsdl/ws_logaccess/v1.04/ws_logaccess";

const logger = scopedLogger("@hpcc-js/comms/services/wsLogaccess.ts");

export {
    WsLogaccess
};

export interface GetLogsExRequest {
    audience?: string;
    class?: string;
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
    Programmer = "PRO",
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

    GetLogsEx(request: GetLogsExRequest): Promise<GetLogsExResponse> {
        const getLogsRequest: WsLogaccess.GetLogsRequest = {
            Filter: {
                leftBinaryFilter: {
                    BinaryLogFilter: [{
                        leftFilter: {
                            LogCategory: WsLogaccess.LogAccessType.All,
                        } as WsLogaccess.leftFilter,
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
            if (key in ElasticKnownColumns) {
                filters.push({
                    LogCategory: WsLogaccess.LogAccessType.ByFieldName,
                    SearchField: ElasticKnownColumns[key],
                    SearchByValue: request[key]
                });
            }
        }

        let binaryLogFilter = getLogsRequest.Filter.leftBinaryFilter.BinaryLogFilter[0];
        filters.forEach((filter, i) => {
            if (i === 0) {
                binaryLogFilter.leftFilter = filter;
            } else if (i === filters.length - 1) {
                binaryLogFilter.Operator = WsLogaccess.LogAccessFilterOperator.AND;
                binaryLogFilter.rightFilter = filter;
            } else {
                binaryLogFilter.Operator = WsLogaccess.LogAccessFilterOperator.AND;
                binaryLogFilter.rightBinaryFilter = {
                    BinaryLogFilter: [{
                        leftFilter: filter
                    } as WsLogaccess.BinaryLogFilter]
                };
                binaryLogFilter = binaryLogFilter.rightBinaryFilter.BinaryLogFilter[0];
            }
        });

        if (request.StartDate && request.EndDate) {
            getLogsRequest.Range.StartDate = request.StartDate.toISOString();
            getLogsRequest.Range.EndDate = request.EndDate.toISOString();
        }

        return Promise.all([this.GetLogAccessInfo(), this.GetLogs(getLogsRequest)]).then(([info, response]) => {
            try {
                const logLines = JSON.parse(response.LogLines);
                let lines = [];
                switch (info.RemoteLogManagerType) {
                    case "azureloganalyticscurl":
                        lines = logLines.lines?.map(azureToLogLine) ?? [];
                        break;
                    case "elasticstack":
                        lines = logLines.lines?.map(elasticToLogLine) ?? [];
                        break;
                    default:
                        logger.warning(`Unknown RemoteLogManagerType: ${info.RemoteLogManagerType}`);
                        lines = [];
                }
                return {
                    lines: lines,
                    total: response.TotalLogLinesAvailable || 10000
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
