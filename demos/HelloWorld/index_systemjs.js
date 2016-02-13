import Column from "src/amchart/Pie";

class TestColumn extends Column {
    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        console.log('enter')
        this
            .columns(["Subject", "Year 1"])
            .data([
                ["Geography", 75],
                ["English", 45],
                ["Math", 98],
                ["Science", 66]
            ])
        ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        console.log('update')
    }
}

var column = new TestColumn()
    .target("helloWorld")
    .render()
;
