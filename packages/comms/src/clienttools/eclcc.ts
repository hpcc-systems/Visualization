import * as cp from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as tmp from "tmp";

import { exists, scopedLogger, xml2json, XMLNode } from "@hpcc-js/util";
import { attachWorkspace, Workspace } from "./eclMeta";

const logger = scopedLogger("clienttools/eclcc");
const exeExt = os.type() === "Windows_NT" ? ".exe" : "";

export class Version {
    readonly prefix: string = "";
    readonly major: number = 0;
    readonly minor: number = 0;
    readonly patch: number = 0;
    readonly postfix: string = "";

    constructor(build: string) {
        const parts = build.split(" ");
        if (parts.length) {
            const match = /(?:(\w+)_)?(\d+)\.(\d+)\.(\d+)(?:-(.*))?/.exec(parts[parts.length - 1]);
            if (match) {
                this.prefix = match[1] || "";
                this.major = +match[2] || 0;
                this.minor = +match[3] || 0;
                this.patch = +match[4] || 0;
                this.postfix = match[5] || "";
            }
        }
    }

    parse(build: string) {
    }

    exists(): boolean {
        return this.major !== 0 || this.minor !== 0 || this.patch !== 0 || this.postfix !== "";
    }

    compare(other: Version): number {
        if (this.major > other.major) return 1;
        if (this.major < other.major) return -1;
        if (this.minor > other.minor) return 1;
        if (this.minor < other.minor) return -1;
        if (this.patch > other.patch) return 1;
        if (this.patch < other.patch) return -1;
        if (this.postfix === "" && other.postfix !== "") return 1;
        return this.postfix.localeCompare(other.postfix);
    }

    toString(): string {
        return `${this.prefix}_${this.major}.${this.minor}.${this.patch}-${this.postfix}`;
    }
}

interface IExecFile {
    stderr: string;
    stdout: string;
}

export interface IECLErrorWarning {
    filePath: string;
    line: number;
    col: number;
    msg: string;
    severity: string;
}

const ERROR = "error";
const WARN = "warning";

export class Errors {
    protected _checked: string[];
    protected errWarn: IECLErrorWarning[] = [];
    protected errOther: string[] = [];

    constructor(checked: string[]) {
        this._checked = checked;
    }

    checked(): string[] {
        return this._checked;
    }

    all(): IECLErrorWarning[] {
        return this.errWarn;
    }

    errors(): IECLErrorWarning[] {
        return this.errWarn.filter(e => e.severity === ERROR);
    }

    hasError(): boolean {
        return this.errors().length > 0;
    }

    warnings(): IECLErrorWarning[] {
        return this.errWarn.filter(e => e.severity === WARN);
    }

    hasWarning(): boolean {
        return this.warnings().length > 0;
    }

    info(): IECLErrorWarning[] {
        return this.errWarn.filter(e => [ERROR, WARN].indexOf(e.severity) < 0);
    }

    hasOther(): boolean {
        return this.info().length > 0;
    }

    unknown(): string[] {
        return this.errOther;
    }

    hasUnknown(): boolean {
        return this.unknown().length > 0;
    }
}

export class EclccErrors extends Errors {

    constructor(stdErr: string, checked: string[]) {
        super(checked);
        if (stdErr && stdErr.length) {
            for (const errLine of stdErr.split(os.EOL)) {
                let match = /([a-z,A-Z]:\\(?:[-\w\.\d]+\\)*(?:[-\w\.\d]+)?|(?:\/[\w\.\-]+)+)\((\d*),(\d*)\): ?(error|warning|info) C(\d*): ?(.*)/.exec(errLine);
                if (match) {
                    const [, filePath, row, _col, severity, code, _msg] = match;
                    const line: number = +row;
                    const col: number = +_col;
                    const msg = code + ":  " + _msg;
                    this.errWarn.push({ filePath, line, col, msg, severity });
                    continue;
                }
                match = /(error|warning|info): (.*)/i.exec(errLine);
                if (match) {
                    const [, severity, msg] = match;
                    this.errWarn.push({ filePath: "", line: 0, col: 0, msg, severity });
                    continue;
                }
                match = /\d error(s?), \d warning(s?)/.exec(errLine);
                if (match) {
                    continue;
                }
                logger.warning(`parseECLErrors:  Unable to parse "${errLine}"`);
                this.errOther.push(errLine);
            }
        }
        this._checked = checked;
    }
}

export class EnvchkErrors extends Errors {

    private _lines: string[];

