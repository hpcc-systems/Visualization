import { Response, validate } from "@hpcc-js/ddl";
import { Table } from "../dgrid/Table";
import { JSXWidget } from "../html/JSXWidget";
import { VizInstance } from "../html/VizInstance";
import { JSONEditor } from "./JSONEditor";

import "./DDLEditor.css";

export class DDLEditor extends JSXWidget {
    summary: string = "0 Errors";
    _ddlEditor = new JSONEditor().on("changes", (changes) => {
        this.checkSyntax();
    });
    _errorTable = new Table()
        .columns(["dataPath", "keyword", "message", "params"])
    ;
    private jsx = <div>
        <VizInstance instance={this._ddlEditor} />
        <VizInstance instance={this._errorTable} />
    </div >;

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
                const d: Response = validate(json);
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
    }

    update(domNode, _element) {
        super.update(domNode, _element);
        this._ddlEditor.size({ width: this.width(), height: this.height() * 6 / 9 });
        this._errorTable.size({ width: this.width(), height: this.height() * 3 / 9 });
        this.jsxRender(this.jsx, domNode);
    }

}
DDLEditor.prototype._class += " codemirror_DDLEditor";
