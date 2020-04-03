import { require as d3Require } from "d3-require";
import { placeholder } from "./util";

export async function esp(url: string) {
    const hpccComms = await d3Require("@hpcc-js/comms");

    return {
        url,
        wu: (wuid: string) => wu(hpccComms.Workunit.attach({ baseUrl: url }, wuid)),
        async *submit(ecl: string, target = "hthor") {
            if (ecl) {
                yield [{ Workunit: "Submitting..." }];
                const wu = await hpccComms.Workunit.submit({ baseUrl: url }, target, ecl);
                yield [{ Workunit: "Waiting for completion..." }];
                await wu.watchUntilComplete();
                yield [{ Workunit: "Fetching Results..." }];
                const results = await wu.fetchResults();
                const rows = await results && results.length ? results[0].fetchRows() : [];
                yield [{ Workunit: "Cleaning up..." }];
                wu.delete();
                yield rows;
            } else {
                yield [];
            }
        }
    };
}

function wu(wu) {
    return {
        wuid: wu.Wuid,
        results: async () => {
            const results = await wu.fetchResults();
            const retVal = results.map(result);
            retVal.forEach(r => {
                retVal[r.name] = r;
            });
            return retVal;
        }
    };
}

function result(r) {
    return {
        name: r.Name,
        data: (from?: number, count?: number) => {
            return r.fetchRows(from, count);
        },
        async *table(props: { height?: number, [key: string]: any } = {}) {
            const hpccEclwatch = await d3Require("@hpcc-js/eclwatch");

            const { div, widget } = placeholder(new hpccEclwatch.WUResult()
                .baseUrl(r.BaseUrl)
                .wuid(r.Wuid)
                .resultName(r.Name), props);

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
                .lazyRender()
                ;
        }
    };
}
