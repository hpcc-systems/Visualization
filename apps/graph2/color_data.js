function getData(options) {
    let id = 0;
    let id2 = 0;

    const data = {
        vertices: [],
        edges: []
    };
    const dataMap = {};
    const arr = options.color_values;
    // const arr = [...Array(64)].map((n,i)=>((i+1)*32)).filter(n=>n<=255);
    // const arr = [32, 64, 96, 140, 160, 192]; // 216 vertices (and 1620 edges with threshold 0.5)
    // const arr = [0, 32, 64, 128, 255]; // 125 vertices (and 750 edges with threshold 0.5)
    // const arr = [0, 64, 128, 255]; // 64 vertices (and 288 edges with threshold 0.5)
    // const arr = [0, 128, 255]; // 27 vertices (and 81 edges with threshold 0.5)
    arr.forEach((r, i) => {
        arr.forEach((g, i) => {
            arr.forEach((b, i) => {
                arr.forEach((r2, i) => {
                    arr.forEach((g2, i) => {
                        arr.forEach((b2, i) => {
                            if (r === r2 && g === g2 && b ===
                                b2) {
                                // take a break and do nothing
                            } else {
                                let d = {
                                    id,
                                    text: `rgb(${[r,g,b].join(",")})`,
                                    width: options.square_size,
                                    height: options.square_size,
                                    fill: `rgb(${[r,g,b].join(",")})`
                                };
                                if (!dataMap[d.text]) {
                                    data.vertices.push(d);
                                    dataMap[d.text] = d;
                                }
                                id++;
                                let d2 = {
                                    id,
                                    text: `rgb(${[r2,g2,b2].join(",")})`,
                                    width: options.square_size,
                                    height: options.square_size,
                                    fill: `rgb(${[r2,g2,b2].join(",")})`
                                };
                                if (!dataMap[d2.text]) {
                                    data.vertices.push(d2);
                                    dataMap[d2.text] = d2;
                                }
                                id++;
                                const score = score_colors(
                                    options.score_mode,
                                    [r, g, b],
                                    [r2, g2, b2]
                                );
                                const key =
                                    `${d.text}_${d2.text}`;
                                const key2 =
                                    `${d2.text}_${d.text}`;
                                if (score >
                                    options.sameness_threshold && !
                                    dataMap[key] && !dataMap[
                                        key2]) {
                                    d = dataMap[d.text];
                                    d2 = dataMap[d2.text];
                                    data.edges.push({
                                        id: id2,
                                        text: `${[r2,g2,b2].join(":")}`,
                                        source: d,
                                        target: d2
                                    })
                                    id2++;
                                    dataMap[key] = 1;
                                    dataMap[key2] = 1;
                                }
                            }
                        });
                    });
                });
            });
        });
    });

    // return {vertices:[],edges:[]};
    return data;

}

function standardize_color(str) {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = str;
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
}

function rgb_to_hsl([r, g, b]) {
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return {
        h,
        s,
        l
    };
}
function score_colors(mode, _a, _b) {
    const hsl = rgb_to_hsl(_a);
    const hsl2 = rgb_to_hsl(_b);
    const results = {
        rgb_diffs: {
            r: 1 / (1 + Math.abs(_a[0] - _b[0])),
            g: 1 / (1 + Math.abs(_a[1] - _b[1])),
            b: 1 / (1 + Math.abs(_a[2] - _b[2]))
        },
        hsl_diffs: {
            h: 1 / (1 + Math.abs(hsl.h - hsl2.h)),
            s: 1 / (1 + Math.abs(hsl.s - hsl2.s)),
            l: 1 / (1 + Math.abs(hsl.l - hsl2.l))
        }
    };
    switch (mode) {
        case "rgb-avg":
            return (
                results.rgb_diffs.r +
                results.rgb_diffs.g +
                results.rgb_diffs.b
            ) / 3;
        case "rgb-h-avg":
            return (
                results.hsl_diffs.h +
                results.rgb_diffs.r +
                results.rgb_diffs.g +
                results.rgb_diffs.b
            ) / 4;
        case "h-only":
            return results.hsl_diffs.h;
        case "s-only":
            return results.hsl_diffs.s;
        case "l-only":
            return results.hsl_diffs.l;
    }
}