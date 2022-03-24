import { Pie } from "./Pie";

export { Test1 as Test };

export class Test1 extends Pie {

    constructor() {
        super();
        this.columns(["Subject", "Result"])
            .data([
                ["English", 45],
                ["Irish", 28],
                ["Math", 98],
                ["Geography", 48],
                ["Science", 82]
            ])
            .on("click", () => {
                setTimeout(() => {
                    this.selection([]);
                }, 1000);
                setTimeout(() => {
                    const data = this.data();
                    const rndIdx = Math.floor(Math.random() * data.length);
                    //  this.selection(data[rndIdx]);
                    this.selectByLabel(data[rndIdx][0]);
                }, 2000);
            })
            ;
    }
}

