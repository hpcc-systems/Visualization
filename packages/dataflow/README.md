# @hpcc-js/dataflow

_A small functional library for processing "data flows" in JavaScript.  Highlights:_

* **Lazy Evaluation** - Implemented using modern JavaScript generators and iterators
* **Memory Efficient** - Data "streams" from one "activity" to the next
* **Functional** - Pure functional implementation.
* **Fully Typed** - Written in typescript and supports typed chaining of functional activities
* **UMD/ES6 Bundles** - Works in NodeJS / Browser and includes ES6 modules to ensure you only include what you use (when bundling with RollupJS / Webpack etc.)

## Terminology

* **Activity** - A functional unit of work (`map`, `filter`, `sort`, `min`, `max`, ...). 
* **IterableActivity** - An "Activity" which produces an "Iterable" output (`map`, `filter`, `sort`, ...). 
* **ScalarActivity** - An "Activity" which produces a single value (`min`, `max`, `reduce`...).
* **Process** or **Pipeline** - A series of "Activities" chained together, so that "data" "flows" through the process / pipeline.  

## Quick Example 
_Simple example of data flowing through a `chain` of activities:  `data`->`filter`->`map`->`filter`->`sort`->`first`_

```javascript
import { chain, each, first, generate, map, filter, sort } from "@hpcc-js/dataflow";

const outIterable = chain(

    //  Generate 1000 rows of random numbers
    generate(Math.random, 1000),

    //  Filter out numbers > 0.5  
    filter(n => n <= 0.5),

    //  Convert to JSON Object 
    map((n, idx) => ({ index: idx, value: n })),

    //  Filter only those with even indexes 
    filter(row => row.index % 2 === 0),

    //  Sort by value
    sort((l, r) => l.value - r.value),

    //  Take first 3 rows
    first(3)
);

//  Convert iterable back to an Array
const outData = [...outIterable];
```

_The same example but make it a little more **re-usable / functional** - here we declare the "process" up front and reuse it on two different datasets_

```javascript
const process = chain(
    filter(n => n <= 0.5),
    map((n, idx) => ({ index: idx, value: n })),
    filter(row => row.index % 2 === 0),
    sort((l, r) => l.value - r.value),
    first(3)
);

const outDataA = [...process([0.1, 0.2, 0.3, 0.7, 0.8, 0.9])];  // => [{index: 0, value: 0.1},{index: 2,value: 0.3}]
const outDataB = [...process([0.1, 0.3, 0.4, 0.6, 0.8, 0.9])];  // => [{index: 0, value: 0.1},{index: 2,value: 0.4}]
```

**Remember** The data "flows" row by row through each Activity.

## API Reference

* [Iterable Activities](#iterable-activities)
* [Scalar Activities](#scalar-activities)
* [Convenience](#convenience)

### Iterable Activities

_Activities which create Iterable Iterators_

---

<a name="concat" href="#concat">#</a> **concat**(_iterable_, _iterable_): _iterable_ <br>
<a name="concat" href="#concat">#</a> **concat**(_iterable_): (_iterable_) => _iterable_ <br>

Concatenates two iterables into a single iterable.  Similar to [Array.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).  

```typescript
concat(["a", "b", "c"], ["d", "e", "f"]);  // => "a", "b", "c", "d", "e", "f"

const concatDEF = concat(["d", "e", "f"]);
concatDEF(["a", "b", "c"]);  // => "a", "b", "c", "d", "e", "f"
concatDEF(["1", "2", "3"]);  // => "1", "2", "3", "d", "e", "f"
```
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/concat.ts)]

---

<a name="each" href="#each">#</a> **each**(_iterable_, _callbackFn_): _iterable_ <br>
<a name="each" href="#each">#</a> **each**(_callbackFn): (_iterable_) => _iterable_ <br>

Perform callback for `each` row in an iterable.  Cannot alter the iterable value.  Similar to [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).  Useful for debugging steps in a [chain](#chain).


```typescript
each(["a", "b", "c"], (row, idx) => console.log(row));  // => "a", "b", "c"

const logFlow = each(console.log);
logFlow(["a", "b", "c"]);  // => "a", "b", "c"
```
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/each.ts)]

---

