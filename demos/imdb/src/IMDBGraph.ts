import { Graph } from "@hpcc-js/graph";
import { IMDBEdge } from "./IMDBEdge";
import { IMDBServer, IMovie, IPerson } from "./IMDBServer";
import { IMDBVertex, MovieVertex, PersonVertex } from "./IMDBVertex";

/**
 * The IMDBGraph class manages the master list of "explored" movies and people.
 * It derives from a standard Graph with some minimal visual tweaks.
 */
export class IMDBGraph extends Graph {

    private _server = IMDBServer.attach();
    private verticies: IMDBVertex[] = [];
    private vertexMap: { [id: string]: IMDBVertex } = {};
    private edges: IMDBEdge[] = [];
    private edgeMap: { [id: string]: IMDBEdge } = {};

    constructor() {
        super();

        this
            .layout("ForceDirected2")
            .forceDirectedLinkDistance(150)
            .highlightOnMouseOverVertex(true)
            .hierarchyDigraph(false)
            ;

        this.tooltipHTML(d => d.tooltipHTML());
    }

    clear() {
        this.verticies = [];
        this.vertexMap = {};
        this.edges = [];
        this.edgeMap = {};
    }

    load(movie_person: string): Promise<void> {
        this.clear();
        return this._server.isPerson(movie_person).then(isPerson => {
            if (isPerson) {
                return this._server.person(movie_person).then(person => {
                    return this.createPersonVertex(person).centroid(true);
                });
            }
            return this._server.isMovie(movie_person).then(isMovie => {
                if (isMovie) {
                    return this._server.movie(movie_person).then(movie => {
                        return this.createMovieVertex(movie).centroid(true);
                    });
                }
            });
            return null;
        }).then(v => {
            if (v) {
                return this.expand(v);
            }
        });
    }

    createMovieVertex(movie: IMovie): IMDBVertex {
        let retVal = this.vertexMap[`m: ${movie.title} `];
        if (!retVal) {
            retVal = this.vertexMap[`m: ${movie.title} `] = new MovieVertex(movie);
            this.verticies.push(retVal);
        }
        return retVal;
    }

    createPersonVertex(person: IPerson): IMDBVertex {
        let retVal = this.vertexMap[`p: ${person.name} `];
        if (!retVal) {
            retVal = this.vertexMap[`p: ${person.name} `] = new PersonVertex(person);
            this.verticies.push(retVal);
        }
        return retVal;
    }

    createEdge(source, target, label: "Actor" | "Director"): IMDBEdge {
        const id = `${source.id()} -> ${target.id()} ${label}`;
        let retVal: IMDBEdge = this.edgeMap[id];
        if (!retVal) {
            retVal = this.edgeMap[id] = new IMDBEdge()
                .sourceVertex(source)
                .targetVertex(target)
                .strokeColor(label === "Actor" ? "darkgreen" : "navy")
                .text_text_colorFill(label === "Actor" ? "darkgreen" : "navy")
                .text(label)
                ;
            this.edges.push(retVal);
        }
        return retVal;
    }

    expandMovie(v: MovieVertex): Promise<void> {
        return this._server.moviePeople(v.info().title).then(people => {
            people.directors.forEach(director => {
                const p = this.createPersonVertex(director);
                this.createEdge(p, v, "Director");
            });
            people.actors.forEach(actor => {
                const p = this.createPersonVertex(actor);
                this.createEdge(p, v, "Actor");
            });
        });
    }

    expandPerson(v: PersonVertex): Promise<void> {
        return this._server.personMovies(v.info().name).then(movies => {
            movies.directed.forEach(movie => {
                const m = this.createMovieVertex(movie);
                this.createEdge(v, m, "Director");
            });
            movies.acted.forEach(movie => {
                const m = this.createMovieVertex(movie);
                this.createEdge(v, m, "Actor");
            });
        });
    }

    expand(v: IMDBVertex): Promise<void> {
        v.expanded(true);
        let promise;
        if (v instanceof PersonVertex) {
            promise = this.expandPerson(v);
        } else if (v instanceof MovieVertex) {
            promise = this.expandMovie(v);
        } else {
            promise = Promise.resolve();
        }
        return promise.then(() => {
            this.data({ vertices: this.verticies, edges: this.edges }, true);
        });
    }
}
