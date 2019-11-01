# Table

<!--meta
{
    "id": 1244,
    "name": "Table",
    "kind": 128,
    "kindString": "Class",
    "flags": {
        "isExported": true
    },
    "sources": [
        {
            "fileName": "Table.ts",
            "line": 94,
            "character": 18
        },
        {
            "fileName": "Table.ts",
            "line": 229,
            "character": 22
        }
    ],
    "extendedTypes": [
        {
            "type": "reference",
            "name": "Common",
            "id": 112
        }
    ],
    "folder": "packages/dgrid"
}
-->

The dgrid Table widget displays tabular data and offers sorting and cell background coloring by column.

```sample-code
import { Table } from "@hpcc-js/dgrid";

new Table()
    .target("target")
    .columns(["A", "B"])
    .data([
        [-25, -23],
        [-20, -21],
        [-18, -20],
        [-17, -17],
        [-16, -15]
    ])
    .render()
    ;
```

_sortable_ can be used to enable sorting via clicking on the table header.

_sortBy_ can also be used to specify a default column to sort.

_sortByDescending_ defaults to _false_, but can be set to _true_ to use 'descending' sort.

```sample-code
import { Table } from "@hpcc-js/dgrid";

new Table()
    .target("target")
    .columns(["A", "B"])
    .data([
        [-20, -21],
        [-18, -20],
        [-25, -23],
        [-17, -17],
        [-16, -15]
    ])
    .sortable(true)
    .sortBy("B")
    .sortByDescending(true)
    .render()
    ;
```

_noDataMessage_ can be used to specify the message to display when there are no rows.

```sample-code
import { Table } from "@hpcc-js/dgrid";

new Table()
    .target("target")
    .columns(["A", "B"])
    .data([])
    .noDataMessage("Nothing to display here")
    .render()
    ;
```

_columnFormats_ can be given an array of _ColumnFormat_ instances to control the following properties of a column:
- _column_ - a string corresponding to the column to be formatted
- _width_ - a number specifying the pixel width of the column
- _format_ - a d3 string formatting rule to be applied to the cell contents of the column (see: [Formatting](../../../docs/Getting%20Started/formatting.md))
- _paletteID_ - a rainbow palette to be applied to the background of the column's cells based on the cell value relative to the linear scale created by _min_ and _max_
- _min_ - a number used for determining the background color value range
- _max_ - a number used for determining the background color value range
- _valueColumn_ - a string allowing the background color to be based on an alternative column's values

```sample-code
import { ColumnFormat, Table } from "@hpcc-js/dgrid";

new Table()
    .columnFormats([
        new ColumnFormat()
            .column("A")
            .paletteID("YlGnBu")
            .min(-25)
            .max(-16)
    ])
    .target("target")
    .columns(["A", "B"])
    .data([
        [-25, -23],
        [-20, -21],
        [-18, -20],
        [-17, -17],
        [-16, -15]
    ])
    .sortable(true)
    .render()
    ;
```

Below is an example of _format_

```sample-code
import { ColumnFormat, Table } from "@hpcc-js/dgrid";

new Table()
    .columnFormats([
        new ColumnFormat()
            .column("A")
            .paletteID("Blues")
            .min(-1754)
            .max(46452)
            .format("$,.2f"),
        new ColumnFormat()
            .column("B")
            .paletteID("Reds")
            .min(-2165)
            .max(35615)
            .format(",.0f"),
    ])
    .target("target")
    .columns(["A", "B"])
    .data([
        [-1754, 11334],
        [20765, -2165],
        [18654, 12045],
        [17234, 21776],
        [46452, 35615]
    ])
    .sortable(true)
    .render()
    ;
```

Nested tables are also supported.

```sample-code
import { Table } from "@hpcc-js/dgrid";

new Table()
    .target("target")
    .columns(["Mother", "Father", { label: "Children", columns: ["Name", "sex", "age"] }, { label: "Pets", columns: ["Name", "type"] }])
    .data([
        ["Jane", "John", [["Mary", "f", 4], ["Bob", "m", 6], ["Tim", "m", 1]], [["Spot", "dog"], ["Smelly", "cat"], ["Goldie", "Fish"], ["Hammy", "Hamster"]]],
        ["Penelope", "Alex", [["Bill", "m", 1]], []],
        ["Jill", "Marcus", [], [["Flappy", "parrot"], ["Stinky", "cat"], ["Rolf", "dog"]]],
        ["Susan", "Robert", [["Jack", "m", 4], ["Alice", "f", 6]], []]
    ])
    .render()
    ;
```

_pagination_ can be set to _true_ to enable pagination.

