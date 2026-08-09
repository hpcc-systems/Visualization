import { defineCase } from "../../../defineCase.ts";
export default defineCase({
    loaderConfig: { paths: { test: "." }, has: { foo: true, "host-browser": false } }
});
