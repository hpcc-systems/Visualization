/**
 * @file Transition Object
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.common_Transition = factory();
    }
}(this, function () {
    /**
     * @class common_Transition
     */
    function Transition(widget) {
        this._widget = widget;
        this._duration = 250;
        this._delay = 0;
        this._ease = "cubic-in-out";
    }

    /**
     * TODO
     * Duration of the transition in seconds/miliseconds.
     * @method duration
     * @memberof common_Transition
     * @param {Number} _ Value for duration.
     * @private
     */
    Transition.prototype.duration = function (_) {
        if (!arguments.length) return this._duration;
        this._duration = _;
        return this._widget;
    };

    /**
     * TODO
     * @method  delay
     * @memberof common_Transition
     * @param {Number} _ Value for delay.
     * @private
     * @returns {Number|Widget}
     */
    Transition.prototype.delay = function (_) {
        if (!arguments.length) return this._delay;
        this._delay = _;
        return this._widget;
    };

    /**
     * TODO
     * @method ease
     * @memberof common_Transition
     * @param {String} _ Value for easing method to use.
     * @private
     * @returns {Number|Widget}
     */
    Transition.prototype.ease = function (_) {
        if (!arguments.length) return this._ease;
        this._ease = _;
        return this._widget;
    };

    /**
     * TODO
     * @method apply
     * @memberof common_Transition
     * @instance
     * @protected
     * @returns TODO
     *
     */
    Transition.prototype.apply = function (selection) {
        if (this._duration || this._delay) {
            return selection.transition()
                .duration(this._duration)
                .delay(this._delay)
                .ease(this._ease)
            ;
        }
        return selection;
    };

    return Transition;
}));
