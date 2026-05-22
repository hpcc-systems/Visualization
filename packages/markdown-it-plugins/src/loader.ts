import { existsSync } from "node:fs";
import { readdir, readFile, mkdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { dsvFormat, autoType } from "d3-dsv";

const CACHE_DIR = ".observablehq/cache";

// Interpreter commands for data loader scripts (mirrors @observablehq/framework defaults)
function getInterpreterCommand(ext: string): [string, string[]] | null {
    switch (ext) {
        case ".js": return ["node", ["--no-warnings=ExperimentalWarning"]];
        case ".ts": return ["tsx", []];
        case ".py": return ["python3", []];
        case ".r":
        case ".R": return ["Rscript", []];
        default: return null;
    }
}

function findLoader(partialPath: string, root: string): { loaderPath: string; loaderExt: string } | null {
    for (const ext of [".js", ".ts", ".py", ".r", ".R"]) {
        const loaderPath = path.resolve(root, `${partialPath}${ext}`);
        if (existsSync(loaderPath)) {
            return { loaderPath, loaderExt: ext };
        }
    }
    return null;
}

async function runLoader(loaderPath: string, loaderExt: string, cachePath: string): Promise<void> {
    const cmd = getInterpreterCommand(loaderExt);
    if (!cmd) throw new Error(`No interpreter for loader extension: ${loaderExt}`);
    await mkdir(path.dirname(cachePath), { recursive: true });
    const [command, args] = cmd;
    const child = spawn(command, [...args, loaderPath], {
        windowsHide: true,
        stdio: ["ignore", "pipe", "inherit"]
    });
    child.stdout!.pipe(createWriteStream(cachePath));
    await new Promise<void>((resolve, reject) => {
        child.on("error", reject);
        child.on("exit", (code) =>
            code === 0 ? resolve() : reject(new Error(`Loader "${loaderPath}" exited with code ${code}`))
        );
    });
}

export class DataFile {

    private filePath: string;
    readonly ext: string;

    protected constructor(filePath: string) {
        this.filePath = filePath;
        this.ext = path.extname(filePath).substring(1);
    }

    static async attach(partialPath: string, root: string = path.resolve(".")) {
        const absolutePath = path.resolve(root, partialPath);
        if (existsSync(absolutePath)) {
            return new DataFile(absolutePath);
        }
        const loaderInfo = findLoader(partialPath, root);
        if (loaderInfo) {
            const cachePath = path.resolve(root, CACHE_DIR, partialPath);
            if (!existsSync(cachePath)) {
                await runLoader(loaderInfo.loaderPath, loaderInfo.loaderExt, cachePath);
            }
            return new DataFile(cachePath);
        }
        return undefined;
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
        return Promise.all([import("apache-arrow"), this.arrayBuffer()]).then(([Arrow, response]) => {
            return Arrow.tableFromIPC(response);
        });
    }

    parquet() {
        throw new Error("parquet() is not supported; install @observablehq/framework for npm: package resolution.");
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

