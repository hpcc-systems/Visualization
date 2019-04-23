/**
 * degreesToRadians - converts degrees to radians
 * Usage: degreesToRadians(1080);
 *
 * @param degrees
 * @returns Number radians
 */
export function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * radiansToDegrees - converts radians to degrees
 * Usage: radiansToDegrees(7);
 *
 * @param radians
 * @returns Number degreees
 */
export function radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
}

/**
 * normalizeRadians - normalizes a radian value to within the provided range
 * Usage: normalizeRadians(7);
 *
 * @param radians value to be normalized
 * @param min lower limit
 * @param max upper limit
 * @returns Number normalized to within the provided range
 */
export function normalizeRadians(radians: number, min: number = -Math.PI, max: number = Math.PI): number {
    return normalize(radians, min, max);
}

/**
 * normalizeDegrees - normalizes a degree value to within the provided range
 * Usage: normalizeDegrees(1080);
 *
 * @param degrees value to be normalized
 * @param min lower limit
 * @param max upper limit
 * @returns Number normalized to within the provided range
 */
export function normalizeDegrees(degrees: number, min: number = -180, max: number = 180): number {
    return normalize(degrees, min, max);
}

/**
 * normalize - normalizes a value to within the provided range
 * Usage: normalize(1000, 0, 365);
 *
 * @param value value to be normalized
 * @param min lower limit
 * @param max upper limit
 * @returns Number normalized to within the provided range
 */
export function normalize(value: number, min: number, max: number): number {
    const spread = max - min;
    const offsetValue = value - min;
    return (offsetValue - (Math.floor(offsetValue / spread) * spread)) + min;
}

export type PointXY = [number, number];

/**
 * pointInPolygon - returns true if point is within the polygon
 * Usage: pointInPolygon([1,1],[[0,0],[0,10],[10,10],[10,0]]);
 *
 * @param point point being tested against polygon
 * @param polygon polygon being tested against point
 * @returns Boolean representing whether or not the point is within the polygon
 */
export function pointInPolygon(point: PointXY, polygon: PointXY[]): boolean {
    const [x, y] = point;
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0];
        const yi = polygon[i][1];
        const xj = polygon[j][0];
        const yj = polygon[j][1];
        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }
    return isInside;
}
