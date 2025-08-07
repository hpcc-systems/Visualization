import { createHpccViteConfig, browserConfig, nodeConfig } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

const aliasPlugin = {
    name: 'alias-plugin',
    setup(build) {
        const aliases = [
            {
                find: /^npm:(.*)$/,
                replacement: "https://cdn.jsdelivr.net/npm/$1/+esm"
            },
            {
                find: /^jsr:(.*)$/,
                replacement: "https://esm.sh/jsr/$1"
            }
        ];

        build.onResolve({ filter: /^(npm|jsr):/ }, args => {
            for (const alias of aliases) {
                const match = args.path.match(alias.find);
                if (match) {
                    const resolved = alias.replacement.replace('$1', match[1]);
                    return { path: resolved, external: true };
                }
            }
        });
    }
};

const myBrowserConfig = { ...browserConfig };
myBrowserConfig.optimizeDeps = {
    include: ["acorn", "acorn-walk", "@observablehq/parser"]
};

const myNodeConfig = { ...nodeConfig };
myNodeConfig.optimizeDeps = {
    include: ["acorn", "acorn-walk", "@observablehq/parser"]
};

const config = createHpccViteConfig(pkg, {
    plugins: [aliasPlugin],
    configOverrides: {
        test: {
            projects: [myBrowserConfig, myNodeConfig]
        }
    }
});

export default {
    ...config
};
