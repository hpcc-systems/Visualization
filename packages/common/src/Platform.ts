import "es6-promise/auto";

const _version = "1.14.2-dev";
export function version() {
    return _version;
}

export const ieVersion = (function () {
    const ua = navigator.userAgent;
    let tem;
    const M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return parseFloat(tem[1]);
    }
    if (/msie/i.test(M[1])) {
        return parseFloat(M[2]);
    }
    return null;
})();

export const isIE = ieVersion !== null;
export const svgMarkerGlitch = isIE && ieVersion <= 12;

let _scrollBarWidth = null;
export function getScrollbarWidth() {
    if (_scrollBarWidth === null) {
        const outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar";

        document.body.appendChild(outer);

        const widthNoScroll = outer.offsetWidth;
        outer.style.overflow = "scroll";

        const inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        const widthWithScroll = inner.offsetWidth;

        outer.parentNode.removeChild(outer);

        _scrollBarWidth = widthNoScroll - widthWithScroll;
    }
    return _scrollBarWidth;
}

//  Polyfills  ---
(window as any).MutationObserver = (window as any).MutationObserver || (window as any).WebKitMutationObserver || (window as any).MozMutationObserver || function (callback) {
    //  Just enough for HTMLOverlay and C3  ---
    this.callback = callback;
    this.listeners = [];

    const MutationListener = function (callback2, domNode, type) {
        this.callback = callback2;
        this.domNode = domNode;
        this.type = type;
    };
    MutationListener.prototype = {
        // tslint:disable-next-line:object-literal-shorthand
        handleEvent: function (evt) {
            const mutation = {
                type: this.type,
                target: this.domNode,
                addedNodes: [],
                removedNodes: [],
                previousSibling: evt.target.previousSibling,
                nextSibling: evt.target.nextSibling,
                attributeName: null,
                attributeNamespace: null,
                oldValue: null
            };
            this.callback([mutation]);
        }
    };

    this.observe = function (domNode, config) {
        let listener = null;
        if (config.attributes) {
            listener = new MutationListener(this.callback, domNode, "attributes");
            this.listeners.push(listener);
            domNode.addEventListener("DOMAttrModified", listener, true);
        }

        if (config.characterData) {
            listener = new MutationListener(this.callback, domNode, "characterData");
            this.listeners.push(listener);
            domNode.addEventListener("DOMCharacterDataModified", listener, true);
        }

        if (config.childList) {
            listener = new MutationListener(this.callback, domNode, "childList");
            this.listeners.push(listener);
            domNode.addEventListener("DOMNodeInserted", listener, true);
            domNode.addEventListener("DOMNodeRemoved", listener, true);
        }
    };

    this.disconnect = function () {
        this.listeners.forEach(function (item) {
            switch (item.type) {
                case "attributes":
                    item.domNode.removeEventListener("DOMAttrModified", item, true);
                    break;
                case "characterData":
                    item.domNode.removeEventListener("DOMCharacterDataModified", item, true);
                    break;
                case "childList":
                    item.domNode.removeEventListener("DOMNodeRemoved", item, true);
                    item.domNode.removeEventListener("DOMNodeInserted", item, true);
                    break;
            }
        });
        this.listeners = [];
    };
};

(Math as any).sign = (Math as any).sign || function (x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
};
