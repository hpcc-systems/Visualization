import { exists } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { TopologyService } from "../services/wsTopology";

export class Topology {
    protected connection: TopologyService;

    constructor(optsConnection: IOptions | IConnection | TopologyService) {
        if (optsConnection instanceof TopologyService) {
            this.connection = optsConnection;
        } else {
            this.connection = new TopologyService(optsConnection);
        }
    }

    GetESPServiceBaseURL(type: string = ""): Promise<string> {
        return this.connection.TpServiceQuery({}).then(response => {
            const rootProtocol = this.connection.protocol();
            const ip = this.connection.ip();
            let port = rootProtocol === "https:" ? "18002xxx" : "8002xxx";
            if (exists("ServiceList.TpEspServers.TpEspServer", response)) {
                for (const item of response.ServiceList.TpEspServers.TpEspServer) {
                    if (exists("TpBindings.TpBinding", item)) {
                        for (const binding of item.TpBindings.TpBinding) {
                            if (binding.Service === type && binding.Protocol + ":" === rootProtocol) {
                                port = binding.Port;
                            }
                        }
                    }
                }
            }
            return `${rootProtocol}//${ip}:${port}/`;
        });
    }
}
