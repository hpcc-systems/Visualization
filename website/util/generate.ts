import { MDFile } from "./docs";
import { Meta, TDNode } from "./meta";

export function updateMDMeta(folderPath: string, filePath: string, content: string, pkgJson: object, metaJson: TDNode) {
    const meta = new Meta(folderPath, filePath, metaJson);
    const mdFile = new MDFile(filePath, meta);
    return mdFile.updateMeta().write();
}
