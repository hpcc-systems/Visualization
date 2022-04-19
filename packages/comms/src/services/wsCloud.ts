import type { V1Pod } from "@kubernetes/client-node";
import { CloudServiceBase, WsCloud } from "./wsdl/WsCloud/v1/WsCloud";

export {
    WsCloud,
    V1Pod
};

export class CloudService extends CloudServiceBase {

    getPODs(): Promise<V1Pod[]> {
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
