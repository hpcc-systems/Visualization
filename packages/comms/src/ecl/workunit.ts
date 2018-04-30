import { Cache, deepMixinT, IEvent, scopedLogger, StateCallback, StateEvents, StateObject, StatePropCallback, StringAnyMap, XMLNode } from "@hpcc-js/util";
import { utcFormat, utcParse } from "d3-time-format";
import { IConnection, IOptions } from "../connection";
import { ESPExceptions } from "../espConnection";
import { SMCActivity } from "../services/wsSMC";
import * as WsTopology from "../services/wsTopology";
import * as WsWorkunits from "../services/wsWorkunits";
import { createXGMMLGraph, ECLGraph, GraphCache, XGMMLGraph, XGMMLVertex } from "./graph";
import { Resource } from "./resource";
import { Result, ResultCache } from "./result";
import { Scope } from "./scope";
import { SourceFile } from "./sourceFile";
import { Timer } from "./timer";

const formatter = utcFormat("%Y-%m-%dT%H:%M:%S.%LZ");
const parser = utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
const logger = scopedLogger("workunit.ts");

const WUStateID = WsWorkunits.WUStateID;

export class WorkunitCache extends Cache<{ Wuid: string }, Workunit> {
    constructor() {
        super((obj) => {
            return obj.Wuid;
        });
    }
}
const _workunits = new WorkunitCache();

export interface DebugState {
    sequence: number;
    state: string;
    [key: string]: any;
}

export interface IWorkunit {
    ResultViews: any[];
    HelpersCount: number;
}

export interface IDebugWorkunit {
    DebugState?: DebugState;
}

export interface ITimeElapsed {
    scope: string;
    start: string;
    elapsed: number;
    finish: string;
}

export type WorkunitEvents = "completed" | StateEvents;
export type UWorkunitState = WsWorkunits.WUQuery.ECLWorkunit & WsWorkunits.WUInfo.Workunit & SMCActivity.ActiveWorkunit & IWorkunit & IDebugWorkunit;
export type IWorkunitState = WsWorkunits.WUQuery.ECLWorkunit | WsWorkunits.WUInfo.Workunit | SMCActivity.ActiveWorkunit | IWorkunit | IDebugWorkunit;
export class Workunit extends StateObject<UWorkunitState, IWorkunitState> implements WsWorkunits.WUInfo.Workunit {
    connection: WsWorkunits.WorkunitsService;
    topologyConnection: WsTopology.TopologyService;

    private _debugMode: boolean = false;
    private _debugAllGraph: any;
    private _submitAction: WsWorkunits.WUUpdate.Action;

    //  Accessors  ---
    get properties(): WsWorkunits.WUQuery.ECLWorkunit & WsWorkunits.WUInfo.Workunit { return this.get(); }
    get Wuid(): string { return this.get("Wuid"); }
    get Owner(): string { return this.get("Owner", ""); }
    get Cluster(): string { return this.get("Cluster", ""); }
    get Jobname(): string { return this.get("Jobname", ""); }
    get Description(): string { return this.get("Description", ""); }
    get ActionEx(): string { return this.get("ActionEx", ""); }
    get StateID(): WsWorkunits.WUStateID { return this.get("StateID", WsWorkunits.WUStateID.Unknown); }
    get State(): string { return this.get("State") || WsWorkunits.WUStateID[this.StateID]; }
    get Protected(): boolean { return this.get("Protected", false); }
    get Exceptions(): WsWorkunits.WUInfo.Exceptions2 { return this.get("Exceptions", { ECLException: [] }); }
    get ResultViews(): any[] { return this.get("ResultViews", []); }

