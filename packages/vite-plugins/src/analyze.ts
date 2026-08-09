/*
 * Static analysis of AMD modules: finds `define` dependencies, asynchronous
 * `require([...])` dependencies and CommonJS `require("...")` calls.
 *
 * Dojo (and dojo-webpack-plugin) distinguish the *global* require from a
 * *context* require obtained by listing "require" as a dependency. They resolve
 * relative module ids differently, so the two are reported separately here.
 */
import { walk as walkAst } from "estree-walker";

/** The loose ESTree shape Rollup produces, which adds `start`/`end` offsets. */
export interface AstNode {
    type: string;
    start: number;
    end: number;
    [property: string]: any;
}

function walk(ast: AstNode, handlers: { enter?(node: AstNode): void; leave?(node: AstNode): void }): void {
    walkAst(ast as never, handlers as never);
}

export interface StaticValue {
    value: any;
}

/**
 * Folds the constant expressions Dojo code commonly uses to build dependency
 * arrays, e.g. `["a", "b"]`, `"a,b".split(",")` and `"pkg/" + "mod"`.
 * Returns `{ value }` or `undefined` when the expression is not static.
 */
export function evalStatic(node: AstNode | null | undefined): StaticValue | undefined {
    if (!node) return undefined;
    switch (node.type) {
        case "Literal":
            return { value: node.value };
        case "TemplateLiteral":
            return node.expressions.length === 0
                ? { value: node.quasis.map((q: AstNode) => q.value.cooked).join("") }
                : undefined;
        case "ArrayExpression": {
            const values: any[] = [];
            for (const el of node.elements as Array<AstNode | null>) {
                const r = evalStatic(el);
                if (!r) return undefined;
                values.push(r.value);
            }
            return { value: values };
        }
        case "BinaryExpression": {
            if (node.operator !== "+") return undefined;
            const l = evalStatic(node.left);
            const r = evalStatic(node.right);
            return l && r ? { value: l.value + r.value } : undefined;
        }
        case "CallExpression": {
            const callee = node.callee as AstNode;
            if (
                callee.type === "MemberExpression" &&
                !callee.computed &&
                callee.property.type === "Identifier" &&
                callee.property.name === "split"
            ) {
                const target = evalStatic(callee.object);
                const sep = node.arguments.length ? evalStatic(node.arguments[0]) : { value: undefined };
                if (target && typeof target.value === "string" && sep) {
                    return { value: target.value.split(sep.value) };
                }
            }
            return undefined;
        }
        default:
            return undefined;
    }
}

function stringsOf(result: StaticValue | undefined): string[] | undefined {
    if (!result) return undefined;
    const value = Array.isArray(result.value) ? result.value : [result.value];
    return value.every((v: unknown) => typeof v === "string") ? value : undefined;
}

/**
 * Module ids that can be determined statically. Arrays that mix literals with
 * runtime expressions still contribute their literal elements, matching
 * dojo-webpack-plugin's handling of `require([someVar, "pkg/mod"], ...)`.
 */
function knownMids(node: AstNode | null | undefined): string[] {
    const whole = stringsOf(evalStatic(node));
    if (whole) return whole;
    const mids: string[] = [];
    if (node && node.type === "ArrayExpression") {
        for (const el of node.elements as Array<AstNode | null>) {
            const strings = stringsOf(evalStatic(el));
            if (strings) mids.push(...strings);
        }
    }
    return mids;
}

const PSEUDO = new Set(["require", "module", "exports"]);
const FUNCTION_TYPES = new Set(["FunctionExpression", "FunctionDeclaration", "ArrowFunctionExpression"]);

interface CallArgs {
    depsArg?: AstNode;
    factory?: AstNode;
}

