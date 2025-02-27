import { Cache, IEvent, scopedLogger, StateCallback, StateEvents, StateObject, StatePropCallback } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection.ts";
import { ESPExceptions } from "../espConnection.ts";
import { WsSMC } from "../services/wsSMC.ts";
import { FileSpray, FileSprayService, UpdateDFUWorkunitEx } from "../services/fileSpray.ts";
import * as WsTopology from "../services/wsTopology.ts";

const logger = scopedLogger("@hpcc-js/comms/dfuWorkunit.ts");

enum States {
    Unknown = 0,
    Scheduled,
    Queued,
    Started,
    Aborted,
    Failed,
    Finished,
    Monitoring,
    Aborting,
    NotFound = 999
}

export class DFUWorkunitCache extends Cache<{ BaseUrl: string, ID: string }, DFUWorkunit> {
    constructor() {
        super((obj) => {
            return `${obj.BaseUrl}-${obj.ID}`;
        });
    }
}
const _workunits = new DFUWorkunitCache();

export type DFUWorkunitEvents = "finished" | StateEvents;
export type UDFUWorkunitState = FileSpray.DFUWorkunit;
export type IDFUWorkunitState = FileSpray.DFUWorkunit | WsSMC.ActiveWorkunit;
export class DFUWorkunit extends StateObject<UDFUWorkunitState, IDFUWorkunitState> implements FileSpray.DFUWorkunit {
    connection: FileSprayService;
    topologyConnection: WsTopology.TopologyService;
    get BaseUrl() { return this.connection.baseUrl; }

    //  Accessors  ---
    get properties(): FileSpray.DFUWorkunit { return this.get(); }
    get ID(): string { return this.get("ID"); }
    get DFUServerName(): string { return this.get("DFUServerName"); }
    get ClusterName(): string { return this.get("ClusterName"); }
    get JobName(): string { return this.get("JobName"); }
    get Queue(): string { return this.get("Queue"); }
    get User(): string { return this.get("User"); }
    get isProtected(): boolean { return this.get("isProtected"); }
    get Command(): number { return this.get("Command"); }
    get CommandMessage(): string { return this.get("CommandMessage"); }
    get PercentDone(): number { return this.get("PercentDone"); }
    get SecsLeft(): number { return this.get("SecsLeft"); }
    get ProgressMessage(): string { return this.get("ProgressMessage"); }
    get SummaryMessage(): string { return this.get("SummaryMessage"); }
    get State(): number { return this.get("State", States.Unknown); }
    get SourceLogicalName(): string { return this.get("SourceLogicalName"); }
    get SourceIP(): string { return this.get("SourceIP"); }
    get SourceFilePath(): string { return this.get("SourceFilePath"); }
    get SourceDali(): string { return this.get("SourceDali"); }
    get SourceRecordSize(): number { return this.get("SourceRecordSize"); }
    get SourceFormat(): number { return this.get("SourceFormat"); }
    get RowTag(): string { return this.get("RowTag"); }
    get SourceNumParts(): number { return this.get("SourceNumParts"); }
    get SourceDirectory(): string { return this.get("SourceDirectory"); }
    get DestLogicalName(): string { return this.get("DestLogicalName"); }
    get DestGroupName(): string { return this.get("DestGroupName"); }
    get DestDirectory(): string { return this.get("DestDirectory"); }
    get DestIP(): string { return this.get("DestIP"); }
    get DestFilePath(): string { return this.get("DestFilePath"); }
    get DestFormat(): number { return this.get("DestFormat"); }
    get DestNumParts(): number { return this.get("DestNumParts"); }
    get DestRecordSize(): number { return this.get("DestRecordSize"); }
    get Replicate(): boolean { return this.get("Replicate"); }
    get Overwrite(): boolean { return this.get("Overwrite"); }
    get Compress(): boolean { return this.get("Compress"); }
    get SourceCsvSeparate(): string { return this.get("SourceCsvSeparate"); }
    get SourceCsvQuote(): string { return this.get("SourceCsvQuote"); }
    get SourceCsvTerminate(): string { return this.get("SourceCsvTerminate"); }
    get SourceCsvEscape(): string { return this.get("SourceCsvEscape"); }
    get TimeStarted(): string { return this.get("TimeStarted"); }
    get TimeStopped(): string { return this.get("TimeStopped"); }
    get StateMessage(): string { return this.get("StateMessage"); }
    get MonitorEventName(): string { return this.get("MonitorEventName"); }
    get MonitorSub(): boolean { return this.get("MonitorSub"); }
    get MonitorShotLimit(): number { return this.get("MonitorShotLimit"); }
    get SourceDiffKeyName(): string { return this.get("SourceDiffKeyName"); }
    get DestDiffKeyName(): string { return this.get("DestDiffKeyName"); }
    get Archived(): boolean { return this.get("Archived"); }
    get encrypt(): string { return this.get("encrypt"); }
    get decrypt(): string { return this.get("decrypt"); }
    get failIfNoSourceFile(): boolean { return this.get("failIfNoSourceFile"); }
    get recordStructurePresent(): boolean { return this.get("recordStructurePresent"); }
    get quotedTerminator(): boolean { return this.get("quotedTerminator"); }
    get preserveCompression(): boolean { return this.get("preserveCompression"); }
    get expireDays(): number { return this.get("expireDays"); }
    get PreserveFileParts(): boolean { return this.get("PreserveFileParts"); }
    get FileAccessCost(): number { return this.get("FileAccessCost"); }
    get KbPerSecAve(): number { return this.get("KbPerSecAve"); }
    get KbPerSec(): number { return this.get("KbPerSec"); }

