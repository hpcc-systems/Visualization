import { IConnection, IOptions } from "../connection";
import { ESPConnection } from "../espConnection";

/*
    Response structures generated via:
    * http://localhost:8010/Ws_Access/?ver_=1.16&reqjson_
    * http://localhost:8010/Ws_Access/?ver_=1.16&respjson_
    * http://json2ts.com/
*/

export namespace WsAccess {

    export interface AccountPermissionsRequest {
        AccountName: string;
        IsGroup: boolean;
        IncludeGroup: boolean;
    }

    export interface AddUserRequest {
        username: string;
        firstname: string;
        lastname: string;
        password1: string;
        password2: string;
        employeeID: string;
        employeeNumber: string;
    }

    export interface AddViewRequest {
        viewname: string;
        description: string;
    }

    export interface AddViewColumnRequest {
        viewname: string;
        filename: string;
        columnname: string;
    }

    export interface AddViewMemberRequest {
        viewname: string;
        membername: string;
        membertype: string;
    }

    export interface ClearPermissionsCacheRequest {
    }

    export interface DeleteViewRequest {
        viewname: string;
    }

    export interface DeleteViewColumnRequest {
        viewname: string;
        filename: string;
        columnname: string;
    }

    export interface DeleteViewMemberRequest {
        viewname: string;
        membername: string;
        membertype: string;
    }

    export interface DisableScopeScansRequest {
    }

    export interface EnableScopeScansRequest {
    }

    export interface FilePermissionRequest {
        FileName: string;
        UserName: string;
        GroupName: string;
    }

    export interface Groupnames {
        Item: string[];
    }

    export interface GroupActionRequest {
        groupnames: Groupnames;
        ActionType: string;
        DeletePermission: boolean;
    }

    export interface GroupAddRequest {
        groupname: string;
        groupOwner: string;
        groupDesc: string;
    }

    export interface GroupEditRequest {
        groupname: string;
    }

    export interface Usernames {
        Item: string[];
    }

    export interface GroupMemberEditRequest {
        groupname: string;
        action: string;
        usernames: Usernames;
    }

    export interface GroupMemberEditInputRequest {
        searchinput: string;
        groupname: string;
    }

    export interface GroupMemberQueryRequest {
        GroupName: string;
        PageSize: number;
        PageStartFrom: number;
        SortBy: string;
        Descending: boolean;
        CacheHint: number;
    }

    export interface GroupQueryRequest {
        PageSize: number;
        PageStartFrom: number;
        SortBy: string;
        Descending: boolean;
        CacheHint: number;
    }

    export interface GroupRequest {
    }

    export interface PermissionActionRequest {
        rname: string;
        prefix: string;
        action: string;
        account_name: string;
        account_type: number;
        allow_access: boolean;
        allow_read: boolean;
        allow_write: boolean;
        allow_full: boolean;
        deny_access: boolean;
        deny_read: boolean;
        deny_write: boolean;
        deny_full: boolean;
        user: string;
        group: string;
        BasednName: string;
        ResourceName: string;
    }

    export interface PermissionAddRequest {
        basedn: string;
        rtype: string;
        rtitle: string;
        rname: string;
        prefix: string;
        BasednName: string;
        AccountName: string;
        AccountType: number;
    }

    export interface BasednsRequest {
    }

    export interface Names {
        Item: string[];
    }

    export interface PermissionsResetRequest {
        BasednName: string;
        prefix: string;
        names: Names;
        allow_access: boolean;
        allow_read: boolean;
        allow_write: boolean;
        allow_full: boolean;
        deny_access: boolean;
        deny_read: boolean;
        deny_write: boolean;
        deny_full: boolean;
        userarray: string;
        grouparray: string;
    }

    export interface Names2 {
        Item: string[];
    }

    export interface PermissionsResetInputRequest {
        basedn: string;
        rtype: string;
        rtitle: string;
        rname: string;
        prefix: string;
        names: Names2;
    }

    export interface WsAccessPingRequest {
    }

    export interface QueryScopeScansEnabledRequest {
    }

    export interface QueryUserViewColumnsRequest {
        username: string;
    }

    export interface QueryViewColumnsRequest {
        viewname: string;
    }

    export interface QueryViewMembersRequest {
        viewname: string;
    }

    export interface QueryViewsRequest {
    }

    export interface ResourceAddRequest {
        BasednName: string;
        name: string;
        description: string;
        prefix: string;
    }

