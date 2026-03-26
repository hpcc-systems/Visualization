---
applyTo: "packages/graph/src/graphviz/**"
---
# Graphviz Module Instructions

## Overview
The `src/graphviz/` module renders directed graphs using the Graphviz DOT layout engine. It converts a graph model (`Store`) into DOT language via `DotWriter`, lays it out with the Graphviz WASM engine, and renders the resulting SVG in a `Widget`.

## Key Components
- **Store** — Graph data model extending `Graph2<Vertex, Edge, Subgraph>`. Holds vertices, edges, and subgraphs.
- **DotWriter** — Serializes the Store into Graphviz DOT language.
- **Widget** — SVG-based rendering widget that displays the laid-out graph.
- **types.ts** — Entity interfaces (`Vertex`, `Edge`, `Subgraph`) with optional `fill` and `stroke` properties.

## Graphviz DOT Attributes
Entity styling (`fill`, `stroke`) is applied in the DOT output via native Graphviz attributes:
- `color` — Border/stroke color (maps to entity `stroke` property)
- `fillcolor` — Fill color (maps to entity `fill` property)

For the full list of Graphviz attributes, see: https://graphviz.org/doc/info/attrs.html

## Styling Architecture
- **CSS custom properties** defined in `Widget.css` control default colors (`--gv-bg`, `--gv-fg`, `--gv-border`, `--gv-select-stroke`, `--gv-select-fill`).
- These use `light-dark()` for automatic light/dark mode support, inheriting `color-scheme` from the host document.
- Per-entity colors are set via the `fill`/`stroke` fields on `Vertex`, `Edge`, and `Subgraph` interfaces and emitted as DOT `fillcolor`/`color` attributes by `DotWriter`.
- Selection highlight colors are applied via inline styles in `Widget._selectionChanged()`.

## Important Conventions
- Do NOT use domain-specific concepts (e.g., status, started, completed) in the graphviz module — keep it generic.
- Color values in the DOT output that match `"black"`, `"white"`, or `"whitesmoke"` are replaced with CSS custom property references during SVG rendering.
