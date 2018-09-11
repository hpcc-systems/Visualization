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
