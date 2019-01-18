import { JSONEditor } from "@hpcc-js/codemirror";
import { Connection } from "@hpcc-js/comms";

new Connection({
    baseUrl: "https://api.pushshift.io/",
    type: "get"
})
.send("reddit/search/submission/", {
    "subreddit":"askreddit",
    "sort":"desc",
    "sort_type":"created_utc",
    "size":"5",
}).then((json) => {
    new JSONEditor()
        .target("target")
        .json(json)
        .render()
        ;
})
.catch((e) => {
    console.error(e);
})
;