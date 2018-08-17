import { Radar } from "@hpcc-js/chart";

new Radar()
    .target("target")
    .columns(["Stat", "Value"])
    .data([
        ["BULK APPERCEPTION", 14],
        ["CANDOR", 19],
        ["VIVACITY", 17],
        ["COORDINATION", 10],
        ["MEEKNESS", 2],
        ["HUMILITY", 3],
        ["CRUELTY", 1],
        ["SELF-PRESERVATION", 10],
        ["PATIENCE", 3],
        ["DECISIVENESS", 14],
        ["IMAGINATION", 13],
        ["CURIOSITY", 8],
        ["AGGRESSION", 5],
        ["LOYALTY", 16],
        ["EMPATHY", 9],
        ["TENACITY", 17],
        ["COURAGE", 15],
        ["SENSUALITY", 18],
        ["CHARM", 18],
        ["HUMOR", 9]
    ])
    .pointSize(12)
    .pointShape("circle")
    .fontFamily("Courier")
    .valueGuideRatios([
        0.10,
        0.20,
        0.30,
        0.40,
        0.50,
        0.60,
        0.70,
        0.80,
        0.90,
        1.00,
    ])
    .render()
    ;