    export interface ResourceAddInputRequest {
        basedn: string;
        rtype: string;
        rtitle: string;
        prefix: string;
    }

    export interface Names3 {
        Item: string[];
    }

    export interface ResourceDeleteRequest {
        BasednName: string;
        prefix: string;
        names: Names3;
        DoUpdate: number;
    }

    export interface ResourcePermissionQueryRequest {
        BasednName: string;
        prefix: string;
        Name: string;
        AccountType: string;
        PageSize: number;
        PageStartFrom: number;
        SortBy: string;
        Descending: boolean;
        CacheHint: number;
    }

    export interface ResourcePermissionsRequest {
        name: string;
        BasednName: string;
        prefix: string;
    }

    export interface ResourceQueryRequest {
        BasednName: string;
        prefix: string;
        Name: string;
        PageSize: number;
        PageStartFrom: number;
        SortBy: string;
        Descending: boolean;
        CacheHint: number;
    }

    export interface ResourcesRequest {
        templatename: string;
        BasednName: string;
        prefix: string;
        searchinput: string;
    }

    export interface Usernames2 {
        Item: string[];
    }

    export interface Groupnames2 {
        Item: string[];
    }

    export interface UserAccountExportRequest {
        usernames: Usernames2;
        groupnames: Groupnames2;
    }

    export interface Usernames3 {
        Item: string[];
    }

    export interface UserActionRequest {
        action: string;
        ActionType: string;
        usernames: Usernames3;
    }

    export interface UserEditRequest {
        username: string;
    }

    export interface Groupnames3 {
        Item: string[];
    }

    export interface UserGroupEditRequest {
        username: string;
        action: string;
        groupnames: Groupnames3;
    }

    export interface UserGroupEditInputRequest {
        username: string;
    }

    export interface UserInfoEditRequest {
        username: string;
        firstname: string;
        lastname: string;
        employeeID: string;
        employeeNumber: string;
    }

    export interface UserInfoEditInputRequest {
        username: string;
    }

    export interface UserPosixRequest {
        username: string;
        posixenabled: boolean;
        gidnumber: string;
        uidnumber: string;
        homedirectory: string;
        loginshell: string;
    }

    export interface UserPosixInputRequest {
        username: string;
    }

    export interface UserQueryRequest {
        Name: string;
        PageSize: number;
        PageStartFrom: number;
        SortBy: string;
        Descending: boolean;
        CacheHint: number;
    }

    export interface UserResetPassRequest {
        username: string;
        newPassword: string;
        newPasswordRetype: string;
    }

    export interface UserResetPassInputRequest {
        username: string;
    }

    export interface UserSudoersRequest {
        username: string;
        action: string;
        sudoHost: string;
        sudoCommand: string;
        sudoOption: string;
    }

    export interface UserSudoersInputRequest {
        username: string;
    }

    export interface UserRequest {
        searchinput: string;
    }

