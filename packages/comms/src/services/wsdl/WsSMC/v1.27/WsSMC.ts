import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

export namespace WsSMC {

    export type int = number;
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
        Queues: {
            ServerJobQueue: ServerJobQueue[];
        };
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
        Exceptions: {
            Source: string;
            Exception: Exception[];
        };
        Build: string;
        ThorClusterList: {
            TargetCluster: TargetCluster[];
        };
        RoxieClusterList: {
            TargetCluster: TargetCluster[];
        };
        HThorClusterList: {
            TargetCluster: TargetCluster[];
        };
        DFUJobs: {
            DFUJob: DFUJob[];
        };
        Running: {
            ActiveWorkunit: ActiveWorkunit[];
        };
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
        ServerJobQueues: {
            ServerJobQueue: ServerJobQueue[];
        };
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
        HPCCResources: {
            HPCCResource: HPCCResource[];
        };
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
        HPCCResourceRepositories: {
            HPCCResourceRepository: HPCCResourceRepository[];
        };
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
        TargetClusterInfo: {
            ClusterName: string;
            QueueName: string;
            QueueStatus: string;
            StatusDetails: string;
            Warning: string;
            ClusterType: int;
            ClusterSize: int;
            ClusterStatus: int;
        };
        ServerInfo: {
            QueueName: string;
            Queues: Queues;
            ServerName: string;
            ServerType: string;
            QueueStatus: string;
            StatusDetails: string;
            NetworkAddress: string;
            Port: int;
        };
        Workunits: {
            ActiveWorkunit: ActiveWorkunit[];
        };
    }

    export interface SMCQueueResponse {
        Exceptions: Exceptions;
        StatusServerInfo: {
            TargetClusterInfo: {
                ClusterName: string;
                QueueName: string;
                QueueStatus: string;
                StatusDetails: string;
                Warning: string;
                ClusterType: int;
                ClusterSize: int;
                ClusterStatus: int;
            };
            ServerInfo: {
                QueueName: string;
                Queues: Queues;
                ServerName: string;
                ServerType: string;
                QueueStatus: string;
                StatusDetails: string;
                NetworkAddress: string;
                Port: int;
            };
            Workunits: {
                ActiveWorkunit: ActiveWorkunit[];
            };
        };
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
        BuildInfo: {
            NamedValue: NamedValue[];
        };
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
        ThorClusters: {
            ThorCluster: ThorCluster[];
        };
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
        ModeNames: {
            Item: string[];
        };
    }

    export interface Locks {
        Lock: Lock[];
    }

    export interface LockQueryResponse {
        Exceptions: Exceptions;
        Locks: {
            Lock: Lock[];
        };
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
        Endpoints: {
            Endpoint: Endpoint[];
        };
    }

    export interface QueryIds {
        Item: string[];
    }

    export interface RoxieXrefCmd {
        RoxieCluster: string;
        QueryIds: {
            Item: string[];
        };
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
        SMCJobs: {
            SMCJob: SMCJob[];
        };
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
        super(optsConnection, "WsSMC", "1.27");
    }

    Activity(request: WsSMC.Activity): Promise<WsSMC.ActivityResponse> {
        return this._connection.send("Activity", request, "json", false, undefined, "ActivityResponse");
    }

    BrowseResources(request: WsSMC.BrowseResources): Promise<WsSMC.BrowseResourcesResponse> {
        return this._connection.send("BrowseResources", request, "json", false, undefined, "BrowseResourcesResponse");
    }

    ClearQueue(request: WsSMC.ClearQueue): Promise<WsSMC.SMCQueueResponse> {
        return this._connection.send("ClearQueue", request, "json", false, undefined, "SMCQueueResponse");
    }

    GetBuildInfo(request: WsSMC.GetBuildInfo): Promise<WsSMC.GetBuildInfoResponse> {
        return this._connection.send("GetBuildInfo", request, "json", false, undefined, "GetBuildInfoResponse");
    }

    GetStatusServerInfo(request: WsSMC.GetStatusServerInfo): Promise<WsSMC.GetStatusServerInfoResponse> {
        return this._connection.send("GetStatusServerInfo", request, "json", false, undefined, "GetStatusServerInfoResponse");
    }

    GetThorQueueAvailability(request: WsSMC.GetThorQueueAvailability): Promise<WsSMC.GetThorQueueAvailabilityResponse> {
        return this._connection.send("GetThorQueueAvailability", request, "json", false, undefined, "GetThorQueueAvailabilityResponse");
    }

    Index(request: WsSMC.Index): Promise<WsSMC.SMCIndexResponse> {
        return this._connection.send("Index", request, "json", false, undefined, "SMCIndexResponse");
    }

    LockQuery(request: WsSMC.LockQuery): Promise<WsSMC.LockQueryResponse> {
        return this._connection.send("LockQuery", request, "json", false, undefined, "LockQueryResponse");
    }

    MoveJobBack(request: WsSMC.MoveJobBack): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("MoveJobBack", request, "json", false, undefined, "SMCJobResponse");
    }

    MoveJobDown(request: WsSMC.MoveJobDown): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("MoveJobDown", request, "json", false, undefined, "SMCJobResponse");
    }

    MoveJobFront(request: WsSMC.MoveJobFront): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("MoveJobFront", request, "json", false, undefined, "SMCJobResponse");
    }

    MoveJobUp(request: WsSMC.MoveJobUp): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("MoveJobUp", request, "json", false, undefined, "SMCJobResponse");
    }

    NotInCommunityEdition(request: WsSMC.NotInCommunityEdition): Promise<WsSMC.NotInCommunityEditionResponse> {
        return this._connection.send("NotInCommunityEdition", request, "json", false, undefined, "NotInCommunityEditionResponse");
    }

    PauseQueue(request: WsSMC.PauseQueue): Promise<WsSMC.SMCQueueResponse> {
        return this._connection.send("PauseQueue", request, "json", false, undefined, "SMCQueueResponse");
    }

    Ping(request: WsSMC.Ping): Promise<WsSMC.WsSMCPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WsSMCPingResponse");
    }

    RemoveJob(request: WsSMC.RemoveJob): Promise<WsSMC.SMCJobResponse> {
        return this._connection.send("RemoveJob", request, "json", false, undefined, "SMCJobResponse");
    }

    ResumeQueue(request: WsSMC.ResumeQueue): Promise<WsSMC.SMCQueueResponse> {
        return this._connection.send("ResumeQueue", request, "json", false, undefined, "SMCQueueResponse");
    }

    RoxieControlCmd(request: WsSMC.RoxieControlCmd): Promise<WsSMC.RoxieControlCmdResponse> {
        return this._connection.send("RoxieControlCmd", request, "json", false, undefined, "RoxieControlCmdResponse");
    }

    RoxieXrefCmd(request: WsSMC.RoxieXrefCmd): Promise<WsSMC.RoxieXrefCmdResponse> {
        return this._connection.send("RoxieXrefCmd", request, "json", false, undefined, "RoxieXrefCmdResponse");
    }

    SetBanner(request: WsSMC.SetBanner): Promise<WsSMC.SetBannerResponse> {
        return this._connection.send("SetBanner", request, "json", false, undefined, "SetBannerResponse");
    }

    SetJobPriority(request: WsSMC.SetJobPriority): Promise<WsSMC.SMCPriorityResponse> {
        return this._connection.send("SetJobPriority", request, "json", false, undefined, "SMCPriorityResponse");
    }

    StopQueue(request: WsSMC.StopQueue): Promise<WsSMC.SMCQueueResponse> {
        return this._connection.send("StopQueue", request, "json", false, undefined, "SMCQueueResponse");
    }

}
