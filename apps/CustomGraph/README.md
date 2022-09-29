# Custom React Graph Demo

_A working example of a custom graph visualization using React vertices and edges - [live demo](https://raw.githack.com/hpcc-systems/Visualization/trunk/apps/CustomGraph/index.html)_

![Screenshot](readme.png)

## Project Layout

* **src**:  Source Code (TypeScript)
    * **index.ts**:  Main page (SPA) - could be bootstrap / React / Angular etc.
    * **data**:  Sample dataset
    * **graph.ts**:  IMDB Specific Graph Widget
    * **vertex.ts**:  IMDB Specific Vertex (node) Widgets
    * **edge.ts**:  IMDB Specific Eege (link) Widget 
* **style**: CSS Style sheet(s)
* **index.html**: Main html page.
* **package.json**:  npm dependencies
* **README.md**:  This file
* **tsconfig.json**:  TypeScript compiler options
* **webpack.json**:  WebPack bundle options

**Note**:  The goal of this demo is to show how to create custom vertices and edges using React.

## IMDB Graph Widget
[src/IMDBGraph.ts](src/IMDBGraph.ts) contains the main "IMDB" Graph widget

