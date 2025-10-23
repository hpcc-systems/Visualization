import * as fs from "fs";
import * as path from "path";
import type { Plugin } from "rollup";

interface PackageJson {
    name: string;
    version: string;
    workspaces?: string[];
}

/**
 * Walks up the directory tree to find the root package.json with workspaces
 */
export function getRootPackageVersion(startDir: string): string {
    let currentDir = startDir;
    while (currentDir !== path.dirname(currentDir)) {
        const pkgPath = path.join(currentDir, "package.json");
        if (fs.existsSync(pkgPath)) {
            const pkg: PackageJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
            if (pkg.workspaces) {
                return pkg.version;
            }
        }
        currentDir = path.dirname(currentDir);
    }
    throw new Error("Could not find root package.json with workspaces");
}

/**
 * Rollup plugin to replace version placeholders in __package__.ts
 */
export function packageVersionPlugin(): Plugin {
    let packageName: string;
    let packageVersion: string;
    let buildVersion: string;

    return {
        name: "package-version-plugin",

        buildStart() {
            // Read the local package.json
            const pkgPath = path.resolve(process.cwd(), "package.json");
            const pkg: PackageJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

            packageName = pkg.name;
            packageVersion = pkg.version;

            // Get the root package version for BUILD_VERSION
            buildVersion = getRootPackageVersion(process.cwd());
        },

        transform(code: string, id: string) {
            // Only process __package__ files
            if (!id.includes("__package__")) {
                return null;
            }

            // Replace the placeholders
            let transformedCode = code;
            transformedCode = transformedCode.replace(/"__PACKAGE_NAME__"/g, `"${packageName}"`);
            transformedCode = transformedCode.replace(/"__PACKAGE_VERSION__"/g, `"${packageVersion}"`);
            transformedCode = transformedCode.replace(/"__BUILD_VERSION__"/g, `"${buildVersion}"`);

            if (transformedCode !== code) {
                return {
                    code: transformedCode,
                    map: null
                };
            }

            return null;
        }
    };
}
