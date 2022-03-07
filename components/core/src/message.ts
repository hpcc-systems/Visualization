import { Message } from "@hpcc-js/util";
import { HPCCElement } from ".";

export interface Change<T> {
    oldValue: T;
    newValue: T;
}

export type ChangeMap<T extends HPCCElement> = {
    [what in keyof T]+?: Change<T[what]>;
}

export class AttrChangedMessage extends Message {

    get canConflate(): boolean {
        return true;
    }

    changes: ChangeMap<any> = {};

    constructor(what: string, oldValue: any, newValue: any) {
        super();
        this.changes[what] = { oldValue, newValue };
    }

    conflate(other: AttrChangedMessage): boolean {
        for (const what in other.changes) {
            const thisChange = this.changes[what];
            const otherChange = other.changes[what];
            if (thisChange) {
                this.changes[what]!.newValue = otherChange?.newValue;
            } else {
                this.changes[what] = otherChange;
            }
        }
        return true;
    }
}
