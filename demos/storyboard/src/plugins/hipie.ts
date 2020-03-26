import * as hpccDdlShim from "@hpcc-js/ddl-shim";
import * as hpccMarshaller from "@hpcc-js/marshaller";

export const hipie = {
    async groupBy(json: object[], groupByIDs: string[], aggregates: hpccDdlShim.DDL2.AggregateType[]) {

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
