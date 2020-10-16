# @hpcc-js/dataflow 

_A small functional library for processing "data flows" in JavaScript ([more examples on ObservableHQ](https://observablehq.com/@gordonsmith/hpcc-js-dataflow)).  Highlights:_

* **Lazy Evaluation** - Implemented using modern JavaScript generators and iterators
* **Memory Efficient** - Data "streams" from one "activity" to the next
* **Functional** - Pure functional implementation.
* **Fully Typed** - Written in typescript and supports typed chaining of functional activities
* **UMD/ES6 Bundles** - Works in NodeJS / Browser and includes ES6 modules to ensure you only include what you use (when bundling with RollupJS / Webpack etc.)

## Motivation

The underlying motivation for this library is to simplify the processing of data in an efficient way.  The analogy we use is one of a "data" pipe, which consists of:
* Activities:  Functional components that modify data as it flows through the pipe.
* Sensors:  Functional components that observe the data as it passes through the pipe.

Some other properties of pipes are:
* Can be defined, before being used.
* A complex pipe is just another "Activity" and as such can be re-used inside other pipes.
* Encourages the user to only iterate through the source data ONCE allowing for less memory use and better overall performance.

## Terminology

* **Activity** - A functional unit of work that is primary used to alter the data (`map`, `filter`, `sort`, ...). 
* **Sensor** - A function which "observes" the data without modifying it (`min`, `max`, `quartile`, ...). 
* **IterableActivity** - An "Activity" which produces an "Iterable" output (`map`, `filter`, `sort`, ...). 
* **ScalarActivity** - An "Activity" which produces a single value (`min`, `max`, `reduce`...).
* **Process** or **Pipeline** - A series of "Activities" chained together, so that "data" "flows" through the process / pipeline.  

## Quick Example 
_Simple example of data flowing through a `pipe` of activities:  _`filter`->`map`->`filter`->`first`_

```javascript
import { count, filter, first, generate, map, max, pipe, sensor } from "@hpcc-js/dataflow";

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

console.log(`Counts: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}`);
    // [1] => Counts: undefined, undefined, undefined

const outIterable = p1(generate(Math.random, 1000));
console.log(`Counts: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}`);
    // [2] => Counts: undefined, undefined, undefined

console.log(JSON.stringify([...outIterable]));
    // [3] => [{"index":0,"value":0.19075931906641008},{"index":2,"value":0.4873469062925415},{"index":4,"value":0.4412516774100035}]

console.log(`Counts: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}, ${m1.peek()}`);
    // [4] => Counts: 6, 5, 3, 0.4873469062925415


const outArray = [...p1([0.7, 0.5, 0.4, 0.8, 0.3, 1])];
console.log(JSON.stringify(outArray));
    // [5] => [{"index":0,"value":0.5},{"index":2,"value":0.3}]

console.log(`Counts: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}, ${m1.peek()}`);
    // [6] => Counts:  6, 3, 2, 0.5

```

Notes:
1. All sensors are undefined as expected
2. All sensors are still undefined as `p1(generate(Math.random, 1000))` only returns an `IterableIterator`.  IOW no data has flown through the pipe yet.
3. `[...outIterable]` Is a shorthand way to populate an array with data from an iterable.
4. The sensors now have values we can peek at!
5. The pipe `p1` can be reused with new data, this time the input is a simple array
6. The same sensors will reflect the correct state from the second run

Further the sensors can be observed at any point during the process.

```javascript
for (const row of p1(generate(Math.random, 1000000))) {
    console.log(`${row.index}: ${c1.peek()}, ${c2.peek()}, ${c3.peek()}, ${m1.peek()}`);
}
// => 0: 1, 1, 1, 0.13662528848681
// => 2: 3, 3, 2, 0.13662528848681
// => 4: 7, 5, 3, 0.4328468228869129
```

Note:  Even though there is 1000000 rows of data being potentially generated, only 7 are actually read for this run.

