import type { Plugin } from "vite";

export interface PackageVersionPluginOptions {
    /**
     * Package.json object containing name and version
     */
    pkg: {
        name: string;
        version: string;
    };
    /**
     * Build version (typically from root package.json)
     * If not provided, defaults to pkg.version
     */
    buildVersion?: string;
    /**
     * Placeholder for package name (default: "__PACKAGE_NAME__")
     */
    namePlaceholder?: string;
    /**
     * Placeholder for package version (default: "__PACKAGE_VERSION__")
     */
    versionPlaceholder?: string;
    /**
     * Placeholder for build version (default: "__BUILD_VERSION__")
     */
    buildVersionPlaceholder?: string;
}

/**
 * Vite plugin to replace package version placeholders during build
 * This allows keeping version information in source files as placeholders
 * that get replaced with actual values from package.json during the build
 */
export function packageVersionPlugin(options: PackageVersionPluginOptions): Plugin {
    const {
        pkg,
        buildVersion = pkg.version,
        namePlaceholder = "__PACKAGE_NAME__",
        versionPlaceholder = "__PACKAGE_VERSION__",
        buildVersionPlaceholder = "__BUILD_VERSION__"
    } = options;

    return {
        name: "hpcc-package-version-plugin",
        enforce: "pre",
        transform(code: string, id: string) {
            // Only process TypeScript/JavaScript files
            if (!id.endsWith(".ts") && !id.endsWith(".js")) {
                return null;
            }

            // Check if the file contains any placeholders
            if (!code.includes(namePlaceholder) &&
                !code.includes(versionPlaceholder) &&
                !code.includes(buildVersionPlaceholder)) {
                return null;
            }

            // Replace placeholders with actual values
            let transformedCode = code;
            if (code.includes(namePlaceholder)) {
                transformedCode = transformedCode.replace(
                    new RegExp(namePlaceholder, "g"),
                    pkg.name
                );
            }
            if (code.includes(versionPlaceholder)) {
                transformedCode = transformedCode.replace(
                    new RegExp(versionPlaceholder, "g"),
                    pkg.version
                );
            }
            if (code.includes(buildVersionPlaceholder)) {
                transformedCode = transformedCode.replace(
                    new RegExp(buildVersionPlaceholder, "g"),
                    buildVersion
                );
            }

            return {
                code: transformedCode,
                map: null // Could generate source map if needed
            };
        }
    };
}
