
var fs = require('fs');

var path = '../packages';
var g_data = {};
let log_file_output = 'publish_param_line_data.js'
fs.open(log_file_output, 'w', function () { });
fs.readdir(path, function (err, package_folder_arr) {
    package_folder_arr.forEach(package_folder_name => {
        const src_path = path + '/' + package_folder_name + '/src';
        fs.readdir(src_path, function (err, src_file_name_arr) {
            if (src_file_name_arr) {
                src_file_name_arr.forEach(file_name => {
                    const file_path = src_path + '/' + file_name;
                    if (file_path.indexOf('.ts') !== -1) {
                        console.log('--------- read file = ' + file_path);
                        read_file(file_path, function (file_contents_arr) {
                            fs.writeFile(log_file_output,
                                'exports.data = ' + (
                                    JSON
                                        .stringify(g_data)
                                        .split(`"..`).join(`\n    "..`)
                                        .split(']}').join(']\n};')
                                ),
                                function () { }
                            );
                        });
                    }
                })
            }
        });
    });
});

function read_file(file_name, _cb) {
    if (typeof g_data[file_name] === "undefined") {
        g_data[file_name] = [];
    }
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file_name)
    });
    let i = 0;
    let line_arr = [];
    lineReader.on('line', function (line) {
        i++;
        line_arr.push(line);
        if (line.indexOf('prototype.publish(') !== -1) g_data[file_name].push(i);
    });
    lineReader.on('close', function () {
        _cb(line_arr);
    });
}
function insert_lines_before(file_path, file_line_arr, line_number, new_line_arr) {
    var merged_line_arr = [];
    merged_line_arr = file_line_arr.slice(0, line_number).concat(new_line_arr);
    merged_line_arr = merged_line_arr.concat(
        file_line_arr.slice(line_number, file_line_arr.length)
    );
    overwrite_file(file_path, merged_line_arr.join('\n'));
}
function overwrite_file(file_path, contents) {
    var file_stream = fs.createWriteStream(file_path, {
        flags: 'w'
    });
    file_stream.write(contents);
    file_stream.end();
}

