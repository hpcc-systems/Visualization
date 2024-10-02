import { espTime2Seconds, StateObject } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection.ts";
import { WorkunitsService, WsWorkunits } from "../services/wsWorkunits.ts";

export interface ECLTimerEx extends WsWorkunits.ECLTimer {
    Wuid: string;
    Seconds: number;
    HasSubGraphId: boolean;
}

export class Timer extends StateObject<ECLTimerEx, ECLTimerEx> implements ECLTimerEx {
    protected connection: WorkunitsService;

    get properties(): WsWorkunits.ECLTimer { return this.get(); }
    get Wuid(): string { return this.get("Wuid"); }
    get Name(): string { return this.get("Name"); }
    get Value(): string { return this.get("Value"); }
    get Seconds(): number { return this.get("Seconds"); }
    get GraphName(): string { return this.get("GraphName"); }
    get SubGraphId(): number { return this.get("SubGraphId"); }
    get HasSubGraphId(): boolean { return this.get("HasSubGraphId"); }
    get count(): number { return this.get("count"); }
    get Timestamp(): number { return this.get("Timestamp"); }
    get When(): string { return this.get("When"); }

    constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, eclTimer: WsWorkunits.ECLTimer) {
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
            ...eclTimer
        });
    }
}
