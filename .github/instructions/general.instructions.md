---
applyTo: "**"
---
# HPCC Visualization Framework - GitHub Copilot Instructions

## Project Overview

This is the **HPCC Visualization Framework** (also known as "Viz Framework 2.0"), a TypeScript/JavaScript-based data visualization library that provides comprehensive charting, graphing, and dashboard capabilities. The project is published as scoped NPM packages under `@hpcc-js`.

## VSCode Terminal
- **Use the built-in git bash terminal** in VSCode for all commands

## Architecture & Structure

### Monorepo Organization
- **Lerna-based monorepo** with packages in `/packages/` directory
- Each package has its own `package.json`, build configuration, and TypeScript setup
- Packages are published independently to NPM under the `@hpcc-js/` scope
- Use `npm` commands in the root folder for common actions like `clean`, `build` and `lint`
- All sources code is written in TypeScript

### Build System
- **Vite** is the primary compiler + bundler for all packages
- **Support for multiple module formats**: ESM + UMD
- **Source maps** are generated for all builds

### Key Dependencies & Patterns
- **D3.js ecosystem** - Core visualization dependency, aliased through `@hpcc-js/common`
- **Widget pattern** - Most components extend base Widget classes
- **Property-driven APIs** - Components use property setters/getters for configuration
- **TypeScript interfaces** - Strong typing with API interfaces in `@hpcc-js/api` package

## Package Categories

### Core Packages
- **`@hpcc-js/common`** - Base widgets, utilities, and D3 re-exports
- **`@hpcc-js/api`** - TypeScript interfaces and API definitions
- **`@hpcc-js/util`** - Utility functions and helpers

### Visualization Packages
- **`@hpcc-js/chart`** - Charts (Bar, Line, Pie, Scatter, etc.)
- **`@hpcc-js/graph`** - Graph visualizations and network diagrams
- **`@hpcc-js/map`** - Geographic visualizations with Leaflet integration
- **`@hpcc-js/tree`** - Tree and hierarchy visualizations
- **`@hpcc-js/timeline`** - Timeline and temporal visualizations

### UI & Layout Packages
- **`@hpcc-js/layout`** - Layout containers and dashboard components
- **`@hpcc-js/form`** - Form controls and input widgets
- **`@hpcc-js/html`** - HTML-based components and React integration

### Integration Packages
- **`@hpcc-js/marshaller`** - Data marshalling and dashboard orchestration
- **`@hpcc-js/comms`** - Communication with HPCC Systems platform
- **`@hpcc-js/codemirror`** - Code editors for various languages

## Coding Standards & Conventions

### TypeScript
- Use **strict TypeScript** configuration
- Export all public APIs through `index.ts` files
- Import from `@hpcc-js/*` packages, not from internal paths
- Use proper typing with interfaces from `@hpcc-js/api`

### Class Structure
- Extend appropriate base classes (`Widget`, `SVGWidget`, `HTMLWidget`)
- Use property decorators for configurable properties
- Follow the Widget lifecycle: `enter()`, `update()`, `exit()`
- Implement proper `render()` methods

### CSS & Styling
- Use CSS classes with package-specific prefixes
- Bundle CSS through PostCSS in Rollup configuration
- Support theming through CSS custom properties
- Minimize CSS in production builds

### Dependencies
- **Avoid direct D3 imports** - use re-exports from `@hpcc-js/common`
- Use rollup aliases to map D3 modules to `@hpcc-js/common`
- External dependencies should be added to rollup `external` configuration
- Use the `@hpcc-js/bundle` for consistent external/globals configuration

## Testing & Development

### Test Structure
- Tests are in `/tests/` directory organized by package
- Use Vitest as the test runner
- Browser and Node.js test configurations in `vitest.workspace.ts`
- Visual regression testing for visualization components

### Demo Applications
- `/demos/gallery/` - Interactive gallery with live code examples
- `/demos/imdb/` - Real-world application example
- Use SystemJS for dynamic module loading in demos

### Development Workflow
- Use `npm run build` to build all packages
- Use `lerna run <command>` for package-specific operations
- Follow semantic versioning for releases
- Use conventional commits for changelog generation

## Browser & Module Support

### Target Environments
- **Modern browsers** (IE 11+, Chrome, Firefox, Edge)
- **Multiple module systems**: UMD, CommonJS, AMD, ES6
- **CDN delivery** via unpkg with IIFE builds
- **Bundler compatibility** (Webpack, Rollup, Parcel)

### Bundle Configuration
- Use `@hpcc-js/bundle` for consistent externals/globals
- Generate both development and minified builds
- Include source maps for debugging
- Support tree-shaking with ES6 modules

## Common Tasks & Patterns

When working with this codebase:

1. **Adding new visualizations**: Extend appropriate base widget class, implement required interfaces
2. **Package dependencies**: Always use the monorepo's shared dependencies and build configuration
3. **CSS styling**: Use PostCSS processing and minimize for production
4. **Data handling**: Follow the property-driven API pattern for data binding
5. **TypeScript**: Maintain strict typing and export proper interfaces
6. **Testing**: Include both unit tests and visual regression tests
7. **Documentation**: Update gallery examples and README files
8. **Build configuration**: Use consistent Rollup setup across packages

## HPCC Platform Integration

This framework is designed to work with the **HPCC Systems** big data platform:
- ECL (Enterprise Control Language) integration
- Roxie query integration through `@hpcc-js/comms`
- Workunit result visualization
- ESP (Enterprise Services Platform) connectivity
