// ECL language support for CodeMirror 6
// Based on JavaScript with ECL-specific keywords and syntax

import { LanguageSupport } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// ECL-specific keywords and built-ins
const eclKeywords = [
  // Data types
  "INTEGER", "UNSIGNED", "REAL", "DECIMAL", "STRING", "QSTRING", "UNICODE", "UTF8",
  "DATA", "BOOLEAN", "SET", "DATASET", "RECORD", "LINKCOUNTED", "STREAMED",
  
  // Control structures
  "IF", "CHOOSE", "CASE", "MAP", "EVALUATE", "APPLY", "TRANSFORM", "PROJECT",
  "ITERATE", "LOOP", "WHILE", "UNTIL", "FOR", "PARALLEL",
  
  // Data operations
  "OUTPUT", "COUNT", "EXISTS", "SUM", "MAX", "MIN", "AVE", "VARIANCE", "COVARIANCE",
  "CORRELATION", "SORT", "SORTED", "GROUP", "GROUPED", "DEDUP", "ROLLUP", "TABLE",
  "JOIN", "MERGE", "COMBINE", "NORMALIZE", "DENORMALIZE", "FETCH", "ENTH",
  
  // File operations
  "INDEX", "KEY", "KEYED", "PAYLOAD", "STEPPED", "WILD", "OPT", "ATMOST",
  
  // String operations
  "LENGTH", "TRIM", "STRINGLIB", "REGEXFIND", "REGEXREPLACE",
  
  // Math operations
  "ABS", "ROUND", "TRUNCATE", "POWER", "SQRT", "EXP", "LN", "LOG",
  
  // Date/Time
  "WORKUNIT", "STORED", "PERSIST", "GLOBAL", "ONCE",
  
  // System
  "MODULE", "EXPORT", "SHARED", "IMPORT", "FUNCTION", "MACRO", "EMBEDDED",
  "SERVICE", "INTERFACE", "TYPE", "SCOPE", "VIRTUAL", "FORWARD",
  
  // Logical operators
  "AND", "OR", "NOT", "IN", "BETWEEN",
  
  // Constants
  "TRUE", "FALSE", "FAIL", "SUCCESS", "SKIP"
];

// Create a highlight style for ECL
const eclHighlighting = HighlightStyle.define([
  // Use JavaScript base highlighting
  { tag: tags.keyword, color: "#0000ff", fontWeight: "bold" },
  { tag: tags.atom, color: "#008080", fontWeight: "bold" },
  { tag: tags.string, color: "#008000" },
  { tag: tags.comment, color: "#808080", fontStyle: "italic" },
  { tag: tags.number, color: "#0000ff" },
  { tag: tags.operator, color: "#0000ff" },
  { tag: tags.variableName, color: "#000000" },
  { tag: tags.function(tags.variableName), color: "#795e26" },
  { tag: tags.typeName, color: "#267f99" },
  { tag: tags.propertyName, color: "#001080" },
]);

// Create a simple ECL language support by extending JavaScript
export function ecl() {
  // Start with JavaScript language support
  const jsLang = javascript();
  
  // Add ECL-specific highlighting
  const eclSupport = new LanguageSupport(jsLang.language, [
    syntaxHighlighting(eclHighlighting),
    // We could add more ECL-specific extensions here
  ]);
  
  return eclSupport;
}