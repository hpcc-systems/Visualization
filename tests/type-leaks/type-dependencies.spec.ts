import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { glob } from "glob";
import { parse } from "@typescript-eslint/typescript-estree";

const PACKAGES_DIR = resolve("../../packages");

interface PackageInfo {
    name: string;
    path: string;
    packageJson: any;
    dependencies: Set<string>;
    peerDependencies: Set<string>;
    devDependencies: Set<string>;
}

/**
 * Get all packages in the packages directory
 */
function getPackages(): PackageInfo[] {
    const packages: PackageInfo[] = [];

    const packageDirs = readdirSync(PACKAGES_DIR).filter(name => {
        const packagePath = join(PACKAGES_DIR, name);
        return statSync(packagePath).isDirectory();
    });

    for (const dirName of packageDirs) {
        const packagePath = join(PACKAGES_DIR, dirName);
        const packageJsonPath = join(packagePath, "package.json");
        if (existsSync(packageJsonPath)) {
            try {
                const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
                const dependencies = new Set(Object.keys(packageJson.dependencies || {}));
                const peerDependencies = new Set(Object.keys(packageJson.peerDependencies || {}));
                const devDependencies = new Set(Object.keys(packageJson.devDependencies || {}));

                packages.push({
                    name: packageJson.name,
                    path: packagePath,
                    packageJson,
                    dependencies,
                    peerDependencies,
                    devDependencies
                });
            } catch (error) {
                console.warn(`Failed to read package.json for ${dirName}:`, error);
            }
        }
    }

    return packages;
}

/**
 * Extract import statements and type references from TypeScript file
 */
function extractTypeReferences(filePath: string): Set<string> {
    const typeReferences = new Set<string>();

    try {
        const content = readFileSync(filePath, "utf8");

        // Parse the TypeScript file
        const ast = parse(content, {
            loc: true,
            range: true,
            tokens: false,
            comments: false,
            errorOnUnknownASTType: false,
            errorOnTypeScriptSyntacticAndSemanticIssues: false,
            jsx: false,
        });

        // Walk the AST to find import statements and type references
        function walkNode(node: any) {
            if (!node || typeof node !== "object") return;

            // Import declarations
            if (node.type === "ImportDeclaration" && (node.importKind === "type" || node.importKind === undefined)) {
                const importSource = node.source.value;
                if (!importSource.startsWith(".") && !importSource.startsWith("/")) {
                    const packageName = extractPackageName(importSource);
                    if (packageName) {
                        typeReferences.add(packageName);
                    }
                }
            }

            // Dynamic imports
            if (node.type === "ImportExpression" && node.source?.value) {
                const importSource = node.source.value;
                if (!importSource.startsWith(".") && !importSource.startsWith("/")) {
                    const packageName = extractPackageName(importSource);
                    if (packageName) {
                        typeReferences.add(packageName);
                    }
                }
            }

            // Recursively walk child nodes
            for (const key in node) {
                if (key !== "parent") {
                    const child = node[key];
                    if (Array.isArray(child)) {
                        child.forEach(walkNode);
                    } else if (child && typeof child === "object") {
                        walkNode(child);
                    }
                }
            }
        }

        walkNode(ast);
    } catch (error) {
        // Ignore parse errors for now - we'll still catch obvious import statements
        console.warn(`Failed to parse ${filePath}:`, error);

        // Fallback: use regex to find import statements
        const content = readFileSync(filePath, "utf8");
        const importRegex = /(?:import|from|require\()\s*["\']([^"\']+)["\']/g;
        let match;

        while ((match = importRegex.exec(content)) !== null) {
            const importSource = match[1];
            if (!importSource.startsWith(".") && !importSource.startsWith("/")) {
                const packageName = extractPackageName(importSource);
                if (packageName) {
                    typeReferences.add(packageName);
                }
            }
        }
    }

    return typeReferences;
}

/**
 * Extract the package name from an import path
 */
function extractPackageName(importPath: string): string | null {
    if (importPath.startsWith("@")) {
        // Scoped package: @scope/package or @scope/package/subpath
        const parts = importPath.split("/");
        if (parts.length >= 2) {
            return `${parts[0]}/${parts[1]}`;
        }
    } else {
        // Unscoped package: package or package/subpath
        const parts = importPath.split("/");
        return parts[0];
    }
    return null;
}

/**
 * Check if a package is a known built-in Node.js module or TypeScript lib
 */
function isBuiltInModule(packageName: string): boolean {
    const builtInModules = new Set([
        "fs", "path", "util", "crypto", "os", "url", "querystring", "stream",
        "buffer", "events", "http", "https", "net", "tls", "zlib", "child_process",
        "cluster", "worker_threads", "perf_hooks", "async_hooks", "inspector",
        "readline", "repl", "string_decoder", "timers", "tty", "v8", "vm",
        "assert", "console", "module", "process", "global", "dgram", "dns",
        "domain", "punycode"
    ]);

    const typeScriptLibs = new Set([
        "typescript", "@types/node"
    ]);

    return builtInModules.has(packageName) ||
        typeScriptLibs.has(packageName) ||
        packageName.startsWith("node:");
}

describe("Package Type Dependencies", () => {
    const packages = getPackages();

    for (const pkg of packages) {
        describe(`${pkg.name}`, () => {
            it("should not reference third-party types unless they are in dependencies", async () => {
                // Get all TypeScript files in the package
                const tsFiles = ["types/index.d.ts", "types/index.browser.d.ts", "types/index.node.d.ts"];

                const allTypeReferences = new Set<string>();

                // Extract type references from all TypeScript files
                for (const tsFile of tsFiles) {
                    const filePath = join(pkg.path, tsFile);
                    if (existsSync(filePath)) {
                        const typeRefs = extractTypeReferences(filePath);
                        typeRefs.forEach(ref => allTypeReferences.add(ref));
                    }
                }

                // Check each type reference
                const violations: string[] = [];

                for (const typeRef of allTypeReferences) {
                    // Skip if it's a built-in module
                    if (isBuiltInModule(typeRef)) {
                        continue;
                    }

                    // Skip if it's an internal @hpcc-js package
                    if (typeRef.startsWith("@hpcc-js/")) {
                        continue;
                    }

                    // Skip if it's in dependencies
                    if (pkg.dependencies.has(typeRef)) {
                        continue;
                    }

                    // Skip if it's in dependencies
                    if (pkg.peerDependencies.has(typeRef)) {
                        continue;
                    }

                    // Skip if it's a @types/ package and the base package is in dependencies
                    if (typeRef.startsWith("@types/")) {
                        const basePackage = typeRef.replace("@types/", "");
                        if (pkg.dependencies.has(basePackage)) {
                            continue;
                        }
                    }

                    // Skip vitest-related packages (test runner)
                    if (typeRef === "vitest" || typeRef.startsWith("@vitest/")) {
                        continue;
                    }

                    // Skip some common dev-only packages that might be referenced in source
                    const devOnlyPackages = new Set([
                        "vitepress", "vite", "typescript", "esbuild",
                        "@vitejs/plugin-react", "rollup"
                    ]);

                    if (devOnlyPackages.has(typeRef)) {
                        continue;
                    }

                    // This is a violation - third-party type used without dependency
                    violations.push(typeRef);
                }

                if (violations.length > 0) {
                    console.error(`\n${pkg.name} type violations:`);
                    console.error(`Dependencies: ${Array.from(pkg.dependencies).join(", ") || "(none)"}`);
                    console.error(`Violations: ${violations.join(", ")}`);
                }

                expect(violations).toEqual([]);
            });
        });
    }
});
