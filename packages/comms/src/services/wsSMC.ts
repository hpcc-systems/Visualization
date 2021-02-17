import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://192.168.3.22:8010/WsSMC/Activity?respjson_
    * http://json2ts.com/
*/

export namespace WsSMC {

    export interface Activity {
        ChatURL: string;
        BannerContent: string;
        BannerColor: string;
        BannerSize: string;
        BannerScroll: string;
        BannerAction: number;
        EnableChatURL: boolean;
        FromSubmitBtn: boolean;
        SortBy: string;
        Descending: boolean;
    }

    export interface BrowseResources {
    }

    export interface ClearQueue {
        Cluster: string;
        QueueName: string;
        Comment: string;
        ServerType: string;
        NetworkAddress: string;
        Port: number;
    }

    export interface GetBuildInfo {
    }

    export interface GetStatusServerInfo {
        ServerName: string;
        ServerType: string;
        NetworkAddress: string;
        Port: number;
    }

    export interface GetThorQueueAvailability {
    }

    export interface Index {
    }

    export interface LockQuery {
        EPIP: string;
        XPath: string;
        DurationMSLow: number;
        DurationMSHigh: number;
        TimeLockedLow: string;
        TimeLockedHigh: string;
        Mode: string;
        AllFileLocks: boolean;
    }

    export interface MoveJobBack {
        ClusterType: number;
        Cluster: string;
        QueueName: string;
        Wuid: string;
    }

    export interface MoveJobDown {
        ClusterType: number;
        Cluster: string;
        QueueName: string;
        Wuid: string;
    }

    export interface MoveJobFront {
        ClusterType: number;
        Cluster: string;
        QueueName: string;
        Wuid: string;
    }

    export interface MoveJobUp {
        ClusterType: number;
        Cluster: string;
        QueueName: string;
        Wuid: string;
    }

    export interface NotInCommunityEdition {
        EEPortal: string;
    }

    export interface PauseQueue {
        Cluster: string;
        QueueName: string;
        Comment: string;
        ServerType: string;
        NetworkAddress: string;
        Port: number;
    }

    export interface Ping {
    }

    export interface RemoveJob {
        ClusterType: number;
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
        Port: number;
    }

    export interface RoxieControlCmd {
        ProcessCluster: string;
        TargetCluster: string;
        Command: string;
        Wait: number;
    }

    export interface SetBanner {
        ChatURL: string;
        BannerContent: string;
        BannerColor: string;
        BannerSize: string;
        BannerScroll: string;
        BannerAction: number;
        EnableChatURL: boolean;
        FromSubmitBtn: boolean;
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

    export interface StopQueue {
        Cluster: string;
        QueueName: string;
        Comment: string;
        ServerType: string;
        NetworkAddress: string;
        Port: number;
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
        ClusterType: number;
        ClusterSize: number;
        ClusterStatus: number;
    }

    export interface ThorClusterList {
        TargetCluster: TargetCluster[];
    }

    export interface TargetCluster2 {
        ClusterName: string;
        QueueName: string;
        QueueStatus: string;
        StatusDetails: string;
        Warning: string;
        ClusterType: number;
        ClusterSize: number;
        ClusterStatus: number;
    }

    export interface RoxieClusterList {
        TargetCluster: TargetCluster2[];
    }

    export interface TargetCluster3 {
        ClusterName: string;
        QueueName: string;
        QueueStatus: string;
        StatusDetails: string;
        Warning: string;
        ClusterType: number;
        ClusterSize: number;
        ClusterStatus: number;
    }

    export interface HThorClusterList {
        TargetCluster: TargetCluster3[];
    }

    export interface DFUJob {
        TimeStarted: string;
        Done: number;
        Total: number;
        Command: string;
    }

    export interface DFUJobs {
        DFUJob: DFUJob[];
    }

    export interface ActiveWorkunit {
        Wuid: string;
        State: string;
        StateID: number;
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
        MemoryBlocked: number;
        IsPausing: boolean;
        Warning: string;
        ClusterName: string;
        ClusterType: string;
        ClusterQueueName: string;
        TargetClusterName: string;
    }

    export interface Running {
        ActiveWorkunit: ActiveWorkunit[];
    }

    export interface Queues {
        ServerJobQueue: any[];
    }

    export interface ServerJobQueue {
        QueueName: string;
        Queues: Queues;
        ServerName: string;
        ServerType: string;
        QueueStatus: string;
        StatusDetails: string;
        NetworkAddress: string;
        Port: number;
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
        ShowBanner: number;
        ShowChatURL: number;
        SortBy: string;
        Descending: boolean;
        SuperUser: boolean;
        AccessRight: string;
        ServerJobQueues: ServerJobQueues;
        ActivityTime: string;
        DaliDetached: boolean;
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
        NetAddress: string;
        OS: number;
        UseResource: boolean;
        HPCCResourceRepositories: HPCCResourceRepositories;
    }

    export interface TargetClusterInfo {
        ClusterName: string;
        QueueName: string;
        QueueStatus: string;
        StatusDetails: string;
        Warning: string;
        ClusterType: number;
        ClusterSize: number;
        ClusterStatus: number;
    }

    export interface Queues2 {
        ServerJobQueue: any[];
    }

    export interface ServerInfo {
        QueueName: string;
        Queues: Queues2;
        ServerName: string;
        ServerType: string;
        QueueStatus: string;
        StatusDetails: string;
        NetworkAddress: string;
        Port: number;
    }

