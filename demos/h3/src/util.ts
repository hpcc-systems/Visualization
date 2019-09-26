import { Query, Workunit } from "@hpcc-js/comms";

export function connect(url: string) {
    const wuUrlParts = url.split("/WsWorkunits/res/");
    if (wuUrlParts.length > 1) {
        const wuid = wuUrlParts[1].split("/res/index.html")[0];
        return Workunit.attach({ baseUrl: wuUrlParts[0] }, wuid);
    }

    const roxieUrlParts = url.split("/WsEcl/res/query/");
    if (roxieUrlParts.length > 1) {
        const roxieParts = roxieUrlParts[1].split("/res/index.html")[0].split("/");
        return Query.attach({ baseUrl: roxieUrlParts[0] }, roxieParts[0], roxieParts[1]);
    }

    return undefined;
}
