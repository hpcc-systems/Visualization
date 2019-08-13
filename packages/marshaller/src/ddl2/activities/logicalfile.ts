import { publish } from "@hpcc-js/common";
import { Result } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { ElementContainer } from "../model/element";
import { ESPResult } from "./wuresult";

export class LogicalFile extends ESPResult {

    @publish("", "string", "ESP Url (http://x.x.x.x:8010)")
    url: publish<this, string>;
    @publish("", "string", "Logical File Name")
    logicalFile: publish<this, string>;

    constructor(private _ec: ElementContainer) {
        super();
    }

    toDDL(): DDL2.ILogicalFile {
        return {
            type: "logicalfile",
            id: this.id(),
            url: this.url(),
            logicalFile: this.logicalFile(),
            fields: this.responseFields()
        };
    }

    fromDDL(ddl: DDL2.ILogicalFile): this {
        return this
            .id(ddl.id)
            .url(ddl.url)
            .logicalFile(ddl.logicalFile)
            ;
    }

    static fromDDL(ec: ElementContainer, ddl: DDL2.ILogicalFile): LogicalFile {
        return new LogicalFile(ec).fromDDL(ddl);
    }

    _createResult(): Result {
        return new Result({ baseUrl: this.url(), hookSend: this._ec.hookSend() }, this.logicalFile());
    }

    sourceHash(): string {
        return super.hash({
            logicalFile: this.logicalFile()
        });
    }

    hash(more: object): string {
        return super.hash({
            logicalFile: this.logicalFile()
        });
    }

    label(): string {
        return `${this.logicalFile()}`;
    }
}
LogicalFile.prototype._class += " LogicalFile";
