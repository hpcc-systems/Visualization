import * as  commsMod from "@hpcc-js/comms";

export async function roxie(url: string) {
    // const commsMod = await import("@hpcc-js/comms");
    return {
        url,
        query: (querySet: string, queryID: string) => service(commsMod.Query.attach({ baseUrl: url }, querySet, queryID))
    };
}

async function service(query) {
    try {
        await query.refresh();
        return {
            requestFields() {
                return query.requestFields();
            },
            responseFields() {
                return query.responseFields();
            },
            submit(request) {
                return query.submit(request);
            }
        };
    } catch (e) {
        return e.message;
    }
}
