import { ColumnSetGrid } from "./dgrid-shim.ts";
import { type ColumnType } from "./RowFormatter.ts";
import { Table } from "./Table.ts";

export class ColumnSetTable extends Table {

    constructor() {
        super();
    }

    protected _buildColumnSets(): ColumnType[][][] {
        const sets = this.columnSets();
        const colNames = this.columns();
        const used = new Set<string>();
        const result: ColumnType[][][] = [];

        const lookup = (name: string): ColumnType | undefined => {
            const idx = colNames.indexOf(name);
            if (idx < 0) return undefined;
            const col = this._columns[idx];
            if (!col || col.hidden) return undefined;
            return col;
        };

        if (sets && sets.length) {
            for (const set of sets) {
                const cols: ColumnType[] = [];
                for (const name of set) {
                    const col = lookup(name);
                    if (col) {
                        cols.push(col);
                        used.add(name);
                    }
                }
                if (cols.length) {
                    result.push([cols]);
                }
            }
        }

        if (this.autoColumnSet()) {
            const remaining: ColumnType[] = [];
            for (const name of colNames) {
                if (!used.has(name)) {
                    const col = lookup(name);
                    if (col) remaining.push(col);
                }
            }
            if (remaining.length) {
                result.push([remaining]);
            }
        }

        if (!result.length && this._columns.length) {
            result.push([this._columns.filter(c => !c.hidden)]);
        }

        return result;
    }

    protected _gridColumnsConfig(): object {
        return { columnSets: this._buildColumnSets() };
    }

    protected _createGrid(opts: any, node: HTMLElement): any {
        return new ColumnSetGrid({ ...opts }, node);
    }

    protected _applyColumnsToGrid() {
        const sets = this._buildColumnSets();
        this._dgrid.set("columnSets", sets);
        for (let i = 0; i < sets.length - 1; i++) {
            const setWidth = sets[i][0].reduce((total: number, col: ColumnType) => total + (col.width ?? 0), 0);
            if (setWidth > 0) {
                (this._dgrid as any).styleColumnSet(i, `width: ${setWidth}px;`);
            }
        }
        this._dgrid.resize();
    }

    dblclickColResize(column: string, dgridColumn: any): void {
        this.guessWidth([dgridColumn], this.data());
        this._dgrid.applyWidth(dgridColumn.id, dgridColumn.width + "px");
        this._dgrid.resize();
    }
}
ColumnSetTable.prototype._class += " dgrid_ColumnSetTable";

export interface ColumnSetTable {
    columnSets(): string[][];
    columnSets(_: string[][]): this;
    autoColumnSet(): boolean;
    autoColumnSet(_: boolean): this;
}

ColumnSetTable.prototype.publish("columnSets", [], "array", "Column sets - array of arrays of column names");
ColumnSetTable.prototype.publish("autoColumnSet", true, "boolean", "Append columns not referenced by columnSets() into a trailing column-set");
