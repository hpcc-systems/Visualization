const fs = require("fs");
const path = require('path');

const walk = function(dir) {
    let results = [];
    fs.readdirSync(dir)
        .forEach(function(file) {
            file = path.join(dir, file);
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) { 
                results = results.concat(walk(file));
            } else if (file.slice(-3) === ".ts") { 
                results.push(file);
            }
        });
    return results;
}
const packagesPath = path.join(__dirname,'../../packages/');
const packagesSrcPathArr = fs.readdirSync(packagesPath)
    .map(p=>{
        const fullPath = path.join(packagesPath, p, "src");
        return fs.existsSync(fullPath) ? fullPath : false;
    })
    .filter(n=>n)
    ;
const allPathArr = packagesSrcPathArr.reduce((arr,n)=>{
    return arr.concat(walk(n));
},[]);

const _imports = {};

allPathArr.forEach(fullPath=>{
    try{
        const fileKey = fullPath.split('packages');
        const fileStr = fs.readFileSync(fullPath, "utf8");
        const importSplit = fileStr.split('import');
        const importCount = importSplit.length - 1;
        if(importCount > 0){
            _imports[fileKey] = importSplit.slice(1).map(str=>{
                return 'import'+str.split(';')[0];
            })
        }
    } catch(e) {
        console.log('e === ',e);

    }
});
fs.writeFileSync("scraped_imports.json", JSON.stringify(_imports, null, "    "));