    constructor(filePath: string, stdErr: string, checked: string[]) {
        super(checked);
        let content: string = fs.readFileSync(filePath, "utf8");
        content = content.replace("\r\n", "\n");
        this._lines = content.split("\n");
        if (stdErr && stdErr.length) {
            for (const errLine of stdErr.split(os.EOL)) {
                const match = /(Warning|Error) : Path\=(\S*?)(\[\S*\])? Message\=(.*)/.exec(errLine);
                if (match) {
                    const [, severity, _path, _attr, _msg] = match;
                    const msg = `${_path} ${_attr ? _attr : ""}:  ${_msg}`;
                    const [line, col] = this.locate(_path);
                    this.errWarn.push({ filePath, line, col, msg, severity });
                    continue;
                }
                if (match) {
                    continue;
                }
                logger.warning(`parseECLErrors:  Unable to parse "${errLine}"`);
                this.errOther.push(errLine);
            }
        }
        this._checked = checked;
    }

    locate(path: string): [number, number] {
        const pathParts = path.split("/");
        if (pathParts.length && pathParts[0] === "") {
            pathParts.shift();
        }
        if (pathParts.length > 0) {
            let lineIdx = 0;
            for (const line of this._lines) {
                const testStr = "<" + pathParts[0];
                if (line.indexOf(testStr + " ") >= 0 || line.indexOf(testStr + ">") >= 0) {
                    console.log(lineIdx, testStr);
                    pathParts.shift();
                    if (pathParts.length === 0) {
                        return [lineIdx + 1, line.indexOf(testStr) + 1];
                    }
                }
                ++lineIdx;
            }
        }
        return [0, 0];
    }
}

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
                    const match = /([a-z,A-Z]:\\(?:[-\w\.\d]+\\)*(?:[-\w\.\d]+)?|(?:\/[\w\.\-]+)+)\((\d*),(\d*)\)/.exec(item.value);
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
    err: EclccErrors;
}

export class ClientTools {
    eclccPath: string;
    envchkPath: string;
    protected binPath: string;
    protected cwd: string;
    protected includeFolders: string[];
    protected _legacyMode: boolean;
    protected _args: string[];
    protected _version: Version;

    constructor(eclccPath: string, envchkPath: string, cwd?: string, includeFolders: string[] = [], legacyMode: boolean = false, args: string[] = [], version?: Version) {
        this.eclccPath = eclccPath;
        this.envchkPath = envchkPath;
        this.binPath = path.dirname(this.eclccPath);
        this.cwd = path.normalize(cwd || this.binPath);
        this.includeFolders = includeFolders;
        this._legacyMode = legacyMode;
        this._args = args;
        this._version = version!;
    }

