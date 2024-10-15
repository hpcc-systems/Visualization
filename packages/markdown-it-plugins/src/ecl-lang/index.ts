import type { LanguageInput } from "shiki";

import ecl_lang from "./ecl.tmLanguage.json" with { type: "json" };

export function eclLang(): LanguageInput {
    const retVal = {
        ...ecl_lang,
        name: "ecl"
    } as unknown as LanguageInput;
    return retVal;
}

