import { JSEditor } from "@hpcc-js/codemirror";

const code = `
function foo(a, b) {
    return a + b;
}
function bar(c, d) {
    return foo(c, d) + (c * d);
}
`;

let count = 0;
new JSEditor()
    .target("target")
    .javascript(code)
    .render(w=>{
        setInterval(function(){
            count++;
            count%2 ? w.highlightSubstring("a") : w.removeAllHighlight();
        },1500)
    })
    ;