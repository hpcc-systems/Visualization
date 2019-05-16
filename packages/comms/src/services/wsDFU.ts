import { IConnection, IOptions } from "../connection";
import { Service } from "../espConnection";

/*
    Response structures generated via:
    * http://localhost:8010/WsDfu/?ver_=1.5&reqjson_
    * http://localhost:8010/WsDfu/?ver_=1.5&respjson_
    * http://json2ts.com/
*/

export namespace WsDfu {
    export interface AddRequest {
        dstname: string;
        xmlmap: string;
    }

    export interface AddRemoteRequest {
        dstname: string;
        srcname: string;
        srcdali: string;
        srcusername: string;
        srcpassword: string;
    }

    export interface Names {
        Item: string[];
    }

    export interface AddtoSuperfileRequest {
        Superfile: string;
        Subfiles: string;
        names: Names;
        ExistingFile: boolean;
        BackToPage: string;
    }

    export interface LogicalFiles {
        Item: string[];
    }

    export interface DFUArrayActionRequest {
        Type: string;
        NoDelete: boolean;
        BackToPage: string;
        LogicalFiles: LogicalFiles;
        removeFromSuperfiles: boolean;
        removeRecursively: boolean;
    }

    export interface DFUBrowseDataRequest {
        LogicalName: string;
        FilterBy: string;
        ShowColumns: string;
        SchemaOnly: boolean;
        StartForGoback: number;
        CountForGoback: number;
        ChooseFile: number;
        Cluster: string;
        ClusterType: string;
        ParentName: string;
        Start: number;
        Count: number;
        DisableUppercaseTranslation: boolean;
    }

    export interface DFUDefFileRequest {
        Name: string;
        Format: string;
    }

    export interface RequestBase {
        Name: string;
        Cluster: string;
        JobId: string;
        ExpirySeconds: number;
        AccessRole: string;
        AccessType: string;
        ReturnJsonTypeInfo: boolean;
        ReturnBinTypeInfo: boolean;
    }

    export interface DFUFileAccessRequest {
        RequestBase: RequestBase;
    }

    export interface DFUFileAccessV2Request {
        Name: string;
        Cluster: string;
        RequestId: string;
        ExpirySeconds: number;
        ReturnTextResponse: boolean;
    }

    export interface PartLocations {
        Item: string[];
    }

    export interface RequestBase2 {
        Name: string;
        Cluster: string;
        JobId: string;
        ExpirySeconds: number;
        AccessRole: string;
        AccessType: string;
        ReturnJsonTypeInfo: boolean;
        ReturnBinTypeInfo: boolean;
    }

    export interface DFUFileCreateRequest {
        ECLRecordDefinition: string;
        PartLocations: PartLocations;
        RequestBase: RequestBase2;
    }

    export interface DFUFileCreateV2Request {
        Name: string;
        Cluster: string;
        Type: string;
        ECLRecordDefinition: string;
        RequestId: string;
        ExpirySeconds: number;
        ReturnTextResponse: boolean;
        Compressed: boolean;
    }

    export interface DFUFilePublishRequest {
        FileId: string;
        Overwrite: boolean;
        FileDescriptorBlob: string;
        ECLRecordDefinition: string;
        RecordCount: number;
        FileSize: number;
    }

    export interface DFUFileViewRequest {
        Scope: string;
        IncludeSuperOwner: boolean;
    }

    export interface DFUGetDataColumnsRequest {
        OpenLogicalName: string;
        LogicalName: string;
        FilterBy: string;
        ShowColumns: string;
        ChooseFile: number;
        Cluster: string;
        ClusterType: string;
        StartIndex: number;
        EndIndex: number;
    }

    export interface DFUGetFileMetaDataRequest {
        LogicalFileName: string;
        ClusterName: string;
        IncludeXmlSchema: boolean;
        AddHeaderInXmlSchema: boolean;
        IncludeXmlXPathSchema: boolean;
        AddHeaderInXmlXPathSchema: boolean;
    }

    export interface DFUInfoRequest {
        Name: string;
        Cluster: string;
        UpdateDescription?: boolean;
        QuerySet?: string;
        Query?: string;
        FileDesc?: string;
        IncludeJsonTypeInfo?: boolean;
        IncludeBinTypeInfo?: boolean;
        Protect?: string;
    }