    private _resultCache = new ResultCache();
    get ResultCount(): number { return this.get("ResultCount", 0); }
    get Results(): WsWorkunits.WUInfo.Results { return this.get("Results", { ECLResult: [] }); }
    get CResults(): Result[] {
        return this.Results.ECLResult.map((eclResult) => {
            return this._resultCache.get(eclResult, () => {
                return new Result(this.connection, this.Wuid, eclResult, this.ResultViews);
            });
        });
    }
    get SequenceResults(): { [key: number]: Result } {
        const retVal: { [key: number]: Result } = {};
        this.CResults.forEach((result) => {
            retVal[result.Sequence] = result;
        });
        return retVal;
    }
    get Timers(): WsWorkunits.WUInfo.Timers { return this.get("Timers", { ECLTimer: [] }); }
    get CTimers(): Timer[] {
        return this.Timers.ECLTimer.map((eclTimer) => {
            return new Timer(this.connection, this.Wuid, eclTimer);
        });
    }

    private _graphCache = new GraphCache();
    get GraphCount(): number { return this.get("GraphCount", 0); }
    get Graphs(): WsWorkunits.WUInfo.Graphs { return this.get("Graphs", { ECLGraph: [] }); }
    get CGraphs(): ECLGraph[] {
        return this.Graphs.ECLGraph.map((eclGraph) => {
            return this._graphCache.get(eclGraph, () => {
                return new ECLGraph(this, eclGraph, this.CTimers);
            });
        });
    }
    get ThorLogList(): WsWorkunits.WUInfo.ThorLogList { return this.get("ThorLogList"); }
    get ResourceURLCount(): number { return this.get("ResourceURLCount", 0); }
    get ResourceURLs(): WsWorkunits.WUInfo.ResourceURLs { return this.get("ResourceURLs", { URL: [] }); }
    get CResourceURLs(): Resource[] {
        return this.ResourceURLs.URL.map((url) => {
            return new Resource(this, url);
        });
    }
    get TotalClusterTime(): string { return this.get("TotalClusterTime", ""); }
    get DateTimeScheduled(): string { return this.get("DateTimeScheduled"); }
    get IsPausing(): boolean { return this.get("IsPausing"); }
    get ThorLCR(): boolean { return this.get("ThorLCR"); }
    get ApplicationValues(): WsWorkunits.WUInfo.ApplicationValues { return this.get("ApplicationValues", { ApplicationValue: [] }); }
    get HasArchiveQuery(): boolean { return this.get("HasArchiveQuery"); }
    get StateEx(): string { return this.get("StateEx"); }
    get PriorityClass(): number { return this.get("PriorityClass"); }
    get PriorityLevel(): number { return this.get("PriorityLevel"); }
    get Snapshot(): string { return this.get("Snapshot"); }
    get ResultLimit(): number { return this.get("ResultLimit"); }
    get EventSchedule(): number { return this.get("EventSchedule"); }
    get HaveSubGraphTimings(): boolean { return this.get("HaveSubGraphTimings"); }
    get Query(): WsWorkunits.WUInfo.Query { return this.get("Query"); }
    get HelpersCount(): number { return this.get("HelpersCount", 0); }
    get Helpers(): WsWorkunits.WUInfo.Helpers { return this.get("Helpers", { ECLHelpFile: [] }); }
    get DebugValues(): WsWorkunits.WUInfo.DebugValues { return this.get("DebugValues"); }
    get AllowedClusters(): WsWorkunits.WUInfo.AllowedClusters { return this.get("AllowedClusters"); }
    get ErrorCount(): number { return this.get("ErrorCount", 0); }
    get WarningCount(): number { return this.get("WarningCount", 0); }
    get InfoCount(): number { return this.get("InfoCount", 0); }
    get AlertCount(): number { return this.get("AlertCount", 0); }
    get SourceFileCount(): number { return this.get("SourceFileCount", 0); }
    get SourceFiles(): WsWorkunits.WUInfo.SourceFiles { return this.get("SourceFiles", { ECLSourceFile: [] }); }
    get CSourceFiles(): SourceFile[] {
        return this.SourceFiles.ECLSourceFile.map(eclSourceFile => new SourceFile(this.connection, this.Wuid, eclSourceFile));
    }
    get VariableCount(): number { return this.get("VariableCount", 0); }
    get Variables(): WsWorkunits.WUInfo.Variables { return this.get("Variables", { ECLResult: [] }); }
    get TimerCount(): number { return this.get("TimerCount", 0); }
    get HasDebugValue(): boolean { return this.get("HasDebugValue"); }
    get ApplicationValueCount(): number { return this.get("ApplicationValueCount", 0); }
    get XmlParams(): string { return this.get("XmlParams"); }
    get AccessFlag(): number { return this.get("AccessFlag"); }
    get ClusterFlag(): number { return this.get("ClusterFlag"); }
    get ResultViewCount(): number { return this.get("ResultViewCount", 0); }
    get DebugValueCount(): number { return this.get("DebugValueCount", 0); }
    get WorkflowCount(): number { return this.get("WorkflowCount", 0); }
    get Archived(): boolean { return this.get("Archived"); }
    get RoxieCluster(): string { return this.get("RoxieCluster"); }
    get DebugState(): DebugState { return this.get("DebugState", {} as DebugState)!; }
    get Queue(): string { return this.get("Queue"); }
    get Active(): boolean { return this.get("Active"); }
    get Action(): number { return this.get("Action"); }
    get Scope(): string { return this.get("Scope"); }
    get AbortBy(): string { return this.get("AbortBy"); }
    get AbortTime(): string { return this.get("AbortTime"); }
    get Workflows(): WsWorkunits.WUInfo.Workflows { return this.get("Workflows"); }
    get TimingData(): WsWorkunits.WUInfo.TimingData { return this.get("TimingData"); }
    get HelpersDesc(): string { return this.get("HelpersDesc"); }
    get GraphsDesc(): string { return this.get("GraphsDesc"); }
    get SourceFilesDesc(): string { return this.get("GraphsDesc"); }
    get ResultsDesc(): string { return this.get("GraphsDesc"); }
    get VariablesDesc(): string { return this.get("GraphsDesc"); }
    get TimersDesc(): string { return this.get("GraphsDesc"); }
    get DebugValuesDesc(): string { return this.get("GraphsDesc"); }
    get ApplicationValuesDesc(): string { return this.get("GraphsDesc"); }
    get WorkflowsDesc(): string { return this.get("GraphsDesc"); }

