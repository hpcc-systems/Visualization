import { publish } from "@hpcc-js/common";
import { Result, Workunit, XSDXMLNode } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { AsyncOrderedQueue, debounce, hashSum } from "@hpcc-js/util";
import { schemaRow2IField } from "./activity";
import { Datasource, DatasourceRef } from "./datasource";

export abstract class ESPResult extends Datasource {
    protected _result: Result;
    protected _schema: XSDXMLNode[] = [];
    protected _meta: DDL2.IField[] = [];
    protected _total: number;
    private _data: ReadonlyArray<object> = [];

    @publish(10, "number", "Number of samples")
    samples: publish<this, number>;
    @publish(100, "number", "Sample size")
    sampleSize: publish<this, number>;

    constructor() {
        super();
    }

    hash(more: object = {}): string {
        return hashSum({
            samples: this.samples(),
            sampleSize: this.sampleSize(),
            ...more
        });
    }

    abstract _createResult(): Result;

    _prevMetaHash: string;
    refreshMetaPromise: Promise<void>;
    refreshMeta(): Promise<void> {
        if (this._prevMetaHash !== this.hash()) {
            this._prevMetaHash = this.hash();
            delete this.refreshMetaPromise;
        }
        if (!this.refreshMetaPromise) {
            this.refreshMetaPromise = super.refreshMeta().then(() => {
                this._result = this._createResult();
                if (this._result) {
                    return this._result.refresh();
                }
                throw new Error("No valid result");
            }).then(result => {
                this._total = result.Total;
                this._schema = result.fields();
                this._meta = this._schema.map(schemaRow2IField);
            }).catch(e => {
                this._total = 0;
                this._schema = [];
                this._meta = [];
            });
        }
        return this.refreshMetaPromise;
    }

    responseFields(): DDL2.IField[];
    responseFields(_: DDL2.IField[]): this;
    responseFields(_?: DDL2.IField[]): ReadonlyArray<DDL2.IField> | this {
        if (!arguments.length) return this._meta;
        this._meta = _;
        this.refreshMeta();
        return this;
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        return () => this.responseFields();
    }

    exec(): Promise<void> {
        return this._exec();
    }

    private _prevExecHash: string;
    private _exec = debounce((): Promise<void> => {
        if (this._prevExecHash !== this.hash()) {
            this._prevExecHash = this.hash();
            return super.exec().then(() => {
                return this.sample();
            }).then(response => {
                this._data = this.fixInt64(response);
            }).catch(e => {
                this._data = [];
            });
        } else {
            return Promise.resolve();
        }
    });

    inData(): ReadonlyArray<object> {
        return this._data;
    }

    computeData(): ReadonlyArray<object> {
        return this._data;
    }

    total(): number {
        return this._total;
    }

    //  ---
    async fetch(from: number, count: number): Promise<any[]> {
        if (count > this.samples() * this.sampleSize()) {
            return this.sample();
        }
        return this._fetch(from, count);
    }

    private _fetchQ = new AsyncOrderedQueue();
    private _fetch(from: number, count: number): Promise<any[]> {
        return this._fetchQ.push(
            this._result ? this._result
                .fetchRows(from, count)
                .catch(e => {
                    return [];
                }) :
                Promise.resolve([])
        );
    }

    private sample = debounce((samples: number = this.samples(), sampleSize: number = this.sampleSize()): Promise<any[]> => {
        const pages: Array<Promise<any[]>> = [];
        if (samples * sampleSize >= this.total()) {
            pages.push(this._fetch(0, this.total()));
        } else {
            const lastPage = this.total() - sampleSize;
            for (let i = 0; i < samples; ++i) {
                pages.push(this._fetch(Math.floor(i * lastPage / sampleSize), sampleSize));
            }
        }
        return Promise.all(pages).then(responses => {
            let retVal2: any[] = [];
            for (const response of responses) {
                retVal2 = retVal2.concat(response);
            }
            return retVal2;
        });
    });
}
ESPResult.prototype._class += " ESPResult";

export class WUResult extends ESPResult {

    @publish(null, "widget", "Workunit")
    _wu: WU;
    wu(): WU;
    wu(_: WU): this;
    wu(_?: WU): this | WU {
        if (!arguments.length) return this._wu;
        this._wu = _;
        this._wu.refreshMeta();
        return this;
    }
    @publish("", "set", "Result Name", function (this: WUResult): string[] {
        return this._wu !== undefined ? this._wu.resultNames() : [];
    })
    resultName: publish<this, string>;

