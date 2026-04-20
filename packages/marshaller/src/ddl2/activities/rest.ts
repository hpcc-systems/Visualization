import { PropertyExt } from "@hpcc-js/common";
import { createConnection } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { AsyncOrderedQueue, compare, hashSum } from "@hpcc-js/util";
import { Element, ElementContainer } from "../model/element.ts";
import { IActivityError, ReferencedFields } from "./activity.ts";
import { rowToFields } from "./databomb.ts";
import { Datasource, DatasourceRef } from "./datasource.ts";

export class RestField extends PropertyExt {
    protected _owner: RestService;

    constructor() {
        super();
    }

    toDDL(): DDL2.IFieldString {
        return {
            type: "string",
            id: this.fieldID()
        };
    }

    fromDDL(ddl: DDL2.IFieldString): this {
        return this
            .fieldID(ddl.id)
            ;
    }

    static fromDDL(ddl: DDL2.IFieldString): RestField {
        return new RestField().fromDDL(ddl);
    }

    owner(): RestService;
    owner(_: RestService): this;
    owner(_?: RestService): RestService | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.fieldID();
    }
}

export class RestService extends Datasource {

    private _responseFields: { [outputID: string]: DDL2.IField[] } = {};

    constructor(readonly _ec: ElementContainer) {
        super();
    }

    toDDL(): DDL2.IRestService {
        return {
            type: "rest",
            id: this.id(),
            url: this.url(),
            action: this.action(),
            mode: this.mode(),
            inputs: this.validRequestFields().map(rf => rf.toDDL()),
            outputs: this.outputDDL()
        };
    }

    fromDDL(ddl: DDL2.IRestService, skipID = false): this {
        (skipID ? this : this.id(ddl.id))
            .url(ddl.url)
            .action(ddl.action)
            .mode(ddl.mode || "get")
            .requestFields(ddl.inputs.map(RestField.fromDDL))
            ;
        for (const key in ddl.outputs) {
            this.responseFields(key, ddl.outputs[key].fields);
        }
        return this;
    }

    static fromDDL(ec: ElementContainer, ddl: DDL2.IRestService, skipID = false): RestService {
        return new RestService(ec).fromDDL(ddl, skipID);
    }

    hash(more: object = {}): string {
        return hashSum({
            url: this.url(),
            action: this.action(),
            mode: this.mode(),
            ...more
        });
    }

    label(): string {
        return this.action();
    }

    responseFields(resultName: string): DDL2.IField[];
    responseFields(resultName: string, _: DDL2.IField[]): this;
    responseFields(resultName: string, _?: DDL2.IField[]): DDL2.IField[] | this {
        if (arguments.length === 1) return this._responseFields[resultName] || [];
        this._responseFields[resultName] = _;
        return this;
    }

    validRequestFields(): RestField[] {
        return this.requestFields().filter(f => f.valid());
    }