<a name="entries" href="#entries">#</a> **entries**(_iterable_): _iterable_ <br>
<a name="entries" href="#entries">#</a> **entries**(): (_iterable_) => _iterable_ <br>

Perform callback for `entries` row in an iterable.  Cannot alter the iterable value.  Similar to [Array.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries).


```typescript
entries(["a", "b", "c"]);  // => [0, "a"], [1, "b"], [2, "c"]

const calcEntries = entries();
calcEntries(["a", "b", "c"]);  // => [0, "a"], [1, "b"], [2, "c"]
```
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/entries.ts)]

---

<a name="filter" href="#filter">#</a> **filter**(_iterable_, _condition_): _iterable_ <br>
<a name="filter" href="#filter">#</a> **filter**(_condition_): (_iterable_) => _iterable_ <br>

Filter iterable based on some `condition`. Similar to [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).


```typescript
const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

filter(words, word => word.length > 6);  // => "exuberant", "destruction", "present"

const smallWords = filter(word => word.length <= 6);
smallWords(words);  // => "spray", "limit", "elite"
```
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/filter.ts)]

---

<a name="first" href="#first">#</a> **first**(_iterable_, _number_): _iterable_ <br>
<a name="first" href="#first">#</a> **first**(_number_): (_iterable_) => _iterable_ <br>

Limit the flow to the first N rows of data.

```typescript
const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

first(words, 3);  // => "spray", "limit", "elite"

const first2 = first(2);
first2(words);  // => "spray", "limit"
```
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/first.ts)]

---

<a name="group" href="#group">#</a> **group**(_iterable_, _condition_): _iterable_ <br>
<a name="group" href="#group">#</a> **group**(_condition_): (_iterable_) => _iterable_ <br>

Groups data based on some grouping condition.  Output is in the form {key: groupCondition, value:[...]}, where the key has to be either a `number` or a `string`.

```typescript
const words = ["one", "two", "three", "four", "five", "six"];

group(words, word => word.length);  // => {key:  3, value: ["one", "two", "six"]}, {key:  4, value: ["four", "five"]}, { key: 5, value: ["three"]}

const groupByLength = group(word => word.length);
groupByLength(words);  // => {key:  3, value: ["one", "two", "six"]}, {key:  4, value: ["four", "five"]}, { key: 5, value: ["three"]}
```
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/group.ts)]

---

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
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/histogram.ts)]

---

<a name="map" href="#map">#</a> **map**(_iterable_, _callback_): _iterable_ <br>
<a name="map" href="#map">#</a> **map**(_callback_): (_iterable_) => _iterable_ <br>

Map data to a new shape via a callback frunction.  Similar to [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).


```typescript
map([{ n: 22 }, { n: 11 }, { n: 33 }], (row, idx) => ({ ...row, index: idx })); // => { n: 22, index: 0 }, { n: 11, index: 1 }, { n: 33, index: 2 }

const indexData = map((row, idx) => ({ ...row, index: idx + 1 }));
indexData([{ n: 22 }, { n: 11 }, { n: 33 }]);  // => { n: 22, index: 1 }, { n: 11, index: 2 }, { n: 33, index: 3 }
```
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/map.ts)]

---

<a name="skip" href="#skip">#</a> **skip**(_iterable_, _number_): _iterable_ <br>
<a name="skip" href="#skip">#</a> **skip**(_number_): (_iterable_) => _iterable_ <br>

Skip a set number of rows.

```typescript
const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

skip(words, 3);  // => "exuberant", "destruction", "present"

const skip4 = skip(4);
skip4(words);  // => "destruction", "present"
```
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/skip.ts)]

---

<a name="sort" href="#sort">#</a> **sort**(_iterable_, _compare_): _iterable_ <br>
<a name="sort" href="#sort">#</a> **sort**(_compare_): (_iterable_) => _iterable_ <br>

Sort iterable based on result of `compare` function (should return -1, 0, 1). Similar to [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).


```typescript
var numbers = [4, 2, 5, 1, 3];

sort(numbers, (a, b) => a - b);  // => 1, 2, 3, 4, 5

const reverseSort = sort((a, b) => b - a);
reverseSort(numbers)  // => 5, 4, 3, 2, 1
```
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/sort.ts)]

---

### Scalar Activities

_Activities which create scalar values_

---