    //  Factories  ---
    static create(optsConnection: IOptions | IConnection): Promise<Workunit> {
        const retVal: Workunit = new Workunit(optsConnection);
        return retVal.connection.WUCreate().then((response) => {
            _workunits.set(retVal);
            retVal.set(response.Workunit);
            return retVal;
        });
    }

    static attach(optsConnection: IOptions | IConnection, wuid: string, state?: IWorkunitState): Workunit {
        const retVal: Workunit = _workunits.get({ Wuid: wuid }, () => {
            return new Workunit(optsConnection, wuid);
        });
        if (state) {
            retVal.set(state);
        }
        return retVal;
    }

    static existsLocal(wuid: string): boolean {
        return _workunits.has({ Wuid: wuid });
    }

    static submit(server: IOptions | IConnection, target: string, ecl: string): Promise<Workunit> {
        return Workunit.create(server).then((wu) => {
            return wu.update({ QueryText: ecl });
        }).then((wu) => {
            return wu.submit(target);
        });
    }

    static query(server: IOptions | IConnection, opts: WsWorkunits.WUQuery.Request): Promise<Workunit[]> {
        const wsWorkunits = new WsWorkunits.WorkunitsService(server);
        return wsWorkunits.WUQuery(opts).then((response) => {
            return response.Workunits.ECLWorkunit.map(function (wu) {
                return Workunit.attach(server, wu.Wuid, wu);
            });
        });
    }

