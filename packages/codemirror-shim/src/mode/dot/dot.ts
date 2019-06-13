// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
// Orig source from:  https://raw.githubusercontent.com/inaimathi/CodeMirror/dot-mode/mode/dot/dot.js

import CodeMirror from "codemirror";

CodeMirror.defineMode("dot", function (config) {
    const ops = /--|->|=|;/;
    const brackets = /[\[\]{}]/;
    return {
        startState() {
            return { indent_level: 0 };
        },

        token(stream, state) {
            stream.eatSpace();

            switch (state.looking_for) {
                case "multiline-comment":
                    if (stream.match(/.*\*\//)) {
                        state.looking_for = null;
                    } else {
                        stream.skipToEnd();
                    }
                    return "comment";
                case "property":
                    if (stream.match("=")) {
                        return "variable-3";
                    } else {
                        stream.match(/\w+/);
                        state.looking_for = null;
                        return "string-2";
                    }
                case "graphname":
                    state.looking_for = null;
                    if (stream.match(/{\W*$/)) {
                        state.indent_level += 1;
                        return "bracket";
                    } else if (stream.match("{")) {
                        return "bracket";
                    } else if (stream.match(/[^\W]+/)) {
                        return "variable-2";
                    }
                default:
                    if (stream.match(/{\W*$/)) {
                        state.indent_level += 1;
                        return "bracket";
                    } else if (stream.match(/}\W*$/)) {
                        state.indent_level -= 1;
                        return "bracket";
                    } else if (stream.match(brackets)) {
                        return "bracket";
                    } else if (stream.match(/".*"/)) {
                        return "string";
                    } else if (stream.match(/\w+=[\"\w]+/, false)) {
                        state.looking_for = "property";
                        stream.match(/[^=]+/);
                        return "attribute";
                    } else if (stream.match(ops)) {
                        return "variable-3";
                    } else if (stream.match(/(di)?graph[^{\w]+/)) {
                        state.looking_for = "graphname";
                        return "keyword";
                    } else if (stream.match(/\/\/|#/)) {
                        stream.skipToEnd();
                        return "comment";
                    } else if (stream.match(/\/\*.*\*\//)) {
                        return "comment";
                    } else if (stream.match("/*")) {
                        state.looking_for = "multiline-comment";
                        return "comment";
                    } else if (stream.match(/\w+/)) {
                        return "variable";
                    } else {
                        stream.skipToEnd();
                        return "variable";
                    }
            }
        },

        indent(state, _textAfter) {
            return state.indent_level * (config.indentUnit || 2);
        },

        closeBrackets: { pairs: "[]{}\"\"" },
        lineComment: /(\/\/|#)/,
        blockCommentStart: "/*",
        blockCommentEnd: "*/"
    };
});

CodeMirror.defineMIME("text/x-dot", "dot");
