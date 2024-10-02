import { IConnection, IOptions } from "../../../../connection.ts";
import { Service } from "../../../../espConnection.ts";

export namespace WsCloud {

	export interface GetPODsRequest {

	}

	export interface GetPODsResponse {
		Result: string;
	}

	export interface WsCloudPingRequest {

	}

	export interface WsCloudPingResponse {

	}

}

export class CloudServiceBase extends Service {

	constructor(optsConnection: IOptions | IConnection) {
		super(optsConnection, "WsCloud", "1");
	}

	GetPODs(request: WsCloud.GetPODsRequest): Promise<WsCloud.GetPODsResponse> {
		return this._connection.send("GetPODs", request);
	}

	Ping(request: WsCloud.WsCloudPingRequest): Promise<WsCloud.WsCloudPingResponse> {
		return this._connection.send("Ping", request);
	}

}
