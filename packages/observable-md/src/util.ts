//  Dynamic Functions ---
export const FuncTypes = (new Function(`
return {
    functionType: Object.getPrototypeOf(function () { }).constructor,
    asyncFunctionType: Object.getPrototypeOf(async function () { }).constructor,
    generatorFunctionType: Object.getPrototypeOf(function* () { }).constructor,
    asyncGeneratorFunctionType: Object.getPrototypeOf(async function* () { }).constructor
};
`))();

function funcType(async: boolean = false, generator: boolean = false) {
    if (!async && !generator) return FuncTypes.functionType;
    if (async && !generator) return FuncTypes.asyncFunctionType;
    if (!async && generator) return FuncTypes.generatorFunctionType;
    return FuncTypes.asyncGeneratorFunctionType;
}

export function createFunction(refs: { [key: string]: string }, _body: string, async = false, generator = false, blockStatement = false) {
    const args = [];
    let body = _body;
    for (const key in refs) {
        args.push(refs[key]);
        if (key !== refs[key]) {
            body = body.split(key).join(refs[key]);
        }
    }
    return new (funcType(async, generator))(...args, blockStatement ? body : `{ return (${body}); }`);
}

//  Widget  ---
export function encodeMD(str: string) {
    return str
        .split("`").join("\\`")
        .split("$").join("\$")
        ;
}

export function calcRefs(refs, str): { [key: string]: string } {
    if (refs === undefined) return {};
    const dedup = {};
    refs.forEach(r => {
        if (r.name) {
            dedup[r.name] = r.name.split(" ").join("_");
        } else if (r.start !== undefined && r.end !== undefined) {
            const name = str.substring(r.start, r.end);
            dedup[name] = name.split(" ").join("_");
        }
    });
    return dedup;
}

export function errorMessage(message, code) {
    const msg = `\
---
<span style="color:red">${message}</span>
\`\`\`javascript
${code}
\`\`\`
---
`;
    return msg;
}

export async function fetch_text(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unable to fetch: ${url}`);
    return response.text();
}
