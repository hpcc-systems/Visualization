import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { describe, it, expect } from "vitest";

import "./coreTest.css";

export function classDef<T extends Class>(module: string, WidgetClass: { new(): T }) {
    describe("#constructor()", function () {
        it("new", function () {
            const widget = new WidgetClass();
            expect(widget).to.be.an.instanceof(WidgetClass);
        });
        it("classID", function () {
            let constructorName = WidgetClass.prototype.constructor.name.split("$")[0];   //  Webpack mangled name.
            //  Remove any leading "_"s
            while (constructorName.length && constructorName[0] === "_") {
                constructorName = constructorName.substr(1);
            }
            const widget = new WidgetClass();
            const classID = widget.classID();
            if (classID.indexOf(".") >= 0) {
                expect(classID.indexOf(`${module}_`), `Incorrect module: ${module}`).to.equal(0);
                expect(classID.indexOf(`.${constructorName}`), `Incorrect constructorName:  ${constructorName}`).to.equal(classID.length - constructorName.length - 1);
            } else {
                expect(`${module}_${constructorName}` === classID, `Incorrect classID: ${module}_${constructorName} === ${classID}`).to.be.true;
            }
        });
    });
}

function createPlaceholder<T extends HTMLWidget | SVGWidget>(widget: T, title: string, width: number = 640, height: number = 480, scale: number = 0.5) {
    const div = document.createElement("DIV");
    div.setAttribute("id", widget.classID());
    div.setAttribute("class", `${widget.classID()} widgetTest`);
    div.setAttribute("title", title);
    div.style.width = `${width * scale}px`;
    div.style.height = `${height * scale}px`;
    div.style.transform = `scale(${scale}) `;
    const placeholder: any = document.createElement("DIV");
    placeholder.setAttribute("class", "placeholder");
    placeholder.style.width = `${width}px`;
    placeholder.style.height = `${height}px`;
    div.appendChild(placeholder);
    document.body.appendChild(div);
    placeholder["__destroy"] = function () {
        div.parentNode!.removeChild(div);
    };
    return placeholder;
}

function doRender<T extends HTMLWidget | SVGWidget>(widget: T, width: number = 640, height: number = 480, scale: number = 0.5) {
    scale = 1;
    describe("#render()", function () {
        let origPlaceholder: any;

        it("Basic render", () => {
            return new Promise<void>((done) => {
                origPlaceholder = createPlaceholder(widget, `${widget.classID()}`, width, height, scale);
                widget.target(origPlaceholder);
                widget.render(() => {
                    done();
                });
            });
        });

        it("exit, enter, render", function (done) {
            return new Promise<void>((done) => {
                const placeholder = createPlaceholder(widget, `Relocate:  ${widget.classID()}`, width, height, scale);
                widget.target(null);
                widget.target(placeholder);
                widget.render(() => {
                    origPlaceholder.__destroy();
                    done();
                });
            });
        });
    });
}

export function render<T extends HTMLWidget | SVGWidget>(widget: T, width: number = 640, height: number = 480, scale: number = 0.5) {
    doRender(widget, width, height, scale);
}

export function renderIcon<T extends HTMLWidget | SVGWidget>(widget: T) {
    doRender(widget, 64, 64, 1);
}

export function renderSmall<T extends HTMLWidget | SVGWidget>(widget: T) {
    doRender(widget, 128, 128, 1);
}

export function renderMedium<T extends HTMLWidget | SVGWidget>(widget: T) {
    doRender(widget, 240, 240, 1);
}

export function renderShort<T extends HTMLWidget | SVGWidget>(widget: T) {
    doRender(widget, 240, 64, 1);
}

export function renderWide<T extends HTMLWidget | SVGWidget>(widget: T) {
    doRender(widget, 640, 240, 1);
}
