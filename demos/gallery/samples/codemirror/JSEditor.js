import { JSEditor } from "@hpcc-js/codemirror";

const code = `import { Pie } from "@hpcc-js/chart";

new Pie()
    .target("target")
    .columns(["Subject", "Result"])
    .data([
        ["English", 45],
        ["Irish", 28],
        ["Math", 98],
        ["Geography", 48],
        ["Science", 82]
    ])
    .render()
    ;
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