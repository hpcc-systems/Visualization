import { MorphText } from "@hpcc-js/other";

const data = [
    "TOM MARVOLO RIDDLE",
    "I AM LORD VOLDEMORT"
]
const w = new MorphText()
    .target("target")
    .text(data[0])
    .render()
    ;
    
let count = 0;
setInterval(function(){
    count++;
    w
        .text(data[count%2])
        .render()
        ;
},3000);
