import { IterableActivity, ScalarActivity, Source, isSource } from "../activities/activity.ts";

// =============================================================================
// Constants and Base Types
// =============================================================================

const GeneratorFunction = (function* () { }).constructor;

type AnyIterableActivity = IterableActivity<any, any>;
type AnyScalarActivity = ScalarActivity<any, any>;
type AnyActivity = AnyIterableActivity | AnyScalarActivity;

// =============================================================================
// Type Utilities for Activity Analysis
// =============================================================================

type ActivityIn<A extends AnyActivity> = Parameters<A>[0] extends Source<infer Input> ? Input : never;
type ActivityOut<A extends AnyActivity> = ReturnType<A> extends IterableIterator<infer Output> ? Output : ReturnType<A>;
type ActivityIsScalar<A extends AnyActivity> = ReturnType<A> extends IterableIterator<any> ? false : true;

type FirstActivity<Activities extends readonly [AnyActivity, ...AnyActivity[]]> = Activities[0];

// =============================================================================
// Type Resolution for Activity Chains (Without Source)
// =============================================================================

/**
 * Recursively resolves the output type of a chain of activities starting from an iterable activity.
 * Validates that each activity's input type matches the previous activity's output type.
 */

// Handle a scalar (non-iterable) activity in the chain
type ResolveScalarActivity<CurrentOut, InitialIn, Next extends AnyActivity, Rest extends readonly AnyActivity[]> =
    CurrentOut extends ActivityIn<Next>
    ? Rest extends []
    ? { kind: "scalar"; in: InitialIn; out: ActivityOut<Next> }
    : { kind: "error" } // Scalar activities must be terminal
    : { kind: "error" }; // Type mismatch

// Handle an iterable activity in the chain
type ResolveIterableActivity<CurrentOut, InitialIn, Next extends AnyActivity, Rest extends readonly AnyActivity[]> =
    CurrentOut extends ActivityIn<Next>
    ? ResolveIterableTail<ActivityOut<Next>, InitialIn, Rest>
    : { kind: "error" }; // Type mismatch

// Process the next activity in the chain
type ResolveNextActivity<CurrentOut, InitialIn, Next extends AnyActivity, Rest extends readonly AnyActivity[]> =
    ActivityIsScalar<Next> extends true
    ? ResolveScalarActivity<CurrentOut, InitialIn, Next, Rest>
    : ResolveIterableActivity<CurrentOut, InitialIn, Next, Rest>;

// Check if we've reached the end of the activity chain
type ResolveIterableTail<CurrentOut, InitialIn, Tail extends readonly AnyActivity[]> =
    Tail extends []
    ? { kind: "iterable"; in: InitialIn; out: CurrentOut }
    : Tail extends readonly [infer Next extends AnyActivity, ...infer Rest extends readonly AnyActivity[]]
    ? ResolveNextActivity<CurrentOut, InitialIn, Next, Rest>
    : { kind: "error" };

/**
 * Resolves the complete type signature for a chain of activities without a source.
 * Determines the input, output, and whether the final result is scalar or iterable.
 */

// Handle when the first activity is scalar (must be the only activity)
type ResolveFirstScalarActivity<First extends AnyActivity, Rest extends readonly AnyActivity[]> =
    Rest extends []
    ? { kind: "scalar"; in: ActivityIn<First>; out: ActivityOut<First> }
    : { kind: "error" }; // Scalar activities cannot be followed by others

// Handle when the first activity is iterable
type ResolveFirstIterableActivity<First extends AnyActivity, Rest extends readonly AnyActivity[]> =
    Rest extends []
    ? { kind: "iterable"; in: ActivityIn<First>; out: ActivityOut<First> }
    : ResolveIterableTail<ActivityOut<First>, ActivityIn<First>, Rest>;

// Determine how to handle the first activity based on whether it's scalar or iterable
type ResolveFirstActivity<First extends AnyActivity, Rest extends readonly AnyActivity[]> =
    ActivityIsScalar<First> extends true
    ? ResolveFirstScalarActivity<First, Rest>
    : ResolveFirstIterableActivity<First, Rest>;

type ResolveActivities<Activities extends readonly [AnyActivity, ...AnyActivity[]]> =
    Activities extends readonly [infer First extends AnyActivity, ...infer Rest extends readonly AnyActivity[]]
    ? ResolveFirstActivity<First, Rest>
    : { kind: "error" };

/**
 * Return type for pipe when called without a source - returns a reusable activity function.
 */
type PipeWithoutSourceReturn<Activities extends readonly [AnyActivity, ...AnyActivity[]]> =
    ResolveActivities<Activities> extends infer Result
    ? Result extends { kind: "iterable"; in: infer In; out: infer Out }
    ? IterableActivity<In & ActivityIn<FirstActivity<Activities>>, Out>
    : Result extends { kind: "scalar"; in: infer In; out: infer Out }
    ? ScalarActivity<In & ActivityIn<FirstActivity<Activities>>, Out>
    : never
    : never;

