import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

type int = number;
type long = number;
type unsignedInt = number;

export namespace WsMachine {

    export interface GetComponentStatusRequest {

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

    export interface StatusReport {
        StatusID: int;
        Status: string;
        StatusDetails: string;
        Reporter: string;
        TimeReported: long;
        TimeReportedStr: string;
        TimeCached: string;
        URL: string;
    }

    export interface StatusReports {
        StatusReport: StatusReport[];
    }

    export interface ComponentStatus {
        ComponentTypeID: int;
        ComponentType: string;
        EndPoint: string;
        StatusID: int;
        Status: string;
        TimeReported: long;
        TimeReportedStr: string;
        Reporter: string;
        StatusReports: {
            StatusReport: StatusReport[];
        };
    }

    export interface ComponentStatusList {
        ComponentStatus: ComponentStatus[];
    }

    export interface GetComponentStatusResponse {
        Exceptions: {
            Source: string;
            Exception: Exception[];
        };
        StatusCode: int;
        Status: string;
        ComponentType: string;
        EndPoint: string;
        ComponentStatusID: int;
        ComponentStatus: string;
        TimeReported: long;
        TimeReportedStr: string;
        Reporter: string;
        StatusReport: {
            StatusID: int;
            Status: string;
            StatusDetails: string;
            Reporter: string;
            TimeReported: long;
            TimeReportedStr: string;
            TimeCached: string;
            URL: string;
        };
        ComponentStatusList: {
            ComponentStatus: ComponentStatus[];
        };
    }

    export interface Component {
        Type: string;
        Name: string;
    }

    export interface Components {
        Component: Component[];
    }

    export interface GetComponentUsageRequest {
        Components?: {
            Component?: Component[];
        };
        BypassCachedResult?: boolean;
    }

    export interface DiskUsage {
        Name: string;
        Path: string;
        Description: string;
        InUse: long;
        Available: long;
        PercentAvailable: int;
        Exception: string;
    }

    export interface DiskUsages {
        DiskUsage: DiskUsage[];
    }

    export interface MachineUsage {
        Name: string;
        NetAddress: string;
        Description: string;
        Exception: string;
        DiskUsages: {
            DiskUsage: DiskUsage[];
        };
    }

    export interface MachineUsages {
        MachineUsage: MachineUsage[];
    }

    export interface ComponentUsage {
        Type: string;
        Name: string;
        Description: string;
        Exception: string;
        MachineUsages: {
            MachineUsage: MachineUsage[];
        };
    }

    export interface ComponentUsages {
        ComponentUsage: ComponentUsage[];
    }

    export interface GetComponentUsageResponse {
        Exceptions: Exceptions;
        ComponentUsages: {
            ComponentUsage: ComponentUsage[];
        };
        UsageTime: string;
    }

    export interface Addresses {
        Item: string[];
    }

    export interface GetMachineInfoRequest {
        Addresses?: {
            Item?: string[];
        };
        ClusterType?: string;
        Cluster?: string;
        OldIP?: string;
        Path?: string;
        AddProcessesToFilter?: string;
        ApplyProcessFilter?: boolean;
        GetProcessorInfo?: boolean;
        GetStorageInfo?: boolean;
        LocalFileSystemsOnly?: boolean;
        GetSoftwareInfo?: boolean;
        MemThreshold?: int;
        DiskThreshold?: int;
        CpuThreshold?: int;
        AutoRefresh?: int;
        MemThresholdType?: string;
        DiskThresholdType?: string;
        UserName?: string;
        Password?: string;
        SecurityString?: string;
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
        MemThreshold: int;
        DiskThreshold: int;
        CpuThreshold: int;
        AutoRefresh: int;
        MemThresholdType: string;
        DiskThresholdType: string;
        SecurityString: string;
        UserName: string;
        Password: string;
        EnableSNMP: boolean;
    }

    export interface Columns {
        Item: string[];
    }

    export interface ProcessorInfo {
        Type: string;
        Load: int;
    }

    export interface Processors {
        ProcessorInfo: ProcessorInfo[];
    }

