import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsMachine {

    export type int = number;
    export type long = number;
    export type unsignedInt = number;

    export enum ThresholdType {
        THRESHOLD_PERCENTAGE = 0,
        THRESHOLD_MB = 1
    }

    export enum TpMachineType {
        ALLNODES = "ALLNODES",
        THORMACHINES = "THORMACHINES",
        HOLEMACHINES = "HOLEMACHINES",
        ROXIEMACHINES = "ROXIEMACHINES",
        MACHINES = "MACHINES",
        AVAILABLEMACHINES = "AVAILABLEMACHINES",
        DROPZONE = "DROPZONE",
        STANDBYNNODE = "STANDBYNNODE",
        THORSPARENODES = "THORSPARENODES",
        HOLESTANDBYNODES = "HOLESTANDBYNODES"
    }

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
        StatusReports: StatusReports;
    }

    export interface ComponentStatusList {
        ComponentStatus: ComponentStatus[];
    }

    export interface GetComponentStatusResponse {
        Exceptions: Exceptions;
        StatusCode: int;
        Status: string;
        ComponentType: string;
        EndPoint: string;
        ComponentStatusID: int;
        ComponentStatus: string;
        TimeReported: long;
        TimeReportedStr: string;
        Reporter: string;
        StatusReport: StatusReport;
        ComponentStatusList: ComponentStatusList;
    }

    export interface Component {
        Type: string;
        Name: string;
    }

    export interface Components {
        Component: Component[];
    }

    export interface GetComponentUsageRequest {
        Components?: Components;
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
        DiskUsages: DiskUsages;
    }

    export interface MachineUsages {
        MachineUsage: MachineUsage[];
    }

    export interface ComponentUsage {
        Type: string;
        Name: string;
        Description: string;
        Exception: string;
        MachineUsages: MachineUsages;
    }

    export interface ComponentUsages {
        ComponentUsage: ComponentUsage[];
    }

    export interface GetComponentUsageResponse {
        Exceptions: Exceptions;
        ComponentUsages: ComponentUsages;
        UsageTime: string;
    }

    export interface Addresses {
        Item: string[];
    }

    export interface GetMachineInfoRequest {
        Addresses?: Addresses;
        SortBy?: string;
        ClusterType?: TpMachineType;
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
        MemThresholdType?: ThresholdType;
        DiskThresholdType?: ThresholdType;
        UserName?: string;
        Password?: string;
        SecurityString?: string;
    }

    export interface RequestInfo {
        Addresses: Addresses;
        SortBy: string;
        ClusterType: TpMachineType;
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
        MemThresholdType: ThresholdType;
        DiskThresholdType: ThresholdType;
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
        Processors: Processors;
        Storage: Storage;
        Running: Running;
        PhysicalMemory: PhysicalMemory;
        VirtualMemory: VirtualMemory;
        ComponentInfo: ComponentInfo;
        Exception: string;
    }

    export interface Machines {
        MachineInfoEx: MachineInfoEx[];
    }

    export interface GetMachineInfoResponse {
        Exceptions: Exceptions;
        RequestInfo: RequestInfo;
        Columns: Columns;
        Machines: Machines;
        TimeStamp: string;
        UserName: string;
        Password: string;
        AcceptLanguage: string;
    }

    export interface GetMachineInfoRequestEx {
        Addresses: Addresses;
        ClusterType: TpMachineType;
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
        ShowColumns?: ShowColumns;
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
        NodeGroups?: NodeGroups;
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
        NodeGroupUsages: NodeGroupUsages;
        UsageTime: string;
    }

    export interface TargetClusters {
        Item: string[];
    }

    export interface GetTargetClusterInfoRequest {
        TargetClusters?: TargetClusters;
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
        MemThresholdType?: ThresholdType;
        DiskThresholdType?: ThresholdType;
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

    export interface GetTargetClusterInfoResponse {
        Exceptions: Exceptions;
        Columns: Columns;
        RequestInfo: RequestInfo;
        TargetClusterInfoList: TargetClusterInfoList;
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
        TargetClusterUsages: TargetClusterUsages;
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
        super(optsConnection, "ws_machine", "1.19");
    }

    GetComponentStatus(request: Partial<WsMachine.GetComponentStatusRequest>): Promise<WsMachine.GetComponentStatusResponse> {
        return this._connection.send("GetComponentStatus", request, "json", false, undefined, "GetComponentStatusResponse");
    }

    GetComponentUsage(request: Partial<WsMachine.GetComponentUsageRequest>): Promise<WsMachine.GetComponentUsageResponse> {
        return this._connection.send("GetComponentUsage", request, "json", false, undefined, "GetComponentUsageResponse");
    }

    GetMachineInfo(request: Partial<WsMachine.GetMachineInfoRequest>): Promise<WsMachine.GetMachineInfoResponse> {
        return this._connection.send("GetMachineInfo", request, "json", false, undefined, "GetMachineInfoResponse");
    }

    GetMachineInfoEx(request: Partial<WsMachine.GetMachineInfoRequestEx>): Promise<WsMachine.GetMachineInfoResponseEx> {
        return this._connection.send("GetMachineInfoEx", request, "json", false, undefined, "GetMachineInfoResponseEx");
    }

    GetMetrics(request: Partial<WsMachine.MetricsRequest>): Promise<WsMachine.MetricsResponse> {
        return this._connection.send("GetMetrics", request, "json", false, undefined, "MetricsResponse");
    }

    GetNodeGroupUsage(request: Partial<WsMachine.GetNodeGroupUsageRequest>): Promise<WsMachine.GetNodeGroupUsageResponse> {
        return this._connection.send("GetNodeGroupUsage", request, "json", false, undefined, "GetNodeGroupUsageResponse");
    }

    GetTargetClusterInfo(request: Partial<WsMachine.GetTargetClusterInfoRequest>): Promise<WsMachine.GetTargetClusterInfoResponse> {
        return this._connection.send("GetTargetClusterInfo", request, "json", false, undefined, "GetTargetClusterInfoResponse");
    }

    GetTargetClusterUsage(request: Partial<WsMachine.GetTargetClusterUsageRequest>): Promise<WsMachine.GetTargetClusterUsageResponse> {
        return this._connection.send("GetTargetClusterUsage", request, "json", false, undefined, "GetTargetClusterUsageResponse");
    }

    Ping(request: Partial<WsMachine.ws_machinePingRequest>): Promise<WsMachine.ws_machinePingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "ws_machinePingResponse");
    }

    UpdateComponentStatus(request: Partial<WsMachine.UpdateComponentStatusRequest>): Promise<WsMachine.UpdateComponentStatusResponse> {
        return this._connection.send("UpdateComponentStatus", request, "json", false, undefined, "UpdateComponentStatusResponse");
    }

}
