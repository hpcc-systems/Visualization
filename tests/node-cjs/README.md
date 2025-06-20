# Node.js CommonJS Compatibility Tests

This directory contains tests to verify that `@hpcc-js/util` works correctly in Node.js environments using CommonJS module loading.

## Purpose

These tests ensure that:
- The package can be successfully imported using CommonJS `require()` syntax
- All major exports are available and functional
- Core functionality works as expected in a CommonJS context
- Both namespace imports and destructuring assignment work with `require()`

## Running Tests

From this directory:
```bash
npm test
```

From the monorepo root:
```bash
npm run test-node-cjs
```

## Test Framework

- **Vitest** - Modern test runner with excellent TypeScript and ES modules support
- **Node.js Environment** - Tests run in a Node.js environment to verify server-side compatibility
- **Hybrid Approach** - Uses ESM for Vitest imports but CommonJS `require()` for testing the actual package

## What's Tested

- Basic package `require()` functionality
- Dictionary class creation and operations
- hashSum function consistency
- SAXStackParser class instantiation
- Platform utility availability
- Destructuring assignment with `require()`
- Export count validation

## Configuration

- `package.json` - Configured with `"type": "commonjs"` to test CommonJS behavior
- Uses `require()` statements for testing the actual package (with ESLint exemption)
- Uses `import` for Vitest test framework (required by modern Vitest)
- Tests are in `*.spec.js` files following Vitest conventions

## Test Files

- `util-cjs.spec.js` - Comprehensive tests for the `@hpcc-js/util` package using CommonJS `require()`

## Implementation Notes

The tests use a hybrid approach:
1. **Vitest Framework**: Imported using ESM `import` (required by Vitest)
2. **Package Under Test**: Imported using CommonJS `require()` (what we're actually testing)

This ensures we properly test CommonJS compatibility while using a modern test runner.
