import { ResultFilter, IOptions, Result } from "@hpcc-js/comms";
import { Common } from "@hpcc-js/dgrid";
import { hashSum } from "@hpcc-js/util";
import { Store } from "./WUResultStore.ts";

export class WUResult extends Common {

    protected _result: Result;
    protected _localStore: Store;

    constructor() {
        super();
        this.renderHtml(false);
    }

    hashSum(opts: any = {}) {
        return hashSum({
            baseUrl: this.baseUrl(),
            wuid: this.wuid(),
            resultName: this.resultName(),
            sequence: this.sequence(),
            nodeGroup: this.nodeGroup(),
            logicalFile: this.logicalFile(),
            userID: this.user(),
            password: this.password(),
            ...opts
        });
    }

    protected _prevResultHash: string;
    calcResult(): Result | null {
        const resultHash = this.hashSum();
        if (this._prevResultHash !== resultHash) {
            this._prevResultHash = resultHash;

            const opts: IOptions = {
                baseUrl: this.baseUrl(),
                userID: this.user(),
                password: this.password()
            };
            if (this.wuid() && this.resultName()) {
                this._result = Result.attach(opts, this.wuid(), this.resultName());
            } else if (this.wuid() && this.sequence() !== undefined) {
                this._result = Result.attach(opts, this.wuid(), this.sequence());
            } else if (this.logicalFile() && this.nodeGroup()) {
                this._result = Result.attachLogicalFile(opts, this.nodeGroup(), this.logicalFile());
            } else if (this.logicalFile()) {
                this._result = Result.attachLogicalFile(opts, "", this.logicalFile());
            }
        }
        return this._result;
    }

    fetch(row, count, abortController = new AbortController()): Promise<object[]> {
        const result = this.calcResult();
        if (result) {
            return result.fetchRows(row, count, false, {}, abortController.signal);
        }
        return Promise.resolve([]);
    }

    protected _prevStoreHash: string;
    protected _prevQueryHash: string;
    update(domNode, element) {
        super.update(domNode, element);
        const storeHash = this.hashSum({
            renderHtml: this.renderHtml(),
            filter: this.filter()
        });
        if (this._prevStoreHash !== storeHash) {
            this._prevStoreHash = storeHash;
            const result = this.calcResult();
            if (result) {
                result.fetchXMLSchema().then(schema => {
                    this._localStore = new Store(result, schema, this.renderHtml(), this.filter());
                    this._dgrid?.set("columns", this._localStore.columns());
                    this._dgrid?.set("collection", this._localStore);
                });
            }
        }
    }

    click(row, col, sel) {
    }
}
WUResult.prototype._class += " eclwatch_WUResult";

export interface WUResult {
    baseUrl(): string;
    baseUrl(_: string): this;
    user(): string;
    user(_: string): this;
    password(): string;
    password(_: string): this;
    wuid(): string;
    wuid(_: string): this;
    resultName(): string;
    resultName(_: string): this;
    sequence(): number;
    sequence(_: number): this;
    nodeGroup(): string;
    nodeGroup(_: string): this;
    logicalFile(): string;
    logicalFile(_: string): this;
    filter(): ResultFilter;
    filter(_: ResultFilter): this;
}

WUResult.prototype.publish("baseUrl", "", "string", "URL to WsWorkunits");
WUResult.prototype.publish("user", "", "string", "User ID");
WUResult.prototype.publish("password", "", "string", "Password");
WUResult.prototype.publish("wuid", "", "string", "Workunit ID");
WUResult.prototype.publish("resultName", "", "string", "Result Name");
WUResult.prototype.publish("sequence", undefined, "number", "Sequence Number");
WUResult.prototype.publish("nodeGroup", "", "string", "NodeGroup");
WUResult.prototype.publish("logicalFile", "", "string", "Logical File Name");
WUResult.prototype.publish("filter", {}, "object", "Filter");