    export interface DFUQueryRequest {
        Prefix?: string;
        NodeGroup?: string;
        ContentType?: string;
        LogicalName?: string;
        Owner?: string;
        StartDate?: string;
        EndDate?: string;
        FileType?: string;
        FileSizeFrom?: number;
        FileSizeTo?: number;
        FirstN?: number;
        PageSize?: number;
        PageStartFrom?: number;
        Sortby?: string;
        Descending?: boolean;
        OneLevelDirFileReturn?: boolean;
        CacheHint?: number;
        MaxNumberOfFiles?: number;
        IncludeSuperOwner?: boolean;
    }

    export interface DFURecordTypeInfoRequest {
        Name: string;
        IncludeJsonTypeInfo: boolean;
        IncludeBinTypeInfo: boolean;
    }

    export interface DFUSearchRequest {
        ShowExample: string;
    }

    export interface DFUSearchDataRequest {
        Cluster: string;
        ClusterType: string;
        OpenLogicalName: string;
        FilterBy: string;
        ShowColumns: string;
        ChooseFile: number;
        StartIndex: number;
        EndIndex: number;
        LogicalName: string;
        ParentName: string;
        StartForGoback: number;
        CountForGoback: number;
        Start: number;
        Count: number;
        File: string;
        Key: string;
        SchemaOnly: boolean;
        RoxieSelections: boolean;
        DisableUppercaseTranslation: boolean;
        SelectedKey: string;
    }

    export interface DFUSpaceRequest {
        CountBy: string;
        ScopeUnder: string;
        OwnerUnder: string;
        Interval: string;
        StartDate: string;
        EndDate: string;
    }

    export interface EclRecordTypeInfoRequest {
        Ecl: string;
        IncludeJsonTypeInfo: boolean;
        IncludeBinTypeInfo: boolean;
    }

    export interface EraseHistoryRequest {
        Name: string;
    }

    export interface ListHistoryRequest {
        Name: string;
    }

    export interface WsDfuPingRequest {
    }

    export interface SavexmlRequest {
        name: string;
    }

    export interface Subfiles {
        Item: string[];
    }

    export interface SuperfileActionRequest {
        action: string;
        superfile: string;
        subfiles: Subfiles;
        before: string;
        delete: boolean;
        removeSuperfile: boolean;
    }

    export interface SuperfileListRequest {
        superfile: string;
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

    export interface AddRemoteResponse {
        Exceptions: Exceptions;
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

    export interface DataColumns {
        DFUDataColumn: any[];
    }

    export interface ColumnHidden {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
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
        ColumnCount: number;
        StartForGoback: number;
        CountForGoback: number;
        ChooseFile: number;
        SchemaOnly: boolean;
        Cluster: string;
        ClusterType: string;
        ParentName: string;
        Start: number;
        Count: number;
        PageSize: number;
        Total: number;
        Result: string;
        MsgToDisplay: string;
        DisableUppercaseTranslation: boolean;
    }

    export interface DFUDefFileResponse {
        Exceptions: Exceptions;
        defFile: string;
    }

    export interface DFUPartLocation {
        LocationIndex: number;
        Host: string;
    }

    export interface FileLocations {
        DFUPartLocation: DFUPartLocation[];
    }

    export interface DFUFileCopy {
        CopyIndex: number;
        LocationIndex: number;
        Path: string;
    }

    export interface Copies {
        DFUFileCopy: DFUFileCopy[];
    }

    export interface DFUFilePart {
        PartIndex: number;
        Copies: Copies;
    }

    export interface FileParts {
        DFUFilePart: DFUFilePart[];
    }

    export interface AccessInfo {
        MetaInfoBlob: string;
        ExpiryTime: string;
        NumParts: number;
        FileLocations: FileLocations;
        FileParts: FileParts;
        RecordTypeInfoJson: string;
        fileAccessPort: number;
        fileAccessSSL: boolean;
    }

    export interface DFUFileAccessResponse {
        Exceptions: Exceptions;
        AccessInfo: AccessInfo;
    }

    export interface DFUPartLocation2 {
        LocationIndex: number;
        Host: string;
    }

    export interface FileLocations2 {
        DFUPartLocation: DFUPartLocation2[];
    }

    export interface DFUFileCopy2 {
        CopyIndex: number;
        LocationIndex: number;
        Path: string;
    }

    export interface Copies2 {
        DFUFileCopy: DFUFileCopy2[];
    }

