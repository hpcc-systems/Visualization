import{_ as e,c as i,o as a,a as o}from"./app.70956d7b.js";var t="/Visualization/assets/readme.8afd36c9.gif";const _='{"title":"H3 Demo","description":"","frontmatter":{},"headers":[{"level":2,"title":"Project Layout","slug":"project-layout"},{"level":2,"title":"ECL Usage","slug":"ecl-usage"},{"level":2,"title":"Building Visualization Resources","slug":"building-visualization-resources"}],"relativePath":"demos/h3/README.md"}',n={},r=o('<h1 id="h3-demo" tabindex="-1">H3 Demo <a class="header-anchor" href="#h3-demo" aria-hidden="true">#</a></h1><p><em>A working example combining the H3 ECL Plugin with embedded Visualization</em></p><p><img src="'+t+`" alt=""></p><h2 id="project-layout" tabindex="-1">Project Layout <a class="header-anchor" href="#project-layout" aria-hidden="true">#</a></h2><ul><li><strong>ecl</strong>: ECL Development Code (historic only)</li><li><strong>res</strong>: Visualization Resources</li><li><strong>src</strong>: Visualization Source Code (TypeScript)</li><li><strong>h3Helper.ecl</strong>: ECL H3 Macro</li><li><strong>h3Helper.manifest</strong>: ECL Manifest (to auto include the visualization resources)</li><li><strong>package.json</strong>: npm dependencies</li><li><strong><a href="http://README.md" target="_blank" rel="noopener noreferrer">README.md</a></strong>: This file</li><li><strong>tsconfig.json</strong>: TypeScript compiler options</li><li><strong>rollup.config.json</strong>: JavaScript bundle configuration</li></ul><h2 id="ecl-usage" tabindex="-1">ECL Usage <a class="header-anchor" href="#ecl-usage" aria-hidden="true">#</a></h2><div class="language-c++"><pre><code>IMPORT $ as VizDemoH3;

cities := VizDemoH3.h3Helper(&#39;~gjs::canada&#39;, lat, lon);

//  Submit to thor  ---
cities.buildAllIndex;

//  Compile and Publish to Roxie  ---
cities.h3Query;
</code></pre></div><h2 id="building-visualization-resources" tabindex="-1">Building Visualization Resources <a class="header-anchor" href="#building-visualization-resources" aria-hidden="true">#</a></h2><div class="language-"><pre><code>npm install

npm run build
</code></pre></div>`,9),s=[r];function l(c,d,u,g,h,p){return a(),i("div",null,s)}var f=e(n,[["render",l]]);export{_ as __pageData,f as default};
