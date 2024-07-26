import { AccountServiceBase, WsAccount } from "./wsdl/ws_account/v1.06/ws_account";
import { ESPExceptions } from "../espConnection";

export {
    WsAccount
};

export class AccountService extends AccountServiceBase {

    VerifyUser(request: WsAccount.VerifyUserRequest): Promise<WsAccount.VerifyUserResponse> {
        return this._connection.send("VerifyUser", request)
            .catch((e: ESPExceptions) => {
                //  old client version warning  ---
                if (e.isESPExceptions && e.Exception.some(exception => exception.Code === 20043)) {
                    return {
                        retcode: 20043,
                        Exceptions: {
                            Source: "wsAccount",
                            Exception: e.Exception
                        }
                    };
                }
                throw e;
            });
    }

}
