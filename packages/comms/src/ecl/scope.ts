import { utcFormat, utcParse } from "d3-time-format";
import { StateObject } from "@hpcc-js/util";
import { WUDetails } from "../services/wsWorkunits";
import { Workunit } from "./workunit";

const formatter = utcFormat("%Y-%m-%dT%H:%M:%S.%LZ");
const parser = utcParse("%Y-%m-%dT%H:%M:%S.%LZ");

export interface AttributeEx extends WUDetails.Attribute {
    FormattedEnd?: string;
}

export class Attribute extends StateObject<AttributeEx, AttributeEx> implements AttributeEx {
    readonly scope: Scope;

    get properties(): AttributeEx { return this.get(); }
    get Name(): string { return this.get("Name"); }
    get RawValue(): string { return this.get("RawValue"); }
    get Formatted(): string { return this.get("Formatted"); }
    get FormattedEnd(): string | undefined { return this.get("FormattedEnd"); }
    get Measure(): string { return this.get("Measure"); }
    get Creator(): string { return this.get("Creator"); }
    get CreatorType(): string { return this.get("CreatorType"); }

    constructor(scope: Scope, attribute: WUDetails.Attribute) {
        super();
        this.scope = scope;
        this.set(attribute);
    }
}

export interface ScopeEx extends WUDetails.Scope {
}

export interface IScopeVisitor {
    start(scope: Scope): boolean;
    end(scope: Scope): boolean;
}

export class Scope extends StateObject<ScopeEx, ScopeEx> implements ScopeEx {
    readonly wu: Workunit;
    protected _attributeMap: { [key: string]: Attribute } = {};
    protected _children: Scope[] = [];

    get properties(): ScopeEx { return this.get(); }
    get Scope(): string { return this.get("Scope"); }
    get Id(): string { return this.get("Id"); }
    get ScopeType(): string { return this.get("ScopeType"); }
    get Attributes(): WUDetails.Attributes { return this.get("Attributes", { Attribute: [] }); }
    get CAttributes(): Attribute[] {
        //  Match "started" and time elapsed
        const retVal: Attribute[] = [];
        const timeElapsed: { start: AttributeEx | null, elapsed: AttributeEx | null } = {
            start: null,
            elapsed: null
        };
        this.Attributes.Attribute.forEach((scopeAttr) => {
            if (scopeAttr.Name === "TimeElapsed") {
                timeElapsed.elapsed = scopeAttr;
            } else if (scopeAttr.Measure === "ts" && scopeAttr.Name.indexOf("Started") >= 0) {
                timeElapsed.start = scopeAttr;
            } else {
                retVal.push(new Attribute(this, scopeAttr));
            }
        });
        if (timeElapsed.start && timeElapsed.elapsed) {
            const endTime = parser(timeElapsed.start.Formatted);
            endTime!.setMilliseconds(endTime!.getMilliseconds() + timeElapsed.elapsed.RawValue / 1000000);
            timeElapsed.start.FormattedEnd = formatter(endTime!);
            retVal.push(new Attribute(this, timeElapsed.start));
        } else if (timeElapsed.start) {
            retVal.push(new Attribute(this, timeElapsed.start));
        } else if (timeElapsed.elapsed) {
            retVal.push(new Attribute(this, timeElapsed.elapsed));
        }
        return retVal;
    }

    constructor(wu: Workunit, scope: WUDetails.Scope) {
        super();
        this.wu = wu;
        this.update(scope);
    }

    update(scope: WUDetails.Scope) {
        this.set(scope);
        this.CAttributes.forEach((attr) => {
            this._attributeMap[attr.Name] = attr;
        });
        this.Attributes.Attribute = [];
        for (const key in this._attributeMap) {
            if (this._attributeMap.hasOwnProperty(key)) {
                this.Attributes.Attribute.push(this._attributeMap[key].properties);
            }
        }
    }

    parentScope(): string {
        const scopeParts = this.Scope.split(":");
        scopeParts.pop();
        return scopeParts.join(":");
    }

    children(): Scope[];
    children(_: Scope[]): Scope;
    children(_?: Scope[]): Scope[] | Scope {
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
