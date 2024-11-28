import React from "preact/compat";
import { Widget } from "@hpcc-js/common";

export function useData(widget: Widget): [string[], Array<string | number>[]] {
    const columns: string[] = React.useMemo(() => widget.columns(), [widget, widget.dataChecksum()]);
    const data: Array<string | number>[] = React.useMemo(() => widget.data(), [widget, widget.dataChecksum()]);

    return [columns, data];
}

