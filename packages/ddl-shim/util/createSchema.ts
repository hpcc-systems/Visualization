import * as fs from "fs";
import { resolve } from "path";

import * as TJS from "typescript-json-schema";

const settings: TJS.PartialArgs = {
    required: true,
    noExtraProps: true
};

function genSchema(src: string, dest: string, type: string) {
    const ddl = TJS.getProgramFromFiles([resolve(`src/${src}.ts`)], {
        skipLibCheck: true
    });
    const ddlSchema = TJS.generateSchema(ddl, type, settings);

    fs.writeFile(`src/${dest}.json`, JSON.stringify(ddlSchema), function (err) {
        if (err) {
            return console.error(err);
        }
    });

    const tpl = `/* tslint:disable */\n` +
        `export const ${dest} =  \n` +
        JSON.stringify(ddlSchema, null, "    ") +
        `;\n`;

    fs.writeFile(`src/${dest}.ts`, tpl, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

genSchema("ddl", "ddlSchema", "DDLSchema");
genSchema("ddl2", "ddl2Schema", "Schema");