/** Splits `define(id?, deps?, factory)` / `require(deps, factory)` arguments. */
function splitCallArgs(node: AstNode, isDefine: boolean): CallArgs {
    const args = node.arguments as AstNode[];
    if (!args.length) return {};
    let i = 0;
    if (isDefine && args[0].type === "Literal" && typeof args[0].value === "string" && args.length > 1) i = 1;
    const first = args[i];
    if (isDefine && FUNCTION_TYPES.has(first.type)) return { depsArg: undefined, factory: first };
    return { depsArg: first, factory: args[i + 1] };
}

export interface AmdInfo {
    isAmd: boolean;
    contextDeps: string[];
    contextAsyncDeps: string[];
    globalAsyncDeps: string[];
    cjsDeps: string[];
}

export function analyze(ast: AstNode): AmdInfo {
    let firstDefine = Infinity;

    // Factory functions that receive a context require -> the name of that parameter.
    const contextRequireParams = new Map<AstNode, string>();

    walk(ast, {
        enter(node) {
            if (node.type !== "CallExpression" || node.callee.type !== "Identifier") return;
            const isDefine = node.callee.name === "define";
            if (isDefine) firstDefine = Math.min(firstDefine, node.start);
            if (!isDefine && node.callee.name !== "require") return;
            const { depsArg, factory } = splitCallArgs(node, isDefine);
            const mids = stringsOf(evalStatic(depsArg));
            if (!mids || !factory || !FUNCTION_TYPES.has(factory.type)) return;
            const idx = mids.indexOf("require");
            const param = idx >= 0 ? (factory.params[idx] as AstNode | undefined) : undefined;
            if (param && param.type === "Identifier") {
                contextRequireParams.set(factory, param.name);
            }
        }
    });

    const contextDeps = new Set<string>();
    const contextAsync = new Set<string>();
    const globalAsync = new Set<string>();
    const cjsDeps = new Set<string>();

    /** Identifier names currently bound to a context require. */
    const contextNames: string[] = [];
    /** Functions that shadow `require` with something other than a context require. */
    const shadowing: AstNode[] = [];

    walk(ast, {
        enter(node) {
            if (FUNCTION_TYPES.has(node.type)) {
                const name = contextRequireParams.get(node);
                if (name) contextNames.push(name);
                else if (node.params.some((p: AstNode) => p.type === "Identifier" && p.name === "require")) {
                    shadowing.push(node);
                }
            }
            if (node.type !== "CallExpression" || node.callee.type !== "Identifier") return;

            const name = node.callee.name as string;
            const isDefine = name === "define";
            const isContext = contextNames.includes(name);
            const isGlobal = name === "require" && !shadowing.length && !isContext;
            if (!isDefine && !isContext && !isGlobal && name !== "cjsRequire") return;

            const { depsArg } = splitCallArgs(node, isDefine);
            const value = evalStatic(depsArg);

            if (isDefine) {
                knownMids(depsArg).forEach(mid => contextDeps.add(mid));
                return;
            }
            const isArray = depsArg && (depsArg.type === "ArrayExpression" || (value && Array.isArray(value.value)));
            if (isArray) {
                const target = isContext ? contextAsync : globalAsync;
                knownMids(depsArg).forEach(mid => target.add(mid));
            } else if (value && typeof value.value === "string") {
                // A synchronous require before the first define (or `cjsRequire`) is CommonJS.
                if (name === "cjsRequire" || node.start < firstDefine) cjsDeps.add(value.value);
            }
        },
        leave(node) {
            if (!FUNCTION_TYPES.has(node.type)) return;
            if (contextRequireParams.has(node)) contextNames.pop();
            else if (shadowing[shadowing.length - 1] === node) shadowing.pop();
        }
    });

    const clean = (set: Set<string>) => [...set].filter(mid => !PSEUDO.has(mid) && !cjsDeps.has(mid));
    return {
        isAmd: firstDefine !== Infinity,
        contextDeps: clean(contextDeps),
        contextAsyncDeps: clean(contextAsync).filter(mid => !contextDeps.has(mid)),
        globalAsyncDeps: clean(globalAsync),
        cjsDeps: [...cjsDeps]
    };
}
