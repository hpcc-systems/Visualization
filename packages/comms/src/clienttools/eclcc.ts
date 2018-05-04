import * as cp from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as semver from "semver";
import * as tmp from "tmp";

import { scopedLogger } from "@hpcc-js/util";
import { exists } from "@hpcc-js/util";
import { xml2json, XMLNode } from "@hpcc-js/util";
import { attachWorkspace, Workspace } from "./eclMeta";

const logger = scopedLogger("clienttools/eclcc");
const exeExt = os.type() === "Windows_NT" ? ".exe" : "";

interface IExecFile {
    stderr: string;
    stdout: string;
}

export interface IECLError {
    filePath: string;
    line: number;
    col: number;
    msg: string;
    severity: string;
}

export interface IEclccError {
    msg: string;
    severity: string;
}

/*
function correctBinname(binname: string) {
    if (process.platform === "win32")
        return binname + ".exe";
    else
        return binname;
}
*/

export function walkXmlJson(node: any, callback: (key: string, childNode: any, stack: any[]) => void, stack?: any[]) {
    stack = stack || [];
    stack.push(node);
    for (const key in node) {
        if (node.hasOwnProperty(key)) {
            const childNode = node[key];
            callback(key, childNode, stack);
            if (childNode instanceof Array) {
                childNode.forEach(child => {
                    walkXmlJson(child, callback, stack);
                });
            } else if (typeof childNode === "object") {
                walkXmlJson(childNode, callback, stack);
            }
        }
    }
    stack.pop();
}

export class LocalWorkunit {
    jsonWU: any;

    constructor(jsonWU: any) {
        this.jsonWU = jsonWU;
    }

    bpGetValidLocations(filePath: any) {
        const retVal: any[] = [];
        if (exists("W_LOCAL.Graphs", this.jsonWU)) {
            let id = "";
            walkXmlJson(this.jsonWU.W_LOCAL.Graphs, (key: string, item: any, _stack: any[]) => {
                if (key === "$" && item.id) {
                    id = item.id;
                }
                if (key === "$" && item.name === "definition") {
                    const match = /([a-z]:\\(?:[-\w\.\d]+\\)*(?:[-\w\.\d]+)?|(?:\/[\w\.\-]+)+)\((\d*),(\d*)\)/.exec(item.value);
                    if (match) {
                        const [, file, row, _col] = match;
                        const line: number = +row;
                        const col: number = +_col;
                        if (filePath === file) {
                            retVal.push({ file, line, col, id });
                        }
                    }
                }
                // console.log(`${key}:  ` + JSON.stringify(item));
            });
        }
        return retVal;
    }
}

export interface IArchive {
    content: string;
    err: IECLError[];
}

export class ClientTools {
    eclccPath: string;
    protected binPath: string;
    protected cwd: string;
    protected includeFolders: string[];
    protected _legacyMode: boolean;
    protected _args: string[];
    protected _versionPrefix: string;
    protected _version: string;

    constructor(eclccPath: string, cwd?: string, includeFolders: string[] = [], legacyMode: boolean = false, args: string[] = []) {
        this.eclccPath = eclccPath;
        this.binPath = path.dirname(this.eclccPath);
        this.cwd = path.normalize(cwd || this.binPath);
        this.includeFolders = includeFolders;
        this._legacyMode = legacyMode;
        this._args = args;
    }

    clone(cwd?: string, includeFolders?: string[], legacyMode: boolean = false, args: string[] = []) {
        return new ClientTools(this.eclccPath, cwd, includeFolders, legacyMode, args);
    }

    exists(filePath: string) {
        try {
            fs.accessSync(filePath);
            return true;
        } catch (e) { }
        return false;
    }

    args(additionalItems: string[] = []): string[] {
        const retVal: string[] = [...this._args];
        if (this._legacyMode) {
            retVal.push("-legacy");
        }
        return retVal.concat(this.includeFolders.map(includePath => {
            return "-I" + path.normalize(includePath);
        })).concat(additionalItems);
    }

    version() {
        if (this._version) {
            return Promise.resolve(this._version);
        }
        return this.execFile(this.eclccPath, this.binPath, this.args(["--version"]), "eclcc", `Cannot find ${this.eclccPath}`).then((response: IExecFile) => {
            if (response && response.stdout && response.stdout.length) {
                const versions = response.stdout.split(" ");
                if (versions.length > 1) {
                    const fullVersionParts = versions[1].split("_");
                    if (fullVersionParts.length > 1) {
                        const versionPrefix = fullVersionParts.shift();
                        const version = fullVersionParts.join("_");
                        if (semver.valid(version)) {
                            this._versionPrefix = versionPrefix!;
                            this._version = version;
                        }
                    }
                } else if (versions.length) {
                    if (semver.valid(versions[0])) {
                        this._version = versions[0];
                    }
                }
            }
            return this._version;
        });
    }

