import { geoAlbers, geoConicEqualArea, GeoStream } from "d3-geo";

// const d3Geo = _d3Geo.geo || _d3Geo.default || _d3Geo;

// Origonally ased on geohash.js
// Geohash library for Javascript
// (c) 2008 David Troy
// Distributed under the MIT License

export class Geohash {
    /* (Geohash-specific) Base32 map */
    private static base32 = "0123456789bcdefghjkmnpqrstuvwxyz";

    /**
     * Encodes latitude/longitude to geohash, either to specified precision or to automatically
     * evaluated precision.
     *
     * @param   {number} lat - Latitude in degrees.
     * @param   {number} lon - Longitude in degrees.
     * @param   {number} [precision] - Number of characters in resulting geohash.
     * @returns {string} Geohash of supplied latitude/longitude.
     * @throws  Invalid geohash.
     *
     * @example
     *     var geohash = Geohash.encode(52.205, 0.119, 7); // geohash: "u120fxw"
     */
    encode(lat, lon, precision) {
        // infer precision?
        if (typeof precision === "undefined") {
            // refine geohash until it matches precision of supplied lat/lon
            for (let p = 1; p <= 12; p++) {
                const hash = this.encode(lat, lon, p);
                const posn = this.decode(hash);
                if (posn.lat === lat && posn.lon === lon) return hash;
            }
            precision = 12; // set to maximum
        }

        lat = Number(lat);
        lon = Number(lon);
        precision = Number(precision);

        if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error("Invalid geohash");

        let idx = 0; // index into base32 map
        let bit = 0; // each char holds 5 bits
        let evenBit = true;
        let geohash = "";

        let latMin = -90;
        let latMax = 90;
        let lonMin = -180;
        let lonMax = 180;

        while (geohash.length < precision) {
            if (evenBit) {
                // bisect E-W longitude
                const lonMid = (lonMin + lonMax) / 2;
                if (lon > lonMid) {
                    idx = idx * 2 + 1;
                    lonMin = lonMid;
                } else {
                    idx = idx * 2;
                    lonMax = lonMid;
                }
            } else {
                // bisect N-S latitude
                const latMid = (latMin + latMax) / 2;
                if (lat > latMid) {
                    idx = idx * 2 + 1;
                    latMin = latMid;
                } else {
                    idx = idx * 2;
                    latMax = latMid;
                }
            }
            evenBit = !evenBit;

            if (++bit === 5) {
                // 5 bits gives us a character: append it and start over
                geohash += Geohash.base32.charAt(idx);
                bit = 0;
                idx = 0;
            }
        }

        return geohash;
    }

    /**
     * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
     *     to reasonable precision).
     *
     * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
     * @returns {{lat:number, lon:number}} (Center of) geohashed location.
     * @throws  Invalid geohash.
     *
     * @example
     *     var latlon = Geohash.decode("u120fxw"); // latlon: { lat: 52.205, lon: 0.1188 }
     */
    decode(geohash) {

        const bounds = this.bounds(geohash); // <-- the hard work
        // now just determine the centre of the cell...

        const latMin = bounds.sw.lat;
        const lonMin = bounds.sw.lon;
        const latMax = bounds.ne.lat;
        const lonMax = bounds.ne.lon;

        // cell centre
        let lat = (latMin + latMax) / 2;
        let lon = (lonMin + lonMax) / 2;

        // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
        lat = Number(lat.toFixed(Math.floor(2 - Math.log(latMax - latMin) / Math.LN10)));
        lon = Number(lon.toFixed(Math.floor(2 - Math.log(lonMax - lonMin) / Math.LN10)));

        return { lat, lon };
    }

    /**
     * Returns SW/NE latitude/longitude bounds of specified geohash.
     *
     * @param   {string} geohash - Cell that bounds are required of.
     * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
     * @throws  Invalid geohash.
     */
    bounds(geohash) {
        if (geohash.length === 0) throw new Error("Invalid geohash");

        geohash = geohash.toLowerCase();

        let evenBit = true;
        let latMin = -90;
        let latMax = 90;
        let lonMin = -180;
        let lonMax = 180;

        for (let i = 0; i < geohash.length; i++) {
            const chr = geohash.charAt(i);
            const idx = Geohash.base32.indexOf(chr);
            if (idx === -1) throw new Error("Invalid geohash");

            for (let n = 4; n >= 0; n--) {
                // tslint:disable-next-line:no-bitwise
                const bitN = idx >> n & 1;
                if (evenBit) {
                    // longitude
                    const lonMid = (lonMin + lonMax) / 2;
                    if (bitN === 1) {
                        lonMin = lonMid;
                    } else {
                        lonMax = lonMid;
                    }
                } else {
                    // latitude
                    const latMid = (latMin + latMax) / 2;
                    if (bitN === 1) {
                        latMin = latMid;
                    } else {
                        latMax = latMid;
                    }
                }
                evenBit = !evenBit;
            }
        }

        const bounds = {
            sw: { lat: latMin, lon: lonMin },
            ne: { lat: latMax, lon: lonMax }
        };

        return bounds;
    }

