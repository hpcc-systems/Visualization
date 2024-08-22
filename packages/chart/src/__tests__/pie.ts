import { Pie } from "../Pie";

export class Test extends Pie {

    constructor() {
        super();
        this
            .columns(["Subject", "Result"])
            .data([
                ["English", 45],
                ["Irish", 28],
                ["Math", 98],
                ["Geography", 48],
                ["Science", 82]
            ])
            .sortDataByValue("none")
            .lazyRender()
            ;
    }
}
