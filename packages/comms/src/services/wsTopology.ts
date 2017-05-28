import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://192.168.3.22:8010/WsTopology/TpLogicalClusterQuery?respjson_
    * http://json2ts.com/
*/

export namespace TpLogicalClusterQuery {
    export interface Request {
        EclServerQueue?: string;
    }

    export interface Exception {
        Code: string;
        Audience: string;
        Source: string;
        Message: string;
    }

    export interface Exceptions {
        Source: string;
        Exception: Exception[];
    }

    export interface TpLogicalCluster {
        Name: string;
        Queue: string;
        LanguageVersion: string;
        Process: string;
        Type: string;
    }

    export interface TpLogicalClusters {
        TpLogicalCluster: TpLogicalCluster[];
    }

    export interface Response {
        Exceptions: Exceptions;
        TpLogicalClusters: TpLogicalClusters;
    }
}

export class TopologyService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "WsTopology", "1.25");
    }

    TpLogicalClusterQuery(request: TpLogicalClusterQuery.Request = {}): Promise<TpLogicalClusterQuery.Response> {
        return this._connection.send("WUUpdate", request);
    }

    DefaultTpLogicalClusterQuery(request: TpLogicalClusterQuery.Request = {}): Promise<TpLogicalClusterQuery.TpLogicalCluster> {
        return this.TpLogicalClusterQuery(request).then((response) => {
            if ((response as any).default) {
                return (response as any).default;
            }
            let firstHThor;
            let first;
            response.TpLogicalClusters.TpLogicalCluster.some((item, idx) => {
                if (idx === 0) {
                    first = item;
                }
                if (item.Type === "hthor") {
                    firstHThor = item;
                    return true;
                }
                return false;
            });
            return firstHThor || first;
        });
    }
}