    export interface DFUFilePart2 {
        PartIndex: number;
        Copies: Copies2;
    }

    export interface FileParts2 {
        DFUFilePart: DFUFilePart2[];
    }

    export interface AccessInfo2 {
        MetaInfoBlob: string;
        ExpiryTime: string;
        NumParts: number;
        FileLocations: FileLocations2;
        FileParts: FileParts2;
        RecordTypeInfoJson: string;
        fileAccessPort: number;
        fileAccessSSL: boolean;
    }

    export interface DFUFileCreateResponse {
        Exceptions: Exceptions;
        FileId: string;
        Warning: string;
        AccessInfo: AccessInfo2;
    }

    export interface DFUFilePublishResponse {
        Exceptions: Exceptions;
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
        IntSize: number;
        IntRecordCount: number;
        FromRoxieCluster: boolean;
        BrowseData: boolean;
        IsCompressed: boolean;
        ContentType: string;
        CompressedFileSize: number;
        SuperOwners: string;
        Persistent: boolean;
        IsProtected: boolean;
        KeyType: string;
    }

    export interface DFULogicalFiles {
        DFULogicalFile: DFULogicalFile[];
    }

    export interface DFUFileViewResponse {
        Exceptions: Exceptions;
        Scope: string;
        NumFiles: number;
        DFULogicalFiles: DFULogicalFiles;
    }

    export interface DataColumns2 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns2;
    }

    export interface DFUDataKeyedColumns1 {
        DFUDataColumn: DFUDataColumn[];
    }

    export interface DataColumns3 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn2 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns3;
    }

    export interface DFUDataKeyedColumns2 {
        DFUDataColumn: DFUDataColumn2[];
    }