    private _prevRequestHash;
    private _prevPromise;
    private _submitQ = new AsyncOrderedQueue();
    submit(request: { [key: string]: any }): Promise<{ [key: string]: any }> {
        const requestHash = hashSum(request);
        if (!this._prevPromise || this._prevRequestHash !== requestHash) {
            this._prevRequestHash = requestHash;
            const conn = createConnection({ baseUrl: this.url(), type: this.mode() });
            this._prevPromise = this._submitQ.push(conn.send(this.action(), request));
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

    outputDDL(): DDL2.OutputDict {
        const retVal: DDL2.OutputDict = {};
        this.resultNames().forEach(resultName => {
            retVal[resultName] = {
                fields: this._responseFields[resultName]
            };
        });
        return retVal;
    }
}
RestService.prototype._class += " RestService";

export class RestResult extends Datasource {

    _origService;

    declare _service: RestService;

    constructor(private _ec: ElementContainer) {
        super();
        this._service = new RestService(this._ec);
    }

    validRequestFields(): RestField[] {
        return this.service().validRequestFields();
    }

    toDDL(): DDL2.IRestService {
        return this.service().toDDL();
    }

    fromDDL(ddl: DDL2.IRestService): this {
        this.service().fromDDL(ddl);
        return this;
    }

    static fromDDL(ec: ElementContainer, rs: RestService, resultName: string): RestResult {
        return new RestResult(ec)
            .id(`${rs.id()}_${resultName}`)
            .service(rs)
            .resultName(resultName)
            ;
    }

    serviceID(): string {
        return `${this.service().url()}/${this.service().action()}}`;
    }

    sourceHash(): string {
        return this.service().hash();
    }

    requestFields(): DDL2.IField[] {
        return this.service().requestFields().map(rf => rf.toDDL());
    }

    responseFields(): DDL2.IField[];
    responseFields(_: DDL2.IField[]): this;
    responseFields(_?: DDL2.IField[]): this | DDL2.IField[] {
        if (!arguments.length) return this.service().responseFields(this.resultName());
        this.service().responseFields(this.resultName(), _);
        return this;
    }

    hash(more: object = {}): string {
        return hashSum({
            source: this.sourceHash(),
            resultName: this.resultName(),
            ...more
        });
    }

    label(): string {
        return `${this.service().label()}\n${this.resultName()}`;
    }

    private _jsonData: object[] = [];
    private jsonDataFields(): DDL2.IField[] {
        if (!this._jsonData || !this._jsonData.length) return [];
        const retVal = rowToFields(this._jsonData[0], this._jsonData);
        this.responseFields(retVal);
        return retVal;
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        return () => this.jsonDataFields();
    }

    computeData(): ReadonlyArray<object> {
        return this._jsonData;
    }

    submit(request: { [key: string]: any }): Promise<{ [key: string]: any }> {
        return this.service().submit(request).then(response => {
            const resultName = this.resultName();
            const resultFields = resultName ? resultName.split(".") : [];
            for (const field of resultFields) {
                response = (response || {})[field];
            }
            this._jsonData = response as object[];
            return response;
        });
    }

    formatRequest() {
        const request = {};
        this.service().validRequestFields().forEach(f => {
            request[f.fieldID()] = "";
        });
        return request;
    }

    exec(): Promise<void> {
        return this.submit(this.formatRequest()).then(response => { });
    }
}
RestResult.prototype._class += " RestResult";

export class Param extends PropertyExt {

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
        if (!this.value_valid()) {
            retVal.push({
                source: `${prefix}.value`,
                msg: `Invalid value:  "${this.value()}"`,
                hint: "expected:  any value."
            });
        }
        return retVal;
    }

    constructor(private _ec: ElementContainer) {
        super();
    }

    toDDL(): DDL2.IRequestField {
        return {
            source: this.source(),
            remoteFieldID: this.remoteField(),
            localFieldID: this.localField(),
            value: this.value()
        };
    }

    fromDDL(ddl: DDL2.IRequestField): this {
        return this
            .source(ddl.source)
            .remoteField(ddl.remoteFieldID)
            .localField(ddl.localFieldID)
            .value(ddl.value)
            ;
    }

    static fromDDL(ec: ElementContainer, ddl: DDL2.IRequestField): Param {
        return new Param(ec).fromDDL(ddl);
    }

    hash() {
        return hashSum({
            label: this.localField(),
            source: this.source(),
            sourceField: this.remoteField()
        });
    }

    visualizationIDs() {
        return this._ec.elementIDs();
    }

    sourceFields() {
        return this.sourceOutFields().map(field => field.id);
    }

    sourceViz(): Element {
        return this._ec.element(this.source());
    }

    sourceOutFields(): ReadonlyArray<DDL2.IField> {
        return this.sourceViz().hipiePipeline().selectionFields();
    }

    sourceSelection(): any[] {
        return this.sourceViz().selection();
    }

    calcValue(): Array<string | number | boolean> {
        if (this.source_exists() && this.remoteField_exists()) {
            const sourceSelection = this.sourceSelection();
            return sourceSelection.map(row => row[this.remoteField()]);
        } else if (this.value_exists()) {
            return [this.value()];
        }
        return [""];
    }

    exists(): boolean {
        return this.localField_exists() && ((this.source_exists() && this.remoteField_exists()) || this.value_exists());
    }
}
Param.prototype._class += " Param";

export class RestResultRef extends DatasourceRef {

    serviceID(): string {
        return this.datasource().serviceID();
    }

    private _data: ReadonlyArray<object> = [];

    datasource(): RestResult;
    datasource(_: RestResult): this;
    datasource(_?: RestResult): this | RestResult {
        return super.datasource.apply(this, arguments);
    }

    url(): string {
        return this.datasource().service().url();
    }

    action(): string {
        return this.datasource().service().action();
    }

    resultName(): string {
        return this.datasource().resultName();
    }

    validate(): IActivityError[] {
        let retVal: IActivityError[] = [];
        for (const filter of this.validParams()) {
            retVal = retVal.concat(filter.validate("request"));
        }
        return retVal;
    }

    constructor(private _ec: ElementContainer) {
        super();
    }

    toDDL(): DDL2.IRoxieServiceRef {
        return {
            id: this.datasource().service().id(),
            output: this.resultName(),
            request: this.validParams().map((vp): DDL2.IRequestField => {
                return {
                    source: vp.source(),
                    remoteFieldID: vp.remoteField(),
                    localFieldID: vp.localField(),
                    value: vp.value()
                };
            })
        };
    }

    sourceHash(): string {
        return this.datasource().hash();
    }

    requestFieldRefs(): DDL2.IRequestField[];
    requestFieldRefs(_: DDL2.IRequestField[]): this;
    requestFieldRefs(_?: DDL2.IRequestField[]): DDL2.IRequestField[] | this {
        if (!arguments.length) return this.validParams().map(param => param.toDDL());
        this.request(_.map(fc => Param.fromDDL(this._ec, fc)));
        return this;
    }

    requestFields(): DDL2.IField[] {
        return this.datasource().requestFields();
    }

