const { execSync } = require('child_process');
const fs = require("fs");
var EOL = require('os').EOL;

const wd = process.cwd();
const pkg = require(`${wd}/package.json`);

execSync(`git tag -a -m "Tagging v${pkg.version}" v${pkg.version}`);
