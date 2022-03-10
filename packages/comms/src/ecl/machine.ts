import { Cache, StateObject } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { WsMachine, MachineService } from "../services/wsMachine";

export class MachineCache extends Cache<{ Address: string }, Machine> {
    constructor() {
        super((obj) => {
            return obj.Address;
        });
    }
}
const _machines = new MachineCache();

export interface MachineInfoEx extends WsMachine.MachineInfoEx {
}

export class Machine extends StateObject<MachineInfoEx, MachineInfoEx> implements MachineInfoEx {
    protected connection: MachineService;

    get Address(): string { return this.get("Address"); }
    get ConfigAddress(): string { return this.get("ConfigAddress"); }
    get Name(): string { return this.get("Name"); }
    get ProcessType(): string { return this.get("ProcessType"); }
    get DisplayType(): string { return this.get("DisplayType"); }
    get Description(): string { return this.get("Description"); }
    get AgentVersion(): string { return this.get("AgentVersion"); }
    get Contact(): string { return this.get("Contact"); }
    get Location(): string { return this.get("Location"); }
    get UpTime(): string { return this.get("UpTime"); }
    get ComponentName(): string { return this.get("ComponentName"); }
    get ComponentPath(): string { return this.get("ComponentPath"); }
    get RoxieState(): string { return this.get("RoxieState"); }
    get RoxieStateDetails(): string { return this.get("RoxieStateDetails"); }
    get OS(): number { return this.get("OS"); }
    get ProcessNumber(): number { return this.get("ProcessNumber"); }
    get Channels(): number { return this.get("Channels"); }
    get Processors(): WsMachine.Processors { return this.get("Processors"); }
    get Storage(): WsMachine.Storage { return this.get("Storage"); }
    get Running(): WsMachine.Running { return this.get("Running"); }
    get PhysicalMemory(): WsMachine.PhysicalMemory { return this.get("PhysicalMemory"); }
    get VirtualMemory(): WsMachine.VirtualMemory { return this.get("VirtualMemory"); }
    get ComponentInfo(): WsMachine.ComponentInfo { return this.get("ComponentInfo"); }
    get Exception(): string { return this.get("Exception"); }

    static attach(optsConnection: IOptions | IConnection | MachineService, address: string, state?: WsMachine.MachineInfoEx): Machine {
        const retVal: Machine = _machines.get({ Address: address }, () => {
            return new Machine(optsConnection);
        });
        if (state) {
            retVal.set(state);
        }
        return retVal;
    }

    private constructor(optsConnection: IOptions | IConnection | MachineService) {
        super();
        if (optsConnection instanceof MachineService) {
            this.connection = optsConnection;
        } else {
            this.connection = new MachineService(optsConnection);
        }
    }
}
