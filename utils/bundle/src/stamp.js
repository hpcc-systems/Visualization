const fs = require("fs");
var EOL = require('os').EOL;

const wd = process.cwd();
const pkg = require(`${wd}/package.json`);
const loaderPkg = require(`${wd}/../loader/package.json`);
fs.writeFile(`${wd}/src/__package__.ts`, `export const PKG_NAME = "${pkg.name}";${EOL}export const PKG_VERSION = "${pkg.version}";${EOL}export const BUILD_VERSION = "${loaderPkg.version}";${EOL}`, 'utf8', err => { });

