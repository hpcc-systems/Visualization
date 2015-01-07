#!/usr/bin/env bash
if which node >/dev/null; then
    node ./util/r.js -o ./util/build.js
else
    echo "node.js is required to build - see https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager"
    exit 1
fi
