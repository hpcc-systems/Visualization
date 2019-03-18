import { HTMLBadge } from "@hpcc-js/html";

const badge = new HTMLBadge()
    .target("target")
    .icon(randomIcon())
    .iconFontFamily("FontAwesome")
    .iconFontSize(40)
    .label("Random Icon Badge")
    .render()
    ;
function randomIcon(){
    return String.fromCharCode(61444 + Math.floor(Math.random() * 5));
}
setInterval(()=>{
    badge.icon(randomIcon()).render();
},3000)