    //  Factories  ---
    static create(optsConnection: IOptions | IConnection, dfuServerQueue: string): Promise<DFUWorkunit> {
        const retVal: DFUWorkunit = new DFUWorkunit(optsConnection);
        return retVal.connection.CreateDFUWorkunit({ DFUServerQueue: dfuServerQueue }).then((response) => {
            _workunits.set(retVal);
            retVal.set(response.result);
            return retVal;
        });
    }

    static attach(optsConnection: IOptions | IConnection, wuid: string, state?: IDFUWorkunitState): DFUWorkunit {
        const retVal: DFUWorkunit = _workunits.get({ BaseUrl: optsConnection.baseUrl, ID: wuid }, () => {
            return new DFUWorkunit(optsConnection, wuid);
        });
        if (state) {
            retVal.set(state);
        }
        return retVal;
    }

    static sprayFixed(server: IOptions | IConnection, request: Partial<FileSpray.SprayFixed>): Promise<DFUWorkunit> {
        const service = new FileSprayService(server);
        return service.SprayFixedEx({
            ...request
        }).then(response => {
            const wuid = response.wuid;
            return service.GetDFUWorkunit({ wuid }).then(response => {
                return DFUWorkunit.attach(server, wuid, response.result);
            });
        });
    }

    static sprayVariable(server: IOptions | IConnection, request: Partial<FileSpray.SprayVariable>): Promise<DFUWorkunit> {
        const service = new FileSprayService(server);
        return service.SprayVariableEx({
            ...request
        }).then(response => {
            const wuid = response.wuid;
            return service.GetDFUWorkunit({ wuid }).then(response => {
                return DFUWorkunit.attach(server, wuid, response.result);
            });
        });
    }

    static despray(server: IOptions | IConnection, request: Partial<FileSpray.Despray>): Promise<DFUWorkunit> {
        const service = new FileSprayService(server);
        return service.DesprayEx({
            ...request
        }).then(response => {
            const wuid = response.wuid;
            return service.GetDFUWorkunit({ wuid }).then(response => {
                return DFUWorkunit.attach(server, wuid, response.result);
            });
        });
    }

    update(request: Partial<UpdateDFUWorkunitEx>): Promise<FileSpray.UpdateDFUWorkunitResponse> {
        return this.connection.UpdateDFUWorkunitEx({
            wu: {
                JobName: request?.wu?.JobName ?? this.JobName,
                isProtected: request?.wu?.isProtected ?? this.isProtected,
                ID: this.ID,
                State: this.State
            },
            ClusterOrig: this.ClusterName,
            JobNameOrig: this.JobName,
            isProtectedOrig: this.isProtected,
            StateOrig: this.State
        });
    }

    isComplete(): boolean {
        switch (this.State) {
            case States.Finished:
            case States.Failed:
            case States.Aborted:
            case States.NotFound:
                return true;
            default:
        }
        return false;
    }

    isFailed() {
        if (this.isComplete() && this.State !== States.Finished) {
            return true;
        }
        return false;
    }

    isDeleted() {
        switch (this.State) {
            case States.NotFound:
                return true;
            default:
        }
        return false;
    }

    isRunning(): boolean {
        return !this.isComplete();
    }

    abort(): Promise<FileSpray.AbortDFUWorkunitResponse> {
        return this.connection.AbortDFUWorkunit({ wuid: this.ID });
    }

