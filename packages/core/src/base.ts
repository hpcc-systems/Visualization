import { PKG_NAME } from "./__package__";
import { serializable } from "./serialize";

let classID = 0;

@serializable(PKG_NAME)
export class Base {

    static _idSeed: string = "_bw";

    protected readonly _id: string;

    constructor() {
        this._id = Base._idSeed + classID++;
    }

    id(): string {
        return this._id;
    }
}
export interface Base extends serializable { }
