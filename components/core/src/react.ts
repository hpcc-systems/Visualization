import type { CSSProperties, DOMAttributes } from "react";

type CustomEvents<K extends string> = { [key in K]: (event: CustomEvent) => void };
type CustomElement<T extends HTMLElement> = Omit<T & DOMAttributes<T>, "style"> & { style?: CSSProperties | undefined, children: any };
export type WebComponent<T extends HTMLElement, K extends string = ""> = Partial<CustomElement<T> & CustomEvents<`on${K}`>>;