    export interface ActiveWorkunit2 {
        Wuid: string;
        State: string;
        StateID: number;
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
        MemoryBlocked: number;
        IsPausing: boolean;
        Warning: string;
        ClusterName: string;
        ClusterType: string;
        ClusterQueueName: string;
        TargetClusterName: string;
    }

    export interface Workunits {
        ActiveWorkunit: ActiveWorkunit2[];
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

    export interface TargetClusterInfo2 {
        ClusterName: string;
        QueueName: string;
        QueueStatus: string;
        StatusDetails: string;
        Warning: string;
        ClusterType: number;
        ClusterSize: number;
        ClusterStatus: number;
    }

    export interface Queues3 {
        ServerJobQueue: any[];
    }

    export interface ServerInfo2 {
        QueueName: string;
        Queues: Queues3;
        ServerName: string;
        ServerType: string;
        QueueStatus: string;
        StatusDetails: string;
        NetworkAddress: string;
        Port: number;
    }

    export interface ActiveWorkunit3 {
        Wuid: string;
        State: string;
        StateID: number;
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
        MemoryBlocked: number;
        IsPausing: boolean;
        Warning: string;
        ClusterName: string;
        ClusterType: string;
        ClusterQueueName: string;
        TargetClusterName: string;
    }

    export interface Workunits2 {
        ActiveWorkunit: ActiveWorkunit3[];
    }

    export interface StatusServerInfo2 {
        TargetClusterInfo: TargetClusterInfo2;
        ServerInfo: ServerInfo2;
        Workunits: Workunits2;
    }

    export interface GetStatusServerInfoResponse {
        Exceptions: Exceptions;
        StatusServerInfo: StatusServerInfo2;
    }

    export interface ThorCluster {
        ClusterName: string;
        QueueName: string;
        QueueStatus: string;
        QueueAvailable: number;
        JobsRunning: number;
        JobsInQueue: number;
        QueueStatus2: number;
        ThorLCR: string;
        ClusterSize: number;
    }

    export interface ThorClusters {
        ThorCluster: ThorCluster[];
    }

    export interface GetThorQueueAvailabilityResponse {
        Exceptions: Exceptions;
        ThorClusters: ThorClusters;
    }

    export interface SMCIndexResponse {
        Exceptions: Exceptions;
    }

    export interface ModeNames {
        Item: string[];
    }

    export interface Lock {
        EPIP: string;
        XPath: string;
        LogicalFile: string;
        SessionID: number;
        DurationMS: number;
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
        NumLocks: number;
    }

    export interface SMCJobResponse {
        Exceptions: Exceptions;
    }

    export interface NotInCommunityEditionResponse {
        Exceptions: Exceptions;
    }

    export interface WsSMCPingResponse {
    }

    export interface Endpoint {
        Address: string;
        Attached: boolean;
        StateHash: string;
        Status: string;
    }

    export interface Endpoints {
        Endpoint: Endpoint[];
    }

    export interface RoxieControlCmdResponse {
        Exceptions: Exceptions;
        Endpoints: Endpoints;
    }

    export interface SetBannerResponse {
        Exceptions: Exceptions;
    }

    export interface SMCPriorityResponse {
        Exceptions: Exceptions;
    }
}

export class SMCService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "WsSMC", "1.24");
    }

    connectionOptions(): IOptions {
        return this._connection.opts();
    }

    Activity(request: Partial<WsSMC.Activity>): Promise<WsSMC.ActivityResponse> {
        return this._connection.send("Activity", request).then(response => {
            return {
                Running: {
                    ActiveWorkunit: []
                },
                ...response
            };
        });
    }

    BrowseResources(request: Partial<WsSMC.BrowseResources>): Promise<WsSMC.BrowseResourcesResponse> {
        return this._connection.send("BrowseResources", request);
    }

    GetBuildInfo(request: Partial<WsSMC.GetBuildInfo>): Promise<WsSMC.GetBuildInfoResponse> {
        return this._connection.send("GetBuildInfo", request);
    }

    GetStatusServerInfo(request: Partial<WsSMC.GetStatusServerInfo>): Promise<WsSMC.GetStatusServerInfoResponse> {
        return this._connection.send("GetStatusServerInfo", request);
    }

    GetThorQueueAvailability(request: Partial<WsSMC.GetThorQueueAvailability>): Promise<WsSMC.GetThorQueueAvailabilityResponse> {
        return this._connection.send("GetThorQueueAvailability", request);
    }

    LockQuery(request: Partial<WsSMC.LockQuery>): Promise<WsSMC.LockQueryResponse> {
        return this._connection.send("LockQuery", request);
    }

    NotInCommunityEdition(request: Partial<WsSMC.NotInCommunityEdition>): Promise<WsSMC.NotInCommunityEditionResponse> {
        return this._connection.send("NotInCommunityEdition", request);
    }

    RoxieControlCmd(request: Partial<WsSMC.RoxieControlCmd>): Promise<WsSMC.RoxieControlCmdResponse> {
        return this._connection.send("RoxieControlCmd", request);
    }

    SetBanner(request: Partial<WsSMC.SetBanner>): Promise<WsSMC.SetBannerResponse> {
        return this._connection.send("SetBanner", request);
    }

    SMCJob(request: Partial<WsSMC.SMCJob>): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("SMCJob", request);
    }
}
