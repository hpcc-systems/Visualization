# @hpcc-js (*aka Viz Framework 2.0*)

![Test PR](https://github.com/hpcc-systems/Visualization/workflows/Test%20PR/badge.svg)
[![Join the chat at https://gitter.im/hpcc-systems/Visualization](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hpcc-systems/Visualization?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The **HPCC Visualization Framework** is a comprehensive TypeScript/JavaScript-based data visualization library that provides charting, graphing, and dashboard capabilities. Published as scoped NPM packages under `@hpcc-js`, this framework is designed to work seamlessly with the HPCC Systems big data platform while being flexible enough for general-purpose visualization needs.

## How to get started?
1. [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start): Covers the basics on how to include the framework into your web application.
2. [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials): Starting with a simple "hello world", the tutorials walk through the basics of instantiating visualizations, fetching data and creating dashboards.
3. [Gallery](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/index.html): Interactive gallery with live code examples and a property editor for discovering the capabilities of each visualization.

## Architecture & Overview

### Monorepo Structure
This is a **Lerna-based monorepo** with packages organized in the `/packages/` directory. Each package has its own `package.json`, build configuration, and TypeScript setup. Packages are published independently to NPM under the `@hpcc-js/` scope.

### Build System
- **Vite** is the primary compiler and bundler for all packages
- **TypeScript** source code with strict configuration
- **Multiple module formats**: ESM, UMD, and IIFE
- **Source maps** generated for all builds
- **PostCSS** for CSS processing and minification

### Package Categories

#### Core Packages
- **`@hpcc-js/common`** - Base widgets, utilities, and D3 re-exports
- **`@hpcc-js/api`** - TypeScript interfaces and API definitions  
- **`@hpcc-js/util`** - Utility functions and helpers

#### Visualization Packages
- **`@hpcc-js/chart`** - Charts (Bar, Line, Pie, Scatter, etc.)
- **`@hpcc-js/graph`** - Graph visualizations and network diagrams
- **`@hpcc-js/map`** - Geographic visualizations with Leaflet integration
- **`@hpcc-js/tree`** - Tree and hierarchy visualizations
- **`@hpcc-js/timeline`** - Timeline and temporal visualizations

#### UI & Layout Packages
- **`@hpcc-js/layout`** - Layout containers and dashboard components
- **`@hpcc-js/form`** - Form controls and input widgets
- **`@hpcc-js/html`** - HTML-based components and React integration

#### Integration Packages
- **`@hpcc-js/marshaller`** - Data marshalling and dashboard orchestration
- **`@hpcc-js/comms`** - Communication with HPCC Systems platform
- **`@hpcc-js/codemirror`** - Code editors for various languages

### Browser & Module Support

#### Target Environments
- **Modern browsers** (Chrome, Firefox, Edge, Safari)
- **Node.js** for server-side rendering and data processing

#### Module Formats
- **ES6 modules** (primary format for tree-shaking and modern bundlers)
- **UMD** (Universal Module Definition for broad compatibility)
- **IIFE** (Immediately Invoked Function Expression for direct browser usage)
- **CommonJS** support for Node.js environments

#### Bundler Compatibility
- **Vite** (recommended)
- **Webpack** 
- **Rollup.js**
- **Parcel**
- **Direct CDN usage** via unpkg

## Installation

### Via NPM (Recommended)

To install via npm, use `npm install` with the specific packages you need. Each package is scoped with "@hpcc-js":

```bash
npm install @hpcc-js/chart @hpcc-js/map @hpcc-js/common
```

### Via CDN (Quick Start)

For quick prototyping, you can load packages directly from unpkg CDN:

```html
<script src="https://unpkg.com/@hpcc-js/util"></script>
<script src="https://unpkg.com/@hpcc-js/api"></script>
<script src="https://unpkg.com/@hpcc-js/common"></script>
<script src="https://unpkg.com/@hpcc-js/chart"></script>
```

You can see all available packages at: [https://www.npmjs.com/search?q=maintainer:hpcc-js](https://www.npmjs.com/search?q=maintainer:hpcc-js)

## Usage Examples

### ES6 Modules (Recommended)

```javascript
import { Bar } from "@hpcc-js/chart";

const chart = new Bar()
    .target("placeholder")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .render();
```

### AMD

```javascript
require(["@hpcc-js/chart"], function(hpccChart) {
    const chart = new hpccChart.Bar()
        .target("placeholder")
        .columns(["Subject", "Year 1", "Year 2", "Year 3"])
        .data([
            ["Geography", 75, 68, 65],
            ["English", 45, 55, -52],
            ["Math", 98, 92, 90],
            ["Science", 66, 60, 72]
        ])
        .render();
});
```

### IIFE (Browser Global)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Simple Bar Chart</title>
    <script src="https://unpkg.com/@hpcc-js/util"></script>
    <script src="https://unpkg.com/@hpcc-js/common"></script>
    <script src="https://unpkg.com/@hpcc-js/api"></script>
    <script src="https://unpkg.com/@hpcc-js/chart"></script>
</head>
<body>
    <div id="placeholder" style="width:800px; height:600px;"></div>
    <script>
        const hpccChart = window["@hpcc-js/chart"];
        const chart = new hpccChart.Bar()
            .target("placeholder")
            .columns(["Subject", "Year 1", "Year 2", "Year 3"])
            .data([
                ["Geography", 75, 68, 65],
                ["English", 45, 55, -52],
                ["Math", 98, 92, 90],
                ["Science", 66, 60, 72]
            ])
            .render();
    </script>
</body>
</html>
```

## Developer Zone

### Prerequisites
- **Node.js** LTS (18.x or later recommended)
- **Git** for version control

### Setting up a Development Environment

1. **Clone the repository:**
```bash
git clone https://github.com/hpcc-systems/Visualization.git Visualization
cd Visualization
```

2. **Install dependencies:**
```bash
npm install
```

3. **Build all packages:**
```bash
npm run build
```

4. **Start the development server:**
```bash
cd demos/gallery
npm run bundle-watch
```

The gallery will be available at `http://localhost:5500` with hot reloading for development.

### Common Development Tasks

#### Building
```bash
# Build all packages
npm run build

# Clean all build artifacts
npm run clean
```

#### Linting
```bash
# Lint all packages
npm run lint

# Fix linting issues automatically
npm run lint-fix
```

#### Testing
```bash
# Run all tests
npm run test

# Run browser tests
npm run test-browser

# Run Node.js tests  
npm run test-node
```

#### Working with Individual Packages
```bash
# Navigate to a specific package
cd packages/chart

# Build just this package
npm run build

# Run tests for this package
npm run test
```

### Full Clean

To completely reset your development environment:

```bash
npm run clean
npm run uninstall
rm -rf node_modules
npm install
```

## HPCC Platform Integration

This framework is designed to work with the **HPCC Systems** big data platform, providing:

- **ECL (Enterprise Control Language)** integration
- **Roxie query integration** through `@hpcc-js/comms`
- **Workunit result visualization**
- **ESP (Enterprise Services Platform)** connectivity
- **Real-time data streaming** capabilities

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.
