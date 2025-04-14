import { Cache, deepMixinT, IEvent, RecursivePartial, scopedLogger, StateCallback, StateEvents, StateObject, StatePropCallback, StringAnyMap, XMLNode } from "@hpcc-js/util";
import { format as d3Format } from "d3-format";
import { utcFormat, utcParse } from "d3-time-format";
import { IConnection, IOptions } from "../connection.ts";
import { ESPExceptions } from "../espConnection.ts";
import { WsSMC } from "../services/wsSMC.ts";
import * as WsTopology from "../services/wsTopology.ts";
import { WsWorkunits, WUStateID, WorkunitsService, WorkunitsServiceEx, WUUpdate } from "../services/wsWorkunits.ts";
import { createGraph, createXGMMLGraph, ECLGraph, GraphCache, ScopeGraph, XGMMLGraph, XGMMLVertex } from "./graph.ts";
import { Resource } from "./resource.ts";
import { Result, ResultCache } from "./result.ts";
import { BaseScope, Scope } from "./scope.ts";
import { SourceFile } from "./sourceFile.ts";
import { Timer } from "./timer.ts";

const formatter = utcFormat("%Y-%m-%dT%H:%M:%S.%LZ");
const parser = utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
const d3FormatNum = d3Format(",");
function formatNum(num: number | string): string {
    if (num && !isNaN(+num)) {
        return d3FormatNum(+num);
    }
    return num as string;
}

function safeDelete(obj: { [id: string]: any; }, key: string, prop: string) {
    if (obj[key] === undefined || obj[key][prop] === undefined) return;
    if (key === "__proto__" || key === "constructor" || key === "prototype") return;
    delete obj[key][prop];
}

const DEFINITION_LIST = "DefinitionList";
const definitionRegex = /([a-zA-Z]:)?(.*[\\\/])(.*)(\((\d+),(\d+)\))/;

export const PropertyType = ["Avg", "Min", "Max", "Delta", "StdDev"];
export const RelatedProperty = ["SkewMin", "SkewMax", "NodeMin", "NodeMax"];

export interface IPropertyValue {
    Key: string;
    Value?: string;

    //  Extended properties  ---
    Avg?: string;
    Min?: string;
    Max?: string;
    Delta?: string;
    StdDev?: string;
    StdDevs?: number;

    // Related properties  ---
    SkewMin?: string;
    SkewMax?: string;
    NodeMin?: string;
    NodeMax?: string;
}

export interface IScope {
    __parentName?: string;
    __children?: IScope[];
    __formattedProps: { [key: string]: any };
    __groupedProps: { [key: string]: IPropertyValue };
    __StdDevs: number,
    __StdDevsSource: string,
    id: string;
    name: string;
    type: string;
    Kind: string;
    Label: string;
    [key: string]: any;
}

export interface ISplitMetric {
    measure: string;
    ext: string;
    label: string;
}

const metricKeyRegex = /[A-Z][a-z]*/g;
function _splitMetric(fullLabel: string): ISplitMetric {

    // Related properties  ---
    for (const relProp of RelatedProperty) {
        const index = fullLabel.indexOf(relProp);
        if (index === 0) {
            const measure = "";
            const label = fullLabel.slice(index + relProp.length);
            return { measure, ext: relProp, label };
        }
    }

    // Primary properties  ---
    const labelParts = fullLabel.match(metricKeyRegex);
    if (labelParts?.length) {
        const measure = labelParts.shift();
        let label = labelParts.join("");
        for (const ext of PropertyType) {
            const index = label.indexOf(ext);
            if (index === 0) {
                label = label.slice(index + ext.length);
                return { measure, ext, label };
            }
        }
        // Not an aggregate property  ---
        return { measure, ext: "", label };
    }

    // No match found  ---
    return { measure: "", ext: "", label: fullLabel };
}

