import { csv as d3Csv } from "d3-fetch";

export interface IPerson {
    name: string;
    directed: string[];
    acted: string[];
}

export interface IMovie {
    title: string;
    directors: string[];
    actors: string[];
    rank?: number;
    genre?: string;
    description?: string;
    year?: number;
    runtime?: number;
    rating?: number;
    votes?: number;
    revenue?: number;
    metaScore?: number;
}

let data: IMDBServer;
export class IMDBServer {
    /*
        This is a "fake" IMDB server
        There are a lot of uneeded promises to emulate what it would be like if actually calling a real server.
    */

    private _movieMap: { [title: string]: IMovie } = {};
    private _personMap: { [name: string]: IPerson } = {};

    private constructor() {
    }

    static attach(): IMDBServer {
        if (!data) {
            data = new IMDBServer();
        }
        return data;
    }

    private _movie(title: string): IMovie {
        let retVal = this._movieMap[title.trim()];
        if (!retVal) {
            retVal = this._movieMap[title.trim()] = {
                title,
                directors: [],
                actors: []
            };
        }
        return retVal;
    }

    async movie(title: string): Promise<IMovie> {
        await this.load();
        return this._movie(title);
    }

    async isMovie(title: string): Promise<boolean> {
        await this.load();
        return !!this._movieMap[title];
    }

    async movieDirectors(title: string): Promise<IPerson[]> {
        const movie = await this.movie(title);
        return Promise.all(movie.directors.map(p => this.person(p)));
    }

    async movieActors(title: string): Promise<IPerson[]> {
        const movie = await this.movie(title);
        return Promise.all(movie.actors.map(p => this.person(p)));
    }

    async moviePeople(title: string): Promise<{ directors: IPerson[], actors: IPerson[] }> {
        return Promise.all([this.movieDirectors(title), this.movieActors(title)]).then(all => {
            return {
                directors: all[0],
                actors: all[1]
            };
        });
    }

    private _person(name: string): IPerson {
        let retVal = this._personMap[name];
        if (!retVal) {
            retVal = this._personMap[name] = {
                name,
                directed: [],
                acted: []
            };
        }
        return retVal;
    }

    async person(name: string): Promise<IPerson> {
        await this.load();
        return this._person(name);
    }

    async isPerson(name: string): Promise<boolean> {
        await this.load();
        return !!this._personMap[name];
    }

    async directedMovies(name: string): Promise<IMovie[]> {
        const person = await this.person(name);
        return Promise.all(person.directed.map(m => this.movie(m)));
    }

    async actedMovies(name: string): Promise<IMovie[]> {
        const person = await this.person(name);
        return Promise.all(person.acted.map(m => this.movie(m)));
    }

    async personMovies(name: string): Promise<{ directed: IMovie[], acted: IMovie[] }> {
        return Promise.all([this.directedMovies(name), this.actedMovies(name)]).then(all => {
            return {
                directed: all[0],
                acted: all[1]
            };
        });
    }

    private _loaded: Promise<void>;
    private load(): Promise<void> {
        if (!this._loaded) {
            this._loaded = d3Csv("./data/IMDB-Movie-Data.csv", (d, idx) => {
                const movie = this._movie(d.Title);
                d.Director.split(",").forEach(director => {
                    const person = this._person(director.trim());
                    person.directed.push(movie.title);
                    movie.directors.push(person.name);
                });
                d.Actors.split(",").forEach(actor => {
                    const person = this._person(actor.trim());
                    person.acted.push(movie.title);
                    movie.actors.push(person.name);
                });
                movie.rank = +d["Rank"];
                movie.genre = d["Genre"];
                movie.description = d["Description"];
                movie.year = +d["Year"];
                movie.runtime = +d["Runtime (Minutes)"];
                movie.rating = +d["Rating"];
                movie.votes = +d["Votes"];
                movie.revenue = +d["Revenue (Millions)"];
                movie.metaScore = +d["Metascore"];
                return d;
            });
        }
        return this._loaded;
    }
}
