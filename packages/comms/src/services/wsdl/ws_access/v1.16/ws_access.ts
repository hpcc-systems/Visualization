import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

type int = number;
type unsignedInt = number;
type long = number;
type base64Binary = string;

export enum ViewMemberType {
    User = "User",
    Group = "Group"
}

export enum UserSortBy {
    Username = "Username",
    Fullname = "Fullname",
    Passwordexpiration = "Passwordexpiration",
    EmployeeID = "EmployeeID",
    EmployeeNumber = "EmployeeNumber"
}

export enum GroupSortBy {
    Name = "Name",
    ManagedBy = "ManagedBy"
}

export enum AccountTypeReq {
    Any = "Any",
    User = "User",
    Group = "Group"
}

export enum ResourcePermissionSortBy {
    Name = "Name",
    Type = "Type"
}

export enum ResourceSortBy {
    Name = "Name"
}

export namespace WsAccess {

    export interface AccountPermissionsRequest {
        AccountName?: string;
        IsGroup?: boolean;
        IncludeGroup?: boolean;
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

    export interface GroupPermission {
        GroupName: string;
        BasednNames: BasednNames;
        Permissions: Permissions;
    }

    export interface GroupPermissions {
        GroupPermission: GroupPermission[];
    }

    export interface AccountPermissionsResponse {
        AccountName: string;
        IsGroup: boolean;
        IncludeGroup: boolean;
        BasednNames: {
            Item: string[];
        };
        Permissions: {
            Permission: Permission[];
        };
        GroupPermissions: {
            GroupPermission: GroupPermission[];
        };
    }

    export interface AddUserRequest {
        username?: string;
        firstname?: string;
        lastname?: string;
        password1?: string;
        password2?: string;
        employeeID?: string;
        employeeNumber?: string;
    }

    export interface AddUserResponse {
        retcode: int;
        retmsg: string;
    }

    export interface AddViewRequest {
        viewname?: string;
        description?: string;
    }

    export interface AddViewResponse {
        viewname: string;
        description: string;
    }

    export interface AddViewColumnRequest {
        viewname?: string;
        filename?: string;
        columnname?: string;
    }

    export interface AddViewColumnResponse {
        viewname: string;
        filename: string;
        columnname: string;
    }

    export interface AddViewMemberRequest {
        viewname?: string;
        membername?: string;
        membertype?: ViewMemberType;
    }

    export interface AddViewMemberResponse {
        viewname: string;
        membername: string;
        membertype: ViewMemberType;
    }

    export interface ClearPermissionsCacheRequest {

    }

    export interface ClearPermissionsCacheResponse {
        retcode: int;
    }

    export interface DeleteViewRequest {
        viewname?: string;
    }

    export interface DeleteViewResponse {
        viewname: string;
    }

    export interface DeleteViewColumnRequest {
        viewname?: string;
        filename?: string;
        columnname?: string;
    }

    export interface DeleteViewColumnResponse {
        viewname: string;
        filename: string;
        columnname: string;
    }

    export interface DeleteViewMemberRequest {
        viewname?: string;
        membername?: string;
        membertype?: ViewMemberType;
    }

    export interface DeleteViewMemberResponse {
        viewname: string;
        membername: string;
        membertype: ViewMemberType;
    }

    export interface DisableScopeScansRequest {

    }

    export interface scopeScansStatus {
        isEnabled: boolean;
        retcode: int;
        retmsg: string;
    }

    export interface DisableScopeScansResponse {
        scopeScansStatus: {
            isEnabled: boolean;
            retcode: int;
            retmsg: string;
        };
    }

    export interface EnableScopeScansRequest {

    }

    export interface EnableScopeScansResponse {
        scopeScansStatus: scopeScansStatus;
    }

    export interface FilePermissionRequest {
        FileName?: string;
        UserName?: string;
        GroupName?: string;
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
        Users: {
            User: User[];
        };
        Groups: {
            Group: Group[];
        };
        UserPermission: string;
    }

    export interface groupnames {
        Item: string[];
    }

    export interface GroupActionRequest {
        groupnames?: {
            Item?: string[];
        };
        ActionType?: string;
        DeletePermission?: boolean;
    }

