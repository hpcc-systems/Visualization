#!/usr/bin/env bash
echoerr() { echo "$@" 1>&2; }
if which node >/dev/null; then
    node ./util/r.js -o ./util/build.js dir=${1:-"./build"}
else
    echoerr "ERROR:  node.js is required to build - see https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager"
    exit 1
fi
