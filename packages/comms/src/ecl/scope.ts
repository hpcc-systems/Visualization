import { StateObject, StringAnyMap } from "@hpcc-js/util";
// import { utcFormat, utcParse } from "d3-time-format";
import { WUDetails } from "../services/wsWorkunits";
import { Workunit } from "./workunit";

// const formatter = utcFormat("%Y-%m-%dT%H:%M:%S.%LZ");
// const parser = utcParse("%Y-%m-%dT%H:%M:%S.%LZ");

export interface AttributeEx extends WUDetails.Property {
    FormattedEnd?: string;
}

export class Attribute extends StateObject<AttributeEx, AttributeEx> implements AttributeEx {
    readonly scope: BaseScope;

    get properties(): AttributeEx { return this.get(); }
    get Name(): string { return this.get("Name"); }
    get RawValue(): string { return this.get("RawValue"); }
    get Formatted(): string { return this.get("Formatted"); }
    get FormattedEnd(): string | undefined { return this.get("FormattedEnd"); }
    get Measure(): string { return this.get("Measure"); }
    get Creator(): string { return this.get("Creator"); }
    get CreatorType(): string { return this.get("CreatorType"); }

    constructor(scope: BaseScope, attribute: WUDetails.Property) {
        super();
        this.scope = scope;
        this.set(attribute);
    }
}

export interface ScopeEx extends WUDetails.Scope {
}

export interface IScopeVisitor {
    start(scope: BaseScope): boolean;
    end(scope: BaseScope): boolean;
}

export class BaseScope extends StateObject<ScopeEx, ScopeEx> implements ScopeEx {
    protected _attributeMap: { [key: string]: Attribute } = {};
    protected _children: BaseScope[] = [];

    get properties(): ScopeEx { return this.get(); }
    get ScopeName(): string { return this.get("ScopeName"); }
    get Id(): string { return this.get("Id"); }
    get ScopeType(): string { return this.get("ScopeType"); }
    get Properties(): WUDetails.Properties { return this.get("Properties", { Property: [] }); }
    get CAttributes(): Attribute[] {
        //  Match "started" and time elapsed
        const retVal: Attribute[] = [];
        const timeElapsed: { start: AttributeEx | null, end: AttributeEx | null } = {
            start: null,
            end: null
        };
        this.Properties.Property.forEach((scopeAttr) => {
            if (scopeAttr.Measure === "ts" && scopeAttr.Name.indexOf("Started") >= 0) {
                timeElapsed.start = scopeAttr;
            } else if (this.ScopeName && scopeAttr.Measure === "ts" && scopeAttr.Name.indexOf("Finished") >= 0) {
                timeElapsed.end = scopeAttr;
            } else {
                retVal.push(new Attribute(this, scopeAttr));
            }
        });
        if (timeElapsed.start && timeElapsed.end) {
            // const endTime = parser(timeElapsed.start.Formatted);
            // endTime!.setMilliseconds(endTime!.getMilliseconds() + (+timeElapsed.elapsed.RawValue) / 1000000);
            // timeElapsed.start.FormattedEnd = formatter(endTime!);
            timeElapsed.start.FormattedEnd = timeElapsed.end.Formatted;
            retVal.push(new Attribute(this, timeElapsed.start));
        } else if (timeElapsed.start) {
            retVal.push(new Attribute(this, timeElapsed.start));
        } else if (timeElapsed.end) {
            retVal.push(new Attribute(this, timeElapsed.end));  //  Should not happen?
        }
        return retVal;
    }

    constructor(scope: WUDetails.Scope) {
        super();
        this.update(scope);
    }

    update(scope: WUDetails.Scope) {
        this.set(scope);
        this.CAttributes.forEach((attr) => {
            this._attributeMap[attr.Name] = attr;
        });
        this.Properties.Property = [];
        for (const key in this._attributeMap) {
            if (this._attributeMap.hasOwnProperty(key)) {
                this.Properties.Property.push(this._attributeMap[key].properties);
            }
        }
    }

    parentScope(): string {
        const scopeParts = this.ScopeName.split(":");
        scopeParts.pop();
        return scopeParts.join(":");
    }

    children(): BaseScope[];
    children(_: BaseScope[]): BaseScope;
    children(_?: BaseScope[]): BaseScope[] | BaseScope {
        if (!arguments.length) return this._children;
        this._children = _!;
        return this;
    }

    walk(visitor: IScopeVisitor): boolean {
        if (visitor.start(this)) return true;
        for (const scope of this.children()) {
            if (scope.walk(visitor)) {
                return true;
            }
        }
        return visitor.end(this);
    }

    formattedAttrs(): StringAnyMap {
        const retVal: StringAnyMap = {};
        for (const attr in this._attributeMap) {
            retVal[attr] = this._attributeMap[attr].Formatted || this._attributeMap[attr].RawValue;
        }
        return retVal;
    }

    rawAttrs(): StringAnyMap {
        const retVal: StringAnyMap = {};
        for (const attr in this._attributeMap) {
            retVal[attr] = this._attributeMap[attr].RawValue;
        }
        return retVal;
    }

    hasAttr(name: string): boolean {
        return this._attributeMap[name] !== undefined;
    }

    attr(name: string): Attribute {
        return this._attributeMap[name] || new Attribute(this, {
            Creator: "",
            CreatorType: "",
            Formatted: "",
            Measure: "",
            Name: "",
            RawValue: ""
        });
    }

    attrMeasure(name: string): string {
        return this._attributeMap[name].Measure;
    }
}

export class Scope extends BaseScope {
    readonly wu: Workunit;

    constructor(wu: Workunit, scope: WUDetails.Scope) {
        super(scope);
        this.wu = wu;
    }
}
