import { Layout } from "./layout";

export class Null extends Layout {

    start(): Promise<this> {
        return super.start().then(() => {
            this.stop();
            return this;
        });
    }
}

export class Initial extends Layout {

    start(): Promise<this> {
        return super.start().then(() => {
            const size = this._graph.size();
            const data = this._graph.graphData();
            data.edges().forEach(e => delete e.points);
            //  Avoid edges of 0 length ---
            data.vertices().forEach(v => {
                v.x = size.width / 2 + Math.random() * 5 - 2.5;
                v.y = size.height / 2 + Math.random() * 5 - 2.5;
            });
            this._graph
                .moveVertices(true)
                .moveEdges(true)
                ;
            this.stop();
            return this;
        });
    }
}
