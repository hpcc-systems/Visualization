import { hookSend } from "@hpcc-js/comms";

const origSend = hookSend((opts, action, request, responseType): Promise<any> => {
    console.log(action);
    return origSend(opts, action, request, responseType);
});
