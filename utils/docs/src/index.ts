import * as MockBrowserMod from "mock-browser";
import * as navigator from "navigator";
import * as hook from "node-hook";
import * as path from "path";
import { loadMeta } from "./discover";

//  Ignore CSS files during reflection ---
hook.hook(".css", (source, filename) => {
    return "";
});

//  Create fake browser environment for reflection ---
const MockBrowser = MockBrowserMod.mocks.MockBrowser;
global["window"] = MockBrowser.createWindow();
global["document"] = MockBrowser.createDocument();
global["navigator"] = navigator;
global["screen"] = {
    availWidth: 1024
};

const folder = path.join(process.cwd(), "../../packages/chart");

import(`${folder}/lib-umd/Column.js`).then(modFile => {
    const col = new modFile.Column();
    const pp = col.publishedProperties();
    console.log(pp.map(m => m.id));
});

loadMeta(folder, false).then(([pkg, meta, docs]) => {
}).catch(e => {
});

/*
const meta = new Meta();
meta.load().then((meta) => {
    const docs = new Docs(meta);
});
*/
