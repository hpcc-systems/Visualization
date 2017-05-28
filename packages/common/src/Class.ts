export class Class {
    _class: string;

    class(): string;
    class(_: string): this;
    class(_?: string): string | this {
        if (!arguments.length) return this._class;
        this._class = _;
        return this;
    }

    classID() {
        return this._class.split(" ").pop();
    }

    implements(source) {
        for (const prop in source) {
            if (source.hasOwnProperty(prop)) {
                if (this[prop] === undefined) {
                    this[prop] = source[prop];
                } else if ((window as any).__hpcc_debug) {
                    console.log("Duplicate member:  " + prop);
                }
            }
        }
    }

    mixin(mixinClass) {
        this.implements(mixinClass.prototype);
        //  Special case mixins  ---
        if (mixinClass.prototype.hasOwnProperty("_class")) {
            this._class += " " + mixinClass.prototype._class.split(" ").pop();
        }
    }

    overrideMethod(methodID, newMethod) {
        if (this[methodID] === undefined) {
            throw new Error("Method:  " + methodID + " does not exist.");
        }
        const origMethod = this[methodID];
        this[methodID] = function () {
            return newMethod(origMethod, arguments);
        };
        return this;
    }
}
Class.prototype._class = "common_Class";
