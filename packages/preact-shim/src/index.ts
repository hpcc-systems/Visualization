export * from "./__package__.ts";
export { createElement, Component, Fragment, h, render } from "preact";
export { unmountComponentAtNode } from "preact/compat";
export type { FunctionComponent } from "preact";
export { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useState } from "preact/hooks";

/*
 * A Preact 11+ implementation of the `replaceNode` parameter from Preact 10.
 *
 * This creates a "Persistent Fragment" (a fake DOM element) containing one or more
 * DOM nodes, which can then be passed as the `parent` argument to Preact's `render()` method.

export function createRootFragment(parent, replaceNode) {
    replaceNode = [].concat(replaceNode);
    var s = replaceNode[replaceNode.length - 1].nextSibling;
    function insert(c, r) { parent.insertBefore(c, r || s); }
    return parent.__k = {
        nodeType: 1,
        parentNode: parent,
        firstChild: replaceNode[0],
        childNodes: replaceNode,
        insertBefore: insert,
        appendChild: insert,
        contains: function (c) { return parent.contains(c); },
        removeChild: function (c) { parent.removeChild(c); }
    };
}
*/