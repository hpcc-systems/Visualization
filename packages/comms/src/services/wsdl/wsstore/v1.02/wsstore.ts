import { IConnection, IOptions } from "../../../../connection";
import { Service } from "../../../../espConnection";

type int = number;

export namespace Wsstore {

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
    Exceptions: {
        Source: string;
        Exception: Exception[];
    };
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
    Pairs: {
        Pair: Pair[];
    };
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
    KeySet: {
        Key: string[];
    };
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
    Namespaces: {
        Namespace: string[];
    };
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
    Stores: {
        Store: Store[];
    };
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

CreateStore(request: Wsstore.CreateStoreRequest): Promise<Wsstore.CreateStoreResponse> {
	return this._connection.send("CreateStore", request);
}

Delete(request: Wsstore.DeleteRequest): Promise<Wsstore.DeleteResponse> {
	return this._connection.send("Delete", request);
}

DeleteNamespace(request: Wsstore.DeleteNamespaceRequest): Promise<Wsstore.DeleteNamespaceResponse> {
	return this._connection.send("DeleteNamespace", request);
}

Fetch(request: Wsstore.FetchRequest): Promise<Wsstore.FetchResponse> {
	return this._connection.send("Fetch", request);
}

FetchAll(request: Wsstore.FetchAllRequest): Promise<Wsstore.FetchAllResponse> {
	return this._connection.send("FetchAll", request);
}

FetchKeyMetadata(request: Wsstore.FetchKeyMDRequest): Promise<Wsstore.FetchKeyMDResponse> {
	return this._connection.send("FetchKeyMetadata", request);
}

ListKeys(request: Wsstore.ListKeysRequest): Promise<Wsstore.ListKeysResponse> {
	return this._connection.send("ListKeys", request);
}

ListNamespaces(request: Wsstore.ListNamespacesRequest): Promise<Wsstore.ListNamespacesResponse> {
	return this._connection.send("ListNamespaces", request);
}

ListStores(request: Wsstore.ListStoresRequest): Promise<Wsstore.ListStoresResponse> {
	return this._connection.send("ListStores", request);
}

Ping(request: Wsstore.wsstorePingRequest): Promise<Wsstore.wsstorePingResponse> {
	return this._connection.send("Ping", request);
}

Set(request: Wsstore.SetRequest): Promise<Wsstore.SetResponse> {
	return this._connection.send("Set", request);
}

}
