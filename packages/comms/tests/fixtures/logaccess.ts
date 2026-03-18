import { WsLogaccess } from "@hpcc-js/comms";

export const elkInfo = {
    "Columns": {
        "Column": [
            {
                "Name": "message",
                "LogType": "global",
                "ColumnMode": "ALL",
                "ColumnType": "string"
            },
            {
                "Name": "hpcc.log.jobid",
                "LogType": "workunits",
                "ColumnMode": "DEFAULT",
                "ColumnType": "string"
            },
            {
                "Name": "kubernetes.container.name",
                "LogType": "components",
                "ColumnMode": "MIN",
                "ColumnType": "string"
            },
            {
                "Name": "hpcc.log.audience",
                "LogType": "audience",
                "EnumeratedValues": {
                    "Item": [
                        "OPR",
                        "USR",
                        "PRO",
                        "MON",
                        "ADT"
                    ]
                },
                "ColumnMode": "DEFAULT",
                "ColumnType": "enum"
            },
            {
                "Name": "hpcc.log.class",
                "LogType": "class",
                "EnumeratedValues": {
                    "Item": [
                        "DIS",
                        "ERR",
                        "WRN",
                        "INF",
                        "PRO",
                        "EVT",
                        "MET"
                    ]
                },
                "ColumnMode": "DEFAULT",
                "ColumnType": "enum"
            },
            {
                "Name": "container.id",
                "LogType": "instance",
                "ColumnMode": "ALL",
                "ColumnType": "string"
            },
            {
                "Name": "kubernetes.node.hostname",
                "LogType": "node",
                "ColumnMode": "ALL",
                "ColumnType": "string"
            },
            {
                "Name": "hpcc.log.message",
                "LogType": "message",
                "ColumnMode": "MIN",
                "ColumnType": "string"
            },
            {
                "Name": "hpcc.log.sequence",
                "LogType": "logid",
                "ColumnMode": "DEFAULT",
                "ColumnType": "numeric"
            },
            {
                "Name": "hpcc.log.procid",
                "LogType": "processid",
                "ColumnMode": "DEFAULT",
                "ColumnType": "numeric"
            },
            {
                "Name": "hpcc.log.threadid",
                "LogType": "threadid",
                "ColumnMode": "DEFAULT",
                "ColumnType": "numeric"
            },
            {
                "Name": "hpcc.log.timestamp",
                "LogType": "timestamp",
                "ColumnMode": "MIN",
                "ColumnType": "datetime"
            },
            {
                "Name": "kubernetes.pod.name",
                "LogType": "pod",
                "ColumnMode": "DEFAULT",
                "ColumnType": "string"
            },
            {
                "Name": "hpcc.log.traceid",
                "LogType": "traceid",
                "ColumnMode": "DEFAULT",
                "ColumnType": "string"
            },
            {
                "Name": "hpcc.log.spanid",
                "LogType": "spanid",
                "ColumnMode": "DEFAULT",
                "ColumnType": "string"
            }
        ]
    },
    "RemoteLogManagerType": "elasticstack",
    "RemoteLogManagerConnectionString": "http://elasticsearch-master.default.svc.cluster.local:9200/",
    "SupportsResultPaging": true
} as unknown as WsLogaccess.GetLogAccessInfoResponse;

