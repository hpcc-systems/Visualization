import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace Wsstore {

    export type int = number;

    export interface CreateStoreRequest {
        Name?: string;
        Type?: string;
        Description?: string;
        MaxValueSize?: int;
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

    export interface CreateStoreResponse {
        Exceptions: Exceptions;
        Name: string;
        Type: string;
        Description: string;
        Owner: string;
        Success: boolean;
    }

    export interface DeleteRequest {
        StoreName?: string;
        Namespace?: string;
        Key?: string;
        UserSpecific?: boolean;
        TargetUser?: string;
    }

    export interface DeleteResponse {
        Exceptions: Exceptions;
        Success: boolean;
    }

    export interface DeleteNamespaceRequest {
        StoreName?: string;
        Namespace?: string;
        UserSpecific?: boolean;
        TargetUser?: string;
    }

    export interface DeleteNamespaceResponse {
        Exceptions: Exceptions;
        Success: boolean;
    }

    export interface FetchRequest {
        StoreName?: string;
        Namespace?: string;
        Key?: string;
        UserSpecific?: boolean;
    }

    export interface FetchResponse {
        Exceptions: Exceptions;
        Value: string;
    }

    export interface FetchAllRequest {
        StoreName?: string;
        Namespace?: string;
        UserSpecific?: boolean;
    }

    export interface Pair {
        Key: string;
        Value: string;
    }

    export interface Pairs {
        Pair: Pair[];
    }

    export interface FetchAllResponse {
        Exceptions: Exceptions;
        Namespace: string;
        Pairs: Pairs;
    }

    export interface FetchKeyMDRequest {
        StoreName?: string;
        Namespace?: string;
        Key?: string;
        UserSpecific?: boolean;
    }

    export interface FetchKeyMDResponse {
        Exceptions: Exceptions;
        StoreName: string;
        Namespace: string;
        Key: string;
        Pairs: Pairs;
    }

    export interface ListKeysRequest {
        StoreName?: string;
        Namespace?: string;
        UserSpecific?: boolean;
    }

    export interface KeySet {
        Key: string[];
    }

    export interface ListKeysResponse {
        Exceptions: Exceptions;
        StoreName: string;
        Namespace: string;
        KeySet: KeySet;
    }

    export interface ListNamespacesRequest {
        StoreName?: string;
        UserSpecific?: boolean;
    }

    export interface Namespaces {
        Namespace: string[];
    }

    export interface ListNamespacesResponse {
        Exceptions: Exceptions;
        StoreName: string;
        Namespaces: Namespaces;
    }

    export interface ListStoresRequest {
        NameFilter?: string;
        TypeFilter?: string;
        OwnerFilter?: string;
    }

    export interface Store {
        Name: string;
        Type: string;
        Description: string;
        Owner: string;
        CreateTime: string;
        MaxValSize: string;
        IsDefault: boolean;
    }

    export interface Stores {
        Store: Store[];
    }

    export interface ListStoresResponse {
        Exceptions: Exceptions;
        Stores: Stores;
    }

    export interface wsstorePingRequest {

    }

    export interface wsstorePingResponse {

    }

    export interface SetRequest {
        StoreName?: string;
        Namespace?: string;
        Key?: string;
        Value?: string;
        UserSpecific?: boolean;
    }

    export interface SetResponse {
        Exceptions: Exceptions;
        Success: boolean;
    }

}

export class storeServiceBase extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "wsstore", "1.02");
    }

    CreateStore(request: Partial<Wsstore.CreateStoreRequest>): Promise<Wsstore.CreateStoreResponse> {
        return this._connection.send("CreateStore", request, "json", false, undefined, "CreateStoreResponse");
    }

    Delete(request: Partial<Wsstore.DeleteRequest>): Promise<Wsstore.DeleteResponse> {
        return this._connection.send("Delete", request, "json", false, undefined, "DeleteResponse");
    }

    DeleteNamespace(request: Partial<Wsstore.DeleteNamespaceRequest>): Promise<Wsstore.DeleteNamespaceResponse> {
        return this._connection.send("DeleteNamespace", request, "json", false, undefined, "DeleteNamespaceResponse");
    }

    Fetch(request: Partial<Wsstore.FetchRequest>): Promise<Wsstore.FetchResponse> {
        return this._connection.send("Fetch", request, "json", false, undefined, "FetchResponse");
    }

    FetchAll(request: Partial<Wsstore.FetchAllRequest>): Promise<Wsstore.FetchAllResponse> {
        return this._connection.send("FetchAll", request, "json", false, undefined, "FetchAllResponse");
    }

    FetchKeyMetadata(request: Partial<Wsstore.FetchKeyMDRequest>): Promise<Wsstore.FetchKeyMDResponse> {
        return this._connection.send("FetchKeyMetadata", request, "json", false, undefined, "FetchKeyMDResponse");
    }

    ListKeys(request: Partial<Wsstore.ListKeysRequest>): Promise<Wsstore.ListKeysResponse> {
        return this._connection.send("ListKeys", request, "json", false, undefined, "ListKeysResponse");
    }

    ListNamespaces(request: Partial<Wsstore.ListNamespacesRequest>): Promise<Wsstore.ListNamespacesResponse> {
        return this._connection.send("ListNamespaces", request, "json", false, undefined, "ListNamespacesResponse");
    }

    ListStores(request: Partial<Wsstore.ListStoresRequest>): Promise<Wsstore.ListStoresResponse> {
        return this._connection.send("ListStores", request, "json", false, undefined, "ListStoresResponse");
    }

    Ping(request: Partial<Wsstore.wsstorePingRequest>): Promise<Wsstore.wsstorePingResponse> {
        return this._connection.send("Ping", request, "json", false, undefined, "wsstorePingResponse");
    }

    Set(request: Partial<Wsstore.SetRequest>): Promise<Wsstore.SetResponse> {
        return this._connection.send("Set", request, "json", false, undefined, "SetResponse");
    }

}
