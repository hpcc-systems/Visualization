import { JSEditor } from "@hpcc-js/codemirror";
import { Palette } from "@hpcc-js/common";

const palette = Palette.rainbow("YlOrRd");

const code = `\
const arr = [...Array(100000)].map(Math.random);

for(const n of arr){
    foobar(n);
}

arr.forEach(foobar)

function foobar(n){
    return n+1;
}
`;

new JSEditor()
    .target("target")
    .javascript(code)
    .gutterMarkerWidth(50)
    .render(w => {
        const perfLines = [
            {line:3,comment:"5.3 ms",backgroundColor:palette(5.3, 2.6, 5.3)},
            {line:6,comment:"2.6 ms",backgroundColor:palette(2.6, 2.6, 5.3)},
        ];
        perfLines.forEach(n=>{
            w.addGutterMarker(
                n.line,
                n.comment,
                n.backgroundColor
            );
        });
    })
    ;