/*
 * Build-time resolution of the `dojo/has!` loader extension.
 *
 * Uses the same tokenisation as dojo/has.js so that expressions behave identically,
 * but produces a tree so that conditionals on features which are undefined at build
 * time can be deferred to run time.
 */

export interface HasExprBranch {
    feature: string;
    then: HasExprNode;
    else: HasExprNode;
}

/** A module id, `null` for an empty branch, or a conditional. */
export type HasExprNode = string | null | HasExprBranch;

/** @param expr e.g. `foo?./a:./b` */
export function parseHasExpr(expr: string): HasExprNode {
    const tokens = expr.match(/[?:]|[^:?]*/g) || [];
    let i = 0;
    function get(): HasExprNode {
        const term = tokens[i++];
        if (term === ":") return null;
        if (tokens[i++] === "?") {
            const thenNode = get();
            const elseNode = get();
            return { feature: term, then: thenNode, else: elseNode };
        }
        return term || null;
    }
    return get();
}

/**
 * Collapses branches whose feature has a build-time value.
 * @returns the same node shape, with resolved branches inlined.
 */
export function reduceHasExpr(
    node: HasExprNode,
    features: Record<string, unknown>,
    coerceUndefinedToFalse?: boolean
): HasExprNode {
    if (node === null || typeof node === "string") return node;
    let value = features[node.feature];
    if (value === undefined && coerceUndefinedToFalse) value = false;
    if (value === undefined) {
        return {
            feature: node.feature,
            then: reduceHasExpr(node.then, features, coerceUndefinedToFalse),
            else: reduceHasExpr(node.else, features, coerceUndefinedToFalse)
        };
    }
    return reduceHasExpr(value ? node.then : node.else, features, coerceUndefinedToFalse);
}

/** All module ids referenced by a (reduced) expression tree. */
export function hasExprMids(node: HasExprNode): string[] {
    if (node === null) return [];
    if (typeof node === "string") return [node];
    return [...hasExprMids(node.then), ...hasExprMids(node.else)];
}

/** Canonical string form, used to build the absMid of a runtime-resolved has module. */
export function stringifyHasExpr(node: HasExprNode, mapMid: (mid: string) => string = m => m): string {
    if (node === null) return "";
    if (typeof node === "string") return mapMid(node);
    return `${node.feature}?${stringifyHasExpr(node.then, mapMid)}:${stringifyHasExpr(node.else, mapMid)}`;
}