    export interface StorageInfo {
        Description: string;
        Type: string;
        Available: long;
        PercentAvail: int;
        Total: long;
        Failures: int;
    }

    export interface Storage {
        StorageInfo: StorageInfo[];
    }

    export interface SWRunInfo {
        Name: string;
        Instances: int;
        State: int;
    }

    export interface Running {
        SWRunInfo: SWRunInfo[];
    }

    export interface PhysicalMemory {
        Description: string;
        Type: string;
        Available: long;
        PercentAvail: int;
        Total: long;
        Failures: int;
    }

    export interface VirtualMemory {
        Description: string;
        Type: string;
        Available: long;
        PercentAvail: int;
        Total: long;
        Failures: int;
    }

    export interface ComponentInfo {
        Condition: int;
        State: int;
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
        OS: int;
        ProcessNumber: int;
        Channels: unsignedInt;
        Processors: {
            ProcessorInfo: ProcessorInfo[];
        };
        Storage: {
            StorageInfo: StorageInfo[];
        };
        Running: {
            SWRunInfo: SWRunInfo[];
        };
        PhysicalMemory: {
            Description: string;
            Type: string;
            Available: long;
            PercentAvail: int;
            Total: long;
            Failures: int;
        };
        VirtualMemory: {
            Description: string;
            Type: string;
            Available: long;
            PercentAvail: int;
            Total: long;
            Failures: int;
        };
        ComponentInfo: {
            Condition: int;
            State: int;
            UpTime: string;
        };
        Exception: string;
    }

    export interface Machines {
        MachineInfoEx: MachineInfoEx[];
    }

    export interface GetMachineInfoResponse {
        Exceptions: Exceptions;
        RequestInfo: {
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
            MemThreshold: int;
            DiskThreshold: int;
            CpuThreshold: int;
            AutoRefresh: int;
            MemThresholdType: string;
            DiskThresholdType: string;
            SecurityString: string;
            UserName: string;
            Password: string;
            EnableSNMP: boolean;
        };
        Columns: {
            Item: string[];
        };
        Machines: {
            MachineInfoEx: MachineInfoEx[];
        };
        TimeStamp: string;
        UserName: string;
        Password: string;
        AcceptLanguage: string;
    }

    export interface GetMachineInfoRequestEx {
        Addresses: Addresses;
        ClusterType: string;
    }

    export interface GetMachineInfoResponseEx {
        Exceptions: Exceptions;
        AcceptLanguage: string;
        Machines: Machines;
    }

    export interface ShowColumns {
        Item: string[];
    }

    export interface MetricsRequest {
        SecurityString?: string;
        Addresses?: Addresses;
        ShowColumns?: {
            Item?: string[];
        };
        AutoRefresh?: int;
        SelectAllChecked?: boolean;
        Cluster?: string;
        AutoUpdate?: boolean;
    }

    export interface MetricsResponse {
        Exceptions: Exceptions;
        FieldInformation: string;
        Metrics: string;
        AutoRefresh: int;
        Cluster: string;
        SelectAllChecked: boolean;
        AutoUpdate: boolean;
        AcceptLanguage: string;
    }

    export interface NodeGroups {
        Item: string[];
    }

    export interface GetNodeGroupUsageRequest {
        NodeGroups?: {
            Item?: string[];
        };
        BypassCachedResult?: boolean;
    }

    export interface NodeGroupUsage {
        Name: string;
        Description: string;
        Exception: string;
        ComponentUsages: ComponentUsages;
    }

    export interface NodeGroupUsages {
        NodeGroupUsage: NodeGroupUsage[];
    }

    export interface GetNodeGroupUsageResponse {
        Exceptions: Exceptions;
        NodeGroupUsages: {
            NodeGroupUsage: NodeGroupUsage[];
        };
        UsageTime: string;
    }

    export interface TargetClusters {
        Item: string[];
    }

