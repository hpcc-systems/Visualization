const fs = require("fs");
const path = require("path");
const min = true;

var myArgs = process.argv.slice(2);
var inFile = myArgs[0];
var inFilePath = `workers/dist/${inFile}${min ? ".min" : ""}.js`;
var inFileOptionsPath = `workers/src/${inFile}Options.ts`;
var outFilePath = `src/graph2/layouts/${inFile}Worker.ts`;
var fileName = path.basename(inFilePath).split(".")[0];

function escapeQuote(str) {
    return str
        .split("\\").join("\\\\")
        .split("`").join("\\`")
        ;
}
fs.readFile(inFileOptionsPath, (err, optionsData) => {
    if (err) {
        console.log('fs.readFile ${inFileOptionsPath}: ' + err.message);
    }
    fs.readFile(inFilePath, (err, data) => {
        if (err) {
            console.log('fs.readFile: ' + err.message);
        }
        fs.writeFile(outFilePath, `\
${optionsData}
export function ${fileName}(data: Data, options: Options) {
    return new Promise(resolve => {
        // tslint:disable-next-line
        const workerCode = \`${escapeQuote(data.toString())}\`;

        const workerBlob = new Blob([workerCode], { type: "application/javascript" });
        const workerUrl = URL.createObjectURL(workerBlob);
        const worker = new Worker(workerUrl);

        worker.onmessage = event => {
            resolve(event.data);
            worker.terminate();
            URL.revokeObjectURL(workerUrl);
        };
        worker.postMessage([data, options]);
    });
}
`, err => {
            if (err) {
                console.log('fs.writeFile: ' + err.message);
            }
        });
    });
});
