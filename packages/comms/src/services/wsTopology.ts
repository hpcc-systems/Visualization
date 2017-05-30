import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://192.168.3.22:8010/WsTopology/TpLogicalClusterQuery?respjson_
    * http://json2ts.com/
*/

export namespace TpLogicalClusterQuery {
    export interface Request {
        EclServerQueue?: string;
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
        TpMachines: TpMachines;
    }

    export interface TpDalis {
        TpDali: TpDali[];
    }

    export interface TpMachine2 {
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
    }

    export interface TpMachines2 {
        TpMachine: TpMachine2[];
    }

    export interface TpDfuServer {
        Name: string;
        Description: string;
        Build: string;
        Queue: string;
        Type: string;
        Path: string;
        LogDirectory: string;
        TpMachines: TpMachines2;
    }

    export interface TpDfuServers {
        TpDfuServer: TpDfuServer[];
    }

    export interface TpMachine3 {
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
    }

    export interface TpMachines3 {
        TpMachine: TpMachine3[];
    }

    export interface TpDkcSlave {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        TpMachines: TpMachines3;
    }

    export interface TpDkcSlaves {
        TpDkcSlave: TpDkcSlave[];
    }

    export interface TpMachine4 {
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
    }

    export interface TpMachines4 {
        TpMachine: TpMachine4[];
    }

    export interface TpDropZone {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        ECLWatchVisible: boolean;
        UMask: string;
        TpMachines: TpMachines4;
    }

    export interface TpDropZones {
        TpDropZone: TpDropZone[];
    }

    export interface TpMachine5 {
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
    }

    export interface TpMachines5 {
        TpMachine: TpMachine5[];
    }

    export interface TpEclAgent {
        Name: string;
        Description: string;
        Build: string;
        Type: string;
        Path: string;
        DaliServer: string;
        LogDir: string;
        TpMachines: TpMachines5;
    }

    export interface TpEclAgents {
        TpEclAgent: TpEclAgent[];
    }

    export interface TpMachine6 {
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
    }

    export interface TpMachines6 {
        TpMachine: TpMachine6[];
    }

    export interface TpEclServer {
        Name: string;
        Description: string;
        Build: string;
        LogDirectory: string;
        Type: string;
        Path: string;
        TpMachines: TpMachines6;
    }

    export interface TpEclServers {
        TpEclServer: TpEclServer[];
    }

    export interface TpMachine7 {
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
    }

    export interface TpMachines7 {
        TpMachine: TpMachine7[];
    }

    export interface TpEclServer2 {
        Name: string;
        Description: string;
        Build: string;
        LogDirectory: string;
        Type: string;
        Path: string;
        TpMachines: TpMachines7;
    }

    export interface TpEclCCServers {
        TpEclServer: TpEclServer2[];
    }

    export interface TpMachine8 {
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
    }

    export interface TpMachines8 {
        TpMachine: TpMachine8[];
    }

    export interface TpEclScheduler {
        Name: string;
        Description: string;
        Build: string;
        LogDirectory: string;
        Type: string;
        Path: string;
        TpMachines: TpMachines8;
    }

    export interface TpEclSchedulers {
        TpEclScheduler: TpEclScheduler[];
    }

    export interface TpMachine9 {
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
    }

    export interface TpMachines9 {
        TpMachine: TpMachine9[];
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
        TpMachines: TpMachines9;
        TpBindings: TpBindings;
    }

    export interface TpEspServers {
        TpEspServer: TpEspServer[];
    }

    export interface TpMachine10 {
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
    }

    export interface TpMachines10 {
        TpMachine: TpMachine10[];
    }

    export interface TpFTSlave {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        TpMachines: TpMachines10;
    }

    export interface TpFTSlaves {
        TpFTSlave: TpFTSlave[];
    }

    export interface TpMachine11 {
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
    }

    export interface TpMachines11 {
        TpMachine: TpMachine11[];
    }

    export interface TpGenesisServer {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        TpMachines: TpMachines11;
    }

    export interface TpGenesisServers {
        TpGenesisServer: TpGenesisServer[];
    }

    export interface TpMachine12 {
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
    }

    export interface TpMachines12 {
        TpMachine: TpMachine12[];
    }

    export interface TpLdapServer {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        TpMachines: TpMachines12;
    }

    export interface TpLdapServers {
        TpLdapServer: TpLdapServer[];
    }

    export interface TpMachine13 {
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
    }

    export interface TpMachines13 {
        TpMachine: TpMachine13[];
    }

    export interface TpMySqlServer {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        TpMachines: TpMachines13;
    }

    export interface TpMySqlServers {
        TpMySqlServer: TpMySqlServer[];
    }

    export interface TpMachine14 {
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
    }

    export interface TpMachines14 {
        TpMachine: TpMachine14[];
    }

    export interface TpSashaServer {
        Name: string;
        Description: string;
        Build: string;
        Path: string;
        LogDirectory: string;
        TpMachines: TpMachines14;
    }

    export interface TpSashaServers {
        TpSashaServer: TpSashaServer[];
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

export class TopologyService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "WsTopology", "1.25");
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
}
