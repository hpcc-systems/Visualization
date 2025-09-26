import { CodesignServiceBase, WsCodesign } from "./wsdl/ws_codesign/v1.1/ws_codesign.ts";

export { WsCodesign };

export class CodesignService extends CodesignServiceBase {

    ListUserIDsEx(request: Partial<WsCodesign.ListUserIDsRequest>): Promise<string[]> {
        return super.ListUserIDs(request).then((response: WsCodesign.ListUserIDsResponse) => {
            return response.UserIDs.Item;
        }).catch(e => {
            return [];
        });
    }

    Sign(request: Partial<WsCodesign.SignRequest>): Promise<WsCodesign.SignResponse> {
        return super.Sign({ SigningMethod: WsCodesign.SigningMethodType.gpg, ...request });
    }
}
