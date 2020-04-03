import { require as d3Require } from "d3-require";

export const hipie = {
    async groupBy(json: object[], groupByIDs: string[], aggregates) {
        const hpccMarshaller = await d3Require("@hpcc-js/marshaller");

        const db = new hpccMarshaller.Databomb()
            .format("json")
            .payload(JSON.stringify(json))
            ;
        const gb = hpccMarshaller.GroupBy.fromDDL({
            type: "groupby",
            groupByIDs,
            aggregates
        });
        const pipeline = new hpccMarshaller.ActivityPipeline()
            .activities([db, gb])
            ;

        await pipeline.refreshMeta();
        await pipeline.exec();
        return pipeline.outData();
    }
};
