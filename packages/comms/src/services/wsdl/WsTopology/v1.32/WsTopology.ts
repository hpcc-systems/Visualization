import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsTopology {

    export type int = number;
    export type base64Binary = string;
    export type unsignedInt = number;
    export type long = number;

    export enum RoxieQueueFilter {
        All = "All",
        QueriesOnly = "QueriesOnly",
        WorkunitsOnly = "WorkunitsOnly"
    }

    export interface WsTopologyPingRequest {

    }

    export interface WsTopologyPingResponse {

    }

    export interface SystemLogRequest {
        Name?: string;
        Type?: string;
        Zip?: int;
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

    export interface SystemLogResponse {
        Exceptions: {
            Source: string;
            Exception: Exception[];
        };
        thefile: base64Binary;
    }

    export interface TpClusterInfoRequest {
        Name?: string;
    }

    export interface TpQueue {
        Name: string;
        WorkUnit: string;
    }

    export interface TpQueues {
        TpQueue: TpQueue[];
    }

    export interface TpClusterInfoResponse {
        Exceptions: Exceptions;
        Name: string;
        WorkUnit: string;
        TpQueues: {
            TpQueue: TpQueue[];
        };
    }

    export interface TpClusterQueryRequest {
        Type?: string;
    }

    export interface TpMachine {
        Name: string;
        Netaddress: string;
        ConfigNetaddress: string;
        Domain: string;
        Directory: string;
        Type: string;
        Available: string;
        OS: int;
        Path: string;
        Port: int;
        ProcessNumber: int;
        Channels: unsignedInt;
    }

    export interface TpMachines {
        TpMachine: TpMachine[];
    }

    export interface TpCluster {
        Type: string;
        Name: string;
        QueueName: string;
        Build: string;
        Directory: string;
        LogDirectory: string;
        Desc: string;
        Path: string;
        DataModel: string;
        OS: int;
        HasThorSpareProcess: boolean;
        TpMachines: {
            TpMachine: TpMachine[];
        };
    }

    export interface TpClusters {
        TpCluster: TpCluster[];
    }

    export interface TpClusterQueryResponse {
        Exceptions: Exceptions;
        EnableSNMP: boolean;
        AcceptLanguage: string;
        TpClusters: {
            TpCluster: TpCluster[];
        };
    }

    export interface TpDropZoneQueryRequest {
        Name?: string;
        ECLWatchVisibleOnly?: boolean;
    }

    export interface TpDropZone {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        ECLWatchVisible: boolean;
        UMask: string;
        TpMachines: TpMachines;
    }

    export interface TpDropZones {
        TpDropZone: TpDropZone[];
    }

    export interface TpDropZoneQueryResponse {
        Exceptions: Exceptions;
        TpDropZones: {
            TpDropZone: TpDropZone[];
        };
    }

    export interface TpGetComponentFileRequest {
        CompType?: string;
        CompName?: string;
        NetAddress?: string;
        Directory?: string;
        FileType?: string;
        OsType?: int;
        PlainText?: string;
    }

    export interface TpGetComponentFileResponse {
        Exceptions: Exceptions;
        FileContents: base64Binary;
    }

    export interface TpGetServicePluginsRequest {

    }

    export interface Plugin {
        ShortName: string;
        LongName: string;
        FolderName: string;
        WidgetName: string;
    }

    export interface Plugins {
        Plugin: Plugin[];
    }

    export interface TpGetServicePluginsResponse {
        Exceptions: Exceptions;
        Plugins: {
            Plugin: Plugin[];
        };
    }

    export interface TpGroupQueryRequest {
        Kind?: string;
    }

    export interface TpGroup {
        Name: string;
        Kind: string;
        ReplicateOutputs: boolean;
    }

    export interface TpGroups {
        TpGroup: TpGroup[];
    }

    export interface TpGroupQueryResponse {
        Exceptions: Exceptions;
        TpGroups: {
            TpGroup: TpGroup[];
        };
    }

    export interface TpListLogFilesRequest {
        NetworkAddress?: string;
        Path?: string;
    }

    export interface LogFileStruct {
        Name: string;
        Path: string;
        Host: string;
        IsDir: boolean;
        FileSize: long;
        Modifiedtime: string;
    }

    export interface Files {
        LogFileStruct: LogFileStruct[];
    }

    export interface TpListLogFilesResponse {
        Exceptions: Exceptions;
        Files: {
            LogFileStruct: LogFileStruct[];
        };
    }

    export interface TpListTargetClustersRequest {

    }

    export interface TpClusterNameType {
        Name: string;
        Type: string;
        IsDefault: boolean;
    }

    export interface TargetClusters {
        TpClusterNameType: TpClusterNameType[];
    }

    export interface TpListTargetClustersResponse {
        Exceptions: Exceptions;
        TargetClusters: {
            TpClusterNameType: TpClusterNameType[];
        };
    }

    export interface TpLogFileRequest {
        Name?: string;
        Type?: string;
        LastHours?: int;
        StartDate?: string;
        EndDate?: string;
        FirstRows?: int;
        LastRows?: int;
        FilterType?: int;
        Reversely?: boolean;
        Zip?: boolean;
        PageNumber?: int;
        LoadData?: boolean;
        IncludeLogFieldNames?: boolean;
    }

    export interface LogFieldNames {
        Item: string[];
    }

    export interface TpLogFileResponse {
        Exceptions: Exceptions;
        Name: string;
        Type: string;
        StartDate: string;
        EndDate: string;
        LastHours: int;
        FirstRows: int;
        LastRows: int;
        Reversely: boolean;
        Zip: boolean;
        FilterType: int;
        LogData: string;
        HasDate: boolean;
        FileSize: long;
        PageFrom: long;
        PageTo: long;
        PageNumber: int;
        PrevPage: int;
        NextPage: int;
        TotalPages: int;
        AcceptLanguage: string;
        LogFieldNames: {
            Item: string[];
        };
    }

    export interface TpLogicalClusterQueryRequest {
        EclServerQueue?: string;
        RoxieQueueFilter?: RoxieQueueFilter;
    }

    export interface TpLogicalCluster {
        Name: string;
        Queue: string;
        LanguageVersion: string;
        Process: string;
        Type: string;
        QueriesOnly: boolean;
    }

    export interface TpLogicalClusters {
        TpLogicalCluster: TpLogicalCluster[];
    }

    export interface TpLogicalClusterQueryResponse {
        Exceptions: Exceptions;
        TpLogicalClusters: {
            TpLogicalCluster: TpLogicalCluster[];
        };
    }

    export interface TpMachineInfoRequest {
        Name?: string;
        NetAddress?: string;
    }

    export interface MachineInfo {
        Name: string;
        Netaddress: string;
        ConfigNetaddress: string;
        Domain: string;
        Directory: string;
        Type: string;
        Available: string;
        OS: int;
        Path: string;
        Port: int;
        ProcessNumber: int;
        Channels: unsignedInt;
    }

    export interface TpMachineInfoResponse {
        Exceptions: Exceptions;
        MachineInfo: {
            Name: string;
            Netaddress: string;
            ConfigNetaddress: string;
            Domain: string;
            Directory: string;
            Type: string;
            Available: string;
            OS: int;
            Path: string;
            Port: int;
            ProcessNumber: int;
            Channels: unsignedInt;
        };
    }

    export interface TpMachineQueryRequest {
        Type?: string;
        Cluster?: string;
        OldIP?: string;
        Path?: string;
        Directory?: string;
        LogDirectory?: string;
    }

    export interface TpMachineQueryResponse {
        Exceptions: Exceptions;
        EnablePreflightInfo: boolean;
        HasThorSpareProcess: boolean;
        Type: string;
        Cluster: string;
        OldIP: string;
        LogDirectory: string;
        Path: string;
        MemThreshold: int;
        DiskThreshold: int;
        CpuThreshold: int;
        MemThresholdType: string;
        DiskThresholdType: string;
        PreflightProcessFilter: string;
        EnableSNMP: boolean;
        AcceptLanguage: string;
        TpMachines: TpMachines;
    }

    export interface TpServiceQueryRequest {
        Type?: string;
    }

    export interface TpDali {
        Name: string;
        Description: string;
        Build: string;
        BackupComputer: string;
        BackupDirectory: string;
        Type: string;
        Path: string;
        LogDirectory: string;
        AuditLogDirectory: string;
        TpMachines: TpMachines;
    }

    export interface TpDalis {
        TpDali: TpDali[];
    }

    export interface TpDfuServer {
        Name: string;
        Description: string;
        Build: string;
        Queue: string;
        Type: string;
        Path: string;
        LogDirectory: string;
        TpMachines: TpMachines;
    }

    export interface TpDfuServers {
        TpDfuServer: TpDfuServer[];
    }

    export interface TpDkcSlave {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        TpMachines: TpMachines;
    }

    export interface TpDkcSlaves {
        TpDkcSlave: TpDkcSlave[];
    }

    export interface TpEclAgent {
        Name: string;
        Description: string;
        Build: string;
        Type: string;
        Path: string;
        DaliServer: string;
        LogDir: string;
        TpMachines: TpMachines;
    }

    export interface TpEclAgents {
        TpEclAgent: TpEclAgent[];
    }

    export interface TpEclServer {
        Name: string;
        Description: string;
        Build: string;
        LogDirectory: string;
        Type: string;
        Path: string;
        TpMachines: TpMachines;
    }

    export interface TpEclServers {
        TpEclServer: TpEclServer[];
    }

    export interface TpEclCCServers {
        TpEclServer: TpEclServer[];
    }

    export interface TpEclScheduler {
        Name: string;
        Description: string;
        Build: string;
        LogDirectory: string;
        Type: string;
        Path: string;
        TpMachines: TpMachines;
    }

    export interface TpEclSchedulers {
        TpEclScheduler: TpEclScheduler[];
    }

    export interface TpBinding {
        Name: string;
        Service: string;
        ServiceType: string;
        BindingType: string;
        ServiceBuildSet: string;
        Port: string;
        Protocol: string;
    }

    export interface TpBindings {
        TpBinding: TpBinding[];
    }

    export interface TpEspServer {
        Name: string;
        Description: string;
        Build: string;
        Type: string;
        Path: string;
        LogDirectory: string;
        TpMachines: TpMachines;
        TpBindings: {
            TpBinding: TpBinding[];
        };
    }

    export interface TpEspServers {
        TpEspServer: TpEspServer[];
    }

    export interface TpFTSlave {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        TpMachines: TpMachines;
    }

    export interface TpFTSlaves {
        TpFTSlave: TpFTSlave[];
    }

    export interface TpGenesisServer {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        TpMachines: TpMachines;
    }

    export interface TpGenesisServers {
        TpGenesisServer: TpGenesisServer[];
    }

    export interface TpLdapServer {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        TpMachines: TpMachines;
    }

    export interface TpLdapServers {
        TpLdapServer: TpLdapServer[];
    }

    export interface TpMySqlServer {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        TpMachines: TpMachines;
    }

    export interface TpMySqlServers {
        TpMySqlServer: TpMySqlServer[];
    }

    export interface TpSashaServer {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        LogDirectory: string;
        TpMachines: TpMachines;
    }

    export interface TpSashaServers {
        TpSashaServer: TpSashaServer[];
    }

    export interface TpSparkThor {
        Name: string;
        Build: string;
        ThorClusterName: string;
        ThorPath: string;
        SparkExecutorCores: unsignedInt;
        SparkExecutorMemory: long;
        SparkMasterPort: unsignedInt;
        SparkMasterWebUIPort: unsignedInt;
        SparkWorkerCores: unsignedInt;
        SparkWorkerMemory: long;
        SparkWorkerPort: unsignedInt;
        LogDirectory: string;
        Path: string;
        TpMachines: TpMachines;
    }

    export interface TpSparkThors {
        TpSparkThor: TpSparkThor[];
    }

    export interface ServiceList {
        TpDalis: {
            TpDali: TpDali[];
        };
        TpDfuServers: {
            TpDfuServer: TpDfuServer[];
        };
        TpDkcSlaves: {
            TpDkcSlave: TpDkcSlave[];
        };
        TpDropZones: TpDropZones;
        TpEclAgents: {
            TpEclAgent: TpEclAgent[];
        };
        TpEclServers: {
            TpEclServer: TpEclServer[];
        };
        TpEclCCServers: {
            TpEclServer: TpEclServer[];
        };
        TpEclSchedulers: {
            TpEclScheduler: TpEclScheduler[];
        };
        TpEspServers: {
            TpEspServer: TpEspServer[];
        };
        TpFTSlaves: {
            TpFTSlave: TpFTSlave[];
        };
        TpGenesisServers: {
            TpGenesisServer: TpGenesisServer[];
        };
        TpLdapServers: {
            TpLdapServer: TpLdapServer[];
        };
        TpMySqlServers: {
            TpMySqlServer: TpMySqlServer[];
        };
        TpSashaServers: {
            TpSashaServer: TpSashaServer[];
        };
        TpSparkThors: {
            TpSparkThor: TpSparkThor[];
        };
    }

    export interface TpServiceQueryResponse {
        Exceptions: Exceptions;
        MemThreshold: int;
        DiskThreshold: int;
        CpuThreshold: int;
        EncapsulatedSystem: boolean;
        EnableSNMP: boolean;
        PreflightProcessFilter: string;
        AcceptLanguage: string;
        MemThresholdType: string;
        DiskThresholdType: string;
        ServiceList: {
            TpDalis: {
                TpDali: TpDali[];
            };
            TpDfuServers: {
                TpDfuServer: TpDfuServer[];
            };
            TpDkcSlaves: {
                TpDkcSlave: TpDkcSlave[];
            };
            TpDropZones: TpDropZones;
            TpEclAgents: {
                TpEclAgent: TpEclAgent[];
            };
            TpEclServers: {
                TpEclServer: TpEclServer[];
            };
            TpEclCCServers: {
                TpEclServer: TpEclServer[];
            };
            TpEclSchedulers: {
                TpEclScheduler: TpEclScheduler[];
            };
            TpEspServers: {
                TpEspServer: TpEspServer[];
            };
            TpFTSlaves: {
                TpFTSlave: TpFTSlave[];
            };
            TpGenesisServers: {
                TpGenesisServer: TpGenesisServer[];
            };
            TpLdapServers: {
                TpLdapServer: TpLdapServer[];
            };
            TpMySqlServers: {
                TpMySqlServer: TpMySqlServer[];
            };
            TpSashaServers: {
                TpSashaServer: TpSashaServer[];
            };
            TpSparkThors: {
                TpSparkThor: TpSparkThor[];
            };
        };
    }

    export interface TpSetMachineStatusRequest {
        MachinePath?: string;
        StatusValue?: string;
    }

    export interface TpSetMachineStatusResponse {
        Exceptions: Exceptions;
        TpSetMachineStatusResult: boolean;
    }

    export interface TpSwapNodeRequest {
        Cluster?: string;
        OldIP?: string;
        NewIP?: string;
    }

    export interface TpSwapNodeResponse {
        Exceptions: Exceptions;
        TpSwapNodeResult: boolean;
    }

    export interface TpTargetClusterQueryRequest {
        Type?: string;
        Name?: string;
        ShowDetails?: boolean;
    }

    export interface TpTargetCluster {
        Name: string;
        Prefix: string;
        Type: string;
        TpClusters: TpClusters;
        TpEclCCServers: TpEclCCServers;
        TpEclServers: TpEclServers;
        TpEclAgents: TpEclAgents;
        TpEclSchedulers: TpEclSchedulers;
    }

    export interface TpTargetClusters {
        TpTargetCluster: TpTargetCluster[];
    }

    export interface TpTargetClusterQueryResponse {
        Exceptions: Exceptions;
        ShowDetails: boolean;
        MemThreshold: int;
        DiskThreshold: int;
        CpuThreshold: int;
        MemThresholdType: string;
        DiskThresholdType: string;
        PreflightProcessFilter: string;
        AcceptLanguage: string;
        TpTargetClusters: {
            TpTargetCluster: TpTargetCluster[];
        };
    }

    export interface TpThorStatusRequest {
        Name?: string;
    }

    export interface TpThorStatusResponse {
        Exceptions: Exceptions;
        Name: string;
        Queue: string;
        Group: string;
        ThorMasterIPAddress: string;
        Port: int;
        StartTime: string;
        LogFile: string;
        Wuid: string;
        Graph: string;
        SubGraph: int;
        SubGraphDuration: int;
        AutoRefresh: int;
    }

    export interface TpXMLFileRequest {
        Name?: string;
    }

    export interface TpXMLFileResponse {
        Exceptions: Exceptions;
        thefile: base64Binary;
    }

}

export class TopologyServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsTopology", "1.32");
    }

    Ping(request: WsTopology.WsTopologyPingRequest): Promise<WsTopology.WsTopologyPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WsTopologyPingResponse");
    }

    SystemLog(request: WsTopology.SystemLogRequest): Promise<WsTopology.SystemLogResponse> {
        return this._connection.send("SystemLog", request, "json", false, undefined, "SystemLogResponse");
    }

    TpClusterInfo(request: WsTopology.TpClusterInfoRequest): Promise<WsTopology.TpClusterInfoResponse> {
        return this._connection.send("TpClusterInfo", request, "json", false, undefined, "TpClusterInfoResponse");
    }

    TpClusterQuery(request: WsTopology.TpClusterQueryRequest): Promise<WsTopology.TpClusterQueryResponse> {
        return this._connection.send("TpClusterQuery", request, "json", false, undefined, "TpClusterQueryResponse");
    }

    TpDropZoneQuery(request: WsTopology.TpDropZoneQueryRequest): Promise<WsTopology.TpDropZoneQueryResponse> {
        return this._connection.send("TpDropZoneQuery", request, "json", false, undefined, "TpDropZoneQueryResponse");
    }

    TpGetComponentFile(request: WsTopology.TpGetComponentFileRequest): Promise<WsTopology.TpGetComponentFileResponse> {
        return this._connection.send("TpGetComponentFile", request, "json", false, undefined, "TpGetComponentFileResponse");
    }

    TpGetServicePlugins(request: WsTopology.TpGetServicePluginsRequest): Promise<WsTopology.TpGetServicePluginsResponse> {
        return this._connection.send("TpGetServicePlugins", request, "json", false, undefined, "TpGetServicePluginsResponse");
    }

    TpGroupQuery(request: WsTopology.TpGroupQueryRequest): Promise<WsTopology.TpGroupQueryResponse> {
        return this._connection.send("TpGroupQuery", request, "json", false, undefined, "TpGroupQueryResponse");
    }

    TpListLogFiles(request: WsTopology.TpListLogFilesRequest): Promise<WsTopology.TpListLogFilesResponse> {
        return this._connection.send("TpListLogFiles", request, "json", false, undefined, "TpListLogFilesResponse");
    }

    TpListTargetClusters(request: WsTopology.TpListTargetClustersRequest): Promise<WsTopology.TpListTargetClustersResponse> {
        return this._connection.send("TpListTargetClusters", request, "json", false, undefined, "TpListTargetClustersResponse");
    }

    TpLogFile(request: WsTopology.TpLogFileRequest): Promise<WsTopology.TpLogFileResponse> {
        return this._connection.send("TpLogFile", request, "json", false, undefined, "TpLogFileResponse");
    }

    TpLogFileDisplay(request: WsTopology.TpLogFileRequest): Promise<WsTopology.TpLogFileResponse> {
        return this._connection.send("TpLogFileDisplay", request, "json", false, undefined, "TpLogFileResponse");
    }

    TpLogicalClusterQuery(request: WsTopology.TpLogicalClusterQueryRequest): Promise<WsTopology.TpLogicalClusterQueryResponse> {
        return this._connection.send("TpLogicalClusterQuery", request, "json", false, undefined, "TpLogicalClusterQueryResponse");
    }

    TpMachineInfo(request: WsTopology.TpMachineInfoRequest): Promise<WsTopology.TpMachineInfoResponse> {
        return this._connection.send("TpMachineInfo", request, "json", false, undefined, "TpMachineInfoResponse");
    }

    TpMachineQuery(request: WsTopology.TpMachineQueryRequest): Promise<WsTopology.TpMachineQueryResponse> {
        return this._connection.send("TpMachineQuery", request, "json", false, undefined, "TpMachineQueryResponse");
    }

    TpServiceQuery(request: WsTopology.TpServiceQueryRequest): Promise<WsTopology.TpServiceQueryResponse> {
        return this._connection.send("TpServiceQuery", request, "json", false, undefined, "TpServiceQueryResponse");
    }

    TpSetMachineStatus(request: WsTopology.TpSetMachineStatusRequest): Promise<WsTopology.TpSetMachineStatusResponse> {
        return this._connection.send("TpSetMachineStatus", request, "json", false, undefined, "TpSetMachineStatusResponse");
    }

    TpSwapNode(request: WsTopology.TpSwapNodeRequest): Promise<WsTopology.TpSwapNodeResponse> {
        return this._connection.send("TpSwapNode", request, "json", false, undefined, "TpSwapNodeResponse");
    }

    TpTargetClusterQuery(request: WsTopology.TpTargetClusterQueryRequest): Promise<WsTopology.TpTargetClusterQueryResponse> {
        return this._connection.send("TpTargetClusterQuery", request, "json", false, undefined, "TpTargetClusterQueryResponse");
    }

    TpThorStatus(request: WsTopology.TpThorStatusRequest): Promise<WsTopology.TpThorStatusResponse> {
        return this._connection.send("TpThorStatus", request, "json", false, undefined, "TpThorStatusResponse");
    }

    TpXMLFile(request: WsTopology.TpXMLFileRequest): Promise<WsTopology.TpXMLFileResponse> {
        return this._connection.send("TpXMLFile", request, "json", false, undefined, "TpXMLFileResponse");
    }

}