    constructor() {
        super();
        this._wu = new WU();
    }

    url(): string {
        return this._wu.url();
    }

    wuid(): string {
        return this._wu.wuid();
    }

    toDDL(): DDL2.IWUResult {
        return {
            type: "wuresult",
            id: this.id(),
            url: this._wu.url(),
            wuid: this.wuid(),
            outputs: {}
        };
    }

    static fromDDL(ddl: DDL2.IWUResult, wu: WU, resultName: string) {
        return new WUResult()
            .wu(wu)
            .resultName(resultName)
            ;
    }

    _createResult(): Result {
        if (this._wu.url() && this.wuid() && this.resultName()) {
            return new Result({ baseUrl: this._wu.url() }, this.wuid(), this.resultName());
        }
        return undefined;
    }

    sourceHash(): string {
        return super.hash({
            wuid: this.wuid()
        });
    }

    hash(more: object): string {
        return super.hash({
            wuid: this.wuid(),
            resultName: this.resultName()
        });
    }

    label(): string {
        return `${this.wuid()}\n${this.resultName()}`;
    }
}
WUResult.prototype._class += " WUResult";

export class WU extends Datasource {
    @publish("", "string", "ESP Url (http://x.x.x.x:8010)")
    _url: string;
    url(): string;
    url(_: string): this;
    url(_?: string): this | string {
        if (!arguments.length) return this._url;
        this._url = _;
        this.refreshMeta();
        return this;
    }

    @publish("", "string", "Workunit ID")
    _wuid: string;
    wuid(): string;
    wuid(_: string): this;
    wuid(_?: string): this | string {
        if (!arguments.length) return this._wuid;
        this._wuid = _;
        this.refreshMeta();
        return this;
    }

    protected _workunit: Workunit;
    protected _outputs: { [id: string]: WUResult } = {};

    constructor() {
        super();
    }

    toDDL(): DDL2.IWUResult {
        const ddlOutputs: DDL2.OutputDict = {};
        for (const resultName in this._outputs) {
            ddlOutputs[resultName] = {
                fields: this._outputs[resultName].responseFields()
            };
        }
        return {
            type: "wuresult",
            id: this.id(),
            url: this.url(),
            wuid: this.wuid(),
            outputs: ddlOutputs
        };
    }

    static fromDDL(ddl: DDL2.IWUResult) {
        const retVal = new WU()
            .id(ddl.id)
            .url(ddl.url)
            .wuid(ddl.wuid)
            ;
        const wuResults: { [id: string]: WUResult } = {};
        for (const resultName in ddl.outputs) {
            wuResults[resultName] = WUResult.fromDDL(ddl, retVal, resultName);
        }
        retVal._outputs = wuResults;
        return retVal;
    }

    hash(): string {
        return hashSum({
            url: this.url(),
            wuid: this.wuid()
        });
    }

    label(): string {
        return this.wuid();
    }

    outputs(): WUResult[] {
        const retVal = [];
        for (const resultName in this._outputs) {
            retVal.push(this._outputs[resultName]);
        }
        return retVal;
    }

    output(id: string): WUResult {
        return this._outputs[id];
    }

    private _prevSourceHash: string;
    private refreshMetaPromise: Promise<void>;
    private _resultNames: string[] = [];
    refreshMeta(): Promise<void> {
        if (!this.url() || !this.wuid()) {
            return Promise.resolve();
        }
        if (this._prevSourceHash !== this.hash()) {
            this._prevSourceHash = this.hash();
            delete this.refreshMetaPromise;
        }
        if (!this.refreshMetaPromise) {
            this.refreshMetaPromise = super.refreshMeta().then(() => {
                this._workunit = Workunit.attach({ baseUrl: this.url() }, this.wuid());
                return this._workunit.fetchResults();
            }).then(results => {
                this._resultNames = results.map(r => r.Name);
            }).catch(e => {
            });
        }
        return this.refreshMetaPromise;
    }

    resultNames(): string[] {
        return this._resultNames;
    }
}
WU.prototype._class += " WU";

export class WUResultRef extends DatasourceRef {

    datasource(): WUResult;
    datasource(_: WUResult): this;
    datasource(_?: WUResult): this | WUResult {
        return super.datasource.apply(this, arguments);
    }

    resultName(): string;
    resultName(_: string): this;
    resultName(_?: string): string | this {
        if (!arguments.length) return this.datasource().resultName();
        this.datasource().resultName(_);
        return this;
    }
}
WUResultRef.prototype._class += " WUResultRef";
