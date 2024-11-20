import fs from 'fs';
import path from 'path';

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
        info.type = "file";
        info.imports = _parseImports(filename);
    }

    return info;

    function _parseImports(filename) {
        let dep_obj = {};
        const file_str = fs.readFileSync(filename).toString();
        let import_arr = file_str.split('import ').map(imp => {
            const sp2 = imp.split(' from ');
            if (sp2.length > 1) {
                const src_name = sp2[1].replace("\r\n", "\n").split('\n')[0]
                    .replace('"', '')
                    .replace('"', '')
                    .replace(';', '')
                    ;
                const dep_names = sp2[0]
                    .replace('{', '')
                    .replace('}', '')
                    .split(',')
                    ;
                dep_obj[src_name] = dep_names.map(n => n.trim().split(" as ")[0]);
            }
        });
        return dep_obj;
    }

}

console.log(process.argv[2]);
const info = dirTree(process.argv[2] ?? "./samples");
fs.writeFileSync(path.join((process.argv[2] ?? "./samples"), "samples.json"), JSON.stringify(info, null, 2));