    export interface Request {
        AccountPermissionsRequest: AccountPermissionsRequest;
        AddUserRequest: AddUserRequest;
        AddViewRequest: AddViewRequest;
        AddViewColumnRequest: AddViewColumnRequest;
        AddViewMemberRequest: AddViewMemberRequest;
        ClearPermissionsCacheRequest: ClearPermissionsCacheRequest;
        DeleteViewRequest: DeleteViewRequest;
        DeleteViewColumnRequest: DeleteViewColumnRequest;
        DeleteViewMemberRequest: DeleteViewMemberRequest;
        DisableScopeScansRequest: DisableScopeScansRequest;
        EnableScopeScansRequest: EnableScopeScansRequest;
        FilePermissionRequest: FilePermissionRequest;
        GroupActionRequest: GroupActionRequest;
        GroupAddRequest: GroupAddRequest;
        GroupEditRequest: GroupEditRequest;
        GroupMemberEditRequest: GroupMemberEditRequest;
        GroupMemberEditInputRequest: GroupMemberEditInputRequest;
        GroupMemberQueryRequest: GroupMemberQueryRequest;
        GroupQueryRequest: GroupQueryRequest;
        GroupRequest: GroupRequest;
        PermissionActionRequest: PermissionActionRequest;
        PermissionAddRequest: PermissionAddRequest;
        BasednsRequest: BasednsRequest;
        PermissionsResetRequest: PermissionsResetRequest;
        PermissionsResetInputRequest: PermissionsResetInputRequest;
        ws_accessPingRequest: WsAccessPingRequest;
        QueryScopeScansEnabledRequest: QueryScopeScansEnabledRequest;
        QueryUserViewColumnsRequest: QueryUserViewColumnsRequest;
        QueryViewColumnsRequest: QueryViewColumnsRequest;
        QueryViewMembersRequest: QueryViewMembersRequest;
        QueryViewsRequest: QueryViewsRequest;
        ResourceAddRequest: ResourceAddRequest;
        ResourceAddInputRequest: ResourceAddInputRequest;
        ResourceDeleteRequest: ResourceDeleteRequest;
        ResourcePermissionQueryRequest: ResourcePermissionQueryRequest;
        ResourcePermissionsRequest: ResourcePermissionsRequest;
        ResourceQueryRequest: ResourceQueryRequest;
        ResourcesRequest: ResourcesRequest;
        UserAccountExportRequest: UserAccountExportRequest;
        UserActionRequest: UserActionRequest;
        UserEditRequest: UserEditRequest;
        UserGroupEditRequest: UserGroupEditRequest;
        UserGroupEditInputRequest: UserGroupEditInputRequest;
        UserInfoEditRequest: UserInfoEditRequest;
        UserInfoEditInputRequest: UserInfoEditInputRequest;
        UserPosixRequest: UserPosixRequest;
        UserPosixInputRequest: UserPosixInputRequest;
        UserQueryRequest: UserQueryRequest;
        UserResetPassRequest: UserResetPassRequest;
        UserResetPassInputRequest: UserResetPassInputRequest;
        UserSudoersRequest: UserSudoersRequest;
        UserSudoersInputRequest: UserSudoersInputRequest;
        UserRequest: UserRequest;
    }

    export interface BasednNames {
        Item: string[];
    }

    export interface Permission {
        BasednName: string;
        rname: string;
        prefix: string;
        ResourceName: string;
        PermissionName: string;
        allow_access: boolean;
        allow_read: boolean;
        allow_write: boolean;
        allow_full: boolean;
        deny_access: boolean;
        deny_read: boolean;
        deny_write: boolean;
        deny_full: boolean;
    }

    export interface Permissions {
        Permission: Permission[];
    }

    export interface BasednNames2 {
        Item: string[];
    }

    export interface Permission2 {
        BasednName: string;
        rname: string;
        prefix: string;
        ResourceName: string;
        PermissionName: string;
        allow_access: boolean;
        allow_read: boolean;
        allow_write: boolean;
        allow_full: boolean;
        deny_access: boolean;
        deny_read: boolean;
        deny_write: boolean;
        deny_full: boolean;
    }

    export interface Permissions2 {
        Permission: Permission2[];
    }

    export interface GroupPermission {
        GroupName: string;
        BasednNames: BasednNames2;
        Permissions: Permissions2;
    }

    export interface GroupPermissions {
        GroupPermission: GroupPermission[];
    }

    export interface AccountPermissionsResponse {
        AccountName: string;
        IsGroup: boolean;
        IncludeGroup: boolean;
        BasednNames: BasednNames;
        Permissions: Permissions;
        GroupPermissions: GroupPermissions;
    }

    export interface AddUserResponse {
        retcode: number;
        retmsg: string;
    }

    export interface AddViewResponse {
        viewname: string;
        description: string;
    }

    export interface AddViewColumnResponse {
        viewname: string;
        filename: string;
        columnname: string;
    }

    export interface AddViewMemberResponse {
        viewname: string;
        membername: string;
        membertype: string;
    }

    export interface ClearPermissionsCacheResponse {
        retcode: number;
    }

    export interface DeleteViewResponse {
        viewname: string;
    }

    export interface DeleteViewColumnResponse {
        viewname: string;
        filename: string;
        columnname: string;
    }

    export interface DeleteViewMemberResponse {
        viewname: string;
        membername: string;
        membertype: string;
    }

    export interface ScopeScansStatus {
        isEnabled: boolean;
        retcode: number;
        retmsg: string;
    }

    export interface DisableScopeScansResponse {
        scopeScansStatus: ScopeScansStatus;
    }

    export interface ScopeScansStatus2 {
        isEnabled: boolean;
        retcode: number;
        retmsg: string;
    }

