import { Editor } from "./Editor";

import "../src/ECLEditor.css";

export class ECLEditor extends Editor {
    options(): any {
        const retVal = super.options();
        retVal.mode = "text/x-ecl";
        return retVal;
    }
}
ECLEditor.prototype._class += " codemirror_ECLEditor";
