import { PropertyExt, publish } from "@hpcc-js/common";
import { Query as CommsQuery } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { AsyncOrderedQueue, compare, hashSum } from "@hpcc-js/util";
import { Element, ElementContainer } from "../model/element";
import { IActivityError, ReferencedFields } from "./activity";
import { Datasource, DatasourceRef } from "./datasource";

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

    @publish(null, "set", "Activity", function (this: Param) { return this.visualizationIDs(); }, {
        optional: true,
        validate: (w: Param): boolean => w.visualizationIDs().indexOf(w.source()) >= 0
    })
    source: publish<this, string>;
    source_exists: () => boolean;
    source_valid: () => boolean;
    @publish(null, "set", "Source Field", function (this: Param) { return this.sourceFields(); }, {
        optional: true,
        validate: (w: Param): boolean => w.sourceFields().indexOf(w.remoteField()) >= 0
    })
    remoteField: publish<this, string>;
    remoteField_exists: () => boolean;
    remoteField_valid: () => boolean;
    @publish(null, "string", "Label")  //  TODO Add ReadOnly
    localField: publish<this, string>;
    localField_exists: () => boolean;

    validate(prefix: string): IActivityError[] {
        const retVal: IActivityError[] = [];
        if (!this.source_valid()) {
            retVal.push({
                source: `${prefix}.source.${this.source()}`,
                msg: `Invalid source:  "${this.source()}"`,
                hint: `expected:  ${JSON.stringify(this.visualizationIDs())}`
            });
        }
        if (!this.remoteField_valid()) {
            retVal.push({
                source: `${prefix}.remoteField`,
                msg: `Invalid remoteField:  "${this.remoteField()}"`,
                hint: `expected:  ${JSON.stringify(this.sourceOutFields())}`
            });
        }
        return retVal;
    }

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
            sourceField: this.remoteField()
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

    sourceOutFields(): ReadonlyArray<DDL2.IField> {
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

export class RoxieService extends Datasource {
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

    toDDL(): DDL2.IRoxieService {
        return {
            type: "roxie",
            id: this.id(),
            url: this.url(),
            querySet: this.querySet(),
            queryID: this.queryID(),
            inputs: [],
            outputs: {}
        };
    }

    static fromDDL(ddl: DDL2.IRoxieService | DDL2.IHipieService) {
        return new RoxieService()
            .id(ddl.id)
            .url(ddl.url)
            .querySet(ddl.querySet)
            .queryID(ddl.queryID)
            ;
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
            this.refreshMetaPromise = new Promise<CommsQuery>((resolve, reject) => {
                const query = CommsQuery.attach({ baseUrl: this.url() }, this.querySet(), this.queryID());
                if (skipMeta) {
                    resolve(query);
                }
                resolve(query.refresh());
            }).then((query) => {
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

    private _prevRequestHash;
    private _prevPromise;
    private _submitQ = new AsyncOrderedQueue();
    submit(request: { [key: string]: any }): Promise<{ [key: string]: any }> {
        const requestHash = hashSum(request);
        if (!this._prevPromise || this._prevRequestHash !== requestHash) {
            this._prevRequestHash = requestHash;
            this._prevPromise = this._submitQ.push(this._query.submit(request));
        }
        return this._prevPromise;
    }

    resultNames(): string[] {
        const retVal: string[] = [];
        for (const key in this._responseFields) {
            retVal.push(key);
        }
        return retVal;
    }
}
RoxieService.prototype._class += " RoxieService";

export class RoxieResult extends Datasource {
    private _elementContainer: ElementContainer;

    idX(): string;
    idX(_: string): this;
    idX(_?: string): this | string {
        if (!arguments.length) return `${this.service().id()}_${this.resultName()}`;
        return this;
    }

    @publish(null, "widget", "Roxie sservice")
    _service: RoxieService = new RoxieService();
    service(): RoxieService;
    service(_: RoxieService): this;
    service(_?: RoxieService): this | RoxieService {
        if (!arguments.length) return this._service;
        this._service = _;
        this._service.refreshMeta();
        return this;
    }

    @publish("", "set", "Result Name", function (this: RoxieResult): string[] {
        return this._service !== undefined ? this._service.resultNames() : [];
    })
    resultName: publish<this, string>;

    constructor(elementContainer: ElementContainer) {
        super();
        this._elementContainer = elementContainer;
    }

    toDDL(): DDL2.IRoxieService {
        return this.service().toDDL();
    }

    static fromDDL(ec: ElementContainer, rs: RoxieService, resultName: string): RoxieResult {
        return new RoxieResult(ec)
            .id(`${rs.id()}_${resultName}`)
            .service(rs)
            .resultName(resultName)
            ;
    }

    roxieServiceID(): string {
        return `${this.service().url()}/${this.service().querySet()}/${this.service().queryID()}`;
    }

    sourceHash(): string {
        return this.service().hash();
    }

    requestFields(): DDL2.IField[] {
        return this.service().requestFields();
    }

    responseFields(): DDL2.IField[];
    responseFields(_: DDL2.IField[]): this;
    responseFields(_?: DDL2.IField[]): this | DDL2.IField[] {
        if (!arguments.length) return this.service().responseFields(this.resultName());
        this.service().responseFields(this.resultName(), _);
        return this;
    }

    hash(): string {
        return hashSum({
            source: this.sourceHash(),
            resultName: this.resultName()
        });
    }

    label(): string {
        return `${this.service().label()}\n${this.resultName()}`;
    }

    elementIDs() {
        return this._elementContainer.elementIDs();
    }

    element(source) {
        return this._elementContainer.element(source);
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        return () => this.service().responseFields(this.resultName());
    }

    refreshMeta(): Promise<void> {
        return this.service().refreshMeta();
    }

    submit(request: { [key: string]: any }): Promise<{ [key: string]: any }> {
        return this.service().submit(request);
    }
}
RoxieResult.prototype._class += " RoxieResult";

export class RoxieResultRef extends DatasourceRef {
    private _elementContainer: ElementContainer;

    roxieServiceID(): string {
        const ds = this.datasource() as RoxieResult;
        return ds.roxieServiceID();
    }

    protected get _roxieResult(): RoxieResult {
        return this.datasource() as RoxieResult;
    }
    private _data: ReadonlyArray<object> = [];

    datasource(): RoxieResult;
    datasource(_: RoxieResult): this;
    datasource(_?: RoxieResult): this | RoxieResult {
        return super.datasource.apply(this, arguments);
    }

    url(): string {
        return this.datasource().service().url();
    }

    querySet(): string {
        return this.datasource().service().querySet();
    }

    queryID(): string {
        return this.datasource().service().queryID();
    }

    resultName(): string {
        return this.datasource().resultName();
    }

    @publish([], "propertyArray", "Request Fields")
    _request: Param[];
    request(): Param[];
    request(_: Param[]): this;
    request(_?: Param[]): Param[] | this {
        if (!arguments.length) return this._request;
        this._request = _;
        return this;
    }

    validate(): IActivityError[] {
        let retVal: IActivityError[] = [];
        for (const filter of this.validParams()) {
            retVal = retVal.concat(filter.validate("request"));
        }
        return retVal;
    }

    constructor(elementContainer: ElementContainer) {
        super();
        this._elementContainer = elementContainer;
    }

    sourceHash(): string {
        return this._roxieResult.hash();
    }

    requestFieldRefs(): DDL2.IRequestField[];
    requestFieldRefs(_: DDL2.IRequestField[]): this;
    requestFieldRefs(_?: DDL2.IRequestField[]): DDL2.IRequestField[] | this {
        if (!arguments.length) return this.validParams().map(param => param.toDDL());
        this.request(_.map(fc => Param.fromDDL(this._elementContainer, fc)));
        return this;
    }

    requestFields(): DDL2.IField[] {
        return this._roxieResult.requestFields();
    }

    responseFields(): DDL2.IField[] {
        return this._roxieResult.responseFields();
    }

    hash(): string {
        return hashSum({
            source: this.sourceHash(),
            resultName: this._roxieResult.resultName(),
            params: this.request().map(param => param.hash()),
            request: this.formatRequest()
        });
    }

    label(): string {
        return `${this._roxieResult.label()}\n${this._roxieResult.resultName()}`;
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
        return this._roxieResult.refreshMeta().then(() => {
            const oldParams = this.request();
            const diffs = compare(oldParams.map(p => p.localField()), this._roxieResult.requestFields().map(ff => ff.id));
            const newParams = oldParams.filter(op => diffs.unchanged.indexOf(op.localField()) >= 0);
            this.request(newParams.concat(diffs.added.map(label => new Param(this._elementContainer).localField(label))));
        });
    }

    updatedBy(): string[] {
        return this.validParams().map(param => param.source());
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        return () => this._roxieResult.responseFields();
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

    private _prevRequestHash;
    private _prevRequestPromise;
    exec(): Promise<void> {
        return super.exec().then(() => {
            const request = this.formatRequest();
            const requestHash = hashSum({ hash: this.hash(), request });
            if (this._prevRequestHash !== requestHash) {
                this._prevRequestHash = requestHash;
                this._prevRequestPromise = this._roxieResult.submit(request).then((response: { [key: string]: any }) => {
                    const resultName = this._roxieResult.resultName();
                    let result = response[resultName];
                    if (!result) {
                        //  See:  https://track.hpccsystems.com/browse/HPCC-21176  ---
                        //  "Result 1" => "result_1"
                        result = response[resultName.toLowerCase().replace(" ", "_")];
                    }
                    return this.fixInt64(result);
                });
            }
            return this._prevRequestPromise;
        }).then(data => {
            this._data = data;
        });
    }

    inData(): ReadonlyArray<object> {
        return this._data;
    }

    computeData(): ReadonlyArray<object> {
        return this._data;
    }
}
RoxieResultRef.prototype._class += " RoxieResultRef";

export class HipieResultRef extends RoxieResultRef {

    fullUrl(_: string): this {
        const info = parseUrl(_);
        this._roxieResult.service().url(info.url);
        this._roxieResult.service().querySet(info.querySet);
        this._roxieResult.service().queryID(info.queryID);
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
HipieResultRef.prototype._class += " HipieResultRef";
