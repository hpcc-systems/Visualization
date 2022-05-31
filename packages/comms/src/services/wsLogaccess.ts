import { scopedLogger } from "@hpcc-js/util";
import { LogaccessServiceBase, WsLogaccess, LogAccessType, LogSelectColumnMode, LogAccessFilterOperator } from "./wsdl/ws_logaccess/v1.02/ws_logaccess";

const logger = scopedLogger("@hpcc-js/comms/services/wsLogaccess.ts");

export {
    WsLogaccess, LogAccessType
};

export enum KnownColumns {
    audience = "hpcc.log.audience",
    class = "hpcc.log.class",
    jobId = "hpcc.log.jobid",
    message = "hpcc.log.message",
    procId = "hpcc.log.procid",
    sequence = "hpcc.log.sequence",
    threadId = "hpcc.log.threadid",
    timestamp = "hpcc.log.timestamp",
    containerName = "kubernetes.container.name"
}

const RKnownColumns: { [key: string]: string } = {};
for (const key in KnownColumns) {
    if (KnownColumns.hasOwnProperty(key)) {
        RKnownColumns[KnownColumns[key]] = key;
    }
}

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

const defaultToLogLine = (line?: any): LogLine => {
    const retVal: LogLine = {};
    for (const key in RKnownColumns) {
        retVal[RKnownColumns[key]] = line?.fields[0][key];
    }
    return retVal;
};

export interface GetLogsExResponse {
    lines: LogLine[],
    total: number,
}

export class LogaccessService extends LogaccessServiceBase {

    GetLogAccessInfo(request: WsLogaccess.GetLogAccessInfoRequest): Promise<WsLogaccess.GetLogAccessInfoResponse> {
        return super.GetLogAccessInfo(request);
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
                            LogCategory: LogAccessType.All,
                        } as WsLogaccess.leftFilter,
                    } as WsLogaccess.BinaryLogFilter]
                }
            },
            Range: {
                StartDate: new Date(0).toISOString(),
            },
            LogLineStartFrom: request.LogLineStartFrom ?? 0,
            LogLineLimit: request.LogLineLimit ?? 100,
            SelectColumnMode: LogSelectColumnMode.DEFAULT,
            Format: "JSON"
        };

        const filters: WsLogaccess.leftFilter[] = [];
        for (const key in request) {
            if (key in KnownColumns) {
                filters.push({
                    LogCategory: LogAccessType.ByFieldName,
                    SearchField: KnownColumns[key],
                    SearchByValue: request[key]
                });
            }
        }

        let binaryLogFilter = getLogsRequest.Filter.leftBinaryFilter.BinaryLogFilter[0];
        filters.forEach((filter, i) => {
            if (i === 0) {
                binaryLogFilter.leftFilter = filter;
            } else if (i === filters.length - 1) {
                binaryLogFilter.Operator = LogAccessFilterOperator.AND;
                binaryLogFilter.rightFilter = filter;
            } else {
                binaryLogFilter.Operator = LogAccessFilterOperator.AND;
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

        return this.GetLogs(getLogsRequest).then(response => {
            try {
                const logLines = JSON.parse(response.LogLines);
                return {
                    lines: logLines.lines?.map(defaultToLogLine) ?? [],
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