    /**
     * Determines adjacent cell in given direction.
     *
     * @param   geohash - Cell to which adjacent cell is required.
     * @param   direction - Direction from geohash (N/S/E/W).
     * @returns {string} Geocode of adjacent cell.
     * @throws  Invalid geohash.
     */
    adjacent(geohash, direction) {
        // based on github.com/davetroy/geohash-js

        geohash = geohash.toLowerCase();
        direction = direction.toLowerCase();

        if (geohash.length === 0) throw new Error("Invalid geohash");
        if ("nsew".indexOf(direction) === -1) throw new Error("Invalid direction");

        const neighbour = {
            n: ["p0r21436x8zb9dcf5h7kjnmqesgutwvy", "bc01fg45238967deuvhjyznpkmstqrwx"],
            s: ["14365h7k9dcfesgujnmqp0r2twvyx8zb", "238967debc01fg45kmstqrwxuvhjyznp"],
            e: ["bc01fg45238967deuvhjyznpkmstqrwx", "p0r21436x8zb9dcf5h7kjnmqesgutwvy"],
            w: ["238967debc01fg45kmstqrwxuvhjyznp", "14365h7k9dcfesgujnmqp0r2twvyx8zb"]
        };
        const border = {
            n: ["prxz", "bcfguvyz"],
            s: ["028b", "0145hjnp"],
            e: ["bcfguvyz", "prxz"],
            w: ["0145hjnp", "028b"]
        };

        const lastCh = geohash.slice(-1);    // last character of hash
        let parent = geohash.slice(0, -1); // hash without last character

        const type = geohash.length % 2;

        // check for edge-cases which don"t share common prefix
        if (border[direction][type].indexOf(lastCh) !== -1 && parent !== "") {
            parent = this.adjacent(parent, direction);
        }

        // append letter for direction to parent
        return parent + Geohash.base32.charAt(neighbour[direction][type].indexOf(lastCh));
    }

    /**
     * Returns all 8 adjacent cells to specified geohash.
     *
     * @param   {string} geohash - Geohash neighbours are required of.
     * @returns {{n,ne,e,se,s,sw,w,nw: string}}
     * @throws  Invalid geohash.
     */
    neighbours(geohash) {
        return {
            n: this.adjacent(geohash, "n"),
            ne: this.adjacent(this.adjacent(geohash, "n"), "e"),
            e: this.adjacent(geohash, "e"),
            se: this.adjacent(this.adjacent(geohash, "s"), "e"),
            s: this.adjacent(geohash, "s"),
            sw: this.adjacent(this.adjacent(geohash, "s"), "w"),
            w: this.adjacent(geohash, "w"),
            nw: this.adjacent(this.adjacent(geohash, "n"), "w")
        };
    }

    //  HPCC Extensions  ---
    contained(w, n, e, s, precision) {
        if (isNaN(n) || n >= 90) n = 89;
        if (isNaN(e) || e > 180) e = 180;
        if (isNaN(s) || s <= -90) s = -89;
        if (isNaN(w) || w < -180) w = -180;
        precision = precision || 1;
        const geoHashNW = this.encode(n, w, precision);
        const geoHashNE = this.encode(n, e, precision);
        const geoHashSE = this.encode(s, e, precision);
        let currRowHash = geoHashNW;
        let col = 0;
        let maxCol = -1;
        const geoHashes = [geoHashNW, geoHashSE];
        let currHash = this.adjacent(geoHashNW, "e");
        while (currHash !== geoHashSE) {
            geoHashes.push(currHash);
            ++col;
            if (currHash === geoHashNE || maxCol === col) {
                maxCol = col + 1;
                col = 0;
                currHash = this.adjacent(currRowHash, "s");
                currRowHash = currHash;
            } else {
                currHash = this.adjacent(currHash, "e");
            }
        }
        return geoHashes;
    }

    calculateWidthDegrees(n) {
        let a;
        if (n % 2 === 0)
            a = -1;
        else
            a = -0.5;
        const result = 180 / Math.pow(2, 2.5 * n + a);
        return result;
    }

    width(n) {
        const parity = n % 2;
        // tslint:disable-next-line:no-bitwise
        return 180 / (2 ^ (((5 * n + parity) / 2) - 1));
    }

}

