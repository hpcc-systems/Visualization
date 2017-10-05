import { exists, StateCallback, StateEvents, StateObject, StatePropCallback } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { TopologyService, TpTargetClusterQuery } from "../services/wsTopology";
import { TargetCluster } from "./targetCluster";

export interface TopologyStateEx {
    TargetClusters: TpTargetClusterQuery.TpTargetCluster[];
}
export class Topology extends StateObject<TopologyStateEx, TopologyStateEx> implements TopologyStateEx {
    protected connection: TopologyService;

    //  Accessors  ---
    get properties(): TopologyStateEx { return this.get(); }
    get TargetClusters(): TpTargetClusterQuery.TpTargetCluster[] { return this.get("TargetClusters"); }
    get CTargetClusters(): TargetCluster[] {
        return this.TargetClusters.map(tc => TargetCluster.attach(this.connection, tc.Name, tc));
    }

    constructor(optsConnection: IOptions | IConnection | TopologyService) {
        super();
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

    fetchTargetClusters(): Promise<TargetCluster[]> {
        return this.connection.TpTargetClusterQuery({ Type: "ROOT" }).then(response => {
            this.set({
                TargetClusters: response.TpTargetClusters.TpTargetCluster
            });
            return this.CTargetClusters;
        });
    }

    async refresh(): Promise<this> {
        await this.fetchTargetClusters();
        return this;
    }

    //  Monitoring  ---

    //  Events  ---
    on(eventID: StateEvents, propIDorCallback: StateCallback | keyof TopologyStateEx, callback?: StatePropCallback): this {
        if (this.isCallback(propIDorCallback)) {
            switch (eventID) {
                case "changed":
                    super.on(eventID, propIDorCallback);
                    break;
                default:
            }
        } else {
            switch (eventID) {
                case "changed":
                    super.on(eventID, propIDorCallback, callback!);
                    break;
                default:
            }
        }
        this._monitor();
        return this;
    }
}
