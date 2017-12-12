import { publish } from "@hpcc-js/common";
import { Result } from "@hpcc-js/comms";
import { ESPResult } from "./wuresult";

export class LogicalFile extends ESPResult {

    @publish("", "string", "Logical File Name")
    logicalFile: publish<this, string>;

    constructor() {
        super();
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