    versionSync() {
        return this._version;
    }

    _paths = {};
    paths() {
        return this.execFile(this.eclccPath, this.cwd, this.args(["-showpaths"]), "eclcc", `Cannot find ${this.eclccPath}`).then((response: IExecFile) => {
            if (response && response.stdout && response.stdout.length) {
                const paths = response.stdout.split(/\r?\n/);
                for (const path of paths) {
                    const parts = path.split("=");
                    if (parts.length === 2) {
                        this._paths[parts[0]] = parts[1];
                    }
                }
            }
            return this._paths;
        });
    }

    private loadXMLDoc(filePath: any, removeOnRead?: boolean): Promise<XMLNode> {
        return new Promise((resolve, _reject) => {
            const fileData = fs.readFileSync(filePath, "ascii");
            const retVal = xml2json(fileData as any);
            if (removeOnRead) {
                fs.unlink(filePath, (err) => { });
            }
            resolve(retVal);
        });
    }

    createWU(filename: string): Promise<LocalWorkunit> {
        const tmpName = tmp.tmpNameSync({ prefix: "eclcc-wu-tmp", postfix: "" });
        const args = ["-o" + tmpName, "-wu"].concat([filename]);
        return this.execFile(this.eclccPath, this.cwd, this.args(args), "eclcc", `Cannot find ${this.eclccPath}`).then((_response: IExecFile) => {
            const xmlPath = path.normalize(tmpName + ".xml");
            const contentPromise = this.exists(xmlPath) ? this.loadXMLDoc(xmlPath, true) : Promise.resolve({});
            return contentPromise.then((content) => {
                return new LocalWorkunit(content);
            });
        });
    }

    parseEclccErrors(err?: string): IEclccError[] {
        const retVal: IEclccError[] = [];
        if (err && err.length) {
            for (const line of err.split(os.EOL)) {
                const match = /(error|warning|info): (.*)/i.exec(line);
                if (match) {
                    const [, severity, msg] = match;
                    retVal.push({ msg, severity });
                }
            }
        }
        return retVal;
    }

    createArchive(filename: string): Promise<IArchive> {
        const args = ["-E"].concat([filename]);
        return this.execFile(this.eclccPath, this.cwd, this.args(args), "eclcc", `Cannot find ${this.eclccPath}`).then((response: IExecFile): IArchive => {
            return {
                content: response.stdout,
                err: this.parseEclccErrors(response.stderr).map(err => {
                    return {
                        filePath: "",
                        line: 0,
                        col: 0,
                        msg: err.msg,
                        severity: err.severity
                    };
                })
            };
        });
    }

    parseECLErrors(err?: string): [IECLError[], string[]] {
        const retVal: IECLError[] = [];
        const retVal2: string[] = [];
        if (err && err.length) {
            for (const errLine of err.split(os.EOL)) {
                const match = /([a-z]:\\(?:[-\w\.\d]+\\)*(?:[-\w\.\d]+)?|(?:\/[\w\.\-]+)+)\((\d*),(\d*)\): (error|warning|info) C(\d*): (.*)/.exec(errLine);
                if (match) {
                    const [, filePath, row, _col, severity, code, _msg] = match;
                    const line: number = +row;
                    const col: number = +_col;
                    const msg = code + ":  " + _msg;
                    retVal.push({ filePath, line, col, msg, severity });
                } else {
                    const match = /\d error(s?), \d warning(s?)/.exec(errLine);
                    if (!match) {
                        logger.warning(`parseECLErrors:  Unable to parse "${errLine}"`);
                        retVal2.push(errLine);
                    }
                }
            }
        }
        return [retVal, retVal2];
    }

    attachWorkspace(): Workspace {
        return attachWorkspace(this.cwd);
    }

    fetchMeta(filePath: string): Promise<Workspace> {
        return Promise.all([
            attachWorkspace(this.cwd),
            this.execFile(this.eclccPath, this.cwd, this.args(["-M", filePath]), "eclcc", `Cannot find ${this.eclccPath}`)
        ]).then(([metaWorkspace, execFileResponse]: [Workspace, IExecFile]) => {
            if (execFileResponse && execFileResponse.stdout && execFileResponse.stdout.length) {
                metaWorkspace.parseMetaXML(execFileResponse.stdout);
            }
            return metaWorkspace;
        });
    }

