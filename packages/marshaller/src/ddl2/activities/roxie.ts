import { PropertyExt, publish } from "@hpcc-js/common";
import { Query as CommsQuery } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { compare, debounce, hashSum } from "@hpcc-js/util";
import { Element, ElementContainer } from "../model/element";
import { Activity, ReferencedFields } from "./activity";

function parseUrl(_: string): { url: string, querySet: string, queryID: string } {
    // "http://10.241.100.157:8002/WsEcl/submit/query/roxie/carmigjx_govbisgsavi.Ins4621360_Service_00000006/json",
    const parts = _.split("/WsEcl/submit/query/");
    if (parts.length < 2) throw new Error(`Invalid roxie URL:  ${_}`);
    const urlParts = parts[0].split(":");
    if (urlParts.length < 3) throw new Error(`Invalid roxie URL:  ${_}`);
    const roxieParts = parts[1].split("/");
    if (roxieParts.length < 2) throw new Error(`Invalid roxie URL:  ${_}`);
    return {
        url: `${urlParts[0]}:${urlParts[1]}:${urlParts[2] === "18002" ? "18010" : "8010"}`,
        querySet: roxieParts[0],
        queryID: roxieParts[1]
    };
}

export class Param extends PropertyExt {
    private _elementContainer: ElementContainer;

    @publish(null, "set", "Datasource", function (this: Param) { return this.visualizationIDs(); }, { optional: true })
    source: publish<this, string>;
    source_exists: () => boolean;
    @publish(null, "set", "Source Field", function (this: Param) { return this.sourceFields(); }, { optional: true })
    remoteField: publish<this, string>;
    remoteField_exists: () => boolean;
    @publish(null, "string", "Label")  //  TODO Add ReadOnly
    localField: publish<this, string>;
    localField_exists: () => boolean;

    constructor(elementContainer: ElementContainer) {
        super();
        this._elementContainer = elementContainer;
    }

    toDDL(): DDL2.IRequestField {
        return {
            source: this.source(),
            remoteFieldID: this.remoteField(),
            localFieldID: this.localField()
        };
    }

    static fromDDL(elementContainer: ElementContainer, ddl: DDL2.IRequestField): Param {
        return new Param(elementContainer)
            .source(ddl.source)
            .remoteField(ddl.remoteFieldID)
            .localField(ddl.localFieldID)
            ;
    }

    hash() {
        return hashSum({
            label: this.localField(),
            source: this.source(),
            sourceField: this.remoteField(),
        });
    }

    visualizationIDs() {
        return this._elementContainer.elementIDs();
    }

    sourceFields() {
        return this.sourceOutFields().map(field => field.id);
    }

    sourceViz(): Element {
        return this._elementContainer.element(this.source());
    }

    sourceOutFields(): DDL2.IField[] {
        return this.sourceViz().hipiePipeline().selectionFields();
    }

    sourceSelection(): any[] {
        return this.sourceViz().selection();
    }

    exists(): boolean {
        return this.localField_exists() && this.source_exists() && this.remoteField_exists();
    }
}
Param.prototype._class += " ColumnMapping";

export class RoxieService extends PropertyExt {
    private _query: CommsQuery;
    private _requestFields: DDL2.IField[];
    private _responseFields: { [outputID: string]: DDL2.IField[] } = {};

    @publish("", "string", "ESP Url (http://x.x.x.x:8002)")
    url: publish<this, string>;
    @publish("", "string", "Query Set")
    querySet: publish<this, string>;
    @publish("", "string", "Query ID")
    queryID: publish<this, string>;

    constructor() {
        super();
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

    private _prevSourceHash: string;
    private refreshMetaPromise: Promise<void>;
    refreshMeta(): Promise<void> {
        if (this._prevSourceHash !== this.hash()) {
            this._prevSourceHash = this.hash();
            delete this.refreshMetaPromise;
        }
        if (!this.refreshMetaPromise) {
            const skipMeta = !!this._requestFields;
            this.refreshMetaPromise = CommsQuery.attach({ baseUrl: this.url() }, this.querySet(), this.queryID(), skipMeta).then((query) => {
                this._query = query;
                if (!skipMeta) {
                    this._requestFields = query.requestFields();
                    for (const resultName of query.resultNames()) {
                        this._responseFields[resultName] = query.resultFields(resultName);
                    }
                }
            });
        }
        return this.refreshMetaPromise;
    }

    requestFields(): DDL2.IField[];
    requestFields(_: DDL2.IField[]): this;
    requestFields(_?: DDL2.IField[]): DDL2.IField[] | this {
        if (!arguments.length) return this._requestFields || [];
        this._requestFields = _;
        return this;
    }

    responseFields(resultName: string): DDL2.IField[];
    responseFields(resultName: string, _: DDL2.IField[]): this;
    responseFields(resultName: string, _?: DDL2.IField[]): DDL2.IField[] | this {
        if (arguments.length === 1) return this._responseFields[resultName] || [];
        this._responseFields[resultName] = _;
        return this;
    }

    submit = debounce((request: { [key: string]: any }): Promise<{ [key: string]: any }> => {
        return this._query.submit(request);
    });
}
RoxieService.prototype._class += " RoxieService";

const _roxiePool: { [key: string]: RoxieService } = {};
export class RoxieRequest extends Activity {
    private _elementContainer: ElementContainer;