// =============================================================================
// Type Resolution for Activity Chains (With Source)
// =============================================================================

/**
 * Resolves the output type when a source is provided as the first argument to pipe.
 * Validates that the source type is compatible with the first activity's input.
 */

// Extract the final result kind from ResolveIterableTail
type ExtractFinalResultKind<Result> =
    Result extends { kind: "iterable"; out: infer Out }
    ? { kind: "iterable"; out: Out }
    : Result extends { kind: "scalar"; out: infer Out }
    ? { kind: "scalar"; out: Out }
    : { kind: "error" };

// Handle when the first activity after source is scalar
type ResolveSourceWithScalarActivity<TSource, First extends AnyActivity, Rest extends readonly AnyActivity[]> =
    TSource extends ActivityIn<First>
    ? Rest extends []
    ? { kind: "scalar"; out: ActivityOut<First> }
    : { kind: "error" } // Scalar activities must be terminal
    : { kind: "error" }; // Type mismatch

// Handle when the first activity after source is iterable
type ResolveSourceWithIterableActivity<TSource, First extends AnyActivity, Rest extends readonly AnyActivity[]> =
    TSource extends ActivityIn<First>
    ? Rest extends []
    ? { kind: "iterable"; out: ActivityOut<First> }
    : ExtractFinalResultKind<ResolveIterableTail<ActivityOut<First>, ActivityIn<First>, Rest>>
    : { kind: "error" }; // Type mismatch

// Determine how to handle the source with the first activity
type ResolveSourceWithFirstActivity<TSource, First extends AnyActivity, Rest extends readonly AnyActivity[]> =
    ActivityIsScalar<First> extends true
    ? ResolveSourceWithScalarActivity<TSource, First, Rest>
    : ResolveSourceWithIterableActivity<TSource, First, Rest>;

type ResolveSourceActivities<TSource, Activities extends readonly AnyActivity[]> =
    Activities extends []
    ? { kind: "source"; out: TSource }
    : Activities extends readonly [infer First extends AnyActivity, ...infer Rest extends readonly AnyActivity[]]
    ? ResolveSourceWithFirstActivity<TSource, First, Rest>
    : { kind: "error" };

/**
 * Return type for pipe when called with a source - executes immediately and returns the result.
 */
type PipeWithSourceReturn<TSource, Activities extends readonly AnyActivity[]> =
    ResolveSourceActivities<TSource, Activities> extends infer Result
    ? Result extends { kind: "iterable"; out: infer Out }
    ? IterableIterator<Out>
    : Result extends { kind: "scalar"; out: infer Out }
    ? Out
    : Result extends { kind: "source"; out: infer Out }
    ? Source<Out>
    : never
    : never;

// =============================================================================
// Runtime Implementation
// =============================================================================

/**
 * Internal helper that chains activities together at runtime.
 * Returns a function that accepts a source and applies all activities in sequence.
 * Handles both generator (iterable) and scalar activities appropriately.
 */
function chainGen(...activities: AnyActivity[]) {
    if (activities.length === 0) {
        return <T>(source: Source<T>) => source;
    }

    const isGenerator = activities[activities.length - 1] instanceof GeneratorFunction;
    const len = activities.length;

    if (isGenerator) {
        return function* (source: Source<unknown>) {
            let tail: unknown = source;
            for (let i = 0; i < len; i++) {
                tail = activities[i](tail as Source<unknown>);
            }
            yield* tail as IterableIterator<unknown>;
        };
    }

    return (source: Source<unknown>) => {
        let tail: unknown = source;
        for (let i = 0; i < len; i++) {
            tail = activities[i](tail as Source<unknown>);
        }
        return tail;
    };
}

// =============================================================================
// Public API
// =============================================================================

/**
 * Pipes activities together to create a data processing pipeline.
 * 
 * Two usage modes:
 * 1. Without source: pipe(activity1, activity2, ...) - returns a reusable activity function
 * 2. With source: pipe(source, activity1, activity2, ...) - executes immediately and returns result
 * 
 * Activities are chained left-to-right, with type checking ensuring output of each activity
 * matches the input of the next.
 */
export function pipe<const Activities extends readonly [AnyActivity, ...AnyActivity[]]>(...activities: Activities): PipeWithoutSourceReturn<Activities>;
export function pipe<TSource, const Activities extends readonly AnyActivity[]>(source: Source<TSource>, ...activities: Activities): PipeWithSourceReturn<TSource, Activities>;
export function pipe(...args: any[]): any {
    if (args.length === 0) {
        throw new TypeError("pipe requires at least one argument");
    }

    // Handle source-based invocation
    if (isSource(args[0])) {
        return args.length === 1 ? args[0] : chainGen(...args.slice(1))(args[0]);
    }

    // Handle activity-based invocation
    return chainGen(...args);
}

// =============================================================================
// Backward Compatibility
// =============================================================================

/**
 * @deprecated Use pipe instead. Maintained for backward compatibility.
 */
export const chain = pipe;
