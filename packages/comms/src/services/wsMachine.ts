import { exists } from "@hpcc-js/util";
import { max as d3Max, mean as d3Mean } from "d3-array";
import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://192.168.3.22:8010/ws_machine/GetTargetClusterInfo?respjson_
    * http://json2ts.com/
*/

export namespace GetTargetClusterInfo {

    export interface TargetClusters {
        Item: string[];
    }

    export interface Request {
        TargetClusters?: TargetClusters;
        AddProcessesToFilter?: string;
        ApplyProcessFilter?: boolean;
        GetProcessorInfo?: boolean;
        GetStorageInfo?: boolean;
        LocalFileSystemsOnly?: boolean;
        GetSoftwareInfo?: boolean;
        MemThreshold?: number;
        DiskThreshold?: number;
        CpuThreshold?: number;
        AutoRefresh?: number;
        MemThresholdType?: string;
        DiskThresholdType?: string;
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

    export interface Columns {
        Item: string[];
    }

    export interface Addresses {
        Item: string[];
    }

    export interface RequestInfo {
        Addresses: Addresses;
        ClusterType: string;
        Cluster: string;
        OldIP: string;
        Path: string;
        AddProcessesToFilter: string;
        ApplyProcessFilter: boolean;
        GetProcessorInfo: boolean;
        GetStorageInfo: boolean;
        LocalFileSystemsOnly: boolean;
        GetSoftwareInfo: boolean;
        MemThreshold: number;
        DiskThreshold: number;
        CpuThreshold: number;
        AutoRefresh: number;
        MemThresholdType: string;
        DiskThresholdType: string;
        SecurityString: string;
        UserName: string;
        Password: string;
        EnableSNMP: boolean;
    }

    export interface ProcessorInfo {
        Type: string;
        Load: number;
    }

    export interface Processors {
        ProcessorInfo: ProcessorInfo[];
    }

    export interface StorageInfo {
        Description: string;
        Type: string;
        Available: number;
        PercentAvail: number;
        Total: number;
        Failures: number;
    }

    export interface Storage {
        StorageInfo: StorageInfo[];
    }

    export interface SWRunInfo {
        Name: string;
        Instances: number;
        State: number;
    }

    export interface Running {
        SWRunInfo: SWRunInfo[];
    }

    export interface PhysicalMemory {
        Description: string;
        Type: string;
        Available: number;
        PercentAvail: number;
        Total: number;
        Failures: number;
    }

    export interface VirtualMemory {
        Description: string;
        Type: string;
        Available: number;
        PercentAvail: number;
        Total: number;
        Failures: number;
    }

    export interface ComponentInfo {
        Condition: number;
        State: number;
        UpTime: string;
    }

    export interface MachineInfoEx {
        Address: string;
        ConfigAddress: string;
        Name: string;
        ProcessType: string;
        DisplayType: string;
        Description: string;
        AgentVersion: string;
        Contact: string;
        Location: string;
        UpTime: string;
        ComponentName: string;
        ComponentPath: string;
        RoxieState: string;
        RoxieStateDetails: string;
        OS: number;
        ProcessNumber: number;
        Processors: Processors;
        Storage: Storage;
        Running: Running;
        PhysicalMemory: PhysicalMemory;
        VirtualMemory: VirtualMemory;
        ComponentInfo: ComponentInfo;
    }

    export interface Processes {
        MachineInfoEx: MachineInfoEx[];
    }

    export interface TargetClusterInfo {
        Name: string;
        Type: string;
        Processes: Processes;
    }

    export interface TargetClusterInfoList {
        TargetClusterInfo: TargetClusterInfo[];
    }

    export interface Response {
        Exceptions: Exceptions;
        Columns: Columns;
        RequestInfo: RequestInfo;
        TargetClusterInfoList: TargetClusterInfoList;
        TimeStamp: string;
        AcceptLanguage: string;
    }
}

export namespace GetTargetClusterUsage {

    export interface TargetClusters {
        Item: string[];
    }

    export interface Request {
        TargetClusters?: TargetClusters;
        BypassCachedResult: boolean;
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

    export interface DiskUsage {
        Name: string;
        Path: string;
        Description: string;
        InUse: number;
        Available: number;
        PercentAvailable: number;
    }

    export interface DiskUsages {
        DiskUsage: DiskUsage[];
    }

    export interface MachineUsage {
        Name: string;
        NetAddress: string;
        Description: string;
        DiskUsages: DiskUsages;
    }

