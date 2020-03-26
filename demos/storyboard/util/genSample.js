var fs = require('fs');
var path = require('path');

function encodeMD(str) {
    return str
        .split("\r\n").join("\n")
        ;
}

const samplesFolder = "./samples";
var stats = fs.lstatSync(samplesFolder);
if (stats.isDirectory()) {
    const samples = {};
    fs.readdirSync(samplesFolder).forEach(file => {
        const relPath = path.join(samplesFolder, file);
        const details = path.parse(relPath);
        if (details.ext === ".omd") {
            const content = fs.readFileSync(relPath, "utf8");
            samples[details.name] = encodeMD(content);
        }
    });
    fs.writeFileSync('src/samples.ts', `// @ts-ignore
export const samples = ${JSON.stringify(samples, undefined, 4)};
`, "utf8");
}