    responseFields(): DDL2.IField[] {
        return this.datasource().responseFields();
    }

    hash(): string {
        return this.datasource().hash({
            resultName: this.resultName(),
            request: this.formatRequest()
        });
    }

    label(): string {
        return `${this.datasource().label()}\n${this.datasource().resultName()}`;
    }

    elementIDs() {
        return this._ec.elementIDs();
    }

    element(source) {
        return this._ec.element(source);
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

    refreshMeta(): Promise<void> {
        return this.datasource().refreshMeta().then(() => {
            const oldParams = this.request();
            const diffs = compare(oldParams.map(p => p.localField()), this.datasource().validRequestFields().map(ff => ff.fieldID()));
            const newParams = oldParams.filter(op => diffs.update.indexOf(op.localField()) >= 0);
            this.request(newParams.concat(diffs.enter.map(label => new Param(this._ec).localField(label))));
        });
    }

    updatedBy(): string[] {
        return this.validParams().map(param => param.source());
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        return this.datasource().computeFields(inFields);
    }

    formatRequest(): { [key: string]: any } {
        const request = this.datasource().formatRequest();
        this.request().forEach(f => {
            if (request[f.localField()] !== undefined) {
                request[f.localField()] = f.calcValue() || request[f.localField()];
            }
        });
        return request;
    }

    private _prevRequestHash;
    private _prevRequestPromise;
    exec(): Promise<void> {
        const request = this.formatRequest();
        const requestHash = hashSum({ hash: this.hash(), request });
        if (this._prevRequestHash !== requestHash) {
            this._prevRequestHash = requestHash;
            this._prevRequestPromise = this.datasource().submit(request).then((response: { [key: string]: any }) => {
                this._data = this.fixInt64(response);
                return this._data;
            });
        }
        return this._prevRequestPromise;
    }

    inData(): ReadonlyArray<object> {
        return this._data;
    }

    computeData(): ReadonlyArray<object> {
        return this._data;
    }
}
RestResultRef.prototype._class += " RestResultRef";

export interface RestField {
    fieldID(): string;
    fieldID(_: string): this;
}

RestField.prototype.publish("fieldID", "", "string", "RestField Label");

export interface RestService {
    url(): string;
    url(_: string): this;
    action(): string;
    action(_: string): this;
    mode(): "get" | "post";
    mode(_: "get" | "post"): this;
    requestFields(): RestField[];
    requestFields(_: RestField[]): this;
}

RestService.prototype.publish("url", "", "string", "REST Url");
RestService.prototype.publish("action", "", "string", "Query Set");
RestService.prototype.publish("mode", "get", "set", "Request mode", ["get", "post"]);
RestService.prototype.publish("requestFields", [], "propertyArray", "Multi Fields", null, { autoExpand: RestField });

export interface RestResult {
    service(): RestService;
    service(_: RestService): this;
    resultName(): string;
    resultName(_: string): this;
}

RestResult.prototype.publish("service", null, "widget", "Rest service");
RestResult.prototype.publish("resultName", "", "string", "Result Name");

RestResult.prototype._origService = RestResult.prototype.service;
RestResult.prototype.service = function (this: RestResult, _?) {
    const retVal = RestResult.prototype._origService.apply(this, arguments);
    if (_ !== undefined) {
        this._service.refreshMeta();
    }
    return retVal;
};

export interface Param {
    localField(): string;
    localField(_: string): this;
    localField_exists(): boolean;
    source(): string;
    source(_: string): this;
    source_exists(): boolean;
    source_valid(): boolean;
    source_disabled(): boolean;
    remoteField(): string;
    remoteField(_: string): this;
    remoteField_exists(): boolean;
    remoteField_valid(): boolean;
    remoteField_disabled(): boolean;
    value(): string;
    value(_: string): this;
    value_exists(): boolean;
    value_valid(): boolean;
    value_disabled(): boolean;
}

Param.prototype.publish("localField", null, "string", "Label");
Param.prototype.publish("source", null, "set", "Activity", function (this: Param) { return this.visualizationIDs(); }, {
    optional: true,
    disable: (w: Param): boolean => w.value_exists(),
    validate: (w: Param): boolean => w.source_disabled() || w.visualizationIDs().indexOf(w.source()) >= 0
});
Param.prototype.publish("remoteField", null, "set", "Source Field", function (this: Param) { return this.sourceFields(); }, {
    optional: true,
    disable: (w: Param): boolean => !w.source_exists() || w.value_exists(),
    validate: (w: Param): boolean => w.remoteField_disabled() || w.sourceFields().indexOf(w.remoteField()) >= 0
});
Param.prototype.publish("value", null, "string", "Static Value", null, {
    optional: true,
    disable: (w: Param): boolean => w.source_exists(),
    validate: (w: Param): boolean => w.value_disabled() || w.value_exists()
});

export interface RestResultRef {
    request(): Param[];
    request(_: Param[]): this;
}

RestResultRef.prototype.publish("request", [], "propertyArray", "Request Fields");
