const fs = require("fs");
var execSync = require('child_process').execSync;


function tagPush(pkgName, version) {
    const verStr = `${pkgName}@${version}`;
    try {
        execSync(`git tag ${verStr}`);
        execSync(`git push upstream ${verStr}`);
    } catch (e) { }
}

const wd = process.cwd();
const loaderPkg = require(`${wd}/packages/loader/package.json`);
tagPush(loaderPkg.name, loaderPkg.version);
for (const key in loaderPkg.dependencies) {
    if (key.indexOf("@hpcc-js") === 0) {
        let version = loaderPkg.dependencies[key];
        if (version[0] === "^" || version[0] === "~") {
            version = version.substring(1);
        }
        tagPush(key, version);
    }
}