## API Reference

* [Activities](#iterable-activities)
* [Sensors](#sensors)
* [Convenience](#convenience)

### Activities

_Functions which alter data inside the dataflow pipe_

<a name="concat" href="#concat">#</a> **concat**(_iterable_, _iterable_): _iterable_ <br>
<a name="concat" href="#concat">#</a> **concat**(_iterable_): (_iterable_) => _iterable_ <br>

Concatenates two iterables into a single iterable.  Similar to [Array.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).  

```typescript
concat(["a", "b", "c"], ["d", "e", "f"]);  // => "a", "b", "c", "d", "e", "f"

const concatDEF = concat(["d", "e", "f"]);
concatDEF(["a", "b", "c"]);  // => "a", "b", "c", "d", "e", "f"
concatDEF(["1", "2", "3"]);  // => "1", "2", "3", "d", "e", "f"
```
[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/activities/concat.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/concat.ts)

<a name="each" href="#each">#</a> **each**(_iterable_, _callbackFn_): _iterable_ <br>
<a name="each" href="#each">#</a> **each**(_callbackFn): (_iterable_) => _iterable_ <br>

Perform callback for `each` row in an iterable.  Cannot alter the iterable value.  Similar to [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).  Useful for debugging steps in a [pipe](#pipe).

```typescript
each(["a", "b", "c"], (row, idx) => console.log(row));  // => "a", "b", "c"

const logFlow = each(console.log);
logFlow(["a", "b", "c"]);  // => "a", "b", "c"
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/activities/each.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/each.ts) 

<a name="entries" href="#entries">#</a> **entries**(_iterable_): _iterable_ <br>
<a name="entries" href="#entries">#</a> **entries**(): (_iterable_) => _iterable_ <br>

Perform callback for `entries` row in an iterable.  Cannot alter the iterable value.  Similar to [Array.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries).

```typescript
entries(["a", "b", "c"]);  // => [0, "a"], [1, "b"], [2, "c"]

const calcEntries = entries();
calcEntries(["a", "b", "c"]);  // => [0, "a"], [1, "b"], [2, "c"]
```
[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/activities/entries.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/entries.ts)

<a name="filter" href="#filter">#</a> **filter**(_iterable_, _condition_): _iterable_ <br>
<a name="filter" href="#filter">#</a> **filter**(_condition_): (_iterable_) => _iterable_ <br>

Filter iterable based on some `condition`. Similar to [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

```typescript
const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

filter(words, word => word.length > 6);  // => "exuberant", "destruction", "present"

const smallWords = filter(word => word.length <= 6);
smallWords(words);  // => "spray", "limit", "elite"
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/activities/filter.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/filter.ts)

<a name="first" href="#first">#</a> **first**(_iterable_, _number_): _iterable_ <br>
<a name="first" href="#first">#</a> **first**(_number_): (_iterable_) => _iterable_ <br>

Limit the flow to the first N rows of data.

```typescript
const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

first(words, 3);  // => "spray", "limit", "elite"

const first2 = first(2);
first2(words);  // => "spray", "limit"
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/activities/first.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/first.ts)

<a name="group" href="#group">#</a> **group**(_iterable_, _condition_): _iterable_ <br>
<a name="group" href="#group">#</a> **group**(_condition_): (_iterable_) => _iterable_ <br>

Groups data based on some grouping condition.  Output is in the form {key: groupCondition, value:[...]}, where the key has to be either a `number` or a `string`.

```typescript
const words = ["one", "two", "three", "four", "five", "six"];

group(words, word => word.length);  // => {key:  3, value: ["one", "two", "six"]}, {key:  4, value: ["four", "five"]}, { key: 5, value: ["three"]}

const groupByLength = group(word => word.length);
groupByLength(words);  // => {key:  3, value: ["one", "two", "six"]}, {key:  4, value: ["four", "five"]}, { key: 5, value: ["three"]}
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/activities/group.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/group.ts)

<a name="histogram" href="#histogram">#</a> **histogram**(_iterable_, _condition_, _options_): _iterable_ <br>
<a name="histogram" href="#histogram">#</a> **histogram**(_condition_, _options_): (_iterable_) => _iterable_ <br>

Groups data into buckets (or bins) based on numeric ranges.  Output is in the form `{from: numeric, to: numeric, value:[...]}`.

Available options are:
```
 { buckets: number }  // Specify number of buckets / bins
```
or
```
 { min: number, range: number }  // Specify starting bucket (min) and size of bucket (range)
```

```typescript
const data = [1, 12, 13, 13, 3, 14, 19, 6];
histogram(data, n => n, { buckets: 3 });  // => {"from":1,"to":7,"value":[1,3,6]},{"from":7,"to":13,"value":[12]},{"from":13,"to":19,"value":[13,13,14,19]}

histogram(data, n => n, { min: 0, range: 5 });  // => {"from":0,"to":5,"value":[1,3]},{"from":5,"to":10,"value":[6]},{"from":10,"to":15,"value":[12,13,13,14]},{"from":15,"to":20,"value":[19]}
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/activities/histogram.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/histogram.ts)

<a name="map" href="#map">#</a> **map**(_iterable_, _callback_): _iterable_ <br>
<a name="map" href="#map">#</a> **map**(_callback_): (_iterable_) => _iterable_ <br>

Map data to a new shape via a callback frunction.  Similar to [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

```typescript
map([{ n: 22 }, { n: 11 }, { n: 33 }], (row, idx) => ({ ...row, index: idx })); // => { n: 22, index: 0 }, { n: 11, index: 1 }, { n: 33, index: 2 }

const indexData = map((row, idx) => ({ ...row, index: idx + 1 }));
indexData([{ n: 22 }, { n: 11 }, { n: 33 }]);  // => { n: 22, index: 1 }, { n: 11, index: 2 }, { n: 33, index: 3 }
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/activities/map.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/map.ts)

<a name="skip" href="#skip">#</a> **skip**(_iterable_, _number_): _iterable_ <br>
<a name="skip" href="#skip">#</a> **skip**(_number_): (_iterable_) => _iterable_ <br>

Skip a set number of rows.

```typescript
const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

skip(words, 3);  // => "exuberant", "destruction", "present"

const skip4 = skip(4);
skip4(words);  // => "destruction", "present"
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/activities/skip.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/skip.ts)

<a name="sort" href="#sort">#</a> **sort**(_iterable_, _compare_): _iterable_ <br>
<a name="sort" href="#sort">#</a> **sort**(_compare_): (_iterable_) => _iterable_ <br>

Sort iterable based on result of `compare` function (should return -1, 0, 1). Similar to [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).


```typescript
var numbers = [4, 2, 5, 1, 3];

sort(numbers, (a, b) => a - b);  // => 1, 2, 3, 4, 5

const reverseSort = sort((a, b) => b - a);
reverseSort(numbers)  // => 5, 4, 3, 2, 1
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/activities/sort.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/sort.ts)

