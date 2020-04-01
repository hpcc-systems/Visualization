import * as  hpccDGrid from "@hpcc-js/dgrid";
import { div } from "./util";

export async function* table(props: { height?: number, [key: string]: any } = {}) {
    // const hpccDGrid = await import("@hpcc-js/dgrid");
    const table = new hpccDGrid.Table()
        .sortable(true)
        .on("click", (row, col, sel) => {
            _div.notify(sel ? row && row.__lparam ? row && row.__lparam : row : null);
        })
        ;

    const _div = div(table, props);

    yield _div;

    _div.widget
        .target(_div)
        .lazyRender()
        ;
}
