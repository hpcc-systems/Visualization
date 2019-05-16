import { Cache, StateObject } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection";
import { DFUService, WsDfu } from "../services/wsDFU";

export class LogicalFileCache extends Cache<{ BaseUrl: string, Cluster: string, Name: string }, LogicalFile> {
    constructor() {
        super((obj) => {
            return `${obj.BaseUrl}-${obj.Cluster}-${obj.Name}`;
        });
    }
}
const _store = new LogicalFileCache();

export interface FileDetailEx extends WsDfu.FileDetail {
    Cluster: string;
}

export class LogicalFile extends StateObject<FileDetailEx, FileDetailEx> implements FileDetailEx {
    protected connection: DFUService;
    get BaseUrl() { return this.connection.baseUrl; }

    get Cluster(): string { return this.get("Cluster"); }
    get Name(): string { return this.get("Name"); }

    get Filename(): string { return this.get("Filename"); }
    get Prefix(): string { return this.get("Prefix"); }
    get NodeGroup(): string { return this.get("NodeGroup"); }
    get NumParts(): number { return this.get("NumParts"); }
    get Description(): string { return this.get("Description"); }
    get Dir(): string { return this.get("Dir"); }
    get PathMask(): string { return this.get("PathMask"); }
    get Filesize(): string { return this.get("Filesize"); }
    get FileSizeInt64(): number { return this.get("FileSizeInt64"); }
    get RecordSize(): string { return this.get("RecordSize"); }
    get RecordCount(): string { return this.get("RecordCount"); }
    get RecordSizeInt64(): number { return this.get("RecordSizeInt64"); }
    get RecordCountInt64(): number { return this.get("RecordCountInt64"); }
    get Wuid(): string { return this.get("Wuid"); }
    get Owner(): string { return this.get("Owner"); }
    get JobName(): string { return this.get("JobName"); }
    get Persistent(): string { return this.get("Persistent"); }
    get Format(): string { return this.get("Format"); }
    get MaxRecordSize(): string { return this.get("MaxRecordSize"); }
    get CsvSeparate(): string { return this.get("CsvSeparate"); }
    get CsvQuote(): string { return this.get("CsvQuote"); }
    get CsvTerminate(): string { return this.get("CsvTerminate"); }
    get CsvEscape(): string { return this.get("CsvEscape"); }
    get Modified(): string { return this.get("Modified"); }
    get Ecl(): string { return this.get("Ecl"); }
    get Stat(): WsDfu.Stat { return this.get("Stat"); }
    get DFUFilePartsOnClusters(): WsDfu.DFUFilePartsOnClusters { return this.get("DFUFilePartsOnClusters"); }
    get isSuperfile(): boolean { return this.get("isSuperfile"); }
    get ShowFileContent(): boolean { return this.get("ShowFileContent"); }
    get subfiles(): WsDfu.Subfiles { return this.get("subfiles"); }
    get Superfiles(): WsDfu.Superfiles { return this.get("Superfiles"); }
    get ProtectList(): WsDfu.ProtectList { return this.get("ProtectList"); }
    get FromRoxieCluster(): boolean { return this.get("FromRoxieCluster"); }
    get Graphs(): WsDfu.Graphs { return this.get("Graphs"); }
    get UserPermission(): string { return this.get("UserPermission"); }
    get ContentType(): string { return this.get("ContentType"); }
    get CompressedFileSize(): number { return this.get("CompressedFileSize"); }
    get PercentCompressed(): string { return this.get("PercentCompressed"); }
    get IsCompressed(): boolean { return this.get("IsCompressed"); }
    get BrowseData(): boolean { return this.get("BrowseData"); }
    get jsonInfo(): string { return this.get("jsonInfo"); }
    get binInfo(): string { return this.get("binInfo"); }
    get PackageID(): string { return this.get("PackageID"); }
    get Partition(): WsDfu.Partition { return this.get("Partition"); }
    get Blooms(): WsDfu.Blooms { return this.get("Blooms"); }
    get ExpireDays(): number { return this.get("ExpireDays"); }
    get KeyType(): string { return this.get("KeyType"); }

    get properties(): FileDetailEx { return this.get(); }

    static attach(optsConnection: IOptions | IConnection | DFUService, Cluster: string, Name: string): LogicalFile {
        const retVal: LogicalFile = _store.get({ BaseUrl: optsConnection.baseUrl, Cluster, Name }, () => {
            return new LogicalFile(optsConnection, Cluster, Name);
        });
        return retVal;
    }

    protected constructor(optsConnection: IOptions | IConnection | DFUService, Cluster: string, Name: string) {
        super();
        if (optsConnection instanceof DFUService) {
            this.connection = optsConnection;
        } else {
            this.connection = new DFUService(optsConnection);
        }

        this.clear({
            Cluster,
            Name
        });
    }

    fetchInfo(): Promise<WsDfu.FileDetail> {
        return this.connection.DFUInfo({ Cluster: this.Cluster, Name: this.Name }).then(response => {
            this.set({
                Cluster: this.Cluster,
                ...response.FileDetail
            });
            return response.FileDetail;
        });
    }
}
