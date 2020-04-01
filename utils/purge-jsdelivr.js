const https = require('https');

function get(id, url) {
    return new Promise((resolve, reject) => {
        https.get(url, resp => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                resolve(data);
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
}

async function purgePackage(id, ver) {
    const purgeIndex = `https://purge.jsdelivr.net/npm/${id}${ver}/dist/index.js`;
    const purgeIndexMin = `https://purge.jsdelivr.net/npm/${id}${ver}/dist/index.min.js`;
    const purgePackage = `https://purge.jsdelivr.net/npm/${id}${ver}/package.json`;
    return Promise.all([get(id, purgeIndex), get(id, purgeIndexMin), get(id, purgePackage)]).then(responses => {
        return {
            id: `${id}${ver}`,
            responses
        };
    });
}

async function purgeAll() {
    const wd = process.cwd();
    console.log(`${wd}/packages/loader/package.json`);
    const pkg = require(`${wd}/packages/loader/package.json`);
    for (const key in pkg.dependencies) {
        await purgePackage(key, "")
            .then(console.log)
            .catch(e => console.error(e.message))
            ;
        // await purgePackage(key, pkg.dependencies[key].replace("^", "@"))
        //     .then(console.log)
        //     .catch(e => console.error(e.message))
        //     ;
    }
}

purgeAll();