    export interface GroupActionResponse {
        Groupnames: string;
        Permissions: Permissions;
        retcode: int;
        retmsg: string;
    }

    export interface GroupAddRequest {
        groupname?: string;
        groupOwner?: string;
        groupDesc?: string;
    }

    export interface GroupAddResponse {
        groupname: string;
        retcode: int;
        retmsg: string;
    }

    export interface GroupEditRequest {
        groupname?: string;
    }

    export interface GroupEditResponse {
        groupname: string;
        Users: Users;
    }

    export interface usernames {
        Item: string[];
    }

    export interface GroupMemberEditRequest {
        groupname?: string;
        action?: string;
        usernames?: {
            Item?: string[];
        };
    }

    export interface GroupMemberEditResponse {
        groupname: string;
        action: string;
        retcode: int;
        retmsg: string;
    }

    export interface GroupMemberEditInputRequest {
        searchinput?: string;
        groupname?: string;
    }

    export interface GroupMemberEditInputResponse {
        groupname: string;
        toomany: boolean;
        Users: Users;
    }

    export interface GroupMemberQueryRequest {
        GroupName?: string;
        PageSize?: unsignedInt;
        PageStartFrom?: long;
        SortBy?: UserSortBy;
        Descending?: boolean;
        CacheHint?: long;
    }

    export interface GroupMemberQueryResponse {
        NoSecMngr: boolean;
        Users: Users;
        TotalUsers: long;
        CacheHint: long;
    }

    export interface GroupQueryRequest {
        PageSize?: unsignedInt;
        PageStartFrom?: long;
        SortBy?: GroupSortBy;
        Descending?: boolean;
        CacheHint?: long;
    }

    export interface GroupQueryResponse {
        NoSecMngr: boolean;
        Groups: Groups;
        TotalGroups: long;
        CacheHint: long;
    }

    export interface GroupRequest {

    }

    export interface GroupResponse {
        NoSecMngr: boolean;
        Groups: Groups;
    }

    export interface PermissionActionRequest {
        rname?: string;
        prefix?: string;
        action?: string;
        account_name?: string;
        account_type?: int;
        allow_access?: boolean;
        allow_read?: boolean;
        allow_write?: boolean;
        allow_full?: boolean;
        deny_access?: boolean;
        deny_read?: boolean;
        deny_write?: boolean;
        deny_full?: boolean;
        user?: string;
        group?: string;
        BasednName?: string;
        ResourceName?: string;
    }

    export interface PermissionActionResponse {
        AccountName: string;
        IsGroup: boolean;
        retcode: int;
        retmsg: string;
    }

    export interface PermissionAddRequest {
        basedn?: string;
        rtype?: string;
        rtitle?: string;
        rname?: string;
        prefix?: string;
        BasednName?: string;
        AccountName?: string;
        AccountType?: int;
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
        AccountType: int;
        toomany: boolean;
        Users: Users;
        Groups: Groups;
        Resources: {
            Item: string[];
        };
    }

    export interface BasednsRequest {

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
        Basedns: {
            Basedn: Basedn[];
        };
    }

    export interface names {
        Item: string[];
    }

    export interface PermissionsResetRequest {
        BasednName?: string;
        prefix?: string;
        names?: {
            Item?: string[];
        };
        allow_access?: boolean;
        allow_read?: boolean;
        allow_write?: boolean;
        allow_full?: boolean;
        deny_access?: boolean;
        deny_read?: boolean;
        deny_write?: boolean;
        deny_full?: boolean;
        userarray?: string;
        grouparray?: string;
    }

    export interface PermissionsResetResponse {
        retcode: int;
        retmsg: string;
    }

    export interface PermissionsResetInputRequest {
        basedn?: string;
        rtype?: string;
        rtitle?: string;
        rname?: string;
        prefix?: string;
        names?: names;
    }

    export interface PermissionsResetInputResponse {
        basedn: string;
        rtype: string;
        rtitle: string;
        rname: string;
        prefix: string;
        toomany: boolean;
        Users: Users;
        Groups: Groups;
        Resources: Resources;
        ResourceList: string;
    }

    export interface ws_accessPingRequest {

    }

    export interface ws_accessPingResponse {

    }

    export interface QueryScopeScansEnabledRequest {

    }

