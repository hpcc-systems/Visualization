import { define, require as requirejs } from "@hpcc-js/requirejs-shim";
import { npmPackages, packages, shims } from "./meta";

function guessScriptURL() {
    if (document && document.currentScript) {
        if ((document.currentScript as any).src) {
            return (document.currentScript as any).src;
        }
    }
    const scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1].src;
}
const scriptUrl = guessScriptURL();

function parseScriptUrl(forceLocal: boolean) {
    const scriptUrlParts = scriptUrl.split("/loader/dist/index");
    const isLocal = forceLocal || scriptUrl.indexOf("file://") === 0;
    return {
        isLocal,
        libUrl: isLocal ? scriptUrlParts[0] : "https://unpkg.com/@hpcc-js",
        node_modulesUrl: isLocal ? scriptUrlParts[0] + "/../node_modules" : "https://unpkg.com"
    };
}

function getElementAttrVal(tagName: string = "script", attr: string = "src", val: string) {
    const scripts = document.getElementsByTagName(tagName);
    for (let i = scripts.length - 1; i >= 0; --i) {
        const script = scripts[i];
        const attrVal: string = script.getAttribute.length !== undefined ? script[attr] : script.getAttribute(attr) || "";
        if (attrVal.indexOf(val) >= 0) {
            return attrVal;
        }
    }
    return "";
}
const hostUrl = (function () {
    let retVal = "";
    if (document && document.currentScript) {
        retVal = (document.currentScript as any).src;
    } else {
        retVal = getElementAttrVal("script", "src", "/loader/dist/index.js");
    }
    const retValParts = retVal.split("/");
    retValParts.pop();  //  loader.js
    retValParts.pop();  //  dist/
    retValParts.pop();  //  loader/
    return retValParts.join("/");
})();

const dedup: { [key: string]: boolean } = {};
function addCssToDoc(url: string) {
    if (!dedup[url]) {
        dedup[url] = true;
        if (!getElementAttrVal("link", "href", url)) {
            const link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    }
}

const load = requirejs.load;
requirejs.load = function (context, moduleId, url) {
    //  Temp hook for transition to ts /d3.v4 ---
    if (moduleId.length >= 4 && moduleId.indexOf(".css") === moduleId.length - 4) {
        const newUrl = url.substring(0, url.length - 3);
        addCssToDoc(newUrl);
        url = hostUrl + "/loader/rjs.noop.js";
    }
    /*
    else if (url.length >= 26 && url.indexOf("/common/dist/common.min.js") === url.length - 26) {
        addCssToDoc(url.replace("/common/dist/common.min.js", "/common/font-awesome/css/font-awesome.min.css"));
    } else if (url.length >= 22 && url.indexOf("/common/dist/common.js") === url.length - 22) {
        addCssToDoc(url.replace("/common/dist/common.js", "/common/font-awesome/css/font-awesome.min.css"));
    } else if (url.length >= 20 && url.indexOf("/common/lib/index.js") === url.length - 20) {
        addCssToDoc(url.replace("/common/lib/index.js", "/common/font-awesome/css/font-awesome.min.css"));
    }
    if (moduleId.indexOf("@hpcc-js/") === 0 && moduleId.indexOf("/dist/") > 0) {
        // addCssToDoc(url.replace(".js", ".css"));
    }
    */
    return load(context, moduleId, url);
};

if (!(window as any).define) {
    (window as any).define = define;
}

export function cdn(url: string, min: boolean = true, additionalPaths: { [key: string]: string } = {}): any {
    const minStr = min ? ".min" : "";
    const paths: { [key: string]: string } = {
        "@hpcc-js/map/TopoJSON": `${url}/map/TopoJSON`,
        "amchartsImg": `${url}/amchart/images/`,
        "@hpcc-js/dgrid-shim": `${url}/dgrid-shim/dist/index${minStr}`,
        ...additionalPaths
    };
    packages.forEach(pckg => {
        paths[`@hpcc-js/${pckg}`] = `${url}/${pckg}/dist/index${minStr}`;
    });
    return requirejs.config({
        context: url,
        paths
    });
}

export function unpkg(min: boolean = true, additionalPaths: { [key: string]: string } = {}): any {
    return cdn("https://unpkg.com/@hpcc-js", min, additionalPaths);
}

function local(additionalPaths: { [key: string]: string }, min: boolean = false): any {
    const config = parseScriptUrl(true);
    const thirdPartyPaths: { [key: string]: string } = {};
    for (const key in npmPackages) {
        thirdPartyPaths[key] = `${config.node_modulesUrl}/${npmPackages[key]}`;
    }
    const paths: { [key: string]: string } = {
        ...thirdPartyPaths,
        ...additionalPaths
    };
    const rjsPackages: any = [];
    shims.forEach(shim => {
        paths[`@hpcc-js/${shim}`] = `${config.libUrl}/${shim}/dist/index`;
    });
    packages.forEach(pckg => {
        paths[`@hpcc-js/${pckg}`] = `${config.libUrl}/${pckg}`;
        rjsPackages.push({
            name: `@hpcc-js/${pckg}`,
            main: "lib-umd/index"
        });
        paths[`@hpcc-js/${pckg}`] = `${config.libUrl}/${pckg}`;
    });
    return requirejs.config({
        context: config.libUrl,
        paths,
        packages: rjsPackages
    });
}

export function dev(additionalPaths: { [key: string]: string } = {}): any {
    return local(additionalPaths);
}
