declare const process: any;

//  @ts-ignore
export const root: any = new Function("return this;")(); //  Prevent bundlers from messing with "this"

export const isBrowser: boolean = typeof window !== "undefined" && root === window;
export const isNode: boolean = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
export const isTravis: boolean = isNode && process.env != null && process.env.TRAVIS != null;