// A modified d3.geo.albersUsa to include Puerto Rico.
export function albersUsaPr() {
    const ε = 1e-6;

    const lower48 = geoAlbers();

    // EPSG:3338
    const alaska = geoConicEqualArea()
        .rotate([154, 0])
        .center([-2, 58.5])
        .parallels([55, 65]);

    // ESRI:102007
    const hawaii = geoConicEqualArea()
        .rotate([157, 0])
        .center([-3, 19.9])
        .parallels([8, 18]);

    // XXX? You should check that this is a standard PR projection!
    const puertoRico = geoConicEqualArea()
        .rotate([66, 0])
        .center([0, 18])
        .parallels([8, 18]);

    let point;
    const pointStream = { point: (x, y) => { point = [x, y]; } } as GeoStream;
    let lower48Point;
    let alaskaPoint;
    let hawaiiPoint;
    let puertoRicoPoint;

    const albersUsa: any = function (coordinates) {
        const x = coordinates[0];
        const y = coordinates[1];
        point = null;
        (lower48Point(x, y), point) ||
            (alaskaPoint(x, y), point) ||
            (hawaiiPoint(x, y), point) ||
            (puertoRicoPoint(x, y), point); // jshint ignore:line
        return point;
    };

    albersUsa.invert = function (coordinates) {
        const k = lower48.scale();
        const t = lower48.translate();
        const x = (coordinates[0] - t[0]) / k;
        const y = (coordinates[1] - t[1]) / k;
        return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
            : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
                : y >= 0.204 && y < 0.234 && x >= 0.320 && x < 0.380 ? puertoRico
                    : lower48).invert(coordinates);
    };

    // A naïve multi-projection stream.
    // The projections must have mutually exclusive clip regions on the sphere,
    // as this will avoid emitting interleaving lines and polygons.
    albersUsa.stream = function (stream) {
        const lower48Stream = lower48.stream(stream);
        const alaskaStream = alaska.stream(stream);
        const hawaiiStream = hawaii.stream(stream);
        const puertoRicoStream = puertoRico.stream(stream);
        return {
            point: (x, y) => {
                lower48Stream.point(x, y);
                alaskaStream.point(x, y);
                hawaiiStream.point(x, y);
                puertoRicoStream.point(x, y);
            },
            sphere: () => {
                lower48Stream.sphere();
                alaskaStream.sphere();
                hawaiiStream.sphere();
                puertoRicoStream.sphere();
            },
            lineStart: () => {
                lower48Stream.lineStart();
                alaskaStream.lineStart();
                hawaiiStream.lineStart();
                puertoRicoStream.lineStart();
            },
            lineEnd: () => {
                lower48Stream.lineEnd();
                alaskaStream.lineEnd();
                hawaiiStream.lineEnd();
                puertoRicoStream.lineEnd();
            },
            polygonStart: () => {
                lower48Stream.polygonStart();
                alaskaStream.polygonStart();
                hawaiiStream.polygonStart();
                puertoRicoStream.polygonStart();
            },
            polygonEnd: () => {
                lower48Stream.polygonEnd();
                alaskaStream.polygonEnd();
                hawaiiStream.polygonEnd();
                puertoRicoStream.polygonEnd();
            }
        };
    };

    albersUsa.precision = function (_) {
        if (!arguments.length) return lower48.precision();
        lower48.precision(_);
        alaska.precision(_);
        hawaii.precision(_);
        puertoRico.precision(_);
        return albersUsa;
    };

    albersUsa.scale = function (_) {
        if (!arguments.length) return lower48.scale();
        lower48.scale(_);
        alaska.scale(_ * 0.35);
        hawaii.scale(_);
        puertoRico.scale(_);
        return albersUsa.translate(lower48.translate());
    };

    albersUsa.translate = function (_) {
        if (!arguments.length) return lower48.translate();
        const k = lower48.scale();
        const x = +_[0];
        const y = +_[1];

        lower48Point = lower48
            .translate(_)
            .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
            .stream(pointStream).point;

        alaskaPoint = alaska
            .translate([x - 0.307 * k, y + 0.201 * k])
            .clipExtent([[x - 0.425 * k + ε, y + 0.120 * k + ε], [x - 0.214 * k - ε, y + 0.234 * k - ε]])
            .stream(pointStream).point;

        hawaiiPoint = hawaii
            .translate([x - 0.205 * k, y + 0.212 * k])
            .clipExtent([[x - 0.214 * k + ε, y + 0.166 * k + ε], [x - 0.115 * k - ε, y + 0.234 * k - ε]])
            .stream(pointStream).point;

        puertoRicoPoint = puertoRico
            .translate([x + 0.350 * k, y + 0.224 * k])
            .clipExtent([[x + 0.320 * k, y + 0.204 * k], [x + 0.380 * k, y + 0.234 * k]])
            .stream(pointStream).point;

        return albersUsa;
    };

    return albersUsa.scale(1070);
}
