import { hpccRequire } from "./util";

export const hipie = {
    async groupBy(json: object[], groupByIDs: string[], aggregates) {
        const hpccMarshaller = await hpccRequire("@hpcc-js/marshaller");

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
