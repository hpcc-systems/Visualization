import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import { parse } from "@typescript-eslint/typescript-estree";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PACKAGES_DIR = resolve(__dirname, "../../packages");

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

            // Export declarations (for re-exports like `export * from "package"`)
            if (node.type === "ExportAllDeclaration" || node.type === "ExportNamedDeclaration") {
                if (node.source && node.source.value) {
                    const exportSource = node.source.value;
                    if (!exportSource.startsWith(".") && !exportSource.startsWith("/")) {
                        const packageName = extractPackageName(exportSource);
                        if (packageName) {
                            typeReferences.add(packageName);
                        }
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

        // Fallback: use regex to find import and export statements
        const content = readFileSync(filePath, "utf8");
        const patterns = [
            IMPORT_EXPORT_PATTERNS.general,
            IMPORT_EXPORT_PATTERNS.exportAll,
            IMPORT_EXPORT_PATTERNS.exportNamed
        ];

        patterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const importSource = match[1];
                if (!importSource.startsWith(".") && !importSource.startsWith("/")) {
                    const packageName = extractPackageName(importSource);
                    if (packageName) {
                        typeReferences.add(packageName);
                    }
                }
            }
        });
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
 * Common regex patterns for extracting import/export statements
 */
const IMPORT_EXPORT_PATTERNS = {
    // ES6 imports: import ... from "package" (not template literals)
    esImport: /\bimport\s+[^'"]*\s+from\s+["']([^"'${}]+)["']/g,
    // CommonJS require: require("package") (not template literals, not property access)
    commonjsRequire: /(?<![.\w])require\s*\(\s*["']([^"'${}]+)["']\s*\)/g,
    // Dynamic imports: import("package") (not template literals)
    dynamicImport: /\bimport\s*\(\s*["']([^"'${}]+)["']\s*\)/g,
    // Export all from: export * from "package"
    exportAll: /export\s+\*\s+from\s+["\']([^"\']+)["\']/g,
    // Export named from: export { ... } from "package"
    exportNamed: /export\s+.*?\s+from\s+["\']([^"\']+)["\']/g,
    // General import/from/require pattern (fallback)
    general: /(?:import|from|require\()\s*["\']([^"\']+)["\']/g,
    // AMD/UMD define dependencies
    amdDefine: /define\s*\(\s*\[([^\]]+)\]/g
};

/**
 * Check if a package is a known built-in Node.js module or TypeScript lib
 */
function isBuiltInModule(packageName: string): boolean {
    return packageName.startsWith("node:");
}

/**
 * Extract runtime dependency references from bundled JavaScript files
 */
function extractRuntimeReferences(filePath: string): Set<string> {
    const runtimeReferences = new Set<string>();

    try {
        const content = readFileSync(filePath, "utf8");

        // More precise regex patterns to match import/require statements in bundled files
        const patterns = [
            IMPORT_EXPORT_PATTERNS.esImport,
            IMPORT_EXPORT_PATTERNS.commonjsRequire,
            IMPORT_EXPORT_PATTERNS.dynamicImport
        ];

        // AMD/UMD define dependencies need special handling
        const defineRegex = IMPORT_EXPORT_PATTERNS.amdDefine;
        let defineMatch;
        while ((defineMatch = defineRegex.exec(content)) !== null) {
            const depList = defineMatch[1];
            // Split by comma but be careful about quoted strings
            const deps = depList.match(/["'][^"']*["']/g) || [];
            for (const quotedDep of deps) {
                const dep = quotedDep.slice(1, -1); // Remove quotes
                if (dep && !dep.startsWith(".") && !dep.startsWith("/") &&
                    !dep.includes("${") && !dep.includes("'") && !dep.includes('"') &&
                    !dep.includes(" ") && dep.length < 50 && // Avoid false positives from long code snippets
                    /^[a-zA-Z0-9@/_-]+$/.test(dep)) { // Only valid package name characters
                    const packageName = extractPackageName(dep);
                    if (packageName && packageName !== "exports" && packageName !== "module" &&
                        !["value", "dojo.parser"].includes(packageName)) {
                        runtimeReferences.add(packageName);
                    }
                }
            }
        }

        // Process other patterns
        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const importSource = match[1];
                if (importSource && !importSource.startsWith(".") && !importSource.startsWith("/") &&
                    !importSource.includes("${") && importSource.length < 100) {
                    const packageName = extractPackageName(importSource);
                    if (packageName && packageName !== "exports" && packageName !== "module") {
                        runtimeReferences.add(packageName);
                    }
                }
            }
        }
    } catch (error) {
        console.warn(`Failed to read bundled file ${filePath}:`, error);
    }

    return runtimeReferences;
}

describe("Package Dependencies", () => {
    const packages = getPackages();

    it("should have valid package.json files", () => {
        expect(packages.length).toBeGreaterThan(0);
        packages.forEach(pkg => {
            expect(pkg.name).toBeTruthy();
            expect(pkg.packageJson).toBeTruthy();
        });
    });

    it("should not have type dependencies that are not declared as dependencies or devDependencies", () => {
        const errors: string[] = [];

        packages.forEach(pkg => {
            const srcDir = join(pkg.path, "src");
            if (!existsSync(srcDir)) return;

            const tsFiles = glob.sync("**/*.ts", {
                cwd: srcDir,
                absolute: true,
                ignore: ["**/*.d.ts", "**/*.spec.ts", "**/*.test.ts"]
            });

            const allTypeReferences = new Set<string>();
            tsFiles.forEach(file => {
                const refs = extractTypeReferences(file);
                refs.forEach(ref => allTypeReferences.add(ref));
            });

            allTypeReferences.forEach(ref => {
                if (!pkg.dependencies.has(ref) &&
                    !pkg.devDependencies.has(ref) &&
                    !pkg.peerDependencies.has(ref)) {
                    errors.push(`${pkg.name}: Type reference '${ref}' not found in dependencies, devDependencies, or peerDependencies`);
                }
            });
        });

        if (errors.length > 0) {
            throw new Error(`Type dependency violations found:\n${errors.join("\n")}`);
        }
    });

    it("should not reference third-party runtime dependencies unless they are in dependencies", () => {
        const errors: string[] = [];

        // Known build-time/dev-only packages that should be ignored
        const knownBuildTimeDeps = new Set(["dojo", "dgrid", "dojo.parser", "function", "some"]);

        packages.forEach(pkg => {
            // Check for bundled files in common output directories
            const bundleDirs = ["dist"];
            const bundledFiles: string[] = [];

            bundleDirs.forEach(dir => {
                const bundleDir = join(pkg.path, dir);
                if (existsSync(bundleDir)) {
                    const jsFiles = glob.sync("**/*.{js,mjs,cjs}", {
                        cwd: bundleDir,
                        absolute: true,
                        ignore: ["**/*.min.js", "**/*.map", "**/*.d.ts"]
                    });
                    bundledFiles.push(...jsFiles);
                }
            });

            if (bundledFiles.length === 0) return;

            const allRuntimeReferences = new Set<string>();
            bundledFiles.forEach(file => {
                const refs = extractRuntimeReferences(file);
                refs.forEach(ref => allRuntimeReferences.add(ref));
            });

            // Filter out built-in modules, internal @hpcc-js packages, and known build-time deps
            const externalReferences = Array.from(allRuntimeReferences).filter(ref =>
                !isBuiltInModule(ref) &&
                !knownBuildTimeDeps.has(ref)
            );

            externalReferences.forEach(ref => {
                if (!pkg.dependencies.has(ref) && !pkg.peerDependencies.has(ref)) {
                    errors.push(`${pkg.name}: Runtime reference '${ref}' not found in dependencies or peerDependencies (found in bundled files)`);
                }
            });
        });

        if (errors.length > 0) {
            throw new Error(`Runtime dependency violations found:\n${errors.join("\n")}`);
        }
    });
});

describe("Package Type Dependencies", () => {
    const packages = getPackages();

    for (const pkg of packages) {
        describe(`${pkg.name}`, () => {
            it("should not reference third-party types unless they are in dependencies", async () => {
                // Get all TypeScript declaration files in the package
                const typesDir = join(pkg.path, "types");
                if (!existsSync(typesDir)) return;

                const tsFiles = glob.sync("**/index*.d.ts", {
                    cwd: typesDir,
                    absolute: true,
                    ignore: ["**/*.spec.d.ts", "**/*.test.d.ts"]
                });

                const allTypeReferences = new Set<string>();

                // Extract type references from all TypeScript declaration files
                for (const tsFile of tsFiles) {
                    const typeRefs = extractTypeReferences(tsFile);
                    typeRefs.forEach(ref => allTypeReferences.add(ref));
                }

                // Check each type reference
                const violations: string[] = [];

                for (const typeRef of allTypeReferences) {
                    // Skip if it's in dependencies
                    if (pkg.dependencies.has(typeRef)) {
                        continue;
                    }

                    // Skip if it's in peerDependencies
                    if (pkg.peerDependencies.has(typeRef)) {
                        continue;
                    }

                    // Skip if it's a regular package but we have its @types/ equivalent in dependencies
                    if (!typeRef.startsWith("@types/")) {
                        const typesPackage = `@types/${typeRef}`;
                        if (pkg.dependencies.has(typesPackage) || pkg.peerDependencies.has(typesPackage)) {
                            continue;
                        }
                    }

                    // This is a violation - third-party type used without dependency
                    violations.push(typeRef);
                }

                if (violations.length > 0) {
                    console.error(`\n${pkg.name} type violations:`);
                    console.error(`Dependencies: ${Array.from(pkg.dependencies).join(", ") || "(none)"}`);
                    console.error(`PeerDependencies: ${Array.from(pkg.peerDependencies).join(", ") || "(none)"}`);
                    console.error(`Violations: ${violations.join(", ")}`);
                }

                expect(violations).toEqual([]);
            });
        });
    }
});

