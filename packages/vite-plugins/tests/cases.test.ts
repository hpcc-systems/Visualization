/*
 * Test harness for the cases ported from dojo-webpack-plugin's test/TestCases.
 *
 * Every directory under TestCases/<category>/<name> holds a `vite.config.js` exporting one or
 * more configs. Each is built with Vite and the resulting ES bundle is imported, so the
 * `it(...)` calls the bundle makes become the assertions for that case.
 *
 * The cases were written against mocha: they declare tests through a global `it`. Vitest's API
 * is imported explicitly so the global `it` stays free for the fixtures while `expect(...)`
 * is exposed on `globalThis` for the imported bundles.
 *
 *   npm test                             every case
 *   DOJO_TEST_FILTER=loaders npm test    only cases whose name contains "loaders"
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";
import { afterAll, describe, expect, it } from "vitest";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CASES_ROOT = path.join(HERE, "TestCases");
const OUT_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "vite-plugins-tests-"));
const filter = process.env.DOJO_TEST_FILTER;
const only = process.env.DOJO_TEST_ONLY;
const configCache = new Map<string, any>();

(globalThis as any).expect = expect;
(globalThis as any).window = globalThis;
// Vite's preload helper reports failures through the DOM.
(globalThis as any).dispatchEvent = () => true;
(globalThis as any).addEventListener = () => { };

type DoneFn = (err?: unknown) => void;
type FixtureTest = (done?: DoneFn) => unknown;

interface Declared {
    title: string;
    fn: FixtureTest;
}

interface Case {
    name: string;
    /** Declared while the bundle was imported, so Vitest can collect them individually. */
    tests: Declared[];
    /** Declared later, from a chunk a running test pulled in. */
    late: Declared[];
    error?: unknown;
}

/** The case being collected, or the one whose tests are running. */
let current: Case | undefined;
let collecting = true;
let prefix = "";

class ShouldAssertion {
    constructor(private readonly actual: unknown, private readonly negate = false) { }

    private pass(condition: boolean, message: string): void {
        if (this.negate ? condition : !condition) {
            throw new Error(message);
        }
    }

    private assertEqual(expected: unknown): void {
        if (this.negate) expect(this.actual).not.toEqual(expected);
        else expect(this.actual).toEqual(expected);
    }

    get not(): ShouldAssertion {
        return new ShouldAssertion(this.actual, !this.negate);
    }

    get be(): ShouldAssertion {
        return this;
    }

    get have(): ShouldAssertion {
        return this;
    }

    get and(): ShouldAssertion {
        return this;
    }

    get a(): ShouldAssertion {
        return this;
    }

    get an(): ShouldAssertion {
        return this;
    }

    get ok(): () => void {
        const assert = () => this.pass(!!this.actual, "Expected value to be truthy");
        assert();
        return assert;
    }

    get true(): () => void {
        const assert = () => this.pass(this.actual === true, "Expected value to be true");
        assert();
        return assert;
    }

    get false(): () => void {
        const assert = () => this.pass(this.actual === false, "Expected value to be false");
        assert();
        return assert;
    }

    get defined(): () => void {
        const assert = () => this.pass(this.actual !== undefined, "Expected value to be defined");
        assert();
        return assert;
    }

    get String(): ShouldAssertion {
        this.pass(typeof this.actual === "string", "Expected value to be a string");
        return this;
    }

    get Function(): ShouldAssertion {
        this.pass(typeof this.actual === "function", "Expected value to be a function");
        return this;
    }

    get Array(): ShouldAssertion {
        this.pass(Array.isArray(this.actual), "Expected value to be an array");
        return this;
    }

    get Object(): ShouldAssertion {
        this.pass(!!this.actual && typeof this.actual === "object" && !Array.isArray(this.actual), "Expected value to be an object");
        return this;
    }

    eql(expected: unknown): void {
        this.assertEqual(expected);
    }

    equal(expected: unknown): void {
        this.assertEqual(expected);
    }

    containEql(expected: unknown): void {
        if (Array.isArray(this.actual)) {
            const contains = this.actual.some(item => Object.is(item, expected) || JSON.stringify(item) === JSON.stringify(expected));
            this.pass(contains, "Expected array to contain value");
            return;
        }
        if (typeof this.actual === "string") {
            this.pass(this.actual.includes(String(expected)), "Expected string to contain value");
            return;
        }
        this.pass(false, "Expected value to support containEql");
    }

    property(name: string, expected?: unknown): ShouldAssertion {
        const target = this.actual as Record<string, unknown>;
        this.pass(!!target && Object.prototype.hasOwnProperty.call(target, name), `Expected property ${name}`);
        if (arguments.length > 1) {
            if (this.negate) expect(target[name]).not.toEqual(expected);
            else expect(target[name]).toEqual(expected);
        }
        return this;
    }
}

