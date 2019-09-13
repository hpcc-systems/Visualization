import { Widget } from "@hpcc-js/common";
import { ClassMeta } from "./classMeta.js";
import { PublishedProperties } from "./publishedProperties.js";
import { Sample } from "./sample.js";
import { SampleCarousel } from "./sampleCarousel.js";
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
        case "sample-carousel":
            return new SampleCarousel().data(data);
        case "javascript":
            return new Source("text/javascript").data(data);
        case "html":
            return new Source("text/html").data(data);
        case "json":
            return new Source("text/json").data(data);
        case "shell":
            return new Source("text/x-sh", 0).data(data);
    }
    if (infostring.indexOf("@hpcc-js") === 0) {
        return new PublishedProperties().data(data);
    }
    return undefined;
}
