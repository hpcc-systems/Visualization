import { parseModule } from "@observablehq/parser";
import { OJSRuntime, OJSVariable } from "./ojsRuntime";
import { encodeBacktick } from "./util";

interface ParsedOJS {
    ojs: string;
    offset: number;
    inlineMD: boolean;
}

function createParsedOJS(ojs: string, offset: number, inlineMD: boolean): ParsedOJS {
    return {
        ojs,
        offset,
        inlineMD
    };
}

interface ParsedECL {
    ecl: string;
    offset: number;
    lineOffset: number;
}

function createParsedECL(ecl: string, offset: number, origStr: string): ParsedECL {
    const text = origStr.substr(0, origStr.indexOf(ecl));
    const lineOffset = text.split("\n").length - 1;
    return {
        ecl,
        offset,
        lineOffset
    };
}

export function omdParse(ojs: string) {
    const retVal = {
        cells: []
    };
    omd2ojs(ojs).ojsArr.forEach(pOmd => {
        try {
            parseModule(pOmd.ojs).cells.forEach(cell => {
                retVal.cells.push(cell);
            });
        } catch (e) {
            e.pos += pOmd.offset;
            e.raisedAt += pOmd.offset;
            throw e;
        }
    });
    return retVal;
}

export function omd2ojs(_: string, extractECL: boolean = false): { ojsArr: ParsedOJS[], eclArr: ParsedECL[] } {
    const ojsArr: ParsedOJS[] = [];
    const eclArr: ParsedECL[] = [];
    //  Load Markdown  ---
    const re = /(```(?:\s|\S)[\s\S]*?```)/g;
    let prevOffset = 0;
    let match = re.exec(_);
    while (match !== null) {
        if (match.index > prevOffset) {
            ojsArr.push(createParsedOJS("md`" + encodeBacktick(_.substring(prevOffset, match.index)) + "`", prevOffset, true));
        }

        const outer = match[0];
        if (outer.indexOf("``` ") === 0 || outer.indexOf("```\n") === 0 || outer.indexOf("```\r\n") === 0) {
            const prefixLen = 3;
            const inner = outer.substring(prefixLen, outer.length - prefixLen);
            ojsArr.push(createParsedOJS(inner, match.index + prefixLen, false));
        } else if (extractECL && (outer.indexOf("```ecl ") === 0 || outer.indexOf("```ecl\n") === 0 || outer.indexOf("```ecl\r\n") === 0)) {
            const prefixLen = 6;
            const inner = outer.substring(prefixLen, outer.length - prefixLen);
            eclArr.push(createParsedECL(inner, match.index + prefixLen, _));
        } else {
            ojsArr.push(createParsedOJS("md`\\n" + encodeBacktick(outer) + "\\n`", match.index, true));
        }

        prevOffset = match.index + match[0].length;
        match = re.exec(_);
    }
    if (_.length > prevOffset) {
        ojsArr.push(createParsedOJS("md`\\n" + encodeBacktick(_.substring(prevOffset, _.length)) + "\\n`", prevOffset, true));
    }
    return { ojsArr, eclArr };
}

export class OMDRuntime extends OJSRuntime {

    _omdIndex: ParsedOJS[] = [];
    _eclIndex: ParsedECL[] = [];

    async parse(id: string, omd: string, extractECL: boolean = false): Promise<OJSVariable[]> {
        const { ojsArr, eclArr } = omd2ojs(omd, extractECL);
        this._omdIndex = ojsArr;
        this._eclIndex = eclArr;
        return super.parse(id, this._omdIndex.map(_ => _.ojs).join("\n"));
    }

    ecl(): string {
        return this._eclIndex.map(_ => _.ecl).join("\n");
    }
}
