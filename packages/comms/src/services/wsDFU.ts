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

    async recursiveFetchLogicalFiles(superFiles: { NodeGroup: string, Name: string }[]): Promise<string[]> {
        const childSuperFiles: WsDfu.DFULogicalFile[] = [];
        const logicalFiles: string[] = [];
        await Promise.all(superFiles.map(superFile => {
            return this.DFUInfo({ Cluster: superFile.NodeGroup, Name: superFile.Name, IncludeJsonTypeInfo: false, IncludeBinTypeInfo: false, ForceIndexInfo: false })
                .then(response => {
                    for (const child of response?.FileDetail?.Superfiles?.DFULogicalFile ?? []) {
                        childSuperFiles.push(child);
                    }
                    for (const child of response?.FileDetail?.subfiles?.Item ?? []) {
                        logicalFiles.push(child);
                    }
                });
        }));
        return logicalFiles.concat(childSuperFiles.length ? await this.recursiveFetchLogicalFiles(childSuperFiles) : []);
    }
}
