import { define, require as requirejs } from "@hpcc-js/requirejs-shim";
import { hpccShims, npmPackages, packages, requireShims } from "./meta";

declare const window: any;

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

const [loaderUrl, hostUrl] = (function () {
    let scriptUrl = "";
    if (document && document.currentScript) {
        scriptUrl = (document.currentScript as any).src;
    } else {
        scriptUrl = getElementAttrVal("script", "src", "/loader/dist/index");
    }
    const retValParts = scriptUrl.split("/");
    retValParts.pop();  //  index.js
    retValParts.pop();  //  dist/
    const loaderUrl = retValParts.join("/");
    retValParts.pop();  //  loader/
    const hostUrl = retValParts.join("/");
    return [loaderUrl, hostUrl];
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
        url = loaderUrl + "/rjs.noop.js";
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
    console.log("Deprecated - please use 'amd'");
    window.__hpcc_topoJsonFolder = `${url}/map/TopoJSON`;
    // window.__hpcc_wasmFolder = `${url}/wasm/dist`;
    const minStr = min ? ".min" : "";
    const paths: { [key: string]: string } = {
        "@hpcc-js/map/TopoJSON": `${url}/map/TopoJSON`,
        "@hpcc-js/wasm": `${url}/wasm/dist/index${minStr}`
    };
    hpccShims.forEach(shim => {
        paths[`@hpcc-js/${shim}`] = `${url}/${shim}/dist/index${minStr}`;
    });
    packages.forEach(pckg => {
        paths[`@hpcc-js/${pckg}`] = `${url}/${pckg}/dist/index${minStr}`;
    });

    return requirejs.config({
        context: url,
        paths: {
            ...paths,
            ...additionalPaths
        }
    });
}

function cdnPath(url: string, min: boolean = true, additionalPaths: { [key: string]: string } = {}): Promise<any> {
    const minStr = min ? ".min" : "";
    return new Promise((resolve, reject) => {
        function reqListener() {
            const pkg = JSON.parse(this.responseText);
            console.log(`Configuring require from ${pkg.name}@${pkg.version} from ${url}`);
            window.__hpcc_topoJsonFolder = `${url}/map/TopoJSON`;
            const paths: { [key: string]: string } = {
                "@hpcc-js/map/TopoJSON": `${url}/map/TopoJSON`,
                ...additionalPaths
            };
            for (const key in pkg.dependencies) {
                if (key.indexOf("@hpcc-js/") === 0) {
                    const folder = key.substr(9);
                    paths[key] = `${url}/${folder}/dist/index${minStr}`;
                }
            }
            resolve(requirejs.config({
                context: url,
                paths
            }));
        }

        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url + "/loader/package.json");
        oReq.send();
    });
}

function pkgVersion(pkg, id: string): string {
    const version = pkg.dependencies[id];
    if (version[0] === "^" || version[0] === "~") {
        return version.substring(1);
    }
    return version;
}

function pkgUrl(pkg, id: string): string {
    return `https://unpkg.com/${id}@${pkgVersion(pkg, id)}`;
}

function unpkgPath(url: string, min: boolean = true, additionalPaths: { [key: string]: string } = {}): Promise<any> {
    const minStr = min ? ".min" : "";
    return new Promise((resolve, reject) => {
        function reqListener() {
            const pkg = JSON.parse(this.responseText);
            console.log(`Configuring require from ${pkg.name}@${pkg.version} from ${url}`);
            const topoJsonUrl = `${pkgUrl(pkg, "@hpcc-js/map")}/TopoJSON`;
            window.__hpcc_topoJsonFolder = topoJsonUrl;
            const paths: { [key: string]: string } = {
                "@hpcc-js/map/TopoJSON": topoJsonUrl,
                ...additionalPaths
            };
            for (const key in pkg.dependencies) {
                paths[key] = `${pkgUrl(pkg, key)}/dist/index${minStr}`;
            }
            resolve(requirejs.config({
                context: url,
                paths
            }));
        }

        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url);
        oReq.send();
    });
}

export function unpkgVersion(version: string = "", min: boolean = true, additionalPaths: { [key: string]: string } = {}): Promise<any> {
    if (version) version = "@" + version;
    return unpkgPath(`https://unpkg.com/@hpcc-js/loader${version}/package.json`, min, additionalPaths);
}

export function unpkg(min: boolean = true, additionalPaths: { [key: string]: string } = {}): any {
    console.log("Deprecated - please use 'amd'");
    window.__hpcc_topoJsonFolder = "https://unpkg.com/@hpcc-js/map/TopoJSON";
    return cdn("https://unpkg.com/@hpcc-js", min, additionalPaths);
}

export function dev(additionalPaths: { [key: string]: string } = {}): any {
    window.__hpcc_topoJsonFolder = `${hostUrl}/map/TopoJSON`;
    window.__hpcc_wasmFolder = `${hostUrl}/../node_modules/@hpcc-js/wasm/dist`;
    const thirdPartyPaths: { [key: string]: string } = {};
    for (const key in npmPackages) {
        thirdPartyPaths[key] = `${hostUrl}/../node_modules/${npmPackages[key]}`;
    }
    const paths: { [key: string]: string } = {
        ...thirdPartyPaths,
        ...additionalPaths
    };
    const rjsPackages: any = [];
    hpccShims.forEach(shim => {
        paths[`@hpcc-js/${shim}`] = `${hostUrl}/${shim}/dist/index`;
    });
    packages.forEach(pckg => {
        paths[`@hpcc-js/${pckg}`] = `${hostUrl}/${pckg}`;
        rjsPackages.push({
            name: `@hpcc-js/${pckg}`,
            main: "lib-umd/index"
        });
    });
    return requirejs.config({
        context: hostUrl,
        paths,
        packages: rjsPackages,
        shim: requireShims
    });
}

export function amd(altUrl: string = "", min: boolean = true, additionalPaths: { [key: string]: string } = {}): Promise<any> {
    const _loaderUrl = altUrl ? altUrl + "/loader" : loaderUrl;
    if (_loaderUrl.indexOf("unpkg.com/@hpcc-js/loader") > 0) {
        return unpkgPath(_loaderUrl + "/package.json", min, additionalPaths);
    } else if (!altUrl && (_loaderUrl.indexOf("file://") === 0 || _loaderUrl.indexOf("http://localhost") === 0)) {
        return Promise.resolve(dev(additionalPaths));
    }
    return cdnPath(altUrl || hostUrl, min, additionalPaths);
}
