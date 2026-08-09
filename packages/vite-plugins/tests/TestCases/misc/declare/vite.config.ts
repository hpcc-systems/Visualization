import { defineCase } from "../../../defineCase.ts";
export default defineCase({
    loaderConfig: { paths: { test: "." }, has: { "host-browser": false } }
});
