import { Connection, hookSend, IOptions, ResponseType, SendFunc, serializeRequest } from "@hpcc-js/comms";

const origSend = hookSend((opts: IOptions, action: string, request: any, responseType: ResponseType): Promise<any> => {
    if (opts.baseUrl === "https://webmiscdev.risk.regn.net") {
        return origSend(opts, action, request, responseType);
    }
    let newUrl = "";
    if (opts.baseUrl.split("").reverse()[0] === "/" || action[0] === "/") {
        newUrl = btoa(`${opts.baseUrl}${action}?${serializeRequest(request)}`);
    } else {
        newUrl = btoa(`${opts.baseUrl}/${action}?${serializeRequest(request)}`);
    }
    const connection = new Connection({ baseUrl: "https://webmiscdev.risk.regn.net", type: "get" });
    return connection.send("brundajx/DASH2/demos/dashy/bis_proxy.php", { encoded: newUrl }, responseType).then(response => {
        return response;
    }).catch(e => {
        throw e;
    });
});