    delete() {
        return this.DFUWUAction(FileSpray.DFUWUActions.Delete).then(response => {
            return this.refresh().then(() => {
                this._monitor();
                return response;
            });
        });
    }

    async refresh(full: boolean = false): Promise<this> {
        await this.GetDFUWorkunit();
        return this;
    }

    fetchXML(callback?: void): Promise<string> {
        return this.DFUWUFile();
    }

    //  Monitoring  ---
    protected _monitor(): void {
        if (this.isComplete()) {
            this._monitorTickCount = 0;
            return;
        }
        super._monitor();
    }

    protected _monitorTimeoutDuration(): number {
        const retVal = super._monitorTimeoutDuration();
        if (this._monitorTickCount <= 1) {          //  Once
            return 3000;
        } else if (this._monitorTickCount <= 5) {   //  Twice
            return 6000;
        } else if (this._monitorTickCount <= 7) {   //  Twice
            return 12000;
        }
        return retVal;
    }

    protected DFUWUFile(_request: Partial<FileSpray.DFUWUFileRequest> = {}): Promise<string> {
        return this.connection.DFUWUFileEx({
            ..._request, Wuid: this.ID
        }).then(response => {
            //TODO: additional processing?
            return response;
        }).catch((e: ESPExceptions) => {
            return "";
        });
    }

    protected DFUWUAction(actionType: FileSpray.DFUWUActions): Promise<FileSpray.DFUWorkunitsActionResponse> {
        return this.connection.DFUWorkunitsAction({
            wuids: { Item: [this.ID] },
            Type: actionType
        }).then((response) => {
            if (actionType === FileSpray.DFUWUActions.Delete) return response;
            return this.refresh().then(() => {
                this._monitor();
                return response;
            });
        });
    }

    //  Events  ---
    on(eventID: DFUWorkunitEvents, propIDorCallback: StateCallback | keyof UDFUWorkunitState, callback?: StatePropCallback): this {
        if (this.isCallback(propIDorCallback)) {
            switch (eventID) {
                case "finished":
                    super.on("propChanged", "State", (changeInfo: IEvent) => {
                        if (this.isComplete()) {
                            propIDorCallback([changeInfo]);
                        }
                    });
                    break;
                case "changed":
                    super.on(eventID, propIDorCallback);
                    break;
                default:
            }
        } else {
            switch (eventID) {
                case "changed":
                    super.on(eventID, propIDorCallback, callback!);
                    break;
                default:
            }
        }
        this._monitor();
        return this;
    }

    watchUntilComplete(callback?: StateCallback): Promise<this> {
        return new Promise((resolve, _) => {
            const watchHandle = this.watch((changes) => {
                if (callback) {
                    callback(changes);
                }
                if (this.isComplete()) {
                    watchHandle.release();
                    resolve(this);
                }
            });
        });
    }

    watchUntilRunning(callback?: StateCallback): Promise<this> {
        return new Promise((resolve, _) => {
            const watchHandle = this.watch((changes) => {
                if (callback) {
                    callback(changes);
                }
                if (this.isComplete() || this.isRunning()) {
                    watchHandle.release();
                    resolve(this);
                }
            });
        });
    }

    //  ---  ---  ---
    protected constructor(optsConnection: IOptions | IConnection, wuid?: string) {
        super();
        this.connection = new FileSprayService(optsConnection);
        this.topologyConnection = new WsTopology.TopologyService(optsConnection);
        this.clearState(wuid);
    }

    clearState(wuid?: string) {
        this.clear({
            ID: wuid,
            State: States.Unknown
        });
    }

    //  FileSpray passthroughs  ---
    protected GetDFUWorkunit(_request: Partial<FileSpray.GetDFUWorkunit> = {}): Promise<FileSpray.GetDFUWorkunitResponse> {
        return this.connection.GetDFUWorkunit({ ..._request, wuid: this.ID }).then((response) => {
            this.set(response.result);
            return response;
        }).catch((e: ESPExceptions) => {
            //  deleted  ---
            const wuMissing = e.Exception.some((exception) => {
                if (exception.Code === 20080 || exception.Code === 20081) {
                    this.clearState(this.ID);
                    this.set("State", States.NotFound);
                    return true;
                }
                return false;
            });
            if (!wuMissing) {
                logger.warning(`Unexpected ESP exception: ${e.message}`);
                throw e;
            }
            return {} as FileSpray.GetDFUWorkunitResponse;
        });
    }
}