import { Column } from "@hpcc-js/chart";
import { Palette } from "@hpcc-js/common";

var all_palettes = Column.prototype._palette.switch();

var widget = new Column()
    .target("target")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .paletteID(all_palettes[Math.floor(Math.random()*all_palettes.length)])
    .render()
    ;

setInterval(function(){
    widget
        .paletteID(all_palettes[Math.floor(Math.random()*all_palettes.length)]).render()
        ;
}, 1000)
