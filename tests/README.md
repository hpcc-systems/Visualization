# HPCC Visualization Framework Tests

This directory contains various test suites for the HPCC Visualization Framework.

## Test Structure

### Node.js Compatibility Tests

#### `/node-cjs/` - Node.js CommonJS Tests

Tests that verify packages work correctly with Node.js using CommonJS `require()` syntax.

- **Purpose**: Ensure compatibility with Node.js CommonJS environments
- **Coverage**: Package imports, core functionality, export validation using `require()`
- **Current Tests**:
  - `@hpcc-js/util` package
  - `@hpcc-js/dataflow` package

#### `/node-esm/` - Node.js ESM Tests

Tests that verify packages work correctly with Node.js using ES modules.

- **Purpose**: Ensure compatibility with Node.js ESM environments
- **Coverage**: Package imports, named imports, core functionality using `import`
- **Current Tests**:
  - `@hpcc-js/util` package
  - `@hpcc-js/comms` package
  - `@hpcc-js/dataflow` package

### Browser Compatibility Tests

#### `/browser-esm/` - Browser ESM Tests

Tests that verify packages work correctly in browser environments using ES modules.

- **Purpose**: Ensure compatibility with browser ESM environments
- **Coverage**: Package imports, named imports, core functionality, browser-specific features using `import`
- **Current Tests**:
  - `@hpcc-js/util` package
  - `@hpcc-js/comms` package
  - `@hpcc-js/dataflow` package

#### `/node-comms-cjs/` - Communications CommonJS Tests

Tests that verify the communications package works correctly with CommonJS.

- **Purpose**: Ensure HPCC Systems communication compatibility in CommonJS environments
- **Coverage**: ESPConnection, services, utilities using `require()`
- **Current Tests**:
  - `@hpcc-js/comms` package

#### `/node-comms-esm/` - Communications ESM Tests

Tests that verify the communications package works correctly with ES modules.

- **Purpose**: Ensure HPCC Systems communication compatibility in ESM environments
- **Coverage**: ESPConnection, services, utilities using `import`
- **Current Tests**:
  - `@hpcc-js/comms` package

### `/temp/` - Temporary Test Files

Auto-generated test files used during development and CI processes.

## Running Tests

### All Compatibility Tests

```bash
npm run test-node-compatibility
npm run test-browser-compatibility
```

### Individual Test Suites

From the project root:

```bash
# Utility package tests
npm run test-node-cjs          # @hpcc-js/util CommonJS
npm run test-node-esm          # @hpcc-js/util ESM
npm run test-browser-esm       # @hpcc-js/util Browser ESM

# Communications package tests
npm run test-node-comms-cjs    # @hpcc-js/comms CommonJS
npm run test-node-comms-esm    # @hpcc-js/comms ESM
```

### From Individual Test Directories

```bash
cd tests/node-cjs && npm test              # CommonJS util tests
cd tests/node-esm && npm test              # ESM util tests
cd tests/browser-esm && npm test           # Browser ESM tests
cd tests/node-comms-cjs && npm test        # CommonJS comms tests
cd tests/node-comms-esm && npm test        # ESM comms tests
```

## Test Framework

All Node.js and Browser compatibility tests use:

- **Vitest** - Modern test runner with excellent TypeScript, ES modules, and browser support
- **Playwright** - Browser automation for browser-based tests
- **Node.js Environment** - Node.js tests run in a Node.js environment to verify server-side compatibility
- **Browser Environment** - Browser tests run in headless Chromium to verify client-side compatibility
- **Hybrid Approach** - Uses ESM for Vitest imports but the appropriate module system for testing the actual packages

## Purpose

These tests ensure that the HPCC Visualization Framework packages work correctly in:

1. **Legacy CommonJS environments** - Using `require()` syntax
2. **Modern ESM environments** - Using `import` syntax in Node.js
3. **Browser ESM environments** - Using `import` syntax in browsers

This provides confidence that the packages are compatible with a wide range of Node.js applications, browser applications, and deployment scenarios.

## Test Coverage

### @hpcc-js/util Package

- Dictionary class operations
- hashSum function consistency
- SAXStackParser instantiation
- Platform utilities
- Export validation (61+ exports)

### @hpcc-js/comms Package

- ESPConnection class instantiation
- WorkunitsService and other service classes
- Workunit and other entity classes
- Communication utilities
- Exception handling classes
- Export validation (131+ exports)

### @hpcc-js/dataflow Package

- Activity functions (map, filter, sort, group, join, etc.)
- Observer functions (count, max, min, mean, median, etc.)
- Utility functions (pipe, generate, isSource)
- Pipeline operations and data transformations
- Statistical computations
- Export validation (25+ exports)

````

### NodeJS CommonJS Tests Only
```bash
cd tests/node-cjs
npm test
````

### Package-Specific Tests

Individual packages have their own test suites in their respective directories:

```bash
cd packages/util
npm test
```

## Test Categories

1. **Unit Tests** - Located in each package's `tests/` directory
2. **Integration Tests** - Browser and Node.js compatibility tests
3. **Type Tests** - TypeScript definition validation
4. **CommonJS Tests** - Node.js CommonJS compatibility
5. **ESM Tests** - Node.js and Browser ESM compatibility

## Adding New Tests

When adding new compatibility tests:

1. Create test files in the appropriate directory (`/node-cjs/`, `/node-esm/`, `/browser-esm/`)
2. Follow the established naming patterns:
   - Node.js: `[package].node.spec.js`
   - Browser: `[package].browser.spec.js`
3. Ensure tests verify both import and basic functionality
4. Include environment-specific tests where appropriate
5. Update this README with new test information

## CI Integration

These tests are integrated into the project's continuous integration pipeline to ensure:

- Package compatibility across environments
- Proper module exports
- Functional correctness in different module systems
