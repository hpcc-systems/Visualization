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

new JSEditor()
    .target("target")
    .javascript(code)
    .render()
    ;