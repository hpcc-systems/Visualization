/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = options => {
    const aliases = Object.keys(options);
    const re = new RegExp(`^(${aliases.map(x => escapeRegExp(x)).join("|")})$`);

    return {
        name: "hpccJsResolve",
        setup(build) {

            build.onResolve({ filter: /^@hpcc-js\/wc-/ }, args => {
                const package = args.path.replace("@hpcc-js/wc-", "");
                return {
                    path: path.join(__dirname, "../components/", package, "/src/index.ts"),
                };
            });

            build.onResolve({ filter: /^@hpcc-js\// }, args => {
                const package = args.path.replace("@hpcc-js/", "");
                return {
                    path: path.join(__dirname, "../packages/", package, "/src/index.ts"),
                };
            });

            build.onResolve({ filter: re }, args => ({
                path: options[args.path],
            }));
        },
    };
};
