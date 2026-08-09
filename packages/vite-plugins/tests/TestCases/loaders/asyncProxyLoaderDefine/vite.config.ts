import { defineCase } from "../../../defineCase.ts";
export default defineCase({ "loaderConfig": { "paths": { "test": "." } }, "async": true, "requireFnPropName": "dj", moduleReplacement: [{ test: /^test\/asyncPlugin!/, replace: mid => { const data = { request: mid }; (function(data) {
				var match = /^test\/asyncPlugin!(.*)$/.exec(data.request);
				data.request = "dojo/loaderProxy?loader=test/asyncPlugin&name=" + match[1] + "!";
			})(data); return data.request; } }] });
