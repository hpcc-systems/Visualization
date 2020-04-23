
class FakeVariable {

    constructor(public _module) {

    }

    define(...args: any[]) {
        let id = args.length > 1 ? args[0] : "";
        if (Array.isArray(id)) {
            id = "";
        }
        const xxx = args[args.length - 1].toString();
        xxx;
        const func = args[args.length - 1].toString().split("\n");
        const firstLine = func.shift();
        if (firstLine.indexOf("{return(") >= 0) {
            func.pop();
        }
        this._module._runtime.append(id, func.join("\n"));
    }

}

class FakeModule {

    constructor(public _runtime, public _modID?: string) {
    }

    modString() {
        return ` from "${this._modID}"`;
    }

    builtin(...args: any[]) {
    }

    derive(...args: any[]) {
        args.pop();
        const context = this;
        return {
            modString() {
                return ` with { ${args.map(arg => `${arg.name} as ${arg.alias}`).join(",")} } ${context.modString()}`;
            }
        };
    }

    import(...args: any[]) {
        const fakeMod = args.pop();
        this._runtime.append("", `import {${args.join(",")}}${fakeMod.modString()}`);
    }

    variable(...args: any[]) {
        return new FakeVariable(this);
    }
}

export class FakeRuntime {

    private _definesArr = [];
    private _defines = {};
    private _rawText = "";

    constructor(rawText: string) {
        const imports = rawText.match(/import (define\d) from \"\/(.*).js\?v=3\"/g);
        for (const item of imports) {
            const m = item.match(/import (define\d) from \"\/(.*).js\?v=3\"/);
            this._defines[m[1]] = m[2];
            this._definesArr.push(m[2]);
        }
    }

    text() {
        return this._rawText;
    }

    append(id, content) {
        if (content) {
            this._rawText += id ? `${id} = ${content};\n` : `${content};\n`;
        }
    }

    module(def?) {
        if (def) {
            return new FakeModule(this, this._definesArr.shift());
        }
        return new FakeModule(this);
    }

    fileAttachments(...args: any[]) {
    }
}
