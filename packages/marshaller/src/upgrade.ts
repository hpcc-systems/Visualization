import { DDLAdapter } from "./ddl2/ddl";
import { doImport } from "./ddl2/ddlimport";
import { ElementContainer } from "./ddl2/model";

export function upgrade(url: string, ddl: string): string {

    const ec = new ElementContainer();
    doImport(ec, url, ddl);

    const exp = new DDLAdapter(ec);
    const ddl2 = exp.write();

    return JSON.stringify(ddl2);
}
