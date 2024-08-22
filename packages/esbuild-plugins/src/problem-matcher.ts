import type { PluginBuild, Plugin } from "esbuild";

export function problemMatcher(): Plugin {
    return {
        name: "problem-matcher",

        setup(build: PluginBuild) {

            build.onStart(() => {
                // eslint-disable-next-line no-console
                console.log("[watch] build started");
            });

            build.onEnd((result) => {
                result.errors.forEach(({ text, location }) => {
                    console.error(`✘ [ERROR] ${text}`);
                    console.error(`    ${location?.file}:${location?.line}:${location?.column}:`);
                });
                // eslint-disable-next-line no-console
                console.log("[watch] build finished");
            });
        }
    };
}
