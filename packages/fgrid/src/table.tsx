import { HTMLWidget } from "@hpcc-js/common";
import * as React from "preact/compat";
import { DetailsList, DetailsListLayoutMode, initializeIcons, IColumn, IDetailsHeaderProps, IObjectWithKey, Selection, SelectionMode, TooltipHost, IDetailsListStyles, IRenderFunction, IDetailsColumnRenderTooltipProps, ConstrainMode } from "@fluentui/react";

initializeIcons();

export type QuerySortItem = { attribute: string, descending: boolean };
function copyAndSort<T>(items: T[], attribute: string, descending?: boolean): T[] {
    const key = attribute as keyof T;
    return [...items].sort((a: T, b: T) => {
        if (a[key] < b[key]) {
            return descending ? 1 : -1;
        } else if (a[key] > b[key]) {
            return descending ? -1 : 1;
        }
        return 0;
    });
}

function onRenderDetailsHeader(props: IDetailsHeaderProps, defaultRender?: any) {
    if (!props) {
        return null;
    }

    const onRenderColumnHeaderTooltip: IRenderFunction<IDetailsColumnRenderTooltipProps> = tooltipHostProps => (
        <TooltipHost {...tooltipHostProps} content={tooltipHostProps?.column?.data?.headerTooltip ?? ""} />
    );

    return defaultRender({
        ...props,
        onRenderColumnHeaderTooltip,
        styles: { root: { paddingTop: 1 } }
    });
}

interface ReactTableProps {
    columns: string[];
    data: Array<string | number>[];
    height: string;
    sort?: QuerySortItem,
    onRowClick?: (row: IObjectWithKey) => void;
}

const ReactTable: React.FunctionComponent<ReactTableProps> = ({
    columns,
    data,
    height,
    sort,
    onRowClick = row => { }
}) => {
    const [listColumns, setListColumns] = React.useState<IColumn[]>([]);
    const [sorted, setSorted] = React.useState<QuerySortItem>(sort);
    const [items, setItems] = React.useState<any[]>([]);

    //  Styles
    const gridStyles: Partial<IDetailsListStyles> = React.useMemo(() => {
        return {
            root: {
                overflowX: "scroll",
                selectors: {
                    "& [role=grid]": {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        height,
                    },
                },
            },
            headerWrapper: {
                flex: "0 0 auto",
            },
            contentWrapper: {
                flex: "1 1 auto",
                overflowY: "auto",
                overflowX: "hidden",
            },
        };
    }, [height]);

    //  Columns  ---
    React.useEffect(() => {
        const attr = sorted?.attribute;
        const desc = sorted?.descending;

        setListColumns(columns.map(column => ({
            key: column,
            name: column,
            fieldName: column,
            isResizable: true,
            isSorted: column === attr,
            isSortedDescending: column === attr && desc,
            minWidth: 100,
        })));
    }, [columns, sorted?.attribute, sorted?.descending]);

    const onColumnClick = React.useCallback((_event, column: IColumn) => {
        let sorted = column.isSorted;
        let isSortedDescending: boolean = column.isSortedDescending;
        if (!sorted) {
            sorted = true;
            isSortedDescending = false;
        } else if (!isSortedDescending) {
            isSortedDescending = true;
        } else {
            sorted = false;
            isSortedDescending = false;
        }
        setSorted({
            attribute: sorted ? column.key : undefined,
            descending: sorted ? isSortedDescending : false
        });
        setItems(copyAndSort(items, sorted ? column.key : "key", sorted ? isSortedDescending : false));
    }, [items]);

    //  Rows  ---
    React.useEffect(() => {
        let items = data.map((row, index) => {
            const retVal = {
                key: index
            };
            columns.forEach((column, index) => {
                retVal[column] = row[index];
            });
            return retVal;
        });
        if (sort?.attribute) {
            items = copyAndSort(items, sort.attribute, sort.descending);
        }
        setItems(items);
        setSorted(sort);
    }, [columns, data, sort]);

    const selectionHandler = React.useMemo(() => {
        return new Selection({
            onSelectionChanged: () => {
                onRowClick(selectionHandler.getSelection()[0]);
            }
        });
    }, [onRowClick]);

    return <DetailsList
        columns={listColumns}
        items={items}
        compact={true}
        layoutMode={DetailsListLayoutMode.justified}
        constrainMode={ConstrainMode.unconstrained}
        selectionMode={SelectionMode.single}
        selection={selectionHandler}
        selectionPreservedOnEmptyClick
        onColumnHeaderClick={onColumnClick}
        onRenderDetailsHeader={onRenderDetailsHeader}
        styles={gridStyles}
    />;
};

export class Table extends HTMLWidget {

    protected _div;

    constructor() {
        super();
    }

    _prevRow;
    private renderTable() {
        return <ReactTable columns={this.columns()} data={this.data()} height={`${this.height() - 18}px`} onRowClick={row => {
            if (this._prevRow && JSON.stringify(this._prevRow) !== JSON.stringify(row)) {
                this.click(this._prevRow, "", false);
            }
            if (row) {
                this.click(row, "", true);
            }
            this._prevRow = row;
        }} />;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._div = element
            .append("div")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._div.style("width", this.width() + "px");
        this._div.style("height", this.height() + "px");
        React.render(this.renderTable(), this._div.node());
    }

    exit(domNode, element) {
        React.unmountComponentAtNode(this._div.node());
        this._div.remove();
        super.exit(domNode, element);
    }

    //  Events  ---
    click(row, col, sel) {
    }
}
Table.prototype._class += " fgrid_Table";

export interface Table {
    columnWidth(): "auto" | "none";
    columnWidth(_: "auto" | "none"): this;
}

Table.prototype.publish("columnWidth", "auto", "set", "Default column width", ["auto", "none"]);