    export interface GetTargetClusterInfoRequest {
        TargetClusters?: {
            Item?: string[];
        };
        AddProcessesToFilter?: string;
        ApplyProcessFilter?: boolean;
        GetProcessorInfo?: boolean;
        GetStorageInfo?: boolean;
        LocalFileSystemsOnly?: boolean;
        GetSoftwareInfo?: boolean;
        MemThreshold?: int;
        DiskThreshold?: int;
        CpuThreshold?: int;
        AutoRefresh?: int;
        MemThresholdType?: string;
        DiskThresholdType?: string;
    }

    export interface Processes {
        MachineInfoEx: MachineInfoEx[];
    }

    export interface TargetClusterInfo {
        Name: string;
        Type: string;
        Processes: {
            MachineInfoEx: MachineInfoEx[];
        };
    }

    export interface TargetClusterInfoList {
        TargetClusterInfo: TargetClusterInfo[];
    }

    export interface GetTargetClusterInfoResponse {
        Exceptions: Exceptions;
        Columns: Columns;
        RequestInfo: RequestInfo;
        TargetClusterInfoList: {
            TargetClusterInfo: TargetClusterInfo[];
        };
        TimeStamp: string;
        AcceptLanguage: string;
    }

    export interface GetTargetClusterUsageRequest {
        TargetClusters?: TargetClusters;
        BypassCachedResult?: boolean;
    }

    export interface TargetClusterUsage {
        Name: string;
        Description: string;
        Exception: string;
        ComponentUsages: ComponentUsages;
    }

    export interface TargetClusterUsages {
        TargetClusterUsage: TargetClusterUsage[];
    }

    export interface GetTargetClusterUsageResponse {
        Exceptions: Exceptions;
        TargetClusterUsages: {
            TargetClusterUsage: TargetClusterUsage[];
        };
        UsageTime: string;
    }

    export interface ws_machinePingRequest {

    }

    export interface ws_machinePingResponse {

    }

    export interface UpdateComponentStatusRequest {
        Reporter?: string;
        ComponentStatusList?: ComponentStatusList;
    }

    export interface UpdateComponentStatusResponse {
        Exceptions: Exceptions;
        StatusCode: int;
        Status: string;
    }

}

export class MachineServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "ws_machine", "1.17");
    }

    GetComponentStatus(request: WsMachine.GetComponentStatusRequest): Promise<WsMachine.GetComponentStatusResponse> {
        return this._connection.send("GetComponentStatus", request);
    }

    GetComponentUsage(request: WsMachine.GetComponentUsageRequest): Promise<WsMachine.GetComponentUsageResponse> {
        return this._connection.send("GetComponentUsage", request);
    }

    GetMachineInfo(request: WsMachine.GetMachineInfoRequest): Promise<WsMachine.GetMachineInfoResponse> {
        return this._connection.send("GetMachineInfo", request);
    }

    GetMachineInfoEx(request: WsMachine.GetMachineInfoRequestEx): Promise<WsMachine.GetMachineInfoResponseEx> {
        return this._connection.send("GetMachineInfoEx", request);
    }

    GetMetrics(request: WsMachine.MetricsRequest): Promise<WsMachine.MetricsResponse> {
        return this._connection.send("GetMetrics", request);
    }

    GetNodeGroupUsage(request: WsMachine.GetNodeGroupUsageRequest): Promise<WsMachine.GetNodeGroupUsageResponse> {
        return this._connection.send("GetNodeGroupUsage", request);
    }

    GetTargetClusterInfo(request: WsMachine.GetTargetClusterInfoRequest): Promise<WsMachine.GetTargetClusterInfoResponse> {
        return this._connection.send("GetTargetClusterInfo", request);
    }

    GetTargetClusterUsage(request: WsMachine.GetTargetClusterUsageRequest): Promise<WsMachine.GetTargetClusterUsageResponse> {
        return this._connection.send("GetTargetClusterUsage", request);
    }

    Ping(request: WsMachine.ws_machinePingRequest): Promise<WsMachine.ws_machinePingResponse> {
        return this._connection.send("Ping", request);
    }

    UpdateComponentStatus(request: WsMachine.UpdateComponentStatusRequest): Promise<WsMachine.UpdateComponentStatusResponse> {
        return this._connection.send("UpdateComponentStatus", request);
    }

}
