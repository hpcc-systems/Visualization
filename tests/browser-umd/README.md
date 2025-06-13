# Browser UMD Compatibility Tests

This directory contains tests to verify that `@hpcc-js` packages work correctly in browser environments using UMD (Universal Module Definition) builds.

## Purpose

These tests ensure that:
- The UMD package builds can be successfully loaded in browser environments
- Named imports work correctly with UMD builds
- All major exports are available and functional
- Core functionality works as expected in a browser UMD environment
- Browser-specific features work correctly with UMD builds

## Running Tests

From this directory:
```bash
npm test
```

From the monorepo root:
```bash
npm run test-browser-umd
```

## Test Framework

- **Vitest** - Modern test runner with excellent browser support
- **Playwright** - Browser automation for real browser testing
- **Browser Environment** - Tests run in headless Chromium to verify client-side compatibility
- **UMD Loading** - Uses module resolution aliases to test actual UMD build files

## What's Tested

### @hpcc-js/util Package
- Dictionary class creation and operations
- hashSum function consistency
- SAXStackParser class instantiation
- Platform utility availability (isBrowser, isNode)
- DOM integration capabilities
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
- Browser data processing capabilities
- Export count validation

## Configuration

- `package.json` - Configured for UMD testing with appropriate dependencies
- `vitest.config.js` - Set up for browser testing with module resolution aliases pointing to UMD builds
- Uses both dynamic imports and module resolution to test UMD functionality

## Test Files

- `util.browser.spec.js` - Comprehensive tests for the `@hpcc-js/util` package UMD build
- `comms.browser.spec.js` - Tests for the `@hpcc-js/comms` package UMD build
- `dataflow.browser.spec.js` - Tests for the `@hpcc-js/dataflow` package UMD build

## UMD vs ESM vs CommonJS

Key differences from other test suites:

1. **Module Loading**: Tests UMD builds specifically (`dist/index.umd.cjs` files)
2. **Browser Environment**: Runs in actual browser context using Playwright
3. **Resolution Aliases**: Uses Vite aliases to ensure UMD files are loaded
4. **Universal Compatibility**: Verifies that UMD builds work in browser environments
5. **Build Verification**: Confirms that the actual built UMD files are functional

## UMD Build Testing

The tests verify that:
- UMD builds are properly generated and accessible
- Modules can be imported in browser environments
- All exports are available through the UMD interface
- Functionality is identical to ESM versions
- Browser-specific features work correctly with UMD builds
- Performance characteristics are appropriate for browser usage
