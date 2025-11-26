# @hpcc-js/dataflow Copilot Instructions

## Architecture Overview

This is a **functional data flow library** using JavaScript generators and iterators for lazy evaluation. Think of it as a streaming data pipeline where data flows through activities and is observed by sensors.

**Core Concepts:**
- **Source<T>**: Either `T[]` or `IterableIterator<T>` - the input data
- **Activities**: Transform data as it flows (`map`, `filter`, `sort`) - return iterators
- **Observers/Sensors**: Monitor data without modifying it (`count`, `max`, `mean`) - accumulate state
- **Pipe**: Chains activities together into reusable pipelines with full type safety

**Key Files:**
- `src/activities/activity.ts` - Core type definitions for the entire system
- `src/utils/pipe.ts` - Complex TypeScript type magic for type-safe activity chaining
- `src/observers/observer.ts` - Observer pattern with `observe()` and `peek()` methods

## Critical Patterns

### Dual Signature Pattern (Performance Optimization)

Activities use TypeScript overloads to support both immediate execution and curried usage:

```typescript
// Immediate execution
export function map<T, U>(source: Source<T>, callbackFn: MapCallback<T, U>): IterableIterator<U>;
// Curried (returns reusable activity)
export function map<T, U>(callbackFn: MapCallback<T, U>): IterableActivity<T, U>;

export function map<T, U>(s_or_cb: Source<T> | MapCallback<T, U>, callbackFn?: MapCallback<T, U>) {
    return isSource(s_or_cb) ? mapGen(callbackFn!)(s_or_cb) : mapGen(s_or_cb);
}
```

**Performance optimization (in progress):** Activities are being migrated from `isSource()` runtime checks to `arguments.length` checks for better performance. See `sort.ts` for the optimized pattern - it eliminates expensive runtime type inspection in favor of fast argument counting.

### Generator Functions for Lazy Evaluation

All activities use generator functions (`function*`) to enable lazy evaluation:

```typescript
function* (source: Source<T>) {
    let i = -1;
    for (const item of source) {
        yield callbackFn(item, ++i);
    }
}
```

This ensures data only flows when consumed (e.g., via `[...iterator]` or `for...of`).

### Observers Accumulate State

Observers have two methods:
- `observe(value, index)` - Called for each item as it flows through
- `peek()` - Returns accumulated result without consuming the iterator

Observers can be inserted into pipes using `sensor()` or converted to activities using `scalar()` or `activity()`.

### Array Mutation Prevention

**Always use `.slice()` before `.sort()` to avoid mutating input arrays:**

```typescript
const arr = Array.isArray(source) ? source.slice() : [...source];
yield* arr.sort(compareFn);
```

This pattern appears in `sort.ts`, `median.ts`, `quartile.ts`.

## Build & Test Workflow

**Build Commands:**
- `npm run build` - Parallel TypeScript compilation + Vite bundling (`run-p gen-types bundle`)
- `npm run gen-types` - Generate `.d.ts` files in `types/` directory
- `npm run bundle` - Vite builds UMD + ES modules to `dist/`

**Testing:**
- `npm test` - Runs type checking + vitest (both node & browser environments)
- `npm run test-vitest` - Vitest only (dual environment: node + chromium)
- `npm run bench` - Performance benchmarks (see `tests/pipe.bench.ts`)

**Test Structure:**
- Each activity/observer has a matching `.spec.ts` file in `tests/`
- `tests/pipe.spec.ts` and `tests/pipe.bench.ts` test pipeline composition
- Tests verify both immediate execution and curried usage patterns

## TypeScript Configuration

- Uses `"allowImportingTsExtensions": true` - **always use `.ts` extensions in imports**
- `"module": "NodeNext"` - ES modules with Node.js compatibility
- Type definitions generated to `types/` directory (not inline with source)

## Common Gotchas

1. **Index tracking:** Most activities use `let i = -1; for (const item) { ++i }` pattern - maintains correct index through transformations

2. **Optional parameters with undefined:** When using `arguments.length` optimization, handle explicit `undefined` (e.g., `sort(source, undefined)` for default sort)

3. **Type inference in pipe():** The `pipe()` function uses sophisticated TypeScript to infer return types - if types break, check that activity input/output types align correctly

4. **Histogram edge cases:** `histogram` has special handling for empty sources - yields empty buckets with NaN bounds for `buckets` option, returns nothing for `min/range` option

5. **Generator initialization:** Generators don't execute until iterated - sensors remain `undefined` until data flows through

## Code Style

- Use generator functions for all iterable activities
- Prefer `for...of` over manual iterator manipulation
- Use `yield*` to delegate to another generator
- Type parameters: `<T = any>` allows inference while providing fallback
- Function naming: `activityGen` helper functions create the generator, exported function handles overload dispatch
