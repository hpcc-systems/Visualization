import { StateObject } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { WorkunitsService, WUInfo, } from "../services/wsWorkunits";

export interface ECLSourceFileEx extends WUInfo.ECLSourceFile {
    Wuid: string;
}

export class SourceFile extends StateObject<ECLSourceFileEx, ECLSourceFileEx> implements ECLSourceFileEx {
    protected connection: WorkunitsService;

    get properties(): WUInfo.ECLSourceFile { return this.get(); }
    get Wuid(): string { return this.get("Wuid"); }
    get FileCluster(): string { return this.get("FileCluster"); }
    get Name(): string { return this.get("Name"); }
    get IsSuperFile(): boolean { return this.get("IsSuperFile"); }
    get Subs(): number { return this.get("Subs"); }
    get Count(): number { return this.get("Count"); }
    get ECLSourceFiles(): WUInfo.ECLSourceFiles { return this.get("ECLSourceFiles"); }

    constructor(optsConnection: IOptions | IConnection | WorkunitsService, wuid: string, eclSourceFile: WUInfo.ECLSourceFile) {
        super();
        if (optsConnection instanceof WorkunitsService) {
            this.connection = optsConnection;
        } else {
            this.connection = new WorkunitsService(optsConnection);
        }

        this.set({
            Wuid: wuid,
            ...eclSourceFile
        });
    }
}
