import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { dsvFormat, autoType } from "d3-dsv";
import { LoaderResolver, } from "@observablehq/framework/dist/loader.js";
import { getResolvers } from "@observablehq/framework/dist/resolvers.js";
import { normalizeConfig } from "@observablehq/framework/dist/config.js";
import { parseMarkdown } from "@observablehq/framework/dist/markdown.js";

function getOptions({ path, ...config }) {
    return { ...normalizeConfig(config), path };
}

export class DataFile {

    private filePath: string;
    private options: any;
    private resolvers: any;
    readonly ext: string;

    protected constructor(filePath, options, resolvers) {
        this.filePath = filePath;
        this.options = options;
        this.resolvers = resolvers;
        this.ext = path.extname(filePath).substring(1);
    }

    static async attach(partialPath: string, root: string = path.resolve(".")) {
        const exists = existsSync(path.resolve(root, partialPath));
        const loaders = new LoaderResolver({ root, interpreters: {} });
        const loader = loaders.find(partialPath);
        if (loader) {
            await loader.load();
            const ext = path.extname(partialPath);
            const options = getOptions({ root, path: "dummy.md" });
            const page = parseMarkdown(`\${FileAttachment('${partialPath}')${ext}()}`, options);
            const resolvers = await getResolvers(page, options);
            resolvers.resolveFile(partialPath);
            return new DataFile(exists ? path.resolve(root, partialPath) : path.resolve(path.join(root, ".observablehq", "cache", partialPath)), options, resolvers);
        }
    }

    async myResolve(module: string) {
        const partialPath = await this.resolvers.resolveImport(module);
        return path.resolve(path.join(this.options.root, ".observablehq", "cache", partialPath));
    }

    async myImport(module: string) {
        if (module === "npm:apache-arrow") {
            return import("apache-arrow");
        }
        const fullPath = await this.myResolve(module);
        const href = pathToFileURL(fullPath).href;
        return import(href).catch((error) => {
            console.error(error);
        });
    }

    buffer(): Promise<Buffer> {
        return readFile(this.filePath);
    }

    arrayBuffer() {
        return this.buffer().then(buffer => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
    }

    text(encoding: BufferEncoding = "utf8") {
        return readFile(this.filePath, encoding);
    }

    json() {
        return this.text().then(txt => {
            return JSON.parse(txt);
        });
    }

    dsv({ delimiter = ",", array = false, typed = false } = {}) {
        return this.text().then(text => {
            const format = dsvFormat(delimiter);
            const parse: any = array ? format.parseRows : format.parse;
            return parse(text, typed && autoType);
        });
    }

    csv(options?) {
        return this.dsv({ ...options, delimiter: "," });
    }

    tsv(options?) {
        return this.dsv({ ...options, delimiter: "\t" });
    }

    arrow() {
        return Promise.all([this.myImport("npm:apache-arrow"), this.arrayBuffer()]).then(([Arrow, response]) => {
            return Arrow.tableFromIPC(response);
        });
    }

    parquet() {
        return this.myResolve("npm:parquet-wasm/esm/parquet_wasm_bg.wasm").then(wasmBytes => {
            const wasmFile = new DataFile(wasmBytes, this.options, this.resolvers);
            return Promise.all([
                this.myImport("npm:apache-arrow"),
                this.myImport("npm:parquet-wasm"),
                wasmFile.arrayBuffer(),
                this.arrayBuffer()
            ]).then(([Arrow, Parquet, wasm, buffer]) => {
                Parquet.initSync(wasm);
                return Arrow.tableFromIPC(Parquet.readParquet(new Uint8Array(buffer)).intoIPCStream());
            });
        });
    }

    fetch() {
        if (this[this.ext]) {
            return this[this.ext]();
        }
    }
}

const regex = /^(.+\.(csv|tsv|txt|json|arrow|parquet))(?:\..*)?$/;
interface FileInfo {
    path: string;
    data: any;
}
export async function findDataFiles(directory: string, recursive: boolean = false): Promise<FileInfo[]> {
    const files = await readdir(directory, { withFileTypes: true });
    let dataFiles: FileInfo[] = [];

    for (const file of files) {
        const fullPath = path.join(directory, file.name);
        if (file.isDirectory() && recursive) {
            const nestedFiles = await findDataFiles(fullPath, recursive);
            dataFiles = dataFiles.concat(nestedFiles);
        } else if (file.isFile()) {
            const match = file.name.match(regex);
            if (match) {
                const _path = path.join(directory, match[1]);
                dataFiles.push({
                    path: _path,
                    data: await DataFile.attach(_path)
                });
            }
        }
    }
    return dataFiles;
}

export async function fetchData(partialPath: string) {
    const dataFile = await DataFile.attach(partialPath);
    return dataFile?.fetch();
}

