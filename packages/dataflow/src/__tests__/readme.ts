import { expect } from "chai";

import { count, filter, first, generate, map, max, pipe, sensor } from "../index";

describe("readme", () => {

    it("quick example", () => {

        const c1 = count();
        const c2 = count();
        const c3 = count();
        const m1 = max(row => row.value);

        const p1 = pipe(
            sensor(c1),                         //  Keep running count of input
            filter(n => n <= 0.5),              //  Filter out numbers > 0.5  
            sensor(c2),                         //  Keep running count of filtered rows
            map((n, idx) =>                     //  Convert to JSON Object 
                ({ index: idx, value: n })),
            filter(row => row.index % 2 === 0), //  Filter even row indecies 
            sensor(c3),                         //  Keep running count of final rows
            sensor(m1),                         //  Track largest value
            first(3)                            //  Take first 3 rows
        );

        console.info(`Counts: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}`);
        // [1] => Counts: undefined, undefined, undefined
        const outIterable = p1(generate(Math.random, 1000));
        console.info(`Counts: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}`);
        // [2] => Counts: undefined, undefined, undefined
        console.info(JSON.stringify([...outIterable]));
        // [3] => [{"index":0,"value":0.19075931906641008},{"index":2,"value":0.4873469062925415},{"index":4,"value":0.4412516774100035}]
        console.info(`Counts: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}, ${m1.peek()}`);
        // [4] => Counts: 6, 5, 3, 0.4873469062925415

        const outArray = [...p1([0.7, 0.5, 0.4, 0.8, 0.3, 1])];
        console.info(JSON.stringify(outArray));
        // [5] => [{"index":0,"value":0.5},{"index":2,"value":0.3}]
        console.info(`Counts: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}, ${m1.peek()}`);
        // [6] => Counts:  6, 3, 2, 0.5

        expect(outArray.length).to.equal(2);

        for (const row of p1(generate(Math.random, 1000000))) {
            console.info(`${row.index}: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}, ${m1.peek()}`);
        }
    });

    it("interesting example", () => {
        const c1 = count();
        const c2 = count();
        const c3 = count();
        const m1 = max(row => row.value);

        const p1 = pipe(
            sensor(c1),                         //  Keep running count of input
            filter(n => n <= 0.5),              //  Filter out numbers > 0.5  
            sensor(c2),                         //  Keep running count of filtered rows
            map((n, idx) =>                     //  Convert to JSON Object 
                ({ index: idx, value: n })),
            filter(row => row.index % 2 === 0), //  Filter even row indecies 
            sensor(c3),                         //  Keep running count of final rows
            sensor(m1),                         //  Track largest value
        );

        for (const row of p1(generate(Math.random, 1000000))) {
            if (row.index % 100000 === 0) {
                console.info(`${row.index}: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}, ${m1.peek()}`);
            }
        }
    });
});

/*
const process3 = pipe(
    filter(n => n <= 0.5),
    map((n, idx) => ({ index: idx, value: n })),
    filter(row => row.index % 2 === 0),
    sort((l, r) => l.value - r.value),
    first(3)
);
console.log(...process3([]));

// Iterable output
pipe([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    filter(n => n <= 5),
    map((n, idx) => ({ index: idx, value: n })),
    filter(row => row.index % 2 === 0),
    sort((l, r) => l.value - r.value),
    first(3)
);  // => { index: 0, value: 0 }, { index: 2, value: 2 }, { index: 4, value: 4 }

const process = pipe(
    filter(n => n <= 5),
    map((n, idx) => ({ index: idx, value: n })),
    filter(row => row.index % 2 === 0),
    sort((l, r) => l.value - r.value),
    first(3)
);
console.log([...process([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])]); // => { index: 0, value: 0 }, { index: 2, value: 2 }, { index: 4, value: 4 }

// Scalar output
pipe([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    process,
    scalar(max(row => row.value))
);  // => 4

const process_2 = pipe(
    process,
    scalar(min(row => row.value))
);
console.log(process_2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));  // => 0
*/
