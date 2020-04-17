import { hpccRequire, placeholder } from "./util";

export async function* table(props: { height?: number, [key: string]: any } = {}) {
    const hpccDGrid = await hpccRequire("@hpcc-js/dgrid");

    const { div, widget } = placeholder(new hpccDGrid.Table(), props);

    widget
        .on("click", (row, col, sel, ext) => {
            if (widget.mulitSelect()) {
                div.value = ext.selection.map(row => row.__lparam ? row.__lparam : row);
            } else {
                div.value = sel ? row.__lparam ? row.__lparam : row : null;
            }
            div.dispatchEvent(new CustomEvent("input"));
        })
        ;

    yield div;

    widget
        .target(div)
        .render()
        ;
}
