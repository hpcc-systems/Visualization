import { SliderGraph } from "@hpcc-js/composite";

new SliderGraph()
    .target("target")
    .filterProperty("date")
    .datetimeFormat("%Y-%m-%d")
    .data([
        [[9,4],{"text":"Jane Smith","date":"2015-11-22"}],
        [[4,0],{"text":"Sarah Williams","date":"2003-10-19"}],
        [[9,0],{"text":"Jill Brown","date":"2016-12-26"}],
        [[4,6,0],{"text":"Bill Brown","date":"2012-11-12"}],
        [[],{"text":"Jane Williams","date":"2003-11-10"}],
        [[6,9],{"text":"Chris Davis","date":"2014-12-12"}],
        [[8],{"text":"Bill Davis","date":"2005-11-21"}],
        [[],{"text":"Jane Smith","date":"2017-10-22"}],
        [[7,3,4,9,0,5],{"text":"Jane Johnson","date":"2003-11-20"}],
        [[2,0,3,1],{"text":"Sarah Jones","date":"2005-10-17"}]
    ])
    .render()
    ;