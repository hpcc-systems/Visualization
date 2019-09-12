import { Widget } from "@hpcc-js/common";
import { ClassMeta } from "./classMeta.js";
import { PublishedProperties } from "./publishedProperties.js";
import { Sample } from "./sample.js";
import { Source } from "./source.js";
import { SourceSample } from "./sourceSample.js";
import { SourceSampleTabbed } from "./sourceSampleTabbed.js";

export function markdownWidget(infostring: string, text: string): Widget | undefined {
    const data = [[infostring, text]];
    switch (infostring) {
        case "meta":
            return new ClassMeta().data(data);
        case "sample":
            return new Sample().data(data);
        case "sample-code-tabbed":
            return new SourceSampleTabbed().data(data);
        case "sample-code-split":
        case "sample-code":
            return new SourceSample().data(data);
        case "javascript":
            return new Source("text/javascript").data(data);
    }
    if (infostring.indexOf("@hpcc-js") === 0) {
        return new PublishedProperties().data(data);
    }
    return undefined;
}