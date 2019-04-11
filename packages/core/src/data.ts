export type TwoD = { title?: string, column: string };
export type TwoDRow = { label: string, value: number, __lparam?: any };

export type MultiD = { title?: string, columns: string[] };
export type MultiDRow = { label: string, values: number[], __lparam?: any };

export type Hiararchy = { title?: string, leaf: string };
export type HiararchyRow = { label: string, value: number, children?: HiararchyRow[], __lparam?: any };
