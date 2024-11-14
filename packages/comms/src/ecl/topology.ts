import { Cache, exists, StateCallback, StateEvents, StateObject, StatePropCallback } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection.ts";
import { TopologyService, WsTopology } from "../services/wsTopology.ts";
import { TargetCluster } from "./targetCluster.ts";

export class TopologyCache extends Cache<{ BaseUrl: string }, Topology> {
    constructor() {
        super((obj) => {
            return obj.BaseUrl;
        });
    }
}
const _topology = new TopologyCache();

export interface TopologyStateEx {
    TargetClusters?: WsTopology.TpTargetCluster[];
    LogicalClusters?: WsTopology.TpLogicalCluster[];
    Services?: WsTopology.ServiceList;
}
export class Topology extends StateObject<TopologyStateEx, TopologyStateEx> implements TopologyStateEx {
    protected connection: TopologyService;
    get BaseUrl() { return this.connection.baseUrl; }

    //  Accessors  ---
    get properties(): TopologyStateEx { return this.get(); }
    get TargetClusters(): WsTopology.TpTargetCluster[] { return this.get("TargetClusters"); }
    get CTargetClusters(): TargetCluster[] {
        return this.TargetClusters.map(tc => TargetCluster.attach(this.connection, tc.Name, tc));
    }
    get LogicalClusters(): WsTopology.TpLogicalCluster[] { return this.get("LogicalClusters"); }
    get Services(): WsTopology.ServiceList { return this.get("Services"); }

    static attach(optsConnection: IOptions | IConnection | TopologyService, state?: TopologyStateEx): Topology {
        const retVal: Topology = _topology.get({ BaseUrl: optsConnection.baseUrl }, () => {
            return new Topology(optsConnection);
        });
        if (state) {
            retVal.set(state);
        }
        return retVal;
    }

    protected constructor(optsConnection: IOptions | IConnection | TopologyService) {
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
            let port = rootProtocol === "https:" ? "18002" : "8002";
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
                TargetClusters: response.TpTargetClusters?.TpTargetCluster ?? []
            });
            return this.CTargetClusters;
        });
    }

    fetchLogicalClusters(request: WsTopology.TpLogicalClusterQueryRequest = {}): Promise<WsTopology.TpLogicalCluster[]> {
        return this.connection.TpLogicalClusterQuery(request).then(response => {
            this.set({
                LogicalClusters: response.TpLogicalClusters.TpLogicalCluster
            });
            return this.LogicalClusters;
        });
    }

    fetchServices(request: WsTopology.TpServiceQueryRequest = {}): Promise<WsTopology.ServiceList> {
        return this.connection.TpServiceQuery(request).then(response => {
            this.set({
                Services: response.ServiceList
            });
            return this.Services;
        });
    }

    protected _prevRefresh;
    refresh(force: boolean = false): Promise<this> {
        if (!this._prevRefresh || force) {
            this._prevRefresh = Promise.all([this.fetchTargetClusters(), this.fetchLogicalClusters(), this.fetchServices()]).then(() => {
                return this;
            });
        }
        return this._prevRefresh;
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