    export interface EnableScopeScansResponse {
        scopeScansStatus: ScopeScansStatus2;
    }

    export interface User {
        username: string;
        fullname: string;
        passwordexpiration: string;
        employeeID: string;
        employeeNumber: string;
    }

    export interface Users {
        User: User[];
    }

    export interface Group {
        name: string;
        deletable: boolean;
        groupOwner: string;
        groupDesc: string;
    }

    export interface Groups {
        Group: Group[];
    }

    export interface FilePermissionResponse {
        NoSecMngr: boolean;
        FileName: string;
        UserName: string;
        GroupName: string;
        toomany: boolean;
        Users: Users;
        Groups: Groups;
        UserPermission: string;
    }

    export interface Permission3 {
        BasednName: string;
        rname: string;
        prefix: string;
        ResourceName: string;
        PermissionName: string;
        allow_access: boolean;
        allow_read: boolean;
        allow_write: boolean;
        allow_full: boolean;
        deny_access: boolean;
        deny_read: boolean;
        deny_write: boolean;
        deny_full: boolean;
    }

    export interface Permissions3 {
        Permission: Permission3[];
    }

    export interface GroupActionResponse {
        Groupnames: string;
        Permissions: Permissions3;
        retcode: number;
        retmsg: string;
    }

    export interface GroupAddResponse {
        groupname: string;
        retcode: number;
        retmsg: string;
    }

    export interface User2 {
        username: string;
        fullname: string;
        passwordexpiration: string;
        employeeID: string;
        employeeNumber: string;
    }

    export interface Users2 {
        User: User2[];
    }

    export interface GroupEditResponse {
        groupname: string;
        Users: Users2;
    }

    export interface GroupMemberEditResponse {
        groupname: string;
        action: string;
        retcode: number;
        retmsg: string;
    }

    export interface User3 {
        username: string;
        fullname: string;
        passwordexpiration: string;
        employeeID: string;
        employeeNumber: string;
    }

    export interface Users3 {
        User: User3[];
    }

    export interface GroupMemberEditInputResponse {
        groupname: string;
        toomany: boolean;
        Users: Users3;
    }

    export interface User4 {
        username: string;
        fullname: string;
        passwordexpiration: string;
        employeeID: string;
        employeeNumber: string;
    }

    export interface Users4 {
        User: User4[];
    }

    export interface GroupMemberQueryResponse {
        NoSecMngr: boolean;
        Users: Users4;
        TotalUsers: number;
        CacheHint: number;
    }

    export interface Group2 {
        name: string;
        deletable: boolean;
        groupOwner: string;
        groupDesc: string;
    }

    export interface Groups2 {
        Group: Group2[];
    }

    export interface GroupQueryResponse {
        NoSecMngr: boolean;
        Groups: Groups2;
        TotalGroups: number;
        CacheHint: number;
    }

    export interface Group3 {
        name: string;
        deletable: boolean;
        groupOwner: string;
        groupDesc: string;
    }

    export interface Groups3 {
        Group: Group3[];
    }

    export interface GroupResponse {
        NoSecMngr: boolean;
        Groups: Groups3;
    }

    export interface PermissionActionResponse {
        AccountName: string;
        IsGroup: boolean;
        retcode: number;
        retmsg: string;
    }

    export interface User5 {
        username: string;
        fullname: string;
        passwordexpiration: string;
        employeeID: string;
        employeeNumber: string;
    }

    export interface Users5 {
        User: User5[];
    }

    export interface Group4 {
        name: string;
        deletable: boolean;
        groupOwner: string;
        groupDesc: string;
    }

    export interface Groups4 {
        Group: Group4[];
    }

    export interface Resources {
        Item: string[];
    }

    export interface PermissionAddResponse {
        basedn: string;
        rtype: string;
        rtitle: string;
        rname: string;
        prefix: string;
        BasednName: string;
        AccountName: string;
        AccountType: number;
        toomany: boolean;
        Users: Users5;
        Groups: Groups4;
        Resources: Resources;
    }

    export interface Basedn {
        name: string;
        basedn: string;
        rtype: string;
        rtitle: string;
        templatename: string;
    }

    export interface Basedns {
        Basedn: Basedn[];
    }

    export interface BasednsResponse {
        NoSecMngr: boolean;
        Basedns: Basedns;
    }

    export interface PermissionsResetResponse {
        retcode: number;
        retmsg: string;
    }