const splitLabelCache: { [key: string]: ISplitMetric } = {};
export function splitMetric(key: string): ISplitMetric {
    let retVal = splitLabelCache[key];
    if (!retVal) {
        retVal = _splitMetric(key);
        splitLabelCache[key] = retVal;
    }
    return retVal;
}

function formatValue(item: IScope, key: string): string | undefined {
    return item.__formattedProps?.[key] ?? item[key];
}

type DedupProperties = { [key: string]: boolean };

function safeParseFloat(val: string | undefined): number | undefined {
    if (val === undefined) return undefined;
    const retVal = parseFloat(val);
    return isNaN(retVal) ? undefined : retVal;
}

function formatValues(item: IScope, key: string, dedup: DedupProperties): IPropertyValue | null {
    const keyParts = splitMetric(key);
    if (!dedup[keyParts.measure]) {
        dedup[keyParts.label] = true;
        const avg = safeParseFloat(item[`${keyParts.measure}Avg${keyParts.label}`]);
        const min = safeParseFloat(item[`${keyParts.measure}Min${keyParts.label}`]);
        const max = safeParseFloat(item[`${keyParts.measure}Max${keyParts.label}`]);
        const stdDev = safeParseFloat(item[`${keyParts.measure}StdDev${keyParts.label}`]);
        const StdDevs = Math.max((avg - min) / stdDev, (max - avg) / stdDev);

        return {
            Key: `${keyParts.measure}${keyParts.label}`,
            Value: formatValue(item, `${keyParts.measure}${keyParts.label}`),

            //  Extended properties  ---
            Avg: formatValue(item, `${keyParts.measure}Avg${keyParts.label}`),
            Min: formatValue(item, `${keyParts.measure}Min${keyParts.label}`),
            Max: formatValue(item, `${keyParts.measure}Max${keyParts.label}`),
            Delta: formatValue(item, `${keyParts.measure}Delta${keyParts.label}`),
            StdDev: formatValue(item, `${keyParts.measure}StdDev${keyParts.label}`),
            StdDevs: isNaN(StdDevs) ? undefined : StdDevs,

            // Related properties  ---
            SkewMin: formatValue(item, `SkewMin${keyParts.label}`),
            SkewMax: formatValue(item, `SkewMax${keyParts.label}`),
            NodeMin: formatValue(item, `NodeMin${keyParts.label}`),
            NodeMax: formatValue(item, `NodeMax${keyParts.label}`)
        };
    }
    return null;
}

const logger = scopedLogger("workunit.ts");

