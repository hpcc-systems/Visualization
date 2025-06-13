# Browser ESM Compatibility Tests

This directory contains tests to verify that `@hpcc-js` packages work correctly in browser environments using ES modules.

## Purpose

These tests ensure that:
- The packages can be successfully imported using ESM `import` statements in a browser environment
- Named imports work correctly in browsers
- All major exports are available and functional
- Core functionality works as expected in a browser ESM environment
- Browser-specific features and APIs work correctly with the packages

## Running Tests

From this directory:
```bash
npm test
```

From the monorepo root:
```bash
npm run test-browser-esm
```

## Test Framework

- **Vitest** - Modern test runner with excellent browser testing support
- **Playwright** - Browser automation for running tests in real browser environments  
- **Browser Environment** - Tests run in a headless Chromium browser to verify client-side compatibility

## What's Tested

### @hpcc-js/util Package
- Basic package import functionality
- Named import functionality (ESM-specific)
- Dictionary class creation and operations
- hashSum function consistency
- SAXStackParser class instantiation
- Platform utility availability (isBrowser, isNode)
- Browser-specific DOM operations
- Export count validation

### @hpcc-js/comms Package
- ESPConnection class instantiation
- WorkunitsService and other service classes
- Workunit and other entity classes
- Communication utilities
- Exception handling classes
- Browser-specific connection options
- Export count validation

### @hpcc-js/dataflow Package
- Activity functions (map, filter, sort, group, join, etc.)
- Observer functions (count, max, min, mean, median, etc.)
- Utility functions (pipe, generate, isSource)
- Pipeline operations and data transformations
- Statistical computations
- Browser-specific data processing
- Export count validation

## Configuration

- `package.json` - Configured with `"type": "module"` to test ESM behavior
- `vitest.config.js` - Configured for browser testing with Playwright
- Uses both dynamic imports (`await import()`) and static named imports
- Tests are in `*.browser.spec.js` files following browser test conventions

## Test Files

- `util.browser.spec.js` - Comprehensive tests for the `@hpcc-js/util` package including browser-specific features
- `comms.browser.spec.js` - Tests for the `@hpcc-js/comms` package including browser communication features
- `dataflow.browser.spec.js` - Tests for the `@hpcc-js/dataflow` package including browser data processing

## Browser vs Node.js

Key differences from the Node.js tests:

1. **Environment**: Tests run in a browser environment with access to `window`, `document`, and browser APIs
2. **Platform Detection**: `isBrowser` should be `true`, `isNode` should be `false`
3. **DOM Integration**: Tests verify that packages work correctly with DOM elements and browser-specific features
4. **Additional Tests**: Includes extra tests for browser-specific functionality and DOM operations
5. **Longer Timeouts**: Browser tests may take longer due to browser startup and DOM operations

## Browser-Specific Features Tested

- DOM element access and manipulation
- Browser platform detection
- Window and document object availability
- Browser-specific configuration options
- Client-side data processing scenarios
- Integration with browser APIs

## Requirements

- Playwright browsers must be installed: `npx playwright install`
- Tests require a browser environment and cannot run in Node.js
- Packages must be built and available for import before running tests