    syntaxCheck(filePath: string, args: string[] = ["-syntax"]): Promise<[IECLError[], string[]]> {
        return Promise.all([
            attachWorkspace(this.cwd),
            this.execFile(this.eclccPath, this.cwd, this.args([...args, "-M", filePath]), "eclcc", `Cannot find ${this.eclccPath}`)
        ]).then(([metaWorkspace, execFileResponse]: [Workspace, IExecFile]) => {
            let retVal: [IECLError[], string[]] = [[], []];
            if (execFileResponse) {
                retVal = this.parseECLErrors(execFileResponse.stderr);
            }
            if (execFileResponse && execFileResponse.stdout && execFileResponse.stdout.length) {
                metaWorkspace.parseMetaXML(execFileResponse.stdout);
            }
            return retVal;
        });
    }

    private execFile(cmd: string, cwd: string, args: string[], _toolName: string, _notFoundError?: string) {
        return new Promise((resolve, _reject) => {
            logger.debug(`${cmd} ${args.join(" ")}`);
            const child = cp.spawn(cmd, args, { cwd });
            let stdOut = "";
            let stdErr = "";
            child.stdout.on("data", (data) => {
                stdOut += data.toString();
            });
            child.stderr.on("data", (data) => {
                stdErr += data.toString();
            });
            child.on("close", (_code, _signal) => {
                resolve({
                    stdout: stdOut.trim(),
                    stderr: stdErr.trim()
                });
            });
        });
    }
}

const allClientToolsCache: ClientTools[] = [];
function locateClientToolsInFolder(rootFolder: string): Array<Promise<any>> {
    const promiseArray: Array<Promise<any>> = [];
    if (rootFolder) {
        const hpccSystemsFolder = path.join(rootFolder, "HPCCSystems");
        if (fs.existsSync(hpccSystemsFolder) && fs.statSync(hpccSystemsFolder).isDirectory()) {
            if (os.type() !== "Windows_NT") {
                const eclccPath = path.join(hpccSystemsFolder, "bin", "eclcc");
                if (fs.existsSync(eclccPath)) {
                    const clientTools = new ClientTools(eclccPath);
                    allClientToolsCache.push(clientTools);
                    promiseArray.push(clientTools.version());
                }
            }
            fs.readdirSync(hpccSystemsFolder).forEach((versionFolder) => {
                const eclccPath = path.join(hpccSystemsFolder, versionFolder, "clienttools", "bin", "eclcc" + exeExt);
                if (fs.existsSync(eclccPath)) {
                    const name = path.basename(versionFolder);
                    if (semver.valid(name)) {
                        const clientTools = new ClientTools(eclccPath);
                        allClientToolsCache.push(clientTools);
                        promiseArray.push(clientTools.version());
                    }
                }
            });
        }
    }
    return promiseArray;
}

export function locateAllClientTools() {
    if (allClientToolsCache.length) return Promise.resolve(allClientToolsCache);
    let promiseArray: Array<Promise<any>> = [];
    switch (os.type()) {
        case "Windows_NT":
            const rootFolder86 = process.env["ProgramFiles(x86)"] || "";
            if (rootFolder86) {
                promiseArray = promiseArray.concat(locateClientToolsInFolder(rootFolder86));
            }
            const rootFolder = process.env["ProgramFiles"] || "";
            if (rootFolder) {
                promiseArray = promiseArray.concat(locateClientToolsInFolder(rootFolder));
            }
            if (!rootFolder86 && !rootFolder) {
                promiseArray = promiseArray.concat(locateClientToolsInFolder("c:\\Program Files (x86)"));
            }
            break;
        case "Linux":
        case "Darwin":
            promiseArray = promiseArray.concat(locateClientToolsInFolder("/opt"));
            break;
        default:
            break;
    }

    return Promise.all(promiseArray).then(() => {
        allClientToolsCache.sort((l: ClientTools, r: ClientTools) => {
            return semver.compare(r.versionSync(), l.versionSync());
        });
        return allClientToolsCache;
    });
}

let eclccPathMsg = "";
function logEclccPath(eclccPath: string) {
    const msg = `Using eclccPath setting:  ${eclccPath}`;
    if (eclccPathMsg !== msg) {
        logger.info(msg);
        eclccPathMsg = msg;
    }
}

export function locateClientTools(overridePath: string = "", cwd: string = ".", includeFolders: string[] = [], legacyMode: boolean = false): Promise<ClientTools> {
    if (overridePath && fs.existsSync(overridePath)) {
        logEclccPath(overridePath);
        return Promise.resolve(new ClientTools(overridePath, cwd, includeFolders, legacyMode));
    }
    return locateAllClientTools().then((allClientToolsCache2) => {
        //  TODO find best match  ---
        if (!allClientToolsCache2.length) {
            throw new Error("Unable to locate ECL Client Tools.");
        }
        logEclccPath(allClientToolsCache2[0].eclccPath);
        return allClientToolsCache2[0].clone(cwd, includeFolders, legacyMode);
    });
}
