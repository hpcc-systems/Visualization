import { storeServiceBase as StoreServiceBase, Wsstore as WsStore } from "./wsdl/wsstore/v1.02/wsstore.ts";

export { type WsStore };

export class StoreService extends StoreServiceBase {

    Delete(request: Partial<WsStore.DeleteRequest>): Promise<WsStore.DeleteResponse> {
        return super.Delete(request).catch(e => {
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

    Fetch(request: Partial<WsStore.FetchRequest>): Promise<WsStore.FetchResponse> {
        return super.Fetch(request).catch(e => {
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
}
