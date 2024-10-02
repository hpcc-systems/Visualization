import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsDfu {

    export type base64Binary = string;
    export type long = number;
    export type int = number;
    export type double = number;

    export enum DFUArrayActions {
        Delete = "Delete",
        AddToSuperfile = "Add To Superfile",
        ChangeProtection = "Change Protection",
        ChangeRestriction = "Change Restriction"
    }

    export enum DFUChangeProtection {
        NoChange = 0,
        Protect = 1,
        Unprotect = 2,
        UnprotectAll = 3
    }

    export enum DFUChangeRestriction {
        NoChange = 0,
        Restrict = 1,
        Unrestricted = 2
    }

    export enum DFUDefFileFormat {
        xml = "xml",
        def = "def"
    }

    export enum FileAccessRole {
        Token = "Token",
        Engine = "Engine",
        External = "External"
    }

    export enum SecAccessType {
        None = "None",
        Access = "Access",
        Read = "Read",
        Write = "Write",
        Full = "Full"
    }

    export enum DFUFileType {
        Flat = "Flat",
        Index = "Index",
        Xml = "Xml",
        Csv = "Csv",
        Json = "Json",
        IndexLocal = "IndexLocal",
        IndexPartitioned = "IndexPartitioned",
        Unset = "Unset"
    }

    export interface AddRequest {
        dstname?: string;
        xmlmap?: base64Binary;
        dstcluster?: string;
    }

    export interface Exception {
        Code: string;
        Audience: string;
        Source: string;
        Message: string;
    }

    export interface Exceptions {
        Source: string;
        Exception: Exception[];
    }

    export interface AddResponse {
        Exceptions: Exceptions;
    }

    export interface AddRemoteRequest {
        dstname?: string;
        srcname?: string;
        srcdali?: string;
        srcusername?: string;
        srcpassword?: string;
    }

    export interface AddRemoteResponse {
        Exceptions: Exceptions;
    }

    export interface names {
        Item: string[];
    }

    export interface AddtoSuperfileRequest {
        Superfile?: string;
        Subfiles?: string;
        names?: names;
        ExistingFile?: boolean;
        BackToPage?: string;
    }

    export interface SubfileNames {
        SubfileName: string[];
    }

    export interface AddtoSuperfileResponse {
        Exceptions: Exceptions;
        Subfiles: string;
        BackToPage: string;
        SubfileNames: SubfileNames;
    }

    export interface LogicalFiles {
        Item: string[];
    }

    export interface DFUArrayActionRequest {
        Type?: DFUArrayActions;
        NoDelete?: boolean;
        BackToPage?: string;
        LogicalFiles?: LogicalFiles;
        removeFromSuperfiles?: boolean;
        removeRecursively?: boolean;
        Protect?: DFUChangeProtection;
        Restrict?: DFUChangeRestriction;
    }

    export interface DFUActionInfo {
        FileName: string;
        NodeGroup: string;
        ActionResult: string;
        Failed: boolean;
    }

    export interface ActionResults {
        DFUActionInfo: DFUActionInfo[];
    }

    export interface DFUArrayActionResponse {
        Exceptions: Exceptions;
        BackToPage: string;
        RedirectTo: string;
        ActionResults: ActionResults;
    }

    export interface DFUBrowseDataRequest {
        LogicalName?: string;
        FilterBy?: string;
        ShowColumns?: string;
        SchemaOnly?: boolean;
        StartForGoback?: long;
        CountForGoback?: int;
        ChooseFile?: int;
        Cluster?: string;
        ClusterType?: string;
        ParentName?: string;
        Start?: long;
        Count?: int;
        DisableUppercaseTranslation?: boolean;
    }

    export interface DFUDataColumn {
        ColumnID: int;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: int;
        MaxSize: int;
        ColumnEclType: string;
        ColumnRawSize: int;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns;
    }

    export interface DataColumns {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface ColumnHidden {
        ColumnID: int;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: int;
        MaxSize: int;
        ColumnEclType: string;
        ColumnRawSize: int;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns;
    }

    export interface ColumnsHidden {
        ColumnHidden: ColumnHidden[];
    }

    export interface DFUBrowseDataResponse {
        Exceptions: Exceptions;
        Name: string;
        LogicalName: string;
        FilterBy: string;
        FilterForGoBack: string;
        ColumnsHidden: ColumnsHidden;
        ColumnCount: int;
        StartForGoback: long;
        CountForGoback: int;
        ChooseFile: int;
        SchemaOnly: boolean;
        Cluster: string;
        ClusterType: string;
        ParentName: string;
        Start: long;
        Count: long;
        PageSize: long;
        Total: long;
        Result: string;
        MsgToDisplay: string;
        DisableUppercaseTranslation: boolean;
    }

    export interface DFUDefFileRequest {
        Name?: string;
        Format?: DFUDefFileFormat;
    }

    export interface DFUDefFileResponse {
        Exceptions: Exceptions;
        defFile: base64Binary;
    }

    export interface RequestBase {
        Name: string;
        Cluster: string;
        JobId: string;
        ExpirySeconds: int;
        AccessRole: FileAccessRole;
        AccessType: SecAccessType;
        ReturnJsonTypeInfo: boolean;
        ReturnBinTypeInfo: boolean;
    }

    export interface DFUFileAccessRequest {
        RequestBase?: RequestBase;
    }

    export interface DFUPartLocation {
        LocationIndex: int;
        Host: string;
    }

    export interface FileLocations {
        DFUPartLocation: DFUPartLocation[];
    }

    export interface DFUFileCopy {
        CopyIndex: int;
        LocationIndex: int;
        Path: string;
    }

    export interface Copies {
        DFUFileCopy: DFUFileCopy[];
    }

    export interface DFUFilePart {
        PartIndex: int;
        Copies: Copies;
        TopLevelKey: boolean;
    }

    export interface FileParts {
        DFUFilePart: DFUFilePart[];
    }

    export interface AccessInfo {
        MetaInfoBlob: string;
        ExpiryTime: string;
        NumParts: int;
        FileLocations: FileLocations;
        FileParts: FileParts;
        RecordTypeInfoJson: string;
        fileAccessPort: int;
        fileAccessSSL: boolean;
    }

    export interface DFUFileAccessResponse {
        Exceptions: Exceptions;
        AccessInfo: AccessInfo;
        Type: DFUFileType;
    }

    export interface DFUFileAccessV2Request {
        Name?: string;
        Cluster?: string;
        RequestId?: string;
        ExpirySeconds?: int;
        ReturnTextResponse?: boolean;
        SessionId?: long;
        LockTimeoutMs?: int;
    }

    export interface PartLocations {
        Item: string[];
    }

    export interface DFUFileCreateRequest {
        ECLRecordDefinition?: string;
        PartLocations?: PartLocations;
        RequestBase?: RequestBase;
    }

    export interface DFUFileCreateResponse {
        Exceptions: Exceptions;
        FileId: string;
        Warning: string;
        AccessInfo: AccessInfo;
    }

    export interface DFUFileCreateV2Request {
        Name?: string;
        Cluster?: string;
        Type?: DFUFileType;
        ECLRecordDefinition?: string;
        RequestId?: string;
        ExpirySeconds?: int;
        ReturnTextResponse?: boolean;
        Compressed?: boolean;
        SessionId?: long;
        LockTimeoutMs?: int;
    }

    export interface DFUFilePublishRequest {
        FileId?: string;
        Overwrite?: boolean;
        FileDescriptorBlob?: base64Binary;
        SessionId?: long;
        LockTimeoutMs?: int;
        ECLRecordDefinition?: string;
        RecordCount?: long;
        FileSize?: long;
    }

    export interface DFUFilePublishResponse {
        Exceptions: Exceptions;
    }

    export interface DFUFileViewRequest {
        Scope?: string;
        IncludeSuperOwner?: boolean;
    }

    export interface DFULogicalFile {
        Prefix: string;
        NodeGroup: string;
        Directory: string;
        Description: string;
        Parts: string;
        Name: string;
        Owner: string;
        Totalsize: string;
        RecordCount: string;
        Modified: string;
        LongSize: string;
        LongRecordCount: string;
        isSuperfile: boolean;
        isDirectory: boolean;
        Replicate: boolean;
        IntSize: long;
        IntRecordCount: long;
        FromRoxieCluster: boolean;
        BrowseData: boolean;
        IsCompressed: boolean;
        ContentType: string;
        CompressedFileSize: long;
        SuperOwners: string;
        Persistent: boolean;
        IsProtected: boolean;
        KeyType: string;
        NumOfSubfiles: int;
        Accessed: string;
        AtRestCost: double;
        AccessCost: double;
        MinSkew: long;
        MaxSkew: long;
        MinSkewPart: long;
        MaxSkewPart: long;
    }

    export interface DFULogicalFiles {
        DFULogicalFile: DFULogicalFile[];
    }

    export interface DFUFileViewResponse {
        Exceptions: Exceptions;
        Scope: string;
        NumFiles: int;
        DFULogicalFiles: DFULogicalFiles;
    }

    export interface DFUGetDataColumnsRequest {
        OpenLogicalName?: string;
        LogicalName?: string;
        FilterBy?: string;
        ShowColumns?: string;
        ChooseFile?: int;
        Cluster?: string;
        ClusterType?: string;
        StartIndex?: long;
        EndIndex?: long;
    }

    export interface DFUDataKeyedColumns1 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns2 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns3 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns4 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns5 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns6 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns7 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns8 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns9 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns10 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns11 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns12 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns13 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns14 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns15 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns16 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns17 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns18 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns19 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataKeyedColumns20 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns1 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns2 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns3 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns4 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns5 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns6 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns7 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns8 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns9 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns10 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns11 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns12 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns13 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns14 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns15 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns16 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns17 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns18 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns19 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUDataNonKeyedColumns20 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DFUGetDataColumnsResponse {
        Exceptions: Exceptions;
        LogicalName: string;
        StartIndex: long;
        EndIndex: long;
        DFUDataKeyedColumns1: DFUDataKeyedColumns1;
        DFUDataKeyedColumns2: DFUDataKeyedColumns2;
        DFUDataKeyedColumns3: DFUDataKeyedColumns3;
        DFUDataKeyedColumns4: DFUDataKeyedColumns4;
        DFUDataKeyedColumns5: DFUDataKeyedColumns5;
        DFUDataKeyedColumns6: DFUDataKeyedColumns6;
        DFUDataKeyedColumns7: DFUDataKeyedColumns7;
        DFUDataKeyedColumns8: DFUDataKeyedColumns8;
        DFUDataKeyedColumns9: DFUDataKeyedColumns9;
        DFUDataKeyedColumns10: DFUDataKeyedColumns10;
        DFUDataKeyedColumns11: DFUDataKeyedColumns11;
        DFUDataKeyedColumns12: DFUDataKeyedColumns12;
        DFUDataKeyedColumns13: DFUDataKeyedColumns13;
        DFUDataKeyedColumns14: DFUDataKeyedColumns14;
        DFUDataKeyedColumns15: DFUDataKeyedColumns15;
        DFUDataKeyedColumns16: DFUDataKeyedColumns16;
        DFUDataKeyedColumns17: DFUDataKeyedColumns17;
        DFUDataKeyedColumns18: DFUDataKeyedColumns18;
        DFUDataKeyedColumns19: DFUDataKeyedColumns19;
        DFUDataKeyedColumns20: DFUDataKeyedColumns20;
        DFUDataNonKeyedColumns1: DFUDataNonKeyedColumns1;
        DFUDataNonKeyedColumns2: DFUDataNonKeyedColumns2;
        DFUDataNonKeyedColumns3: DFUDataNonKeyedColumns3;
        DFUDataNonKeyedColumns4: DFUDataNonKeyedColumns4;
        DFUDataNonKeyedColumns5: DFUDataNonKeyedColumns5;
        DFUDataNonKeyedColumns6: DFUDataNonKeyedColumns6;
        DFUDataNonKeyedColumns7: DFUDataNonKeyedColumns7;
        DFUDataNonKeyedColumns8: DFUDataNonKeyedColumns8;
        DFUDataNonKeyedColumns9: DFUDataNonKeyedColumns9;
        DFUDataNonKeyedColumns10: DFUDataNonKeyedColumns10;
        DFUDataNonKeyedColumns11: DFUDataNonKeyedColumns11;
        DFUDataNonKeyedColumns12: DFUDataNonKeyedColumns12;
        DFUDataNonKeyedColumns13: DFUDataNonKeyedColumns13;
        DFUDataNonKeyedColumns14: DFUDataNonKeyedColumns14;
        DFUDataNonKeyedColumns15: DFUDataNonKeyedColumns15;
        DFUDataNonKeyedColumns16: DFUDataNonKeyedColumns16;
        DFUDataNonKeyedColumns17: DFUDataNonKeyedColumns17;
        DFUDataNonKeyedColumns18: DFUDataNonKeyedColumns18;
        DFUDataNonKeyedColumns19: DFUDataNonKeyedColumns19;
        DFUDataNonKeyedColumns20: DFUDataNonKeyedColumns20;
        RowCount: long;
        ShowColumns: string;
        ChooseFile: int;
        Cluster: string;
        ClusterType: string;
    }

    export interface DFUGetFileMetaDataRequest {
        LogicalFileName?: string;
        ClusterName?: string;
        IncludeXmlSchema?: boolean;
        AddHeaderInXmlSchema?: boolean;
        IncludeXmlXPathSchema?: boolean;
        AddHeaderInXmlXPathSchema?: boolean;
    }

    export interface DFUGetFileMetaDataResponse {
        Exceptions: Exceptions;
        TotalColumnCount: int;
        KeyedColumnCount: int;
        DataColumns: DataColumns;
        XmlSchema: string;
        XmlXPathSchema: string;
        TotalResultRows: long;
    }

    export interface DFUInfoRequest {
        Name?: string;
        Cluster?: string;
        UpdateDescription?: boolean;
        QuerySet?: string;
        Query?: string;
        FileDesc?: string;
        IncludeJsonTypeInfo?: boolean;
        IncludeBinTypeInfo?: boolean;
        Protect?: DFUChangeProtection;
        Restrict?: DFUChangeRestriction;
        ForceIndexInfo?: boolean;
    }

    export interface Stat {
        MinSkew: string;
        MaxSkew: string;
        MinSkewInt64: long;
        MaxSkewInt64: long;
        MinSkewPart: long;
        MaxSkewPart: long;
    }

    export interface DFUPart {
        Id: int;
        Copy: int;
        Ip: string;
        Partsize: string;
        PartSizeInt64: long;
        CompressedSize: long;
    }

    export interface DFUFileParts {
        DFUPart: DFUPart[];
    }

    export interface DFUFilePartsOnCluster {
        Cluster: string;
        BaseDir: string;
        ReplicateDir: string;
        Replicate: boolean;
        CanReplicate: boolean;
        DFUFileParts: DFUFileParts;
    }

    export interface DFUFilePartsOnClusters {
        DFUFilePartsOnCluster: DFUFilePartsOnCluster[];
    }

    export interface subfiles {
        Item: string[];
    }

    export interface Superfiles {
        DFULogicalFile: DFULogicalFile[];
    }

    export interface DFUFileProtect {
        Owner: string;
        Modified: string;
    }

    export interface ProtectList {
        DFUFileProtect: DFUFileProtect[];
    }

    export interface Graphs {
        ECLGraph: string[];
    }

    export interface FieldNames {
        Item: string[];
    }

    export interface Partition {
        FieldMask: long;
        FieldNames: FieldNames;
    }

    export interface DFUFileBloom {
        FieldMask: long;
        FieldNames: FieldNames;
        Limit: long;
        Probability: string;
    }

    export interface Blooms {
        DFUFileBloom: DFUFileBloom[];
    }

    export interface ExtendedIndexInfo {
        IsLeafCountEstimated: boolean;
        NumLeafNodes: long;
        NumBlobNodes: long;
        NumBranchNodes: long;
        SizeDiskLeaves: long;
        SizeDiskBlobs: long;
        SizeDiskBranches: long;
        SizeOriginalData: long;
        SizeOriginalBranches: long;
        SizeMemoryLeaves: long;
        SizeMemoryBranches: long;
        BranchCompressionPercent: double;
        DataCompressionPercent: double;
    }

    export interface FileDetail {
        Name: string;
        Filename: string;
        Prefix: string;
        NodeGroup: string;
        NumParts: int;
        Description: string;
        Dir: string;
        PathMask: string;
        Filesize: string;
        FileSizeInt64: long;
        RecordSize: string;
        RecordCount: string;
        RecordSizeInt64: long;
        RecordCountInt64: long;
        Wuid: string;
        Owner: string;
        JobName: string;
        Persistent: string;
        Format: string;
        MaxRecordSize: string;
        CsvSeparate: string;
        CsvQuote: string;
        CsvTerminate: string;
        CsvEscape: string;
        Modified: string;
        Ecl: string;
        Stat: Stat;
        DFUFilePartsOnClusters: DFUFilePartsOnClusters;
        isSuperfile: boolean;
        ShowFileContent: boolean;
        subfiles: subfiles;
        Superfiles: Superfiles;
        ProtectList: ProtectList;
        FromRoxieCluster: boolean;
        Graphs: Graphs;
        UserPermission: string;
        ContentType: string;
        CompressedFileSize: long;
        PercentCompressed: string;
        IsCompressed: boolean;
        IsRestricted: boolean;
        BrowseData: boolean;
        jsonInfo: string;
        binInfo: base64Binary;
        PackageID: string;
        Partition: Partition;
        Blooms: Blooms;
        ExpireDays: int;
        KeyType: string;
        AtRestCost: double;
        AccessCost: double;
        ExpirationDate: string;
        ExtendedIndexInfo: ExtendedIndexInfo;
    }

    export interface DFUInfoResponse {
        Exceptions: Exceptions;
        FileDetail: FileDetail;
    }

    export interface DFUQueryRequest {
        Prefix?: string;
        NodeGroup?: string;
        ContentType?: string;
        InvertContent?: boolean;
        LogicalName?: string;
        Owner?: string;
        StartDate?: string;
        EndDate?: string;
        FileType?: string;
        FileSizeFrom?: long;
        FileSizeTo?: long;
        FirstN?: int;
        PageSize?: int;
        PageStartFrom?: int;
        Sortby?: string;
        Descending?: boolean;
        OneLevelDirFileReturn?: boolean;
        CacheHint?: long;
        MaxNumberOfFiles?: int;
        IncludeSuperOwner?: boolean;
        StartAccessedTime?: string;
        EndAccessedTime?: string;
        MaxSkewFrom?: long;
        MaxSkewTo?: long;
        MinSkewFrom?: long;
        MinSkewTo?: long;
    }

    export interface DFUQueryResponse {
        Exceptions: Exceptions;
        DFULogicalFiles: DFULogicalFiles;
        Prefix: string;
        NodeGroup: string;
        LogicalName: string;
        Description: string;
        Owner: string;
        StartDate: string;
        EndDate: string;
        FileType: string;
        FileSizeFrom: long;
        FileSizeTo: long;
        FirstN: int;
        PageSize: int;
        PageStartFrom: long;
        LastPageFrom: long;
        PageEndAt: long;
        PrevPageFrom: long;
        NextPageFrom: long;
        NumFiles: long;
        Sortby: string;
        Descending: boolean;
        BasicQuery: string;
        ParametersForPaging: string;
        Filters: string;
        CacheHint: long;
        IsSubsetOfFiles: boolean;
        Warning: string;
    }

    export interface DFURecordTypeInfoRequest {
        Name?: string;
        IncludeJsonTypeInfo?: boolean;
        IncludeBinTypeInfo?: boolean;
    }

    export interface DFURecordTypeInfoResponse {
        jsonInfo: string;
        binInfo: base64Binary;
    }

    export interface DFUSearchRequest {
        ShowExample?: string;
    }

    export interface ClusterNames {
        ClusterName: string[];
    }

    export interface FileTypes {
        FileType: string[];
    }

    export interface DFUSearchResponse {
        Exceptions: Exceptions;
        ShowExample: string;
        ClusterNames: ClusterNames;
        FileTypes: FileTypes;
    }

    export interface DFUSearchDataRequest {
        Cluster?: string;
        ClusterType?: string;
        OpenLogicalName?: string;
        FilterBy?: string;
        ShowColumns?: string;
        ChooseFile?: int;
        StartIndex?: long;
        EndIndex?: long;
        LogicalName?: string;
        ParentName?: string;
        StartForGoback?: long;
        CountForGoback?: int;
        Start?: long;
        Count?: int;
        File?: string;
        Key?: string;
        SchemaOnly?: boolean;
        RoxieSelections?: boolean;
        DisableUppercaseTranslation?: boolean;
        SelectedKey?: string;
    }

    export interface DFUSearchDataResponse {
        Exceptions: Exceptions;
        OpenLogicalName: string;
        LogicalName: string;
        ParentName: string;
        StartIndex: long;
        EndIndex: long;
        DFUDataKeyedColumns1: DFUDataKeyedColumns1;
        DFUDataKeyedColumns2: DFUDataKeyedColumns2;
        DFUDataKeyedColumns3: DFUDataKeyedColumns3;
        DFUDataKeyedColumns4: DFUDataKeyedColumns4;
        DFUDataKeyedColumns5: DFUDataKeyedColumns5;
        DFUDataKeyedColumns6: DFUDataKeyedColumns6;
        DFUDataKeyedColumns7: DFUDataKeyedColumns7;
        DFUDataKeyedColumns8: DFUDataKeyedColumns8;
        DFUDataKeyedColumns9: DFUDataKeyedColumns9;
        DFUDataKeyedColumns10: DFUDataKeyedColumns10;
        DFUDataKeyedColumns11: DFUDataKeyedColumns11;
        DFUDataKeyedColumns12: DFUDataKeyedColumns12;
        DFUDataKeyedColumns13: DFUDataKeyedColumns13;
        DFUDataKeyedColumns14: DFUDataKeyedColumns14;
        DFUDataKeyedColumns15: DFUDataKeyedColumns15;
        DFUDataKeyedColumns16: DFUDataKeyedColumns16;
        DFUDataKeyedColumns17: DFUDataKeyedColumns17;
        DFUDataKeyedColumns18: DFUDataKeyedColumns18;
        DFUDataKeyedColumns19: DFUDataKeyedColumns19;
        DFUDataKeyedColumns20: DFUDataKeyedColumns20;
        DFUDataNonKeyedColumns1: DFUDataNonKeyedColumns1;
        DFUDataNonKeyedColumns2: DFUDataNonKeyedColumns2;
        DFUDataNonKeyedColumns3: DFUDataNonKeyedColumns3;
        DFUDataNonKeyedColumns4: DFUDataNonKeyedColumns4;
        DFUDataNonKeyedColumns5: DFUDataNonKeyedColumns5;
        DFUDataNonKeyedColumns6: DFUDataNonKeyedColumns6;
        DFUDataNonKeyedColumns7: DFUDataNonKeyedColumns7;
        DFUDataNonKeyedColumns8: DFUDataNonKeyedColumns8;
        DFUDataNonKeyedColumns9: DFUDataNonKeyedColumns9;
        DFUDataNonKeyedColumns10: DFUDataNonKeyedColumns10;
        DFUDataNonKeyedColumns11: DFUDataNonKeyedColumns11;
        DFUDataNonKeyedColumns12: DFUDataNonKeyedColumns12;
        DFUDataNonKeyedColumns13: DFUDataNonKeyedColumns13;
        DFUDataNonKeyedColumns14: DFUDataNonKeyedColumns14;
        DFUDataNonKeyedColumns15: DFUDataNonKeyedColumns15;
        DFUDataNonKeyedColumns16: DFUDataNonKeyedColumns16;
        DFUDataNonKeyedColumns17: DFUDataNonKeyedColumns17;
        DFUDataNonKeyedColumns18: DFUDataNonKeyedColumns18;
        DFUDataNonKeyedColumns19: DFUDataNonKeyedColumns19;
        DFUDataNonKeyedColumns20: DFUDataNonKeyedColumns20;
        RowCount: long;
        ShowColumns: string;
        ChooseFile: int;
        Name: string;
        FilterBy: string;
        FilterForGoBack: string;
        ColumnsHidden: ColumnsHidden;
        ColumnCount: int;
        StartForGoback: long;
        CountForGoback: int;
        Start: long;
        Count: long;
        PageSize: long;
        Total: long;
        Result: string;
        MsgToDisplay: string;
        Cluster: string;
        ClusterType: string;
        File: string;
        Key: string;
        SchemaOnly: boolean;
        RoxieSelections: boolean;
        DisableUppercaseTranslation: boolean;
        AutoUppercaseTranslation: boolean;
        SelectedKey: string;
    }

    export interface DFUSpaceRequest {
        CountBy?: string;
        ScopeUnder?: string;
        OwnerUnder?: string;
        Interval?: string;
        StartDate?: string;
        EndDate?: string;
    }

    export interface DFUSpaceItem {
        Name: string;
        NumOfFiles: string;
        NumOfFilesUnknown: string;
        TotalSize: string;
        LargestFile: string;
        LargestSize: string;
        SmallestFile: string;
        SmallestSize: string;
        NumOfFilesInt64: long;
        NumOfFilesUnknownInt64: long;
        TotalSizeInt64: long;
        LargestSizeInt64: long;
        SmallestSizeInt64: long;
    }

    export interface DFUSpaceItems {
        DFUSpaceItem: DFUSpaceItem[];
    }

    export interface DFUSpaceResponse {
        Exceptions: Exceptions;
        CountBy: string;
        ScopeUnder: string;
        OwnerUnder: string;
        Interval: string;
        StartDate: string;
        EndDate: string;
        DFUSpaceItems: DFUSpaceItems;
    }

    export interface EclRecordTypeInfoRequest {
        Ecl?: string;
        IncludeJsonTypeInfo?: boolean;
        IncludeBinTypeInfo?: boolean;
    }

    export interface EclRecordTypeInfoResponse {
        jsonInfo: string;
        binInfo: base64Binary;
    }

    export interface EraseHistoryRequest {
        Name?: string;
    }

    export interface Origin {
        Name: string;
        Operation: string;
        Timestamp: string;
        IP: string;
        Path: string;
        Owner: string;
        Workunit: string;
    }

    export interface History {
        Origin: Origin[];
    }

    export interface EraseHistoryResponse {
        Exceptions: Exceptions;
        History: History;
    }

    export interface ListHistoryRequest {
        Name?: string;
    }

    export interface ListHistoryResponse {
        Exceptions: Exceptions;
        History: History;
    }

    export interface WsDfuPingRequest {

    }

    export interface WsDfuPingResponse {

    }

    export interface SavexmlRequest {
        name?: string;
    }

    export interface SavexmlResponse {
        Exceptions: Exceptions;
        xmlmap: base64Binary;
    }

    export interface SuperfileActionRequest {
        action?: string;
        superfile?: string;
        subfiles?: subfiles;
        before?: string;
        delete?: boolean;
        removeSuperfile?: boolean;
    }

    export interface SuperfileActionResponse {
        Exceptions: Exceptions;
        superfile: string;
        retcode: int;
    }

    export interface SuperfileListRequest {
        superfile?: string;
    }

    export interface SuperfileListResponse {
        Exceptions: Exceptions;
        superfile: string;
        subfiles: subfiles;
    }

}

export class DfuServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsDfu", "1.65");
    }

    Add(request: Partial<WsDfu.AddRequest>): Promise<WsDfu.AddResponse> {
        return this._connection.send("Add", request, "json", false, undefined, "AddResponse");
    }

    AddRemote(request: Partial<WsDfu.AddRemoteRequest>): Promise<WsDfu.AddRemoteResponse> {
        return this._connection.send("AddRemote", request, "json", false, undefined, "AddRemoteResponse");
    }

    AddtoSuperfile(request: Partial<WsDfu.AddtoSuperfileRequest>): Promise<WsDfu.AddtoSuperfileResponse> {
        return this._connection.send("AddtoSuperfile", request, "json", false, undefined, "AddtoSuperfileResponse");
    }

    DFUArrayAction(request: Partial<WsDfu.DFUArrayActionRequest>): Promise<WsDfu.DFUArrayActionResponse> {
        return this._connection.send("DFUArrayAction", request, "json", false, undefined, "DFUArrayActionResponse");
    }

    DFUBrowseData(request: Partial<WsDfu.DFUBrowseDataRequest>): Promise<WsDfu.DFUBrowseDataResponse> {
        return this._connection.send("DFUBrowseData", request, "json", false, undefined, "DFUBrowseDataResponse");
    }

    DFUDefFile(request: Partial<WsDfu.DFUDefFileRequest>): Promise<WsDfu.DFUDefFileResponse> {
        return this._connection.send("DFUDefFile", request, "json", false, undefined, "DFUDefFileResponse");
    }

    DFUFileAccess(request: Partial<WsDfu.DFUFileAccessRequest>): Promise<WsDfu.DFUFileAccessResponse> {
        return this._connection.send("DFUFileAccess", request, "json", false, undefined, "DFUFileAccessResponse");
    }

    DFUFileAccessV2(request: Partial<WsDfu.DFUFileAccessV2Request>): Promise<WsDfu.DFUFileAccessResponse> {
        return this._connection.send("DFUFileAccessV2", request, "json", false, undefined, "DFUFileAccessResponse");
    }

    DFUFileCreate(request: Partial<WsDfu.DFUFileCreateRequest>): Promise<WsDfu.DFUFileCreateResponse> {
        return this._connection.send("DFUFileCreate", request, "json", false, undefined, "DFUFileCreateResponse");
    }

    DFUFileCreateV2(request: Partial<WsDfu.DFUFileCreateV2Request>): Promise<WsDfu.DFUFileCreateResponse> {
        return this._connection.send("DFUFileCreateV2", request, "json", false, undefined, "DFUFileCreateResponse");
    }

    DFUFilePublish(request: Partial<WsDfu.DFUFilePublishRequest>): Promise<WsDfu.DFUFilePublishResponse> {
        return this._connection.send("DFUFilePublish", request, "json", false, undefined, "DFUFilePublishResponse");
    }

    DFUFileView(request: Partial<WsDfu.DFUFileViewRequest>): Promise<WsDfu.DFUFileViewResponse> {
        return this._connection.send("DFUFileView", request, "json", false, undefined, "DFUFileViewResponse");
    }

    DFUGetDataColumns(request: Partial<WsDfu.DFUGetDataColumnsRequest>): Promise<WsDfu.DFUGetDataColumnsResponse> {
        return this._connection.send("DFUGetDataColumns", request, "json", false, undefined, "DFUGetDataColumnsResponse");
    }

    DFUGetFileMetaData(request: Partial<WsDfu.DFUGetFileMetaDataRequest>): Promise<WsDfu.DFUGetFileMetaDataResponse> {
        return this._connection.send("DFUGetFileMetaData", request, "json", false, undefined, "DFUGetFileMetaDataResponse");
    }

    DFUInfo(request: Partial<WsDfu.DFUInfoRequest>): Promise<WsDfu.DFUInfoResponse> {
        return this._connection.send("DFUInfo", request, "json", false, undefined, "DFUInfoResponse");
    }

    DFUQuery(request: Partial<WsDfu.DFUQueryRequest>): Promise<WsDfu.DFUQueryResponse> {
        return this._connection.send("DFUQuery", request, "json", false, undefined, "DFUQueryResponse");
    }

    DFURecordTypeInfo(request: Partial<WsDfu.DFURecordTypeInfoRequest>): Promise<WsDfu.DFURecordTypeInfoResponse> {
        return this._connection.send("DFURecordTypeInfo", request, "json", false, undefined, "DFURecordTypeInfoResponse");
    }

    DFUSearch(request: Partial<WsDfu.DFUSearchRequest>): Promise<WsDfu.DFUSearchResponse> {
        return this._connection.send("DFUSearch", request, "json", false, undefined, "DFUSearchResponse");
    }

    DFUSearchData(request: Partial<WsDfu.DFUSearchDataRequest>): Promise<WsDfu.DFUSearchDataResponse> {
        return this._connection.send("DFUSearchData", request, "json", false, undefined, "DFUSearchDataResponse");
    }

    DFUSpace(request: Partial<WsDfu.DFUSpaceRequest>): Promise<WsDfu.DFUSpaceResponse> {
        return this._connection.send("DFUSpace", request, "json", false, undefined, "DFUSpaceResponse");
    }

    EclRecordTypeInfo(request: Partial<WsDfu.EclRecordTypeInfoRequest>): Promise<WsDfu.EclRecordTypeInfoResponse> {
        return this._connection.send("EclRecordTypeInfo", request, "json", false, undefined, "EclRecordTypeInfoResponse");
    }

    EraseHistory(request: Partial<WsDfu.EraseHistoryRequest>): Promise<WsDfu.EraseHistoryResponse> {
        return this._connection.send("EraseHistory", request, "json", false, undefined, "EraseHistoryResponse");
    }

    ListHistory(request: Partial<WsDfu.ListHistoryRequest>): Promise<WsDfu.ListHistoryResponse> {
        return this._connection.send("ListHistory", request, "json", false, undefined, "ListHistoryResponse");
    }

    Ping(request: Partial<WsDfu.WsDfuPingRequest>): Promise<WsDfu.WsDfuPingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "WsDfuPingResponse");
    }

    Savexml(request: Partial<WsDfu.SavexmlRequest>): Promise<WsDfu.SavexmlResponse> {
        return this._connection.send("Savexml", request, "json", false, undefined, "SavexmlResponse");
    }

    SuperfileAction(request: Partial<WsDfu.SuperfileActionRequest>): Promise<WsDfu.SuperfileActionResponse> {
        return this._connection.send("SuperfileAction", request, "json", false, undefined, "SuperfileActionResponse");
    }

    SuperfileList(request: Partial<WsDfu.SuperfileListRequest>): Promise<WsDfu.SuperfileListResponse> {
        return this._connection.send("SuperfileList", request, "json", false, undefined, "SuperfileListResponse");
    }

}
