import { Result } from "@hpcc-js/comms";
import { View } from "./view";
import { ESPResult } from "./wuresult";

export class LogicalFile extends ESPResult {

    constructor(owner: View) {
        super(owner);
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
export interface LogicalFile {
    logicalFile(): string;
    logicalFile(_: string): this;
}
LogicalFile.prototype.publish("logicalFile", "", "string", "Logical File Name");
