import { Table } from "@hpcc-js/dgrid";
import { MovieVertex, PersonVertex } from "./IMDBVertex";

/**
 * The IMDBTable base class provides common implementations of:
 * * Default styling.
 */
class IMDBTable extends Table {

    constructor() {
        super();
        this
            .pagination(false)
            .sortable(true)
            ;
    }
}

/**
 * The MovieTable provides a specific view of the Move data.
 */
export class MovieTable extends IMDBTable {

    constructor() {
        super();
        this.columns(["Rank", "Title", "Rating"]);
    }

    /**
     * Loads the table with movie information
     */
    load(vertices: MovieVertex[]) {
        this.data(vertices.map((v, i) => {
            const d = v.info();
            //  Include the origonal "vertex" in a hidden column for click event ---
            return [d.rank, d.title, d.rating, v];
        }));
    }
}

/**
 * The PersonTable provides a specific view of the People data.
 */
export class PersonTable extends IMDBTable {

    constructor() {
        super();
        this.columns(["Name", "Directed ##", "Acted ##"]);
    }

    /**
     * Loads the table with person information
     */
    load(vertices: PersonVertex[]) {
        this.data(vertices.map((v, i) => {
            const d = v.info();
            //  Include the origonal "vertex" in a hidden column for click event ---
            return [d.name, d.directed.length, d.acted.length, v];
        }));
    }
}