export class WorkunitCache extends Cache<{ BaseUrl: string, Wuid: string }, Workunit> {
    constructor() {
        super((obj) => {
            return `${obj.BaseUrl}-${obj.Wuid}`;
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
    ResultViews: WsWorkunits.ResultViews;
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
export type UWorkunitState = WsWorkunits.ECLWorkunit & WsWorkunits.Workunit & WsSMC.ActiveWorkunit & IWorkunit & IDebugWorkunit;
export type IWorkunitState = WsWorkunits.ECLWorkunit | WsWorkunits.Workunit | WsSMC.ActiveWorkunit | IWorkunit | IDebugWorkunit;
export class Workunit extends StateObject<UWorkunitState, IWorkunitState> implements WsWorkunits.Workunit {
    connection: WorkunitsService;
    topologyConnection: WsTopology.TopologyService;
    get BaseUrl() { return this.connection.baseUrl; }

    private _debugMode: boolean = false;
    private _debugAllGraph: any;
    private _submitAction: WUUpdate.Action;

    //  Accessors  ---
    get properties(): WsWorkunits.ECLWorkunit & WsWorkunits.Workunit { return this.get(); }
    get Wuid(): string { return this.get("Wuid"); }
    get Owner(): string { return this.get("Owner", ""); }
    get Cluster(): string { return this.get("Cluster", ""); }
    get Jobname(): string { return this.get("Jobname", ""); }
    get Description(): string { return this.get("Description", ""); }
    get ActionEx(): string { return this.get("ActionEx", ""); }
    get StateID(): WUStateID { return this.get("StateID", WUStateID.Unknown); }
    get State(): string { return this.get("State") || WUStateID[this.StateID]; }
    get Protected(): boolean { return this.get("Protected", false); }
    get Exceptions(): WsWorkunits.Exceptions2 { return this.get("Exceptions", { ECLException: [] }); }
    get ResultViews(): WsWorkunits.ResultViews { return this.get("ResultViews", { View: [] }); }

    private _resultCache = new ResultCache();
    get ResultCount(): number { return this.get("ResultCount", 0); }
    get Results(): WsWorkunits.Results { return this.get("Results", { ECLResult: [] }); }
    get CResults(): Result[] {
        return this.Results.ECLResult.map((eclResult) => {
            return this._resultCache.get(eclResult, () => {
                return Result.attach(this.connection, this.Wuid, eclResult, this.ResultViews.View);
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
    get Timers(): WsWorkunits.Timers { return this.get("Timers", { ECLTimer: [] }); }
    get CTimers(): Timer[] {
        return this.Timers.ECLTimer.map((eclTimer) => {
            return new Timer(this.connection, this.Wuid, eclTimer);
        });
    }

    private _graphCache = new GraphCache();
    get GraphCount(): number { return this.get("GraphCount", 0); }
    get Graphs(): WsWorkunits.Graphs { return this.get("Graphs", { ECLGraph: [] }); }
    get CGraphs(): ECLGraph[] {
        return this.Graphs.ECLGraph.map((eclGraph) => {
            return this._graphCache.get(eclGraph, () => {
                return new ECLGraph(this, eclGraph, this.CTimers);
            });
        });
    }
    get ThorLogList(): WsWorkunits.ThorLogList { return this.get("ThorLogList"); }
    get ResourceURLCount(): number { return this.get("ResourceURLCount", 0); }
    get ResourceURLs(): WsWorkunits.ResourceURLs { return this.get("ResourceURLs", { URL: [] }); }
    get CResourceURLs(): Resource[] {
        return this.ResourceURLs.URL.map((url) => {
            return new Resource(this, url);
        });
    }
    get TotalClusterTime(): string { return this.get("TotalClusterTime", ""); }
    get DateTimeScheduled(): string { return this.get("DateTimeScheduled"); }
    get IsPausing(): boolean { return this.get("IsPausing"); }
    get ThorLCR(): boolean { return this.get("ThorLCR"); }
    get ApplicationValues(): WsWorkunits.ApplicationValues { return this.get("ApplicationValues", { ApplicationValue: [] }); }
    get HasArchiveQuery(): boolean { return this.get("HasArchiveQuery"); }
    get StateEx(): string { return this.get("StateEx"); }
    get PriorityClass(): number { return this.get("PriorityClass"); }
    get PriorityLevel(): number { return this.get("PriorityLevel"); }
    get Snapshot(): string { return this.get("Snapshot"); }
    get ResultLimit(): number { return this.get("ResultLimit"); }
    get EventSchedule(): number { return this.get("EventSchedule"); }
    get Query(): WsWorkunits.Query { return this.get("Query"); }
    get HelpersCount(): number { return this.get("HelpersCount", 0); }
    get Helpers(): WsWorkunits.Helpers { return this.get("Helpers", { ECLHelpFile: [] }); }
    get DebugValues(): WsWorkunits.DebugValues { return this.get("DebugValues"); }
    get AllowedClusters(): WsWorkunits.AllowedClusters { return this.get("AllowedClusters"); }
    get ErrorCount(): number { return this.get("ErrorCount", 0); }
    get WarningCount(): number { return this.get("WarningCount", 0); }
    get InfoCount(): number { return this.get("InfoCount", 0); }
    get AlertCount(): number { return this.get("AlertCount", 0); }
    get SourceFileCount(): number { return this.get("SourceFileCount", 0); }
    get SourceFiles(): WsWorkunits.SourceFiles { return this.get("SourceFiles", { ECLSourceFile: [] }); }
    get CSourceFiles(): SourceFile[] {
        return this.SourceFiles.ECLSourceFile.map(eclSourceFile => new SourceFile(this.connection, this.Wuid, eclSourceFile));
    }
    get VariableCount(): number { return this.get("VariableCount", 0); }
    get Variables(): WsWorkunits.Variables { return this.get("Variables", { ECLResult: [] }); }
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
    get Workflows(): WsWorkunits.Workflows { return this.get("Workflows"); }
    get TimingData(): WsWorkunits.TimingData { return this.get("TimingData"); }
    get HelpersDesc(): string { return this.get("HelpersDesc"); }
    get GraphsDesc(): string { return this.get("GraphsDesc"); }
    get SourceFilesDesc(): string { return this.get("SourceFilesDesc"); }
    get ResultsDesc(): string { return this.get("ResultsDesc"); }
    get VariablesDesc(): string { return this.get("VariablesDesc"); }
    get TimersDesc(): string { return this.get("TimersDesc"); }
    get DebugValuesDesc(): string { return this.get("DebugValuesDesc"); }
    get ApplicationValuesDesc(): string { return this.get("ApplicationValuesDesc"); }
    get WorkflowsDesc(): string { return this.get("WorkflowsDesc"); }
    get ServiceNames(): WsWorkunits.ServiceNames { return this.get("ServiceNames"); }
    get CompileCost(): number { return this.get("CompileCost"); }
    get ExecuteCost(): number { return this.get("ExecuteCost"); }
    get FileAccessCost(): number { return this.get("FileAccessCost"); }
    get NoAccess(): boolean { return this.get("NoAccess"); }
    get ECLWUProcessList(): WsWorkunits.ECLWUProcessList { return this.get("ECLWUProcessList"); }

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
        const retVal: Workunit = _workunits.get({ BaseUrl: optsConnection.baseUrl, Wuid: wuid }, () => {
            return new Workunit(optsConnection, wuid);
        });
        if (state) {
            retVal.set(state);
        }
        return retVal;
    }

    static existsLocal(baseUrl: string, wuid: string): boolean {
        return _workunits.has({ BaseUrl: baseUrl, Wuid: wuid });
    }

    static submit(server: IOptions | IConnection, target: string, ecl: string, compileOnly = false): Promise<Workunit> {
        return Workunit.create(server).then((wu) => {
            return wu.update({ QueryText: ecl });
        }).then((wu) => {
            return compileOnly ? wu.submit(target, WUUpdate.Action.Compile) : wu.submit(target);
        });
    }

    static compile(server: IOptions | IConnection, target: string, ecl: string): Promise<Workunit> {
        return Workunit.submit(server, target, ecl, true);
    }

    static query(server: IOptions | IConnection, opts: Partial<WsWorkunits.WUQuery>): Promise<Workunit[]> {
        const wsWorkunits = new WorkunitsService(server);
        return wsWorkunits.WUQuery(opts).then((response) => {
            return response.Workunits.ECLWorkunit.map(function (wu) {
                return Workunit.attach(server, wu.Wuid, wu);
            });
        });
    }

    //  ---  ---  ---
    protected constructor(optsConnection: IOptions | IConnection, wuid?: string) {
        super();
        this.connection = new WorkunitsService(optsConnection);
        this.topologyConnection = new WsTopology.TopologyService(optsConnection);
        this.clearState(wuid);
    }

    clearState(wuid?: string) {
        this.clear({
            Wuid: wuid,
            StateID: WUStateID.Unknown
        });
    }

    update(request: Partial<WsWorkunits.WUUpdate>): Promise<Workunit> {
        return this.connection.WUUpdate({
            ...request,
            ...{
                Wuid: this.Wuid,
                StateOrig: this.StateID,
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

    submit(_cluster?: string, action: WUUpdate.Action = WUUpdate.Action.Run, resultLimit?: number): Promise<Workunit> {
        let clusterPromise;
        if (_cluster !== void 0) {
            clusterPromise = Promise.resolve(_cluster);
        } else {
            clusterPromise = this.topologyConnection.DefaultTpLogicalClusterQuery().then((response) => {
                return response.Name;
            });
        }

        this._debugMode = false;
        if (action === WUUpdate.Action.Debug) {
            action = WUUpdate.Action.Run;
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
                return this.ActionEx === "compile" || this._submitAction === WUUpdate.Action.Compile;
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
        return this.WUAction(WsWorkunits.ECLWUActions.SetToFailed);
    }

    pause() {
        return this.WUAction(WsWorkunits.ECLWUActions.Pause);
    }

    pauseNow() {
        return this.WUAction(WsWorkunits.ECLWUActions.PauseNow);
    }

    resume() {
        return this.WUAction(WsWorkunits.ECLWUActions.Resume);
    }

    abort() {
        return this.WUAction(WsWorkunits.ECLWUActions.Abort);
    }

    protect() {
        return this.WUAction(WsWorkunits.ECLWUActions.Protect);
    }

    unprotect() {
        return this.WUAction(WsWorkunits.ECLWUActions.Unprotect);
    }

    delete() {
        return this.WUAction(WsWorkunits.ECLWUActions.Delete);
    }

    restore() {
        return this.WUAction(WsWorkunits.ECLWUActions.Restore);
    }

    deschedule() {
        return this.WUAction(WsWorkunits.ECLWUActions.Deschedule);
    }

    reschedule() {
        return this.WUAction(WsWorkunits.ECLWUActions.Reschedule);
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
            return Workunit.attach(this.connection.opts(), response.WUs.WU[0].WUID)
                .refresh()
                ;
        });
    }

    async refreshState(): Promise<this> {
        await this.WUQuery();
        // Ensure "isComplete" is correct for WUs that are only "Compiled".
        if (this.StateID === WUStateID.Compiled && !this.ActionEx && !this._submitAction) {
            await this.refreshInfo();
        }
        return this;
    }

    async refreshInfo(request?: Partial<WsWorkunits.WUInfo>): Promise<this> {
        await this.WUInfo(request);
        return this;
    }

    async refreshDebug(): Promise<this> {
        await this.debugStatus();
        return this;
    }

    async refresh(full: boolean = false, request?: Partial<WsWorkunits.WUInfo>): Promise<this> {
        if (full) {
            await Promise.all([this.refreshInfo(request), this.refreshDebug()]);
        } else {
            await this.refreshState();
        }
        return this;
    }

    eclExceptions(): WsWorkunits.ECLException[] {
        return this.Exceptions.ECLException;
    }

    fetchArchive(): Promise<string> {
        return this.connection.WUFileEx({
            Wuid: this.Wuid,
            Type: "ArchiveQuery"
        });
    }

    fetchECLExceptions(): Promise<WsWorkunits.ECLException[]> {
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

    fetchQuery(): Promise<WsWorkunits.Query> {
        return this.WUInfo({ IncludeECL: true, TruncateEclTo64k: false }).then(() => {
            return this.Query;
        });
    }

    fetchHelpers(): Promise<WsWorkunits.ECLHelpFile[]> {
        return this.WUInfo({ IncludeHelpers: true }).then(() => {
            return this.Helpers?.ECLHelpFile || [];
        });
    }

    fetchAllowedClusters(): Promise<string[]> {
        return this.WUInfo({ IncludeAllowedClusters: true }).then(() => {
            return this.AllowedClusters?.AllowedCluster || [];
        });
    }

    fetchTotalClusterTime(): Promise<string> {
        return this.WUInfo({ IncludeTotalClusterTime: true }).then(() => {
            return this.TotalClusterTime;
        });
    }

    fetchServiceNames(): Promise<string[]> {
        return this.WUInfo({ IncludeServiceNames: true }).then(() => {
            return this.ServiceNames?.Item;
        });
    }

    fetchDetailsMeta(request: RecursivePartial<WsWorkunits.WUDetailsMeta> = {}): Promise<WsWorkunits.WUDetailsMetaResponse> {
        return this.WUDetailsMeta(request);
    }

    fetchDetailsRaw(request: RecursivePartial<WsWorkunits.WUDetails> = {}): Promise<WsWorkunits.Scope[]> {
        return this.WUDetails(request).then(response => response.Scopes.Scope);
    }

    normalizeDetails(meta: WsWorkunits.WUDetailsMetaResponse, scopes: WsWorkunits.Scope[]): { meta: WsWorkunits.WUDetailsMetaResponse, columns: { [id: string]: any }, data: IScope[] } {
        const columns: { [id: string]: any } = {
            id: {
                Measure: "label"
            },
            name: {
                Measure: "label"
            },
            type: {
                Measure: "label"
            }
        };
        const data: IScope[] = [];
        for (const scope of scopes) {
            const props = {};
            const formattedProps = {};
            if (scope && scope.Id && scope.Properties && scope.Properties.Property) {
                for (const key in scope.Properties.Property) {
                    const scopeProperty = scope.Properties.Property[key];
                    if (scopeProperty.Measure === "ns") {
                        scopeProperty.Measure = "s";
                    }
                    if (scopeProperty.Name === "Kind") {
                        const rawValue = parseInt(scopeProperty.RawValue, 10);
                        scopeProperty.Formatted = meta.Activities.Activity.filter(a => a.Kind === rawValue)[0].Name ?? scopeProperty.RawValue;
                    }
                    columns[scopeProperty.Name] = { ...scopeProperty };
                    safeDelete(columns, scopeProperty.Name, "RawValue");
                    safeDelete(columns, scopeProperty.Name, "Formatted");
                    switch (scopeProperty.Measure) {
                        case "bool":
                            props[scopeProperty.Name] = !!+scopeProperty.RawValue;
                            break;
                        case "sz":
                            props[scopeProperty.Name] = +scopeProperty.RawValue;
                            break;
                        case "s":
                            props[scopeProperty.Name] = +scopeProperty.RawValue / 1000000000;
                            break;
                        case "ns":
                            props[scopeProperty.Name] = +scopeProperty.RawValue;
                            break;
                        case "ts":
                            props[scopeProperty.Name] = new Date(+scopeProperty.RawValue / 1000).toISOString();
                            break;
                        case "cnt":
                            props[scopeProperty.Name] = +scopeProperty.RawValue;
                            break;
                        case "cost":
                            props[scopeProperty.Name] = +scopeProperty.RawValue / 1000000;
                            break;
                        case "node":
                            props[scopeProperty.Name] = +scopeProperty.RawValue;
                            break;
                        case "cpu":
                        case "skw":
                        case "ppm":
                        case "ip":
                        case "cy":
                        case "en":
                        case "txt":
                        case "id":
                        case "fname":
                        default:
                            props[scopeProperty.Name] = scopeProperty.RawValue;
                    }
                    formattedProps[scopeProperty.Name] = formatNum(scopeProperty.Formatted ?? props[scopeProperty.Name]);
                }
                //  Other properties  ---
            }
            const normalizedScope: IScope = {
                id: scope.Id,
                name: scope.ScopeName,
                type: scope.ScopeType,
                Kind: scope["Kind"],
                Label: scope["Label"],
                __formattedProps: formattedProps,
                __groupedProps: {},
                __groupedRawProps: {},
                __StdDevs: 0,
                __StdDevsSource: "",
                ...props
            };
            if (normalizedScope[DEFINITION_LIST]) {
                try {
                    const definitionList = JSON.parse(normalizedScope[DEFINITION_LIST].split("\\").join("\\\\"));
                    normalizedScope[DEFINITION_LIST] = [];
                    definitionList.forEach((definition, idx) => {
                        const matches = definition.match(definitionRegex);
                        if (matches) {
                            const filePath = (matches[1] ?? "") + matches[2] + matches[3];
                            const line = parseInt(matches[5]);
                            const col = parseInt(matches[6]);
                            normalizedScope[DEFINITION_LIST].push({ filePath, line, col });
                        }
                    });
                } catch (e) {
                    logger.error(`Unexpected "DefinitionList":  ${normalizedScope[DEFINITION_LIST]}`);
                }
            }
            const dedup: DedupProperties = {};
            for (const key in normalizedScope) {
                if (key.indexOf("__") !== 0) {
                    const row = formatValues(normalizedScope, key, dedup);
                    if (row) {
                        normalizedScope.__groupedProps[row.Key] = row;
                        if (!isNaN(row.StdDevs) && normalizedScope.__StdDevs < row.StdDevs) {
                            normalizedScope.__StdDevs = row.StdDevs;
                            normalizedScope.__StdDevsSource = row.Key;
                        }
                    }
                }
            }
            data.push(normalizedScope);
        }
        return {
            meta,
            columns,
            data
        };
    }

    fetchDetailsNormalized(request: RecursivePartial<WsWorkunits.WUDetails> = {}): Promise<{ meta: WsWorkunits.WUDetailsMetaResponse, columns: { [id: string]: any }, data: IScope[] }> {
        return Promise.all([this.fetchDetailsMeta(), this.fetchDetailsRaw(request)]).then(promises => {
            return this.normalizeDetails(promises[0], promises[1]);
        });
    }

    fetchInfo(request: Partial<WsWorkunits.WUInfo> = {}): Promise<WsWorkunits.WUInfoResponse> {
        return this.WUInfo(request);
    }

    fetchDetails(request: RecursivePartial<WsWorkunits.WUDetails> = {}): Promise<Scope[]> {
        return this.WUDetails(request).then((response) => {
            return response.Scopes.Scope.map((rawScope) => {
                return new Scope(this, rawScope);
            });
        });
    }

    fetchDetailsHierarchy(request: Partial<WsWorkunits.WUDetails> = {}): Promise<Scope[]> {
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

    fetchGraphDetails(graphIDs: string[] = [], rootTypes: string[]): Promise<BaseScope[]> {
        return this.fetchDetails({
            ScopeFilter: {
                MaxDepth: 999999,
                Ids: graphIDs,
                ScopeTypes: rootTypes,
            },
            NestedFilter: {
                Depth: 999999,
                ScopeTypes: ["graph", "subgraph", "activity", "edge", "function"]
            },
            PropertiesToReturn: {
                AllStatistics: true,
                AllAttributes: true,
                AllHints: true,
                AllProperties: true,
                AllScopes: true
            },
            ScopeOptions: {
                IncludeId: true,
                IncludeScope: true,
                IncludeScopeType: true
            },
            PropertyOptions: {
                IncludeName: true,
                IncludeRawValue: true,
                IncludeFormatted: true,
                IncludeMeasure: true,
                IncludeCreator: false,
                IncludeCreatorType: false
            }
        });
    }

    fetchScopeGraphs(graphIDs: string[] = []): Promise<ScopeGraph> {
        return this.fetchGraphDetails(graphIDs, ["graph"]).then((scopes) => {
            return createGraph(scopes);
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

    protected _monitorTimeoutDuration(): number {
        const retVal = super._monitorTimeoutDuration();
        if (this._monitorTickCount <= 1) {          //  Once
            return 1000;
        } else if (this._monitorTickCount <= 3) {   //  Twice
            return 3000;
        } else if (this._monitorTickCount <= 5) {   //  Twice
            return 5000;
        } else if (this._monitorTickCount <= 7) {   //  Twice
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
    protected WUQuery(_request: Partial<WsWorkunits.WUQuery> = {}): Promise<WsWorkunits.WUQueryResponse> {
        return this.connection.WUQuery({ ..._request, Wuid: this.Wuid }).then((response) => {
            if (response.Workunits.ECLWorkunit.length === 0) {
                //  deleted  ---
                this.clearState(this.Wuid);
                this.set("StateID", WUStateID.NotFound);
            } else {
                this.set(response.Workunits.ECLWorkunit[0]);
            }
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
                logger.warning(`Unexpected ESP exception: ${e.message}`);
                throw e;
            }
            return {} as WsWorkunits.WUQueryResponse;
        });
    }

    protected WUCreate() {
        return this.connection.WUCreate().then((response) => {
            this.set(response.Workunit);
            _workunits.set(this);
            return response;
        });
    }

    protected WUInfo(_request: Partial<WsWorkunits.WUInfo> = {}): Promise<WsWorkunits.WUInfoResponse> {
        const includeResults = _request.IncludeResults || _request.IncludeResultsViewNames;
        return this.connection.WUInfo({
            ..._request,
            Wuid: this.Wuid,
            IncludeResults: includeResults,
            IncludeResultsViewNames: includeResults,
            SuppressResultSchemas: false
        }).then((response) => {
            this.set(response.Workunit);
            if (includeResults) {
                this.set({
                    ResultViews: response.ResultViews
                } as IWorkunitState);
            }
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
                logger.warning(`Unexpected ESP exception: ${e.message}`);
                throw e;
            }
            return {} as WsWorkunits.WUInfoResponse;
        });
    }

    protected WUResubmit(request: Partial<WsWorkunits.WUResubmit>): Promise<WsWorkunits.WUResubmitResponse> {
        return this.connection.WUResubmit(deepMixinT<WsWorkunits.WUResubmit>({}, request, {
            Wuids: { Item: [this.Wuid] }
        }));
    }

    protected WUDetailsMeta(request: Partial<WsWorkunits.WUDetailsMeta>): Promise<WsWorkunits.WUDetailsMetaResponse> {
        return this.connection.WUDetailsMeta(request);
    }

    protected WUDetails(request: RecursivePartial<WsWorkunits.WUDetails>): Promise<WsWorkunits.WUDetailsResponse> {
        return this.connection.WUDetails(deepMixinT<WsWorkunits.WUDetails>({
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
            return deepMixinT<WsWorkunits.WUDetailsResponse>({
                Scopes: {
                    Scope: []
                }
            }, response);
        });
    }

    protected WUAction(actionType: WsWorkunits.ECLWUActions): Promise<WsWorkunits.WUActionResponse> {
        return this.connection.WUAction({
            Wuids: { Item: [this.Wuid] },
            WUActionType: actionType
        }).then((response) => {
            return this.refresh().then(() => {
                this._monitor();
                return response;
            });
        });
    }

    publish(name?: string) {
        return this.connection.WUPublishWorkunit({
            Wuid: this.Wuid,
            Cluster: this.Cluster,
            JobName: name || this.Jobname,
            AllowForeignFiles: true,
            Activate: WsWorkunits.WUQueryActivationMode.ActivateQuery,
            Wait: 5000
        });
    }

    publishEx(request: Partial<WsWorkunits.WUPublishWorkunit>) {
        const service = new WorkunitsServiceEx({ baseUrl: "" });
        const publishRequest = {
            Wuid: this.Wuid,
            Cluster: this.Cluster,
            JobName: this.Jobname,
            AllowForeignFiles: true,
            Activate: 1,
            Wait: 5000,
            ...request
        };
        return service.WUPublishWorkunitEx(publishRequest);
    }

    protected WUCDebug(command: string, opts: any = {}): Promise<XMLNode | null> {
        let optsStr = "";
        for (const key in opts) {
            if (opts.hasOwnProperty(key)) {
                optsStr += ` ${key}='${opts[key]}'`;
            }
        }
        return this.connection.WUCDebugEx({
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
        _file.replace(/\/\.\//g, "/");
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
