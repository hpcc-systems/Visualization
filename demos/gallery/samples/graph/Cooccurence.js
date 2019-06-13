import { Cooccurence } from "@hpcc-js/graph";

new Cooccurence()
    .edges(getData())
    .target("target")
    .sortMode("none")
    .render()
    ;

function getData() {
    return []
        .concat(Array(24).fill(["Monday", "", 0]).map((row, i) => [row[0], _idx_to_hour(i), Math.random()]))
        .concat(Array(24).fill(["Tuesday", "", 0]).map((row, i) => [row[0], _idx_to_hour(i), Math.random()]))
        .concat(Array(24).fill(["Wednesday", "", 0]).map((row, i) => [row[0], _idx_to_hour(i), Math.random()]))
        .concat(Array(24).fill(["Thursday", "", 0]).map((row, i) => [row[0], _idx_to_hour(i), Math.random()]))
        .concat(Array(24).fill(["Friday", "", 0]).map((row, i) => [row[0], _idx_to_hour(i), Math.random()]))
        .concat(Array(24).fill(["Saturday", "", 0]).map((row, i) => [row[0], _idx_to_hour(i), Math.random()]))
        .concat(Array(24).fill(["Sunday", "", 0]).map((row, i) => [row[0], _idx_to_hour(i), Math.random()]))
        ;
    function _idx_to_hour(idx) {
        return idx < 10 ? "0" + idx + ":00" : idx + ":00";
    }
}