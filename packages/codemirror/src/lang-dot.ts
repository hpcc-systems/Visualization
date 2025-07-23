// DOT language support for CodeMirror 6
// Simple implementation extending JavaScript for DOT syntax

import { LanguageSupport } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// DOT-specific highlighting style
const dotHighlighting = HighlightStyle.define([
  { tag: tags.keyword, color: "#5c6ac4", fontWeight: "bold" },
  { tag: tags.atom, color: "#0184bc" },
  { tag: tags.number, color: "#164" },
  { tag: tags.variableName, color: "#0070c1" },
  { tag: tags.function(tags.variableName), color: "#0070c1" },
  { tag: tags.string, color: "#a11" },
  { tag: tags.comment, color: "#998", fontStyle: "italic" },
  { tag: tags.meta, color: "#555" },
  { tag: tags.invalid, color: "#f00" },
  { tag: tags.operator, color: "#5c6ac4" },
  { tag: tags.bracket, color: "#5c6ac4" },
  { tag: tags.attributeName, color: "#795e26" },
]);

// Export the DOT language support function
export function dot() {
  // Use JavaScript as the base language for simple token parsing
  const jsLang = javascript();
  
  // Return language support with DOT-specific highlighting
  return new LanguageSupport(jsLang.language, [
    syntaxHighlighting(dotHighlighting)
  ]);
}