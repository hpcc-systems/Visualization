import { IConnection, IOptions } from "../connection";
import { espTime2Seconds, StateObject } from "@hpcc-js/util";
import { WorkunitsService, WUInfo } from "../services/wsWorkunits";

export interface ECLTimerEx extends WUInfo.ECLTimer {
    Wuid: string;
    Seconds: number;
    HasSubGraphId: boolean;
}

export class Timer extends StateObject<ECLTimerEx, ECLTimerEx> implements ECLTimerEx {
    protected connection: WorkunitsService;

    get properties(): WUInfo.ECLTimer { return this.get(); }
    get Wuid(): string { return this.get("Wuid"); }
    get Name(): string { return this.get("Name"); }
    get Value(): string { return this.get("Value"); }
    get Seconds(): number { return this.get("Seconds"); }
    get GraphName(): string { return this.get("GraphName"); }
    get SubGraphId(): number { return this.get("SubGraphId"); }
    get HasSubGraphId(): boolean { return this.get("HasSubGraphId"); }
    get count(): number { return this.get("count"); }

    constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, eclTimer: WUInfo.ECLTimer) {
        super();
        if (optsConnection instanceof WorkunitsService) {
            this.connection = optsConnection;
        } else {
            this.connection = new WorkunitsService(optsConnection);
        }

        const secs = espTime2Seconds(eclTimer.Value);
        this.set({
            Wuid: wuid,
            Seconds: Math.round(secs * 1000) / 1000,
            HasSubGraphId: eclTimer.SubGraphId !== undefined,
            XXX: true,
            ...eclTimer
        });
    }
}