    //  ---  ---  ---
    protected constructor(optsConnection: IOptions | IConnection, wuid?: string) {
        super();
        this.connection = new WsWorkunits.WorkunitsService(optsConnection);
        this.topologyConnection = new WsTopology.TopologyService(optsConnection);
        this.clearState(wuid);
    }

    clearState(wuid?: string) {
        this.clear({
            Wuid: wuid,
            StateID: WUStateID.Unknown
        });
    }

    update(request: Partial<WsWorkunits.WUUpdate.Request>): Promise<Workunit> {
        return this.connection.WUUpdate({
            ...request,
            ...{
                Wuid: this.Wuid,
                StateOrig: this.State,
                JobnameOrig: this.Jobname,
                DescriptionOrig: this.Description,
                ProtectedOrig: this.Protected,
                ClusterOrig: this.Cluster
            }
        }).then((response) => {
            this.set(response.Workunit);
            return this;
        });
    }

    submit(_cluster?: string, action: WsWorkunits.WUUpdate.Action = WsWorkunits.WUUpdate.Action.Run, resultLimit?: number): Promise<Workunit> {
        let clusterPromise;
        if (_cluster !== void 0) {
            clusterPromise = Promise.resolve(_cluster);
        } else {
            clusterPromise = this.topologyConnection.DefaultTpLogicalClusterQuery().then((response) => {
                return response.Name;
            });
        }

        this._debugMode = false;
        if (action === WsWorkunits.WUUpdate.Action.Debug) {
            action = WsWorkunits.WUUpdate.Action.Run;
            this._debugMode = true;
        }

        return clusterPromise.then((cluster) => {
            return this.connection.WUUpdate({
                Wuid: this.Wuid,
                Action: action,
                ResultLimit: resultLimit,
                DebugValues: {
                    DebugValue: [
                        {
                            Name: "Debug",
                            Value: this._debugMode ? "1" : ""
                        }
                    ]
                }
            }).then((response) => {
                this.set(response.Workunit);
                this._submitAction = action;
                return this.connection.WUSubmit({ Wuid: this.Wuid, Cluster: cluster });
            });
        }).then(() => {
            return this;
        });
    }

    isComplete(): boolean {
        switch (this.StateID) {
            case WUStateID.Compiled:
                return this.ActionEx === "compile" || this._submitAction === WsWorkunits.WUUpdate.Action.Compile;
            case WUStateID.Completed:
            case WUStateID.Failed:
            case WUStateID.Aborted:
            case WUStateID.NotFound:
                return true;
            default:
        }
        return false;
    }

    isFailed() {
        switch (this.StateID) {
            case WUStateID.Aborted:
            case WUStateID.Failed:
                return true;
            default:
        }
        return false;
    }

    isDeleted() {
        switch (this.StateID) {
            case WUStateID.NotFound:
                return true;
            default:
        }
        return false;
    }

    isDebugging() {
        switch (this.StateID) {
            case WUStateID.DebugPaused:
            case WUStateID.DebugRunning:
                return true;
            default:
        }
        return this._debugMode;
    }

    isRunning(): boolean {
        switch (this.StateID) {
            case WUStateID.Compiled:
            case WUStateID.Running:
            case WUStateID.Aborting:
            case WUStateID.Blocked:
            case WUStateID.DebugPaused:
            case WUStateID.DebugRunning:
                return true;
            default:
        }
        return false;
    }

    setToFailed() {
        return this.WUAction("SetToFailed");
    }

    pause() {
        return this.WUAction("Pause");
    }

    pauseNow() {
        return this.WUAction("PauseNow");
    }

    resume() {
        return this.WUAction("Resume");
    }

    abort() {
        return this.WUAction("Abort");
    }

    delete() {
        return this.WUAction("Delete");
    }

    restore() {
        return this.WUAction("Restore");
    }

    deschedule() {
        return this.WUAction("Deschedule");
    }

    reschedule() {
        return this.WUAction("Reschedule");
    }

