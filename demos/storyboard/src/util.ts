const FuncTypes = (new Function(`
return {
    functionType: Object.getPrototypeOf(function () { }).constructor,
    asyncFunctionType: Object.getPrototypeOf(async function () { }).constructor,
    generatorFunctionType: Object.getPrototypeOf(function* () { }).constructor,
    asyncGeneratorFunctionType: Object.getPrototypeOf(async function* () { }).constructor
};
`))();

const getReturn = (str) => {
    const startIdx = str.indexOf("return(");
    if (startIdx >= 0) {
        const endIdx = str.indexOf(")");
        return str.substring(startIdx, endIdx);
    }
    return str;
};

const getBody = (str) => {
    const startIdx = str.indexOf("{");
    if (startIdx >= 0) {
        const endIdx = str.indexOf("}");
        return str.substring(startIdx + 1, endIdx);
    }
    return str;
};

export async function inspect(url) {
    const func = new FuncTypes.asyncFunctionType("x", "return import(x)");
    const mod = await func(`https://api.observablehq.com/${url}.js?v=3`);
    let md = "";
    mod.default({
        module() {
            return {
                variable(o) {
                    return {
                        define(...args: any[]) {
                            let name = "";
                            let definition = () => { };
                            args.forEach(arg => {
                                if (typeof arg === "string") {
                                    name = arg;
                                } else if (Array.isArray(arg)) {
                                } else {
                                    definition = arg;
                                }
                            });
                            md += `${name ? name + " = " : ""}${getReturn(getBody(definition.toString()))}\n`;
                        }
                    };
                },
                import(id, item) {
                    console.log("Import:  ", arguments);
                }
            };
        }
    }, () => { });
    return md;
}
