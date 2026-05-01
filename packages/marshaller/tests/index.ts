import { Dashboard, Dashy, ElementContainer } from "../src/index.ts";
import { sample2 } from "./sampleData.ts";

window.addEventListener("resize", doResize);

let widget: Dashy | Dashboard;

function doResize() {
    let myWidth;
    let myHeight;
    if (typeof (window.innerWidth) === "number") {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
        }
    }
    if (widget && myWidth && myHeight) {
        widget
            .resize({ width: myWidth - 16, height: myHeight - 16 })
            .lazyRender();
    }
}

export function edit(target: string) {
    widget = new Dashy()
        .target(target)
        .render()
        ;
    widget.importDDL(sample2);
    doResize();
    return widget;
}

export function view(target: string) {
    const ec = new ElementContainer();
    widget = new Dashboard(ec);
    widget
        .target(target)
        .titleVisible(false)
        .hideSingleTabs(true)
        .restore(sample2)
        .render(() => {
            ec.refresh();
        })
        ;
    doResize();
    return widget;
}
