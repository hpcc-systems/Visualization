export enum Case {
    CamelCase,
    PascalCase,
    SnakeCase
}

function splitWords(input: string) {
    /* regex from lodash words() function */
    const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    return input.match(reAsciiWord) || [];
}

function capitalizeWord(input: string) {
    return input.charAt(0).toUpperCase() + input.substring(1);
}

export function changeCase(input: string, toCase: Case) {
    let output = input;
    let convertString;
    switch (toCase) {
        case Case.PascalCase:
            convertString = (_in: string) => {
                const words = splitWords(_in).map(w => {
                    return capitalizeWord(w);
                }) || [];
                return words.join("");
            };
            break;
        case Case.CamelCase:
            convertString = (_in: string) => {
                const words = splitWords(_in).map((w, idx) => {
                    if (idx === 0) return w;
                    return capitalizeWord(w);
                }) || [];
                return words.join("");
            }
            break;
        case Case.SnakeCase:
            convertString = (_in: string) => {
                return splitWords(_in)
                    .map(w => w.toLowerCase())
                    .join("_");
            }
    }
    if (typeof convertString === "function") {
        output = convertString(input);
    }
    return output;
}