    export interface MachineUsages {
        MachineUsage: MachineUsage[];
    }

    export interface ComponentUsage {
        Type: string;
        Name: string;
        Description: string;
        MachineUsages: MachineUsages;
    }

    export interface ComponentUsages {
        ComponentUsage: ComponentUsage[];
    }

    export interface TargetClusterUsage {
        Name: string;
        Description: string;
        ComponentUsages: ComponentUsages;
    }

    export interface TargetClusterUsages {
        TargetClusterUsage: TargetClusterUsage[];
    }

    export interface Response {
        Exceptions: Exceptions;
        TargetClusterUsages: TargetClusterUsages;
    }
}

export namespace GetTargetClusterUsageEx {

    export interface DiskUsage {
        Name: string;
        Path: string;
        Description: string;
        InUse: number;
        Available: number;
        Total: number;
        PercentAvailable: number;
        PercentUsed: number;
    }

    export interface MachineUsage {
        Name: string;
        NetAddress: string;
        Description: string;
        DiskUsages: DiskUsage[];
        mean: number;
        max: number;
    }

    export interface ComponentUsage {
        Type: string;
        Name: string;
        Description: string;
        MachineUsages: MachineUsage[];
        MachineUsagesDescription: string;
        mean: number;
        max: number;
    }

    export interface TargetClusterUsage {
        Name: string;
        Description: string;
        ComponentUsages: ComponentUsage[];
        ComponentUsagesDescription: string;
        mean: number;
        max: number;
    }
}

export class MachineService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "ws_machine", "1.13");
    }

    GetTargetClusterInfo(request: GetTargetClusterInfo.Request = {}): Promise<GetTargetClusterInfo.Response> {
        return this._connection.send("GetTargetClusterInfo", request);
    }

    GetTargetClusterUsage(targetClusters?: string[], bypassCachedResult: boolean = false): Promise<GetTargetClusterUsage.TargetClusterUsage[]> {
        return this._connection.send("GetTargetClusterUsage", {
            TargetClusters: targetClusters ? { Item: targetClusters } : {},
            BypassCachedResult: bypassCachedResult
        }).then(response => {
            return exists("TargetClusterUsages.TargetClusterUsage", response) ? response.TargetClusterUsages.TargetClusterUsage : [];
        });
    }

    GetTargetClusterUsageEx(targetClusters?: string[], bypassCachedResult: boolean = false): Promise<GetTargetClusterUsageEx.TargetClusterUsage[]> {
        return this.GetTargetClusterUsage(targetClusters, bypassCachedResult).then(response => {
            return response.map(tcu => {
                const ComponentUsages: GetTargetClusterUsageEx.ComponentUsage[] = tcu.ComponentUsages.ComponentUsage.map(cu => {
                    const MachineUsages = cu.MachineUsages.MachineUsage.map(mu => {
                        const DiskUsages: GetTargetClusterUsageEx.DiskUsage[] = mu.DiskUsages && mu.DiskUsages.DiskUsage ? mu.DiskUsages.DiskUsage.map(du => {
                            return {
                                ...du,
                                Total: du.InUse + du.Available,
                                PercentUsed: 100 - du.PercentAvailable
                            };
                        }) : [];
                        return {
                            Name: mu.Name,
                            NetAddress: mu.NetAddress,
                            Description: mu.Description,
                            DiskUsages,
                            mean: d3Mean(DiskUsages, du => du.PercentUsed),
                            max: d3Max(DiskUsages, du => du.PercentUsed)
                        };
                    });
                    return {
                        Type: cu.Type,
                        Name: cu.Name,
                        Description: cu.Description,
                        MachineUsages,
                        MachineUsagesDescription: MachineUsages.reduce((prev, mu) => prev + (mu.Description || ""), ""),
                        mean: d3Mean(MachineUsages, mu => mu.mean),
                        max: d3Max(MachineUsages, mu => mu.max)
                    };
                });
                return {
                    Name: tcu.Name,
                    Description: tcu.Description,
                    ComponentUsages,
                    ComponentUsagesDescription: ComponentUsages.reduce((prev, cu) => prev + (cu.MachineUsagesDescription || ""), ""),
                    mean: d3Mean(ComponentUsages, cu => cu.mean),
                    max: d3Max(ComponentUsages, cu => cu.max)
                };
            });
        });
    }
}