export const elkLogs: Partial<WsLogaccess.GetLogsResponse> = {
    "LogLines": JSON.stringify({
        lines: [{
            "fields": [{
                "hpcc.log.procid": "39",
                "hpcc.log.message": "Compile request processing for workunit W20260318-215244",
                "timestamp": "2026-03-18T21:52:45.002Z",
                "kubernetes.container.name": "myeclccserver",
                "hpcc.log.timestamp": "2026-03-18 21:52:45.002",
                "hpcc.log.sequence": "0000013A",
                "kubernetes.pod.name": "myeclccserver-658575f5d9-5tbd9",
                "hpcc.log.audience": "PRG",
                "hpcc.log.class": "INF",
                "hpcc.log.threadid": "9552",
                "hpcc.log.jobid": "W20260318-215244"
            }]
        }, {
            "fields": [{
                "hpcc.log.procid": "39",
                "hpcc.log.message": "compile: Creating PIPE program process : 'kubectl replace --force -f -' - hasinput=1, hasoutput=1 stderrbufsize=1048576 [] in (.)",
                "timestamp": "2026-03-18T21:52:45.013Z",
                "kubernetes.container.name": "myeclccserver",
                "hpcc.log.timestamp": "2026-03-18 21:52:45.013",
                "hpcc.log.sequence": "0000013B",
                "kubernetes.pod.name": "myeclccserver-658575f5d9-5tbd9",
                "hpcc.log.audience": "USR",
                "hpcc.log.class": "PRO",
                "hpcc.log.threadid": "9552",
                "hpcc.log.jobid": "W20260318-215244"
            }]
        }, {
            "fields": [{
                "hpcc.log.procid": "39",
                "hpcc.log.message": "compile: Pipe: process 33974 complete 0",
                "timestamp": "2026-03-18T21:52:45.138Z",
                "kubernetes.container.name": "myeclccserver",
                "hpcc.log.timestamp": "2026-03-18 21:52:45.138",
                "hpcc.log.sequence": "0000013C",
                "kubernetes.pod.name": "myeclccserver-658575f5d9-5tbd9",
                "hpcc.log.audience": "USR",
                "hpcc.log.class": "PRO",
                "hpcc.log.threadid": "9552",
                "hpcc.log.jobid": "W20260318-215244"
            }]
        }, {
            "fields": [{
                "hpcc.log.procid": "39",
                "hpcc.log.message": "kubectl replace --force -f -: ret=0, stdout=job.batch/compile-job-eclcc-myeclccserver-658575f5d9-5tbd9-1 replaced",
                "timestamp": "2026-03-18T21:52:45.138Z",
                "kubernetes.container.name": "myeclccserver",
                "hpcc.log.timestamp": "2026-03-18 21:52:45.138",
                "hpcc.log.sequence": "0000013D",
                "kubernetes.pod.name": "myeclccserver-658575f5d9-5tbd9",
                "hpcc.log.audience": "PRG",
                "hpcc.log.class": "INF",
                "hpcc.log.threadid": "9552",
                "hpcc.log.jobid": "W20260318-215244"
            }]
        }, {
            "fields": [{
                "hpcc.log.procid": "39",
                "hpcc.log.message": "compile: Creating PIPE program process : 'kubectl get jobs compile-job-eclcc-myeclccserver-658575f5d9-5tbd9-1 -o jsonpath={.status.active}' - hasinput=0, hasoutput=1 stderrbufsize=1048576 [] in (.)",
                "timestamp": "2026-03-18T21:52:45.138Z",
                "kubernetes.container.name": "myeclccserver",
                "hpcc.log.timestamp": "2026-03-18 21:52:45.138",
                "hpcc.log.sequence": "0000013E",
                "kubernetes.pod.name": "myeclccserver-658575f5d9-5tbd9",
                "hpcc.log.audience": "USR",
                "hpcc.log.class": "PRO",
                "hpcc.log.threadid": "9552",
                "hpcc.log.jobid": "W20260318-215244"
            }]
        }, {
            "fields": [{
                "hpcc.log.procid": "39",
                "hpcc.log.message": "compile: Pipe: process 33990 complete 0",
                "timestamp": "2026-03-18T21:52:45.202Z",
                "kubernetes.container.name": "myeclccserver",
                "hpcc.log.timestamp": "2026-03-18 21:52:45.202",
                "hpcc.log.sequence": "0000013F",
                "kubernetes.pod.name": "myeclccserver-658575f5d9-5tbd9",
                "hpcc.log.audience": "USR",
                "hpcc.log.class": "PRO",
                "hpcc.log.threadid": "9552",
                "hpcc.log.jobid": "W20260318-215244"
            }]
        }, {
            "fields": [{
                "hpcc.log.procid": "39",
                "hpcc.log.message": "kubectl get jobs compile-job-eclcc-myeclccserver-658575f5d9-5tbd9-1 -o jsonpath={.status.active}: ret=0, stdout=1",
                "timestamp": "2026-03-18T21:52:45.202Z",
                "kubernetes.container.name": "myeclccserver",
                "hpcc.log.timestamp": "2026-03-18 21:52:45.202",
                "hpcc.log.sequence": "00000140",
                "kubernetes.pod.name": "myeclccserver-658575f5d9-5tbd9",
                "hpcc.log.audience": "PRG",
                "hpcc.log.class": "INF",
                "hpcc.log.threadid": "9552",
                "hpcc.log.jobid": "W20260318-215244"
            }]
        }, {
            "fields": [{
                "hpcc.log.procid": "39",
                "hpcc.log.message": "kubectl get pods --selector=job-name=compile-job-eclcc-myeclccserver-658575f5d9-5tbd9-1 --output=jsonpath={.items[*].status.conditions[?(@.type=='PodScheduled')].status}: ret=0, stdout=True",
                "timestamp": "2026-03-18T21:52:45.266Z",
                "kubernetes.container.name": "myeclccserver",
                "hpcc.log.timestamp": "2026-03-18 21:52:45.266",
                "hpcc.log.sequence": "00000141",
                "kubernetes.pod.name": "myeclccserver-658575f5d9-5tbd9",
                "hpcc.log.audience": "PRG",
                "hpcc.log.class": "INF",
                "hpcc.log.threadid": "9552",
                "hpcc.log.jobid": "W20260318-215244"
            }]
        }, {
            "fields": [{
                "hpcc.log.procid": "39",
                "hpcc.log.message": "compile: Creating PIPE program process : 'kubectl get jobs compile-job-eclcc-myeclccserver-658575f5d9-5tbd9-1 -o jsonpath={.status.active}' - hasinput=0, hasoutput=1 stderrbufsize=1048576 [] in (.)",
                "timestamp": "2026-03-18T21:52:45.367Z",
                "kubernetes.container.name": "myeclccserver",
                "hpcc.log.timestamp": "2026-03-18 21:52:45.367",
                "hpcc.log.sequence": "00000142",
                "kubernetes.pod.name": "myeclccserver-658575f5d9-5tbd9",
                "hpcc.log.audience": "USR",
                "hpcc.log.class": "PRO",
                "hpcc.log.threadid": "9552",
                "hpcc.log.jobid": "W20260318-215244"
            }]
        }, {
            "fields": [{
                "hpcc.log.procid": "39",
                "hpcc.log.message": "compile: Pipe: process 34021 complete 0",
                "timestamp": "2026-03-18T21:52:45.428Z",
                "kubernetes.container.name": "myeclccserver",
                "hpcc.log.timestamp": "2026-03-18 21:52:45.428",
                "hpcc.log.sequence": "00000143",
                "kubernetes.pod.name": "myeclccserver-658575f5d9-5tbd9",
                "hpcc.log.audience": "USR",
                "hpcc.log.class": "PRO",
                "hpcc.log.threadid": "9552",
                "hpcc.log.jobid": "W20260318-215244"
            }]
        }]
    }),
    // TotalLogLinesAvailable and LogLineCount were taken from an actual GetLogs response,
    // irrespective of how many lines are included in this mocked data
    "LogLineCount": 88,
    "TotalLogLinesAvailable": 88
};