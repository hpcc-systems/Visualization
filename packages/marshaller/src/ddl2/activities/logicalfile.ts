import { Result } from "@hpcc-js/comms";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { ElementContainer } from "../model/element.ts";
import { ESPResult } from "./wuresult.ts";

export class LogicalFile extends ESPResult {

    constructor(_ec: ElementContainer) {
        super(_ec);
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

    fromDDL(ddl: DDL2.ILogicalFile, skipID = false): this {
        (skipID ? this : this.id(ddl.id))
            .url(ddl.url)
            .logicalFile(ddl.logicalFile)
            ;
        return this;
    }

    static fromDDL(ec: ElementContainer, ddl: DDL2.ILogicalFile, skipID = false): LogicalFile {
        return new LogicalFile(ec).fromDDL(ddl, skipID);
    }

    _createResult(): Result {
        return Result.attachLogicalFile({ baseUrl: this.url(), hookSend: this._ec.hookSend() }, this.nodeGroup(), this.logicalFile());
    }

    sourceHash(): string {
        return super.hash({
            logicalFile: this.logicalFile()
        });
    }

    hash(more: object): string {
        return super.hash({
            ddl: this.toDDL()
        });
    }

    label(): string {
        return `${this.logicalFile()}`;
    }
}
LogicalFile.prototype._class += " LogicalFile";

export interface LogicalFile {
    url(): string;
    url(_: string): this;
    nodeGroup(): string;
    nodeGroup(_: string): this;
    logicalFile(): string;
    logicalFile(_: string): this;
}
LogicalFile.prototype.publish("url", "", "string", "ESP Url (http://x.x.x.x:8010)");
LogicalFile.prototype.publish("nodeGroup", "", "string", "Node Group");
LogicalFile.prototype.publish("logicalFile", "", "string", "Logical File Name");