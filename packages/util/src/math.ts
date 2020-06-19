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
 * polarToCartesian - converts (r, theta) to {x, y}
 * Usage: polarToCartesian(5, Math.PI);
 *
 * @param r radius
 * @param theta angle in radians
 * @returns { x: number, y: number }
 */
export function polarToCartesian(r: number, theta: number): { x:number, y:number } {
    return {
        x: r * Math.cos(theta),
        y: r * Math.sin(theta)
    };
}

/**
 * cartesianToPolar - converts (x, y) to {r, theta}
 * Usage: cartesianToPolar(100, 200);
 *
 * @param x
 * @param y
 * @returns { r: number, theta: number }
 */
export function cartesianToPolar(x: number, y: number): { r: number, theta: number } {
    return {
        r: Math.sqrt(x * x + y * y),
        theta: Math.atan2(y, x)
    };
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
