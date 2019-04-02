const fs = require("fs");
var execSync = require('child_process').execSync;

const wd = process.cwd();
const loaderPkg = require(`${wd}/packages/loader/package.json`);

try {
    execSync(`git tag -a -m "chore(tag): v${loaderPkg.version}" v${loaderPkg.version}`);
    execSync(`git push upstream v${loaderPkg.version}`);
    console.log(`tagged  v${loaderPkg.version}`);
} catch (e) {
    console.log(`skipped v${loaderPkg.version}`);
}
