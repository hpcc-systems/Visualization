// @ts-ignore
import fetch, { Blob, blobFrom, blobFromSync, File, fileFrom, fileFromSync, FormData, Headers, Request, Response } from "node-fetch";
if (!globalThis.fetch) {
    // @ts-ignore
    globalThis.fetch = fetch;
    // @ts-ignore
    globalThis.Headers = Headers;
    // @ts-ignore
    globalThis.Request = Request;
    // @ts-ignore
    globalThis.Response = Response;
}
export * from "./node";
