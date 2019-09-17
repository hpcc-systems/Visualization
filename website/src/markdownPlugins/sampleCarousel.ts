import { Button } from "@hpcc-js/common";
import { Carousel, ChartPanel } from "@hpcc-js/layout";
import { text } from "d3-fetch";
// @ts-ignore
import * as config from "https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/src-umd/config.js";
import { Sample } from "./sample.js";

const samplePath = "https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/";

export class SampleCarousel extends ChartPanel {

    _samples = [];
    _sampleWidgets = [];
    _sampleCarousel = new Carousel();

    _prevButton = new Button()
        .faChar("fa-step-backward")
        .on("click", () => {
            this.decIdx();
            this.renderSample();
        });
    _playPauseButton = new Button()
        .faChar("fa-pause")
        .on("click", () => {
            this._playPauseButton.faChar(this.isPaused() ? "fa-pause" : "fa-play").lazyRender();
        });
    _nextButton = new Button()
        .faChar("fa-step-forward")
        .on("click", () => {
            this.incIdx();
            this.renderSample();
        });

    constructor() {
        super();
        this.visit(config.samples);
        this.shuffle();
        this._sampleWidgets = [];
        this._sampleCarousel.widgets(this._sampleWidgets);

        this
            .buttons([this._prevButton, this._playPauseButton, this._nextButton])
            .titleFontSize(16)
            .widget(this._sampleCarousel)
            ;
    }

    isPaused() {
        return this._playPauseButton.faChar() === "fa-play";
    }

    shuffle() {
        for (let i = this._samples.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this._samples[i], this._samples[j]] = [this._samples[j], this._samples[i]];
        }
    }

    visit(item) {
        if (item.type === "folder") {
            item.children.forEach(item => this.visit(item));
        } else if (item.type === "file") {
            this._samples.push(samplePath + item.path);
        }
    }

    renderSample() {
        let retVal;
        if (this._sampleWidgets[this._idx]) {
            this._sampleCarousel
                .active(this._idx)
                ;
            retVal = Promise.resolve();
        } else {
            retVal = text(this._samples[this._idx]).then(js => {
                this._sampleWidgets[this._idx] = new Sample().data([["", js]]);
                this._sampleCarousel
                    .widgets(this._sampleWidgets)
                    .active(this._idx)
                    ;
            });
        }
        return retVal.then(() => {
            this
                .title(this._samples[this._idx].substring((samplePath + "./samples/").length))
                .lazyRender()
                ;
        });
    }

    _idx = -1;
    incIdx(wrap = false) {
        if (++this._idx >= this._samples.length) {
            this._idx = wrap ? 0 : this._samples.length - 1;
        }
        this._prevButton.enabled(this._idx !== 0).lazyRender();
        this._nextButton.enabled(this._idx !== this._samples.length - 1).lazyRender();
    }

    decIdx() {
        if (--this._idx < 0) {
            this._idx = 0;
        }
        this._prevButton.enabled(this._idx !== 0).lazyRender();
        this._nextButton.enabled(this._idx !== this._samples.length - 1).lazyRender();
    }

    loadRandom(): Promise<void> {
        if (!this.isPaused()) {
            this.incIdx(true);
            return this.renderSample().then(() => {
                setTimeout(() => {
                    this.loadRandom();
                }, 3000);
            });
        } else {
            setTimeout(() => {
                this.loadRandom();
            }, 3000);
        }
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this.height(240);
        this.scale(0.5);
        setTimeout(() => {
            this.loadRandom();
        }, 1000);
    }
}
