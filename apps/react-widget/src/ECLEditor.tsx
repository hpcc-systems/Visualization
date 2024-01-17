import React, { FunctionComponent, useEffect, useMemo } from "react";
import { ECLEditor } from "@hpcc-js/codemirror";
import { AutosizeHpccJSComponent, HpccJSComponent, useConst } from "./HpccJSAdapter";

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
    const editor = useConst(() => {
        return new ECLEditor()
            .on("changes", () => {
                onChange(editor.text());
            });
    });

    useEffect(() => {
        if (editor.text() !== text) {
            editor.text(text);
        }

        editor
            .readOnly(readonly)
            .lazyRender()
            ;
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
    const editor = useConst(() => {
        return new ECLEditor()
            .on("changes", () => {
                onChange(editor.text());
            });
    });

    useEffect(() => {
        if (editor.text() !== text) {
            editor.text(text);
        }

        editor
            .readOnly(readonly)
            .lazyRender()
            ;
    }, [editor, text, readonly]);

    return <AutosizeHpccJSComponent widget={editor} padding={4} />;
};