    export interface DataColumns4 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn3 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns4;
    }

    export interface DFUDataKeyedColumns3 {
        DFUDataColumn: DFUDataColumn3[];
    }

    export interface DataColumns5 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn4 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns5;
    }

    export interface DFUDataKeyedColumns4 {
        DFUDataColumn: DFUDataColumn4[];
    }

    export interface DataColumns6 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn5 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns6;
    }

    export interface DFUDataKeyedColumns5 {
        DFUDataColumn: DFUDataColumn5[];
    }

    export interface DataColumns7 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn6 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns7;
    }

    export interface DFUDataKeyedColumns6 {
        DFUDataColumn: DFUDataColumn6[];
    }

    export interface DataColumns8 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn7 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns8;
    }

    export interface DFUDataKeyedColumns7 {
        DFUDataColumn: DFUDataColumn7[];
    }

    export interface DataColumns9 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn8 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns9;
    }

    export interface DFUDataKeyedColumns8 {
        DFUDataColumn: DFUDataColumn8[];
    }

    export interface DataColumns10 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn9 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns10;
    }

    export interface DFUDataKeyedColumns9 {
        DFUDataColumn: DFUDataColumn9[];
    }

    export interface DataColumns11 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn10 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns11;
    }

    export interface DFUDataKeyedColumns10 {
        DFUDataColumn: DFUDataColumn10[];
    }

    export interface DataColumns12 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn11 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns12;
    }

    export interface DFUDataKeyedColumns11 {
        DFUDataColumn: DFUDataColumn11[];
    }

    export interface DataColumns13 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn12 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns13;
    }

    export interface DFUDataKeyedColumns12 {
        DFUDataColumn: DFUDataColumn12[];
    }

    export interface DataColumns14 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn13 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns14;
    }

    export interface DFUDataKeyedColumns13 {
        DFUDataColumn: DFUDataColumn13[];
    }

    export interface DataColumns15 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn14 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns15;
    }

    export interface DFUDataKeyedColumns14 {
        DFUDataColumn: DFUDataColumn14[];
    }

    export interface DataColumns16 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn15 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns16;
    }

    export interface DFUDataKeyedColumns15 {
        DFUDataColumn: DFUDataColumn15[];
    }

    export interface DataColumns17 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn16 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns17;
    }

    export interface DFUDataKeyedColumns16 {
        DFUDataColumn: DFUDataColumn16[];
    }

    export interface DataColumns18 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn17 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns18;
    }

    export interface DFUDataKeyedColumns17 {
        DFUDataColumn: DFUDataColumn17[];
    }

    export interface DataColumns19 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn18 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns19;
    }

    export interface DFUDataKeyedColumns18 {
        DFUDataColumn: DFUDataColumn18[];
    }

    export interface DataColumns20 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn19 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns20;
    }

    export interface DFUDataKeyedColumns19 {
        DFUDataColumn: DFUDataColumn19[];
    }

    export interface DataColumns21 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn20 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns21;
    }

    export interface DFUDataKeyedColumns20 {
        DFUDataColumn: DFUDataColumn20[];
    }

    export interface DataColumns22 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn21 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns22;
    }

    export interface DFUDataNonKeyedColumns1 {
        DFUDataColumn: DFUDataColumn21[];
    }

    export interface DataColumns23 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn22 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns23;
    }

    export interface DFUDataNonKeyedColumns2 {
        DFUDataColumn: DFUDataColumn22[];
    }

    export interface DataColumns24 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn23 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns24;
    }

    export interface DFUDataNonKeyedColumns3 {
        DFUDataColumn: DFUDataColumn23[];
    }

    export interface DataColumns25 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn24 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns25;
    }

    export interface DFUDataNonKeyedColumns4 {
        DFUDataColumn: DFUDataColumn24[];
    }

    export interface DataColumns26 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn25 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns26;
    }

    export interface DFUDataNonKeyedColumns5 {
        DFUDataColumn: DFUDataColumn25[];
    }

    export interface DataColumns27 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn26 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns27;
    }

    export interface DFUDataNonKeyedColumns6 {
        DFUDataColumn: DFUDataColumn26[];
    }

    export interface DataColumns28 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn27 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns28;
    }

    export interface DFUDataNonKeyedColumns7 {
        DFUDataColumn: DFUDataColumn27[];
    }

    export interface DataColumns29 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn28 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns29;
    }

    export interface DFUDataNonKeyedColumns8 {
        DFUDataColumn: DFUDataColumn28[];
    }

    export interface DataColumns30 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn29 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns30;
    }

    export interface DFUDataNonKeyedColumns9 {
        DFUDataColumn: DFUDataColumn29[];
    }

    export interface DataColumns31 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn30 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns31;
    }

    export interface DFUDataNonKeyedColumns10 {
        DFUDataColumn: DFUDataColumn30[];
    }

    export interface DataColumns32 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn31 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns32;
    }

    export interface DFUDataNonKeyedColumns11 {
        DFUDataColumn: DFUDataColumn31[];
    }

    export interface DataColumns33 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn32 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns33;
    }

    export interface DFUDataNonKeyedColumns12 {
        DFUDataColumn: DFUDataColumn32[];
    }

    export interface DataColumns34 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn33 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns34;
    }

    export interface DFUDataNonKeyedColumns13 {
        DFUDataColumn: DFUDataColumn33[];
    }

    export interface DataColumns35 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn34 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns35;
    }

    export interface DFUDataNonKeyedColumns14 {
        DFUDataColumn: DFUDataColumn34[];
    }

    export interface DataColumns36 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn35 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns36;
    }

    export interface DFUDataNonKeyedColumns15 {
        DFUDataColumn: DFUDataColumn35[];
    }

    export interface DataColumns37 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn36 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns37;
    }

    export interface DFUDataNonKeyedColumns16 {
        DFUDataColumn: DFUDataColumn36[];
    }

    export interface DataColumns38 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn37 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns38;
    }

    export interface DFUDataNonKeyedColumns17 {
        DFUDataColumn: DFUDataColumn37[];
    }

    export interface DataColumns39 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn38 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns39;
    }

    export interface DFUDataNonKeyedColumns18 {
        DFUDataColumn: DFUDataColumn38[];
    }

    export interface DataColumns40 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn39 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns40;
    }

    export interface DFUDataNonKeyedColumns19 {
        DFUDataColumn: DFUDataColumn39[];
    }

    export interface DataColumns41 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn40 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns41;
    }

    export interface DFUDataNonKeyedColumns20 {
        DFUDataColumn: DFUDataColumn40[];
    }

    export interface DFUGetDataColumnsResponse {
        Exceptions: Exceptions;
        LogicalName: string;
        StartIndex: number;
        EndIndex: number;
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
        RowCount: number;
        ShowColumns: string;
        ChooseFile: number;
        Cluster: string;
        ClusterType: string;
    }

    export interface DataColumns43 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn41 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns43;
    }

    export interface DataColumns42 {
        DFUDataColumn: DFUDataColumn41[];
    }

    export interface DFUGetFileMetaDataResponse {
        Exceptions: Exceptions;
        TotalColumnCount: number;
        KeyedColumnCount: number;
        DataColumns: DataColumns42;
        XmlSchema: string;
        XmlXPathSchema: string;
        TotalResultRows: number;
    }

    export interface Stat {
        MinSkew: string;
        MaxSkew: string;
        MinSkewInt64: number;
        MaxSkewInt64: number;
    }

    export interface DFUPart {
        Id: number;
        Copy: number;
        Ip: string;
        Partsize: string;
        PartSizeInt64: number;
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

    export interface Subfiles {
        Item: string[];
    }

    export interface DFULogicalFile2 {
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
        IntSize: number;
        IntRecordCount: number;
        FromRoxieCluster: boolean;
        BrowseData: boolean;
        IsCompressed: boolean;
        ContentType: string;
        CompressedFileSize: number;
        SuperOwners: string;
        Persistent: boolean;
        IsProtected: boolean;
        KeyType: string;
    }

    export interface Superfiles {
        DFULogicalFile: DFULogicalFile2[];
    }

    export interface DFUFileProtect {
        Owner: string;
        Count: number;
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
        FieldMask: number;
        FieldNames: FieldNames;
    }

    export interface FieldNames2 {
        Item: string[];
    }

    export interface DFUFileBloom {
        FieldMask: number;
        FieldNames: FieldNames2;
        Limit: number;
        Probability: string;
    }

    export interface Blooms {
        DFUFileBloom: DFUFileBloom[];
    }

    export interface FileDetail {
        Name: string;
        Filename: string;
        Prefix: string;
        NodeGroup: string;
        NumParts: number;
        Description: string;
        Dir: string;
        PathMask: string;
        Filesize: string;
        FileSizeInt64: number;
        RecordSize: string;
        RecordCount: string;
        RecordSizeInt64: number;
        RecordCountInt64: number;
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
        subfiles: Subfiles;
        Superfiles: Superfiles;
        ProtectList: ProtectList;
        FromRoxieCluster: boolean;
        Graphs: Graphs;
        UserPermission: string;
        ContentType: string;
        CompressedFileSize: number;
        PercentCompressed: string;
        IsCompressed: boolean;
        BrowseData: boolean;
        jsonInfo: string;
        binInfo: string;
        PackageID: string;
        Partition: Partition;
        Blooms: Blooms;
        ExpireDays: number;
        KeyType: string;
    }

    export interface DFUInfoResponse {
        Exceptions: Exceptions;
        FileDetail: FileDetail;
    }

    export interface DFULogicalFile3 {
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
        IntSize: number;
        IntRecordCount: number;
        FromRoxieCluster: boolean;
        BrowseData: boolean;
        IsCompressed: boolean;
        ContentType: string;
        CompressedFileSize: number;
        SuperOwners: string;
        Persistent: boolean;
        IsProtected: boolean;
        KeyType: string;
    }

    export interface DFULogicalFiles2 {
        DFULogicalFile: DFULogicalFile3[];
    }

    export interface DFUQueryResponse {
        Exceptions: Exceptions;
        DFULogicalFiles: DFULogicalFiles2;
        Prefix: string;
        NodeGroup: string;
        LogicalName: string;
        Description: string;
        Owner: string;
        StartDate: string;
        EndDate: string;
        FileType: string;
        FileSizeFrom: number;
        FileSizeTo: number;
        FirstN: number;
        PageSize: number;
        PageStartFrom: number;
        LastPageFrom: number;
        PageEndAt: number;
        PrevPageFrom: number;
        NextPageFrom: number;
        NumFiles: number;
        Sortby: string;
        Descending: boolean;
        BasicQuery: string;
        ParametersForPaging: string;
        Filters: string;
        CacheHint: number;
        IsSubsetOfFiles: boolean;
        Warning: string;
    }

    export interface DFURecordTypeInfoResponse {
        jsonInfo: string;
        binInfo: string;
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

    export interface DataColumns44 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn42 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns44;
    }

    export interface DFUDataKeyedColumns110 {
        DFUDataColumn: DFUDataColumn42[];
    }

    export interface DataColumns45 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn43 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns45;
    }

    export interface DFUDataKeyedColumns22 {
        DFUDataColumn: DFUDataColumn43[];
    }

    export interface DataColumns46 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn44 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns46;
    }

    export interface DFUDataKeyedColumns32 {
        DFUDataColumn: DFUDataColumn44[];
    }

    export interface DataColumns47 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn45 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns47;
    }

    export interface DFUDataKeyedColumns42 {
        DFUDataColumn: DFUDataColumn45[];
    }

    export interface DataColumns48 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn46 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns48;
    }

    export interface DFUDataKeyedColumns52 {
        DFUDataColumn: DFUDataColumn46[];
    }

    export interface DataColumns49 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn47 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns49;
    }

    export interface DFUDataKeyedColumns62 {
        DFUDataColumn: DFUDataColumn47[];
    }

    export interface DataColumns50 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn48 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns50;
    }

    export interface DFUDataKeyedColumns72 {
        DFUDataColumn: DFUDataColumn48[];
    }

    export interface DataColumns51 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn49 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns51;
    }

    export interface DFUDataKeyedColumns82 {
        DFUDataColumn: DFUDataColumn49[];
    }

    export interface DataColumns52 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn50 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns52;
    }

    export interface DFUDataKeyedColumns92 {
        DFUDataColumn: DFUDataColumn50[];
    }

    export interface DataColumns53 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn51 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns53;
    }

    export interface DFUDataKeyedColumns102 {
        DFUDataColumn: DFUDataColumn51[];
    }

    export interface DataColumns54 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn52 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns54;
    }

    export interface DFUDataKeyedColumns112 {
        DFUDataColumn: DFUDataColumn52[];
    }

    export interface DataColumns55 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn53 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns55;
    }

    export interface DFUDataKeyedColumns122 {
        DFUDataColumn: DFUDataColumn53[];
    }

    export interface DataColumns56 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn54 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns56;
    }

    export interface DFUDataKeyedColumns132 {
        DFUDataColumn: DFUDataColumn54[];
    }

    export interface DataColumns57 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn55 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns57;
    }

    export interface DFUDataKeyedColumns142 {
        DFUDataColumn: DFUDataColumn55[];
    }

    export interface DataColumns58 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn56 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns58;
    }

    export interface DFUDataKeyedColumns152 {
        DFUDataColumn: DFUDataColumn56[];
    }

    export interface DataColumns59 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn57 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns59;
    }

    export interface DFUDataKeyedColumns162 {
        DFUDataColumn: DFUDataColumn57[];
    }

    export interface DataColumns60 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn58 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns60;
    }

    export interface DFUDataKeyedColumns172 {
        DFUDataColumn: DFUDataColumn58[];
    }

    export interface DataColumns61 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn59 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns61;
    }

    export interface DFUDataKeyedColumns182 {
        DFUDataColumn: DFUDataColumn59[];
    }

    export interface DataColumns62 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn60 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns62;
    }

    export interface DFUDataKeyedColumns192 {
        DFUDataColumn: DFUDataColumn60[];
    }

    export interface DataColumns63 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn61 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns63;
    }

    export interface DFUDataKeyedColumns202 {
        DFUDataColumn: DFUDataColumn61[];
    }

    export interface DataColumns64 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn62 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns64;
    }

    export interface DFUDataNonKeyedColumns110 {
        DFUDataColumn: DFUDataColumn62[];
    }

    export interface DataColumns65 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn63 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns65;
    }

    export interface DFUDataNonKeyedColumns22 {
        DFUDataColumn: DFUDataColumn63[];
    }

    export interface DataColumns66 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn64 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns66;
    }

    export interface DFUDataNonKeyedColumns32 {
        DFUDataColumn: DFUDataColumn64[];
    }

    export interface DataColumns67 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn65 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns67;
    }

    export interface DFUDataNonKeyedColumns42 {
        DFUDataColumn: DFUDataColumn65[];
    }

    export interface DataColumns68 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn66 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns68;
    }

    export interface DFUDataNonKeyedColumns52 {
        DFUDataColumn: DFUDataColumn66[];
    }

    export interface DataColumns69 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn67 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns69;
    }

    export interface DFUDataNonKeyedColumns62 {
        DFUDataColumn: DFUDataColumn67[];
    }

    export interface DataColumns70 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn68 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns70;
    }

    export interface DFUDataNonKeyedColumns72 {
        DFUDataColumn: DFUDataColumn68[];
    }

    export interface DataColumns71 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn69 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns71;
    }

    export interface DFUDataNonKeyedColumns82 {
        DFUDataColumn: DFUDataColumn69[];
    }

    export interface DataColumns72 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn70 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns72;
    }

    export interface DFUDataNonKeyedColumns92 {
        DFUDataColumn: DFUDataColumn70[];
    }

    export interface DataColumns73 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn71 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns73;
    }

    export interface DFUDataNonKeyedColumns102 {
        DFUDataColumn: DFUDataColumn71[];
    }

    export interface DataColumns74 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn72 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns74;
    }

    export interface DFUDataNonKeyedColumns112 {
        DFUDataColumn: DFUDataColumn72[];
    }

    export interface DataColumns75 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn73 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns75;
    }

    export interface DFUDataNonKeyedColumns122 {
        DFUDataColumn: DFUDataColumn73[];
    }

    export interface DataColumns76 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn74 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns76;
    }

    export interface DFUDataNonKeyedColumns132 {
        DFUDataColumn: DFUDataColumn74[];
    }

    export interface DataColumns77 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn75 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns77;
    }

    export interface DFUDataNonKeyedColumns142 {
        DFUDataColumn: DFUDataColumn75[];
    }

    export interface DataColumns78 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn76 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns78;
    }

    export interface DFUDataNonKeyedColumns152 {
        DFUDataColumn: DFUDataColumn76[];
    }

    export interface DataColumns79 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn77 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns79;
    }

    export interface DFUDataNonKeyedColumns162 {
        DFUDataColumn: DFUDataColumn77[];
    }

    export interface DataColumns80 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn78 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns80;
    }

    export interface DFUDataNonKeyedColumns172 {
        DFUDataColumn: DFUDataColumn78[];
    }

    export interface DataColumns81 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn79 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns81;
    }

    export interface DFUDataNonKeyedColumns182 {
        DFUDataColumn: DFUDataColumn79[];
    }

    export interface DataColumns82 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn80 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns82;
    }

    export interface DFUDataNonKeyedColumns192 {
        DFUDataColumn: DFUDataColumn80[];
    }

    export interface DataColumns83 {
        DFUDataColumn: any[];
    }

    export interface DFUDataColumn81 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns83;
    }

    export interface DFUDataNonKeyedColumns202 {
        DFUDataColumn: DFUDataColumn81[];
    }

    export interface DataColumns84 {
        DFUDataColumn: any[];
    }

    export interface ColumnHidden2 {
        ColumnID: number;
        ColumnLabel: string;
        ColumnType: string;
        ColumnValue: string;
        ColumnSize: number;
        MaxSize: number;
        ColumnEclType: string;
        ColumnRawSize: number;
        IsNaturalColumn: boolean;
        IsKeyedColumn: boolean;
        DataColumns: DataColumns84;
    }

    export interface ColumnsHidden2 {
        ColumnHidden: ColumnHidden2[];
    }

    export interface DFUSearchDataResponse {
        Exceptions: Exceptions;
        OpenLogicalName: string;
        LogicalName: string;
        ParentName: string;
        StartIndex: number;
        EndIndex: number;
        DFUDataKeyedColumns1: DFUDataKeyedColumns110;
        DFUDataKeyedColumns2: DFUDataKeyedColumns22;
        DFUDataKeyedColumns3: DFUDataKeyedColumns32;
        DFUDataKeyedColumns4: DFUDataKeyedColumns42;
        DFUDataKeyedColumns5: DFUDataKeyedColumns52;
        DFUDataKeyedColumns6: DFUDataKeyedColumns62;
        DFUDataKeyedColumns7: DFUDataKeyedColumns72;
        DFUDataKeyedColumns8: DFUDataKeyedColumns82;
        DFUDataKeyedColumns9: DFUDataKeyedColumns92;
        DFUDataKeyedColumns10: DFUDataKeyedColumns102;
        DFUDataKeyedColumns11: DFUDataKeyedColumns112;
        DFUDataKeyedColumns12: DFUDataKeyedColumns122;
        DFUDataKeyedColumns13: DFUDataKeyedColumns132;
        DFUDataKeyedColumns14: DFUDataKeyedColumns142;
        DFUDataKeyedColumns15: DFUDataKeyedColumns152;
        DFUDataKeyedColumns16: DFUDataKeyedColumns162;
        DFUDataKeyedColumns17: DFUDataKeyedColumns172;
        DFUDataKeyedColumns18: DFUDataKeyedColumns182;
        DFUDataKeyedColumns19: DFUDataKeyedColumns192;
        DFUDataKeyedColumns20: DFUDataKeyedColumns202;
        DFUDataNonKeyedColumns1: DFUDataNonKeyedColumns110;
        DFUDataNonKeyedColumns2: DFUDataNonKeyedColumns22;
        DFUDataNonKeyedColumns3: DFUDataNonKeyedColumns32;
        DFUDataNonKeyedColumns4: DFUDataNonKeyedColumns42;
        DFUDataNonKeyedColumns5: DFUDataNonKeyedColumns52;
        DFUDataNonKeyedColumns6: DFUDataNonKeyedColumns62;
        DFUDataNonKeyedColumns7: DFUDataNonKeyedColumns72;
        DFUDataNonKeyedColumns8: DFUDataNonKeyedColumns82;
        DFUDataNonKeyedColumns9: DFUDataNonKeyedColumns92;
        DFUDataNonKeyedColumns10: DFUDataNonKeyedColumns102;
        DFUDataNonKeyedColumns11: DFUDataNonKeyedColumns112;
        DFUDataNonKeyedColumns12: DFUDataNonKeyedColumns122;
        DFUDataNonKeyedColumns13: DFUDataNonKeyedColumns132;
        DFUDataNonKeyedColumns14: DFUDataNonKeyedColumns142;
        DFUDataNonKeyedColumns15: DFUDataNonKeyedColumns152;
        DFUDataNonKeyedColumns16: DFUDataNonKeyedColumns162;
        DFUDataNonKeyedColumns17: DFUDataNonKeyedColumns172;
        DFUDataNonKeyedColumns18: DFUDataNonKeyedColumns182;
        DFUDataNonKeyedColumns19: DFUDataNonKeyedColumns192;
        DFUDataNonKeyedColumns20: DFUDataNonKeyedColumns202;
        RowCount: number;
        ShowColumns: string;
        ChooseFile: number;
        Name: string;
        FilterBy: string;
        FilterForGoBack: string;
        ColumnsHidden: ColumnsHidden2;
        ColumnCount: number;
        StartForGoback: number;
        CountForGoback: number;
        Start: number;
        Count: number;
        PageSize: number;
        Total: number;
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

    export interface DFUSpaceItem {
        Name: string;
        NumOfFiles: string;
        NumOfFilesUnknown: string;
        TotalSize: string;
        LargestFile: string;
        LargestSize: string;
        SmallestFile: string;
        SmallestSize: string;
        NumOfFilesInt64: number;
        NumOfFilesUnknownInt64: number;
        TotalSizeInt64: number;
        LargestSizeInt64: number;
        SmallestSizeInt64: number;
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

    export interface EclRecordTypeInfoResponse {
        jsonInfo: string;
        binInfo: string;
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

    export interface Origin2 {
        Name: string;
        Operation: string;
        Timestamp: string;
        IP: string;
        Path: string;
        Owner: string;
        Workunit: string;
    }

    export interface History2 {
        Origin: Origin2[];
    }

    export interface ListHistoryResponse {
        Exceptions: Exceptions;
        History: History2;
    }

    export interface WsDfuPingResponse {
    }

    export interface SavexmlResponse {
        Exceptions: Exceptions;
        xmlmap: string;
    }

    export interface SuperfileActionResponse {
        Exceptions: Exceptions;
        superfile: string;
        retcode: number;
    }

    export interface Subfiles2 {
        Item: string[];
    }

    export interface SuperfileListResponse {
        Exceptions: Exceptions;
        superfile: string;
        subfiles: Subfiles2;
    }
}

export class DFUService extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsDfu", "1.5");
    }

    DFUQuery(request: WsDfu.DFUQueryRequest): Promise<WsDfu.DFUQueryResponse> {
        return this._connection.send("DFUQuery", request);
    }

    DFUInfo(request: WsDfu.DFUInfoRequest): Promise<WsDfu.DFUInfoResponse> {
        return this._connection.send("DFUInfo", request);
    }
}
