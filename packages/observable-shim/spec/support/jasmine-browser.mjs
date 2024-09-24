import pkg from "../../package.json" with {type: "json"};

export default {
    srcDir: "src",
    srcFiles: [
        "**/*.ts"
    ],
    specDir: "dist-test",
    specFiles: [
        "*.browser.js"
    ],
    esmFilenameExtension: ".js",
    importMap: {
        imports: {
            [pkg.name]: "dist/index.js"
        }
    },
    env: {
        stopSpecOnExpectationFailure: false,
        stopOnSpecFailure: false,
        random: false
    },
    listenAddress: "localhost",
    hostname: "localhost",
    browser: {
        name: "headlessFirefox"
    }
};
