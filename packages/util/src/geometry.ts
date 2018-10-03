/**
 * radiansToDegrees - converts radians to degrees
 * Usage: radiansToDegrees(3)
 *
 * @param radians radians to be converted to degrees
 */
export function radiansToDegrees(radians: number): number {
    return radians * 180 / Math.PI;
}

/**
 * degreesToRadians - converts degrees to radians
 * Usage: degreesToRadians(90)
 *
 * @param degrees degrees to be converted to radians
 */
export function degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

/**
 * getPartialPieDimensions - return bounding box height and width of a partial pie
 * Usage: getPartialPieDimensions(45, 180, 500)
 *
 * @param start starting degree of partial pie
 * @param end ending degree of partial pie
 * @param radius radius of partial pie
 */
export function getPartialPieDimensions(start: number, end: number, radius: number): { width: number, height: number } {
    const firstAngle = degreesToRadians(start);
    const lastAngle = degreesToRadians(end);
    const x1 = radius * Math.cos(firstAngle);
    const x2 = radius * Math.cos(lastAngle);
    const y1 = radius * Math.sin(firstAngle);
    const y2 = radius * Math.sin(lastAngle);
    const point_arr = [];
    if (firstAngle <= Math.PI * 0.5 && lastAngle >= Math.PI * 0.5) point_arr.push([0, radius]);
    if (firstAngle <= Math.PI * 1.0 && lastAngle >= Math.PI * 1.0) point_arr.push([-radius, 0]);
    if (firstAngle <= Math.PI * 1.5 && lastAngle >= Math.PI * 1.5) point_arr.push([0, -radius]);
    if (firstAngle <= Math.PI * 2.0 && lastAngle >= Math.PI * 2.0) point_arr.push([radius, 0]);
    point_arr.push([x1, y1]);
    point_arr.push([x2, y2]);
    point_arr.push([0, 0]);
    const x_arr = point_arr.map(n => n[0]);
    const y_arr = point_arr.map(n => n[1]);
    const minX = Math.min(...x_arr);
    const minY = Math.min(...y_arr);
    const maxX = Math.max(...x_arr);
    const maxY = Math.max(...y_arr);
    return {
        width: maxX - minX,
        height: maxY - minY
    };
}
