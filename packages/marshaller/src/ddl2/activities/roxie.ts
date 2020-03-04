import { publish } from "@hpcc-js/common";
import { Query as CommsQuery } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { AsyncOrderedQueue, compare, hashSum } from "@hpcc-js/util";
import { ElementContainer } from "../model/element";
import { IActivityError, ReferencedFields } from "./activity";
import { Datasource, DatasourceRef } from "./datasource";
import { Param } from "./rest";

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

function isHipieRequest(requestField: string): boolean {
    return requestField.indexOf("_changed") === requestField.length - 8;
}

function isHipieResponse(resultName: string): boolean {
    return (resultName.indexOf("_changed") === resultName.length - 8) ||
        (["HIPIE_DDL", "HIPIE_DDLGLOBALS", "hipieversion"].indexOf(resultName) >= 0)
        ;
}

export class RoxieService extends Datasource {
    private _query: CommsQuery;
    private _requestFields: DDL2.IField[];
    private _responseFields: { [outputID: string]: DDL2.IField[] } = {};
    private _type: "roxie" | "hipie" = "roxie";

    @publish("", "string", "ESP Url (http://x.x.x.x:8002)")
    url: publish<this, string>;
    @publish("", "string", "Query Set")
    querySet: publish<this, string>;
    @publish("", "string", "Query ID")
    queryID: publish<this, string>;
    @publish(false, "boolean", "Ignore provided DDL request")
    ignoreHipieRequest: publish<this, boolean>;
    @publish(false, "boolean", "Ignore provided DDL response")
    ignoreHipieResponse: publish<this, boolean>;

    constructor(private _ec: ElementContainer) {
        super();
    }

    toDDL(): DDL2.IRoxieService | DDL2.IHipieService {
        return {
            type: this._type,
            id: this.id(),
            url: this.url(),
            querySet: this.querySet(),
            queryID: this.queryID(),
            inputs: this.requestFields(),
            outputs: this.outputDDL()
        };
    }

    fromDDL(ddl: DDL2.IRoxieService | DDL2.IHipieService, skipID = false): this {
        this._type = ddl.type;
        (skipID ? this : this.id(ddl.id))
            .url(ddl.url)
            .querySet(ddl.querySet)
            .queryID(ddl.queryID)
            ;
        if (ddl.inputs && ddl.inputs.length) {
            this.requestFields(ddl.inputs);
        }
        for (const key in ddl.outputs) {
            this.responseFields(key, ddl.outputs[key].fields);
        }
        return this;
    }

    static fromDDL(ec: ElementContainer, ddl: DDL2.IRoxieService | DDL2.IHipieService, skipID = false): RoxieService {
        return new RoxieService(ec).fromDDL(ddl, skipID);
    }

    hash(more: object = {}): string {
        return hashSum({
            url: this.url(),
            querySet: this.querySet(),
            queryId: this.queryID(),
            ignoreHipieRequest: this.ignoreHipieRequest(),
            ignoreHipieResponse: this.ignoreHipieResponse(),
            ...more
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
            const hasMeta = !!this._requestFields;
            this.refreshMetaPromise = new Promise<CommsQuery>((resolve, reject) => {
                const query = CommsQuery.attach({ baseUrl: this.url(), hookSend: this._ec.hookSend() }, this.querySet(), this.queryID());
                if (!hasMeta || this.ignoreHipieRequest() || this.ignoreHipieResponse()) {
                    resolve(query.refresh());
                }
                resolve(query);
            }).then((query) => {
                this._query = query;
                if (!hasMeta || this.ignoreHipieRequest()) {
                    this._requestFields = query.requestFields().filter(row => this._type === "roxie" || !isHipieRequest(row.id));
                }
                if (!hasMeta || this.ignoreHipieResponse()) {
                    query.resultNames().filter(resultName => this._type === "roxie" || !isHipieResponse(resultName)).forEach(resultName => {
                        this._responseFields[resultName] = query.resultFields(resultName);
                    });
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
RoxieService.prototype._class += " RoxieService";

export class RoxieResult extends Datasource {

    @publish(null, "widget", "Roxie service")
    _service: RoxieService = new RoxieService(this._ec);
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

    constructor(private _ec: ElementContainer) {
        super();
    }

    toDDL(): DDL2.IRoxieService | DDL2.IHipieService {
        return this.service().toDDL();
    }

    fromDDL(ddl: DDL2.IRoxieService): this {
        this.service().fromDDL(ddl);
        return this;
    }

    static fromDDL(ec: ElementContainer, rs: RoxieService, resultName: string): RoxieResult {
        return new RoxieResult(ec)
            .id(`${rs.id()}_${resultName}`)
            .service(rs)
            .resultName(resultName)
            ;
    }

    serviceID(): string {
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

    serviceID(): string {
        return this.datasource().serviceID();
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
            params: this.request().map(param => param.hash()),
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
            localFieldIDs.push(param.localField());
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
            const diffs = compare(oldParams.map(p => p.localField()), this.datasource().requestFields().map(ff => ff.id));
            const newParams = oldParams.filter(op => diffs.update.indexOf(op.localField()) >= 0);
            this.request(newParams.concat(diffs.enter.map(label => new Param(this._ec).localField(label))));
        });
    }

    updatedBy(): string[] {
        return this.validParams().map(param => param.source());
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        return () => this.datasource().responseFields();
    }

    formatRequest(): { [key: string]: any } {
        const request: { [key: string]: any } = {};
        let hasRequest = false;
        const fields = this.datasource().requestFields();
        for (const param of this.validParams()) {
            const _value = param.calcValue();
            const field = fields.filter(row => row.id === param.localField())[0];
            let value;
            if (field.type === "set") {
                value = {
                    Item: _value
                };
            } else {
                value = _value[0];
            }
            if (value !== undefined) {
                request[param.localField()] = value;
            }
            hasRequest = true;
        }
        if (!hasRequest) {
            request.refresh = true;
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
                this._prevRequestPromise = this.datasource().submit(request).then((response: { [key: string]: any }) => {
                    const resultName = this.datasource().resultName();
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
        this.datasource().service().url(info.url);
        this.datasource().service().querySet(info.querySet);
        this.datasource().service().queryID(info.queryID);
        return this;
    }

    formatRequest(): { [key: string]: any } {
        const _request = super.formatRequest();
        const request: { [key: string]: any } = {};
        for (const key in _request) {
            request[key] = _request[key];
            request[`${key}_changed`] = true;
        }
        return request;
    }
}
HipieResultRef.prototype._class += " HipieResultRef";
