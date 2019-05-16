import { IConnection, IOptions } from "../connection";
import { Service } from "../espConnection";

/*
    Response structures generated via:
    * http://localhost:8010/wsstore/Fetch?reqjson_
    * http://localhost:8010/wsstore/Fetch?respjson_
    * http://json2ts.com/
*/

export namespace WsStore {

    export interface CreateStoreRequest {
        Name: string;
        Type: string;
        Description: string;
        UserSpecific: boolean;
    }

    export interface DeleteRequest {
        StoreName: string;
        Namespace: string;
        Key: string;
        UserSpecific: boolean;
        TargetUser?: string;
    }

    export interface DeleteNamespaceRequest {
        StoreName: string;
        Namespace: string;
        UserSpecific: boolean;
        TargetUser: string;
    }

    export interface FetchRequest {
        StoreName: string;
        Namespace: string;
        Key: string;
        UserSpecific: boolean;
    }

    export interface FetchAllRequest {
        StoreName: string;
        Namespace: string;
        UserSpecific: boolean;
    }

    export interface FetchKeyMDRequest {
        StoreName: string;
        Namespace: string;
        Key: string;
        UserSpecific: boolean;
    }

    export interface ListKeysRequest {
        StoreName: string;
        Namespace: string;
        UserSpecific: boolean;
    }

    export interface ListNamespacesRequest {
        StoreName: string;
        UserSpecific: boolean;
    }

    export interface SetRequest {
        StoreName: string;
        Namespace: string;
        Key: string;
        Value: string;
        UserSpecific: boolean;
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
    }

    export interface DeleteResponse {
        Exceptions: Exceptions;
        Success: boolean;
    }

    export interface DeleteNamespaceResponse {
        Exceptions: Exceptions;
        Success: boolean;
    }

    export interface FetchResponse {
        Exceptions: Exceptions;
        Value: string;
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

    export interface Pair2 {
        Key: string;
        Value: string;
    }

    export interface Pairs2 {
        Pair: Pair2[];
    }

    export interface FetchKeyMDResponse {
        Exceptions: Exceptions;
        StoreName: string;
        Namespace: string;
        Key: string;
        Pairs: Pairs2;
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

    export interface Namespaces {
        Namespace: string[];
    }

    export interface ListNamespacesResponse {
        Exceptions: Exceptions;
        StoreName: string;
        Namespaces: Namespaces;
    }

    export interface WsstorePingResponse {
    }

    export interface SetResponse {
        Exceptions: Exceptions;
        Success: boolean;
    }
}

export class StoreService extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsStore", "1");
    }

    CreateStore(request: WsStore.CreateStoreRequest): Promise<WsStore.CreateStoreResponse> {
        return this._connection.send("Fetch", request);
    }

    Delete(request: WsStore.DeleteRequest): Promise<WsStore.DeleteResponse> {
        return this._connection.send("Delete", request).catch(e => {
            if (e.isESPExceptions && e.Exception.some(e => e.Code === -1)) {
                //  "Delete" item does not exist  ---
                return {
                    Exceptions: undefined,
                    Success: true
                } as WsStore.DeleteResponse;
            }
            throw e;
        });
    }

    DeleteNamespace(request: WsStore.DeleteNamespaceRequest): Promise<WsStore.DeleteNamespaceResponse> {
        return this._connection.send("DeleteNamespace", request);
    }

    Fetch(request: WsStore.FetchRequest): Promise<WsStore.FetchResponse> {
        return this._connection.send("Fetch", request).catch(e => {
            if (e.isESPExceptions && e.Exception.some(e => e.Code === -1)) {
                //  "Fetch" item does not exist  ---
                return {
                    Exceptions: undefined,
                    Value: undefined
                } as WsStore.FetchResponse;
            }
            throw e;
        });
    }

    FetchAll(request: WsStore.FetchAllRequest): Promise<WsStore.FetchAllResponse> {
        return this._connection.send("FetchAll", request);
    }

    FetchKeyMD(request: WsStore.FetchKeyMDRequest): Promise<WsStore.FetchKeyMDResponse> {
        return this._connection.send("FetchKeyMD", request);
    }

    ListKeys(request: WsStore.ListKeysRequest): Promise<WsStore.ListKeysResponse> {
        return this._connection.send("ListKeys", request);
    }

    ListNamespaces(request: WsStore.ListNamespacesRequest): Promise<WsStore.ListNamespacesResponse> {
        return this._connection.send("ListNamespaces", request);
    }

    Set(request: WsStore.SetRequest): Promise<WsStore.SetResponse> {
        return this._connection.send("Set", request);
    }
}
