import { SMCServiceBase, WsSMC } from "./wsdl/WsSMC/v1.27/WsSMC";
import { IOptions } from "../connection";

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
