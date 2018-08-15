//  Based on  https://github.com/GordonSmith/d3-tip forked from https://github.com/Caged/d3-tip

import { map } from "d3-collection";
import { select, selection } from "d3-selection";

export function tip() {
    let direction = d3TipDirection;
    let offset = d3TipOffset;
    let html = d3TipHTML;
    let rootElement = functor(document.body);
    let node = initNode();
    let svg = null;
    let point = null;
    let target = null;

    const tip: any = function (vis) {
        svg = getSVGNode(vis);
        if (!svg) return;
        point = svg.createSVGPoint();
        rootElement().appendChild(node);
    };

    // Public - show the tooltip on the screen
    //
    // Returns a tip
    tip.show = function (d, idx, arr) {
        target = arr[idx];

        const args = Array.prototype.slice.call(arguments);
        const content = html.apply(this, args);
        const poffset = offset.apply(this, args);
        const dir = direction.apply(this, args);
        const nodel = getNodeEl();
        let i = directions.length;
        let coords;
        const scrollTop = document.documentElement.scrollTop ||
            rootElement().scrollTop;
        const scrollLeft = document.documentElement.scrollLeft ||
            rootElement().scrollLeft;

        nodel.html(content)
            .style("opacity", 1).style("pointer-events", "all");

        while (i--) nodel.classed(directions[i], false);
        coords = directionCallbacks.get(dir).apply(this);
        nodel.classed(dir, true)
            .style("top", (coords.top + poffset[0]) + scrollTop + "px")
            .style("left", (coords.left + poffset[1]) + scrollLeft + "px");

        return tip;
    };

    // Public - hide the tooltip
    //
    // Returns a tip
    tip.hide = function () {
        const nodel = getNodeEl();
        nodel.style("opacity", 0).style("pointer-events", "none");
        return tip;
    };

    // Public: Proxy attr calls to the d3 tip container.
    // Sets or gets attribute value.
    //
    // n - name of the attribute
    // v - value of the attribute
    //
    // Returns tip or attribute value
    // eslint-disable-next-line no-unused-vars
    tip.attr = function (n, v) {
        if (arguments.length < 2 && typeof n === "string") {
            return getNodeEl().attr(n);
        }

        const args = Array.prototype.slice.call(arguments);
        selection.prototype.attr.apply(getNodeEl(), args);
        return tip;
    };

    // Public: Proxy style calls to the d3 tip container.
    // Sets or gets a style value.
    //
    // n - name of the property
    // v - value of the property
    //
    // Returns tip or style property value
    // eslint-disable-next-line no-unused-vars
    tip.style = function (n, v) {
        if (arguments.length < 2 && typeof n === "string") {
            return getNodeEl().style(n);
        }

        const args = Array.prototype.slice.call(arguments);
        selection.prototype.style.apply(getNodeEl(), args);
        return tip;
    };

    // Public: Set or get the direction of the tooltip
    //
    // v - One of n(north), s(south), e(east), or w(west), nw(northwest),
    //     sw(southwest), ne(northeast) or se(southeast)
    //
    // Returns tip or direction
    tip.direction = function (v) {
        if (!arguments.length) return direction;
        direction = v == null ? v : functor(v);

        return tip;
    };

    // Public: Sets or gets the offset of the tip
    //
    // v - Array of [x, y] offset
    //
    // Returns offset or
    tip.offset = function (v) {
        if (!arguments.length) return offset;
        offset = v == null ? v : functor(v);

        return tip;
    };

    // Public: sets or gets the html value of the tooltip
    //
    // v - String value of the tip
    //
    // Returns html value or tip
    tip.html = function (v) {
        if (!arguments.length) return html;
        html = v == null ? v : functor(v);

        return tip;
    };

    // Public: sets or gets the root element anchor of the tooltip
    //
    // v - root element of the tooltip
    //
    // Returns root node of tip
    tip.rootElement = function (v) {
        if (!arguments.length) return rootElement;
        rootElement = v == null ? v : functor(v);

        return tip;
    };

    // Public: destroys the tooltip and removes it from the DOM
    //
    // Returns a tip
    tip.destroy = function () {
        if (node) {
            getNodeEl().remove();
            node = null;
        }
        return tip;
    };

    function d3TipDirection() { return "n"; }
    function d3TipOffset() { return [0, 0]; }
    function d3TipHTML() { return " "; }

    const directionCallbacks = map({
        n: directionNorth,
        s: directionSouth,
        e: directionEast,
        w: directionWest,
        nw: directionNorthWest,
        ne: directionNorthEast,
        sw: directionSouthWest,
        se: directionSouthEast
    });
    const directions = directionCallbacks.keys();

    function directionNorth() {
        const bbox = getScreenBBox(window);
        return {
            top: bbox.n.y - node.offsetHeight,
            left: bbox.n.x - node.offsetWidth / 2
        };
    }

    function directionSouth() {
        const bbox = getScreenBBox(window);
        return {
            top: bbox.s.y,
            left: bbox.s.x - node.offsetWidth / 2
        };
    }

    function directionEast() {
        const bbox = getScreenBBox(window);
        return {
            top: bbox.e.y - node.offsetHeight / 2,
            left: bbox.e.x
        };
    }

    function directionWest() {
        const bbox = getScreenBBox(window);
        return {
            top: bbox.w.y - node.offsetHeight / 2,
            left: bbox.w.x - node.offsetWidth
        };
    }

    function directionNorthWest() {
        const bbox = getScreenBBox(window);
        return {
            top: bbox.nw.y - node.offsetHeight,
            left: bbox.nw.x - node.offsetWidth
        };
    }

    function directionNorthEast() {
        const bbox = getScreenBBox(window);
        return {
            top: bbox.ne.y - node.offsetHeight,
            left: bbox.ne.x
        };
    }

    function directionSouthWest() {
        const bbox = getScreenBBox(window);
        return {
            top: bbox.sw.y,
            left: bbox.sw.x - node.offsetWidth
        };
    }

    function directionSouthEast() {
        const bbox = getScreenBBox(window);
        return {
            top: bbox.se.y,
            left: bbox.se.x
        };
    }

    function initNode() {
        const div = select(document.createElement("div"));
        div
            .style("position", "absolute")
            .style("top", 0)
            .style("opacity", 0)
            .style("pointer-events", "none")
            .style("box-sizing", "border-box");

        return div.node();
    }

    function getSVGNode(element) {
        const svgNode = element.node();
        if (!svgNode) return null;
        if (svgNode.tagName.toLowerCase() === "svg") return svgNode;
        return svgNode.ownerSVGElement;
    }

    function getNodeEl() {
        if (node == null) {
            node = initNode();
            // re-add node to DOM
            rootElement.appendChild(node);
        }
        return select(node);
    }

    // Private - gets the screen coordinates of a shape
    //
    // Given a shape on the screen, will return an SVGPoint for the directions
    // n(north), s(south), e(east), w(west), ne(northeast), se(southeast),
    // nw(northwest), sw(southwest).
    //
    //    +-+-+
    //    |   |
    //    +   +
    //    |   |
    //    +-+-+
    //
    // Returns an Object {n, s, e, w, nw, sw, ne, se}
    function getScreenBBox(targetShape) {
        let targetel = target || targetShape;

        while (targetel.getCTM == null && targetel.parentNode != null) {
            targetel = targetel.parentNode;
        }

        const bbox: any = {};
        const matrix = targetel.getCTM();
        const tbbox = targetel.getBBox();
        const width = tbbox.width;
        const height = tbbox.height;
        const x = tbbox.x;
        const y = tbbox.y;

        point.x = x;
        point.y = y;
        bbox.nw = point.matrixTransform(matrix);
        point.x += width;
        bbox.ne = point.matrixTransform(matrix);
        point.y += height;
        bbox.se = point.matrixTransform(matrix);
        point.x -= width;
        bbox.sw = point.matrixTransform(matrix);
        point.y -= height / 2;
        bbox.w = point.matrixTransform(matrix);
        point.x += width;
        bbox.e = point.matrixTransform(matrix);
        point.x -= width / 2;
        point.y -= height / 2;
        bbox.n = point.matrixTransform(matrix);
        point.y += height;
        bbox.s = point.matrixTransform(matrix);

        return bbox;
    }

    // Private - replace D3JS 3.X d3.functor() function
    function functor(v) {
        return typeof v === "function" ? v : function () {
            return v;
        };
    }

    return tip;
}