    resubmit(): Promise<Workunit> {
        return this.WUResubmit({
            CloneWorkunit: false,
            ResetWorkflow: false
        }).then(() => {
            this.clearState(this.Wuid);
            return this.refresh().then(() => {
                this._monitor();
                return this;
            });
        });
    }

    clone(): Promise<Workunit> {
        return this.WUResubmit({
            CloneWorkunit: true,
            ResetWorkflow: false
        }).then((response) => {
            return Workunit.attach(this.connection.connection(), response.WUs.WU[0].WUID)
                .refresh()
                ;
        });
    }

    async refreshState(): Promise<this> {
        await this.WUQuery();
        return this;
    }

    async refreshInfo(): Promise<this> {
        await this.WUInfo();
        return this;
    }

    async refreshDebug(): Promise<this> {
        await this.debugStatus();
        return this;
    }

    async refresh(full: boolean = false): Promise<this> {
        if (full) {
            await Promise.all([this.refreshInfo(), this.refreshDebug()]);
        } else {
            await this.refreshState();
        }
        return this;
    }

    eclExceptions(): WsWorkunits.WUInfo.ECLException[] {
        return this.Exceptions.ECLException;
    }

    fetchECLExceptions(): Promise<WsWorkunits.WUInfo.ECLException[]> {
        return this.WUInfo({ IncludeExceptions: true }).then(() => {
            return this.eclExceptions();
        });
    }

    fetchResults(): Promise<Result[]> {
        return this.WUInfo({ IncludeResults: true }).then(() => {
            return this.CResults;
        });
    }

    fetchGraphs(): Promise<ECLGraph[]> {
        return this.WUInfo({ IncludeGraphs: true }).then(() => {
            return this.CGraphs;
        });
    }

    fetchDetailsRaw(request: Partial<WsWorkunits.WUDetails.Request> = {}): Promise<WsWorkunits.WUDetails.Scope[]> {
        return this.WUDetails(request).then(response => response.Scopes.Scope);
    }

    fetchDetails(request: Partial<WsWorkunits.WUDetails.Request> = {}): Promise<Scope[]> {
        return this.WUDetails(request).then((response) => {
            return response.Scopes.Scope.map((rawScope) => {
                return new Scope(this, rawScope);
            });
        });
    }

    fetchDetailsHierarchy(request: Partial<WsWorkunits.WUDetails.Request> = {}): Promise<Scope[]> {
        return this.WUDetails(request).then((response) => {
            const retVal: Scope[] = [];

            //  Recreate Scope Hierarchy and dedup  ---
            const scopeMap: { [key: string]: Scope } = {};
            response.Scopes.Scope.forEach((rawScope) => {
                if (scopeMap[rawScope.ScopeName]) {
                    scopeMap[rawScope.ScopeName].update(rawScope);
                    return null;
                } else {
                    const scope = new Scope(this, rawScope);
                    scopeMap[scope.ScopeName] = scope;
                    return scope;
                }
            });
            for (const key in scopeMap) {
                if (scopeMap.hasOwnProperty(key)) {
                    const scope = scopeMap[key];
                    const parentScopeID = scope.parentScope();
                    if (parentScopeID && scopeMap[parentScopeID]) {
                        scopeMap[parentScopeID].children().push(scope);
                    } else {
                        retVal.push(scope);
                    }
                }
            }

            return retVal;
        });
    }

