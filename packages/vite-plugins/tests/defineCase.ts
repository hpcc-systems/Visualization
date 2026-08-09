import { dojo, type DojoPluginOptions } from "@hpcc-js/vite-plugins";
import type { PluginOption } from "vite";

type DefineCaseOptions = {
    entry?: string | Record<string, string>;
    plugins?: PluginOption[];
} & Record<string, unknown>;

/**
 * Builds a Vite config for a test case. Everything except `entry` and `plugins`
 * is passed straight through to the Dojo plugin.
 */
export function defineCase({ entry = "test/index", plugins = [], ...pluginOptions }: DefineCaseOptions) {
    return {
        build: { rollupOptions: { input: entry } },
        plugins: [dojo(pluginOptions as unknown as DojoPluginOptions), ...plugins]
    };
}