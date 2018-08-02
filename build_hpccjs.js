const fs = require('fs');
const os = require('os');
const files = [
    "packages/util/dist/index.js",
    "packages/common/dist/index.js",
    "packages/api/dist/index.js",
    "packages/dgrid-shim/dist/index.js",
    "packages/dgrid/dist/index.js",
    "packages/chart/dist/index.js",
    "packages/layout/dist/index.js",
    "packages/form/dist/index.js",
    "packages/other/dist/index.js",
    "init_hpccjs.js"
];
let file_idx = 0;
let output_str_arr = [];
load_next_file();

function load_next_file(){
    if(typeof files[file_idx] !== "undefined"){
        fs.readFile(files[file_idx], 'utf8', function(err, contents) {
            if (err) throw err;
            output_str_arr.push(contents);
            file_idx++;
            load_next_file();
        });
    } else {
        fs.writeFile('hpccjs.js', output_str_arr.join(os.EOL), function(err, contents) {
            if (err) throw err;
            console.log('hpccjs.js saved!');
        });
    }
}