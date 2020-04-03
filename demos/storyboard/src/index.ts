import { App } from "./app";

const params = decodeURIComponent(document.URL.split("?")[1] || "");
let debug = false;
let sampleID = "";
params.split("&").forEach(param => {
    if (param === "debug") {
        debug = true;
    } else {
        sampleID = param;
    }
});

let app: App;
export function loadApp() {
    app = new App(sampleID, debug)
        .target("placeholder")
        ;
    doResize();
}

window.addEventListener("resize", doResize);
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
    if (app && myWidth && myHeight) {
        app
            .resize({ width: myWidth - 16, height: myHeight - 16 })
            .lazyRender()
            ;
    }
}

document.addEventListener("keydown", function (e: any) {
    if (app && (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
        app.generate();
        e.preventDefault();
    }
}, false);
