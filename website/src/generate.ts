import { MDFile } from "./docs";
import { Meta, TDNode } from "./meta";

export function updateMDMeta(filePath: string, content: string, pkgJson: object, metaJson: TDNode) {
    const meta = new Meta(pkgJson, metaJson);
    const mdFile = new MDFile(filePath, meta);
    return mdFile.updateMeta().write();
}
