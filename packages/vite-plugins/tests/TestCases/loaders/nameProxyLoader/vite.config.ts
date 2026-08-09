import { defineCase } from "../../../defineCase.ts";

const enc = mid => encodeURIComponent(mid).replace(/!/g, "%21");

export default defineCase({
    loaderConfig: { paths: { test: "." }, has: { "host-browser": 0 } },
    moduleReplacement: [
        {
            test: /^namePlugin!/,
            replace: mid => {
                const name = /^namePlugin!(.*)$/.exec(mid)[1];
                return `dojo/loaderProxy?loader=test/namePlugin&deps=${enc("dojo/text!test/content.txt")}&name=${name}!`;
            }
        }
    ]
});
