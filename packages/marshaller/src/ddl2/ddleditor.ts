import { JSONEditor } from "@hpcc-js/codemirror";
import { Response, validate2 } from "@hpcc-js/ddl-shim";
import { Table } from "@hpcc-js/dgrid";
import { SplitPanel } from "@hpcc-js/phosphor";

import "../../src/ddl2/ddleditor.css";

export class DDLEditor extends SplitPanel {
    summary: string = "0 Errors";
    _ddlEditor = new JSONEditor().on("changes", (changes) => {
        this.checkSyntax();
    });
    _errorTable = new Table()
        .columns(["dataPath", "keyword", "message", "params"])
        ;

    ddl(): object;
    ddl(_: object): this;
    ddl(_?: object): object | this {
        if (!arguments.length) return this._ddlEditor.json();
        this._ddlEditor.json(_);
        this.checkSyntax();
        return this;
    }

    checkSyntax() {
        try {
            const json = this.ddl();
            try {
                const d: Response = validate2(json);
                if (d.success) {
                    this._errorTable.data([]);
                } else {
                    this._errorTable.data(d.errors.map(error => [error.dataPath, error.keyword, error.message, JSON.stringify(error.params)]));
                }
            } catch (e) {
                this._errorTable.data([["", "Validation Failed", "", ""]]);
            }
        } catch (e) {
            this._errorTable.data([["", "Invalid JSON", "", ""]]);
        }
        if (this._renderCount) {
            this._errorTable.lazyRender();
        }
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this
            .addWidget(this._ddlEditor)
            .addWidget(this._errorTable)
            ;
    }

    update(domNode, _element) {
        super.update(domNode, _element);
    }

}
DDLEditor.prototype._class += " codemirror_DDLEditor";
