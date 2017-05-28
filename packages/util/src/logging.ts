import { Stack } from "./stack";
import { isNode } from "./platform";

export enum Level {
    debug,
    info,
    notice,
    warning,
    error,
    critical,
    alert,
    emergency
}

const colours: { [key: string]: string } = {
    debug: "cyan",
    info: "green",
    notice: "grey",
    warning: "blue",
    error: "red",
    critical: "magenta",
    alert: "magenta",
    emergency: "magenta"
};

export interface Writer {
    write(dateTime: string, level: Level, id: string, msg: string): void;
}

class ConsoleWriter implements Writer {
    write(dateTime: string, level: Level, id: string, msg: string) {
        if (isNode) {
            // tslint:disable-next-line:no-console
            console.log(`[${dateTime}] ${Level[level].toUpperCase()} ${id}:  ${msg}`);
        } else {
            // tslint:disable-next-line:no-console
            console.log(`[${dateTime}] %c${Level[level].toUpperCase()}%c ${id}:  ${msg}`, `color:${colours[Level[level]]}`, "");
        }
    }
}

export class Logging {
    private static _instance: Logging;
    private _levelStack = new Stack<Level>();
    private _level = Level.info;
    private _filter: string = "";
    private _writer: Writer = new ConsoleWriter();

    public static Instance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
    }

    private stringify(obj: object): string {
        const cache: any[] = [];
        return JSON.stringify(obj, function (_key, value) {
            if (typeof value === "object" && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    return;
                }
                cache.push(value);
            }
            return value;
        }, 2);
    }

    writer(): Writer;
    writer(_: Writer): Logging;
    writer(_?: Writer): Writer | Logging {
        if (_ === void 0) return this._writer;
        this._writer = _;
        return this;
    }

    log(level: Level, id: string, msg: string | object) {
        if (level < this._level) return;
        if (this._filter && this._filter !== id) return;

        if (typeof msg !== "string") {
            msg = this.stringify(msg);
        }
        this._writer.write(new Date().toISOString(), level, id, msg);
    }

    debug(id: string, msg: string | object) {
        this.log(Level.debug, id, msg);
    }

    info(id: string, msg: string | object) {
        this.log(Level.info, id, msg);
    }

    notice(id: string, msg: string | object) {
        this.log(Level.notice, id, msg);
    }

    warning(id: string, msg: string | object) {
        this.log(Level.warning, id, msg);
    }

    error(id: string, msg: string | object) {
        this.log(Level.error, id, msg);
    }

    critical(id: string, msg: string | object) {
        this.log(Level.critical, id, msg);
    }

    alert(id: string, msg: string | object) {
        this.log(Level.alert, id, msg);
    }

    emergency(id: string, msg: string | object) {
        this.log(Level.emergency, id, msg);
    }

    level(): Level;
    level(_: Level): this;
    level(_?: Level): Level | this {
        if (_ === void 0) return this._level;
        this._level = _;
        return this;
    }

    pushLevel(_: Level): this {
        this._levelStack.push(this._level);
        this._level = _;
        return this;
    }

    popLevel(): this {
        this._level = this._levelStack.pop()!;
        return this;
    }

    filter(): string;
    filter(_: string): this;
    filter(_?: string): string | this {
        if (_ === void 0) return this._filter;
        this._filter = _;
        return this;
    }
}
export const logger = Logging.Instance();

export class ScopedLogging {
    protected _scopeID: string;

    constructor(scopeID: string) {
        this._scopeID = scopeID;
    }

    debug(msg: string | object) {
        logger.debug(this._scopeID, msg);
    }

    info(msg: string | object) {
        logger.info(this._scopeID, msg);
    }

    notice(msg: string | object) {
        logger.notice(this._scopeID, msg);
    }

    warning(msg: string | object) {
        logger.warning(this._scopeID, msg);
    }

    error(msg: string | object) {
        logger.error(this._scopeID, msg);
    }

    critical(msg: string | object) {
        logger.critical(this._scopeID, msg);
    }

    alert(msg: string | object) {
        logger.alert(this._scopeID, msg);
    }

    emergency(msg: string | object) {
        logger.emergency(this._scopeID, msg);
    }

    pushLevel(_: Level): this {
        logger.pushLevel(_);
        return this;
    }

    popLevel(): this {
        logger.popLevel();
        return this;
    }
}

export function scopedLogger(scopeID: string, filter: boolean = true) {
    if (filter) {
        logger.filter(scopeID);
    }
    return new ScopedLogging(scopeID);
}
