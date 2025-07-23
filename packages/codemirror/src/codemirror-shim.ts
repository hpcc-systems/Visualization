// CodeMirror 6 imports and re-exports
import { EditorState, StateField, StateEffect, Extension } from "@codemirror/state";
import { EditorView, ViewUpdate, Decoration, DecorationSet, WidgetType, keymap, lineNumbers, gutter, gutterLineClass } from "@codemirror/view";
import { indentWithTab, defaultKeymap } from "@codemirror/commands";
import { search, searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { autocompletion, completionKeymap, CompletionSource, CompletionResult } from "@codemirror/autocomplete";
import { LanguageSupport, indentOnInput, bracketMatching } from "@codemirror/language";

// Language imports
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";
import { yaml } from "@codemirror/lang-yaml";

// Import our custom modes - TODO: Implement these for v6
// import "./mode/dot/dot.ts";
// import "./mode/markdown/markdown.ts";

// Basic theme
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// Define basic highlight style
const highlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#5c6ac4" },
  { tag: tags.atom, color: "#0184bc" },
  { tag: tags.number, color: "#164" },
  { tag: tags.definition(tags.variableName), color: "#0000ff" },
  { tag: tags.variableName, color: "#0070c1" },
  { tag: tags.function(tags.variableName), color: "#0070c1" },
  { tag: tags.string, color: "#a11" },
  { tag: tags.comment, color: "#998", fontStyle: "italic" },
  { tag: tags.meta, color: "#555" },
  { tag: tags.invalid, color: "#f00" }
]);

// Language mapping
export const languages = {
  "text/css": () => css(),
  "text/html": () => html(),
  "text/htmlmixed": () => html(),
  "text/javascript": () => javascript(),
  "application/json": () => json(),
  "text/x-markdown": () => markdown(),
  "text/x-sql": () => sql(),
  "application/xml": () => xml(),
  "text/xml": () => xml(),
  "text/x-yaml": () => yaml(),
  // ECL mode would need to be custom implemented
  "text/x-ecl": () => javascript(), // fallback to javascript for now
  // DOT mode would need to be custom implemented  
  "text/x-dot": () => javascript() // fallback to javascript for now
};

// CodeMirror v6 API wrapper to maintain some v5 compatibility
export class CodeMirror {
  public view: EditorView;
  public state: EditorState;
  private _domNode: Element;
  private _extensions: Extension[] = [];
  private _changeHandlers: Array<(update: ViewUpdate) => void> = [];

  constructor(element: Element, config: any = {}) {
    this._domNode = element;
    this._setupEditor(config);
  }

  private _setupEditor(config: any) {
    const extensions: Extension[] = [
      lineNumbers(),
      indentOnInput(),
      bracketMatching(),
      syntaxHighlighting(highlightStyle),
      keymap.of([
        indentWithTab,
        ...defaultKeymap,
        ...searchKeymap,
        ...completionKeymap
      ]),
      EditorView.updateListener.of((update: ViewUpdate) => {
        if (update.docChanged) {
          this._changeHandlers.forEach(handler => handler(update));
        }
      })
    ];

    // Add language support if mode is specified
    if (config.mode && languages[config.mode]) {
      extensions.push(languages[config.mode]());
    }

    // Add read-only if specified
    if (config.readOnly) {
      extensions.push(EditorState.readOnly.of(true));
    }

    // Add autocompletion if enabled
    if (config.extraKeys && config.extraKeys["Ctrl-Space"] === "autocomplete") {
      extensions.push(autocompletion());
    }

    // Add search if enabled
    extensions.push(search());

    // Store extensions for later modifications
    this._extensions = extensions;

    this.state = EditorState.create({
      doc: config.value || "",
      extensions
    });

    this.view = new EditorView({
      state: this.state,
      parent: this._domNode
    });
  }

  // v5 compatibility methods
  getValue(): string {
    return this.view.state.doc.toString();
  }

  setValue(value: string): void {
    const transaction = this.view.state.update({
      changes: { from: 0, to: this.view.state.doc.length, insert: value }
    });
    this.view.dispatch(transaction);
  }

  getDoc() {
    return {
      getValue: () => this.getValue(),
      setValue: (value: string) => this.setValue(value)
    };
  }

  on(eventType: string, handler: (cm: CodeMirror, changes?: any) => void): void {
    if (eventType === "changes") {
      this._changeHandlers.push(handler as any);
    }
  }

  setOption(option: string, value: any): void {
    // Handle common options that can be changed dynamically
    if (option === "readOnly") {
      const effects: StateEffect<any>[] = [];
      if (value) {
        effects.push(StateEffect.appendConfig.of(EditorState.readOnly.of(true)));
      }
      this.view.dispatch({ effects });
    }
    // Other options would require reconfiguring the editor
  }

  getOption(option: string): any {
    // Return default values for common options
    if (option === "readOnly") {
      return this.view.state.readOnly;
    }
    return undefined;
  }

  setCursor(line: number, ch: number): void {
    const pos = Math.min(this.view.state.doc.line(line + 1).from + ch, this.view.state.doc.length);
    this.view.dispatch({
      selection: { anchor: pos }
    });
  }

  focus(): void {
    this.view.focus();
  }

  hasFocus(): boolean {
    return this.view.hasFocus;
  }

  refresh(): void {
    // In v6, this is usually not needed as the view auto-updates
    this.view.requestMeasure();
  }

  setSize(width: number, height: number): void {
    this.view.dom.style.width = width + "px";
    this.view.dom.style.height = height + "px";
  }

  // Methods for text marking/highlighting
  markText(from: any, to: any, options: any = {}) {
    // This would need a more complex implementation with decorations
    return {
      clear: () => { /* TODO: implement */ }
    };
  }

  posFromIndex(index: number): { line: number, ch: number } {
    const line = this.view.state.doc.lineAt(index);
    return {
      line: line.number - 1, // v5 uses 0-based line numbers
      ch: index - line.from
    };
  }

  // Gutter methods (simplified)
  setGutterMarker(line: any, gutterID: string, element: Element | null): void {
    // This would need a more complex implementation with gutter extensions
  }

  addLineClass(line: any, where: string, className: string): void {
    // This would need implementation with line decorations
  }

  removeLineClass(line: any, where: string, className: string): void {
    // This would need implementation with line decorations
  }

  getLineHandle(lineNumber: number): any {
    return { lineNumber };
  }

  // Static methods for creating editors
  static fromTextArea(textarea: HTMLTextAreaElement, config: any = {}): CodeMirror {
    // Replace textarea with div
    const div = document.createElement("div");
    textarea.parentNode?.insertBefore(div, textarea);
    textarea.style.display = "none";
    
    // Get initial value from textarea
    config.value = textarea.value;
    
    const editor = new CodeMirror(div, config);
    
    // Update textarea when editor changes
    editor.on("changes", () => {
      textarea.value = editor.getValue();
    });
    
    return editor;
  }
}

// Export for compatibility
export default CodeMirror;