```sample-code
import { ColumnFormat, Table } from "@hpcc-js/dgrid";

new Table()
    .columnFormats([
        new ColumnFormat()
            .column("NodeJS Module")
            .valueColumn("Quality")
            .paletteID("YlGnBu")
            .min(0)
            .max(1),
        new ColumnFormat()
            .column("Quality")
            .paletteID("YlGnBu")
            .min(0)
            .max(1),
        new ColumnFormat()
            .column("Popularity")
            .paletteID("Blues")
            .min(0)
            .max(1),
        new ColumnFormat()
            .column("Maintenance")
            .paletteID("Reds")
            .min(0)
            .max(1)
    ])
    .target("target")
    .columns(["NodeJS Module", "Quality", "Popularity", "Maintenance"])
    .data([
        ["passport",0.4938482129720376,0.5917779254146884,0.3327053316813829],
        ["passport-jwt",0.8941115376785387,0.3860625059034481,0.10722018429805187],
        ["passport-auth0",0.906503757498512,0.20287120015739957,0.32733453889827113],
        ["passport-ldapauth",0.9093312747113799,0.20369792464785808,0.2639230908864721],
        ["passport-saml",0.788425147481274,0.23959662046084446,0.3333333333333333],
        ["passport-linkedin-oauth2",0.809906202729078,0.1765434496242106,0.329331372769146],
        ["passport-local",0.6072168054659483,0.4710751041744176,0.01555048520752183],
        ["passport-oauth2",0.6196090252859215,0.36119220403998,0.15005834618798797],
        ["passport-facebook",0.6196090252859215,0.31885387796535664,0.15005834618798797],
        ["@natlibfi/passport-atlassian-crowd",0.9243629515385932,0.040394076890184524,0.329331372769146],
        ["@zhaow-de/chai-passport-strategy",0.9243629515385932,0.008938268177685983,0.3333333333333333],
        ["passport-oauth",0.446648557461259,0.3159475341538345,0.2775842457494559],
        ["passport-google-oauth",0.6196090252859215,0.29682205449704663,0.15005834618798797],
        ["@nestjs/passport",0.6279412264455035,0.18011345318363794,0.33159592525764436],
        ["passport-ldapauth-jnmly",0.9093312747113799,0.006521736837350932,0.3329170657460006],
        ["passport-google-idtoken",0.8913052274786528,0.01832162699306179,0.3327053316813829],
        ["passport-dropbox-auth",0.8941115376785387,0.010908472612337464,0.33332158530214756],
        ["koa-passport",0.6196090252859215,0.22933297661431307,0.23186866090383487],
        ["passport-strategy",0.5449391599402367,0.41029835547752164,0.01555048520752183],
        ["passport-hubspot-auth",0.8941115376785387,0.010669613569030744,0.3329170657460006],
        ["passport-evernote-auth",0.8941115376785387,0.009001270443071734,0.3316259552820558],
        ["@sbaker/passport-jwt",0.8941115376785387,0.006978368170043919,0.3333333333333333],
        ["passport-custom",0.6072168054659483,0.1710531137414241,0.32624672278142447],
        ["@passport-next/chai-connect-middleware",0.9398245291997027,0.005253949689255811,0.3316259552820558],
        ["passport-chaira",0.8794064090421898,0.0025007817462488965,0.331851703232178],
        ["@sokratis/passport-linkedin-oauth2",0.809906202729078,0.05200395619187344,0.33120158747830747],
        ["passport-namchey",0.9081968052080557,0.0035355351616939397,0.28638365247869985],
        ["passport-google-oauth20",0.6196090252859215,0.2635237945056096,0.15005834618798797],
        ["passport-verify",0.8951929404171473,0.007053636693140256,0.31210684274184985],
        ["openid-client",0.55,0.2580091112907923,0.3333333333333333],
        ["passport-oauth2-refresh",0.9386150722607559,0.1399406048845841,0.031077596847726322],
        ["passport-kakao",0.7478736260382798,0.056618040059721784,0.3333333333333333],
        ["passport-mocked",0.7963634427097461,0.03513108302171434,0.32797663355743617],
        ["connect-ensure-authenticated",0.9277117692486642,0.007864570258758278,0.33319811528143006],
        ["passport-appleid",0.809906202729078,0.011072123800069736,0.3333333333333333],
        ["connect-ensure-authorization",0.9243629515385932,0.0058116558390899796,0.3328242421096128],
        ["periodicjs.ext.passport_mfa",0.9243629515385932,0.005398185006465589,0.32827492199779656],
        ["passport-worbli",0.809906202729078,0.008708186738006562,0.3333333333333333],
        ["opentoken",0.809906202729078,0.06423811939905472,0.3266269782818823],
        ["l-passport",0.8222984225490513,0.00570344610372109,0.3333333333333333]
    ])
    .columnWidth("none")
    .sortable(true)
    .pagination(true)
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/dgrid:Table
```
