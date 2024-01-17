import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect } from "react";
import { SizeMe } from "react-sizeme";
import type { Widget } from "@hpcc-js/common";

export function useId(prefix: string = "hpcc-js") {
    const id = `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
    return id;
}

export function useConst<T>(callback: () => T) {
    const ref = React.useRef<T>();
    if (!ref.current) {
        ref.current = callback();
    }
    return ref.current;
}

export interface HpccJSComponentProps {
    widget: Widget;
    width: number;
    height: number;
    debounce?: boolean;
}

export const HpccJSComponent: FunctionComponent<HpccJSComponentProps> = ({
    widget,
    width,
    height,
    debounce = true
}) => {
    const divID = useId();

    const setDivRef = useCallback(node => {
        widget?.target(node);
        if (node) {
            widget?.render();
        }
        return () => {
            widget?.target(null);
        };
    }, [widget]);

    useEffect(() => {
        if (widget?.target()) {
            widget.resize({ width, height });
            if (debounce) {
                widget.lazyRender();
            } else {
                widget.render();
            }
        }
    }, [debounce, height, widget, width]);

    return (isNaN(width) || isNaN(height) || width === 0 || height === 0) ?
        <></> :
        <div ref={setDivRef} id={divID} className="hpcc-js-component" style={{ width, height }}>
        </div>;
};

export interface AutosizeHpccJSComponentProps {
    widget: Widget;
    fixedHeight?: string;
    padding?: number;
    debounce?: boolean;
    hidden?: boolean;
}

export const AutosizeHpccJSComponent: FunctionComponent<PropsWithChildren<AutosizeHpccJSComponentProps>> = ({
    widget,
    fixedHeight = "100%",
    padding = 0,
    debounce = true,
    hidden = false,
    children
}) => {

    return <SizeMe monitorHeight>{({ size }) => {
        const width = size?.width || padding * 2;
        const height = size?.height || padding * 2;
        return <div style={{ width: "100%", height: hidden ? "1px" : fixedHeight, position: "relative" }}>
            <div style={{ position: "absolute", padding: `${padding}px`, display: hidden ? "none" : "block" }}>
                <HpccJSComponent widget={widget} debounce={debounce} width={width - padding * 2} height={height - padding * 2} />
            </div>
            {
                children ?
                    <div style={{ position: "absolute", padding: `${padding}px`, display: hidden ? "none" : "block" }}>
                        {children}
                    </div> :
                    <></>
            }
        </div>;
    }}
    </SizeMe>;
};

