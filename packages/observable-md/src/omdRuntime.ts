import { OJSRuntime } from "./ojsRuntime";
import { OJSVariable } from "./ojsVariable";
import { omd2ojs, ParsedECL, ParsedOJS } from "./parsers";

export class OMDRuntime extends OJSRuntime {

    _omdIndex: ParsedOJS[] = [];
    _eclIndex: ParsedECL[] = [];

    async parse(id: string, omd: string, path: string, extractECL: boolean = false): Promise<OJSVariable[]> {
        const { ojsArr, eclArr } = omd2ojs(omd, extractECL);
        this._omdIndex = ojsArr;
        this._eclIndex = eclArr;
        return super.parse(id, this._omdIndex.map(_ => _.ojs).join("\n"), path);
    }

    ecl(): string {
        return this._eclIndex.map(_ => _.ecl).join("\n");
    }
}
