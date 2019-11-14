import { HTMLWidget, SVGWidget } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";

export class TSXHTML extends HTMLWidget {

    snippet() {
        return <div>
            <h1 className="greeting">
                Hello, world!
            </h1>
            <h2>
                It is {new Date().toLocaleTimeString()}.
            </h2>
        </div>;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        setInterval(() => {
            this.render();
        }, 1000);

    }

    update(domNode, element) {
        super.update(domNode, element);
        React.render(this.snippet(), domNode);
    }
}

TSXHTML.prototype._class += " html_TSXHTML";

export class TSXSVG extends SVGWidget {

    snippet() {
        return <circle cx="0" cy="0" r="50" />;
    }

    update(domNode, element) {
        super.update(domNode, element);
        React.render(this.snippet(), domNode);
    }
}

TSXSVG.prototype._class += " html_TSXSVG";

