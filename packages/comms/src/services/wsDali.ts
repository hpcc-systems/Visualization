import { DaliServiceBase, WsDali } from "./wsdl/WsDali/v1.07/WsDali";

export {
    WsDali
};

export interface ExportRequest {
    Path: string;
    Safe: boolean;
}

export interface ExportResponse {
    filename: string;
    content: Blob;
}

export class DaliService extends DaliServiceBase {

    async Export(request: ExportRequest): Promise<ExportResponse> {
        const exportUrl = "/WsDali/Export";

        const reqParams = new URLSearchParams();
        if (request.Path) {
            reqParams.append("Path", request.Path);
        }
        if (request.Safe !== undefined) {
            reqParams.append("Safe", String(request.Safe));
        }

        const response = await fetch(`${exportUrl}?${reqParams.toString()}`);
        const filename = response.headers.get("Content-Disposition");
        const content = await response.blob();

        return {
            filename: filename ? filename.split("filename=")[1] : "WsDali_Export",
            content
        };
    }

}
