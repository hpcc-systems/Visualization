import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { expect } from "chai";

import "../src/coreTest.css";

export function classDef<T extends Class>(module: string, WidgetClass: { new(): T }) {
    describe("#constructor()", function () {
        it("new", function () {
            const widget = new WidgetClass();
            expect(widget).to.be.an.instanceof(WidgetClass);
        });
        it("classID", function () {
            const widget = new WidgetClass();
            const classID = widget.classID();
            const constructorName = WidgetClass.prototype.constructor.name.split("$")[0];   //  Webpack mangled name.
            if (classID.indexOf(".") >= 0) {
                expect(classID.indexOf(`${module}_`)).to.equal(0);
                expect(classID.indexOf(`.${constructorName}`)).to.equal(classID.length - constructorName.length - 1);
            } else {
                expect(classID).to.equal(`${module}_${constructorName}`);
            }
        });
    });
}

export function render<T extends HTMLWidget | SVGWidget>(widget: T, width: number = 640, height: number = 480, scale: number = 0.5) {
    scale = 1;
    describe("#render()", function () {
        it("Basic render", function (done) {
            const div = document.createElement("DIV");
            div.setAttribute("id", widget.classID());
            div.setAttribute("class", `${widget.classID()} widgetTest`);
            div.setAttribute("title", `${widget.classID()}`);
            div.style.width = `${width * scale}px`;
            div.style.height = `${height * scale}px`;
            div.style.transform = `scale(${scale}) `;
            const placeholder = document.createElement("DIV");
            placeholder.setAttribute("class", "placeholder");
            placeholder.style.width = `${width}px`;
            placeholder.style.height = `${height}px`;
            div.appendChild(placeholder);
            document.body.appendChild(div);
            widget
                .target(placeholder)
                .render(() => { done(); })
                ;
        });
    });
}

export function renderIcon<T extends HTMLWidget | SVGWidget>(widget: T) {
    render(widget, 64, 64, 1);
}

export function renderSmall<T extends HTMLWidget | SVGWidget>(widget: T) {
    render(widget, 128, 128, 1);
}

export function renderMedium<T extends HTMLWidget | SVGWidget>(widget: T) {
    render(widget, 240, 240, 1);
}

export function renderShort<T extends HTMLWidget | SVGWidget>(widget: T) {
    render(widget, 240, 64, 1);
}

export function renderWide<T extends HTMLWidget | SVGWidget>(widget: T) {
    render(widget, 640, 240, 1);
}
