import { FileSprayServiceBase, FileSpray } from "./wsdl/FileSpray/v1.26/FileSpray.ts";

export {
    FileSpray
};

type UpdateDFUWorkunitMinusWU = Omit<FileSpray.UpdateDFUWorkunit, "wu">;
type UpdateDFUWorkunitWU = FileSpray.UpdateDFUWorkunit["wu"];

export enum FileSprayStates {
    unknown = 0,
    scheduled,
    queued,
    started,
    aborted,
    failed,
    finished,
    monitoring,
    aborting,
    notfound = 999
}

export interface UpdateDFUWorkunitEx extends UpdateDFUWorkunitMinusWU {
    wu?: Partial<UpdateDFUWorkunitWU>
}

export class FileSprayService extends FileSprayServiceBase {

    DFUWUFileEx(request: FileSpray.DFUWUFileRequest): Promise<string> {
        return this._connection.send("DFUWUFile", request, "text");
    }

    SprayFixedEx(request: Partial<FileSpray.SprayFixed>): Promise<FileSpray.SprayFixedResponse> {
        return this._connection.send("SprayFixed", request);
    }

    SprayVariableEx(request: Partial<FileSpray.SprayVariable>): Promise<FileSpray.SprayResponse> {
        return this._connection.send("SprayVariable", request, "json", false, null, "SprayResponse");
    }

    DesprayEx(request: Partial<FileSpray.Despray>): Promise<FileSpray.DesprayResponse> {
        return this._connection.send("Despray", request);
    }

    UpdateDFUWorkunitEx(request: Partial<UpdateDFUWorkunitEx>): Promise<FileSpray.UpdateDFUWorkunitResponse> {
        return this._connection.send("UpdateDFUWorkunit", request, "json", false, undefined, "UpdateDFUWorkunitResponse");
    }
}
