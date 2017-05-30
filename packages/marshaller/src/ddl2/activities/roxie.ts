import { PropertyExt, publish, publishProxy } from "@hpcc-js/common";
import { Query as CommsQuery, RequestType } from "@hpcc-js/comms";
import { IField } from "@hpcc-js/dgrid";
import { compare, hashSum } from "@hpcc-js/util";
import { Viz } from "../viz";
import { Activity, ReferencedFields, schemaRow2IField } from "./activity";
import { View } from "./view";

export class Param extends PropertyExt {
    private _view: View;
    private _owner: RoxieRequest;

    @publish(null, "set", "Datasource", function (this: Param) { return this.visualizationIDs(); }, { optional: true })
    source: publish<this, string>;
    source_exists: () => boolean;
    @publish(null, "set", "Source Field", function (this: Param) { return this.sourceFields(); }, { optional: true })
    remoteFieldID: publish<this, string>;
    remoteFieldID_exists: () => boolean;
    @publish(null, "string", "Label")  //  TODO Add ReadOnly
    localFieldID: publish<this, string>;
    localFieldID_exists: () => boolean;

    constructor(owner: RoxieRequest) {
        super();
        this._view = owner._owner;
        this._owner = owner;
    }

    hash() {
        return hashSum({
            label: this.localFieldID(),
            source: this.source(),
            sourceField: this.remoteFieldID(),
        });
    }

    visualizationIDs() {
        return this._view._dashboard.visualizationIDs();
    }

    sourceFields() {
        return this.sourceOutFields().map(field => field.label);
    }

    sourceViz(): Viz {
        return this._view._dashboard.visualization(this.source());
    }

    sourceOutFields(): IField[] {
        return this.sourceViz().view().outFields();
    }

    sourceSelection(): any[] {
        return this.sourceViz().state().selection();
    }

    exists(): boolean {
        return this.localFieldID_exists() && this.source_exists() && this.remoteFieldID_exists();
    }
}
Param.prototype._class += " ColumnMapping";

export class RoxieService extends PropertyExt {
    _owner: RoxieRequest;
    private _query: CommsQuery;

    @publish("", "string", "ESP Url (http://x.x.x.x:8010)")
    url: publish<this, string>;
    @publish("", "string", "Query Set")
    querySet: publish<this, string>;
    @publish("", "string", "Query ID")
    queryID: publish<this, string>;

    constructor(owner: RoxieRequest) {
        super();
        this._owner = owner;
    }

    hash(): string {
        return hashSum({
            url: this.url(),
            querySet: this.querySet(),
            queryId: this.queryID()
        });
    }

    label(): string {
        return this.queryID();
    }

    fullUrl(_: string): this {
        // "http://10.241.100.157:8002/WsEcl/submit/query/roxie/carmigjx_govbisgsavi.Ins4621360_Service_00000006/json",
        const parts = _.split("/WsEcl/submit/query/");
        if (parts.length < 2) throw new Error(`Invalid roxie URL:  ${_}`);
        const urlParts = parts[0].split(":");
        if (urlParts.length < 3) throw new Error(`Invalid roxie URL:  ${_}`);
        this.url(`${urlParts[0]}:${urlParts[1]}:${urlParts[2] === "18002" ? "18010" : "8010"}`);
        const roxieParts = parts[1].split("/");
        if (roxieParts.length < 2) throw new Error(`Invalid roxie URL:  ${_}`);
        this.querySet(roxieParts[0]);
        this.queryID(roxieParts[1]);
        return this;
    }

    private _prevSourceHash: string;
    private refreshMetaPromise: Promise<void>;
    refreshMeta(): Promise<void> {
        if (this._prevSourceHash !== this.hash()) {
            this._prevSourceHash = this.hash();
            delete this.refreshMetaPromise;
        }
        if (!this.refreshMetaPromise) {
            this.refreshMetaPromise = CommsQuery.attach({ baseUrl: this.url(), type: RequestType.JSONP }, this.querySet(), this.queryID()).then((query) => {
                this._query = query;
            });
        }
        return this.refreshMetaPromise;
    }

    outFields(resultName: string): IField[] {
        if (this._query) {
            const responseSchema = this._query.fields(resultName);
            return responseSchema.map(schemaRow2IField);
        }
        return [];
    }

    submit(request: { [key: string]: any }): Promise<{ [key: string]: any }> {
        return this._query.submit(request);
    }

    requestFields(): IField[] {
        if (this._query) {
            const responseSchema = this._query.requestFields();
            return responseSchema.map(schemaRow2IField);
        }
        return [];
    }
}
RoxieService.prototype._class += " RoxieService";

export class RoxieRequest extends Activity {
    _owner: View;
    protected _roxieService = new RoxieService(this);
    private _data: any[] = [];

    @publishProxy("_roxieService")
    url: publish<this, string>;
    @publishProxy("_roxieService")
    querySet: publish<this, string>;
    @publishProxy("_roxieService")
    queryID: publish<this, string>;
    @publish("", "string", "Result Name")
    resultName: publish<this, string>;
    @publish([], "propertyArray", "Request Fields")
    _request: Param[];
    request(): Param[];
    request(_: Param[]): this;
    request(_?: Param[]): Param[] | this {
        if (!arguments.length) return this._request;
        this._request = _;
        return this;
    }

    constructor(owner: View) {
        super();
        this._owner = owner;
    }

    sourceHash(): string {
        return this._roxieService.hash();
    }

    hash(): string {
        return hashSum({
            source: this.sourceHash(),
            params: this.request().map(param => param.hash())
        });
    }

    label(): string {
        return `${this._roxieService.label()}\n${this.resultName()}`;
    }

    referencedFields(refs: ReferencedFields): void {
        super.referencedFields(refs);
        const localFieldIDs: string[] = [];
        for (const param of this.validParams()) {
            const filterSource = param.sourceViz().view();
            localFieldIDs.push(param.localFieldID());
            filterSource.resolveFields(refs, [param.remoteFieldID()]);
        }
        super.resolveFields(refs, localFieldIDs);
    }

    validParams() {
        return this.request().filter(param => param.exists());
    }

    refreshMeta(): Promise<void> {
        return this._roxieService.refreshMeta().then(() => {
            const oldParams = this.request();
            const diffs = compare(oldParams.map(p => p.localFieldID()), this._roxieService.requestFields().map(ff => ff.label));
            const newParams = oldParams.filter(op => diffs.unchanged.indexOf(op.localFieldID()) >= 0);
            this.request(newParams.concat(diffs.added.map(label => new Param(this).localFieldID(label))));
        });
    }

    updatedBy(): string[] {
        return this.validParams().map(param => param.source());
    }

    outFields(): IField[] {
        return this._roxieService.outFields(this.resultName());
    }

    exec(): Promise<void> {
        return super.exec().then(() => {
            const request: { [key: string]: any } = {};
            for (const param of this.validParams()) {
                const sourceSelection = param.sourceSelection();
                if (sourceSelection.length) {
                    request[param.localFieldID()] = sourceSelection[0][param.remoteFieldID()];
                }
            }
            return this._roxieService.submit(request);
        }).then((response: { [key: string]: any }) => {
            this._data = response[this.resultName()];
        });
    }

    pullData(): object[] {
        return this._data;
    }
}
RoxieRequest.prototype._class += " RoxieRequest";

export class HipieRequest extends RoxieRequest {
    fullUrl(_: string): this {
        this._roxieService.fullUrl(_);
        return this;
    }
}
