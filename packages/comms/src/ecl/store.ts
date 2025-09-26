import { Cache, Dispatch, IObserverHandle, Message } from "@hpcc-js/util";
import { IConnection, IOptions } from "../connection.ts";
import { StoreService } from "../services/wsStore.ts";

export class StoreCache extends Cache<{ BaseUrl: string, Name: string, UserSpecific: boolean, Namespace: string }, Store> {
    constructor() {
        super((obj) => {
            return `${obj.BaseUrl}-${obj.Name}:${obj.UserSpecific}-${obj.Namespace}`;
        });
    }
}
const _store = new StoreCache();

export class ValueChangedMessage extends Message {

    constructor(readonly key: string, public value: any, public oldValue?: any) {
        super();
    }

    get canConflate(): boolean { return true; }
    conflate(other: ValueChangedMessage): boolean {
        if (this.key === other.key) {
            this.value = other.value;
            return true;
        }
        return false;
    }

    void(): boolean {
        return this.value === this.oldValue;
    }
}

export class Store {
    protected connection: StoreService;
    get BaseUrl() { return this.connection.baseUrl; }
    readonly Name: string;
    readonly UserSpecific: boolean;
    readonly Namespace: string;

    protected _dispatch = new Dispatch<ValueChangedMessage>();

    static attach(optsConnection: IOptions | IConnection | StoreService, Name: string = "HPCCApps", Namespace: string, UserSpecific: boolean = true): Store {
        const retVal: Store = _store.get({ BaseUrl: optsConnection.baseUrl, Name, UserSpecific, Namespace }, () => {
            return new Store(optsConnection, Name, Namespace, UserSpecific);
        });
        return retVal;
    }

    protected constructor(optsConnection: IOptions | IConnection | StoreService, Name: string, Namespace: string, UserSpecific: boolean) {
        if (optsConnection instanceof StoreService) {
            this.connection = optsConnection;
        } else {
            this.connection = new StoreService(optsConnection);
        }
        this.Name = Name;
        this.UserSpecific = UserSpecific;
        this.Namespace = Namespace;
    }

    private _knownValues: { [key: string]: any } = {};

    protected create() {
        this.connection.CreateStore({ Name: this.Name, Type: "", Description: "" });
    }

    set(key: string, value: string, broadcast = true): Promise<void> {
        return this.connection.Set({
            StoreName: this.Name,
            UserSpecific: this.UserSpecific,
            Namespace: this.Namespace,
            Key: key,
            Value: value
        }).then(response => {
            const oldValue = this._knownValues[key];
            this._knownValues[key] = value;
            if (broadcast) {
                this._dispatch.post(new ValueChangedMessage(key, value, oldValue));
            }
        }).catch(e => {
            console.error(`Store.set("${key}", "${value}") failed:`, e);
        });
    }

    get(key: string, broadcast = true): Promise<string | undefined> {
        return this.connection.Fetch({
            StoreName: this.Name,
            UserSpecific: this.UserSpecific,
            Namespace: this.Namespace,
            Key: key
        }).then(response => {
            const oldValue = this._knownValues[key];
            this._knownValues[key] = response.Value;
            if (broadcast) {
                this._dispatch.post(new ValueChangedMessage(key, response.Value, oldValue));
            }
            return response.Value;
        }).catch(e => {
            console.error(`Store.get(${key}) failed:`, e);
            return undefined;
        });
    }

    getAll(broadcast = true): Promise<{ [key: string]: string }> {
        return this.connection.FetchAll({
            StoreName: this.Name,
            UserSpecific: this.UserSpecific,
            Namespace: this.Namespace
        }).then(response => {
            const retVal: { [key: string]: string } = {};
            const deletedValues = this._knownValues;
            this._knownValues = {};
            response.Pairs.Pair.forEach(pair => {
                const oldValue = this._knownValues[pair.Key];
                this._knownValues[pair.Key] = pair.Value;
                delete deletedValues[pair.Key];
                retVal[pair.Key] = pair.Value;
                if (broadcast) {
                    this._dispatch.post(new ValueChangedMessage(pair.Key, pair.Value, oldValue));
                }
            });
            if (broadcast) {
                for (const key in deletedValues) {
                    this._dispatch.post(new ValueChangedMessage(key, undefined, deletedValues[key]));
                }
            }
            return retVal;
        }).catch(e => {
            console.error("Store.getAll failed:", e);
            return {};
        });
    }

    delete(key: string, broadcast = true): Promise<void> {
        return this.connection.Delete({
            StoreName: this.Name,
            UserSpecific: this.UserSpecific,
            Namespace: this.Namespace,
            Key: key
        }).then(response => {
            const oldValue = this._knownValues[key];
            delete this._knownValues[key];
            if (broadcast) {
                this._dispatch.post(new ValueChangedMessage(key, undefined, oldValue));
            }
        }).catch(e => {
            console.error(`Store.delete(${key}) failed:`, e);
        });
    }

    monitor(callback: (messages: ValueChangedMessage[]) => void): IObserverHandle {
        return this._dispatch.attach(callback);
    }
}
