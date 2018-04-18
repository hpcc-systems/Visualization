import { PropertyExt, publish } from "@hpcc-js/common";
import { Query as CommsQuery } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { IField } from "@hpcc-js/dgrid";
import { compare, debounce, hashSum } from "@hpcc-js/util";
import { Element, ElementContainer } from "../model";
import { Activity, ReferencedFields, schemaRow2IField } from "./activity";

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
        return this.sourceOutFields().map(field => field.label);
    }

    sourceViz(): Element {
        return this._elementContainer.element(this.source());
    }

    sourceOutFields(): IField[] {
        return this.sourceViz().hipiePipeline().outFields();
    }

    sourceSelection(): any[] {
        return this.sourceViz().state().selection();
    }

    exists(): boolean {
        return this.localField_exists() && this.source_exists() && this.remoteField_exists();
    }
}
Param.prototype._class += " ColumnMapping";

export class RoxieService extends PropertyExt {
    private _query: CommsQuery;

    @publish("", "string", "ESP Url (http://x.x.x.x:8010)")
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
            this.refreshMetaPromise = CommsQuery.attach({ baseUrl: this.url(), type: "jsonp" }, this.querySet(), this.queryID()).then((query) => {
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

    submit = debounce((request: { [key: string]: any }): Promise<{ [key: string]: any }> => {
        return this._query.submit(request);
    });

    requestFields(): IField[] {
        if (this._query) {
            const responseSchema = this._query.requestFields();
            return responseSchema.map(schemaRow2IField);
        }
        return [];
    }
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

    @publish("", "string", "ESP Url (http://x.x.x.x:8010)")
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

    requestFields(): DDL2.IRequestField[];
    requestFields(_: DDL2.IRequestField[]): this;
    requestFields(_?: DDL2.IRequestField[]): DDL2.IRequestField[] | this {
        if (!arguments.length) return this.validParams().map(param => param.toDDL());
        this.request(_.map(fc => Param.fromDDL(this._elementContainer, fc)));
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
            const diffs = compare(oldParams.map(p => p.localField()), this._roxieService.requestFields().map(ff => ff.label));
            const newParams = oldParams.filter(op => diffs.unchanged.indexOf(op.localField()) >= 0);
            this.request(newParams.concat(diffs.added.map(label => new Param(this._elementContainer).localField(label))));
        });
    }

    updatedBy(): string[] {
        return this.validParams().map(param => param.source());
    }

    computeFields(): IField[] {
        return this._roxieService.outFields(this.resultName());
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

    exec(): Promise<void> {
        return super.exec().then(() => {
            return this._roxieService.submit(this.formatRequest());
        }).then((response: { [key: string]: any }) => {
            this._data = this.fixInt64(response[this.resultName()]);
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
        console.log(request);
        return request;
    }
}
HipieRequest.prototype._class += " HipieRequest";
