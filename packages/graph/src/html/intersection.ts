export interface Pos {
    x: number;
    y: number;
}

export interface Extent {
    width: number;
    height: number;
}

export interface Segment {
    start: Pos;
    end: Pos;
}

export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

function segmentSegment(s1: Segment, s2: Segment): Pos | undefined {
    const { x: x1, y: y1 } = s1.start;
    const { x: x2, y: y2 } = s1.end;
    const { x: x3, y: y3 } = s2.start;
    const { x: x4, y: y4 } = s2.end;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom === 0) {
        // Parallel lines  ---
        return undefined;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

    if (t > 0 && t < 1 && u > 0 && u < 1) {
        return {
            x: x1 + t * (x2 - x1),
            y: y1 + t * (y2 - y1)
        };
    }

    return undefined;
}

function rectEdges(rect: Rectangle): Segment[] {
    const r = {
        topLeft: { x: rect.x - rect.width / 2, y: rect.y - rect.height / 2 },
        topRight: { x: rect.x + rect.width / 2, y: rect.y - rect.height / 2 },
        bottomRight: { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 },
        bottomLeft: { x: rect.x - rect.width / 2, y: rect.y + rect.height / 2 }
    };
    return [
        { start: r.bottomLeft, end: r.topLeft },
        { start: r.topLeft, end: r.topRight },
        { start: r.topRight, end: r.bottomRight },
        { start: r.bottomRight, end: r.bottomLeft },
    ];
}

export function rectangleSegment(rect: Rectangle, line: Segment): Pos | undefined {
    for (const edge of rectEdges(rect)) {
        const intersectionPoint = segmentSegment(edge, line);
        if (intersectionPoint) {
            return intersectionPoint;
        }
    }
    return undefined;
}

function sortSegment(pos: Pos, line: Segment): Segment {
    const distStart = Math.hypot(line.start.x - pos.x, line.start.y - pos.y);
    const distEnd = Math.hypot(line.end.x - pos.x, line.end.y - pos.y);

    if (distStart <= distEnd) {
        return line;
    } else {
        return { start: line.end, end: line.start };
    }
}

export function circleSegment(pos: Pos, r: number, line: Segment): Pos | undefined {
    line = sortSegment(pos, line);
    const { x: x1, y: y1 } = line.start;
    const { x: x2, y: y2 } = line.end;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const a = dx * dx + dy * dy;
    const b = 2 * (dx * (x1 - pos.x) + dy * (y1 - pos.y));
    const c = (x1 - pos.x) * (x1 - pos.x) + (y1 - pos.y) * (y1 - pos.y) - r * r;

    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return undefined;
    }

    const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);

    if (t1 >= 0 && t1 <= 1) {
        return {
            x: x1 + t1 * dx,
            y: y1 + t1 * dy
        };
    }
}
