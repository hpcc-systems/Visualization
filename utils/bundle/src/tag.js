const fs = require("fs");
var exec = require('child_process').exec;

const wd = process.cwd();
const loaderPkg = require(`${wd}/packages/loader/package.json`);
exec(`git tag v${loaderPkg.version}`, function (error, stderr, stdout) {
    exec(`git push upstream v${loaderPkg.version}`, function (error, stderr, stdout) { });
});
