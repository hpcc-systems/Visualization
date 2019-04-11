import { BaseType as d3BaseType, select as d3Select, Selection as d3Selection } from "d3-selection";
import { Base } from "./base";

export type SelectionT<T> = d3Selection<d3BaseType, T, null, undefined>;

export class Widget extends Base {

    protected _element: SelectionT<this>;

    constructor(protected readonly _tag: string = "div") {
        super();
    }

    private _target: null | HTMLElement | SVGElement;
    target(): null | HTMLElement | SVGElement;
    target(_: null | string | HTMLElement | SVGElement | SelectionT<any>): this;
    target(_?: null | string | HTMLElement | SVGElement | SelectionT<any>): null | HTMLElement | SVGElement | this {
        if (!arguments.length) return this._target;
        if (_ === null) {
            if (this._element) {
                this.exit(this._element);
                delete this._element;
            }
            delete this._target;
        } else if (_ && this._target) {
            throw new Error("Target can only be assigned once.");
        } else if (typeof _ === "string") {
            this._target = d3Select<HTMLElement | SVGElement, {}>(_).node();
        } else if (_ instanceof Element) {
            this._target = _;
        } else if (_) {
            this._target = _.node() as HTMLElement;
        }
        if (_ && !this._target) {
            throw new Error("Invalid target.");
        }
        return this;
    }

    enter(element: SelectionT<this>) {
    }

    update(element: SelectionT<this>) {
    }

    exit(element: SelectionT<this>) {
    }

    render(callback = (w: this) => { }): this {
        const elements = d3Select(this._target).selectAll("#" + this._id).data([this]);

        elements.enter().append(this._tag)
            .attr("id", this._id)
            .attr("class", this.className())
            .each(function (self: Widget) {
                self._element = d3Select(this);
                self.enter(self._element);
            }).merge(elements).each(function (self: Widget) {
                self.update(self._element);
            });

        setTimeout(() => {
            callback(this);
        }, 0);

        return this;
    }
}

export class Placeholder<T extends Widget> extends Widget {

    constructor(protected readonly _widget: T, tag: string = "div") {
        super(tag);
    }

    widget(): T {
        return this._widget;
    }

    enter(element: SelectionT<this>) {
        super.enter(element);
        this._widget.target(element);
    }

    update(element: SelectionT<this>) {
        super.update(element);
        this._widget.render();
    }

    exit(element: SelectionT<this>) {
        this._widget.target(null);
        super.exit(element);
    }
}
