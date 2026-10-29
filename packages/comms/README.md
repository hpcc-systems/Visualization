# @hpcc-js/comms
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## WsSQL2

`SQL2Service` exposes the WsSQL2 operations (`ExecuteQuery`, `ExplainQuery`, `FetchResultSet`, `CloseResultSet`, `LogicalFileMetadata`, `SplitQuery`, and `Ping`) with request and response types in `WsSQL2`.

```ts
import { SQL2Service } from "@hpcc-js/comms";

const sql = new SQL2Service({ baseUrl: "http://localhost:8510" });
const { CursorId, ResultSetMetadata } = await sql.ExecuteQuery({
    SQLText: "SELECT 1", IncludeResultSetMetadata: true
});
try {
    const { RowsJSON, Complete } = await sql.FetchResultSet({ CursorId, RowCount: 100 });
    console.log(ResultSetMetadata, RowsJSON, Complete);
} finally {
    await sql.CloseResultSet({ CursorId });
}
```

To regenerate the WsSQL2 TypeScript bindings from the local WSDL, run `npm run wsdl-sql2` in this package.
`ExplainQuery` returns `Plan` / `PlanJson`; a fetch may include `RuntimeGraph` / `RuntimeGraphJson` when `ExecuteQuery` requests `IncludeRuntimeGraph`.

For small results, `queryRows()` collects rows as objects keyed by column label and closes its statement automatically:

```ts
import { SQLConnection } from "@hpcc-js/comms";

const connection = new SQLConnection({ baseUrl: "http://localhost:8510" });
try {
    const rows = await connection.queryRows("SELECT id FROM hpcc_scan('example::file')", 100);
    console.log(rows[0]?.id);
    const { Plan } = await connection.explainQuery("SELECT 1");
    const file = await connection.logicalFileMeta("example::file");
    const available = await connection.ping();
} finally {
    await connection.close();
}
```

`queryRows()` preserves native JSON values (including `null`) and rejects missing or duplicate column labels, ignoring case. It holds all rows in memory; use `createStatement()` and `next()` below for large results or early cancellation. `explainQuery()` returns the typed service response, `logicalFileMeta()` returns the file metadata or `undefined`, and `ping()` returns `true` on success (or rejects on failure).

For a JDBC-style, forward-only client, use the async `SQLConnection` helper:

```ts
import { SQLConnection } from "@hpcc-js/comms";

const connection = new SQLConnection({ baseUrl: "http://localhost:8510" });
try {
    const statement = connection.createStatement();
    statement.setFetchSize(100);
    const statements = await connection.splitQuery("SELECT 1; SELECT 2;");
    const result = await statement.executeQuery("SELECT id FROM hpcc_scan('example::file')");
    while (await result.next()) {
        console.log(result.getObject("id"));
    }
} finally {
    await connection.close();
}
```

`executeQuery` prepares SQL and returns metadata and a cursor without executing it. The first `next()` initiates execution; subsequent calls fetch pages on demand until `Complete` is true, including empty intermediate pages. `getObject` accepts a 1-based column index or a case-insensitive label, and `getMetaData()` exposes the WsSQL2 column descriptors. Always `await` `close()` on the result, statement, or connection when finished: it releases any active server cursor. All three support `Symbol.asyncDispose`, so `await using` also closes their owned cursors on scope exit; synchronous disposal cannot wait for the server. `statement.cancel()` or `result.cancel()` closes the cursor immediately, even while a fetch is in progress, and ends that result's iteration. Executing another query on the same statement closes its previous result first. This helper does not implement transactions, parameter binding, or JDBC type conversions.
`connection.splitQuery(sql)` delegates statement splitting to the server and returns the individual SQL strings (or `[]` for a comment-only script); it does not execute them. Pass each statement to `executeQuery()` separately when running a multi-statement script.
If `CloseResultSet` fails, the failure is reported and the cursor ID is retained; retry `close()` on the result, statement, or connection to attempt cleanup again.

The integration tests in `tests/wsSQL2.spec.ts` run in both the Node and browser test projects. They require ESP at `http://127.0.0.1:8010/` and WsSQL2 at `http://127.0.0.1:8510/`; service-backed tests are skipped when the WsSQL2 ping fails. One test creates a unique 1,000-row logical file, verifies paging and early cursor close, then removes the file and its workunit.

## Exported Widgets
* [Connection](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/comms/Connection.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple Connection+Codemirror</title>
        <script src="https://unpkg.com/@hpcc-js/util"></script>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/comms"></script>
        <script src="https://unpkg.com/@hpcc-js/codemirror"></script>
    </head>
    <body>
        <div id="placeholder" style="width:800px;height:600px;"></div>
        <script>
            new window["@hpcc-js/comms"].Connection({
                    baseUrl: "https://api.pushshift.io/",
                    type: "get"
                })
                .send("reddit/search/submission/", {
                    "subreddit":"askreddit",
                    "sort":"desc",
                    "sort_type":"created_utc",
                    "size":"5",
                }).then((json) => {
                    new window["@hpcc-js/codemirror"].JSONEditor()
                        .target("placeholder")
                        .json(json)
                        .render()
                        ;
                })
                .catch((e) => {
                    console.error(e);
                })
                ;
        </script>
    </body>
</html>
```

## Getting Started with @hpccjs
* _[Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start)_
* _[Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials)_
* _[Gallery](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html)_ ([alt](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html))
* _[Wiki](https://github.com/hpcc-systems/Visualization/wiki)_
