import { StatChart } from "../StatChart";
import { distribution, quartiles } from "./heat";

export class Test extends StatChart {

    constructor() {
        super();
        this
            .view("normal")
            .quartiles(quartiles)
            .mean(distribution.mean)
            .standardDeviation(distribution.standardDeviation)
            .lazyRender()
            ;
    }
}