    export interface User6 {
        username: string;
        fullname: string;
        passwordexpiration: string;
        employeeID: string;
        employeeNumber: string;
    }

    export interface Users6 {
        User: User6[];
    }

    export interface Group5 {
        name: string;
        deletable: boolean;
        groupOwner: string;
        groupDesc: string;
    }

    export interface Groups5 {
        Group: Group5[];
    }

    export interface Resources2 {
        Resource: string[];
    }

    export interface PermissionsResetInputResponse {
        basedn: string;
        rtype: string;
        rtitle: string;
        rname: string;
        prefix: string;
        toomany: boolean;
        Users: Users6;
        Groups: Groups5;
        Resources: Resources2;
        ResourceList: string;
    }

    export interface WsAccessPingResponse {
    }

    export interface ScopeScansStatus3 {
        isEnabled: boolean;
        retcode: number;
        retmsg: string;
    }

    export interface QueryScopeScansEnabledResponse {
        scopeScansStatus: ScopeScansStatus3;
    }

    export interface ViewColumn {
        viewname: string;
        filename: string;
        columnname: string;
    }

    export interface Viewcolumns {
        ViewColumn: ViewColumn[];
    }

    export interface QueryUserViewColumnsResponse {
        username: string;
        viewcolumns: Viewcolumns;
    }

    export interface ViewColumn2 {
        viewname: string;
        filename: string;
        columnname: string;
    }

    export interface Viewcolumns2 {
        ViewColumn: ViewColumn2[];
    }

    export interface QueryViewColumnsResponse {
        viewname: string;
        viewcolumns: Viewcolumns2;
    }

    export interface ViewMember {
        viewname: string;
        name: string;
        membertype: string;
    }

    export interface Viewmembers {
        ViewMember: ViewMember[];
    }

    export interface QueryViewMembersResponse {
        viewname: string;
        viewmembers: Viewmembers;
    }

    export interface View {
        viewname: string;
        description: string;
    }

    export interface Views {
        View: View[];
    }

    export interface QueryViewsResponse {
        views: Views;
    }

    export interface ResourceAddResponse {
        retcode: number;
        retmsg: string;
    }

    export interface ResourceAddInputResponse {
        basedn: string;
        rtype: string;
        rtitle: string;
        prefix: string;
    }

    export interface ResourceDeleteResponse {
        retcode: number;
        retmsg: string;
    }

    export interface Permission4 {
        account_name: string;
        escaped_account_name: string;
        account_type: number;
        allow_access: boolean;
        allow_read: boolean;
        allow_write: boolean;
        allow_full: boolean;
        deny_access: boolean;
        deny_read: boolean;
        deny_write: boolean;
        deny_full: boolean;
    }

    export interface Permissions4 {
        Permission: Permission4[];
    }

    export interface ResourcePermissionQueryResponse {
        NoSecMngr: boolean;
        Permissions: Permissions4;
        TotalResourcePermissions: number;
        CacheHint: number;
    }

    export interface Permission5 {
        account_name: string;
        escaped_account_name: string;
        account_type: number;
        allow_access: boolean;
        allow_read: boolean;
        allow_write: boolean;
        allow_full: boolean;
        deny_access: boolean;
        deny_read: boolean;
        deny_write: boolean;
        deny_full: boolean;
    }

    export interface Permissions5 {
        Permission: Permission5[];
    }

    export interface ResourcePermissionsResponse {
        Permissions: Permissions5;
    }

    export interface Resource {
        name: string;
        description: string;
        isSpecial: boolean;
    }

    export interface Resources3 {
        Resource: Resource[];
    }

    export interface ResourceQueryResponse {
        NoSecMngr: boolean;
        Resources: Resources3;
        TotalResources: number;
        CacheHint: number;
    }

    export interface Resource2 {
        name: string;
        description: string;
        isSpecial: boolean;
    }

    export interface Resources4 {
        Resource: Resource2[];
    }

    export interface ScopeScansStatus4 {
        isEnabled: boolean;
        retcode: number;
        retmsg: string;
    }

    export interface ResourcesResponse {
        Resources: Resources4;
        default_basedn: string;
        default_name: string;
        toomany: boolean;
        scopeScansStatus: ScopeScansStatus4;
    }

    export interface UserAccountExportResponse {
        Result: string;
    }

    export interface UserActionResponse {
        action: string;
        retcode: number;
        retmsg: string;
    }

