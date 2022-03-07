import { join } from "path";
import { existsSync, readdirSync, lstatSync, readFile, writeFile } from "fs";

function patch(filename) {
    readFile(filename, function (err, data) {
        if (err) throw err;
        writeFile(
            filename,
            data
                .toString()
                .replace(
                    "</head>",
                    '  <script src="/hpcc-js-wc/assets/index.umd.min.js"></script>\n</head>'
                ),
            function (err) {
                if (err) throw err;
            }
        );
    });
}

function fromDir(startPath, filter) {
    if (!existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = join(startPath, files[i]);
        var stat = lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            patch(filename);
        }
    }
}

fromDir("./.vitepress/dist", ".html");
