import { publish } from "@hpcc-js/common";
import { Result } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { ESPResult } from "./wuresult";

export class LogicalFile extends ESPResult {

    @publish("", "string", "Logical File Name")
    logicalFile: publish<this, string>;

    constructor() {
        super();
    }

    toDDL(): DDL2.ILogicalFile {
        return {
            type: "logicalfile",
            id: this.id(),
            url: this.url(),
            logicalFile: this.logicalFile(),
            fields: []
        };
    }

    static fromDDL(ddl: DDL2.ILogicalFile) {
        return new LogicalFile()
            .id(ddl.id)
            .url(ddl.url)
            .logicalFile(ddl.logicalFile)
            ;
    }

    _createResult(): Result {
        return new Result({ baseUrl: this.url() }, this.logicalFile());
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
