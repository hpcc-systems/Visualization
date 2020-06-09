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
        switch (details.ext) {
            case ".omd":
            case ".ojs":
                const content = fs.readFileSync(relPath, "utf8");
                samples[`${details.name} (${details.ext})`] = {
                    type: details.ext,
                    content: encodeMD(content)
                }
        }
    });
    fs.writeFileSync('src/samples.ts', `\
export type SampleT = { type: ".omd" | ".ojs", content: string };
export const samples: { [key: string]: SampleT } = ${JSON.stringify(samples, undefined, 4)};
`, "utf8");
}