    export interface Group6 {
        name: string;
        deletable: boolean;
        groupOwner: string;
        groupDesc: string;
    }

    export interface Groups6 {
        Group: Group6[];
    }

    export interface UserEditResponse {
        username: string;
        isLDAPAdmin: boolean;
        Groups: Groups6;
    }

    export interface UserGroupEditResponse {
        username: string;
        action: string;
        retcode: number;
        retmsg: string;
    }

    export interface Group7 {
        name: string;
        deletable: boolean;
        groupOwner: string;
        groupDesc: string;
    }

    export interface Groups7 {
        Group: Group7[];
    }

    export interface UserGroupEditInputResponse {
        username: string;
        Groups: Groups7;
    }

    export interface UserInfoEditResponse {
        username: string;
        retcode: number;
        retmsg: string;
    }

    export interface UserInfoEditInputResponse {
        username: string;
        firstname: string;
        lastname: string;
        employeeID: string;
        PasswordExpiration: string;
        employeeNumber: string;
    }

    export interface UserPosixResponse {
        username: string;
        retcode: number;
        retmsg: string;
    }

    export interface UserPosixInputResponse {
        username: string;
        posixenabled: boolean;
        gidnumber: string;
        uidnumber: string;
        homedirectory: string;
        loginshell: string;
    }

    export interface User7 {
        username: string;
        fullname: string;
        passwordexpiration: string;
        employeeID: string;
        employeeNumber: string;
    }

    export interface Users7 {
        User: User7[];
    }

    export interface UserQueryResponse {
        NoSecMngr: boolean;
        Users: Users7;
        TotalUsers: number;
        CacheHint: number;
    }

    export interface UserResetPassResponse {
        username: string;
        retcode: number;
        retmsg: string;
    }

    export interface UserResetPassInputResponse {
        username: string;
    }

    export interface UserSudoersResponse {
        username: string;
        retcode: number;
        retmsg: string;
    }

    export interface UserSudoersInputResponse {
        username: string;
        insudoers: boolean;
        sudoHost: string;
        sudoCommand: string;
        sudoOption: string;
    }

    export interface User8 {
        username: string;
        fullname: string;
        passwordexpiration: string;
        employeeID: string;
        employeeNumber: string;
    }

    export interface Users8 {
        User: User8[];
    }

    export interface UserResponse {
        NoSecMngr: boolean;
        toomany: boolean;
        posixok: boolean;
        Users: Users8;
    }

}

