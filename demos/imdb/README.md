# IMDB Graph Tutorial

_A working example of an interactive graph visualization - [live demo](https://raw.githack.com/hpcc-systems/Visualization/master/demos/imdb/index.html)_

![Animated Demo](readme.gif)

## Project Layout

* **data**:  Sample IMDB dataset
* **doc**:  [API Documentation](https://raw.githack.com/hpcc-systems/Visualization/master/demos/imdb/doc/index.html) (experimental)
* **src**:  Source Code (TypeScript)
    * **index.ts**:  Main page (SPA) - could be bootstrap / React / Angular etc.
    * **IMDBGraph.ts**:  IMDB Specific Graph Widget
    * **IMDBVertex.ts**:  IMDB Specific Vertex (node) Widgets
    * **IMDBEdge.ts**:  IMDB Specific Eege (link) Widget 
    * **IMDBTable.ts**:  IMDB Specific Table Widgets
    * **IMDBServer.ts**:  "Fake" IMDB Web Service
* **src-umd**:  Source Code (JavaScript) generated from src folder (only included so demo can run on githack.com).
* **style**: CSS Style sheet(s)
* **index.html**: Main html page - note: This file is a bit "special" as its designed to work with local sources (unbundled development mode) and also while hosted on GitHub with the official releases (using unpkg).  For better examples on how to include the @hpcc-js packages please see the [Quick-Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start) wiki.
* **package.json**:  npm dependencies
* **README.md**:  This file
* **tsconfig.json**:  TypeScript compiler options

**Note**:  The goal of this demo is to show a basic interactive Graph - the web application "scaffolding" is sub optimal as it needs to support the following two scenarios:
* Local development mode (works with local unbundled sources).
* GitHub hosted demo (dynamically load bundled modules from unpkg.com).

## IMDB Graph Widget
[src/IMDBGraph.ts](src/IMDBGraph.ts) contains the main "IMDB" Graph widget

## IMDB Vertex (node) Widget
[src/IMDBVertex.ts](src/IMDBVertex.ts) contains the following "IMDB" Vertex widgets
* **IMDBVertex**:  Base class for MovieVertex and PersonVertex (nodes)
* **MovieVertex**:  The Movie specific vertex (node)
* **PersonVertex**:  The Person specific vertex (node)

## IMDB Edge (link) Widget
[src/IMDBEdge.ts](src/IMDBEdge.ts) contains the "IMDB" Edge (link) widget

## IMDB Table Widget
[src/IMDBTable.ts](src/IMDBTable.ts) contains the "IMDB" tables:
* **MovieTable**: Table for displaying Movie information
* **PersonTable**: Table for displaying Person information

## Main App
[src/index.ts](src/index.ts) contains the main web page (typically this would be a Bootstrap, React, Angular, ... app).  Its notable content is:
* Instantiates the main Graph and listens for vertex double click events
* Instantiates the Movie Table and listens for single click events
* Instantiates the Person Table and listens for single click events

Event handlers:
* Movie / Person Vertex Double Click:  Query the server for new links and update the graph / tables
* Movie / Person Table Click: Center the graph on the clicked row.

