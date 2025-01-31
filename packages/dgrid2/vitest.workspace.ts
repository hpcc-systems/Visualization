import { defineWorkspace } from "vitest/config";
// import { createHtmlPlugin } from "vite-plugin-html";
import baseWorkspace from "../../vitest.workspace.ts";

// baseWorkspace[1]["plugins"].push(
//     createHtmlPlugin({
//         minify: true,
//         entry: "src/index.ts",
//         template: "index-test.html",
//         inject: {
//             data: {
//                 title: "index",
//                 injectScript: `
//                 <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
//                 <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
//                 `
//             },
//             tags: [
//                 {
//                     injectTo: "body-prepend",
//                     tag: "div",
//                     attrs: {
//                         id: "tag",
//                     },
//                 },
//             ],
//         },
//     }));
// console.log(JSON.stringify(baseWorkspace[1]["test"], undefined, 2));

export default defineWorkspace([
    ...baseWorkspace,
]);