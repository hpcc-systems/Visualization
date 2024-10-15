import { defineLoader } from "vitepress";
import { DataFile } from "@hpcc-js/markdown-it-plugins/loader";

export default defineLoader({
    watch: ["./data/*.json"],
    async load() {
        return {
            ...await (await DataFile.attach("docs/obt/summary.json"))?.json()
        };
    }
});
