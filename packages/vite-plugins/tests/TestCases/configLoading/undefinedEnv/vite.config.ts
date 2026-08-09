import { defineCase } from "../../../defineCase.ts";
export default defineCase({
    entry: "./index", loaderConfig: function () {
        return Object.assign({}, require("./loaderConfig.cjs")(), { noConfigApi: 1 });
    }, requireFnPropName: "dj"
});
