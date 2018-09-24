import * as fs from "fs";
import { ddl2Schema } from "../src/ddl2Schema";
import { upgrade } from "../src/upgrade";

const args = process.argv.slice(2);

switch (args[0]) {
    case "--echo":
        process.stdout.write(args[1]);
        break;
    case "--schema":
        process.stdout.write(JSON.stringify(ddl2Schema));
        break;
    case "--upgrade":
    case "--upgradeNoLower":
        const srcPath = args[1];
        const destPath = args[2];
        const baseUrl = args[3];
        const wuid = args[4];
        if (srcPath && destPath && srcPath !== destPath) {
            fs.readFile(srcPath, "utf8", function (err, data) {
                if (err) throw err;
                const ddl2 = upgrade(JSON.parse(data), baseUrl || "http://localhost:8010", wuid || "WUID", args[0] === "--upgrade");
                fs.writeFile(destPath, JSON.stringify(ddl2), function (err) {
                    if (err) throw err;
                    console.log("complete");
                });
            });
        }
        break;
    case "--help":
        break;
    default:
        process.stdout.write(`
Usage:  <command>

where <command> is one of:
    --schema:  output DDL2 schmea.
    --upgrade ddl1 [baseUrl wuid]:  updgrade ddl version 1 to ddl version 2.
    --upgradeNoLower ddl1 [baseUrl wuid]:  updgrade ddl version 1 to ddl version 2 without changing field IDs upper/lower casing.
    --help:  this message.
`);
}
