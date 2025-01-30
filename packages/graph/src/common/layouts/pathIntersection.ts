export interface Pos {
    x: number;
    y: number;
}

export interface Segment {
    start: Pos;
    end: Pos;
}

export interface Rectangle {
    topLeft: Pos;
    topRight: Pos;
    bottomLeft: Pos;
    bottomRight: Pos;
}

export interface Rectangle2 {
    x: number;
    y: number;
    w: number;
    h: number;
}

function rectEdges(rect: Rectangle) {
    return [
        { start: rect.topLeft, end: rect.topRight },
        { start: rect.topRight, end: rect.bottomRight },
        { start: rect.bottomRight, end: rect.bottomLeft },
        { start: rect.bottomLeft, end: rect.topLeft }
    ];
}

function lineIntersection(segment1: Segment, segment2: Segment) {
    const { x: x1, y: y1 } = segment1.start;
    const { x: x2, y: y2 } = segment1.end;
    const { x: x3, y: y3 } = segment2.start;
    const { x: x4, y: y4 } = segment2.end;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom === 0) return null; // Parallel lines

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

    if (t > 0 && t < 1 && u > 0 && u < 1) {
        return {
            x: x1 + t * (x2 - x1),
            y: y1 + t * (y2 - y1)
        };
    }

    return null; // No intersection
}

export function intersection(rect: Rectangle2, line: Segment) {
    for (const edge of rectEdges({
        topLeft: { x: rect.x - rect.w / 2, y: rect.y - rect.h / 2 },
        topRight: { x: rect.x + rect.w / 2, y: rect.y - rect.h / 2 },
        bottomRight: { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 },
        bottomLeft: { x: rect.x - rect.w / 2, y: rect.y + rect.h / 2 }
    })) {
        const intersectionPoint = lineIntersection(edge, line);
        if (intersectionPoint) return intersectionPoint;
    }
    return null;
}
