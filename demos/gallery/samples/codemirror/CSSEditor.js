import { CSSEditor } from "@hpcc-js/codemirror";

new CSSEditor()
    .target("target")
    .css(`
body {
    margin: 0;
    padding: 15px;
}    
#target {
    position: relative;
    width: 100%;
    height: calc(100vh - 32px);
    border: 1px solid #ed1c24;
}
    `)
    .render()
    ;