<a name="min" href="#min">#</a> **min**(_iterable_, _accessor_): _number_ <br>
<a name="min" href="#min">#</a> **min**(_accessor_): (_iterable_) => _number_ <br>

Calculates minimal value for given iterable: 

```typescript
min([{ id: 22 }, { id: 11 }, { id: 33 }], row => row.id); // => 11

const calcMin = min(row => row.id);
calcMin([{ id: 22 }, { id: 44 }, { id: 33 }]); // => 22
```
[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/min.ts)]

---

<a name="max" href="#max">#</a> **max**(_iterable_, _accessor_): _number_ <br>
<a name="max" href="#max">#</a> **max**(_accessor_): (_iterable_) => _number_ <br>

Calculates maximum value for given iterable: 

```typescript
max([{ id: 22 }, { id: 11 }, { id: 33 }], row => row.id); // => 33

const calcMax = max(row => row.id);
calcMax([{ id: 22 }, { id: 44 }, { id: 33 }]); // => 44
```

[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/max.ts)]

---

<a name="reduce" href="#reduce">#</a> **reduce**(_iterable_, _reducer_[, _initialValue_]): _any_ <br>
<a name="reduce" href="#reduce">#</a> **reduce**(_reducer_[, _initialValue_]): (_iterable_) => _any_ <br>

Reduces an Iterable down to a Scalar value.  Similar to [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).  

```typescript
reduce([5, 1, 2, 3, 4], (acc, curr) => acc + curr);  // => 15

const calcDeviation = reduce((acc, curr) => acc + curr, 7);
calcDeviation([5, 1, 2, 3, 4]);                         // => 22
```

[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/reduce.ts)]

---

<a name="variance" href="#variance">#</a> **variance**(_iterable_, _accessor_): _number_ <br>
<a name="variance" href="#variance">#</a> **variance**(_accessor_): (_iterable_) => _number_ <br>

Calculates the [variance](https://en.wikipedia.org/wiki/Variance).  If the iterable has fewer than two numbers, returns undefined.  

```typescript
variance([5, 1, 2, 3, 4], n => n); // => 2.5

const calcDeviation = variance(n => n);
calcDeviation([5, 1, 2, 3, 4]);     // => 2.5
```

[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/variance.ts)]

---

<a name="deviation" href="#deviation">#</a> **deviation**(_iterable_, _accessor_): _number_ <br>
<a name="deviation" href="#deviation">#</a> **deviation**(_accessor_): (_iterable_) => _number_ <br>

Calculates the [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation).  If the iterable has fewer than two numbers, returns undefined.  

```typescript
deviation([5, 1, 2, 3, 4], n => n); // => 1.5811

const calcDeviation = deviation(n => n);
calcDeviation([5, 1, 2, 3, 4]);     // => 1.5811
```

[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/deviation.ts)]

---

### Convenience

_Convenience functions_

---

<a name="chain" href="#chain">#</a> **chain**(_iterable_, ..._iterableActivity_): _iterable_ <br>
<a name="chain" href="#chain">#</a> **chain**(_iterable_, ..._iterableActivity_, _scalarActivity_): _scalar_ <br>
<a name="chain" href="#chain">#</a> **chain**(..._iterableActivity_): _iterableActivity_ <br>
<a name="chain" href="#chain">#</a> **chain**(..._iterableActivity_, _scalarActivity_): _scalarActivity_ <br>

Chains a series of activities into a single process pipeline.  

```typescript
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
process([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])// => { index: 0, value: 0 }, { index: 2, value: 2 }, { index: 4, value: 4 }

// Scalar output  
chain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    process,
    max(row => row.value)
);  // => 4

const process_2 = chain(
    process,
    min(row => row.value)
); 
process_2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);  // => 0
```

[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/chain.ts)]

---

<a name="generate" href="#generate">#</a> **generate**(_generatorFn_[, _maxIterations_]): _iterable_ <br>

Generates an iterable data set.  Optionally limits the length to `maxIterations`.

```typescript
// Iterable output  
generate(Math.random);  // => Random number iterator
generate(Math.random, 100);  // => Random number iterator limited to 100 items

```

[[source](https://github.com/hpcc-systems/Visualization/blob/trunk/packages/dataflow/src/generate.ts)]

---

