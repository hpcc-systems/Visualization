import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsTopology {

    export type int = number;
    export type base64Binary = string;
    export type unsignedInt = number;
    export type long = number;

    export enum TpConfigResponseFormat {
        XML = "XML",
        YAML = "YAML"
    }

    export enum RoxieQueueFilter {
        All = "All",
        QueriesOnly = "QueriesOnly",
        WorkunitsOnly = "WorkunitsOnly"
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
        Code?: string;
        Audience?: string;
        Source?: string;
        Message?: string;
    }

    export interface Exceptions {
        Source?: string;
        Exception?: Exception[];
    }

    export interface SystemLogResponse {
        Exceptions?: Exceptions;
        thefile?: base64Binary;
    }

    export interface TpClusterInfoRequest {
        Name?: string;
    }

    export interface TpQueue {
        Name?: string;
        WorkUnit?: string;
    }

    export interface TpQueues {
        TpQueue?: TpQueue[];
    }

    export interface TpClusterInfoResponse {
        Exceptions?: Exceptions;
        Name?: string;
        WorkUnit?: string;
        TpQueues?: TpQueues;
    }

    export interface TpClusterQueryRequest {
        Type?: string;
    }

    export interface TpMachine {
        Name?: string;
        Netaddress?: string;
        ConfigNetaddress?: string;
        Domain?: string;
        Directory?: string;
        Type?: string;
        Available?: string;
        OS?: int;
        Path?: string;
        Port?: int;
        ProcessNumber?: int;
        Channels?: unsignedInt;
    }

    export interface TpMachines {
        TpMachine?: TpMachine[];
    }

    export interface TpCluster {
        Type?: string;
        Name?: string;
        QueueName?: string;
        Build?: string;
        Directory?: string;
        LogDirectory?: string;
        Desc?: string;
        Path?: string;
        DataModel?: string;
        OS?: int;
        HasThorSpareProcess?: boolean;
        TpMachines?: TpMachines;
    }

    export interface TpClusters {
        TpCluster?: TpCluster[];
    }

    export interface TpClusterQueryResponse {
        Exceptions?: Exceptions;
        EnableSNMP?: boolean;
        AcceptLanguage?: string;
        TpClusters?: TpClusters;
    }

    export interface ComponentNames {
        Item?: string[];
    }

    export interface TpComponentConfigurationRequest {
        ComponentNames?: ComponentNames;
    }

    export interface Result {
        ComponentName?: string;
        Configuration?: string;
    }

    export interface Results {
        Result?: Result[];
    }

    export interface TpComponentConfigurationResponse {
        Exceptions?: Exceptions;
        ConfigFormat?: TpConfigResponseFormat;
        Results?: Results;
    }

    export interface TpConfiguredComponentsRequest {

    }

    export interface ConfiguredComponents {
        Item?: string[];
    }

    export interface TpConfiguredComponentsResponse {
        Exceptions?: Exceptions;
        ConfiguredComponents?: ConfiguredComponents;
    }

    export interface TpDropZoneQueryRequest {
        Name?: string;
        ECLWatchVisibleOnly?: boolean;
    }

    export interface TpDropZone {
        Name?: string;
        Description?: string;
        Build?: string;
        Path?: string;
        ECLWatchVisible?: boolean;
        UMask?: string;
        TpMachines?: TpMachines;
    }

    export interface TpDropZones {
        TpDropZone?: TpDropZone[];
    }

    export interface TpDropZoneQueryResponse {
        Exceptions?: Exceptions;
        TpDropZones?: TpDropZones;
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
        Exceptions?: Exceptions;
        FileContents?: base64Binary;
    }

    export interface TpGetServicePluginsRequest {

    }

    export interface Plugin {
        ShortName?: string;
        LongName?: string;
        FolderName?: string;
        WidgetName?: string;
    }

    export interface Plugins {
        Plugin?: Plugin[];
    }

    export interface TpGetServicePluginsResponse {
        Exceptions?: Exceptions;
        Plugins?: Plugins;
    }

    export interface TpGroupQueryRequest {
        Kind?: string;
    }

    export interface TpGroup {
        Name?: string;
        Kind?: string;
        ReplicateOutputs?: boolean;
    }

    export interface TpGroups {
        TpGroup?: TpGroup[];
    }

    export interface TpGroupQueryResponse {
        Exceptions?: Exceptions;
        TpGroups?: TpGroups;
    }

    export interface TpListLogFilesRequest {
        NetworkAddress?: string;
        Path?: string;
    }

    export interface LogFileStruct {
        Name?: string;
        Path?: string;
        Host?: string;
        IsDir?: boolean;
        FileSize?: long;
        Modifiedtime?: string;
    }

    export interface Files {
        LogFileStruct?: LogFileStruct[];
    }

    export interface TpListLogFilesResponse {
        Exceptions?: Exceptions;
        Files?: Files;
    }

    export interface TpListTargetClustersRequest {

    }

    export interface TpClusterNameType {
        Name?: string;
        Type?: string;
        IsDefault?: boolean;
    }

    export interface TargetClusters {
        TpClusterNameType?: TpClusterNameType[];
    }

    export interface TpListTargetClustersResponse {
        Exceptions?: Exceptions;
        TargetClusters?: TargetClusters;
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
        Item?: string[];
    }

    export interface TpLogFileResponse {
        Exceptions?: Exceptions;
        Name?: string;
        Type?: string;
        StartDate?: string;
        EndDate?: string;
        LastHours?: int;
        FirstRows?: int;
        LastRows?: int;
        Reversely?: boolean;
        Zip?: boolean;
        FilterType?: int;
        LogData?: string;
        HasDate?: boolean;
        FileSize?: long;
        PageFrom?: long;
        PageTo?: long;
        PageNumber?: int;
        PrevPage?: int;
        NextPage?: int;
        TotalPages?: int;
        AcceptLanguage?: string;
        LogFieldNames?: LogFieldNames;
    }

    export interface TpLogicalClusterQueryRequest {
        EclServerQueue?: string;
        RoxieQueueFilter?: RoxieQueueFilter;
    }

    export interface TpLogicalCluster {
        Name?: string;
        Queue?: string;
        LanguageVersion?: string;
        Process?: string;
        Type?: string;
        QueriesOnly?: boolean;
    }

    export interface TpLogicalClusters {
        TpLogicalCluster?: TpLogicalCluster[];
    }

    export interface TpLogicalClusterQueryResponse {
        Exceptions?: Exceptions;
        TpLogicalClusters?: TpLogicalClusters;
    }

    export interface TpMachineInfoRequest {
        Name?: string;
        NetAddress?: string;
    }

    export interface MachineInfo {
        Name?: string;
        Netaddress?: string;
        ConfigNetaddress?: string;
        Domain?: string;
        Directory?: string;
        Type?: string;
        Available?: string;
        OS?: int;
        Path?: string;
        Port?: int;
        ProcessNumber?: int;
        Channels?: unsignedInt;
    }

    export interface TpMachineInfoResponse {
        Exceptions?: Exceptions;
        MachineInfo?: MachineInfo;
    }

    export interface TpMachineQueryRequest {
        Type?: TpMachineType;
        Cluster?: string;
        OldIP?: string;
        Path?: string;
        Directory?: string;
        LogDirectory?: string;
    }

    export interface TpMachineQueryResponse {
        Exceptions?: Exceptions;
        EnablePreflightInfo?: boolean;
        HasThorSpareProcess?: boolean;
        Type?: TpMachineType;
        Cluster?: string;
        OldIP?: string;
        LogDirectory?: string;
        Path?: string;
        MemThreshold?: int;
        DiskThreshold?: int;
        CpuThreshold?: int;
        MemThresholdType?: string;
        DiskThresholdType?: string;
        PreflightProcessFilter?: string;
        EnableSNMP?: boolean;
        AcceptLanguage?: string;
        TpMachines?: TpMachines;
    }

    export interface TpServiceQueryRequest {
        Type?: string;
    }

    export interface TpDali {
        Name?: string;
        Description?: string;
        Build?: string;
        BackupComputer?: string;
        BackupDirectory?: string;
        Type?: string;
        Path?: string;
        LogDirectory?: string;
        AuditLogDirectory?: string;
        TpMachines?: TpMachines;
    }

    export interface TpDalis {
        TpDali?: TpDali[];
    }

    export interface TpDfuServer {
        Name?: string;
        Description?: string;
        Build?: string;
        Queue?: string;
        Type?: string;
        Path?: string;
        LogDirectory?: string;
        TpMachines?: TpMachines;
    }

    export interface TpDfuServers {
        TpDfuServer?: TpDfuServer[];
    }

    export interface TpDkcSlave {
        Name?: string;
        Description?: string;
        Build?: string;
        Path?: string;
        TpMachines?: TpMachines;
    }

    export interface TpDkcSlaves {
        TpDkcSlave?: TpDkcSlave[];
    }

    export interface TpEclAgent {
        Name?: string;
        Description?: string;
        Build?: string;
        Type?: string;
        Path?: string;
        DaliServer?: string;
        LogDir?: string;
        TpMachines?: TpMachines;
    }

    export interface TpEclAgents {
        TpEclAgent?: TpEclAgent[];
    }

    export interface TpEclServer {
        Name?: string;
        Description?: string;
        Build?: string;
        LogDirectory?: string;
        Type?: string;
        Path?: string;
        TpMachines?: TpMachines;
    }

    export interface TpEclServers {
        TpEclServer?: TpEclServer[];
    }

    export interface TpEclCCServers {
        TpEclServer?: TpEclServer[];
    }

    export interface TpEclScheduler {
        Name?: string;
        Description?: string;
        Build?: string;
        LogDirectory?: string;
        Type?: string;
        Path?: string;
        TpMachines?: TpMachines;
    }

    export interface TpEclSchedulers {
        TpEclScheduler?: TpEclScheduler[];
    }

    export interface TpBinding {
        Name?: string;
        Service?: string;
        ServiceType?: string;
        BindingType?: string;
        ServiceBuildSet?: string;
        Port?: string;
        Protocol?: string;
    }

    export interface TpBindings {
        TpBinding?: TpBinding[];
    }

    export interface TpEspServer {
        Name?: string;
        Description?: string;
        Build?: string;
        Type?: string;
        Path?: string;
        LogDirectory?: string;
        TpMachines?: TpMachines;
        TpBindings?: TpBindings;
    }

    export interface TpEspServers {
        TpEspServer?: TpEspServer[];
    }

    export interface TpFTSlave {
        Name?: string;
        Description?: string;
        Build?: string;
        Path?: string;
        TpMachines?: TpMachines;
    }

    export interface TpFTSlaves {
        TpFTSlave?: TpFTSlave[];
    }

    export interface TpGenesisServer {
        Name?: string;
        Description?: string;
        Build?: string;
        Path?: string;
        TpMachines?: TpMachines;
    }

    export interface TpGenesisServers {
        TpGenesisServer?: TpGenesisServer[];
    }

    export interface TpLdapServer {
        Name?: string;
        Description?: string;
        Build?: string;
        Path?: string;
        TpMachines?: TpMachines;
    }

    export interface TpLdapServers {
        TpLdapServer?: TpLdapServer[];
    }

    export interface TpMySqlServer {
        Name?: string;
        Description?: string;
        Build?: string;
        Path?: string;
        TpMachines?: TpMachines;
    }

    export interface TpMySqlServers {
        TpMySqlServer?: TpMySqlServer[];
    }

    export interface TpSashaServer {
        Name?: string;
        Description?: string;
        Build?: string;
        Path?: string;
        LogDirectory?: string;
        TpMachines?: TpMachines;
    }

    export interface TpSashaServers {
        TpSashaServer?: TpSashaServer[];
    }

    export interface TpSparkThor {
        Name?: string;
        Build?: string;
        ThorClusterName?: string;
        ThorPath?: string;
        SparkExecutorCores?: unsignedInt;
        SparkExecutorMemory?: long;
        SparkMasterPort?: unsignedInt;
        SparkMasterWebUIPort?: unsignedInt;
        SparkWorkerCores?: unsignedInt;
        SparkWorkerMemory?: long;
        SparkWorkerPort?: unsignedInt;
        LogDirectory?: string;
        Path?: string;
        TpMachines?: TpMachines;
    }

    export interface TpSparkThors {
        TpSparkThor?: TpSparkThor[];
    }

    export interface ServiceList {
        TpDalis?: TpDalis;
        TpDfuServers?: TpDfuServers;
        TpDkcSlaves?: TpDkcSlaves;
        TpDropZones?: TpDropZones;
        TpEclAgents?: TpEclAgents;
        TpEclServers?: TpEclServers;
        TpEclCCServers?: TpEclCCServers;
        TpEclSchedulers?: TpEclSchedulers;
        TpEspServers?: TpEspServers;
        TpFTSlaves?: TpFTSlaves;
        TpGenesisServers?: TpGenesisServers;
        TpLdapServers?: TpLdapServers;
        TpMySqlServers?: TpMySqlServers;
        TpSashaServers?: TpSashaServers;
        TpSparkThors?: TpSparkThors;
    }

    export interface TpServiceQueryResponse {
        Exceptions?: Exceptions;
        MemThreshold?: int;
        DiskThreshold?: int;
        CpuThreshold?: int;
        EncapsulatedSystem?: boolean;
        EnableSNMP?: boolean;
        PreflightProcessFilter?: string;
        AcceptLanguage?: string;
        MemThresholdType?: string;
        DiskThresholdType?: string;
        ServiceList?: ServiceList;
    }

    export interface TpSetMachineStatusRequest {
        MachinePath?: string;
        StatusValue?: string;
    }

    export interface TpSetMachineStatusResponse {
        Exceptions?: Exceptions;
        TpSetMachineStatusResult?: boolean;
    }

    export interface TpSwapNodeRequest {
        Cluster?: string;
        OldIP?: string;
        NewIP?: string;
    }

    export interface TpSwapNodeResponse {
        Exceptions?: Exceptions;
        TpSwapNodeResult?: boolean;
    }

    export interface TpTargetClusterQueryRequest {
        Type?: string;
        Name?: string;
        ShowDetails?: boolean;
    }

    export interface TpTargetCluster {
        Name?: string;
        Prefix?: string;
        Type?: string;
        TpClusters?: TpClusters;
        TpEclCCServers?: TpEclCCServers;
        TpEclServers?: TpEclServers;
        TpEclAgents?: TpEclAgents;
        TpEclSchedulers?: TpEclSchedulers;
    }

    export interface TpTargetClusters {
        TpTargetCluster?: TpTargetCluster[];
    }

    export interface TpTargetClusterQueryResponse {
        Exceptions?: Exceptions;
        ShowDetails?: boolean;
        MemThreshold?: int;
        DiskThreshold?: int;
        CpuThreshold?: int;
        MemThresholdType?: string;
        DiskThresholdType?: string;
        PreflightProcessFilter?: string;
        AcceptLanguage?: string;
        TpTargetClusters?: TpTargetClusters;
    }

    export interface TpThorStatusRequest {
        Name?: string;
    }

    export interface TpThorStatusResponse {
        Exceptions?: Exceptions;
        Name?: string;
        Queue?: string;
        Group?: string;
        ThorMasterIPAddress?: string;
        Port?: int;
        StartTime?: string;
        LogFile?: string;
        Wuid?: string;
        Graph?: string;
        SubGraph?: int;
        SubGraphDuration?: int;
        AutoRefresh?: int;
    }

    export interface TpXMLFileRequest {
        Name?: string;
    }

    export interface TpXMLFileResponse {
        Exceptions?: Exceptions;
        thefile?: base64Binary;
    }

}

