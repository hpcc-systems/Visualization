import { randomUUID } from "node:crypto";
import { expect, it } from "vitest";

import { DFUArrayActions, DFUService, SQLConnection, Workunit } from "@hpcc-js/comms";
import { ESP_URL } from "./testLib.ts";

const SQL_URL = "http://127.0.0.1:8510/";

it("splits a multi-statement script without splitting quoted semicolons", async () => {
    const connection = new SQLConnection({ baseUrl: SQL_URL });
    try {
        expect(await connection.splitQuery("SELECT 1; SELECT 'a;b';")).toEqual([
            "SELECT 1", "SELECT 'a;b'"
        ]);
        expect(await connection.splitQuery("-- comment")).toEqual([]);
    } finally {
        await connection.close();
    }
});

it("pages through a 1000-row logical file and removes its workunit and file", async () => {
    const fileName = `hpcc-js::test::sql2::${randomUUID().replace(/-/g, "")}`;
    const dfu = new DFUService({ baseUrl: ESP_URL });
    let workunit: Workunit | undefined;
    let connection: SQLConnection | undefined;
    let fetches = 0;
    let closedCursors = 0;
    let failure: unknown;
    try {
        workunit = await Workunit.create({ baseUrl: ESP_URL });
        await workunit.update({
            QueryText: `rowLayout := RECORD
    UNSIGNED4 id;
    STRING label;
END;
testRows := DATASET(1000, TRANSFORM(rowLayout,
    SELF.id := COUNTER;
    SELF.label := (STRING) COUNTER;
));
OUTPUT(testRows,, '~${fileName}', OVERWRITE);`
        });
        await workunit.submit("hthor");
        await workunit.watchUntilComplete();
        if (workunit.isFailed()) {
            await workunit.fetchInfo({ IncludeExceptions: true });
            throw new Error(`Workunit ${workunit.Wuid} failed: ${JSON.stringify(workunit.Exceptions)}`);
        }
        const createdFiles = await dfu.DFUQuery({ LogicalName: fileName });
        expect(createdFiles.DFULogicalFiles?.DFULogicalFile?.some(file => file.Name === fileName)).toBe(true);

        connection = new SQLConnection({
            baseUrl: SQL_URL,
            hookSend: (options, action, request, responseType, defaultSend, header) => {
                if (action === "WsSQL2/FetchResultSet.json") ++fetches;
                if (action === "WsSQL2/CloseResultSet.json") ++closedCursors;
                return defaultSend(options, action, request, responseType, header);
            }
        });
        const statement = connection.createStatement();
        statement.setFetchSize(73);
        const result = await statement.executeQuery(`SELECT id, label FROM hpcc_scan('${fileName}') ORDER BY id`);
        expect(fetches).toBe(0);
        let count = 0;
        while (await result.next()) {
            ++count;
            expect(result.getObject("id")).toBe(count);
            expect(result.getString("label")).toBe(String(count));
        }
        expect(count).toBe(1000);
        expect(fetches).toBeGreaterThan(1);
        await result.close();
        const earlyResult = await statement.executeQuery(`SELECT id FROM hpcc_scan('${fileName}') ORDER BY id`);
        expect(await earlyResult.next()).toBe(true);
        await earlyResult.close();
        expect(closedCursors).toBe(1);
        const pendingResult = await statement.executeQuery(`SELECT id FROM hpcc_scan('${fileName}') ORDER BY id`);
        const fetchesBeforeCancel = fetches;
        await pendingResult.cancel();
        expect(fetches).toBe(fetchesBeforeCancel);
        expect(closedCursors).toBe(2);
    } catch (error) {
        failure = error;
    } finally {
        const cleanup = await Promise.allSettled([
            connection?.close(),
            workunit ? (async () => {
                const files = await dfu.DFUQuery({ LogicalName: fileName });
                if (files.DFULogicalFiles?.DFULogicalFile?.some(file => file.Name === fileName)) {
                    const response = await dfu.DFUArrayAction({
                        Type: DFUArrayActions.Delete,
                        LogicalFiles: { Item: [fileName] }
                    });
                    const failures = response.ActionResults?.DFUActionInfo?.filter(action => action.Failed) ?? [];
                    if (failures.length) throw new Error(`Failed to remove logical file ${fileName}: ${JSON.stringify(failures)}`);
                    const remaining = await dfu.DFUQuery({ LogicalName: fileName });
                    if (remaining.DFULogicalFiles?.DFULogicalFile?.some(file => file.Name === fileName)) {
                        throw new Error(`Logical file ${fileName} still exists after deletion`);
                    }
                }
            })() : undefined
        ].filter((operation): operation is Promise<unknown> => operation !== undefined));
        const errors = cleanup.filter((result): result is PromiseRejectedResult => result.status === "rejected");
        if (workunit) {
            try {
                await workunit.delete();
                expect(workunit.isDeleted()).toBe(true);
            } catch (error) {
                errors.push({ status: "rejected", reason: error });
            }
        }
        if (errors.length) {
            failure = new AggregateError(
                [...(failure === undefined ? [] : [failure]), ...errors.map(error => error.reason)],
                "SQL2 integration test or cleanup failed"
            );
        }
    }
    if (failure !== undefined) throw failure;
}, 120000);
