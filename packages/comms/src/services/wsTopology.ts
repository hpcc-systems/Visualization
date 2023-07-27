import { IOptions } from "../connection";
import { TopologyServiceBase, WsTopology } from "./wsdl/WsTopology/v1.31/WsTopology";

export {
    WsTopology
};

export class TopologyService extends TopologyServiceBase {

    connectionOptions(): IOptions {
        return this._connection.opts();
    }

    protocol(): string {
        const parts = this._connection.opts().baseUrl.split("//");
        return parts[0];
    }

    ip(): string {
        const parts = this._connection.opts().baseUrl.split("//");
        const parts2 = parts[1].split(":");
        return parts2[0];
    }

    DefaultTpLogicalClusterQuery(request: WsTopology.TpLogicalClusterQueryRequest = {}): Promise<WsTopology.TpLogicalCluster> {
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
