import { CloudServiceBase, WsCloud } from "./wsdl/WsCloud/v1/WsCloud.ts";

export {
    type WsCloud
};

export class CloudService extends CloudServiceBase {

    getPODs(): Promise<object[]> {
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
