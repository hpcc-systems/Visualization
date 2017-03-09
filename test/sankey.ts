import { Sankey, Column as SankeyColumn } from "../src/graph/Sankey";
import { Sample } from "./data";

var sankey = new Sankey()
    .target("placeholder")
    .columns(Sample.DataBreach.columns)
    .data(Sample.DataBreach.data)
    ;

sankey
    .mappings([sankey.createColumn().column("Covered Entity Type"), sankey.createColumn().column("Type of Breach")])
    .render()
    ;
