import { Vertex } from "@hpcc-js/graph";
import { ChartPanel } from "@hpcc-js/layout";
import { SplitPanel, TabPanel } from "@hpcc-js/phosphor";
import { IMDBGraph } from "./IMDBGraph";
import { MovieTable, PersonTable } from "./IMDBTable";
import { MovieVertex, PersonVertex } from "./IMDBVertex";

export class App extends SplitPanel {

    private _root = "J.J. Abrams";

    private _sheetRight = new TabPanel();
    private _graphPanel = new ChartPanel()
        .title("IMDB 1000")
        .legendButtonVisible(false)
        .downloadButtonVisible(false)
        .dataButtonVisible(false)
        .on("vertex_dblclick", (row, col, sel, ext) => {
            this._graph.expand(ext.vertex).then(() => {
                this.refreshTables(true);
            });
        }, true);
    private _graph = new IMDBGraph()
        ;
    private _gridMovies = new MovieTable()
        .on("click", (row, col, sel) => {
            if (sel) {
                this.centerOn(row.__lparam);
            }
        })
        ;
    private _gridPeople = new PersonTable()
        .on("click", (row, col, sel) => {
            if (sel) {
                this.centerOn(row.__lparam);
            }
        })
        ;

    constructor() {
        super("horizontal");
    }

    root(_: string) {
        this._root = _;
        return this;
    }

    centerOn(vertex: Vertex, resetZoom = false) {
        this._graph
            .selection([vertex])
            ;
        if (resetZoom) {
            this._graph.zoomToItem(vertex);
        } else {
            this._graph.centerOnItem(vertex);
        }
    }

    refreshTables(render: boolean = false) {
        const movies = [];
        const people = [];
        this._graph.data().vertices.forEach(v => {
            if (v instanceof MovieVertex) {
                movies.push(v);
            } else if (v instanceof PersonVertex) {
                people.push(v);
            }
        });
        this._gridMovies
            .load(movies)
            ;
        this._gridPeople
            .load(people)
            ;

        if (render) {
            this._graph.render();
            this._gridMovies.render();
            this._gridPeople.render();
        }
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._graphPanel.widget(this._graph);

        this._sheetRight
            .addWidget(this._gridMovies, "Movies")
            .addWidget(this._gridPeople, "People")
            ;
        this
            .addWidget(this._graphPanel)
            .addWidget(this._sheetRight)
            ;
    }

    _prevRoot;
    update(domNode, element) {
        super.update(domNode, element);
        if (this._prevRoot !== this._root) {
            this._prevRoot = this._root;
            //  Wait for initial render to have finished (all animations)
            setTimeout(() => {
                this._graph.load(this._root).then(() => {
                    this.refreshTables(true);
                });
            }, 750);
        }
    }
}
