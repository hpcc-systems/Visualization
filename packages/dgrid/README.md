# @hpcc-js/dgrid

This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including quick start, demos and tutorials, please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Details
The **dgrid** package contains the following visualizations:

## Note for Rollup.js users
**dgrid** is dependent on **dgrid-shim** which requires some special configuration when bundling with Rollup.js - please see [dgrid-shim](../dgrid-shim/README.md) for more information.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="height:600px">
    </div>
    <script type="module">
        //  Note:  dgrid does not support "import" - this will fail
        import { Table } from "@hpcc-js/dgrid";

        new Table()
            .target("target")
            .columns(["Mother", "Father", { label: "Children", columns: ["Name", "sex", "age"] }, { label: "Pets", columns: ["Name", "type"] }])
            .data([
                ["<b>Jane</b>", "John", [["Mary", "f", 4], ["Bob", "m", 6], ["Tim", "m", 1]], [["Spot", "dog"], ["Smelly", "cat"], ["Goldie", "Fish"], ["Hammy", "Hamster"]]],
                ["Penelope", "Alex", [["Bill", "m", 1]], []],
                ["Jill", "Marcus", [], [["Flappy", "parrot"], ["Stinky", "cat"], ["Rolf", "dog"]]],
                ["Susan", "Robert", [["Jack", "m", 4], ["Alice", "f", 6]], []]
            ])
            .render()
            ;
      </script>
  </hpcc-vitepress>
</ClientOnly>