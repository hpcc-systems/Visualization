import React from "preact/compat";
import { Widget } from "@hpcc-js/common";

export function useData(widget: Widget): [string[], Array<string | number>[]] {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const columns: string[] = React.useMemo(() => widget.columns(), [widget, widget.dataChecksum()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data: Array<string | number>[] = React.useMemo(() => widget.data(), [widget, widget.dataChecksum()]);

    return [columns, data];
}

