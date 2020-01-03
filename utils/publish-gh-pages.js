const { execSync } = require('child_process');
var ghpages = require('gh-pages');

console.log("install");
execSync("npm install", { cwd: "website" });
console.log("clean");
execSync("npm run clean", { cwd: "website" });
console.log("build");
execSync("npm run build-publish", { cwd: "website" });

console.log("publish");
ghpages.publish('.', {
    repo: "https://github.com/hpcc-systems/Visualization.git",
    src: [
        "index.html",
        "docs/**/*",
        "demos/*/docs/**/*",
        "packages/*/docs/**/*",
        "website/index.html",
        "website/systemjs.config.js",
        "website/docs/**/*",
        "website/src/**/*",
        "website/src-umd/**/*",
        "website/style/**/*"
    ]
}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("done.");
    }
});
