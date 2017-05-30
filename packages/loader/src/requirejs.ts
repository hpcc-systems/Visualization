import { define, require as requirejs } from "@hpcc-js/requirejs-shim";
import { packages, shims, thirdParty } from "./meta";

//  Calculate hosting url

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
        retVal = getElementAttrVal("script", "src", "/loader/dist/loader.js");
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
    } else if (url.length >= 22 && url.indexOf("/common/dist/common.js") === url.length - 22) {
        addCssToDoc(url.replace("/common/dist/common.js", "/common/font-awesome/css/font-awesome.min.css"));
    } else if (url.length >= 20 && url.indexOf("/common/lib/index.js") === url.length - 20) {
        addCssToDoc(url.replace("/common/lib/index.js", "/common/font-awesome/css/font-awesome.min.css"));
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
    shims.forEach(shim => { paths[`@hpcc-js/${shim}`] = `${url}/${shim}/dist/${shim}`; });
    packages.forEach(pckg => {
        paths[`@hpcc-js/${pckg}`] = `${url}/${pckg}/dist/${pckg}${minStr}`;
    });
    return requirejs.config({
        context: url,
        paths
    });
}

export function npm(additionalPaths: { [key: string]: string } = {}, min: boolean = true): any {
    return bundle("https://unpkg.com/@hpcc-js", additionalPaths, min);
}

export function cdn(version?: string, additionalPaths: { [key: string]: string } = {}, min: boolean = true): any {
    const url = version === void 0 ? hostUrl : `https://viz.hpccsystems.com/${version}`;
    return bundle(url, additionalPaths, min);
}

export function amd(url: string = hostUrl, additionalPaths: { [key: string]: string } = {}, thirdPartyUrl: string = "file:///C:/Users/gordon/git/hpcc-js/node_modules"): any {
    const thirdPartyPaths: { [key: string]: string } = {};
    for (const key in thirdParty) {
        thirdPartyPaths[key] = `${thirdPartyUrl}/${thirdParty[key]}`;
    }
    const paths: { [key: string]: string } = {
        ...thirdPartyPaths,
        ...additionalPaths
    };
    const rjsPackages: any = [];
    shims.forEach(shim => { paths[`@hpcc-js/${shim}`] = `${url}/${shim}/dist/${shim}`; });
    packages.forEach(pckg => {
        paths[`@hpcc-js/${pckg}`] = `${url}/${pckg}`;
        rjsPackages.push({
            name: `@hpcc-js/${pckg}`,
            main: "lib/index"
        });
        paths[`@hpcc-js/${pckg}`] = `${url}/${pckg}`;
    });
    return requirejs.config({
        context: url,
        paths,
        packages: rjsPackages
    });
}
