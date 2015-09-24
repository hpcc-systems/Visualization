"use strict";
function getProperName(name) {
    switch(name) {
        case "common":
            return "Common Widgets";
        case "amchart":
            return "AM Charts";
        case "chart":
            return "HPPC Charts";
        case "google":
            return "Google Charts";
        case "marshaller":
            return "Marshallers";
        case "c3chart":
            return "C3 Charts";
        case "map":
            return "Maps";
        case "tree":
            return "Tree Charts";
        case "graph":
            return "Graph Widgets";
        case "form":
            return "Form Widgets";
        case "other":
            return "Other Widgets";
        case "layout":
            return "Layout Widgets";
        default:
            return null;
    }
}
