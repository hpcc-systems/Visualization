"use strict";

import { mkdirp, writeFile } from "fs-extra";
import * as path from "path";
import * as soap from "soap";
import minimist from "minimist";

import { Case, changeCase } from "./util";

type JsonObj = { [name: string]: any };

const lines: string[] = [];

const cwd = process.cwd();

const args = minimist(process.argv.slice(2));

const knownTypes: string[] = [];
const parsedTypes: JsonObj = {};

const primitiveMap: { [key: string]: string } = {
    "int": "number",
    "integer": "number",
    "unsignedInt": "number",
    "nonNegativeInteger": "number",
    "long": "number",
    "double": "number",
    "base64Binary": "number[]",
    "dateTime": "string",
}
const knownPrimitives: string[] = [];

const parsedEnums: JsonObj = {};

const debug = args?.debug ?? false;
const printToConsole = args?.print ?? false;
const outDir = args?.outDir ? args?.outDir : "./temp/wsdl";

const ignoredWords = ["targetNSAlias", "targetNamespace"];

function printDbg(...args: any[]) {
    if (debug) {
        console.log(...args);
    }
}

function wsdlToTs(uri: string) {
    return new Promise<soap.Client>((resolve, reject) => {
        soap.createClient(uri, {}, (err, client) => {
            if (err) reject(err);
            resolve(client);
        });
    }).then(client => {
        const wsdlDescr = client.describe();
        return [client.wsdl, wsdlDescr];
    });
}

function printUsage() {
    console.log("Usage: node ./lib-cjs/index.ts --uri=someUri\n");
    console.log("Available flags: ");
    console.log("====================");
    console.log("--uri=someUri\t\t\tA URI for a WSDL to be converted to TypeScript interfaces (either URL or /path/to/file)");
    console.log("--outDir=./some/path\t\tThe directory into which the generated TS interfaces will be written (defaults to \"./temp/wsdl/{version}/\").");
    console.log("--print\t\t\t\tRather than writing files, print the generated TS interfaces to the CLI");
}

if (!args.url) {
    console.error("No WSDL URI provided.\n");
    printUsage();
    process.exit(0);
}

if (args.help) {
    printUsage();
    process.exit(0);
}

function parseEnum(enumString: string, enumEl) {
    const enumParts = enumString.split("|");
    printDbg(`parsing enum parts ${enumParts[0]}`, enumParts);
    return {
        type: enumParts[0],
        enumType: enumParts[1].replace(/xsd:/, ""),
        values: enumParts[2].split(",").map((v, idx) => {
            const member = v.split(" ").map(w => changeCase(w, Case.PascalCase)).join("");
            if (enumParts[1].replace(/xsd:/, "") === "int") {
                let memberName = "";
                enumEl.children.filter(el => el.name === "annotation")[0].children.forEach(el => {
                    memberName = changeCase(el.children[idx].$description, Case.PascalCase).replace(/ /g, "");
                });
                return `${memberName} = ${member}`;
            }
            return `${member} = "${member}"`;
        })
    };
}

function parseTypeDefinition(operation: JsonObj, opName: string, types) {

    const typeDefn: JsonObj = {};
    printDbg(`processing ${opName}`, operation);
    for (const prop in operation) {
        const propName = (!prop.endsWith("[]")) ? prop : prop.slice(0, -2);
        if (typeof operation[prop] === "object") {
            const op = operation[prop];
            if (knownTypes.indexOf(propName) < 0) {
                knownTypes.push(propName);
                const defn = parseTypeDefinition(op, propName, types);
                if (prop.endsWith("[]")) {
                    typeDefn[propName] = prop;
                } else {
                    typeDefn[propName] = defn;
                }
                parsedTypes[propName] = defn;
            } else {
                typeDefn[propName] = prop;
            }

        } else {
            if (ignoredWords.indexOf(prop) < 0) {
                const primitiveType = operation[prop].replace(/xsd:/gi, "");
                if (prop.indexOf("[]") > 0) {
                    typeDefn[prop.slice(0, -2)] = primitiveType + "[]";
                } else if (operation[prop].match(/[.*\|.*\|.*]/)) {
                    // note: the above regex is matching the node soap stringified
                    // structure of enums, parsed by client.describe(),
                    // e.g.: SomeEnumIdentifier|xsd:int|1,2,3,4
                    const enumTypeName = operation[prop].split("|")[0]
                    const { type, enumType, values } = parseEnum(operation[prop], types[enumTypeName]);
                    parsedEnums[type] = values;
                    typeDefn[prop] = type;
                } else {
                    typeDefn[prop] = primitiveType;
                }
                if (Object.keys(primitiveMap).indexOf(primitiveType) > -1 && knownPrimitives.indexOf(primitiveType) < 0) {
                    knownPrimitives.push(primitiveType);
                }
            }
        }
    }

    if (knownTypes.indexOf(opName) < 0) {
        knownTypes.push(opName);
        parsedTypes[opName] = typeDefn;
    }
    return typeDefn;
}

