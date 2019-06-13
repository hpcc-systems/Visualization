import { Cooccurence } from "@hpcc-js/graph";

new Cooccurence()
    .edges(getRandomData())
    .target("target")
    .render()
    ;

function getRandomData(){
    const data = [];
    Array(26).fill(65).forEach((n,i)=>{
        Array(26 - i).fill(65 + 25).forEach((m,j)=>{
            const row = [
                String.fromCharCode(n+i),
                String.fromCharCode(m-j),
                n+i === m-j ? 1 : Math.random()
            ];
            data.push(row);
        });
    });
    data.sort((a,b)=>{
        if(a[0] === b[0]){
            return a[1] > b[1] ? 1 : -1;
        } else {
            return a[0] > b[0] ? 1 : -1;
        }
    });
    return data;
}