export class AccessService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "Ws_Access", "1.16");
    }

    connectionOptions(): IOptions {
        return this._connection.opts();
    }

    AccountPermissions(request: Partial<WsAccess.AccountPermissionsRequest>): Promise<WsAccess.AccountPermissionsResponse> {
        return this._connection.send("AccountPermissions", request);
    }

    AddUser(request: Partial<WsAccess.AddUserRequest>): Promise<WsAccess.AddUserResponse> {
        return this._connection.send("AddUser", request);
    }

    AddView(request: Partial<WsAccess.AddViewRequest>): Promise<WsAccess.AddViewResponse> {
        return this._connection.send("AddView", request);
    }

    AddViewColumn(request: Partial<WsAccess.AddViewColumnRequest>): Promise<WsAccess.AddViewColumnResponse> {
        return this._connection.send("AddViewColumn", request);
    }

    AddViewMember(request: Partial<WsAccess.AddViewMemberRequest>): Promise<WsAccess.AddViewMemberResponse> {
        return this._connection.send("AddViewMember", request);
    }

    ClearPermissionsCache(request: Partial<WsAccess.ClearPermissionsCacheRequest>): Promise<WsAccess.ClearPermissionsCacheResponse> {
        return this._connection.send("ClearPermissionsCache", request);
    }

    DeleteView(request: Partial<WsAccess.DeleteViewRequest>): Promise<WsAccess.DeleteViewResponse> {
        return this._connection.send("DeleteView", request);
    }

    DeleteViewColumn(request: Partial<WsAccess.DeleteViewColumnRequest>): Promise<WsAccess.DeleteViewColumnResponse> {
        return this._connection.send("DeleteViewColumn", request);
    }

    DeleteViewMember(request: Partial<WsAccess.DeleteViewMemberRequest>): Promise<WsAccess.DeleteViewMemberResponse> {
        return this._connection.send("DeleteViewMember", request);
    }

    DisableScopeScans(request: Partial<WsAccess.DisableScopeScansRequest>): Promise<WsAccess.DisableScopeScansResponse> {
        return this._connection.send("DisableScopeScans", request);
    }

    EnableScopeScans(request: Partial<WsAccess.EnableScopeScansRequest>): Promise<WsAccess.EnableScopeScansResponse> {
        return this._connection.send("EnableScopeScans", request);
    }

    FilePermission(request: Partial<WsAccess.FilePermissionRequest>): Promise<WsAccess.FilePermissionResponse> {
        return this._connection.send("FilePermission", request);
    }

    GroupAction(request: Partial<WsAccess.GroupActionRequest>): Promise<WsAccess.GroupActionResponse> {
        return this._connection.send("GroupAction", request);
    }

    GroupAdd(request: Partial<WsAccess.GroupAddRequest>): Promise<WsAccess.GroupAddResponse> {
        return this._connection.send("GroupAdd", request);
    }

    GroupEdit(request: Partial<WsAccess.GroupEditRequest>): Promise<WsAccess.GroupEditResponse> {
        return this._connection.send("GroupEdit", request);
    }

    GroupMemberEdit(request: Partial<WsAccess.GroupMemberEditRequest>): Promise<WsAccess.GroupMemberEditResponse> {
        return this._connection.send("GroupMemberEdit", request);
    }

    GroupMemberEditInput(request: Partial<WsAccess.GroupMemberEditInputRequest>): Promise<WsAccess.GroupMemberEditInputResponse> {
        return this._connection.send("GroupMemberEditInput", request);
    }

    GroupMemberQuery(request: Partial<WsAccess.GroupMemberQueryRequest>): Promise<WsAccess.GroupMemberQueryResponse> {
        return this._connection.send("GroupMemberQuery", request);
    }

    GroupQuery(request: Partial<WsAccess.GroupQueryRequest>): Promise<WsAccess.GroupQueryResponse> {
        return this._connection.send("GroupQuery", request);
    }

    Groups(request: Partial<WsAccess.GroupRequest>): Promise<WsAccess.GroupResponse> {
        return this._connection.send("Groups", request);
    }

    PermissionAction(request: Partial<WsAccess.PermissionActionRequest>): Promise<WsAccess.PermissionActionResponse> {
        return this._connection.send("PermissionAction", request);
    }

    PermissionAddInput(request: Partial<WsAccess.PermissionAddRequest>): Promise<WsAccess.PermissionAddResponse> {
        return this._connection.send("PermissionAddInput", request);
    }

    Permissions(request: Partial<WsAccess.BasednsRequest>): Promise<WsAccess.BasednsResponse> {
        return this._connection.send("Permissions", request);
    }

    PermissionsReset(request: Partial<WsAccess.PermissionsResetRequest>): Promise<WsAccess.PermissionsResetResponse> {
        return this._connection.send("PermissionsReset", request);
    }

    PermissionsResetInput(request: Partial<WsAccess.PermissionsResetInputRequest>): Promise<WsAccess.PermissionsResetInputResponse> {
        return this._connection.send("PermissionsResetInput", request);
    }

    Ping(request: Partial<WsAccess.WsAccessPingRequest>): Promise<WsAccess.WsAccessPingResponse> {
        return this._connection.send("Ping", request);
    }

    QueryScopeScansEnabled(request: Partial<WsAccess.QueryScopeScansEnabledRequest>): Promise<WsAccess.QueryScopeScansEnabledResponse> {
        return this._connection.send("QueryScopeScansEnabled", request);
    }

    QueryUserViewColumns(request: Partial<WsAccess.QueryUserViewColumnsRequest>): Promise<WsAccess.QueryUserViewColumnsResponse> {
        return this._connection.send("QueryUserViewColumns", request);
    }

    QueryViewColumns(request: Partial<WsAccess.QueryViewColumnsRequest>): Promise<WsAccess.QueryViewColumnsResponse> {
        return this._connection.send("QueryViewColumns", request);
    }

    QueryViewMembers(request: Partial<WsAccess.QueryViewMembersRequest>): Promise<WsAccess.QueryViewMembersResponse> {
        return this._connection.send("QueryViewMembers", request);
    }

    QueryViews(request: Partial<WsAccess.QueryViewsRequest>): Promise<WsAccess.QueryViewsResponse> {
        return this._connection.send("QueryViews", request);
    }

    ResourceAdd(request: Partial<WsAccess.ResourceAddRequest>): Promise<WsAccess.ResourceAddResponse> {
        return this._connection.send("ResourceAdd", request);
    }

    ResourceAddInput(request: Partial<WsAccess.ResourceAddInputRequest>): Promise<WsAccess.ResourceAddInputResponse> {
        return this._connection.send("ResourceAddInput", request);
    }

    ResourceDelete(request: Partial<WsAccess.ResourceDeleteRequest>): Promise<WsAccess.ResourceDeleteResponse> {
        return this._connection.send("ResourceDelete", request);
    }

    ResourcePermissionQuery(request: Partial<WsAccess.ResourcePermissionQueryRequest>): Promise<WsAccess.ResourcePermissionQueryResponse> {
        return this._connection.send("ResourcePermissionQuery", request);
    }

    ResourcePermissions(request: Partial<WsAccess.ResourcePermissionsRequest>): Promise<WsAccess.ResourcePermissionsResponse> {
        return this._connection.send("ResourcePermissions", request);
    }

    ResourceQuery(request: Partial<WsAccess.ResourceQueryRequest>): Promise<WsAccess.ResourceQueryResponse> {
        return this._connection.send("ResourceQuery", request);
    }

    Resources(request: Partial<WsAccess.ResourcesRequest>): Promise<WsAccess.ResourcesResponse> {
        return this._connection.send("Resources", request);
    }

    UserAccountExport(request: Partial<WsAccess.UserAccountExportRequest>): Promise<WsAccess.UserAccountExportResponse> {
        return this._connection.send("UserAccountExport", request);
    }

    UserAction(request: Partial<WsAccess.UserActionRequest>): Promise<WsAccess.UserActionResponse> {
        return this._connection.send("UserAction", request);
    }

    UserEdit(request: Partial<WsAccess.UserEditRequest>): Promise<WsAccess.UserEditResponse> {
        return this._connection.send("UserEdit", request);
    }

    UserGroupEdit(request: Partial<WsAccess.UserGroupEditRequest>): Promise<WsAccess.UserGroupEditResponse> {
        return this._connection.send("UserGroupEdit", request);
    }

    UserGroupEditInput(request: Partial<WsAccess.UserGroupEditInputRequest>): Promise<WsAccess.UserGroupEditInputResponse> {
        return this._connection.send("UserGroupEditInput", request);
    }

    UserInfoEdit(request: Partial<WsAccess.UserInfoEditRequest>): Promise<WsAccess.UserInfoEditResponse> {
        return this._connection.send("UserInfoEdit", request);
    }

    UserInfoEditInput(request: Partial<WsAccess.UserInfoEditInputRequest>): Promise<WsAccess.UserInfoEditInputResponse> {
        return this._connection.send("UserInfoEditInput", request);
    }

    UserPosix(request: Partial<WsAccess.UserPosixRequest>): Promise<WsAccess.UserPosixResponse> {
        return this._connection.send("UserPosix", request);
    }

    UserPosixInput(request: Partial<WsAccess.UserPosixInputRequest>): Promise<WsAccess.UserPosixInputResponse> {
        return this._connection.send("UserPosixInput", request);
    }

    UserQuery(request: Partial<WsAccess.UserQueryRequest>): Promise<WsAccess.UserQueryResponse> {
        return this._connection.send("UserQuery", request);
    }

    UserResetPass(request: Partial<WsAccess.UserResetPassRequest>): Promise<WsAccess.UserResetPassResponse> {
        return this._connection.send("UserResetPass", request);
    }

    UserResetPassInput(request: Partial<WsAccess.UserResetPassInputRequest>): Promise<WsAccess.UserResetPassInputResponse> {
        return this._connection.send("UserResetPassInput", request);
    }

    UserSudoers(request: Partial<WsAccess.UserSudoersRequest>): Promise<WsAccess.UserSudoersResponse> {
        return this._connection.send("UserSudoers", request);
    }

    UserSudoersInput(request: Partial<WsAccess.UserSudoersInputRequest>): Promise<WsAccess.UserSudoersInputResponse> {
        return this._connection.send("UserSudoersInput", request);
    }

    Users(request: Partial<WsAccess.UserRequest>): Promise<WsAccess.UserResponse> {
        return this._connection.send("Users", request);
    }
}