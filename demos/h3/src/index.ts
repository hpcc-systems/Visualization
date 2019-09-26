import { TabPanel } from "@hpcc-js/phosphor";
import { H3Polygons } from "./h3Polygons";
import { H3Region } from "./h3Region";
import { RoxieRegion } from "./roxieRegion";
import { RoxieSummary } from "./roxieSummary";
import { RoxieSummaryDeck } from "./roxieSummaryDeck";
import { RoxieSummaryRegion } from "./roxieSummaryRegion";

export class App extends TabPanel {

    constructor() {
        super();
        this.addWidget(new H3Polygons(), "H3 Resolutions");
        this.addWidget(new H3Region(), "H3 Regions");
        this.addWidget(new RoxieRegion(), "Roxie Regions");
        this.addWidget(new RoxieSummary(), "Roxie Summary");
        this.addWidget(new RoxieSummaryDeck(), "Summary Deck");
        this.addWidget(new RoxieSummaryRegion(), "Summary Region");
    }
}

export {
    H3Polygons,
    H3Region,
    RoxieRegion,
    RoxieSummary,
    RoxieSummaryDeck,
    RoxieSummaryRegion
};
