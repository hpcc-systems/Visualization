export class Transition {

    protected _widget;
    protected _duration;
    protected _delay;
    protected _ease;

    constructor(widget) {
        this._widget = widget;
        this._duration = 250;
        this._delay = 0;
        this._ease = "cubic-in-out";
    }

    duration(_) {
        if (!arguments.length) return this._duration;
        this._duration = _;
        return this._widget;
    };

    delay(_) {
        if (!arguments.length) return this._delay;
        this._delay = _;
        return this._widget;
    };

    ease(_) {
        if (!arguments.length) return this._ease;
        this._ease = _;
        return this._widget;
    };

    apply(selection) {
        if (this._duration || this._delay) {
            return selection.transition()
                .duration(this._duration)
                .delay(this._delay)
                .ease(this._ease)
                ;
        }
        return selection;
    };
}
