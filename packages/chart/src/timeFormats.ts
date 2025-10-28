import { timeFormat } from "d3-time-format";

/**
 * Adaptive 24-hour multi-scale tick formatter.
 * Order of precedence (first predicate that matches):
 *  milliseconds -> seconds -> minutes -> hours -> day -> month -> year.
 */
export function multiScale24Hours(): (d: Date) => string {
    const fmtMs = timeFormat(".%L");
    const fmtSec = timeFormat(":%S");
    const fmtMin = timeFormat("%H:%M");
    const fmtHour = timeFormat("%H:00");
    const fmtDay = timeFormat("%b %d");
    const fmtMonth = timeFormat("%b");
    const fmtYear = timeFormat("%Y");

    return (d: Date): string => {
        if (d.getMilliseconds() !== 0) return fmtMs(d);
        if (d.getSeconds() !== 0) return fmtSec(d);
        if (d.getMinutes() !== 0) return fmtMin(d);
        if (d.getHours() !== 0) return fmtHour(d);
        if (d.getDate() !== 1) return fmtDay(d);
        if (d.getMonth() !== 0) return fmtMonth(d);
        return fmtYear(d);
    };
}
