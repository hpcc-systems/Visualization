import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://192.168.3.22:8010/WsSMC/Activity?respjson_
    * http://json2ts.com/
*/

export namespace Activity {
    export interface Request {
        ChatURL?: string;
        BannerContent?: string;
        BannerColor?: string;
        BannerSize?: string;
        BannerScroll?: string;
        BannerAction?: string;
        EnableChatURL?: boolean;
        FromSubmitBtn?: boolean;
        SortBy?: string;
        Descending?: boolean;
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

    export interface ServerJobQueue {
        QueueName: string;
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

    export interface Response {
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
    }
}

export class SMCService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "WsSMC", "1.19");
    }

    Activity(request: Activity.Request): Promise<Activity.Response> {
        return this._connection.send("Activity", request);
    }
}
