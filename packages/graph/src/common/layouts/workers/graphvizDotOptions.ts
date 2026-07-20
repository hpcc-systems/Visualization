export interface LayoutError {
    error?: string;
    errorDot?: string;
}

export interface LayoutSVG extends LayoutError {
    svg?: string;
}

export type LayoutSuccess = { svg: string };

export function isLayoutSuccess(item: any): item is LayoutSuccess {
    return (item as LayoutSuccess)?.svg !== undefined;
}
