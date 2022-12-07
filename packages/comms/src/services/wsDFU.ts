import { DfuServiceBase, WsDfu } from "./wsdl/WsDfu/v1.65/WsDfu";

export { WsDfu };

export const DFUArrayActions = WsDfu.DFUArrayActions;
export const DFUDefFileFormat = WsDfu.DFUDefFileFormat;
export const DFUChangeProtection = WsDfu.DFUChangeProtection;
export const DFUChangeRestriction = WsDfu.DFUChangeRestriction;

export type base64Binary = WsDfu.base64Binary;

export class DFUService extends DfuServiceBase {

    DFUFile(request: WsDfu.DFUDefFileRequest): Promise<string> {
        return this._connection.send("DFUDefFile", request, "text");
    }

}
