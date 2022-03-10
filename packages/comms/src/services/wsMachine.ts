import { exists } from "@hpcc-js/util";
import { max as d3Max, mean as d3Mean } from "d3-array";

import { MachineServiceBase, WsMachine } from "./wsdl/ws_machine/v1.17/ws_machine";

export {
    WsMachine
};

export namespace WsMachineEx {

    export interface DiskUsage extends WsMachine.DiskUsage {
        Total: number;
        PercentUsed: number;
    }

    export interface MachineUsage extends Omit<WsMachine.MachineUsage, "DiskUsages"> {
        DiskUsages: DiskUsage[];
        mean: number;
        max: number;
    }

    export interface ComponentUsage extends Omit<WsMachine.ComponentUsage, "MachineUsages"> {
        MachineUsages: MachineUsage[];
        MachineUsagesDescription: string;
        mean: number;
        max: number;
    }

    export interface TargetClusterUsage extends Omit<WsMachine.TargetClusterUsage, "ComponentUsages"> {
        ComponentUsages: ComponentUsage[];
        ComponentUsagesDescription: string;
        mean: number;
        max: number;
    }

}

export class MachineService extends MachineServiceBase {

    GetTargetClusterUsageEx(request: WsMachine.GetTargetClusterUsageRequest): Promise<WsMachineEx.TargetClusterUsage[]> {
        return this._connection.send("GetTargetClusterUsage", request).then(response => {
            return exists("TargetClusterUsages.TargetClusterUsage", response) ? response.TargetClusterUsages.TargetClusterUsage : [];
        }).then(response => {
            return response.filter(tcu => !!tcu.ComponentUsages).map(tcu => {
                const ComponentUsages: WsMachineEx.ComponentUsage[] = tcu.ComponentUsages.ComponentUsage.map(cu => {
                    const MachineUsages: WsMachineEx.MachineUsage[] = (cu.MachineUsages && cu.MachineUsages.MachineUsage ? cu.MachineUsages.MachineUsage : []).map(mu => {
                        const DiskUsages: WsMachineEx.DiskUsage[] = mu.DiskUsages && mu.DiskUsages.DiskUsage ? mu.DiskUsages.DiskUsage.map(du => {
                            return {
                                ...du,
                                Total: du.InUse + du.Available,
                                PercentUsed: 100 - du.PercentAvailable
                            };
                        }) : [];
                        return {
                            Name: mu.Name,
                            NetAddress: mu.NetAddress,
                            Description: mu.Description,
                            DiskUsages,
                            mean: d3Mean(DiskUsages.filter(du => !isNaN(du.PercentUsed)), du => du.PercentUsed),
                            max: d3Max(DiskUsages.filter(du => !isNaN(du.PercentUsed)), du => du.PercentUsed)
                        };
                    });
                    return {
                        Type: cu.Type,
                        Name: cu.Name,
                        Description: cu.Description,
                        MachineUsages,
                        MachineUsagesDescription: MachineUsages.reduce((prev, mu) => prev + (mu.Description || ""), ""),
                        mean: d3Mean(MachineUsages.filter(mu => !isNaN(mu.mean)), mu => mu.mean),
                        max: d3Max(MachineUsages.filter(mu => !isNaN(mu.max)), mu => mu.max)
                    };
                });
                return {
                    Name: tcu.Name,
                    Description: tcu.Description,
                    ComponentUsages,
                    ComponentUsagesDescription: ComponentUsages.reduce((prev, cu) => prev + (cu.MachineUsagesDescription || ""), ""),
                    mean: d3Mean(ComponentUsages.filter(cu => !isNaN(cu.mean)), cu => cu.mean),
                    max: d3Max(ComponentUsages.filter(cu => !isNaN(cu.max)), cu => cu.max)
                };
            });
        });
    }
}
