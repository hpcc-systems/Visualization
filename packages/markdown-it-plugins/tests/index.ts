import markdownit from "markdown-it";
import { observable } from "@hpcc-js/markdown-it-plugins";

import "./style.css";

const md = markdownit({
    html: true,
    linkify: true,
    typographer: true
});

md.use(observable);

const minimalMd = fetch("/tests/Basic usage/Minimal Example.md").then(response => {
    return response.text();
}).catch(e => {
    console.error("Error: ", e.message ?? e);
});

const minimalHtml = md.render("" + await minimalMd);

document.querySelector<HTMLDivElement>("#min")!.innerHTML = minimalHtml;

