import { scopedLogger } from "@hpcc-js/util";
import { Workunit } from "@hpcc-js/comms";

const logger = scopedLogger("tests");

export function test() {
    const wu = Workunit.attach({ baseUrl: "http://localhost:8010" }, "W20250806-122131");

    Promise.all([
        wu.fetchInfo({ IncludeExceptions: true }),
        wu.fetchDetailsNormalized({
            ScopeFilter: "logical:*",
            NestedFilter: "",
            PropertiesToReturn: {
                AllScopes: true,
                AllAttributes: true,
                AllProperties: true,
                AllNotes: true,
                AllStatistics: true,
                AllHints: true
            },
            ScopeOptions: {
                IncludeId: true,
                IncludeScope: true,
                IncludeScopeType: true,
                IncludeMatchedScopesInResults: true
            },
            PropertyOptions: {
                IncludeName: true,
                IncludeRawValue: true,
                IncludeFormatted: true,
                IncludeMeasure: true,
                IncludeCreator: false,
                IncludeCreatorType: false
            }
        })
    ]).then(([info, response]) => {
        debugger;
    }).catch(e => {
        logger.error(e);
    }).finally(() => {
    });
}