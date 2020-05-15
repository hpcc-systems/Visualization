import { parseModule } from "@observablehq/parser";
import { OJSRuntime, OJSVariable } from "./ojsRuntime";
import { encodeBacktick } from "./util";

interface ParsedOMD {
    ojs: string;
    offset: number;
    inlineMD: boolean;
}

function createParsedOMD(ojs: string, offset: number, inlineMD: boolean): ParsedOMD {
    return {
        ojs,
        offset,
        inlineMD
    };
}

export function omdParse(ojs: string) {
    const retVal = {
        cells: []
    };
    omd2ojs(ojs).forEach(pOmd => {
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

export function omd2ojs(_: string): ParsedOMD[] {
    const retVal: ParsedOMD[] = [];
    //  Load Markdown  ---
    const re = /(```(?:\s|\S)[\s\S]*?```)/g;
    let prevOffset = 0;
    let match = re.exec(_);
    while (match !== null) {
        if (match.index > prevOffset) {
            retVal.push(createParsedOMD("md`" + encodeBacktick(_.substring(prevOffset, match.index)) + "`", prevOffset, true));
        }

        const outer = match[0];
        if (outer.indexOf("``` ") === 0 || outer.indexOf("```\n") === 0 || outer.indexOf("```\r\n") === 0) {
            const prefixLen = 3;
            const inner = outer.substring(prefixLen, outer.length - prefixLen);
            retVal.push(createParsedOMD(inner, match.index + prefixLen, false));
        } else {
            retVal.push(createParsedOMD("md`\\n" + encodeBacktick(outer) + "\\n`", match.index, true));
        }

        prevOffset = match.index + match[0].length;
        match = re.exec(_);
    }
    if (_.length > prevOffset) {
        retVal.push(createParsedOMD("md`\\n" + encodeBacktick(_.substring(prevOffset, _.length)) + "\\n`", prevOffset, true));
    }
    return retVal;
}

export class OMDRuntime extends OJSRuntime {

    _omdIndex: ParsedOMD[] = [];
    async parse(id: string, ojs: string): Promise<OJSVariable[]> {
        this._omdIndex = omd2ojs(ojs);
        return super.parse(id, this._omdIndex.map(_ => _.ojs).join("\n"));
    }
}
