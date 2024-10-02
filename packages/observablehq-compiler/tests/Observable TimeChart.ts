export const timechart = {
    "id": "01b9f5889f32d3e6",
    "slug": "timechart",
    "trashed": false,
    "description": "",
    "likes": 99,
    "publish_level": "public",
    "forks": 1,
    "fork_of": null,
    "update_time": "2021-10-26T00:12:05.970Z",
    "publish_time": "2021-04-21T16:50:27.577Z",
    "publish_version": 1602,
    "latest_version": 1602,
    "thumbnail": "b5c772e23e58a13c935d721ba487648b8c81be0f03530ccdfb126cf439fc5252",
    "default_thumbnail": "76f5a7a0f5639576fa2192726f81f687a476ae6f1760b88fc608e458088be2e6",
    "roles": [],
    "sharing": null,
    "owner": {
        "id": "f35c755083683fe5",
        "avatar_url": "https://avatars.observableusercontent.com/avatar/5a51c3b908225a581d20577e488e2aba8cbc9541c52982c638638c370c3e5e8e",
        "login": "observablehq",
        "name": "Observable",
        "bio": "Use data to think, together.",
        "home_url": "https://observablehq.com",
        "type": "team",
        "tier": "enterprise"
    },
    "creator": {
        "id": "074c414ad1d825f5",
        "github_login": "mbostock",
        "avatar_url": "https://avatars.observableusercontent.com/avatar/82811927da99f8938001b2ef1f552ad2c47083e46ebc55a3a146a5a5848c4519",
        "login": "mbostock",
        "name": "Mike Bostock",
        "bio": "Building a better computational medium. Founder @observablehq. Creator @d3. Former @nytgraphics. Pronounced BOSS-tock.",
        "home_url": "https://bost.ocks.org/mike/",
        "tier": "basic"
    },
    "authors": [
        {
            "id": "074c414ad1d825f5",
            "avatar_url": "https://avatars.observableusercontent.com/avatar/82811927da99f8938001b2ef1f552ad2c47083e46ebc55a3a146a5a5848c4519",
            "name": "Mike Bostock",
            "login": "mbostock",
            "bio": "Building a better computational medium. Founder @observablehq. Creator @d3. Former @nytgraphics. Pronounced BOSS-tock.",
            "home_url": "https://bost.ocks.org/mike/",
            "github_login": "mbostock",
            "tier": "basic",
            "approved": true,
            "description": ""
        }
    ],
    "collections": [
        {
            "id": "7eea0c678f957b61",
            "type": "public",
            "slug": "libraries",
            "title": "Libraries",
            "description": "Reusable notebooks, ready for import and remix.",
            "update_time": "2020-12-01T00:42:27.585Z",
            "pinned": true,
            "ordered": true,
            "custom_thumbnail": "a578557db9cf6c6689c756dd42172a43ad8d87b195c9589fcbe1e9a0cae9cdef",
            "default_thumbnail": "5a8d92da8e3ba985b0f568c02543420a883fe44998e12fb266cdb0a907d0b98d",
            "thumbnail": "a578557db9cf6c6689c756dd42172a43ad8d87b195c9589fcbe1e9a0cae9cdef",
            "listing_count": 25,
            "parent_collection_count": 1,
            "owner": {
                "id": "f35c755083683fe5",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/5a51c3b908225a581d20577e488e2aba8cbc9541c52982c638638c370c3e5e8e",
                "login": "observablehq",
                "name": "Observable",
                "bio": "Use data to think, together.",
                "home_url": "https://observablehq.com",
                "type": "team",
                "tier": "enterprise"
            }
        }
    ],
    "files": [],
    "comments": [
        {
            "id": "c1cb43d1f29b329a",
            "content": "I don't see a demo of using TimeAxis, especially combined with a TimeChart within a single cell (to get a grid behind all the TimeCharts?)",
            "node_id": 810,
            "create_time": "2021-04-20T17:56:17.801Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "595405df3c534894",
                "github_login": "enjalot",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/549bdb0c368027004b51c4e95459e9c224331e0fec9c4cc97d181f83e55ab7f9",
                "login": "enjalot",
                "name": "Ian Johnson",
                "bio": "pixel flipper, data sifter. trying to see what I can while I'm here",
                "home_url": "http://enjalot.github.io",
                "tier": "basic"
            }
        },
        {
            "id": "e94ad11ff619c2ae",
            "content": "It’s not intended to be used that way, primarily; it’s intended to be used with one cell per chart, so that you can use the Observable UI to reorder the time series or comment on them separately. But we could include an example of that as an advanced topic.",
            "node_id": 810,
            "create_time": "2021-04-20T19:07:08.746Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "074c414ad1d825f5",
                "github_login": "mbostock",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/82811927da99f8938001b2ef1f552ad2c47083e46ebc55a3a146a5a5848c4519",
                "login": "mbostock",
                "name": "Mike Bostock",
                "bio": "Building a better computational medium. Founder @observablehq. Creator @d3. Former @nytgraphics. Pronounced BOSS-tock.",
                "home_url": "https://bost.ocks.org/mike/",
                "tier": "basic"
            }
        },
        {
            "id": "c56f3e64b046d26a",
            "content": "Added example, and also set the default marginTop to 0 instead of -16 so that you have to opt-in to the special overlapping behavior.",
            "node_id": 810,
            "create_time": "2021-04-21T16:32:27.753Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "074c414ad1d825f5",
                "github_login": "mbostock",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/82811927da99f8938001b2ef1f552ad2c47083e46ebc55a3a146a5a5848c4519",
                "login": "mbostock",
                "name": "Mike Bostock",
                "bio": "Building a better computational medium. Founder @observablehq. Creator @d3. Former @nytgraphics. Pronounced BOSS-tock.",
                "home_url": "https://bost.ocks.org/mike/",
                "tier": "basic"
            }
        },
        {
            "id": "a9022775a908bb19",
            "content": "Thank you for continuing your wonderful work!\nNot to be critical, but I can't help but wonder about the usability of the TimeChart representation.\nEven after using the tooltip and reading the other notebooks that describe Horizon Charts, I struggle to understand how to interpret the combination of color and vertical offset. Perhaps adding a color swatch legend with labeled value ranges would help?\nAlso, is TimeChart recommended for any time-series or just data with smooth/continuously varying values like those that can be approximated with sine -- I wonder how easy it would be to interpret if the values did not vary smoothly, such as random values.\nThanks!",
            "node_id": 810,
            "create_time": "2021-04-22T18:42:36.922Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "ba5c813f0f621f19",
                "github_login": "jonhelfman",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/a404535763c16060490629d896d876b5b4cea8c603c4993b2aaed749a15b041a",
                "login": "jonhelfman",
                "name": "Jonathan Helfman",
                "bio": "Student of math, d3, svg, etc. Prototyper of visualizations for electronics design and test. ",
                "home_url": "",
                "tier": "basic"
            }
        },
        {
            "id": "b50ff7cf4c649ac5",
            "content": "I’ve been using horizon charts for years (e.g. [1]) so I would say try it for a while and see if you like it? It’s definitely my go-to for looking at time series. If you have strictly random (or highly noisy) values you’re not likely to see anything interesting by visualizing anyway, so it’s hard to answer your question directly.\n\nAlso, if you want to ease it to horizon charts, you could start by setting the bands: 1 option and you’ll get a basic area chart.\n\n[1] https://square.github.io/cubism/",
            "node_id": 810,
            "create_time": "2021-04-22T19:07:24.992Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "074c414ad1d825f5",
                "github_login": "mbostock",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/82811927da99f8938001b2ef1f552ad2c47083e46ebc55a3a146a5a5848c4519",
                "login": "mbostock",
                "name": "Mike Bostock",
                "bio": "Building a better computational medium. Founder @observablehq. Creator @d3. Former @nytgraphics. Pronounced BOSS-tock.",
                "home_url": "https://bost.ocks.org/mike/",
                "tier": "basic"
            }
        },
        {
            "id": "6a53b6d8646cf35a",
            "content": "Thanks for your response and the link. Sorry for not being clearer, but when I ask about usability I am attempting to speak for the person who may not be an expert in interpreting visualizations. \nOur time-series customers are used to oscilloscope traces and I'm just wondering if they can benefit from horizon charts.\nSince most charts that use color to show quantities include a legend to aid interpretation, please consider this as a suggestion for possibly improving TimeChart to make it more usable/useful for the non-expert. \nRegarding the question about smoothly varying values -- yes strictly random is a bad example -- a better example would be a dataset consisting of smoothly varying values (like you have) but with some far/extreme outliers mixed in. I'm not seeing that sort of data on the Cubism page either. . .\nThanks again!",
            "node_id": 810,
            "create_time": "2021-04-22T22:45:28.711Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "ba5c813f0f621f19",
                "github_login": "jonhelfman",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/a404535763c16060490629d896d876b5b4cea8c603c4993b2aaed749a15b041a",
                "login": "jonhelfman",
                "name": "Jonathan Helfman",
                "bio": "Student of math, d3, svg, etc. Prototyper of visualizations for electronics design and test. ",
                "home_url": "",
                "tier": "basic"
            }
        },
        {
            "id": "7aeba419a860937d",
            "content": "I recommend reading the paper for more about the rationale for the design of horizon charts:\n\nhttp://vis.berkeley.edu/papers/horizon/\n\nIn my experience, yes, horizon charts do take a bit of introduction, but that readers quickly become familiar with the form and find it intuitive. I feel horizon charts are best for displays such as time-series dashboards that you look at frequently or repeatedly; if it’s a form that you see often, the cost of learning the form is amortized over time. Horizon charts are especially good because you can see both small variations (within a band = position) and large variations (across bands = color). That’s what is meant by a “compact” representation versus the equivalent area chart.\n\nAs a practical matter, there isn’t really room for a y-axis with this sort of display, and it would introduce a lot of noise if you repeated it for each chart. It might be reasonable to include a threshold color legend (see https://observablehq.com/@d3/color-legend for one implementation) but since the display is interactive rather than static you can also simply mouseover the chart to read the exact values.\n\nWe once used horizon charts on the front page of the New York Times in print. I can’t find a good link for it, and admittedly it was only a single-band horizon chart with diverging values (for the forecast probabilities of Republican and Democrat Senate candidates), but here’s a Pinterest screenshot someone captured:\n\nhttps://user-images.githubusercontent.com/230541/115891515-04611980-a40b-11eb-8af9-20afa344f93f.png",
            "node_id": 810,
            "create_time": "2021-04-23T15:12:13.029Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "074c414ad1d825f5",
                "github_login": "mbostock",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/82811927da99f8938001b2ef1f552ad2c47083e46ebc55a3a146a5a5848c4519",
                "login": "mbostock",
                "name": "Mike Bostock",
                "bio": "Building a better computational medium. Founder @observablehq. Creator @d3. Former @nytgraphics. Pronounced BOSS-tock.",
                "home_url": "https://bost.ocks.org/mike/",
                "tier": "basic"
            }
        },
        {
            "id": "9f98adbdc28e3ce5",
            "content": "Being able to specify a baseline around which the values hover around would be convenient as well. E.g. values that hover around 1.",
            "node_id": 915,
            "create_time": "2021-04-22T16:19:51.661Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "3c5ecb707ecd20a7",
                "github_login": "Martien",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/40dc8e4f86d0cf89184b173b4d1d88336e5728c175479f33261ced3496adb3c2",
                "login": "martien",
                "name": "Martien van Steenbergen",
                "bio": "Wise Fool.\nVisioneer.",
                "home_url": "http://aardrock.com",
                "tier": "basic"
            }
        },
        {
            "id": "a17cc51c55fb0a8b",
            "content": "The charts assume a zero baseline, but you could pass TimeChart values that are relative to the baseline if you prefer (and you could use a custom format function to undo the effect of the baseline). For example, data.map(({date, value}) => ({date, value: value - 1})) and then {format: value => value + 1}.",
            "node_id": 915,
            "create_time": "2021-04-22T17:05:46.431Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "074c414ad1d825f5",
                "github_login": "mbostock",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/82811927da99f8938001b2ef1f552ad2c47083e46ebc55a3a146a5a5848c4519",
                "login": "mbostock",
                "name": "Mike Bostock",
                "bio": "Building a better computational medium. Founder @observablehq. Creator @d3. Former @nytgraphics. Pronounced BOSS-tock.",
                "home_url": "https://bost.ocks.org/mike/",
                "tier": "basic"
            }
        },
        {
            "id": "535d199303fa5090",
            "content": "Yes, thanks. I’m doing the value: value - 1. The format: value + 1 is a nice touch which I didn’t realise at first. See https://observablehq.com/@martien/covid-19-netherlands-basic-reproduction-number-timechart",
            "node_id": 915,
            "create_time": "2021-04-22T18:21:57.507Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "3c5ecb707ecd20a7",
                "github_login": "Martien",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/40dc8e4f86d0cf89184b173b4d1d88336e5728c175479f33261ced3496adb3c2",
                "login": "martien",
                "name": "Martien van Steenbergen",
                "bio": "Wise Fool.\nVisioneer.",
                "home_url": "http://aardrock.com",
                "tier": "basic"
            }
        },
        {
            "id": "05c41aea14c99db4",
            "content": "Would \"wrap\" perhaps have been a better choice, given that negative values wrap around on y?",
            "node_id": 1152,
            "create_time": "2021-04-22T09:13:44.338Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "07362516b5994994",
                "github_login": "mootari",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/0d7defa821f38094c03bad23b9b360a5364e6e97e21fc238c39ddc48db7994ad",
                "login": "mootari",
                "name": "Fabian Iwand",
                "bio": "Web developer and autodidact with an interest in creative coding.",
                "home_url": "https://twitter.com/mootari",
                "tier": "basic"
            }
        },
        {
            "id": "d7ad16ddd73edf8d",
            "content": "This terminology was adopted from the original horizon charts paper. See figure 2.\n\nhttp://vis.berkeley.edu/papers/horizon/2009-TimeSeries-CHI.pdf",
            "node_id": 1152,
            "create_time": "2021-04-22T17:04:14.382Z",
            "update_time": null,
            "resolved": true,
            "user": {
                "id": "074c414ad1d825f5",
                "github_login": "mbostock",
                "avatar_url": "https://avatars.observableusercontent.com/avatar/82811927da99f8938001b2ef1f552ad2c47083e46ebc55a3a146a5a5848c4519",
                "login": "mbostock",
                "name": "Mike Bostock",
                "bio": "Building a better computational medium. Founder @observablehq. Creator @d3. Former @nytgraphics. Pronounced BOSS-tock.",
                "home_url": "https://bost.ocks.org/mike/",
                "tier": "basic"
            }
        }
    ],
    "commenting_lock": null,
    "suggestion_from": null,
    "suggestions_to": [],
    "version": 1602,
    "title": "Observable TimeChart",
    "license": "isc",
    "copyright": "Copyright 2021 Observable, Inc.",
    "nodes": [
        {
            "id": 0,
            "value": "md`<h1 style=\"display: none;\">Observable TimeChart</h1>\n\n# TimeChart\n\nTimeChart is an importable component for visualizing time-series data. It can show many signals time-aligned as space-efficient horizon charts. If you hover over a chart, all charts on the page show the value at that time, aiding interpretation.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 472,
            "value": "TimeAxis({interval, start, stop})",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 475,
            "value": "viewof blues = TimeChart(wave({max: 100, round: true}), {title: \"Blues\", interval, start, stop, max: 100, scheme: \"blues\", marginTop: -16})",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 481,
            "value": "viewof greens = TimeChart(add(wave({max: 100, round: true, shift: 50, pow: 20}), wave({max: 20, round: true, period: 12})), {title: \"Greens\", interval, start, stop, max: 120, scheme: \"greens\", marginTop: -16})",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 478,
            "value": "viewof reds = TimeChart(add(blues, greens), {title: \"Reds\", interval, start, stop, max: 130, scheme: \"reds\", marginTop: -16})",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 810,
            "value": "md`To use in your notebook:\n\n~~~js\nimport {TimeChart, TimeAxis} from \"@observablehq/timechart\"\n~~~\n\nThen, call TimeChart and TimeAxis to create charts as described below.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 437,
            "value": "md`---\n\n## Configuration\n\nTimeChart expects a consistent *x*-axis across plots so that you can see coincident patterns. TimeChart also expects exactly one data point per pixel to maximize data density. When you call TimeChart and TimeAxis, you pass in these options.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 409,
            "value": "interval = d3.utcMinute.every(10) // sample frequency",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 268,
            "value": "stop = interval() // exclusive",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 270,
            "value": "start = interval.offset(stop, -width) // inclusive",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 875,
            "value": "md`TimeChart expects *interval* to be specified as a [d3-time interval](https://github.com/d3/d3-time), though you can also use a named time interval such as “hour” or “minute” if you prefer.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 418,
            "value": "md`---\n\n## Example usage\n\nFirst we need data: an array of {*date*, *value*} objects at the expected time interval, such as hourly. TimeChart treats missing data as having zero value. We’ll use fake data here (a sine wave with random noise). You’ll want to replace this fake data with a [database client](/@observablehq/databases) or by fetching from an API.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 267,
            "value": "signups = wave({min: 0, max: 200, period: 120, round: true}) // fake data!",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 493,
            "value": "md`Next we need an axis. This is a separate component so that it needn’t be repeated for each chart. Sprinkle as many as you like throughout your notebook.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 466,
            "value": "TimeAxis({interval, start, stop})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 498,
            "value": "md`Lastly, a chart! TimeChart takes two arguments, *data* and *options*. The *data* an array of {*date*, *value*} objects, as shown above. Three options are required, and below we pass in the corresponding cells of the same name we defined above:\n\n* *interval* - the time interval of the data (*e.g.*, hourly)\n* *start* - the start time of the chart (inclusive)\n* *stop* - the stop time of the chart (exclusive)\n\nIn addition, we recommend:\n\n* *title* - so that people know what they’re looking at\n* *max* - the maximum expected *y*-value, for consistency over time`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 72,
            "value": "TimeChart(signups, {interval, start, stop, title: \"Sign-ups\", max: 240})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 905,
            "value": "md`TimeChart generates a [horizon chart](/@d3/horizon-chart) with four bands by default. You can change the number of bands as desired. A single band will produce a conventional area chart.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 911,
            "value": "TimeChart(signups, {interval, start, stop, title: \"Sign-ups\", max: 240, bands: 1})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1325,
            "value": "md`The *scheme* option, which defaults to RdGy—red for negative, gray for positive—controls which colors are used for the bands. All ColorBrewer sequential and diverging color schemes are supported; see [D3 Color Schemes](/@d3/color-schemes). You may also pass in an array of arrays as the *scheme* argument following the same structure as D3 (*e.g.*, d3.schemeBlues).`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1330,
            "value": "TimeChart(signups, {interval, start, stop, title: \"Sign-ups\", max: 240, scheme: \"PuRd\"})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 915,
            "value": "md`---\n\n## Advanced usage: negative values\n\nIf the data includes negative values, these values will by default hang down from the top of the chart in red.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 970,
            "value": "TimeChart(posneg, {interval, start, stop})",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1464,
            "value": "md`Plotting negative values is also useful for paired signals, for example incoming (positive) and outgoing (negative) traffic volume to a network switch. Set the *marginTop* option to -16 to remove the gap between cells.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1455,
            "value": "TimeChart(wave({min: 0, max: 1}), {title: \"Incoming\", interval, start, stop, max: 1, format: \"+.2f\"})",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1457,
            "value": "TimeChart(wave({min: 0, max: -1}), {title: \"Outgoing\", interval, start, stop, max: 1, marginTop: -16, format: \"+.2f\"})",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1178,
            "value": "md`The *mode* option changes the behavior of the horizon chart for negative values. The allowed values are:\n\n* *offset* - negative values to hang down from the top\n* *mirror* - reflect so that negative values grow up from the bottom\n\nThe default *offset* mode is preferred for accessibility, as *mirror* relys solely on hue to distinguish between positive and negative values. To better show the two modes, below are single-band charts without random noise.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1152,
            "value": "TimeChart(wave({min: -1, max: 1, noise: 0}), {interval, start, stop, bands: 1, mode: \"offset\"})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1181,
            "value": "TimeChart(wave({min: -1, max: 1, noise: 0}), {interval, start, stop, bands: 1, mode: \"mirror\"})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1194,
            "value": "md`You should choose a diverging color scheme when plotting negative values: BrBG, PRGn, PiYG, PuOr, RdBu, RdGy, RdYlBu, RdYlGn, or Spectral. If you specify a sequential color scheme (such as blues), negative values will be drawn in gray.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1028,
            "value": "TimeChart(posneg, {interval, start, stop, scheme: \"piyg\"})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1090,
            "value": "TimeChart(posneg, {interval, start, stop, scheme: \"rdbu\"})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1239,
            "value": "TimeChart(posneg, {interval, start, stop, scheme: \"blues\"})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1318,
            "value": "posneg = wave({min: -1, max: 1}) // fake data with some negative values",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 748,
            "value": "md`---\n\n## Advanced usage: custom defaults\n\nThe TimeChart.defaults function returns a TimeChart-like function that has the specified options as defaults. This is useful to avoid repeating options that should by shared by all charts on the page, such as *interval*, *start*, and *stop*. You can also change the default color scheme.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 751,
            "value": "timeChart = TimeChart.defaults({interval, start, stop, scheme: \"purples\"})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 763,
            "value": "timeAxis = TimeAxis.defaults({interval, start, stop})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 783,
            "value": "timeAxis()",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 754,
            "value": "timeChart(signups, {title: \"Sign-ups\"})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 738,
            "value": "md`---\n\n## Advanced usage: onclick\n\nThe *onclick* option takes a function to be called when the user clicks on the chart. You can use this, for example, to open another notebook or to drive something else on the page (say with a mutable). Call this.invert(*event*) to have TimeChart lookup the data that was clicked on.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 743,
            "value": "timeChart(signups, {\n  title: \"Sign-ups\", \n  onclick(event) {\n    const {date} = this.invert(event);\n    open(`/d/e817ba556034bba5?date=${date.toISOString()}`, `target=_blank`);\n  }\n})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 788,
            "value": "md`---\n\n## Advanced usage: views\n\nTimeChart is compatible with Observable’s viewof operator. The value of the chart is the data you pass in.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 792,
            "value": "viewof florps = timeChart(wave(), {title: \"Florps\"})",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 796,
            "value": "florps",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1498,
            "value": "md`---\n\n## Advanced usage: multiple charts in one cell\n\nTypically each chart goes in its own cell for ease of ordering and commenting. But if desired you can combine multiple charts and an axis in a cell as shown below.`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1500,
            "value": "html`${timeAxis()}${[wave(), wave()].map((data, i) => timeChart(data, {title: `wave ${i}`}))}`",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 422,
            "value": "md`---\n\n## Implementation`",
            "pinned": false,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 5,
            "value": "TimeChart = {\n  let clientX = document.body.clientWidth + 14;\n\n  function TimeChart(data, options = {}) {\n\n    // If data is a promise, render nothing, then replace it with the actual chart later.\n    if (typeof data.then === \"function\") {\n      const chart = TimeChart([], options);\n      Promise.resolve(data).then((data) => chart.replaceWith(TimeChart(data, options)));\n      return chart;\n    }\n\n    // Extract option.s\n    let {\n      interval,\n      max = d3.quantile(data, 0.99, d => Math.abs(d.value) || NaN) || 1,\n      label, // alias for title\n      title = label,\n      locale = \"en-US\",\n      dateFormat = localeFormat(locale),\n      format = localeFormat(locale),\n      marginTop = 0, // try -16 to remove the gap between cells\n      marginLeft = 0,\n      marginRight = 0,\n      height = 49, // inclusive of margin\n      width,\n      stop,\n      start,\n      bands = 4,\n      onclick,\n      curve = d3.curveStepBefore,\n      scheme = d3.schemeRdGy,\n      mode = \"offset\"\n    } = options;\n  \n    // Normalize string arguments\n    if (typeof format === \"string\") format = d3.format(format);\n    else if (typeof format !== \"function\") format = localeFormat(locale, format);\n    if (typeof dateFormat === \"string\") dateFormat = d3.utcFormat(dateFormat);\n    else if (typeof dateFormat !== \"function\") dateFormat = localeFormat(locale, dateFormat);\n    interval = maybeInterval(interval);\n    curve = maybeCurve(curve);\n    scheme = maybeScheme(scheme);\n    mode = maybeMode(mode);\n    bands = Math.floor(bands);\n    if (!(bands >= 1 && bands < scheme.length)) throw new Error(`invalid bands: ${bands}`);\n    if (stop === undefined) stop = interval();\n    if (start === undefined) start = interval.offset(stop, -width);\n    \n    // Normalize the color scheme\n    let colors;\n    if (scheme.length < 11) { // assume sequential, pad with greys\n      colors = scheme[Math.max(3, bands)];\n      if (bands < 3) colors = colors.slice(3 - bands).concat(new Array(3 - bands));\n      colors = [...d3.reverse(d3.schemeGreys[colors.length]), undefined, ...colors];\n    } else { // otherwise assume diverging\n      colors = scheme[Math.max(3, 2 * bands + 1)];\n    }\n\n    // Normalize the data to the given interval, filling in any missing data with zeroes.\n    const values = new Map(data.map(d => [+d.date, +d.value]));\n    const [ymin, ymax] = d3.extent(values, ([, value]) => value);\n    data = interval.range(start, stop).map(date => ({date, value: values.get(+date) || 0}));\n    if (width === undefined) width = data.length;\n\n    const x = d3.scaleUtc([start, stop], [marginLeft, width - marginRight]);\n    const y = d3.scaleLinear([0, max], [0, -bands * height]);\n    const clip = DOM.uid(\"clip\");\n    const path = DOM.uid(\"path\");\n\n    const svg = d3.create(\"svg\")\n        .attr(\"viewBox\", `0 ${-marginTop} ${width} ${height}`)\n        .attr(\"width\", width)\n        .attr(\"height\", height)\n        .property(\"style\", `\n          display: block;\n          font: 12px var(--sans-serif, system-ui, sans-serif);\n          font-variant-numeric: tabular-nums;\n          margin: 0 0 ${+marginTop}px calc(100% - ${width}px);\n          overflow: visible;\n        `);\n\n    const tooltip = svg.append(\"title\");\n\n    svg.append(\"clipPath\")\n        .attr(\"id\", clip.id)\n      .append(\"rect\")\n        .attr(\"y\", 0)\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n\n    svg.append(\"defs\").append(\"path\")\n        .attr(\"id\", path.id)\n        .attr(\"d\", d3.area()\n            .curve(curve)\n            .defined(d => !isNaN(d.value))\n            .x(d => round(x(d.date)))\n            .y0(0)\n            .y1(d => round(y(d.value)))\n          (data));\n\n    const g = svg.append(\"g\")\n        .attr(\"clip-path\", clip);\n\n    g.append(\"g\")\n      .selectAll(\"use\")\n      .data(d3.range(bands)\n        .map(i => [i, colors[i + 1 + (colors.length >> 1)]])\n        .filter(([i, color]) => color != null && ymax > max * i / bands))\n      .join(\"use\")\n        .attr(\"fill\", ([, color]) => color)\n        .attr(\"transform\", ([i]) => `translate(0,${(i + 1) * height})`)\n        .attr(\"xlink:href\", path.href);\n\n    g.append(\"g\")\n      .selectAll(\"use\")\n      .data(d3.range(bands)\n        .map(i => [i, colors[(colors.length >> 1) - 1 - i]])\n        .filter(([i, color]) => color != null && -ymin > max * i / bands))\n      .join(\"use\")\n        .attr(\"fill\", ([, color]) => color)\n        .attr(\"transform\", mode === \"mirror\"\n            ? ([i]) => `translate(0,${(i + 1) * height}) scale(1,-1)`\n            : ([i]) => `translate(0,${-i * height})`)\n        .attr(\"xlink:href\", path.href);\n\n    const overlay = svg.append(\"g\");\n\n    if (title != null) overlay.append(\"text\")\n        .attr(\"class\", \"title\")\n        .attr(\"font-weight\", \"bold\")\n        .attr(\"stroke-linecap\", \"round\")\n        .attr(\"stroke-linejoin\", \"round\")\n        .attr(\"y\", 2 * 16)\n        .attr(\"dy\", \"0.32em\")\n        .text(title + \"\");\n\n    overlay.append(\"text\")\n        .attr(\"class\", \"label\")\n        .attr(\"stroke-linecap\", \"round\")\n        .attr(\"stroke-linejoin\", \"round\")\n        .attr(\"text-anchor\", \"end\")\n        .attr(\"y\", height - 16 - 1)\n        .attr(\"dx\", -3)\n        .attr(\"dy\", \"0.32em\");\n\n    overlay.selectAll(\"text\")\n      .select(function() {\n        const clone = this.cloneNode(true);\n        return this.parentNode.insertBefore(clone, this);\n      })\n        .attr(\"fill\", \"none\")\n        .attr(\"stroke\", \"white\")\n        .attr(\"stroke-width\", 4);\n\n    overlay.append(\"line\")\n        .attr(\"class\", \"line\")\n        .attr(\"stroke\", \"white\")\n        .attr(\"stroke-dasharray\", \"1,1\")\n        .style(\"mix-blend-mode\", \"screen\")\n        .attr(\"y1\", 0)\n        .attr(\"y2\", height);\n\n    overlay.select(\"line\").clone(true)\n        .attr(\"stroke\", \"black\")\n        .attr(\"stroke-dashoffset\", 1);\n\n    const overlayLine = overlay.selectAll(\".line\");\n    const overlayLabel = overlay.selectAll(\".label\");\n    const overlayText = overlay.selectAll(\".title\");\n\n    function invert(event) {\n      const [mx] = d3.pointer(event, svg.node());\n      const i = d3.bisector(d => d.date).left(data, x.invert(mx), 0, data.length - 1);\n      return data[i];\n    }\n\n    function mousemoved(event) {\n      clientX = event.clientX;\n      const d = invert(event);\n      overlayLabel.attr(\"x\", x(d.date)).text(format(d.value));\n      overlayLine.attr(\"x1\", x(d.date) - 0.5).attr(\"x2\", x(d.date) - 0.5);\n      tooltip.text(dateFormat(d.date));\n    }\n\n    function resized() {\n      overlayText.attr(\"x\", Math.max(0, width - document.body.clientWidth) + 4);\n    }\n\n    resized();\n    addEventListener(\"resize\", resized);\n    addEventListener(\"mousemove\", mousemoved);\n    requestAnimationFrame(() => mousemoved({clientX, clientY: 0}));\n\n    Inputs.disposal(svg.node()).then(() => {\n      removeEventListener(\"resize\", resized);\n      removeEventListener(\"mousemove\", mousemoved);\n    });\n\n    return Object.assign(svg.node(), {onclick, value: data, invert});\n  }\n\n  TimeChart.defaults = defaults => {\n    return (data, options) => {\n      return TimeChart(data, {...defaults, ...options});\n    };\n  };\n\n  return TimeChart;\n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 464,
            "value": "TimeAxis = {\n  function TimeAxis({\n    interval,\n    width,\n    height = 33,\n    marginLeft = 0,\n    marginRight = 0,\n    stop,\n    start,\n  } = {}) {\n    interval = maybeInterval(interval);\n    if (stop === undefined) stop = interval();\n    if (start === undefined) start = interval.offset(stop, -width);\n    if (width === undefined) width = interval.range(start, stop).length;\n    return html`<svg viewBox=\"0 0 ${width} ${height}\" width=${width} height=${height} style=\"display: block; margin-left: calc(100% - ${width}px);\">\n    ${d3.create(\"svg:g\")\n        .call(d3.axisTop(d3.scaleTime([start, stop], [marginLeft, width - marginRight])).ticks(width / 120))\n        .call(g => g.select(\".domain\").remove())\n        .call(g => g.selectAll(\".tick line\").clone(true).attr(\"y2\", \"100vh\").attr(\"stroke-opacity\", 0.12))\n        .attr(\"transform\", `translate(0, 33)`)\n      .node()}\n  </svg>`;\n  }\n\n  TimeAxis.defaults = defaults => {\n    return options => {\n      return TimeAxis({...defaults, ...options});\n    };\n  };\n\n  return TimeAxis;\n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1160,
            "value": "function round(x) {\n  return Math.round(x * 2) / 2;\n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 829,
            "value": "function maybeInterval(interval) {\n  if (interval == null) throw new Error(\"missing interval\");\n  if (!(interval && typeof interval.range === \"function\")) {\n    const i = (interval + \"\").toLowerCase();\n    switch (i) {\n      case \"millisecond\":\n      case \"second\":\n      case \"minute\":\n      case \"hour\":\n      case \"day\":\n      case \"week\":\n      case \"sunday\":\n      case \"monday\":\n      case \"tuesday\":\n      case \"wednesday\":\n      case \"thursday\":\n      case \"friday\":\n      case \"saturday\":\n      case \"month\":\n      case \"year\":\n        return d3[`utc${camelize(i)}`];\n    }\n    throw new Error(`invalid interval: ${interval}`);\n  }\n  return interval;  \n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 838,
            "value": "function maybeCurve(curve) {\n  if (curve == null) throw new Error(\"missing curve\");\n  if (typeof curve !== \"function\") {\n    const c = d3[`curve${camelize(curve)}`];\n    if (c === undefined) throw new Error(`unknown curve: ${curve}`);\n    curve = c;\n  }\n  return curve;\n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 832,
            "value": "function maybeScheme(scheme) {\n  if (scheme == null) throw new Error(\"missing scheme\");\n  if (!Array.isArray(scheme)) {\n    const s = (scheme + \"\").toLowerCase();\n    switch (s) {\n      case \"brbg\": return d3.schemeBrBG;\n      case \"prgn\": return d3.schemePRGn;\n      case \"piyg\": return d3.schemePiYG;\n      case \"puor\": return d3.schemePuOr;\n      case \"rdbu\": return d3.schemeRdBu;\n      case \"rdgy\": return d3.schemeRdGy;\n      case \"rdylbu\": return d3.schemeRdYlBu;\n      case \"rdylgn\": return d3.schemeRdYlGn;\n      case \"spectral\": return d3.schemeSpectral;\n      case \"blues\": return d3.schemeBlues;\n      case \"greens\": return d3.schemeGreens;\n      case \"greys\": return d3.schemeGreys;\n      case \"oranges\": return d3.schemeOranges;\n      case \"purples\": return d3.schemePurples;\n      case \"reds\": return d3.schemeReds;\n      case \"bugn\": return d3.schemeBuGn;\n      case \"bupu\": return d3.schemeBuPu;\n      case \"gnbu\": return d3.schemeGnBu;\n      case \"orrd\": return d3.schemeOrRd;\n      case \"pubu\": return d3.schemePuBu;\n      case \"pubugn\": return d3.schemePuBuGn;\n      case \"purd\": return d3.schemePuRd;\n      case \"rdpu\": return d3.schemeRdPu;\n      case \"ylgn\": return d3.schemeYlGn;\n      case \"ylgnbu\": return d3.schemeYlGnBu;\n      case \"ylorbr\": return d3.schemeYlOrBr;\n      case \"ylorrd\": return d3.schemeYlOrRd;\n    }\n    throw new Error(`invalid scheme: ${scheme}`);\n  }\n  return scheme;\n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1067,
            "value": "function maybeMode(mode) {\n  switch (mode = (mode + \"\").toLowerCase()) {\n    case \"offset\": case \"mirror\": return mode;\n  }\n  throw new Error(`unknown mode: ${mode}`);\n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 847,
            "value": "function camelize(string) {\n  return string\n    .toLowerCase()\n    .split(/-/g)\n    .map(([f, ...r]) => `${f.toUpperCase()}${r.join(\"\")}`)\n    .join(\"\");\n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 1560,
            "value": "function localeFormat(locale, format) {\n  return date => date.toLocaleString(locale, format);\n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 506,
            "value": "function wave({\n  min = 0,\n  max = 1, \n  shift = 0,\n  period = 24 * 6, // matching the default 10-minute interval\n  noise = 0.2,\n  pow = 1,\n  round = false\n} = {}) {\n  return interval.range(start, stop).map((date, i) => {\n    const t = (Math.sin((i - shift) / period * 2 * Math.PI) + 1) / 2;\n    const n = Math.random();\n    let value = +min + (max - min) * (t ** pow * (1 - noise) + n * noise);\n    if (round) value = Math.round(value);\n    return {date, value};\n  });\n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        },
        {
            "id": 552,
            "value": "function add(first, ...series) {\n  return first.map(({date, value}, i) => ({date, value: value + d3.sum(series, s => s[i].value)}));\n}",
            "pinned": true,
            "mode": "js",
            "data": null,
            "name": null
        }
    ],
    "resolutions": []
};