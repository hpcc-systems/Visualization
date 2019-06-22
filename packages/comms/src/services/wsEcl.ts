import { DDL2 } from "@hpcc-js/ddl-shim";
import { IConnection, IOptions } from "../connection";
import { ESPExceptions, Service } from "../espConnection";

export type IFieldType = DDL2.IFieldType;
export type IField = DDL2.IField;

export type IWsEclRequest = IField[];
export type IWsEclResult = IField[];
export type IWsEclResponse = { [id: string]: IField[] };

function jsonToIField(id: string, item: any): IField {
    const type = typeof item;
    switch (type) {
        case "boolean":
        case "number":
        case "string":
            return { id, type };
        case "object":
            if (item.Row instanceof Array) {
                item = item.Row;
            }
            if (item instanceof Array) {
                return {
                    id,
                    type: "dataset",
                    children: jsonToIFieldArr(item[0])
                };
            }
        // Fall through  ---
        default:
            throw new Error("Unknown field type");
    }
}

function jsonToIFieldArr(json: any): IField[] {
    if (json.Row && json.Row instanceof Array) {
        json = json.Row[0];
    }
    const retVal: IField[] = [];
    for (const key in json) {
        retVal.push(jsonToIField(key, json[key]));
    }
    return retVal;
}

export class EclService extends Service {

    constructor(optsConnection: IOptions | IConnection) {
        super(optsConnection, "WsEcl", "0");
    }

    opts() {
        return this._connection.opts();
    }

    requestJson(querySet: string, queryId: string): Promise<IWsEclRequest> {
        // http://192.168.3.22:8002/WsEcl/example/request/query/roxie/peopleaccounts/json?display
        return this._connection.send(`example/request/query/${querySet}/${queryId}/json`, {}, "text").then(response => {
            const requestSchema = JSON.parse(response);
            for (const key in requestSchema) {
                return requestSchema[key];
            }
            return {};
        }).then(jsonToIFieldArr);
    }

    responseJson(querySet: string, queryId: string): Promise<IWsEclResponse> {
        // http://192.168.3.22:8002/WsEcl/example/response/query/roxie/peopleaccounts/json?display
        return this._connection.send(`example/response/query/${querySet}/${queryId}/json`, {}, "text").then(response => {
            const responseSchema = JSON.parse(response);
            for (const key in responseSchema) {
                return responseSchema[key].Results;
            }
            return {};
        }).then(resultsJson => {
            const retVal: IWsEclResponse = {};
            for (const key in resultsJson) {
                retVal[key] = jsonToIFieldArr(resultsJson[key]);
            }
            return retVal;
        });
    }

    submit(querySet: string, queryId: string, request: object) {
        // http://192.168.3.22:8002/WsEcl/submit/query/roxie/peopleaccounts.1/json
        const action = `submit/query/${querySet}/${queryId}`;
        return this._connection.send(action, request, "json2").then(response => {
            if (response.Results && response.Results.Exception) {
                throw new ESPExceptions(action, request, {
                    Source: "wsEcl.submit",
                    Exception: response.Results.Exception
                });
            }
            return response.Results;
        });
    }
}