    roxieServiceID(): string {
        return `${this.url()}/${this.querySet()}/${this.queryID()}`;
    }

    protected get _roxieService(): RoxieService {
        let retVal: RoxieService = _roxiePool[this.roxieServiceID()];
        if (!retVal) {
            retVal = new RoxieService()
                .url(this.url())
                .querySet(this.querySet())
                .queryID(this.queryID())
                ;
            _roxiePool[this.roxieServiceID()] = retVal;
        }
        return retVal;
    }
    private _data: any[] = [];

    @publish("", "string", "ESP Url (http://x.x.x.x:8002)")
    url: publish<this, string>;
    @publish("", "string", "Query Set")
    querySet: publish<this, string>;
    @publish("", "string", "Query ID")
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

    constructor(elementContainer: ElementContainer) {
        super();
        this._elementContainer = elementContainer;
    }

    sourceHash(): string {
        return this._roxieService.hash();
    }

    requestFieldRefs(): DDL2.IRequestField[];
    requestFieldRefs(_: DDL2.IRequestField[]): this;
    requestFieldRefs(_?: DDL2.IRequestField[]): DDL2.IRequestField[] | this {
        if (!arguments.length) return this.validParams().map(param => param.toDDL());
        this.request(_.map(fc => Param.fromDDL(this._elementContainer, fc)));
        return this;
    }

    responseFields(): DDL2.IField[];
    responseFields(_: DDL2.IField[]): this;
    responseFields(_?: DDL2.IField[]): DDL2.IField[] | this {
        if (!arguments.length) return this._roxieService.responseFields(this.resultName());
        this._roxieService.responseFields(this.resultName(), _);
        return this;
    }

    hash(): string {
        return hashSum({
            source: this.sourceHash(),
            resultName: this.resultName(),
            params: this.request().map(param => param.hash())
        });
    }

    label(): string {
        return `${this._roxieService.label()}\n${this.resultName()}`;
    }

    elementIDs() {
        return this._elementContainer.elementIDs();
    }

    element(source) {
        return this._elementContainer.element(source);
    }

    referencedFields(refs: ReferencedFields): void {
        super.referencedFields(refs);
        const localFieldIDs: string[] = [];
        for (const param of this.validParams()) {
            const filterSource = param.sourceViz().hipiePipeline();
            if (!refs.inputs[this.id()]) {
                refs.inputs[this.id()] = [];
            }
            refs.inputs[this.id()].push(param.localField());
            filterSource.resolveFields(refs, [param.remoteField()]);
        }
        super.resolveFields(refs, localFieldIDs);
    }

    validParams() {
        return this.request().filter(param => param.exists());
    }

    appendParam(source: Element, mappings: Array<{ remoteField: string, localField: string }>): this {
        for (const mapping of mappings) {
            this.request().push(new Param(this._elementContainer)
                .source(source.id())
                .remoteField(mapping.remoteField)
                .localField(mapping.localField)
            );
        }
        return this;
    }

    refreshMeta(): Promise<void> {
        return this._roxieService.refreshMeta().then(() => {
            const oldParams = this.request();
            const diffs = compare(oldParams.map(p => p.localField()), this._roxieService.requestFields().map(ff => ff.id));
            const newParams = oldParams.filter(op => diffs.unchanged.indexOf(op.localField()) >= 0);
            this.request(newParams.concat(diffs.added.map(label => new Param(this._elementContainer).localField(label))));
        });
    }

    updatedBy(): string[] {
        const retVal = this.validParams().map(param => param.source());
        return retVal;
    }

    computeFields(): DDL2.IField[] {
        return this._roxieService.responseFields(this.resultName());
    }

    formatRequest(): { [key: string]: any } {
        const request: { [key: string]: any } = {};
        for (const param of this.validParams()) {
            const sourceSelection = param.sourceSelection();
            if (sourceSelection.length) {
                request[param.localField()] = sourceSelection[0][param.remoteField()];
            }
        }
        return request;
    }

    _prevRequestHash;
    _prevRequestPromise;
    exec(): Promise<void> {
        return super.exec().then(() => {
            const request = this.formatRequest();
            const requestHash = hashSum({ hash: this.hash(), request });
            if (this._prevRequestHash !== requestHash) {
                this._prevRequestHash = requestHash;
                this._prevRequestPromise = this._roxieService.submit(request).then((response: { [key: string]: any }) => this.fixInt64(response[this.resultName()]));
            }
            return this._prevRequestPromise;
        }).then(data => {
            this._data = data;
        });
    }

    computeData(): ReadonlyArray<object> {
        return this._data;
    }
}
RoxieRequest.prototype._class += " RoxieRequest";

export class HipieRequest extends RoxieRequest {

    fullUrl(_: string): this {
        const info = parseUrl(_);
        this.url(info.url);
        this.querySet(info.querySet);
        this.queryID(info.queryID);
        return this;
    }

    formatRequest(): { [key: string]: any } {
        const request: { [key: string]: any } = {};
        let hasRequest = false;
        for (const param of this.validParams()) {
            const sourceSelection = param.sourceSelection();
            if (sourceSelection.length) {
                request[param.localField()] = sourceSelection[0][param.remoteField()];
                request[`${param.localField()}_changed`] = true;
            }
            hasRequest = true;
        }
        if (!hasRequest) {
            request.refresh = true;
        }
        return request;
    }
}
HipieRequest.prototype._class += " HipieRequest";
