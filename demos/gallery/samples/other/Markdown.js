import { Markdown } from "@hpcc-js/other";

new Markdown()
    .target("target")
    .markdown(`# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading`)
    .render()
    ;
