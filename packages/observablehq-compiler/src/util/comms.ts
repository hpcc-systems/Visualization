import { ohq } from "../ojs/types.ts";

export function fetchEx(url: string, proxyPrefix = "https://api.codetabs.com/v1/proxy/?quest=", proxyPostfix = "") {
    const matches = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img);
    if (!matches || matches.length === 0) {
        throw new Error(`Invalid URL:  ${url}`);
    }
    return fetch(url, { headers: { origin: matches[0], referer: url } }).then(response => {
        if (response.ok) return response;
        throw new Error("CORS?");
    }).catch(e => {
        url = `${proxyPrefix}${url}${proxyPostfix}`;
        return fetch(url, { headers: { origin: matches[0], referer: url } });
    });
}

export function download(impUrl: string, proxyPrefix?: string, proxyPostfix?: string): Promise<ohq.Notebook> {
    const isShared = impUrl.indexOf("https://observablehq.com/d") === 0;
    return fetchEx(impUrl.replace(`https://observablehq.com/${isShared ? "d/" : ""}`, "https://api.observablehq.com/document/"), proxyPrefix, proxyPostfix)
        .then(r => r.json())
        ;
}