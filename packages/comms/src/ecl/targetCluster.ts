import { Cache, StateObject } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection.ts";
import { WsMachine, WsMachineEx, MachineService } from "../services/wsMachine.ts";
import { TopologyService, WsTopology } from "../services/wsTopology.ts";
import { Machine } from "./machine.ts";

export class TargetClusterCache extends Cache<{ BaseUrl: string, Name: string }, TargetCluster> {
    constructor() {
        super((obj) => {
            return `${obj.BaseUrl}-${obj.Name}`;
        });
    }
}
const _targetCluster = new TargetClusterCache();

export interface TpTargetClusterEx {
    MachineInfoEx: WsMachine.MachineInfoEx[];
}

export type UTargetClusterState = WsTopology.TpTargetCluster & WsTopology.TpClusterNameType & TpTargetClusterEx;
export type ITargetClusterState = WsTopology.TpTargetCluster | WsTopology.TpClusterNameType | TpTargetClusterEx;
export class TargetCluster extends StateObject<UTargetClusterState, ITargetClusterState> implements UTargetClusterState {
    protected connection: TopologyService;
    protected machineConnection: MachineService;
    get BaseUrl() { return this.connection.baseUrl; }

    get Name(): string { return this.get("Name"); }
    get Prefix(): string { return this.get("Prefix"); }
    get Type(): string { return this.get("Type"); }
    get IsDefault(): boolean { return this.get("IsDefault"); }
    get TpClusters(): WsTopology.TpClusters { return this.get("TpClusters"); }
    get TpEclCCServers(): WsTopology.TpEclCCServers { return this.get("TpEclCCServers"); }
    get TpEclServers(): WsTopology.TpEclServers { return this.get("TpEclServers"); }
    get TpEclAgents(): WsTopology.TpEclAgents { return this.get("TpEclAgents"); }
    get TpEclSchedulers(): WsTopology.TpEclSchedulers { return this.get("TpEclSchedulers"); }
    get MachineInfoEx(): WsMachine.MachineInfoEx[] { return this.get("MachineInfoEx", []); }
    get CMachineInfoEx(): Machine[] {
        return this.MachineInfoEx.map(machineInfoEx => Machine.attach(this.machineConnection, machineInfoEx.Address, machineInfoEx));
    }

    static attach(optsConnection: IOptions | IConnection | TopologyService, name: string, state?: ITargetClusterState): TargetCluster {
        const retVal: TargetCluster = _targetCluster.get({ BaseUrl: optsConnection.baseUrl, Name: name }, () => {
            return new TargetCluster(optsConnection, name);
        });
        if (state) {
            retVal.set(state);
        }
        return retVal;
    }

    protected constructor(optsConnection: IOptions | IConnection | TopologyService, name: string) {
        super();
        if (optsConnection instanceof TopologyService) {
            this.connection = optsConnection;
            this.machineConnection = new MachineService(optsConnection.connectionOptions());
        } else {
            this.connection = new TopologyService(optsConnection);
            this.machineConnection = new MachineService(optsConnection);
        }
        this.clear({
            Name: name
        });
    }

    fetchMachines(request: WsMachine.GetTargetClusterInfoRequest = {}): Promise<Machine[]> {
        return this.machineConnection.GetTargetClusterInfo({
            TargetClusters: {
                Item: [`${this.Type}:${this.Name}`]
            },
            ...request
        }).then(response => {
            const retVal: WsMachine.MachineInfoEx[] = [];
            for (const machineInfo of response.TargetClusterInfoList.TargetClusterInfo) {
                for (const machineInfoEx of machineInfo.Processes.MachineInfoEx) {
                    retVal.push(machineInfoEx);
                }
            }
            this.set("MachineInfoEx", retVal);
            return this.CMachineInfoEx;
        });
    }

    machineStats(): { maxDisk: number; meanDisk: number } {
        let maxDisk = 0;
        let totalFree = 0;
        let total = 0;
        for (const machine of this.CMachineInfoEx) {
            for (const storageInfo of machine.Storage.StorageInfo) {
                totalFree += storageInfo.Available;
                total += storageInfo.Total;
                const usage = 1 - storageInfo.Available / storageInfo.Total;
                if (usage > maxDisk) {
                    maxDisk = usage;
                }
            }
        }
        return {
            maxDisk,
            meanDisk: 1 - (total ? totalFree / total : 1)
        };
    }

    fetchUsage(): Promise<WsMachineEx.TargetClusterUsage[]> {
        return this.machineConnection.GetTargetClusterUsageEx([this.Name]);
    }
}

export function targetClusters(optsConnection: IOptions | IConnection | TopologyService): Promise<TargetCluster[]> {
    let connection: TopologyService;
    if (optsConnection instanceof TopologyService) {
        connection = optsConnection;
    } else {
        connection = new TopologyService(optsConnection);
    }
    return connection.TpListTargetClusters({}).then(response => {
        return response.TargetClusters.TpClusterNameType.map(item => TargetCluster.attach(optsConnection, item.Name, item));
    });
}

const _defaultTargetCluster: { [baseUrl: string]: Promise<TargetCluster> } = {};
export function defaultTargetCluster(optsConnection: IOptions | IConnection | TopologyService): Promise<TargetCluster> {
    if (!_defaultTargetCluster[optsConnection.baseUrl]) {
        let connection: TopologyService;
        if (optsConnection instanceof TopologyService) {
            connection = optsConnection;
        } else {
            connection = new TopologyService(optsConnection);
        }
        _defaultTargetCluster[optsConnection.baseUrl] = connection.TpListTargetClusters({}).then(response => {
            let firstItem: WsTopology.TpClusterNameType;
            let defaultItem: WsTopology.TpClusterNameType;
            let hthorItem: WsTopology.TpClusterNameType;
            response.TargetClusters.TpClusterNameType.forEach(item => {
                if (!firstItem) {
                    firstItem = item;
                }
                if (!defaultItem && item.IsDefault === true) {
                    defaultItem = item;
                }
                if (!hthorItem && item.Type === "hthor") {
                    hthorItem = item;
                }
            });
            const defItem = defaultItem || hthorItem || firstItem;
            return TargetCluster.attach(optsConnection, defItem.Name, defItem);
        });
    }
    return _defaultTargetCluster[optsConnection.baseUrl];
}