### Sensors

_A collection of "Observers" which can be adapted as functions, activities and sensors_

#### Types / Interfaces

```typescript
export interface Observer<T, U> {
    observe(r: T, idx: number): void;
    peek(): U;
}
```

#### Adapters

<a name="sensor" href="#sensor">#</a> **sensor**(_: _Observer_): _iterable_ <br>

Adapts an observer so it can be used in a pipe.

<a name="scalar" href="#scalar">#</a> **scalar**(_: _Observer_): _any_ <br>

Adapts an observer so it can be called as a regular function.

#### Observers

<a name="count" href="#count">#</a> **count**(): _Observer_ <br>

Counts the number of "observed" rows: 

```typescript
const s1 = count();
const s2 = count();
const p1 = pipe(
    sensor(s1),
    filter(r => r.age > 30),
    sensor(s2),
);
const data = [...p1(population)];
s1.peek();  // => 1000;
s2.peek();  // => 699;

const doCount = scalar(count());
doCount([5, 1, 2, -3, 4]);  // => 5
```
[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/count.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/count.ts)

<a name="min" href="#min">#</a> **min**(): _Observer_ <br>
<a name="min" href="#min">#</a> **min**(_accessor_): _Observer_ <br>

Calculates minimal value for "observed" rows: 

```typescript
const s1 = min();
const s2 = min();
const p1 = pipe(
    sensor(s1),
    filter(r => r > 3),
    sensor(s2),
);
const data = [...p1([1, 2, 3, 4, 5, 0])];
s1.peek()   // => 0
s2.peek()   // => 4

const calcMin = scalar(min(row => row.id));
calcMin([{ id: 22 }, { id: 44 }, { id: 33 }]); // => 22
```
[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/min.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/min.ts)

