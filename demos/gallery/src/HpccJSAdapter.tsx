import * as React from "react";
import { Widget } from "@hpcc-js/common";

function useResizeObserver<T extends HTMLElement>(
    callback: (target: T, entry: ResizeObserverEntry) => void
) {
    const ref = React.useRef<T>(null);

    React.useLayoutEffect(() => {
        const element = ref?.current;

        if (!element) {
            return;
        }

        const observer = new ResizeObserver((entries) => {
            callback(element, entries[0]);
        });

        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [callback, ref]);

    return ref;
}

export interface HpccJSComponentProps {
    widget: Widget;
    width: number;
    height: number;
    debounce?: boolean;
}

export const HpccJSComponent: React.FunctionComponent<HpccJSComponentProps> = ({
    widget,
    width,
    height,
    debounce = true
}) => {
    const divID = React.useId();

    const setDivRef = React.useCallback((node: HTMLElement | null) => {
        widget?.target(node);
        if (node) {
            widget?.render();
        }
    }, [widget]);

    React.useEffect(() => {
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
    children?: React.ReactNode;
}

export const AutosizeHpccJSComponent: React.FunctionComponent<AutosizeHpccJSComponentProps> = ({
    widget,
    fixedHeight = "100%",
    padding = 0,
    debounce = true,
    hidden = false,
    children
}) => {

    const [width, setWidth] = React.useState(padding * 2);
    const [height, setHeight] = React.useState(padding * 2);

    const onResize = React.useCallback((target: HTMLDivElement) => {
        setWidth(target.clientWidth - (target.offsetLeft - (target.parentElement?.offsetLeft ?? 0)));
        setHeight(target.clientHeight - (target.offsetTop - (target.parentElement?.offsetTop ?? 0)));
    }, []);

    const ref = useResizeObserver(onResize);

    return <div ref={ref} style={{ width: "100%", height: hidden ? "1px" : fixedHeight, position: "relative" }}>
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
};
