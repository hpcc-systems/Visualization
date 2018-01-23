import { SVGWidget } from "./SVGWidget";
import { Text } from "./Text";

import "font-awesome/css/font-awesome.css";
import "../src/FAChar.css";

export class FAChar extends SVGWidget {

    protected _text;

    constructor() {
        super();

        this._text = new Text()
            .fontFamily("FontAwesome")
            ;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._text
            .target(domNode)
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._text
            .text(this.char())
            .scale((this.fontSize() || 14) / 14) //  Scale rather than fontSize to prevent Chrome glitch  ---
            .render()
            ;
    }

    exit(domNode, element) {
        this._text
            .target(null)
            ;

        super.exit(domNode, element);
    }

    text_colorFill: { (): string; (_: string): FAChar; };
}
FAChar.prototype._class += " common_FAChar";

FAChar.prototype.publishProxy("text_colorFill", "_text", "colorFill");

export interface FAChar {
    char(): string;
    char(_: string): this;
    fachar(): string;
    fachar(_: string): this;
    fontSize(): number;
    fontSize(_: number): this;
}
FAChar.prototype.publish("char", "", "string", "Font Awesome Item", null, { tags: ["Private"] });
FAChar.prototype.publish("fachar", "", "string", "Font Awesome Item", null, { tags: ["Private"] });
FAChar.prototype.publish("fontSize", null, "number", "Font Size", null, { tags: ["Private"] });
