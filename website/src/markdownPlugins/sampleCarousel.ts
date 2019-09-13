import { Carousel, ChartPanel } from "@hpcc-js/layout";
import { text } from "d3-fetch";
// @ts-ignore
import * as config from "https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/src-umd/config.js";
import { Sample } from "./sample.js";

const samplePath = "https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/";

export class SampleCarousel extends ChartPanel {

    _samples = [];
    _carousel = new Carousel();

    constructor() {
        super();
        this.visit(config.samples);
        this
            .legendButtonVisible(false)
            .dataButtonVisible(false)
            .downloadButtonVisible(false)
            .titleFontSize(16)
            .widget(this._carousel)
            ;
    }

    visit(item) {
        if (item.type === "folder") {
            item.children.forEach(item => this.visit(item));
        } else if (item.type === "file") {
            this._samples.push(samplePath + item.path);
        }
    }

    _idxPos = 999;
    _widgets = [];
    loadRandom() {
        const idx = Math.floor(this._samples.length * Math.random());
        text(this._samples[idx]).then(js => {
            if (++this._idxPos > 1) {
                this._idxPos = 0;
            }

            this._widgets[this._idxPos] = new Sample().data([["", js]]);
            this._carousel
                .widgets(this._widgets)
                .active(this._idxPos)
                ;

            this
                .title(this._samples[idx].substring((samplePath + "./samples/").length))
                .lazyRender()
                ;

            setTimeout(() => {
                this.loadRandom();
            }, 3000);
        });
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this.height(240);
        setTimeout(() => {
            this.loadRandom();
        }, 100);
    }
}
