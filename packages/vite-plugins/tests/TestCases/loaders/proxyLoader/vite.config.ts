import { defineCase } from "../../../defineCase.ts";

const enc = mid => encodeURIComponent(mid).replace(/!/g, "%21");

export default defineCase({
    loaderConfig: { paths: { test: "." }, has: { "host-browser": 0 } },
    moduleReplacement: [
        {
            test: /^test\/addHeaderPlugin!/,
            replace: mid => {
                const resource = /^test\/addHeaderPlugin!(.*)$/.exec(mid)[1];
                return `dojo/loaderProxy?loader=test/addHeaderPlugin&deps=${enc("dojo/text!" + resource)}!${resource}`;
            }
        }
    ]
});
