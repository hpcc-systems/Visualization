/* alphanum.js (C) Brian Huisman
 * Based on the Alphanum Algorithm by David Koelle
 * The Alphanum Algorithm is discussed at http://www.DaveKoelle.com
 *
 * Distributed under same license as original
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

/* ********************************************************************
 * Alphanum sort() function version - case sensitive
 *  - Slower, but easier to modify for arrays of objects which contain
 *    string properties
 *
 */
export function alphanum(a, b) {
    function chunkify(t) {
        const tz = [];
        let x = 0;
        let y = -1;
        let n = false;
        let i;
        let j;

        // eslint-disable-next-line no-cond-assign
        while (i = (j = t.charAt(x++)).charCodeAt(0)) {
            // tslint:disable-next-line: triple-equals
            const m = (i == 46 || (i >= 48 && i <= 57));
            if (m !== n) {
                tz[++y] = "";
                n = m;
            }
            tz[y] += j;
        }
        return tz;
    }

    const aa = chunkify(a);
    const bb = chunkify(b);

    for (let x = 0; aa[x] && bb[x]; x++) {
        if (aa[x] !== bb[x]) {
            const c = Number(aa[x]);
            const d = Number(bb[x]);
            // tslint:disable-next-line: triple-equals
            if (c == aa[x] && d == bb[x]) {
                return c - d;
            } else return (aa[x] > bb[x]) ? 1 : -1;
        }
    }
    return aa.length - bb.length;
}

/* ********************************************************************
 * Alphanum sort() function version - case insensitive
 *  - Slower, but easier to modify for arrays of objects which contain
 *    string properties
 *
 */
export function alphanumCase(a, b) {
    function chunkify(t) {
        const tz = [];
        let x = 0;
        let y = -1;
        let n = false;
        let i;
        let j;

        // eslint-disable-next-line no-cond-assign
        while (i = (j = t.charAt(x++)).charCodeAt(0)) {
            // tslint:disable-next-line: triple-equals
            const m = (i == 46 || (i >= 48 && i <= 57));    // jshint ignore:line
            if (m !== n) {
                tz[++y] = "";
                n = m;
            }
            tz[y] += j;
        }
        return tz;
    }

    const aa = chunkify(a.toLowerCase());
    const bb = chunkify(b.toLowerCase());

    for (let x = 0; aa[x] && bb[x]; x++) {
        if (aa[x] !== bb[x]) {
            const c = Number(aa[x]);
            const d = Number(bb[x]);
            // tslint:disable-next-line: triple-equals
            if (c == aa[x] && d == bb[x]) {   // jshint ignore:line
                return c - d;
            } else return (aa[x] > bb[x]) ? 1 : -1;
        }
    }
    return aa.length - bb.length;
}
