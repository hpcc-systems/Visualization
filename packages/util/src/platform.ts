export const root = new Function("try{return global;}catch(e){return window;}")();

export const isBrowser = new Function("try{return this===window;}catch(e){return false;}");
export const isNode = new Function("try{return this===global;}catch(e){return false;}");
export const isTravis = new Function("try{return process.env.TRAVIS;}catch(e){return false;}");