    clone(cwd?: string, includeFolders?: string[], legacyMode: boolean = false, args: string[] = []) {
        return new ClientTools(this.eclccPath, this.envchkPath, cwd, includeFolders, legacyMode, args, this._version);
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

    version(): Promise<Version> {
        if (this._version) {
            return Promise.resolve(this._version);
        }
        return this.execFile(this.eclccPath, this.binPath, this.args(["--version"]), "eclcc", `Cannot find ${this.eclccPath}`).then((response: IExecFile): Version => {
            this._version = new Version(response.stdout);
            return this._version;
        });
    }

    versionSync(): Version {
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

    createArchive(filename: string): Promise<IArchive> {
        const args = ["-E"].concat([filename]);
        return this.execFile(this.eclccPath, this.cwd, this.args(args), "eclcc", `Cannot find ${this.eclccPath}`).then((response: IExecFile): IArchive => {
            return {
                content: response.stdout,
                err: new EclccErrors(response.stderr, [])
            };
        });
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

    syntaxCheck(filePath: string, args: string[] = ["-syntax"]): Promise<Errors> {
        return Promise.all([
            attachWorkspace(this.cwd),
            this.execFile(this.eclccPath, this.cwd, this.args([...args, "-M", filePath]), "eclcc", `Cannot find ${this.eclccPath}`)
        ]).then(([metaWorkspace, execFileResponse]: [Workspace, IExecFile]) => {
            let checked: string[] = [];
            if (execFileResponse && execFileResponse.stdout && execFileResponse.stdout.length) {
                checked = metaWorkspace.parseMetaXML(execFileResponse.stdout);
            }
            return new EclccErrors(execFileResponse ? execFileResponse.stderr : "", checked);
        });
    }

    envCheck(filePath: string, args: string[] = []): Promise<Errors> {
        return Promise.all([
            attachWorkspace(this.cwd),
            this.execFile(this.envchkPath, this.cwd, this.args([...args, filePath]), "envchk", `Cannot find ${this.envchkPath}`)
        ]).then(([metaWorkspace, execFileResponse]: [Workspace, IExecFile]) => {
            return new EnvchkErrors(filePath, execFileResponse ? execFileResponse.stderr : "", []);
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

function locateClientToolsInFolder(rootFolder: string, clientTools: ClientTools[]) {
    if (rootFolder) {
        const hpccSystemsFolder = path.join(rootFolder, "HPCCSystems");
        if (fs.existsSync(hpccSystemsFolder) && fs.statSync(hpccSystemsFolder).isDirectory()) {
            if (os.type() !== "Windows_NT") {
                const eclccPath = path.join(hpccSystemsFolder, "bin", "eclcc");
                const envchkPath = path.join(hpccSystemsFolder, "bin", "envchk");
                if (fs.existsSync(eclccPath)) {
                    clientTools.push(new ClientTools(eclccPath, fs.existsSync(envchkPath) ? envchkPath : ""));
                }
            }
            fs.readdirSync(hpccSystemsFolder).forEach((versionFolder) => {
                const eclccPath = path.join(hpccSystemsFolder, versionFolder, "clienttools", "bin", "eclcc" + exeExt);
                const envchkPath = path.join(hpccSystemsFolder, versionFolder, "clienttools", "bin", "envchk" + exeExt);
                if (fs.existsSync(eclccPath)) {
                    const name = path.basename(versionFolder);
                    const version = new Version(name);
                    if (version.exists()) {
                        clientTools.push(new ClientTools(eclccPath, fs.existsSync(envchkPath) ? envchkPath : ""));
                    }
                }
            });
        }
    }
}

let allClientToolsCache: Promise<ClientTools[]>;
export function locateAllClientTools() {
    if (allClientToolsCache) return allClientToolsCache;
    const clientTools: ClientTools[] = [];
    switch (os.type()) {
        case "Windows_NT":
            const rootFolder86 = process.env["ProgramFiles(x86)"] || "";
            if (rootFolder86) {
                locateClientToolsInFolder(rootFolder86, clientTools);
            }
            const rootFolder = process.env["ProgramFiles"] || "";
            if (rootFolder) {
                locateClientToolsInFolder(rootFolder, clientTools);
            }
            if (!rootFolder86 && !rootFolder) {
                locateClientToolsInFolder("c:\\Program Files (x86)", clientTools);
            }
            break;
        case "Linux":
        case "Darwin":
            locateClientToolsInFolder("/opt", clientTools);
            break;
        default:
            break;
    }

    allClientToolsCache = Promise.all(clientTools.map(ct => ct.version())).then(() => {
        clientTools.sort((l: ClientTools, r: ClientTools) => {
            return r.versionSync().compare(l.versionSync());
        });
        return clientTools;
    });
    return allClientToolsCache;
}

let eclccPathMsg = "";
function logEclccPath(eclccPath: string) {
    const msg = `Using eclccPath setting:  ${eclccPath}`;
    if (eclccPathMsg !== msg) {
        logger.info(msg);
        eclccPathMsg = msg;
    }
}

export function locateClientTools(overridePath: string = "", build: string = "", cwd: string = ".", includeFolders: string[] = [], legacyMode: boolean = false): Promise<ClientTools> {
    if (overridePath && fs.existsSync(overridePath)) {
        logEclccPath(overridePath);
        return Promise.resolve(new ClientTools(overridePath, "", cwd, includeFolders, legacyMode));
    }
    return locateAllClientTools().then((allClientToolsCache2) => {
        if (!allClientToolsCache2.length) {
            throw new Error("Unable to locate ECL Client Tools.");
        }
        const buildVersion = new Version(build);
        let latest: ClientTools | undefined;
        let bestMajor: ClientTools | undefined;
        for (const ct of allClientToolsCache2) {
            const ctVersion = ct.versionSync();
            if (!latest) latest = ct;
            if (!bestMajor && buildVersion.major === ctVersion.major) bestMajor = ct;
            if (buildVersion.major === ctVersion.major && buildVersion.minor === ctVersion.minor) return ct.clone(cwd, includeFolders, legacyMode);
        }
        const best: ClientTools = bestMajor || latest!;
        logEclccPath(best.eclccPath);
        return best.clone(cwd, includeFolders, legacyMode);
    });
}
