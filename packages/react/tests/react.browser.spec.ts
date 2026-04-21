import * as react from "@hpcc-js/react";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { Circle, Square, Rectangle, Shape, TextLine, Text, TextBox, LabelledRect, IconLabelledRect, Span, Vertex, Icon, Icons, Image, ImageChar, Annotations, Vertex2, Vertex3, Vertex4, Subgraph, Edge } from "@hpcc-js/react";
import { HTMLAdapter, SVGAdapter } from "@hpcc-js/react";
import { describe, it, expect } from "vitest";
import { classDef, renderMedium } from "../../common/tests/index.ts";

const urlSearch: string = "";

describe("@hpcc-js/react", () => {
    for (const key in react) {
        const item = (react as any)[key];
        if (item && item.prototype && item.prototype.constructor) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype?.constructor?.name}`, () => {
                    it("Simple", () => {
                        expect(true).to.be.true;
                    });
                    if (item.prototype instanceof Class) {
                        classDef("react", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case HTMLAdapter:
                                renderMedium(new item.prototype.constructor(Span).prop("text", "Hello World"));
                                break;
                            case SVGAdapter:
                                renderMedium(new item.prototype.constructor(TextLine).prop("text", "Hello World"));
                                break;

                            default:
                                it("Has render test", () => {
                                    expect(false).to.be.true;
                                });
                        }
                    }
                });
            }
        }
    }

    describe("React Components - SVG Adapter", async () => {
        describe("edge.tsx", () => {
            renderMedium(
                new SVGAdapter(Edge)
                    .prop("source", { id: "1", text: "Hello" })
                    .prop("target", { id: "2", text: "World" })
            );
        });

        describe("icon.tsx", () => {
            renderMedium(new SVGAdapter(Icon).prop("imageChar", "H"));
            renderMedium(new SVGAdapter(Icons).prop("icons", [{ id: "h", imageChar: "H" }, { id: "q", imageChar: "Q" }]));
        });

        describe("image.tsx", () => {
            renderMedium(new SVGAdapter(Image).prop("href", "https://hpccsystems.com/wp-content/themes/hpcc/dist/images/logos/logo-color.svg?ver=2"));
        });

        describe("imageChar.tsx", () => {
            renderMedium(new SVGAdapter(ImageChar));
        });

        describe("shape.tsx", () => {
            renderMedium(new SVGAdapter(Circle));
            renderMedium(new SVGAdapter(Square));
            renderMedium(new SVGAdapter(Rectangle));
            renderMedium(new SVGAdapter(Shape));
        });

        describe("subgraph.tsx", () => {
            renderMedium(new SVGAdapter(Subgraph).prop("id", "1").prop("text", "Hello World"));
        });

        describe("vertex(s).tsx", () => {
            renderMedium(new SVGAdapter(Annotations).prop("annotationIDs", ["h", "q"]));
            renderMedium(
                new SVGAdapter(Vertex)
                    .prop("id", "1")
                    .prop("text", "Hello World")
            );
            renderMedium(
                new SVGAdapter(Vertex2)
                    .prop("id", "1")
                    .prop("text", "Hello World")
            );
            renderMedium(
                new SVGAdapter(Vertex3)
                    .prop("id", "1")
                    .prop("text", "Hello World")
            );
            renderMedium(
                new SVGAdapter(Vertex4)
                    .prop("id", "1")
                    .prop("text", "Hello World")
            );

        });

        describe("text.tsx", () => {
            renderMedium(new SVGAdapter(TextLine).prop("text", "Hello World"));
            renderMedium(new SVGAdapter(Text).prop("text", "Hello World"));
            renderMedium(new SVGAdapter(TextBox).prop("text", "Hello World"));
            renderMedium(new SVGAdapter(LabelledRect).prop("text", "Hello World"));
            renderMedium(
                new SVGAdapter(IconLabelledRect)
                    .prop("text", "Hello World")
                    .prop("icon", "H")
            );
        });

    });

});

