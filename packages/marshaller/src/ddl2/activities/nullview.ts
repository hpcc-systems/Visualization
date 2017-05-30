import { IField } from "@hpcc-js/dgrid";
import { View } from "./view";

export class NullView extends View {
    hash(): string {
        return super.hash();
    }

    outFields(): IField[] {
        return [];
    }

    _fetch(from: number, count: number): Promise<any[]> {
        return Promise.resolve([]);
    }
}
NullView.prototype._class += " NullView";
