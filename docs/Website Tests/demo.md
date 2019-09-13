# Demo...

_This is a demo of how to merger Markdown with live JavaScript via the HPCC-Systems Visualization Framework_

## Calling Roxie

In this example we call a roxie service and populate the response into a table:

```sample

//  Create a connection to a roxie query  ---
import { Query } from "@hpcc-js/comms";
const query = Query.attach({ baseUrl: "https://play.hpccsystems.com:18002/" }, "roxie", "h3testcities");


//  Create a Table to display the results in  ---
import { Table } from "@hpcc-js/dgrid";

const table = new Table()
    .target("target")
    .columns(["h3Index", "Row Count"])
    .render()
    ;


//  Call the roxie service and populate the table above  ---
query.submit({
    h3PolySetRes: 4,
    childThreshold: 10,
    h3PolySet: {
        Row: [{
            lat: 56.49117606538043,
            lon: -15.985107421875002
        }, {
            lat: 56.49117606538043,
            lon: -0.16479492187499978
        }, {
            lat: 49.61822155651335,
            lon: -0.16479492187499978
        }, {
            lat: 49.61822155651335,
            lon: -0.16479492187499978
        }, {
            lat: 49.61822155651335,
            lon: -15.985107421875002
        }]
    }
}).then(response => {
    table
        .data(response.IndexCountSet.map(row=>[row.h3index, row.rowcount]))
        .render()
        ;
});

```