    export interface QueryScopeScansEnabledResponse {
        scopeScansStatus: scopeScansStatus;
    }

    export interface QueryUserViewColumnsRequest {
        username?: string;
    }

    export interface ViewColumn {
        viewname: string;
        filename: string;
        columnname: string;
    }

    export interface viewcolumns {
        ViewColumn: ViewColumn[];
    }

    export interface QueryUserViewColumnsResponse {
        username: string;
        viewcolumns: {
            ViewColumn: ViewColumn[];
        };
    }

    export interface QueryViewColumnsRequest {
        viewname?: string;
    }

    export interface QueryViewColumnsResponse {
        viewname: string;
        viewcolumns: viewcolumns;
    }

    export interface QueryViewMembersRequest {
        viewname?: string;
    }

    export interface ViewMember {
        viewname: string;
        name: string;
        membertype: ViewMemberType;
    }

    export interface viewmembers {
        ViewMember: ViewMember[];
    }

    export interface QueryViewMembersResponse {
        viewname: string;
        viewmembers: {
            ViewMember: ViewMember[];
        };
    }

    export interface QueryViewsRequest {

    }

    export interface View {
        viewname: string;
        description: string;
    }

    export interface views {
        View: View[];
    }

    export interface QueryViewsResponse {
        views: {
            View: View[];
        };
    }

    export interface ResourceAddRequest {
        BasednName?: string;
        name?: string;
        description?: string;
        prefix?: string;
    }

    export interface ResourceAddResponse {
        retcode: int;
        retmsg: string;
    }

    export interface ResourceAddInputRequest {
        basedn?: string;
        rtype?: string;
        rtitle?: string;
        prefix?: string;
    }

    export interface ResourceAddInputResponse {
        basedn: string;
        rtype: string;
        rtitle: string;
        prefix: string;
    }

    export interface ResourceDeleteRequest {
        BasednName?: string;
        prefix?: string;
        names?: names;
        DoUpdate?: int;
    }

    export interface ResourceDeleteResponse {
        retcode: int;
        retmsg: string;
    }

    export interface ResourcePermissionQueryRequest {
        BasednName?: string;
        prefix?: string;
        Name?: string;
        AccountType?: AccountTypeReq;
        PageSize?: unsignedInt;
        PageStartFrom?: long;
        SortBy?: ResourcePermissionSortBy;
        Descending?: boolean;
        CacheHint?: long;
    }

    export interface ResourcePermissionQueryResponse {
        NoSecMngr: boolean;
        Permissions: Permissions;
        TotalResourcePermissions: long;
        CacheHint: long;
    }

    export interface ResourcePermissionsRequest {
        name?: string;
        BasednName?: string;
        prefix?: string;
    }

    export interface ResourcePermissionsResponse {
        Permissions: Permissions;
    }

    export interface ResourceQueryRequest {
        BasednName?: string;
        prefix?: string;
        Name?: string;
        PageSize?: unsignedInt;
        PageStartFrom?: long;
        SortBy?: ResourceSortBy;
        Descending?: boolean;
        CacheHint?: long;
    }

    export interface ResourceQueryResponse {
        NoSecMngr: boolean;
        Resources: Resources;
        TotalResources: long;
        CacheHint: long;
    }

    export interface ResourcesRequest {
        templatename?: string;
        BasednName?: string;
        prefix?: string;
        searchinput?: string;
    }

    export interface ResourcesResponse {
        Resources: Resources;
        default_basedn: string;
        default_name: string;
        toomany: boolean;
        scopeScansStatus: scopeScansStatus;
    }

    export interface UserAccountExportRequest {
        usernames?: usernames;
        groupnames?: groupnames;
    }

    export interface UserAccountExportResponse {
        Result: base64Binary;
    }

    export interface UserActionRequest {
        action?: string;
        ActionType?: string;
        usernames?: usernames;
    }

    export interface UserActionResponse {
        action: string;
        retcode: int;
        retmsg: string;
    }

    export interface UserEditRequest {
        username?: string;
    }

    export interface UserEditResponse {
        username: string;
        isLDAPAdmin: boolean;
        Groups: Groups;
    }

    export interface UserGroupEditRequest {
        username?: string;
        action?: string;
        groupnames?: groupnames;
    }