wsdlToTs(args.url)
    .then(clientObjs => {
        const [wsdl, descr] = clientObjs;
        const bindings = wsdl.definitions.bindings;
        const wsdlNS = wsdl.definitions.$targetNamespace;
        let namespace = "";
        let origNS = "";
        for (const ns in descr) {
            origNS = ns;
            namespace = changeCase(ns, Case.PascalCase);
            const service = descr[ns];
            printDbg("namespace: ", origNS, "\n");
            for (const op in service) {
                printDbg("binding: ", changeCase(op, Case.PascalCase), "\n");
                const binding = service[op];
                for (const svc in binding) {
                    const operation = binding[svc];
                    const types = wsdl.definitions.schemas[wsdlNS].types;
                    const request = operation["input"];
                    const reqName = bindings[op].methods[svc].input.$name;
                    const response = operation["output"];
                    const respName = bindings[op].methods[svc].output.$name;

                    parseTypeDefinition(request, reqName, types);
                    parseTypeDefinition(response, respName, types);
                }
            }
        }

        knownPrimitives.forEach(primitive => {
            lines.push(`type ${primitive} = ${primitiveMap[primitive]};`);
        });
        lines.push("\n\n");

        for (const name in parsedEnums) {
            lines.push(`export enum ${name} {
                ${parsedEnums[name].join(",\n")}
            }\n`);
        }

        lines.push(`export namespace ${namespace} {\n`);

        for (const type in parsedTypes) {
            lines.push(`export interface ${type} {\n`);
            let typeString = JSON.stringify(parsedTypes[type], null, 4)         // convert object to string
                .replace(/"/g, "")                                              // remove double-quotes from JSON keys & values
                .replace(/,?\n/g, ";\n")                                        // replace comma delimiters with semi-colons
                .replace(/\{;/g, "{");                                          // correct lines where ; added erroneously

            if (type.endsWith("Request")) {
                typeString = typeString.replace(/:/g, "?:");                    // make request properties optional
            }
            lines.push(typeString.substring(1, typeString.length - 1) + "\n");
            lines.push("}\n");
        }

        lines.push("}");

        lines.push("\n\n");

        lines.push(`export class ${namespace.replace("Ws", "")}Service extends Service {\n`);

        const methods = [];

        for (const service in bindings) {
            const binding = bindings[service];
            for (const method in binding.methods) {
                const soapAction = binding.methods[method].soapAction;
                // a domain name is required by Node's URL object for parsing searchParams, etc
                const url = `https://example.org/${soapAction}`;
                const inputName = binding.methods[method].input["$name"];
                const outputName = binding.methods[method].output["$name"];
                methods.push({
                    url: soapAction,
                    version: new URL(url).searchParams.get("ver_"),
                    name: method,
                    input: inputName,
                    output: outputName
                });
            }
        }

        const serviceVersion = `v${methods[0]?.version}` ?? "";
        const finalPath = path.join(outDir, origNS, serviceVersion);
        const relativePath = path.relative(path.join(cwd, finalPath), path.join(cwd, "./src")).replace(/\\/g, "/");
        lines.unshift("\n\n");
        lines.unshift(`import { Service } from "${relativePath}/espConnection";`);
        lines.unshift(`import { IConnection, IOptions } from "${relativePath}/connection";`);

        if (methods.length > 0) {
            lines.push("constructor(optsConnection: IOptions | IConnection) {");
            lines.push(`super(optsConnection, "${origNS}", "${methods[0].version}");`);
            lines.push("}");
            lines.push("\n\n");

            methods.forEach(method => {
                lines.push(`${method.name}(request: ${namespace}.${method.input}): Promise<${namespace}.${method.output}> {`);
                lines.push(`\treturn this._connection.send("${method.name}", request);`);
                lines.push("}\n");
            })
        }

        lines.push("}\n");

        if (printToConsole) {
            console.log(lines.join("\n").replace(/\n\n\n/g, "\n"));
        } else {
            mkdirp(finalPath).then(() => {
                const tsFile = path.join(finalPath, origNS + ".ts");
                writeFile(tsFile, lines.join("\n").replace(/\n\n\n/g, "\n"), (err) => {
                    if (err) throw err;
                })
            })
        }
    }).catch(err => {
        console.error(err);
        process.exitCode = -1;
    });