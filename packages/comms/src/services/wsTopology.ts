import { IConnection, IOptions } from "../connection";
import { Service } from "../espConnection";

/*
    Response structures generated via:
    * http://localhost:8010/WsTopology/TpLogicalClusterQuery?respjson_
    * http://json2ts.com/
*/

export namespace TpLogicalClusterQuery {
    export enum RoxieQueueFilter {
        All = "All",
        QueriesOnly = "QueriesOnly",
        WorkunitsOnly = "WorkunitsOnly"
    }

    export interface Request {
        EclServerQueue?: string;
        RoxieQueueFilter?: RoxieQueueFilter;
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

    export interface TpLogicalCluster {
        Name: string;
        Queue: string;
        LanguageVersion: string;
        Process: string;
        Type: string;
        QueriesOnly?: boolean;
    }

    export interface TpLogicalClusters {
        TpLogicalCluster: TpLogicalCluster[];
    }

    export interface Response {
        Exceptions: Exceptions;
        TpLogicalClusters: TpLogicalClusters;
    }
}

export namespace TpServiceQuery {
    export interface Request {
        Type?: string;
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

    export interface TpMachine {
        Name: string;
        Netaddress: string;
        ConfigNetaddress: string;
        Domain: string;
        Directory: string;
        Type: string;
        Available: string;
        OS: number;
        Path: string;
        Port: number;
        ProcessNumber: number;
        Channels: number;
    }

    export interface TpMachines {
        TpMachine: TpMachine[];
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
        TpBindings: TpBindings;
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
        SparkExecutorCores: number;
        SparkExecutorMemory: number;
        SparkMasterPort: number;
        SparkMasterWebUIPort: number;
        SparkWorkerCores: number;
        SparkWorkerMemory: number;
        SparkWorkerPort: number;
        LogDirectory: string;
        Path: string;
        TpMachines: TpMachines;
    }

    export interface TpSparkThors {
        TpSparkThor: TpSparkThor[];
    }

    export interface ServiceList {
        TpDalis: TpDalis;
        TpDfuServers: TpDfuServers;
        TpDkcSlaves: TpDkcSlaves;
        TpDropZones: TpDropZones;
        TpEclAgents: TpEclAgents;
        TpEclServers: TpEclServers;
        TpEclCCServers: TpEclCCServers;
        TpEclSchedulers: TpEclSchedulers;
        TpEspServers: TpEspServers;
        TpFTSlaves: TpFTSlaves;
        TpGenesisServers: TpGenesisServers;
        TpLdapServers: TpLdapServers;
        TpMySqlServers: TpMySqlServers;
        TpSashaServers: TpSashaServers;
        TpSparkThors: TpSparkThors;
    }

    export interface Response {
        Exceptions: Exceptions;
        MemThreshold: number;
        DiskThreshold: number;
        CpuThreshold: number;
        EncapsulatedSystem: boolean;
        EnableSNMP: boolean;
        PreflightProcessFilter: string;
        AcceptLanguage: string;
        MemThresholdType: string;
        DiskThresholdType: string;
        ServiceList: ServiceList;
    }
}

export namespace TpTargetClusterQuery {

    export interface Request {
        Type?: string;
        Name?: string;
        ShowDetails?: boolean;
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

    export interface TpMachine {
        Name: string;
        Netaddress: string;
        ConfigNetaddress: string;
        Domain: string;
        Directory: string;
        Type: string;
        Available: string;
        OS: number;
        Path: string;
        Port: number;
        ProcessNumber: number;
        Channels: number;
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
        OS: number;
        HasThorSpareProcess: boolean;
        TpMachines: TpMachines;
    }

    export interface TpClusters {
        TpCluster: TpCluster[];
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

    export interface TpEclCCServers {
        TpEclServer: TpEclServer[];
    }

    export interface TpEclServers {
        TpEclServer: TpEclServer[];
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

    export interface Response {
        Exceptions: Exceptions;
        ShowDetails: boolean;
        MemThreshold: number;
        DiskThreshold: number;
        CpuThreshold: number;
        MemThresholdType: string;
        DiskThresholdType: string;
        PreflightProcessFilter: string;
        AcceptLanguage: string;
        TpTargetClusters: TpTargetClusters;
    }
}

export namespace TpListTargetClusters {

    export interface Request {
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

    export interface TpClusterNameType {
        Name: string;
        Type: string;
        IsDefault: boolean;
    }

    export interface TargetClusters {
        TpClusterNameType: TpClusterNameType[];
    }

    export interface Response {
        Exceptions: Exceptions;
        TargetClusters: TargetClusters;
    }

}

export class TopologyService extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsTopology", "1.31");
    }

    connectionOptions(): IOptions {
        return this._connection.opts();
    }

    protocol(): string {
        const parts = this._connection.opts().baseUrl.split("//");
        return parts[0];
    }

    ip(): string {
        const parts = this._connection.opts().baseUrl.split("//");
        const parts2 = parts[1].split(":");
        return parts2[0];
    }

    TpLogicalClusterQuery(request: TpLogicalClusterQuery.Request = {}): Promise<TpLogicalClusterQuery.Response> {
        return this._connection.send("TpLogicalClusterQuery", request);
    }

    DefaultTpLogicalClusterQuery(request: TpLogicalClusterQuery.Request = {}): Promise<TpLogicalClusterQuery.TpLogicalCluster> {
        return this.TpLogicalClusterQuery(request).then((response) => {
            if ((response as any).default) {
                return (response as any).default;
            }
            let firstHThor;
            let first;
            response.TpLogicalClusters.TpLogicalCluster.some((item, idx) => {
                if (idx === 0) {
                    first = item;
                }
                if (item.Type === "hthor") {
                    firstHThor = item;
                    return true;
                }
                return false;
            });
            return firstHThor || first;
        });
    }

    TpServiceQuery(request: TpServiceQuery.Request): Promise<TpServiceQuery.Response> {
        return this._connection.send("TpServiceQuery", request);
    }

    TpTargetClusterQuery(request: TpTargetClusterQuery.Request): Promise<TpTargetClusterQuery.Response> {
        return this._connection.send("TpTargetClusterQuery", request);
    }

    TpListTargetClusters(request: TpListTargetClusters.Request): Promise<TpListTargetClusters.Response> {
        return this._connection.send("TpListTargetClusters", request);
    }
}