export class TopologyServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsTopology", "1.33");
    }

    Ping(request: WsTopology.WsTopologyPingRequest, abortSignal?: AbortSignal): Promise<WsTopology.WsTopologyPingResponse> {
        return this._connection.send("Ping", request, "json", false, abortSignal, "WsTopologyPingResponse");
    }

    SystemLog(request: WsTopology.SystemLogRequest, abortSignal?: AbortSignal): Promise<WsTopology.SystemLogResponse> {
        return this._connection.send("SystemLog", request, "json", false, abortSignal, "SystemLogResponse");
    }

    TpClusterInfo(request: WsTopology.TpClusterInfoRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpClusterInfoResponse> {
        return this._connection.send("TpClusterInfo", request, "json", false, abortSignal, "TpClusterInfoResponse");
    }

    TpClusterQuery(request: WsTopology.TpClusterQueryRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpClusterQueryResponse> {
        return this._connection.send("TpClusterQuery", request, "json", false, abortSignal, "TpClusterQueryResponse");
    }

    TpComponentConfiguration(request: WsTopology.TpComponentConfigurationRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpComponentConfigurationResponse> {
        return this._connection.send("TpComponentConfiguration", request, "json", false, abortSignal, "TpComponentConfigurationResponse");
    }

    TpConfiguredComponents(request: WsTopology.TpConfiguredComponentsRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpConfiguredComponentsResponse> {
        return this._connection.send("TpConfiguredComponents", request, "json", false, abortSignal, "TpConfiguredComponentsResponse");
    }

    TpDropZoneQuery(request: WsTopology.TpDropZoneQueryRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpDropZoneQueryResponse> {
        return this._connection.send("TpDropZoneQuery", request, "json", false, abortSignal, "TpDropZoneQueryResponse");
    }

    TpGetComponentFile(request: WsTopology.TpGetComponentFileRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpGetComponentFileResponse> {
        return this._connection.send("TpGetComponentFile", request, "json", false, abortSignal, "TpGetComponentFileResponse");
    }

    TpGetServicePlugins(request: WsTopology.TpGetServicePluginsRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpGetServicePluginsResponse> {
        return this._connection.send("TpGetServicePlugins", request, "json", false, abortSignal, "TpGetServicePluginsResponse");
    }

    TpGroupQuery(request: WsTopology.TpGroupQueryRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpGroupQueryResponse> {
        return this._connection.send("TpGroupQuery", request, "json", false, abortSignal, "TpGroupQueryResponse");
    }

    TpListLogFiles(request: WsTopology.TpListLogFilesRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpListLogFilesResponse> {
        return this._connection.send("TpListLogFiles", request, "json", false, abortSignal, "TpListLogFilesResponse");
    }

    TpListTargetClusters(request: WsTopology.TpListTargetClustersRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpListTargetClustersResponse> {
        return this._connection.send("TpListTargetClusters", request, "json", false, abortSignal, "TpListTargetClustersResponse");
    }

    TpLogFile(request: WsTopology.TpLogFileRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpLogFileResponse> {
        return this._connection.send("TpLogFile", request, "json", false, abortSignal, "TpLogFileResponse");
    }

    TpLogFileDisplay(request: WsTopology.TpLogFileRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpLogFileResponse> {
        return this._connection.send("TpLogFileDisplay", request, "json", false, abortSignal, "TpLogFileResponse");
    }

    TpLogicalClusterQuery(request: WsTopology.TpLogicalClusterQueryRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpLogicalClusterQueryResponse> {
        return this._connection.send("TpLogicalClusterQuery", request, "json", false, abortSignal, "TpLogicalClusterQueryResponse");
    }

    TpMachineInfo(request: WsTopology.TpMachineInfoRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpMachineInfoResponse> {
        return this._connection.send("TpMachineInfo", request, "json", false, abortSignal, "TpMachineInfoResponse");
    }

    TpMachineQuery(request: WsTopology.TpMachineQueryRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpMachineQueryResponse> {
        return this._connection.send("TpMachineQuery", request, "json", false, abortSignal, "TpMachineQueryResponse");
    }

    TpServiceQuery(request: WsTopology.TpServiceQueryRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpServiceQueryResponse> {
        return this._connection.send("TpServiceQuery", request, "json", false, abortSignal, "TpServiceQueryResponse");
    }

    TpSetMachineStatus(request: WsTopology.TpSetMachineStatusRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpSetMachineStatusResponse> {
        return this._connection.send("TpSetMachineStatus", request, "json", false, abortSignal, "TpSetMachineStatusResponse");
    }

    TpSwapNode(request: WsTopology.TpSwapNodeRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpSwapNodeResponse> {
        return this._connection.send("TpSwapNode", request, "json", false, abortSignal, "TpSwapNodeResponse");
    }

    TpTargetClusterQuery(request: WsTopology.TpTargetClusterQueryRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpTargetClusterQueryResponse> {
        return this._connection.send("TpTargetClusterQuery", request, "json", false, abortSignal, "TpTargetClusterQueryResponse");
    }

    TpThorStatus(request: WsTopology.TpThorStatusRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpThorStatusResponse> {
        return this._connection.send("TpThorStatus", request, "json", false, abortSignal, "TpThorStatusResponse");
    }

    TpXMLFile(request: WsTopology.TpXMLFileRequest, abortSignal?: AbortSignal): Promise<WsTopology.TpXMLFileResponse> {
        return this._connection.send("TpXMLFile", request, "json", false, abortSignal, "TpXMLFileResponse");
    }

}
