import{_ as a,c as t,b as p,w as o,a as e,r as c,o as u,d as n}from"./app.70956d7b.js";const y='{"title":"@hpcc-js/timeline","description":"","frontmatter":{},"headers":[{"level":2,"title":"Exported Widgets","slug":"exported-widgets"},{"level":2,"title":"Stand-alone HTML Example","slug":"stand-alone-html-example"},{"level":2,"title":"Getting Started with @hpccjs","slug":"getting-started-with-hpccjs"}],"relativePath":"packages/timeline/README.md"}',l={},i=e("",8),r=n("hpcc-vitepress",{style:{width:"100%",height:"600px"}},[n("pre",null,[n("code",null,`<div id="target" style="width:100%;height:600px">
</div>
<script type="module">
    import { MiniGantt } from "@hpcc-js/timeline";

    new MiniGantt()
        .target("target")
        .columns(["Label", "start", "end"])
        .data(random_datetime_ranges(10).concat(random_datetime_events(1)))
        .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
        .render()
        ;


    function random_datetime_string() {
        const yyyy = 2004 + Math.floor(Math.random() * 2);
        const mm = 1 + Math.floor(Math.random() * 12);
        const dd = 1 + Math.floor(Math.random() * 28);
        const hh = 1 + Math.floor(Math.random() * 23);
        const min = 1 + Math.floor(Math.random() * 59);
        const sec = 0 + Math.floor(Math.random() * 59);
        return \`\${yyyy}-\${mm < 10 ? '0' + mm : mm}-\${dd < 10 ? '0' + dd : dd}T\${hh < 10 ? '0' + hh : hh}:\${min < 10 ? '0' + min : min}:\${sec < 10 ? '0' + sec : sec}.0Z\`;
    }

    function random_datetime_ranges(n) {
        return Array(n).fill("").map((row, row_idx) => {
            const d1 = random_datetime_string();
            const d2 = random_datetime_string();
            const icon = ["\uF2B9", "\uF19C", "\uF1B9"][Math.floor(Math.random() * 3)];
            return new Date(d1) - new Date(d2) > 0 ? [\`Random Range #\${row_idx}\`, d2, d1, icon] : [\`Random Range #\${row_idx}\`, d1, d2, icon];
        });
    }

    function random_datetime_events(n) {
        return Array(n).fill("").map((row, row_idx) => {
            return [\`Random Event #\${row_idx}\`, random_datetime_string()];
        });
    }
<\/script>
`)])],-1);function k(g,h,d,m,q,_){const s=c("ClientOnly");return u(),t("div",null,[i,p(s,null,{default:o(()=>[r]),_:1})])}var w=a(l,[["render",k]]);export{y as __pageData,w as default};
