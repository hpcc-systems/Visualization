//  Import library 
//  import { chain, filter, map } from "@hpcc-js/dataflow";

const { chain, filter, map } = require("../lib-umd/index.js");

//  Create a pipeline to process data  
const pipeline = chain(
    map(_ => ({ id: _, display: `The id is:  ${_}`, group: Math.round(_ / 10) })),
    filter(_ => _.group !== 1),
    map(_ => ({ display: _.display, group: _.group })),
);

//  Process data using pipeline 
const output = pipeline([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(...output); //  output is NOT an array, use ... to convert to array

//  Reuse the pipeline with a different datasource
const output2 = pipeline([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
console.log(...output2);    //  output is NOT an array, use ... to convert to array
