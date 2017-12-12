import { define, require as requirejs } from "@hpcc-js/requirejs-shim";
import { npmPackages, packages, rawgitPackages, shims } from "./meta";

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
    const scriptUrlParts = scriptUrl.split("/loader/build/index.js");
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
        retVal = getElementAttrVal("script", "src", "/loader/build/index.js");
    }
    const retValParts = retVal.split("/");
    retValParts.pop();  //  loader.js
    retValParts.pop();  //  build/
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
    } else if (url.length >= 26 && url.indexOf("/common/build/common.min.js") === url.length - 26) {
        addCssToDoc(url.replace("/common/build/common.min.js", "/common/font-awesome/css/font-awesome.min.css"));
    } else if (url.length >= 22 && url.indexOf("/common/build/common.js") === url.length - 22) {
        addCssToDoc(url.replace("/common/build/common.js", "/common/font-awesome/css/font-awesome.min.css"));
    } else if (url.length >= 20 && url.indexOf("/common/lib/index.js") === url.length - 20) {
        addCssToDoc(url.replace("/common/lib/index.js", "/common/font-awesome/css/font-awesome.min.css"));
    }
    if (moduleId.indexOf("@hpcc-js/") === 0 && moduleId.indexOf("/build/") > 0) {
        // addCssToDoc(url.replace(".js", ".css"));
    }
    return load(context, moduleId, url);
};

if (!(window as any).define) {
    (window as any).define = define;
}

export function bundle(url: string, additionalPaths: { [key: string]: string } = {}, min: boolean = true): any {
    const paths: { [key: string]: string } = {
        "@hpcc-js/map/TopoJSON": `${url}/map/TopoJSON`,
        "amchartsImg": `${url}/amchart/images/`,
        ...additionalPaths
    };
    const minStr = min ? ".min" : "";
    shims.forEach(shim => { paths[`@hpcc-js/${shim}`] = `${url}/${shim}/build/index`; });
    packages.forEach(pckg => {
        paths[`@hpcc-js/${pckg}`] = `${url}/${pckg}/build/index${minStr}`;
    });
    return requirejs.config({
        context: url,
        paths
    });
}

export function cdn(version?: string, additionalPaths: { [key: string]: string } = {}, min: boolean = true): any {
    const url = version === void 0 ? hostUrl : `https://viz.hpccsystems.com/${version}`;
    return bundle(url, additionalPaths, min);
}

function local(devMode: boolean, additionalPaths: { [key: string]: string }, min: boolean = false): any {
    const config = parseScriptUrl(devMode);
    const thirdPartyPaths: { [key: string]: string } = {};
    for (const key in npmPackages) {
        thirdPartyPaths[key] = `${config.node_modulesUrl}/${npmPackages[key]}`;
    }
    if (!config.isLocal) {
        for (const key in rawgitPackages) {
            thirdPartyPaths[key] = `https://cdn.rawgit.com/${rawgitPackages[key]}`;
        }
    }
    const paths: { [key: string]: string } = {
        ...thirdPartyPaths,
        ...additionalPaths
    };
    const rjsPackages: any = [];
    shims.forEach(shim => {
        paths[`@hpcc-js/${shim}`] = `${config.libUrl}/${shim}/build/index`;
    });
    packages.forEach(pckg => {
        paths[`@hpcc-js/${pckg}`] = `${config.libUrl}/${pckg}`;
        rjsPackages.push({
            name: `@hpcc-js/${pckg}`,
            main: devMode && config.isLocal ? `lib-umd/index` : `build/index.min`
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
    return local(true, additionalPaths);
}

export function amd(additionalPaths: { [key: string]: string } = {}): any {
    return local(false, additionalPaths);
}

export function npm(additionalPaths: { [key: string]: string } = {}): any {
    return local(false, additionalPaths);
}
