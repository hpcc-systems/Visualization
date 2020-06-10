import { Graph2 } from "@hpcc-js/graph";
import { Image } from "@hpcc-js/react";

const vertices = [
    {
        id: 0,
        text: "Red",
        width: 32,
        height: 32,
        href: getDemoImageURL(32, 32, "#ED1C24", "circle")
    },
    {
        id: 1,
        text: "Blue",
        width: 32,
        height: 32,
        href: getDemoImageURL(32, 32, "#1A9BD7")
    }
];

new Graph2()
    .target("target")
    .vertexRenderer(Image)
    .data({
        vertices,
        edges: [
            {
                id: 2,
                source: vertices[0],
                target: vertices[1]
            }
        ]
    })
    .layout("ForceDirected")
    .render()
    ;

function getDemoImageURL(w, h, color, innerShape = "square") {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.strokeStyle = "#000000";
    ctx.fillRect(0,0,w,h);
    ctx.strokeRect(0,0,w,h);
    ctx.fillStyle = "#FFFFFF";
    switch(innerShape){
        case "circle":
            ctx.beginPath();
            ctx.arc(w/2, h/2, (w/2) * 0.618, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            break;
        case "square":
            const offset = (w/2) * 0.382;
            const size = w * 0.618;
            ctx.fillRect(offset, offset, size, size);
            ctx.strokeRect(offset, offset, size, size);
            break;
    }
    return canvas.toDataURL();
}