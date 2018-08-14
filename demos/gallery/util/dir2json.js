var fs = require('fs');
var path = require('path');
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var systemjs = JSON.parse(fs.readFileSync('systemjs.config.json', 'utf8'));

function dirTree(filename) {
    var stats = fs.lstatSync(filename);
    var info = {
        path: filename,
        name: path.basename(filename)
    };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function (child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }

    return info;
}

for (const key in pkg.devDependencies) {
    if (key.indexOf("@hpcc-js") === 0) {
        const keyParts = key.split("/");
        systemjs.map[key] = `https://unpkg.com/${key}@${pkg.devDependencies[key]}/dist/index.min.js`;
    }
}

if (module.parent == undefined) {
    const config = {
        samples: dirTree(process.argv[2]),
        systemjs: systemjs
    };
    fs.writeFile('lib-umd/config.js', `var config = ${JSON.stringify(config)};`, "utf8", () => { });
}