(globalThis as any).should = (value: unknown) => new ShouldAssertion(value);

Object.defineProperty(Object.prototype, "should", {
    configurable: true,
    get(this: unknown) {
        return new ShouldAssertion(this instanceof Object ? this.valueOf() : this);
    }
});

(globalThis as any).it = (title: string, fn: FixtureTest) => {
    if (!current) return;
    const declared = { title: prefix ? `${prefix} > ${title}` : title, fn };
    (collecting ? current.tests : current.late).push(declared);
};

// No case uses describe(), but flattening it keeps the global from being undefined.
(globalThis as any).describe = (title: string, fn: () => void) => {
    const outer = prefix;
    prefix = prefix ? `${prefix} > ${title}` : title;
    try {
        fn();
    } finally {
        prefix = outer;
    }
};

function subdirs(dir: string): string[] {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter(e => e.isDirectory() && !e.name.startsWith("_"))
        .map(e => e.name)
        .sort();
}

function resolveCaseConfigPath(dir: string): string {
    for (const name of ["vite.config.ts", "vite.config.js"]) {
        const candidate = path.join(dir, name);
        if (fs.existsSync(candidate)) return candidate;
    }
    throw new Error(`No Vite config found in ${dir}`);
}

async function buildCase(dir: string, outDir: string): Promise<string[]> {
    const configPath = resolveCaseConfigPath(dir);
    let configs = configCache.get(configPath);
    if (!configs) {
        const mod = await import(pathToFileURL(configPath).href);
        configs = ([] as any[]).concat(typeof mod.default === "function" ? mod.default() : mod.default);
        configCache.set(configPath, configs);
    }
    const bundles: string[] = [];

    for (let i = 0; i < configs.length; i++) {
        const config = configs[i];
        const caseOut = path.join(outDir, String(i));
        const inlineConfig: any = {
            ...config,
            root: dir,
            configFile: false,
            logLevel: "silent",
            build: {
                ...config.build,
                outDir: caseOut,
                emptyOutDir: true,
                minify: false,
                target: "esnext",
                modulePreload: false,
                reportCompressedSize: false,
                rollupOptions: {
                    ...config.build?.rollupOptions,
                    onwarn() { },
                    output: {
                        format: "es",
                        entryFileNames: "bundle.js",
                        chunkFileNames: "chunk-[name]-[hash].js"
                    }
                }
            }
        };
        await build(inlineConfig);
        bundles.push(path.join(caseOut, "bundle.js"));
    }
    return bundles;
}

/** Supports the `done`-callback style the ported cases use. */
function invoke(fn: FixtureTest): unknown {
    if (fn.length === 0) return fn();
    return new Promise<void>((resolve, reject) => {
        let settled = false;
        const done: DoneFn = err => {
            if (settled) return;
            settled = true;
            if (err) reject(err instanceof Error ? err : new Error(String(err)));
            else resolve();
        };
        try {
            fn(done);
        } catch (err) {
            done(err);
        }
    });
}

/*
 * Collection happens at module scope: Vitest awaits the top-level await before it collects,
 * so every test the bundles declare on import is registered by the time the suites are built.
 */
const cases: Case[] = [];

for (const category of subdirs(CASES_ROOT)) {
    for (const name of subdirs(path.join(CASES_ROOT, category))) {
        const caseName = `${category}/${name}`;
        if (filter && !caseName.includes(filter)) continue;
        if (only && caseName !== only) continue;

        const dir = path.join(CASES_ROOT, category, name);
        const testCase: Case = { name: caseName, tests: [], late: [] };
        cases.push(testCase);

        current = testCase;
        try {
            for (const bundle of await buildCase(dir, path.join(OUT_ROOT, category, name))) {
                await import(pathToFileURL(bundle).href);
            }
            // Let cases that declare tests from a microtask settle.
            await new Promise(resolve => setTimeout(resolve, 0));
        } catch (err) {
            testCase.error = err;
        }
        current = undefined;
    }
}

collecting = false;

afterAll(() => {
    fs.rmSync(OUT_ROOT, { recursive: true, force: true });
});

for (const testCase of cases) {
    describe(testCase.name, () => {
        it("should compile", () => {
            if (testCase.error) throw testCase.error;
            if (!testCase.tests.length) throw new Error("No tests exported by test case");
        });

        for (const declared of testCase.tests) {
            it(declared.title, async () => {
                current = testCase;
                await invoke(declared.fn);
            });
        }

        // A test that pulls in a lazily loaded chunk can make that chunk declare further tests,
        // far too late for Vitest to have collected them individually.
        if (testCase.late.length) {
            it("tests declared by lazily loaded chunks", async () => {
                current = testCase;
                for (let i = 0; i < testCase.late.length; i++) {
                    await invoke(testCase.late[i].fn);
                }
            });
        }
    });
}