<a name="max" href="#max">#</a> **max**(): _Observer_ <br>
<a name="max" href="#max">#</a> **max**(_accessor_): _Observer_ <br>

Calculates maximum value for "observed" rows: 

```typescript
const s1 = max();
const s2 = max();
const p1 = pipe(
    sensor(s1),
    filter(r => r < 3),
    sensor(s2),
);
const data = [...p1([1, 2, 3, 4, 5, 0])];
s1.peek()   // => 5
s2.peek()   // => 2

const calcMax = scalar(max(row => row.id));
calcMax([{ id: 22 }, { id: 44 }, { id: 33 }]); // => 44
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/max.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/max.ts)

<a name="extent" href="#extent">#</a> **extent**(): _Observer_ <br>
<a name="extent" href="#extent">#</a> **extent**(_accessor_): _Observer_ <br>

Calculates extent (min + max) values for "observed" rows: 

```typescript
const s1 = extent(r => r.age);
const s2 = extent(r => r.age);
const p1 = pipe(
    sensor(s1),
    filter(r => r.age > 30),
    sensor(s2),
);
const data = [...p1(population)];
s1.peek()   // => [16, 66]
s2.peek()   // => [31, 66]

const calcExtent = scalar(extent(row => row.id));
calcExtent([{ id: 22 }, { id: 44 }, { id: 33 }]); // => [22, 44]
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/extent.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/extent.ts)

<a name="mean" href="#mean">#</a> **mean**(): _Observer_ <br>
<a name="mean" href="#mean">#</a> **mean**(_accessor_): _Observer_ <br>

Calculates mean (average) value for "observed" rows: 

```typescript
const calcMean = scalar(mean());
calcMean([5, -6, 1, 2, -2]))    // => 0
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/mean.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/mean.ts)

<a name="median" href="#median">#</a> **median**(): _Observer_ <br>
<a name="median" href="#median">#</a> **median**(_accessor_): _Observer_ <br>

Calculates median value for "observed" rows: 

```typescript
const calcMedian = scalar(median());
calcMedian([-6, -2, 1, 2, 5])       // => 1
calcMedian([5, -6, 1, 2, -2])       // => 1
calcMedian([-6, -2, 1, 2, 5, 6])    // => 1.5
calcMedian([5, -6, 1, 2, -2, 6])    // => 1.5
calcMedian([9])                     // => 9
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/median.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/median.ts)

<a name="quartile" href="#quartile">#</a> **quartile**(): _Observer_ <br>
<a name="quartile" href="#quartile">#</a> **quartile**(_accessor_): _Observer_ <br>

Calculates quartile value for "observed" rows: 

