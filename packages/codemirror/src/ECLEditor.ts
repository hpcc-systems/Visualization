import "codemirror/mode/ecl/ecl";
import { Editor } from "./Editor";

export class ECLEditor extends Editor {
    options(): any {
        const retVal = super.options();
        retVal.mode = "text/x-ecl";
        return retVal;
    }
}
ECLEditor.prototype._class += " codemirror_ECLEditor";
