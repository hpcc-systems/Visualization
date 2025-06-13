import { publish } from "@hpcc-js/common";
import { ResultFilter, IOptions, Result } from "@hpcc-js/comms";
import { Common } from "@hpcc-js/dgrid";
import { hashSum } from "@hpcc-js/util";
import { Store } from "./WUResultStore";

export class WUResult extends Common {

    protected _result: Result;
    protected _localStore: Store;

    constructor() {
        super();
        this.renderHtml(false);
    }

    @publish("", "string", "URL to WsWorkunits")
    baseUrl: { (): string, (_: string): WUResult };
    @publish(undefined, "string", "Workunit ID")
    user: { (): string, (_: string): WUResult };
    @publish(undefined, "string", "User ID")
    password: { (): string, (_: string): WUResult };
    @publish(undefined, "string", "Password")
    wuid: { (): string, (_: string): WUResult };
    @publish(undefined, "string", "Result Name")
    resultName: { (): string, (_: string): WUResult };
    @publish(undefined, "number", "Sequence Number")
    sequence: { (): number, (_: number): WUResult };
    @publish("", "string", "NodeGroup")
    nodeGroup: { (): string, (_: string): WUResult };
    @publish("", "string", "Logical File Name")
    logicalFile: { (): string, (_: string): WUResult };
    @publish({}, "object", "Filter")
    filter: { (): ResultFilter, (_: ResultFilter): WUResult };

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
                    this._localStore = new Store(result, schema, this.renderHtml(), this.filter(), (msg) => {
                        if (this._dgrid) {
                            this._dgrid.noDataMessage = `<span class='dojoxGridNoData'>${msg}</span>`;
                            this._dgrid.refresh();
                        }
                    });
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
