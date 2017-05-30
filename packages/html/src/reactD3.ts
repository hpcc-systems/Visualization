import { select as d3Select } from "d3-selection";

export type ReactFn = (attrs: { [key: string]: string }) => VNode;

export interface IVNode {
    new (attrs: { [key: string]: string }, children: VNode[]): VNode;
}

export class VNode {
    protected _attrs: { [key: string]: string };
    protected _children: VNode[];

    constructor(attrs: { [key: string]: string }, children: VNode[]) {
        this._attrs = attrs;
        this._children = children;
    }

    type(): string {
        return "div";
    }

    attrs(): { [key: string]: string } {
        return this._attrs;
    }

    attr(key) {
        return this._attrs[key];
    }

    children(): VNode[] {
        return this._children;
    }

    update(targetElement) {
        for (const key in this._attrs) {
            targetElement.attr(key, this._attrs[key]);
        }
    }

    render(targetElement) {
        const thisElement = targetElement.selectAll(`${targetElement.node().tagName} > *`).data([this]);
        thisElement.exit()
            .each(d => console.log(`render:  Exit - ${d.type()}`))
            .remove();
        return thisElement.enter().append(this.type())
            .each(d => console.log(`render:  Enter - ${d.type()}`))
            .attr("reactd3", 0)
            .merge(thisElement)
            .each(function (d: VNode) {
                const element = d3Select(this);
                d.update(element);
                d.renderChildren(element);
            })
            ;
    }

    renderChildren(targetElement) {
        const thisElement = targetElement.selectAll(`${targetElement.node().tagName} > *`).data(this._children);
        thisElement.exit()
            .each(d => console.log(`renderChildren:  Exit - ${d.type()}`))
            .remove();
        return thisElement.enter().append(d => document.createElement(d.type()))
            .each(d => console.log(`renderChildren:  Enter - ${d.type()}`))
            .attr("reactd3", (_d, i) => i)
            .merge(thisElement)
            .each(function (d: VNode) {
                const element = d3Select(this);
                d.update(element);
                d.renderChildren(element);
            })
            ;
    }
}

class ConstVNode extends VNode {
    protected _type: string;

    constructor(type: string, attrs: { [key: string]: string }, children: VNode[]) {
        super(attrs, children);
        this._type = type;
    }

    type(): string {
        return this._type;
    }
}

class TextVNode extends VNode {
    protected _text: string;

    constructor(text: string) {
        super({}, []);
        this._text = text;
    }

    type(): string {
        return "span";
    }

    update(targetElement) {
        super.update(targetElement);
        targetElement.text(this._text);
    }
}

function isReactFn(_): _ is ReactFn {
    return typeof _ === "function";
}

function isIVNode(_: any): _ is IVNode {
    return _.prototype && _.prototype instanceof VNode;
}

export class ReactD3 {
    // static createElementXXX(type: string | ReactFn | IVNode, attrs: { [key: string]: string }, ...children: Array<string | VNode>): VNode {
    static createElement(type: string | ReactFn | IVNode, attrs: { [key: string]: string }, ...children: Array<string | VNode>): VNode {
        if (isIVNode(type)) {
            return new (type as any)(attrs);
        } else if (isReactFn(type)) {
            return type(attrs);
        }
        return new ConstVNode(type, attrs, children.map(child => {
            if (typeof child === "string") {
                return new TextVNode(child);
            }
            return child;
        }));
    }

    static render(vdom: VNode, targetElement) {
        vdom.render(targetElement);
    }
}
