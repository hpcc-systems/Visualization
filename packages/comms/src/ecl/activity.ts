import { debounce, StateObject } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection.ts";
import { WsSMC, SMCService } from "../services/wsSMC.ts";
import { Workunit } from "./workunit.ts";

let _activity: Activity;

export interface ActivityEx {
}

export type UActivityState = WsSMC.ActivityResponse & ActivityEx;
export type IActivityState = WsSMC.ActivityResponse | ActivityEx;
export class Activity extends StateObject<UActivityState, IActivityState> implements UActivityState {
    protected connection: SMCService;

    get properties(): UActivityState { return this.get(); }
    get Exceptions(): WsSMC.Exceptions { return this.get("Exceptions"); }
    get Build(): string { return this.get("Build"); }
    get ThorClusterList(): WsSMC.ThorClusterList { return this.get("ThorClusterList"); }
    get RoxieClusterList(): WsSMC.RoxieClusterList { return this.get("RoxieClusterList"); }
    get HThorClusterList(): WsSMC.HThorClusterList { return this.get("HThorClusterList"); }
    get DFUJobs(): WsSMC.DFUJobs { return this.get("DFUJobs"); }
    get Running(): WsSMC.Running { return this.get("Running", { ActiveWorkunit: [] }); }
    get BannerContent(): string { return this.get("BannerContent"); }
    get BannerColor(): string { return this.get("BannerColor"); }
    get BannerSize(): string { return this.get("BannerSize"); }
    get BannerScroll(): string { return this.get("BannerScroll"); }
    get ChatURL(): string { return this.get("ChatURL"); }
    get ShowBanner(): number { return this.get("ShowBanner"); }
    get ShowChatURL(): number { return this.get("ShowChatURL"); }
    get SortBy(): string { return this.get("SortBy"); }
    get Descending(): boolean { return this.get("Descending"); }
    get SuperUser(): boolean { return this.get("SuperUser"); }
    get AccessRight(): string { return this.get("AccessRight"); }
    get ServerJobQueues(): WsSMC.ServerJobQueues { return this.get("ServerJobQueues"); }
    get ActivityTime(): string { return this.get("ActivityTime"); }
    get DaliDetached(): boolean { return this.get("DaliDetached"); }

    static attach(optsConnection: IOptions | IConnection | SMCService, state?: IActivityState): Activity {
        if (!_activity) {
            _activity = new Activity(optsConnection);
        }
        if (state) {
            _activity.set(state);
        }
        return _activity;
    }

    protected constructor(optsConnection: IOptions | IConnection | SMCService) {
        super();
        if (optsConnection instanceof SMCService) {
            this.connection = optsConnection;
        } else {
            this.connection = new SMCService(optsConnection);
        }
        this.clear({
        });
    }

    runningWorkunits(clusterName: string = ""): Workunit[] {
        return this.Running.ActiveWorkunit.filter(awu => clusterName === "" || awu.ClusterName === clusterName).map(awu => Workunit.attach(this.connection.connectionOptions(), awu.Wuid, awu));
    }

    setBanner(request: Partial<WsSMC.SetBanner>): Promise<Activity> {
        return this.connection.SetBanner({
            ...request
        } as WsSMC.SetBanner).then((response) => {
            this.set(response);
            return this;
        });
    }

    lazyRefresh = debounce(async (): Promise<this> => {
        const response = await this.connection.Activity({} as WsSMC.Activity);
        this.set(response);
        return this;
    });

    async refresh(): Promise<this> {
        return this.lazyRefresh();
    }
}