    export interface UserGroupEditResponse {
        username: string;
        action: string;
        retcode: int;
        retmsg: string;
    }

    export interface UserGroupEditInputRequest {
        username?: string;
    }

    export interface UserGroupEditInputResponse {
        username: string;
        Groups: Groups;
    }

    export interface UserInfoEditRequest {
        username?: string;
        firstname?: string;
        lastname?: string;
        employeeID?: string;
        employeeNumber?: string;
    }

    export interface UserInfoEditResponse {
        username: string;
        retcode: int;
        retmsg: string;
    }

    export interface UserInfoEditInputRequest {
        username?: string;
    }

    export interface UserInfoEditInputResponse {
        username: string;
        firstname: string;
        lastname: string;
        employeeID: string;
        PasswordExpiration: string;
        employeeNumber: string;
    }

    export interface UserPosixRequest {
        username?: string;
        posixenabled?: boolean;
        gidnumber?: string;
        uidnumber?: string;
        homedirectory?: string;
        loginshell?: string;
    }

    export interface UserPosixResponse {
        username: string;
        retcode: int;
        retmsg: string;
    }

    export interface UserPosixInputRequest {
        username?: string;
    }

    export interface UserPosixInputResponse {
        username: string;
        posixenabled: boolean;
        gidnumber: string;
        uidnumber: string;
        homedirectory: string;
        loginshell: string;
    }

    export interface UserQueryRequest {
        Name?: string;
        PageSize?: unsignedInt;
        PageStartFrom?: long;
        SortBy?: UserSortBy;
        Descending?: boolean;
        CacheHint?: long;
    }

    export interface UserQueryResponse {
        NoSecMngr: boolean;
        Users: Users;
        TotalUsers: long;
        CacheHint: long;
    }

    export interface UserResetPassRequest {
        username?: string;
        newPassword?: string;
        newPasswordRetype?: string;
    }

    export interface UserResetPassResponse {
        username: string;
        retcode: int;
        retmsg: string;
    }

    export interface UserResetPassInputRequest {
        username?: string;
    }

    export interface UserResetPassInputResponse {
        username: string;
    }

    export interface UserSudoersRequest {
        username?: string;
        action?: string;
        sudoHost?: string;
        sudoCommand?: string;
        sudoOption?: string;
    }

    export interface UserSudoersResponse {
        username: string;
        retcode: int;
        retmsg: string;
    }

    export interface UserSudoersInputRequest {
        username?: string;
    }

    export interface UserSudoersInputResponse {
        username: string;
        insudoers: boolean;
        sudoHost: string;
        sudoCommand: string;
        sudoOption: string;
    }

    export interface UserRequest {
        searchinput?: string;
    }

