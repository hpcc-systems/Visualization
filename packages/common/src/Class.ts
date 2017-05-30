function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor).forEach(name => {
            const descriptor = Object.getOwnPropertyDescriptor(baseCtor, name);
            Object.defineProperty(derivedCtor, name, descriptor);
            // derivedCtor[name] = baseCtor[name];
        });
    });
}

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
        applyMixins(this, [source]);
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
