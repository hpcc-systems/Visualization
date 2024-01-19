import React, { FunctionComponent, useEffect, useState } from "react";
import { AutosizeHpccJSComponent, HpccJSComponent } from "./HpccJSAdapter";
import type { ECLEditor } from "@hpcc-js/codemirror";

interface ECLEditorComponentProps {
    text?: string;
    width: number;
    height: number;
    readonly?: boolean;
    onChange?: (text: string) => void;
}

export const ECLEditorComponent: FunctionComponent<ECLEditorComponentProps> = ({
    text = "",
    width,
    height,
    readonly = false,
    onChange = (text: string) => { }
}) => {
    const [editor, setEditor] = useState<ECLEditor>();
    useEffect(() => {
        import("@hpcc-js/codemirror").then(({ ECLEditor }) => {
            const editor = new ECLEditor()
                .on("changes", () => {
                    onChange(editor.text());
                });

            setEditor(editor);
        });
    }, []);

    useEffect(() => {
        if (editor) {
            if (editor.text() !== text) {
                editor.text(text);
            }

            editor
                .readOnly(readonly)
                .lazyRender()
                ;
        }
    }, [editor, text, readonly]);

    return <HpccJSComponent widget={editor} width={width} height={height} />;
};

interface AutosizeECLEditorComponentProps {
    text?: string;
    readonly?: boolean;
    onChange?: (text: string) => void;
}

export const AutosizeECLEditorComponent: FunctionComponent<AutosizeECLEditorComponentProps> = ({
    text = "",
    readonly = false,
    onChange = (text: string) => { }
}) => {
    const [editor, setEditor] = useState<ECLEditor>();
    useEffect(() => {
        import("@hpcc-js/codemirror").then(({ ECLEditor }) => {
            const editor = new ECLEditor()
                .on("changes", () => {
                    debugger;
                    onChange(editor.text());
                });
            setEditor(editor);
        });
    }, []);

    useEffect(() => {
        if (editor) {
            if (editor.text() !== text) {
                editor.text(text);
            }

            editor
                .readOnly(readonly)
                .lazyRender()
                ;
        }
    }, [editor, text, readonly]);

    return <AutosizeHpccJSComponent widget={editor} padding={4} />;
};

