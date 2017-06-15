import { StateObject } from "@hpcc-js/util";
import { Workunit } from "./workunit";

export interface ResourceEx {
    URL: string;
    DisplayName: string;
    DisplayPath: string;
}

export class Resource extends StateObject<ResourceEx, ResourceEx> implements ResourceEx {
    protected wu: Workunit;

    get properties(): ResourceEx { return this.get(); }
    get URL(): string { return this.get("URL"); }
    get DisplayName(): string { return this.get("DisplayName"); }
    get DisplayPath(): string { return this.get("DisplayPath"); }

    constructor(wu: Workunit, url: string) {
        super();
        this.wu = wu;

        const cleanedURL = url.split("\\").join("/");
        const urlParts = cleanedURL.split("/");
        const matchStr = "res/" + this.wu.Wuid + "/";
        let displayPath = "";
        let displayName = "";

        if (cleanedURL.indexOf(matchStr) === 0) {
            displayPath = cleanedURL.substr(matchStr.length);
            displayName = urlParts[urlParts.length - 1];
        }

        this.set({
            URL: url,
            DisplayName: displayName,
            DisplayPath: displayPath
        });
    }
}
