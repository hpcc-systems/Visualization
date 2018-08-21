import { Treemap } from '@hpcc-js/tree';

new Treemap()
    .target("target")
    .data(getData())
    .showRoot(true)
    .paddingInner(2)
    .paddingOuter(4)
    .paddingTop(18)
    .parentFontSize(12)
    .leafFontSize(10)
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