```typescript
const calcQuartile = scalar(quartile());
calcQuartile([6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49])    // => [6, 15, 40, 43, 49]
calcQuartile([7, 15, 36, 39, 40, 41])                       // => [7, 15, 37.5, 40, 41]
calcQuartile([1, 22, 133])                                  // => [1, 1, 22, 133, 133]
calcQuartile([2, 144, 33])                                  // => [2, 2, 33, 144, 144]
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/quartile.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/quartile.ts)

<a name="reduce" href="#reduce">#</a> **reduce**(_reducer_[, _initialValue_]): _Observer_ <br>

Calculates reduced value for "observed" rows: 

```typescript
const reduceFunc = (prev, row) => prev + row;
const calcReduce1 = scalar(reduce(reduceFunc));
const calcReduce2 = scalar(reduce(reduceFunc), 10);

calcReduce1([1, 2, 3, 4, 5])   // => 15
calcReduce2([1, 2, 3, 4, 5])   // => 25
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/reduce.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/reduce.ts)

<a name="variance" href="#variance">#</a> **variance**(): _Observer_ <br>
<a name="variance" href="#variance">#</a> **variance**(_accessor_): _Observer_ <br>

Calculates the [variance](https://en.wikipedia.org/wiki/Variance) for the "observed" rows.  If the number of rows is fewer than two numbers, returns undefined.  

```typescript
const calcVariance = scalar(variance());
calcVariance([5, 1, 2, 3, 4])   // => 2.5
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/variance.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/variance.ts)

<a name="deviation" href="#deviation">#</a> **deviation**(): _Observer_ <br>
<a name="deviation" href="#deviation">#</a> **deviation**(_accessor_): _Observer_ <br>

Calculates the [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) for the "observed" rows.  If the number of rows is fewer than two numbers, returns undefined.  

```typescript
const calcDeviation = scalar(deviation());
calcDeviation([5, 1, 2, 3, 4])   // => 1.58113883008 == sqrt(2.5)
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/deviation.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/deviation.ts)

<a name="distribution" href="#distribution">#</a> **distribution**(): _Observer_<_number_, { min: _number_, mean: _number_, max: _number_, deviation: _number_, variance: _number_}> <br>
<a name="distribution" href="#distribution">#</a> **distribution**(_accessor_): _Observer_<_any_, { min: _number_, mean: _number_, max: _number_, deviation: _number_, variance: _number_}> <br>

Calculates a "distribution" (a combination of min, max, mean, variance and deviance) of the "observed" rows.  If the number of rows is fewer than two numbers, returns undefined.

```typescript
const calcDistribution = scalar(distribution());
calcDistribution([5, 1, 2, 3, 4]))  // => { min: 1, mean: 3, max: 5, deviation: Math.sqrt(2.5), variance: 2.5}
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/observers/distribution.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/distribution.ts)

### Convenience

_Convenience functions_

<a name="pipe" href="#pipe">#</a> **pipe**(_iterable_, ..._iterableActivity_): _iterable_ <br>
<a name="pipe" href="#pipe">#</a> **pipe**(_iterable_, ..._iterableActivity_, _scalarActivity_): _scalar_ <br>
<a name="pipe" href="#pipe">#</a> **pipe**(..._iterableActivity_): _iterableActivity_ <br>
<a name="pipe" href="#pipe">#</a> **pipe**(..._iterableActivity_, _scalarActivity_): _scalarActivity_ <br>

Pipes a series of activities into a single process pipeline.  

```typescript
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
process([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])// => { index: 0, value: 0 }, { index: 2, value: 2 }, { index: 4, value: 4 }

// Scalar output  
pipe([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    process,
    max(row => row.value)
);  // => 4

const process_2 = pipe(
    process,
    min(row => row.value)
); 
process_2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);  // => 0
```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/utils/pipe.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/pipe.ts)

<a name="generate" href="#generate">#</a> **generate**(_generatorFn_[, _maxIterations_]): _iterable_ <br>

Generates an iterable data set.  Optionally limits the length to `maxIterations`.

```typescript
// Iterable output  
generate(Math.random);  // => Random number iterator
generate(Math.random, 100);  // => Random number iterator limited to 100 items

```

[[source]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/utils/generate.ts) [[tests]](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/__tests__/generate.ts)
