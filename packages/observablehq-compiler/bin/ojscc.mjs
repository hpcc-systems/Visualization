#!/usr/bin/env node
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

import fetch, { Blob, blobFrom, blobFromSync, File, fileFrom, fileFromSync, FormData, Headers, Request, Response } from "node-fetch";
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
    globalThis.Headers = Headers;
    globalThis.Request = Request;
    globalThis.Response = Response;
}
import { promises as fs } from "fs";
import { compile, download } from "../dist/index.js";
import yargsMode from "yargs/yargs";

async function doDownload(url, filePath) {
    const nb = await download(url);
    if (filePath) {
        fs.writeFile(filePath, JSON.stringify(nb, undefined, 4));
    } else {
        console.info(nb);
    }
}

async function doCompile(url, filePath) {
    const nb = await download(url);
    const define = await compile(nb, process.cwd());
    const js = define.toString();
    if (filePath) {
        fs.writeFile(filePath, js);
    } else {
        console.info(js);
    }
}

const yargs = yargsMode(process.argv.slice(2));
yargs
    .scriptName("ojscc")
    .wrap(Math.min(90, yargs.terminalWidth()))
    .command("download", "Download ObservableHQ Notebook",
        function (yargs) {
            return yargs
                .usage("ojscc download [-o myfile.ojsnb] https://observablehq.com/@user/notebook")
                .demandCommand(1, "URL required")
                .option("o", {
                    alias: "output",
                    describe: "Optional output file path"
                })
                ;
        }, function (argv) {
            doDownload(argv._[1], argv.o);
        }
    )
    .command("compile", "Compile ObservableHQ Notebook",
        function (yargs) {
            return yargs
                .usage("ojscc compile [-o myfile.js] myfile.ojsnb")
                .demandCommand(1, "URL required")
                .option("o", {
                    alias: "output",
                    describe: "Optional output file path"
                })
                ;
        },
        async function (argv) {
            doCompile(argv._[1], argv.o);
        }
    )
    .help("h")
    .alias("h", "help")
    .epilog("https://github.com/hpcc-systems/Visualization/tree/trunk/packages/observablehq-compiler")
    ;

yargs.argv;
