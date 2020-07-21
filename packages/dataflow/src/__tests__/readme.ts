import { chain, first, generate, map, min, max, filter, sort } from "../index";

const outIterable = chain(generate(Math.random, 1000),

    //  Filter out numbers > 0.5  
    filter(n => n <= 0.5),

    //  Convert to JSON Object 
    map((n, idx) => ({ index: idx, value: n })),

    //  Filter only those even numbers 
    filter(row => row.index % 2 === 0),

    //  Sort by value
    sort((l, r) => l.value - r.value),

    //  Take first 3 rows
    first(3)
);
console.log(...outIterable);

const process3 = chain(
    filter(n => n <= 0.5),
    map((n, idx) => ({ index: idx, value: n })),
    filter(row => row.index % 2 === 0),
    sort((l, r) => l.value - r.value),
    first(3)
);
console.log(...process3([]));

// Iterable output  
chain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    filter(n => n <= 5),
    map((n, idx) => ({ index: idx, value: n })),
    filter(row => row.index % 2 === 0),
    sort((l, r) => l.value - r.value),
    first(3)
);  // => { index: 0, value: 0 }, { index: 2, value: 2 }, { index: 4, value: 4 }

const process = chain(
    filter(n => n <= 5),
    map((n, idx) => ({ index: idx, value: n })),
    filter(row => row.index % 2 === 0),
    sort((l, r) => l.value - r.value),
    first(3)
);
console.log([...process([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])]) // => { index: 0, value: 0 }, { index: 2, value: 2 }, { index: 4, value: 4 }

// Scalar output  
chain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    process,
    max(row => row.value)
);  // => 4

const process_2 = chain(
    process,
    min(row => row.value)
);
console.log(process_2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));  // => 0
