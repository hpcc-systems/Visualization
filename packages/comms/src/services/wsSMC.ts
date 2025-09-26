import { SMCServiceBase, WsSMC } from "./wsdl/WsSMC/v1.28/WsSMC.ts";
import { IOptions } from "../connection.ts";

export {
    WsSMC
};

export class SMCService extends SMCServiceBase {

    connectionOptions(): IOptions {
        return this._connection.opts();
    }

    Activity(request: WsSMC.Activity): Promise<WsSMC.ActivityResponse> {
        return super.Activity(request).then(response => {
            return {
                Running: {
                    ActiveWorkunit: []
                },
                ...response
            };
        });
    }
}
