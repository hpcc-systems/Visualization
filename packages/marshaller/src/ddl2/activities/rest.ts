import { publish } from "@hpcc-js/common";
import { createConnection } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { debounce, hashSum } from "@hpcc-js/util";
import { rowToFields } from "./databomb";
import { Datasource } from "./datasource";
import { FormField } from "./form";

export class Rest extends Datasource {

    @publish("http://192.168.0.10:8080/", "string", "Base URL")
    url: publish<this, string>;
    @publish("some/action", "string", "REST action")
    action: publish<this, string>;
    @publish("get", "set", "Request mode", ["get", "post"])
    mode: publish<this, "get" | "post">;
    @publish(true, "boolean", "Encode Request")
    encodeRequest: publish<this, boolean>;
    @publish("", "string", "Response field")
    responseField: publish<this, string>;
    @publish([], "propertyArray", "Multi Fields", null, { autoExpand: FormField })
    restFields: publish<this, FormField[]>;

    constructor() {
        super();
    }

    toDDL(): DDL2.IRestService {
        return {
            type: "rest",
            id: this.id(),
            url: this.url(),
            action: this.action(),
            mode: this.mode(),
            encodeRequest: this.encodeRequest(),
            responseField: this.responseField(),
            inputs: this.validRestFields().map(f => f.toDDL())
        };
    }

    fromDDL(ddl: DDL2.IRestService): this {
        const retVal = this
            .id(ddl.id)
            .url(ddl.url)
            .action(ddl.action)
            .mode(ddl.mode || "get")
            .encodeRequest(ddl.encodeRequest === false ? false : true)
            .responseField(ddl.responseField)
            .restFields(ddl.inputs.map(FormField.fromDDL))
            ;
        return retVal;
    }

    static fromDDL(ddl: DDL2.IRestService): Rest {
        return new Rest().fromDDL(ddl);
    }

    hash(more: object = {}): string {
        return hashSum({
            ddl: this.toDDL(),
            ...more
        });
    }

    validRestFields(): FormField[] {
        return this.restFields().filter(f => f.valid());
    }

    restGet() {
        const conn = createConnection({ baseUrl: this.url(), type: this.mode(), encodeRequest: this.encodeRequest() });
        const request = {};
        this.validRestFields().forEach(f => {
            request[f.fieldID()] = f.calcValue();
        });
        return conn.send(this.action(), request).then(response => {
            const resultFields = (this.responseField() || "").split(".");
            for (const field of resultFields) {
                response = (response || {})[field];
            }
            return response;
        });
    }

    private _jsonData = [];
    private _prevExecHash: string;
    private _exec = debounce((): Promise<void> => {
        if (this._prevExecHash !== this.hash()) {
            this._prevExecHash = this.hash();
            return super.exec().then(() => {
                return this.restGet();
            }).then(response => {
                this._jsonData = this.fixInt64(response);
            }).catch(e => {
                this._jsonData = [];
            });
        } else {
            return Promise.resolve();
        }
    });

    private jsonDataFields(): DDL2.IField[] {
        if (this._jsonData.length === 0) return [];
        return rowToFields(this._jsonData[0], this._jsonData);
    }

    computeFields(inFields: ReadonlyArray<DDL2.IField>): () => ReadonlyArray<DDL2.IField> {
        return () => this.jsonDataFields();
    }

    computeData(): ReadonlyArray<object> {
        return this._jsonData;
    }

    exec(): Promise<void> {
        return this._exec();
    }
}
Rest.prototype._class += " Rest";
