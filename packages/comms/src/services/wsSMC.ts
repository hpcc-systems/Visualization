import { timeParse } from "d3-time-format";
import { SMCServiceBase, WsSMC } from "./wsdl/WsSMC/v1.28/WsSMC.ts";
import { IOptions } from "../connection.ts";

export {
    WsSMC
};

const dateParser = timeParse("%Y%m%d%H");

function isNumeric(value: any): boolean {
    return typeof value === "number" || (typeof value === "string" && value.trim() !== "" && !isNaN(+value));
}

export interface NormalisedGlobalMetric {
    Category: string;
    Start: Date;
    End: Date;
    dimensions: { [key: string]: any };
    stats: { [key: string]: any };
}

export class SMCService extends SMCServiceBase {

    connectionOptions(): IOptions {
        return this._connection.opts();
    }

    Activity(request: WsSMC.Activity): Promise<WsSMC.ActivityResponse> {
        return super.Activity(request).then(response => {
            return {
                Running: {
                    ActiveWorkunit: []
                },
                ...response
            };
        });
    }

    protected parseGlobalMetric(name: string, value: any): any {
        // Known Prefixes:  Cost, Critical, Definition, Disk, Distribute, Ecl, Enum, Id, Interface, Is, Library, Load, Match, Meta, Num, Original, Output, Patch, Per, Persist, Predicted, Record, Section, Service, Signed, Size, Source, Spill, Target, Time, Updated, When
        if (name.startsWith("Cost")) {
            return +value / 1000000;
        } else if (name.startsWith("Date")) {
            return dateParser(value);
        } else if (name.startsWith("Num")) {
            return +value;
        } else if (name.startsWith("Time")) {
            return +value / 1000000000;
        } else if (name.startsWith("When")) {
            return new Date(+value / 1000).toISOString();
        } else if (isNumeric(value)) {
            return +value;
        }
        return value;
    }

    GetNormalisedGlobalMetrics(request: Partial<WsSMC.GetGlobalMetrics>): Promise<NormalisedGlobalMetric[]> {
        return super.GetGlobalMetrics(request).then(response => {
            const retVal: NormalisedGlobalMetric[] = [];
            for (const metric of response?.GlobalMetrics?.GlobalMetric || []) {
                const row: NormalisedGlobalMetric = {
                    Category: metric.Category,
                    Start: this.parseGlobalMetric("Date", metric.DateTimeRange?.Start),
                    End: this.parseGlobalMetric("Date", metric.DateTimeRange?.End),
                    dimensions: {},
                    stats: {}
                };
                for (const dimension of metric.Dimensions?.Dimension || []) {
                    row.dimensions[dimension.Name] = dimension.Value;
                }
                for (const stat of metric.Stats?.Stat || []) {
                    row.stats[stat.Name] = this.parseGlobalMetric(stat.Name, stat.Value);
                }
                retVal.push(row);
            }
            return retVal;
        });
    }
}
