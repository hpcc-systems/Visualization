export const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
export const isNode = new Function("try {return this===global;}catch(e){return false;}");
export const isTravis = new Function("try {return process.env.TRAVIS ;}catch(e){return false;}");
export const ESP_URL = isTravis() ? "http://52.51.90.23:8010/" : "http://192.168.3.22:8010/";
