import { ID } from "@hpcc-js/util";

export function formatLine(labelTpl: string, obj: Record<string, any>): string {
    let retVal = "";
    let lpos = labelTpl.indexOf("%");
    let rpos = -1;
    let replacementFound = lpos >= 0 ? false : true;  //  If a line has no symbols always include it, otherwise only include that line IF a replacement was found  ---
    while (lpos >= 0) {
        retVal += labelTpl.substring(rpos + 1, lpos);
        rpos = labelTpl.indexOf("%", lpos + 1);
        if (rpos < 0) {
            console.warn("Invalid Label Template");
            break;
        }
        const key = labelTpl.substring(lpos + 1, rpos);
        replacementFound = replacementFound || !!obj[labelTpl.substring(lpos + 1, rpos)];
        retVal += !key ? "%" : (obj[labelTpl.substring(lpos + 1, rpos)] || "");
        lpos = labelTpl.indexOf("%", rpos + 1);
    }
    retVal += labelTpl.substring(rpos + 1, labelTpl.length);
    return replacementFound ? retVal : "";
}

export function decodeHTML(str?: string): string {
    if (!str) return str || "";

    const htmlEntities: Record<string, string> = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": "\"",
        "&apos;": "'",
        "&nbsp;": "\u00A0", // Non-breaking space (char code 160)
        "&#10;": "\n",
        "&#13;": "\r"
    };

    return str.replace(/&(?:amp|lt|gt|quot|apos|nbsp);|&#(?:10|13);/g, (match) => htmlEntities[match]);
}

export function format(labelTpl: string, obj: Record<string, any>): string {
    labelTpl = labelTpl.split("\\n").join("\n");

    const lines = labelTpl.split("\n");
    const result: string[] = [];

    for (const line of lines) {
        const formattedLine = formatLine(line, obj);
        if (formattedLine.trim().length > 0) {
            result.push(decodeHTML(formattedLine));
        }
    }

    return result.join("\n");
}

export function encodeLabel(label: ID): string {
    label = String(label);
    return label
        .split('"')
        .join('\\"')
        .split("\n")
        .join("\\n")
        ;
}