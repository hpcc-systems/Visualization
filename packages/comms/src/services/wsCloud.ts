import { scopedLogger } from "@hpcc-js/util";
import type { V1Pod } from "@kubernetes/client-node";
import type { WsCloud as WsCloudV1 } from "./wsdl/WsCloud/v1/WsCloud.ts";
import { CloudServiceBase, WsCloud } from "./wsdl/WsCloud/v1.02/WsCloud.ts";

const logger = scopedLogger("@hpcc-js/comms/services/wsCloud.ts");

export {
    type WsCloud
};

function isGetPODsResponse_v1_02(response: any): response is WsCloud.GetPODsResponse {
    return response?.Pods !== undefined;
}

function mapPorts(pod: V1Pod): WsCloud.Port[] {
    return pod.spec?.containers?.reduce((prev, curr) => {
        curr.ports?.forEach(p => {
            prev.push({
                ContainerPort: p.containerPort,
                Name: p.name,
                Protocol: p.protocol
            });
        });
        return prev;
    }, [] as WsCloud.Port[]) ?? [];
}

function mapPods(pods: V1Pod[]): WsCloud.Pod[] {
    return pods
        .filter(pod => {
            const labels = pod?.metadata?.labels ?? {};
            return labels.hasOwnProperty("app.kubernetes.io/part-of") && labels["app.kubernetes.io/part-of"] === "HPCC-Platform";
        })
        .map((pod: V1Pod): WsCloud.Pod => {
            const started = new Date(pod.metadata?.creationTimestamp);
            return {
                Name: pod.metadata.name,
                Status: pod.status?.phase,
                CreationTimestamp: started.toISOString(),
                ContainerName: pod.status?.containerStatuses?.reduce((prev, curr) => {
                    if (curr.name) {
                        prev.push(curr.name);
                    } return prev;
                }, [] as string[]).join(", ") ?? "",
                ContainerCount: pod.spec?.containers?.length ?? 0,
                ContainerReadyCount: pod.status?.containerStatuses?.reduce((prev, curr) => prev + (curr.ready ? 1 : 0), 0),
                ContainerRestartCount: pod.status?.containerStatuses?.reduce((prev, curr) => prev + curr.restartCount, 0),
                Ports: {
                    Port: mapPorts(pod)
                },
            };
        })
        ;
}

export class CloudService extends CloudServiceBase {

    getPODs(): Promise<WsCloud.Pod[]> {
        return super.GetPODs({}).then((response: WsCloud.GetPODsResponse | WsCloudV1.GetPODsResponse) => {
            if (isGetPODsResponse_v1_02(response)) {
                return response.Pods?.Pod ?? [];
            }
            try {
                const obj = typeof response.Result === "string" ? JSON.parse(response.Result) : response.Result;
                return mapPods(obj?.items ?? []);
            } catch (error) {
                logger.error(`Error parsing V1Pods json '${(error instanceof Error ? error.message : String(error))}'`);
                return [];
            }
        });
    }
}
