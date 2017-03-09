import { Summary } from "../src/chart/Summary";
import { Sample } from "./data";

var summary = new Summary()
    .target("placeholder")
    .columns(Sample.DataBreach.columns)
    .data(Sample.DataBreach.data)
    ;

summary
    //.mappings([sankey.createColumn().column("Covered Entity Type"), sankey.createColumn().column("Type of Breach")])
    .render()
    ;
