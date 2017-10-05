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

export class MachineService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "ws_machine", "1.13");
    }

    GetTargetClusterInfo(request: GetTargetClusterInfo.Request = {}): Promise<GetTargetClusterInfo.Response> {
        return this._connection.send("GetTargetClusterInfo", request);
    }
}