    fetchTimeElapsed(): Promise<ITimeElapsed[]> {
        return this.fetchDetails({
            ScopeFilter: {
                PropertyFilters: {
                    PropertyFilter: [{ Name: "TimeElapsed" }]
                }
            }
        }).then((scopes) => {
            const scopeInfo: { [key: string]: ITimeElapsed } = {};
            scopes.forEach((scope) => {
                scopeInfo[scope.ScopeName] = scopeInfo[scope.ScopeName] || {
                    scope: scope.ScopeName,
                    start: null,
                    elapsed: null,
                    finish: null
                };
                scope.CAttributes.forEach((attr) => {
                    if (attr.Name === "TimeElapsed") {
                        scopeInfo[scope.ScopeName].elapsed = +attr.RawValue;
                    } else if (attr.Measure === "ts" && attr.Name.indexOf("Started") >= 0) {
                        scopeInfo[scope.ScopeName].start = attr.Formatted;
                    }
                });
            });
            // Workaround duplicate scope responses
            const retVal: ITimeElapsed[] = [];
            for (const key in scopeInfo) {
                const scope = scopeInfo[key];
                if (scope.start && scope.elapsed) {
                    const endTime = parser(scope.start);
                    endTime!.setMilliseconds(endTime!.getMilliseconds() + scope.elapsed / 1000000);
                    scope.finish = formatter(endTime!);
                    retVal.push(scope);
                }
            }
            retVal.sort((l, r) => {
                if (l.start < r.start) return -1;
                if (l.start > r.start) return 1;
                return 0;
            });
            return retVal;
        });
    }

    //  Monitoring  ---
    protected _monitor(): void {
        if (this.isComplete()) {
            this._monitorTickCount = 0;
            return;
        }
        super._monitor();
    }

    protected _monitorTimeoutDuraction(): number {
        const retVal = super._monitorTimeoutDuraction();
        if (this._monitorTickCount <= 1) {          //  Once
            return 0;
        } else if (this._monitorTickCount <= 3) {   //  Twice
            return 500;
        } else if (this._monitorTickCount <= 5) {   //  Twice
            return 1000;
        } else if (this._monitorTickCount <= 7) {   //  Twice
            return 3000;
        } else if (this._monitorTickCount <= 9) {   //  Twice
            return 5000;
        } else if (this._monitorTickCount <= 11) {  //  Twice
            return 10000;
        }
        return retVal;
    }

