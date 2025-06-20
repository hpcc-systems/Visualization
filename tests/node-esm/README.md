# Node.js ESM Compatibility Tests

This directory contains tests to verify that `@hpcc-js/util` works correctly in Node.js environments using ES modules.

## Purpose

These tests ensure that:
- The package can be successfully imported using ESM `import` statements
- Named imports work correctly
- All major exports are available and functional
- Core functionality works as expected in an ESM environment

## Running Tests

From this directory:
```bash
npm test
```

From the monorepo root:
```bash
npm run test-node-esm
```

## Test Framework

- **Vitest** - Modern test runner with excellent TypeScript and ES modules support
- **Node.js Environment** - Tests run in a Node.js environment to verify server-side compatibility

## What's Tested

- Basic package import functionality
- Named import functionality (ESM-specific)
- Dictionary class creation and operations
- hashSum function consistency
- SAXStackParser class instantiation
- Platform utility availability
- Export count validation

## Configuration

- `package.json` - Configured with `"type": "module"` to test ESM behavior
- Uses both dynamic imports (`await import()`) and static named imports
- Tests are in `*.spec.js` files following Vitest conventions

## Test Files

- `util-esm.spec.js` - Comprehensive tests for the `@hpcc-js/util` package including ESM-specific features

## ESM vs CommonJS

Key differences from the CommonJS tests:

1. **Import Syntax**: Uses `import()` instead of `require()`
2. **Module Type**: `package.json` has `"type": "module"`
3. **Named Imports**: Tests ESM-specific destructuring import patterns
4. **Additional Tests**: Includes extra test for named import functionality
