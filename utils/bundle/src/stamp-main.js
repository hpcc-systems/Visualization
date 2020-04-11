const { execSync } = require('child_process');
const fs = require("fs");
var EOL = require('os').EOL;

const wd = process.cwd();
const pkg = require(`${wd}/package.json`);
const loaderPkg = require(`${wd}/packages/loader/package.json`);

pkg.version = loaderPkg.version;

fs.writeFileSync(`${wd}/package.json`, JSON.stringify(pkg, undefined, 2), 'utf8');
