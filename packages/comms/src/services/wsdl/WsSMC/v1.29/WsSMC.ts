import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsSMC {

    export type int = number;
    export type dateTime = string;
    export type unsignedInt = number;
    export type long = number;

    export enum LockModes {
        ALL = "ALL",
        READ = "READ",
        WRITE = "WRITE",
        HOLD = "HOLD",
        SUB = "SUB"
    }

    export enum RoxieControlCmdType {
        Attach = "Attach",
        Detach = "Detach",
        State = "State",
        Reload = "Reload",
        ReloadRetry = "ReloadRetry",
        MemLock = "MemLock",
        MemUnlock = "MemUnlock",
        GetMemLocked = "GetMemLocked"
    }

    export interface Activity {
        ChatURL: string;
        BannerContent: string;
        BannerColor: string;
        BannerSize: string;
        BannerScroll: string;
        BannerAction: int;
        EnableChatURL: boolean;
        FromSubmitBtn: boolean;
        SortBy: string;
        Descending: boolean;
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

    export interface TargetCluster {
        ClusterName: string;
        QueueName: string;
        QueueStatus: string;
        StatusDetails: string;
        Warning: string;
        ClusterType: int;
        ClusterSize: int;
        ClusterStatus: int;
    }

    export interface ThorClusterList {
        TargetCluster: TargetCluster[];
    }

    export interface RoxieClusterList {
        TargetCluster: TargetCluster[];
    }

    export interface HThorClusterList {
        TargetCluster: TargetCluster[];
    }

    export interface DFUJob {
        TimeStarted: string;
        Done: int;
        Total: int;
        Command: string;
    }

    export interface DFUJobs {
        DFUJob: DFUJob[];
    }

    export interface ActiveWorkunit {
        Wuid: string;
        State: string;
        StateID: int;
        Owner: string;
        Jobname: string;
        Server: string;
        Instance: string;
        Priority: string;
        Extra: string;
        GraphName: string;
        Duration: string;
        GID: string;
        QueueName: string;
        MemoryBlocked: int;
        IsPausing: boolean;
        Warning: string;
        ClusterName: string;
        ClusterType: string;
        ClusterQueueName: string;
        TargetClusterName: string;
        NoAccess: boolean;
    }

    export interface Running {
        ActiveWorkunit: ActiveWorkunit[];
    }

    export interface Queues {
        ServerJobQueue: ServerJobQueue[];
    }

    export interface ServerJobQueue {
        QueueName: string;
        Queues: Queues;
        ServerName: string;
        ServerType: string;
        QueueStatus: string;
        StatusDetails: string;
        NetworkAddress: string;
        Port: int;
    }

    export interface ServerJobQueues {
        ServerJobQueue: ServerJobQueue[];
    }

    export interface ActivityResponse {
        Exceptions: Exceptions;
        Build: string;
        ThorClusterList: ThorClusterList;
        RoxieClusterList: RoxieClusterList;
        HThorClusterList: HThorClusterList;
        DFUJobs: DFUJobs;
        Running: Running;
        BannerContent: string;
        BannerColor: string;
        BannerSize: string;
        BannerScroll: string;
        ChatURL: string;
        ShowBanner: int;
        ShowChatURL: int;
        SortBy: string;
        Descending: boolean;
        SuperUser: boolean;
        AccessRight: string;
        ServerJobQueues: ServerJobQueues;
        ActivityTime: string;
        DaliDetached: boolean;
    }

    export interface BrowseResources {

    }

    export interface HPCCResource {
        Name: string;
        Description: string;
        FileName: string;
        Version: string;
    }

    export interface HPCCResources {
        HPCCResource: HPCCResource[];
    }

    export interface HPCCResourceRepository {
        Name: string;
        Path: string;
        HPCCResources: HPCCResources;
    }

    export interface HPCCResourceRepositories {
        HPCCResourceRepository: HPCCResourceRepository[];
    }

    export interface BrowseResourcesResponse {
        Exceptions: Exceptions;
        PortalURL: string;
        ESPInstance: string;
        OS: int;
        UseResource: boolean;
        HPCCResourceRepositories: HPCCResourceRepositories;
    }

    export interface ClearQueue {
        Cluster: string;
        QueueName: string;
        Comment: string;
        ServerType: string;
        NetworkAddress: string;
        Port: int;
    }

    export interface TargetClusterInfo {
        ClusterName: string;
        QueueName: string;
        QueueStatus: string;
        StatusDetails: string;
        Warning: string;
        ClusterType: int;
        ClusterSize: int;
        ClusterStatus: int;
    }

    export interface ServerInfo {
        QueueName: string;
        Queues: Queues;
        ServerName: string;
        ServerType: string;
        QueueStatus: string;
        StatusDetails: string;
        NetworkAddress: string;
        Port: int;
    }

    export interface Workunits {
        ActiveWorkunit: ActiveWorkunit[];
    }

    export interface StatusServerInfo {
        TargetClusterInfo: TargetClusterInfo;
        ServerInfo: ServerInfo;
        Workunits: Workunits;
    }

    export interface SMCQueueResponse {
        Exceptions: Exceptions;
        StatusServerInfo: StatusServerInfo;
    }

    export interface GetBuildInfo {

    }

    export interface NamedValue {
        Name: string;
        Value: string;
    }

    export interface BuildInfo {
        NamedValue: NamedValue[];
    }

    export interface GetBuildInfoResponse {
        Exceptions: Exceptions;
        BuildInfo: BuildInfo;
    }

    export interface Dimension {
        Name: string;
        Value: string;
    }

    export interface Dimensions {
        Dimension: Dimension[];
    }

    export interface DateTimeRange {
        Start: dateTime;
        End: dateTime;
    }

    export interface GetGlobalMetrics {
        Category: string;
        Dimensions: Dimensions;
        DateTimeRange: DateTimeRange;
    }

    export interface Dimensions2 {
        Dimension: Dimension[];
    }

    export interface Stat {
        Name: string;
        Value: string;
    }

    export interface Stats {
        Stat: Stat[];
    }

    export interface GlobalMetric {
        Category: string;
        Dimensions: Dimensions2;
        DateTimeRange: DateTimeRange;
        Stats: Stats;
    }

    export interface GlobalMetrics {
        GlobalMetric: GlobalMetric[];
    }

    export interface GetGlobalMetricsResponse {
        Exceptions: Exceptions;
        GlobalMetrics: GlobalMetrics;
    }

    export interface GetStatusServerInfo {
        ServerName: string;
        ServerType: string;
        NetworkAddress: string;
        Port: int;
    }

    export interface GetStatusServerInfoResponse {
        Exceptions: Exceptions;
        StatusServerInfo: StatusServerInfo;
    }

    export interface GetThorQueueAvailability {

    }

    export interface ThorCluster {
        ClusterName: string;
        QueueName: string;
        QueueStatus: string;
        QueueAvailable: int;
        JobsRunning: int;
        JobsInQueue: int;
        QueueStatus2: int;
        ThorLCR: string;
        ClusterSize: int;
    }

    export interface ThorClusters {
        ThorCluster: ThorCluster[];
    }

    export interface GetThorQueueAvailabilityResponse {
        Exceptions: Exceptions;
        ThorClusters: ThorClusters;
    }

    export interface Index {

    }

    export interface SMCIndexResponse {
        Exceptions: Exceptions;
    }

    export interface LockQuery {
        EPIP: string;
        XPath: string;
        DurationMSLow: unsignedInt;
        DurationMSHigh: unsignedInt;
        TimeLockedLow: string;
        TimeLockedHigh: string;
        Mode: LockModes;
        AllFileLocks: boolean;
    }

    export interface ModeNames {
        Item: string[];
    }

    export interface Lock {
        EPIP: string;
        XPath: string;
        LogicalFile: string;
        SessionID: long;
        DurationMS: unsignedInt;
        TimeLocked: string;
        Modes: string;
        ModeNames: ModeNames;
    }

    export interface Locks {
        Lock: Lock[];
    }

    export interface LockQueryResponse {
        Exceptions: Exceptions;
        Locks: Locks;
        NumLocks: int;
    }

    export interface MoveJobBack {
        ClusterType: int;
        Cluster: string;
        QueueName: string;
        Wuid: string;
    }

    export interface SMCJobResponse {
        Exceptions: Exceptions;
    }

    export interface MoveJobDown {
        ClusterType: int;
        Cluster: string;
        QueueName: string;
        Wuid: string;
    }

    export interface MoveJobFront {
        ClusterType: int;
        Cluster: string;
        QueueName: string;
        Wuid: string;
    }

    export interface MoveJobUp {
        ClusterType: int;
        Cluster: string;
        QueueName: string;
        Wuid: string;
    }

    export interface NotInCommunityEdition {
        EEPortal: string;
    }

    export interface NotInCommunityEditionResponse {
        Exceptions: Exceptions;
    }

    export interface PauseQueue {
        Cluster: string;
        QueueName: string;
        Comment: string;
        ServerType: string;
        NetworkAddress: string;
        Port: int;
    }

    export interface Ping {

    }

    export interface WsSMCPingResponse {

    }

    export interface RecordGlobalMetrics {
        Category: string;
        Dimensions: Dimensions;
        Stats: Stats;
    }

    export interface RecordGlobalMetricsResponse {
        Exceptions: Exceptions;
        Result: string;
    }

    export interface RemoveJob {
        ClusterType: int;
        Cluster: string;
        QueueName: string;
        Wuid: string;
    }

    export interface ResumeQueue {
        Cluster: string;
        QueueName: string;
        Comment: string;
        ServerType: string;
        NetworkAddress: string;
        Port: int;
    }

    export interface RoxieControlCmd {
        ProcessCluster: string;
        TargetCluster: string;
        Command: RoxieControlCmdType;
        Wait: int;
    }

    export interface Endpoint {
        Address: string;
        Attached: boolean;
        StateHash: string;
        Status: string;
        MemLocked: boolean;
    }

    export interface Endpoints {
        Endpoint: Endpoint[];
    }

    export interface RoxieControlCmdResponse {
        Exceptions: Exceptions;
        Endpoints: Endpoints;
    }

    export interface QueryIds {
        Item: string[];
    }

    export interface RoxieXrefCmd {
        RoxieCluster: string;
        QueryIds: QueryIds;
        CheckAllNodes: boolean;
        Wait: int;
    }

    export interface RoxieXrefCmdResponse {
        Exceptions: Exceptions;
        Result: string;
    }

    export interface SetBanner {
        ChatURL: string;
        BannerContent: string;
        BannerColor: string;
        BannerSize: string;
        BannerScroll: string;
        BannerAction: int;
        EnableChatURL: boolean;
        FromSubmitBtn: boolean;
    }

    export interface SetBannerResponse {
        Exceptions: Exceptions;
    }

    export interface SMCJob {
        Wuid: string;
        QueueName: string;
    }

    export interface SMCJobs {
        SMCJob: SMCJob[];
    }

    export interface SetJobPriority {
        QueueName: string;
        Wuid: string;
        Priority: string;
        SMCJobs: SMCJobs;
    }

    export interface SMCPriorityResponse {
        Exceptions: Exceptions;
    }

    export interface StopQueue {
        Cluster: string;
        QueueName: string;
        Comment: string;
        ServerType: string;
        NetworkAddress: string;
        Port: int;
    }

}

export class SMCServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsSMC", "1.29");
    }

    Activity(request: Partial<WsSMC.Activity>): Promise<WsSMC.ActivityResponse> {
        return this._connection.send("Activity", request, "json", false, undefined, "ActivityResponse");
    }

    BrowseResources(request: Partial<WsSMC.BrowseResources>): Promise<WsSMC.BrowseResourcesResponse> {
        return this._connection.send("BrowseResources", request, "json", false, undefined, "BrowseResourcesResponse");
    }

    ClearQueue(request: Partial<WsSMC.ClearQueue>): Promise<WsSMC.SMCQueueResponse> {
        return this._connection.send("ClearQueue", request, "json", false, undefined, "SMCQueueResponse");
    }

    GetBuildInfo(request: Partial<WsSMC.GetBuildInfo>): Promise<WsSMC.GetBuildInfoResponse> {
        return this._connection.send("GetBuildInfo", request, "json", false, undefined, "GetBuildInfoResponse");
    }

    GetGlobalMetrics(request: Partial<WsSMC.GetGlobalMetrics>): Promise<WsSMC.GetGlobalMetricsResponse> {
        return this._connection.send("GetGlobalMetrics", request, "json", false, undefined, "GetGlobalMetricsResponse");
    }

    GetStatusServerInfo(request: Partial<WsSMC.GetStatusServerInfo>): Promise<WsSMC.GetStatusServerInfoResponse> {
        return this._connection.send("GetStatusServerInfo", request, "json", false, undefined, "GetStatusServerInfoResponse");
    }

    GetThorQueueAvailability(request: Partial<WsSMC.GetThorQueueAvailability>): Promise<WsSMC.GetThorQueueAvailabilityResponse> {
        return this._connection.send("GetThorQueueAvailability", request, "json", false, undefined, "GetThorQueueAvailabilityResponse");
    }

    Index(request: Partial<WsSMC.Index>): Promise<WsSMC.SMCIndexResponse> {
        return this._connection.send("Index", request, "json", false, undefined, "SMCIndexResponse");
    }

    LockQuery(request: Partial<WsSMC.LockQuery>): Promise<WsSMC.LockQueryResponse> {
        return this._connection.send("LockQuery", request, "json", false, undefined, "LockQueryResponse");
    }

    MoveJobBack(request: Partial<WsSMC.MoveJobBack>): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("MoveJobBack", request, "json", false, undefined, "SMCJobResponse");
    }

    MoveJobDown(request: Partial<WsSMC.MoveJobDown>): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("MoveJobDown", request, "json", false, undefined, "SMCJobResponse");
    }

    MoveJobFront(request: Partial<WsSMC.MoveJobFront>): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("MoveJobFront", request, "json", false, undefined, "SMCJobResponse");
    }

    MoveJobUp(request: Partial<WsSMC.MoveJobUp>): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("MoveJobUp", request, "json", false, undefined, "SMCJobResponse");
    }

    NotInCommunityEdition(request: Partial<WsSMC.NotInCommunityEdition>): Promise<WsSMC.NotInCommunityEditionResponse> {
        return this._connection.send("NotInCommunityEdition", request, "json", false, undefined, "NotInCommunityEditionResponse");
    }

    PauseQueue(request: Partial<WsSMC.PauseQueue>): Promise<WsSMC.SMCQueueResponse> {
        return this._connection.send("PauseQueue", request, "json", false, undefined, "SMCQueueResponse");
    }

    Ping(request: Partial<WsSMC.Ping>): Promise<WsSMC.WsSMCPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WsSMCPingResponse");
    }

    RecordGlobalMetrics(request: Partial<WsSMC.RecordGlobalMetrics>): Promise<WsSMC.RecordGlobalMetricsResponse> {
        return this._connection.send("RecordGlobalMetrics", request, "json", false, undefined, "RecordGlobalMetricsResponse");
    }

    RemoveJob(request: Partial<WsSMC.RemoveJob>): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("RemoveJob", request, "json", false, undefined, "SMCJobResponse");
    }

    ResumeQueue(request: Partial<WsSMC.ResumeQueue>): Promise<WsSMC.SMCQueueResponse> {
        return this._connection.send("ResumeQueue", request, "json", false, undefined, "SMCQueueResponse");
    }

    RoxieControlCmd(request: Partial<WsSMC.RoxieControlCmd>): Promise<WsSMC.RoxieControlCmdResponse> {
        return this._connection.send("RoxieControlCmd", request, "json", false, undefined, "RoxieControlCmdResponse");
    }

    RoxieXrefCmd(request: Partial<WsSMC.RoxieXrefCmd>): Promise<WsSMC.RoxieXrefCmdResponse> {
        return this._connection.send("RoxieXrefCmd", request, "json", false, undefined, "RoxieXrefCmdResponse");
    }

    SetBanner(request: Partial<WsSMC.SetBanner>): Promise<WsSMC.SetBannerResponse> {
        return this._connection.send("SetBanner", request, "json", false, undefined, "SetBannerResponse");
    }

    SetJobPriority(request: Partial<WsSMC.SetJobPriority>): Promise<WsSMC.SMCPriorityResponse> {
        return this._connection.send("SetJobPriority", request, "json", false, undefined, "SMCPriorityResponse");
    }

    StopQueue(request: Partial<WsSMC.StopQueue>): Promise<WsSMC.SMCQueueResponse> {
        return this._connection.send("StopQueue", request, "json", false, undefined, "SMCQueueResponse");
    }

}
