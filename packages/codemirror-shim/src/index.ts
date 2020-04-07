export * from "./__package__";
import "codemirror/mode/css/css";
import "codemirror/mode/ecl/ecl";
import "codemirror/mode/gfm/gfm";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "./mode/dot/dot";
import "./mode/markdown/markdown";

import "codemirror/lib/codemirror.css";

import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/indent-fold";
import "codemirror/addon/fold/xml-fold";

import "codemirror/addon/fold/foldgutter.css";

import CodeMirror from "codemirror";
export { CodeMirror };
