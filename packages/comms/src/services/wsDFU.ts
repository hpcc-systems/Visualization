import {
    DfuServiceBase, WsDfu, DFUArrayActions, DFUChangeProtection, DFUChangeRestriction,
    DFUDefFileFormat, FileAccessRole, SecAccessType, DFUFileType,
    base64Binary
} from "./wsdl/WsDfu/v1.62/WsDfu";

export {
    WsDfu, DFUArrayActions, DFUChangeProtection, DFUChangeRestriction,
    DFUDefFileFormat, FileAccessRole, SecAccessType, DFUFileType,
    base64Binary
};

export class DFUService extends DfuServiceBase {

    DFUFile(request: WsDfu.DFUDefFileRequest): Promise<string> {
        return this._connection.send("DFUDefFile", request, "text");
    }

}
