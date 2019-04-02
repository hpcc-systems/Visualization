const fs = require("fs");
var execSync = require('child_process').execSync;

function tagPush(pkgName, version) {
    const verStr = `${pkgName}@${version}`;
    return new Promise((resolve, reject) => {
        try {
            execSync(`git tag ${verStr}`);
            execSync(`git push upstream ${verStr}`);
            console.log(`tagged  ${verStr}`);
        } catch (e) {
            console.log(`skipped ${verStr}`);
        }
        resolve();
    });
}

const wd = process.cwd();
const loaderPkg = require(`${wd}/packages/loader/package.json`);
const promises = [];
promises.push(tagPush(loaderPkg.name, loaderPkg.version));
for (const key in loaderPkg.dependencies) {
    if (key.indexOf("@hpcc-js") === 0) {
        let version = loaderPkg.dependencies[key];
        if (version[0] === "^" || version[0] === "~") {
            version = version.substring(1);
        }
        promises.push(tagPush(key, version));
    }
}

Promise.all(promises).then(() => {
    console.log("...complete...");
})