    export interface UserResponse {
        NoSecMngr: boolean;
        toomany: boolean;
        posixok: boolean;
        Users: Users;
    }

}

export class AccessServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "ws_access", "1.16");
    }

    AccountPermissions(request: WsAccess.AccountPermissionsRequest): Promise<WsAccess.AccountPermissionsResponse> {
        return this._connection.send("AccountPermissions", request);
    }

    AddUser(request: WsAccess.AddUserRequest): Promise<WsAccess.AddUserResponse> {
        return this._connection.send("AddUser", request);
    }

    AddView(request: WsAccess.AddViewRequest): Promise<WsAccess.AddViewResponse> {
        return this._connection.send("AddView", request);
    }

    AddViewColumn(request: WsAccess.AddViewColumnRequest): Promise<WsAccess.AddViewColumnResponse> {
        return this._connection.send("AddViewColumn", request);
    }

    AddViewMember(request: WsAccess.AddViewMemberRequest): Promise<WsAccess.AddViewMemberResponse> {
        return this._connection.send("AddViewMember", request);
    }

    ClearPermissionsCache(request: WsAccess.ClearPermissionsCacheRequest): Promise<WsAccess.ClearPermissionsCacheResponse> {
        return this._connection.send("ClearPermissionsCache", request);
    }

    DeleteView(request: WsAccess.DeleteViewRequest): Promise<WsAccess.DeleteViewResponse> {
        return this._connection.send("DeleteView", request);
    }

    DeleteViewColumn(request: WsAccess.DeleteViewColumnRequest): Promise<WsAccess.DeleteViewColumnResponse> {
        return this._connection.send("DeleteViewColumn", request);
    }

    DeleteViewMember(request: WsAccess.DeleteViewMemberRequest): Promise<WsAccess.DeleteViewMemberResponse> {
        return this._connection.send("DeleteViewMember", request);
    }

    DisableScopeScans(request: WsAccess.DisableScopeScansRequest): Promise<WsAccess.DisableScopeScansResponse> {
        return this._connection.send("DisableScopeScans", request);
    }

    EnableScopeScans(request: WsAccess.EnableScopeScansRequest): Promise<WsAccess.EnableScopeScansResponse> {
        return this._connection.send("EnableScopeScans", request);
    }

    FilePermission(request: WsAccess.FilePermissionRequest): Promise<WsAccess.FilePermissionResponse> {
        return this._connection.send("FilePermission", request);
    }

    GroupAction(request: WsAccess.GroupActionRequest): Promise<WsAccess.GroupActionResponse> {
        return this._connection.send("GroupAction", request);
    }

    GroupAdd(request: WsAccess.GroupAddRequest): Promise<WsAccess.GroupAddResponse> {
        return this._connection.send("GroupAdd", request);
    }

    GroupEdit(request: WsAccess.GroupEditRequest): Promise<WsAccess.GroupEditResponse> {
        return this._connection.send("GroupEdit", request);
    }

    GroupMemberEdit(request: WsAccess.GroupMemberEditRequest): Promise<WsAccess.GroupMemberEditResponse> {
        return this._connection.send("GroupMemberEdit", request);
    }

    GroupMemberEditInput(request: WsAccess.GroupMemberEditInputRequest): Promise<WsAccess.GroupMemberEditInputResponse> {
        return this._connection.send("GroupMemberEditInput", request);
    }

    GroupMemberQuery(request: WsAccess.GroupMemberQueryRequest): Promise<WsAccess.GroupMemberQueryResponse> {
        return this._connection.send("GroupMemberQuery", request);
    }

    GroupQuery(request: WsAccess.GroupQueryRequest): Promise<WsAccess.GroupQueryResponse> {
        return this._connection.send("GroupQuery", request);
    }

    Groups(request: WsAccess.GroupRequest): Promise<WsAccess.GroupResponse> {
        return this._connection.send("Groups", request);
    }

    PermissionAction(request: WsAccess.PermissionActionRequest): Promise<WsAccess.PermissionActionResponse> {
        return this._connection.send("PermissionAction", request);
    }

    PermissionAddInput(request: WsAccess.PermissionAddRequest): Promise<WsAccess.PermissionAddResponse> {
        return this._connection.send("PermissionAddInput", request);
    }

    Permissions(request: WsAccess.BasednsRequest): Promise<WsAccess.BasednsResponse> {
        return this._connection.send("Permissions", request);
    }

    PermissionsReset(request: WsAccess.PermissionsResetRequest): Promise<WsAccess.PermissionsResetResponse> {
        return this._connection.send("PermissionsReset", request);
    }

    PermissionsResetInput(request: WsAccess.PermissionsResetInputRequest): Promise<WsAccess.PermissionsResetInputResponse> {
        return this._connection.send("PermissionsResetInput", request);
    }

    Ping(request: WsAccess.ws_accessPingRequest): Promise<WsAccess.ws_accessPingResponse> {
        return this._connection.send("Ping", request);
    }

    QueryScopeScansEnabled(request: WsAccess.QueryScopeScansEnabledRequest): Promise<WsAccess.QueryScopeScansEnabledResponse> {
        return this._connection.send("QueryScopeScansEnabled", request);
    }

    QueryUserViewColumns(request: WsAccess.QueryUserViewColumnsRequest): Promise<WsAccess.QueryUserViewColumnsResponse> {
        return this._connection.send("QueryUserViewColumns", request);
    }

    QueryViewColumns(request: WsAccess.QueryViewColumnsRequest): Promise<WsAccess.QueryViewColumnsResponse> {
        return this._connection.send("QueryViewColumns", request);
    }

    QueryViewMembers(request: WsAccess.QueryViewMembersRequest): Promise<WsAccess.QueryViewMembersResponse> {
        return this._connection.send("QueryViewMembers", request);
    }

    QueryViews(request: WsAccess.QueryViewsRequest): Promise<WsAccess.QueryViewsResponse> {
        return this._connection.send("QueryViews", request);
    }

    ResourceAdd(request: WsAccess.ResourceAddRequest): Promise<WsAccess.ResourceAddResponse> {
        return this._connection.send("ResourceAdd", request);
    }

    ResourceAddInput(request: WsAccess.ResourceAddInputRequest): Promise<WsAccess.ResourceAddInputResponse> {
        return this._connection.send("ResourceAddInput", request);
    }

    ResourceDelete(request: WsAccess.ResourceDeleteRequest): Promise<WsAccess.ResourceDeleteResponse> {
        return this._connection.send("ResourceDelete", request);
    }

    ResourcePermissionQuery(request: WsAccess.ResourcePermissionQueryRequest): Promise<WsAccess.ResourcePermissionQueryResponse> {
        return this._connection.send("ResourcePermissionQuery", request);
    }

    ResourcePermissions(request: WsAccess.ResourcePermissionsRequest): Promise<WsAccess.ResourcePermissionsResponse> {
        return this._connection.send("ResourcePermissions", request);
    }

    ResourceQuery(request: WsAccess.ResourceQueryRequest): Promise<WsAccess.ResourceQueryResponse> {
        return this._connection.send("ResourceQuery", request);
    }

    Resources(request: WsAccess.ResourcesRequest): Promise<WsAccess.ResourcesResponse> {
        return this._connection.send("Resources", request);
    }

    UserAccountExport(request: WsAccess.UserAccountExportRequest): Promise<WsAccess.UserAccountExportResponse> {
        return this._connection.send("UserAccountExport", request);
    }

    UserAction(request: WsAccess.UserActionRequest): Promise<WsAccess.UserActionResponse> {
        return this._connection.send("UserAction", request);
    }

    UserEdit(request: WsAccess.UserEditRequest): Promise<WsAccess.UserEditResponse> {
        return this._connection.send("UserEdit", request);
    }

    UserGroupEdit(request: WsAccess.UserGroupEditRequest): Promise<WsAccess.UserGroupEditResponse> {
        return this._connection.send("UserGroupEdit", request);
    }

    UserGroupEditInput(request: WsAccess.UserGroupEditInputRequest): Promise<WsAccess.UserGroupEditInputResponse> {
        return this._connection.send("UserGroupEditInput", request);
    }

    UserInfoEdit(request: WsAccess.UserInfoEditRequest): Promise<WsAccess.UserInfoEditResponse> {
        return this._connection.send("UserInfoEdit", request);
    }

    UserInfoEditInput(request: WsAccess.UserInfoEditInputRequest): Promise<WsAccess.UserInfoEditInputResponse> {
        return this._connection.send("UserInfoEditInput", request);
    }

    UserPosix(request: WsAccess.UserPosixRequest): Promise<WsAccess.UserPosixResponse> {
        return this._connection.send("UserPosix", request);
    }

    UserPosixInput(request: WsAccess.UserPosixInputRequest): Promise<WsAccess.UserPosixInputResponse> {
        return this._connection.send("UserPosixInput", request);
    }

    UserQuery(request: WsAccess.UserQueryRequest): Promise<WsAccess.UserQueryResponse> {
        return this._connection.send("UserQuery", request);
    }

    UserResetPass(request: WsAccess.UserResetPassRequest): Promise<WsAccess.UserResetPassResponse> {
        return this._connection.send("UserResetPass", request);
    }

    UserResetPassInput(request: WsAccess.UserResetPassInputRequest): Promise<WsAccess.UserResetPassInputResponse> {
        return this._connection.send("UserResetPassInput", request);
    }

    UserSudoers(request: WsAccess.UserSudoersRequest): Promise<WsAccess.UserSudoersResponse> {
        return this._connection.send("UserSudoers", request);
    }

    UserSudoersInput(request: WsAccess.UserSudoersInputRequest): Promise<WsAccess.UserSudoersInputResponse> {
        return this._connection.send("UserSudoersInput", request);
    }

    Users(request: WsAccess.UserRequest): Promise<WsAccess.UserResponse> {
        return this._connection.send("Users", request);
    }

}
