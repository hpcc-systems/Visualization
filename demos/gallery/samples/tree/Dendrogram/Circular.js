import { Dendrogram } from '@hpcc-js/tree';

new Dendrogram()
    .target("target")
    .data(getData())
    .circleRadius(10)
    .radial(true)
    .render()
    ;

function getData() {
    return {
        label: "root",
        children: [{
            label: "A",
            children: [{
                label: "AA",
                children: [{
                    label: "AAA",
                    size: 144
                }]
            }, {
                label: "AB",
                children: [{
                    label: "ABA",
                    size: 89
                }]
            }]
        }, {
            label: "B",
            children: [{
                label: "BA",
                children: [{
                    label: "BAA",
                    size: 54
                }]
            }, {
                label: "BB",
                size: 89
            }]
        }]
    };
}