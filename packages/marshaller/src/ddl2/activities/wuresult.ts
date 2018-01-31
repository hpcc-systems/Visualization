import { publish } from "@hpcc-js/common";
import { Result, XSDXMLNode } from "@hpcc-js/comms";
import { IField } from "@hpcc-js/dgrid";
import { debounce, hashSum } from "@hpcc-js/util";
import { Activity, schemaRow2IField } from "./activity";

export abstract class ESPResult extends Activity {
    protected _result: Result;
    protected _schema: XSDXMLNode[] = [];
    protected _total: number;
    private _data: any[];

    @publish("", "string", "ESP Url (http://x.x.x.x:8010)")
    url: publish<this, string>;
    @publish(10, "number", "Number of samples")
    samples: publish<this, number>;
    @publish(100, "number", "Sample size")
    sampleSize: publish<this, number>;

    constructor() {
        super();
    }

    hash(more: object = {}): string {
        return hashSum({
            url: this.url(),
            samples: this.samples(),
            sampleSize: this.sampleSize(),
            ...more
        });
    }

    abstract _createResult(): Result;

    _prevHash: string;
    refreshMetaPromise: Promise<void>;
    refreshMeta(): Promise<void> {
        if (this._prevHash !== this.hash()) {
            this._prevHash = this.hash();
            delete this.refreshMetaPromise;
        }
        if (!this.refreshMetaPromise) {
            this.refreshMetaPromise = super.refreshMeta().then(() => {
                this._result = this._createResult();
                return this._result.refresh();
            }).then(result => {
                this._total = result.Total;
                this._schema = result.fields();
            }).catch(e => {
                this._total = 0;
                this._schema = [];
            });
        }
        return this.refreshMetaPromise;
    }

    outFields(): IField[] {
        if (this._result) {
            const responseSchema = this._result.fields();
            return responseSchema.map(schemaRow2IField);
        }
        return [];
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

    pullData(): object[] {
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

    private _fetch = debounce((from: number, count: number): Promise<any[]> => {
        return this._result
            .fetchRows(from, count)
            .catch(e => {
                return [];
            });
    });

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
ESPResult.prototype._class += " Filters";

export class WUResult extends ESPResult {

    @publish("", "string", "Workunit ID")
    wuid: publish<this, string>;
    @publish("", "string", "Result Name")
    resultName: publish<this, string>;

    constructor() {
        super();
    }

    _createResult(): Result {
        return new Result({ baseUrl: this.url() }, this.wuid(), this.resultName());
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

    fullUrl(_: string): this {
        // "http://10.173.147.1:8010/WsWorkunits/WUResult.json?Wuid=W20170905-105711&ResultName=pro2_Comp_Ins122_DDL"
        const parts = _.split("/WsWorkunits/WUResult.json?");
        if (parts.length < 2) throw new Error(`Invalid roxie URL:  ${_}`);
        this.url(parts[0]);
        const wuParts = parts[1].split("&");
        for (const arg of wuParts) {
            const argParts = arg.split("=");
            if (argParts.length >= 2) {
                switch (argParts[0]) {
                    case "Wuid":
                        this.wuid(argParts[1]);
                        break;
                    case "ResultName":
                        this.resultName(argParts[1]);
                        break;
                }
            }
        }
        return this;
    }
}
WUResult.prototype._class += " WUResult";