    //  Events  ---
    on(eventID: WorkunitEvents, propIDorCallback: StateCallback | keyof UWorkunitState, callback?: StatePropCallback): this {
        if (this.isCallback(propIDorCallback)) {
            switch (eventID) {
                case "completed":
                    super.on("propChanged", "StateID", (changeInfo: IEvent) => {
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

    //  WsWorkunits passthroughs  ---
    protected WUQuery(_request: Partial<WsWorkunits.WUQuery.Request> = {}): Promise<WsWorkunits.WUQuery.Response> {
        return this.connection.WUQuery({ ..._request, Wuid: this.Wuid }).then((response) => {
            this.set(response.Workunits.ECLWorkunit[0]);
            return response;
        }).catch((e: ESPExceptions) => {
            //  deleted  ---
            const wuMissing = e.Exception.some((exception) => {
                if (exception.Code === 20081) {
                    this.clearState(this.Wuid);
                    this.set("StateID", WUStateID.NotFound);
                    return true;
                }
                return false;
            });
            if (!wuMissing) {
                logger.warning("Unexpected exception:  ");
                throw e;
            }
            return {} as WsWorkunits.WUQuery.Response;
        });
    }

    protected WUCreate() {
        return this.connection.WUCreate().then((response) => {
            this.set(response.Workunit);
            _workunits.set(this);
            return response;
        });
    }

    protected WUInfo(_request: Partial<WsWorkunits.WUInfo.Request> = {}): Promise<WsWorkunits.WUInfo.Response> {
        const includeResults = _request.IncludeResults || _request.IncludeResultsViewNames;
        return this.connection.WUInfo({
            ..._request, Wuid: this.Wuid,
            IncludeResults: includeResults,
            IncludeResultsViewNames: includeResults,
            SuppressResultSchemas: false
        }).then((response) => {
            if (response.Workunit.ResourceURLCount) {
                response.Workunit.ResourceURLCount = response.Workunit.ResourceURLCount - 1;
            }
            if (response.Workunit.ResourceURLs && response.Workunit.ResourceURLs.URL) {
                response.Workunit.ResourceURLs.URL = response.Workunit.ResourceURLs.URL.filter((_, idx) => {
                    return idx > 0;
                });
            }
            this.set(response.Workunit);
            this.set({
                ResultViews: includeResults ? response.ResultViews : [],
                HelpersCount: response.Workunit.Helpers && response.Workunit.Helpers.ECLHelpFile ? response.Workunit.Helpers.ECLHelpFile.length : 0
            } as IWorkunitState);
            return response;
        }).catch((e: ESPExceptions) => {
            //  deleted  ---
            const wuMissing = e.Exception.some((exception) => {
                if (exception.Code === 20080) {
                    this.clearState(this.Wuid);
                    this.set("StateID", WUStateID.NotFound);
                    return true;
                }
                return false;
            });
            if (!wuMissing) {
                logger.warning("Unexpected exception:  ");
                throw e;
            }
            return {} as WsWorkunits.WUInfo.Response;
        });
    }

    protected WUResubmit(request: Partial<WsWorkunits.WUResubmit.Request>): Promise<WsWorkunits.WUResubmit.Response> {
        return this.connection.WUResubmit(deepMixinT<WsWorkunits.WUResubmit.Request>({}, request, {
            Wuids: [this.Wuid]
        }));
    }

    protected WUDetails(request: Partial<WsWorkunits.WUDetails.Request>): Promise<WsWorkunits.WUDetails.Response> {
        return this.connection.WUDetails(deepMixinT<WsWorkunits.WUDetails.Request>({
            ScopeFilter: {
                MaxDepth: 9999
            },
            ScopeOptions: {
                IncludeMatchedScopesInResults: true,
                IncludeScope: true,
                IncludeId: false,
                IncludeScopeType: false
            },
            PropertyOptions: {
                IncludeName: true,
                IncludeRawValue: false,
                IncludeFormatted: true,
                IncludeMeasure: true,
                IncludeCreator: false,
                IncludeCreatorType: false
            }
        }, request, { WUID: this.Wuid })).then((response) => {
            return deepMixinT<WsWorkunits.WUDetails.Response>({
                Scopes: {
                    Scope: []
                }
            }, response);
        });
    }

    protected WUAction(actionType: WsWorkunits.WUAction.Type): Promise<WsWorkunits.WUAction.Response> {
        return this.connection.WUAction({
            Wuids: [this.Wuid],
            WUActionType: actionType
        }).then((response) => {
            return this.refresh().then(() => {
                this._monitor();
                return response;
            });
        });
    }

    protected WUCDebug(command: string, opts: any = {}): Promise<XMLNode | null> {
        let optsStr = "";
        for (const key in opts) {
            if (opts.hasOwnProperty(key)) {
                optsStr += ` ${key}='${opts[key]}'`;
            }
        }
        return this.connection.WUCDebug({
            Wuid: this.Wuid,
            Command: `<debug:${command} uid='${this.Wuid}'${optsStr}/>`
        }).then((response) => {
            return response;
        });
    }

    debug(command: string, opts?: object): Promise<XMLNode> {
        if (!this.isDebugging()) {
            return Promise.resolve(new XMLNode(command));
        }
        return this.WUCDebug(command, opts).then((response: XMLNode) => {
            const retVal: XMLNode[] = response.children(command);
            if (retVal.length) {
                return retVal[0];
            }
            return new XMLNode(command);
        }).catch((_) => {
            logger.error(_);
            return Promise.resolve(new XMLNode(command));
        });
    }

    debugStatus(): Promise<XMLNode> {
        if (!this.isDebugging()) {
            return Promise.resolve<any>({
                DebugState: { state: "unknown" }
            });
        }
        return this.debug("status").then((response) => {
            const debugState = { ...this.DebugState, ...response.$ };
            this.set({
                DebugState: debugState
            });
            return response;
        });
    }

    debugContinue(mode = ""): Promise<XMLNode> {
        return this.debug("continue", {
            mode
        });
    }

    debugStep(mode: string): Promise<XMLNode> {
        return this.debug("step", {
            mode
        });
    }

    debugPause(): Promise<XMLNode> {
        return this.debug("interrupt");
    }

    debugQuit(): Promise<XMLNode> {
        return this.debug("quit");
    }

    debugDeleteAllBreakpoints(): Promise<XMLNode> {
        return this.debug("delete", {
            idx: 0
        });
    }

    protected debugBreakpointResponseParser(rootNode: StringAnyMap) {
        return rootNode.children().map((childNode: XMLNode) => {
            if (childNode.name === "break") {
                return childNode.$;
            }
        });
    }

    debugBreakpointAdd(id: string, mode: string, action: string): Promise<XMLNode> {
        return this.debug("breakpoint", {
            id,
            mode,
            action
        }).then((rootNode) => {
            return this.debugBreakpointResponseParser(rootNode);
        });
    }

    debugBreakpointList(): Promise<any[]> {
        return this.debug("list").then((rootNode) => {
            return this.debugBreakpointResponseParser(rootNode);
        });
    }

    debugGraph(): Promise<XGMMLGraph> {
        if (this._debugAllGraph && this.DebugState["_prevGraphSequenceNum"] === this.DebugState["graphSequenceNum"]) {
            return Promise.resolve(this._debugAllGraph);
        }
        return this.debug("graph", { name: "all" }).then((response) => {
            this.DebugState["_prevGraphSequenceNum"] = this.DebugState["graphSequenceNum"];
            this._debugAllGraph = createXGMMLGraph(this.Wuid, response);
            return this._debugAllGraph;
        });
    }

    debugBreakpointValid(path: string): Promise<IECLDefintion[]> {
        return this.debugGraph().then((graph) => {
            return breakpointLocations(graph, path);
        });
    }

    debugPrint(edgeID: string, startRow: number = 0, numRows: number = 10): Promise<StringAnyMap[]> {
        return this.debug("print", {
            edgeID,
            startRow,
            numRows
        }).then((response: XMLNode) => {
            return response.children().map((rowNode) => {
                const retVal: StringAnyMap = {};
                rowNode.children().forEach((cellNode) => {
                    retVal[cellNode.name] = cellNode.content;
                });
                return retVal;
            });
        });
    }
}

export interface IECLDefintion {
    id: string;
    file: string;
    line: number;
    column: number;
}

const ATTR_DEFINITION = "definition";

function hasECLDefinition(vertex: XGMMLVertex): boolean {
    return vertex._![ATTR_DEFINITION] !== undefined;
}

function getECLDefinition(vertex: XGMMLVertex): IECLDefintion {
    const match = /([a-z]:\\(?:[-\w\.\d]+\\)*(?:[-\w\.\d]+)?|(?:\/[\w\.\-]+)+)\((\d*),(\d*)\)/.exec(vertex._![ATTR_DEFINITION]);
    if (match) {
        const [, _file, _row, _col] = match;
        _file.replace("/./", "/");
        return {
            id: vertex._!["id"],
            file: _file,
            line: +_row,
            column: +_col
        };
    }
    throw new Error(`Bad definition:  ${vertex._![ATTR_DEFINITION]}`);
}

function breakpointLocations(graph: XGMMLGraph, path?: string): IECLDefintion[] {
    const retVal: IECLDefintion[] = [];
    for (const vertex of graph.vertices) {
        if (hasECLDefinition(vertex)) {
            const definition = getECLDefinition(vertex);
            if (definition && !path || path === definition.file) {
                retVal.push(definition);
            }
        }
    }
    return retVal.sort((l, r) => {
        return l.line - r.line;
    });
}
