import { CloudServiceBase, WsCloud } from "./wsdl/WsCloud/v1/WsCloud";

export {
    WsCloud
};

export class CloudService extends CloudServiceBase {

    getPODs(): Promise<any[]> {
        return super.GetPODs({}).then((response) => {
            try {
                const obj = typeof response.Result === "string" ? JSON.parse(response.Result) : response.Result;
                return obj?.items ?? [];

            } catch (error) {
                return [];
            }
        });
    }
}
