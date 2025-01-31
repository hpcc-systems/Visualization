import fs from "node:fs";
import path from "node:path";
var pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

const systemjs = { map: {} };

function dirTree(filename) {
    var stats = fs.lstatSync(filename);
    var info = {
        path: filename,
        name: path.basename(filename)
    };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function (child) {
            return dirTree(filename + "/" + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
        info.imports = _parseImports(filename);
    }

    return info;

    function _parseImports(filename) {
        let dep_obj = {};
        const file_str = fs.readFileSync(filename).toString();
        let import_arr = file_str.split("import ").map(imp => {
            const sp2 = imp.split(" from ");
            if (sp2.length > 1) {
                const src_name = sp2[1].replace("\r\n", "\n").split("\n")[0]
                    .replace('"', "")
                    .replace('"', "")
                    .replace(";", "")
                    ;
                const dep_names = sp2[0]
                    .replace("{", "")
                    .replace("}", "")
                    .split(",")
                    ;
                dep_obj[src_name] = dep_names.map(n => n.trim().split(" as ")[0]);
            }
        });
        return dep_obj;
    }
}

for (const key in pkg.devDependencies) {
    if (key.indexOf("@hpcc-js") === 0) {
        const keyParts = key.split("/");
        systemjs.map[key] = `https://cdn.jsdelivr.net/npm/${key}@${pkg.devDependencies[key]}/dist/index.min.js`;
    }
}

const config = {
    samples: dirTree(process.argv[2]),
    systemjs: systemjs
};
fs.writeFile("src-umd/config.js", `var config = ${JSON.stringify(config, undefined, 2)};`, "utf8", () => { });
