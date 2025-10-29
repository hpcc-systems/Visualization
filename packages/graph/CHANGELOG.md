# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.5.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.86.0...@hpcc-js/graph@3.5.1) (2025-10-29)


### Bug Fixes

* bump versions ([e9719b8](https://github.com/hpcc-systems/Visualization/commit/e9719b875e4c65936921d2e6a0f76ab008b88114))
* Bump versions to latest ([8c541d7](https://github.com/hpcc-systems/Visualization/commit/8c541d75e06bfbe1030ab003b5cccf4af68bc430))
* Prevent React from being included in the bundle ([280db7a](https://github.com/hpcc-systems/Visualization/commit/280db7a82c01ce1a7c5ac8713e02eb4df9609bf3))
* Relax React peer dependency ([4fab392](https://github.com/hpcc-systems/Visualization/commit/4fab392ef6c81be640d82a2efbcfbf7061cfcb21))
* Resize markers and ensure correct colours ([b74d3ea](https://github.com/hpcc-systems/Visualization/commit/b74d3eaef37840ce1362e7ff570ce6884e7de242))
* Revert react back to preact ([9c2e0f0](https://github.com/hpcc-systems/Visualization/commit/9c2e0f0cbf7c43561b7f2c0707d5fb95971bd5ef))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))
* vitest workspace is deprecated ([2b2584d](https://github.com/hpcc-systems/Visualization/commit/2b2584db7de0f62ea43144640931fd9d412373ab))


### Features

*  Switch to esbuild and ESM first packaging ([b752510](https://github.com/hpcc-systems/Visualization/commit/b752510b5074fbc9a606e4d189412798c241f414))
* Add lit-html enabled graph ([8dec33c](https://github.com/hpcc-systems/Visualization/commit/8dec33c8391d6f5fa9717625a49a574401f1c158))
* switch to simpler version stamp method ([d828033](https://github.com/hpcc-systems/Visualization/commit/d828033ec79f56c4d1579bca230bd03cf0d6328e))
* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))
* Upgrade graph, html and react to v3 ([a1aa027](https://github.com/hpcc-systems/Visualization/commit/a1aa02785ed97c4ee18b3a83ab341f0423956b7c))
* Upgrade layout to v3 ([cbc463a](https://github.com/hpcc-systems/Visualization/commit/cbc463acb24fc2e7d0f3da93b4c0d9c6915aabd8))



## 2.106.11 (2024-09-23)



## 2.106.10 (2024-09-13)



## 2.106.9 (2024-09-12)



## 2.106.8 (2024-09-05)



## 2.106.7 (2024-08-29)



## 2.106.5 (2024-08-29)



## 2.106.4 (2024-08-22)



## 2.106.3 (2024-08-01)



## 2.106.2 (2024-07-29)



## 2.106.1 (2024-07-24)



# 2.106.0 (2024-07-23)






# 2.86.0 (2024-07-23)


### Bug Fixes

*  Add missing css for sankeyGraph ([c518a48](https://github.com/hpcc-systems/Visualization/commit/c518a488cff0a7d17d3e68446cfe6fb989586027))
*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))
*  Event.path is non-standard ([4edabd5](https://github.com/hpcc-systems/Visualization/commit/4edabd58cc0d06f079d959e847cf5a04eea45f4e))
*  Graph regression (missing graphlib in bundle) ([6b9c98b](https://github.com/hpcc-systems/Visualization/commit/6b9c98bbb4d400e992cf85f4fcc5afb37ab6da10))
*  graph2/subgraphs failing gallery test ([b3db326](https://github.com/hpcc-systems/Visualization/commit/b3db32608ee2ffd854cd8de54196095397d01e35))
*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)
*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)
* Add graph2 dblclick annotation support ([a5b3d6b](https://github.com/hpcc-systems/Visualization/commit/a5b3d6b4c0d43296c652e0cf0ce92b8e86b526f5))
* Add guard against unknown event source ([5c61240](https://github.com/hpcc-systems/Visualization/commit/5c612400071cefa44c6f5e634976e0ba7ac90ac5)), closes [#4061](https://github.com/hpcc-systems/Visualization/issues/4061)
* **build:** @hpcc-js/wasm out of sync ([585bc38](https://github.com/hpcc-systems/Visualization/commit/585bc38ba7c94f527ebdc807ecf59911c8791213))
* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f8273e454c4b103e0ed1965c18542f125482))
* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07379e59081c930d61485764e78c8a07a90))
* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf369d6d4081f0f5d9285bf3b1fd9b5b5999))
* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **comms:** rejectUnauthorized does nothing in NodeJS ([38f793d](https://github.com/hpcc-systems/Visualization/commit/38f793d5ccd9a40078b1df36c799e6300153b8c3))
* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ada4d7aad0ffe9ea5cf004b49ccec6710de))
* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))
* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))
* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2c956601f3b4740917c4c35896f7f6c1c4))
* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))
* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))
* **graph:**  Check if hasAttribute exists before calling it ([4829ee8](https://github.com/hpcc-systems/Visualization/commit/4829ee8721aece4473f30cafa7bbc093ec8c12eb))
* **graph:**  Fix failing tests ([0500277](https://github.com/hpcc-systems/Visualization/commit/0500277c4732087870a3f4558b6810341a418bb1))
* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))
* **graph:**  Tweak previous refactor to ensure backward compatibility ([0c86fbb](https://github.com/hpcc-systems/Visualization/commit/0c86fbb643e7845161d9cc044df7d8efa9658d80))
* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)
* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)
* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)
* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)
* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))
* **graph:** Allow dragging regression ([f035789](https://github.com/hpcc-systems/Visualization/commit/f03578929638496d9e99bdd00a024a5a8d5029ec))
* **Graph:** Calling raise during dragstart breaks click event ([e612378](https://github.com/hpcc-systems/Visualization/commit/e61237806b5b7b8601f0515142cbb2d780d294a6))
* **graph:** click event not firing ([f65e745](https://github.com/hpcc-systems/Visualization/commit/f65e745347384898253c83317b55cb6f873ba438))
* **Graph:** dagre regression ([5e8c18b](https://github.com/hpcc-systems/Visualization/commit/5e8c18b9cfe51caccddd99cba919d50ebb85d762))
* **Graph:** Dragging Vertex causes it to snap to mouse position ([b064030](https://github.com/hpcc-systems/Visualization/commit/b064030e88c7b9fffbaa3708180f711ec98e5c75)), closes [#2931](https://github.com/hpcc-systems/Visualization/issues/2931)
* **Graph:** Edge flicker when intersecting with Icon and TextBox ([a8926c6](https://github.com/hpcc-systems/Visualization/commit/a8926c6412a2855b6a691a1219458d219ebf7af8))
* **Graph:** Edge flicker when intersecting with Icon and TextBox ([f730f3e](https://github.com/hpcc-systems/Visualization/commit/f730f3ef790ed7f26b23e93c3124bdec5f85b33a))
* **graph:** FF tooltip fix for Graph ([687d6c1](https://github.com/hpcc-systems/Visualization/commit/687d6c120b41150f637c7f567060398d001a604e)), closes [#2742](https://github.com/hpcc-systems/Visualization/issues/2742)
* **graph:** Fix graph Edges in IE11 ([38ad821](https://github.com/hpcc-systems/Visualization/commit/38ad8215db08ce4a1cdf8b7cca87d536357e72d5))
* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))
* **Graph:** Make dagre a dependency ([73a6444](https://github.com/hpcc-systems/Visualization/commit/73a64442dae35648bc1fbd3fc4a87dcea6015ea3))
* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)
* **graph:** Remove inline status messages. ([36030ad](https://github.com/hpcc-systems/Visualization/commit/36030ad9fbdeba259f929af54566aec3f7e98622))
* **graph:** Render callback not being called. ([525d325](https://github.com/hpcc-systems/Visualization/commit/525d325f46678898e633bd81430c672e61e9ddd6))
* **graph:** Subgraph text can reach beyond edge of border. ([c8db668](https://github.com/hpcc-systems/Visualization/commit/c8db668ebb2e7f460fdd3d3ad770c29b1e2fc40d))
* **GraphT:**  Merge edges fails when ID matches, but source/target has changed ([b822ade](https://github.com/hpcc-systems/Visualization/commit/b822adef25e8d8780cab62f73e79972bb90712e2))
* **graph:** Updated Graph2.md ([408ade5](https://github.com/hpcc-systems/Visualization/commit/408ade5fd6d8de163913e52f4af3a8708cfccc3b))
* **graph:** Use Vertex.pos as starting position ([bf93070](https://github.com/hpcc-systems/Visualization/commit/bf93070e360a3f72f20e48eecfa9abfea4da8f39)), closes [#2928](https://github.com/hpcc-systems/Visualization/issues/2928)
* **graph:** WASM runtime out of sync with web worker ([bb2e5be](https://github.com/hpcc-systems/Visualization/commit/bb2e5bedcdfd83a9a26501f389c870bfd75faa4d))
* **IE11:** d3-force >= v2 is not IE11 compatible ([0d254fa](https://github.com/hpcc-systems/Visualization/commit/0d254fade6f69b5080f6caa50d63ba15f4a23bb7))
* MiniGantt click event was non standard ([988012a](https://github.com/hpcc-systems/Visualization/commit/988012a8803551fcbd52c5462433b92fc4a345a5))
* Optimize getBBox calls ([5114bb2](https://github.com/hpcc-systems/Visualization/commit/5114bb28e9c06b7601141355a1a83dc823c25b19)), closes [#2567](https://github.com/hpcc-systems/Visualization/issues/2567)
* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))
* **PropertyExt:** Hash function very slow ([d846a9e](https://github.com/hpcc-systems/Visualization/commit/d846a9e5dab2e2c8abf7edf2dc46aef71a311ef4))
* Sankey data points mapped ([c5afd29](https://github.com/hpcc-systems/Visualization/commit/c5afd290292773b161a1a5b2d82cc3ba09a60cf8))
* **tooltip:** Workaround FF issue with getScreenCTM ([6978cfb](https://github.com/hpcc-systems/Visualization/commit/6978cfb80a2fd8608d02cb1d3635fdf6083bc242)), closes [#2743](https://github.com/hpcc-systems/Visualization/issues/2743)
* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))
* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))


### Features

*  Add better error handling for graphviz web-worker ([283e66d](https://github.com/hpcc-systems/Visualization/commit/283e66dd1a81372fbb30e124325d217ae075e6f7))
*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))
*  Add React Custom Graph demo ([48f7140](https://github.com/hpcc-systems/Visualization/commit/48f7140592f3dcb400a95135d01115b8b475220a))
*  Add SankeyGraph ([679677c](https://github.com/hpcc-systems/Visualization/commit/679677c89dc9abd6590736f2ba39c8cd9879ece7))
* Add anno event data to all mouse events ([54c6859](https://github.com/hpcc-systems/Visualization/commit/54c6859b455b4022814bb52cffc2bdff45bfa8f5))
* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))
* Add edgeColorColumn to DataGraph ([fa608f9](https://github.com/hpcc-systems/Visualization/commit/fa608f944fcf5bc22d8c930dd2d2c926a95a0cea))
* Add GMap US Counties ([12bae45](https://github.com/hpcc-systems/Visualization/commit/12bae4544d16f4a5ea95373747c5459f39a8f304)), closes [#2554](https://github.com/hpcc-systems/Visualization/issues/2554)
* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)
* Add lite serialize/deserialize ([799fa5f](https://github.com/hpcc-systems/Visualization/commit/799fa5ff09395a04ec362f52d67230a28ed935c5))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)
* **AdjacencyGraph:** Add PP for user assigned columns ([af6e031](https://github.com/hpcc-systems/Visualization/commit/af6e0314700642f69a42b575acf848647da87015))
* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d6819c6fd166f74e7385446dd477e8a1cdd01))
* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))
* **graph:**  Add vertexExpansionFACharColumn to DataGraph ([9b11644](https://github.com/hpcc-systems/Visualization/commit/9b116448d84b5d751e3f6845317bf04889eb1a1b))
* Graph support in the marshaller ([bcc2290](https://github.com/hpcc-systems/Visualization/commit/bcc229003d03a6fcd42faaa70156f12814a4dc33)), closes [#2559](https://github.com/hpcc-systems/Visualization/issues/2559)
* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))
* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* **graph2:** Add vertex2 ([a817ca3](https://github.com/hpcc-systems/Visualization/commit/a817ca33fedac7c3c9de7bcf49b5592592dbc640))
* **graph2:** Improved widget_tree app ([a6a700d](https://github.com/hpcc-systems/Visualization/commit/a6a700d08e559dfac7d37840103d367ec2caf27e))
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* **Graph2:** Various Graph2 improvements: ([8482ff0](https://github.com/hpcc-systems/Visualization/commit/8482ff0c44e9945981c38e4d861536966089f88d))
* **Graph2:** Various improvements for ECL Watch integration ([668c9b4](https://github.com/hpcc-systems/Visualization/commit/668c9b40f8f84b2ce62fd0a6f59f44c4b9aa4483))
* **Graph:** Add "digraph" option to hierarchy layout ([28d8054](https://github.com/hpcc-systems/Visualization/commit/28d805405046d59fa655b33d4c45547befd41874))
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **Graph:** Add option to clear selection on background click ([ccc72bf](https://github.com/hpcc-systems/Visualization/commit/ccc72bfdcf587af81c7596db8ad8d3e90e6c1129))
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **Graph:** Add PP to change centroid colour ([c27c455](https://github.com/hpcc-systems/Visualization/commit/c27c455dd8cb5693e8b6494ad4ebc86e0e0d81c6))
* **graph:** Add vertex4.tsx ([99a3f4e](https://github.com/hpcc-systems/Visualization/commit/99a3f4e649282e1b541c4ede1d6bab4719e7bbfa)), closes [#3990](https://github.com/hpcc-systems/Visualization/issues/3990)
* **Graph:** Additional color support ([679e6b5](https://github.com/hpcc-systems/Visualization/commit/679e6b587560c4db167a9aacee2a067b387e4766)), closes [#2845](https://github.com/hpcc-systems/Visualization/issues/2845) [#2829](https://github.com/hpcc-systems/Visualization/issues/2829)
* **Graph:** New "lite" Graph ([efb2e4a](https://github.com/hpcc-systems/Visualization/commit/efb2e4ae7e821ea1226600d6f46a07572579e620))
* **graph:** Optionally drag singleton neighbours with drag node ([5f7ab41](https://github.com/hpcc-systems/Visualization/commit/5f7ab411445549f36d882b826a35bed3ba86b2bd))
* **Graph:** Optionally highlight selected path to centroid ([a4c0b00](https://github.com/hpcc-systems/Visualization/commit/a4c0b00dd15c5b2aa230e317dc873f41c5918067))
* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))
* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfacc1b162f1a5d02b06d434375424b7d225f))
* **readme:** Add packages/graph/README.md ([a98dfbb](https://github.com/hpcc-systems/Visualization/commit/a98dfbb4bca08ebe3001763f8c5b3c91ea9fa53a))
* **Table:**  Switch to react-data-grid from Fluent UI ([139ba72](https://github.com/hpcc-systems/Visualization/commit/139ba721ca55a0012de820df714636dba4017d7e))
* **toolbar:** Add selection group ([d6849ae](https://github.com/hpcc-systems/Visualization/commit/d6849aecf19c906994ae631bdc9ffe7f72cdfbf8))
* **tooltip:** tooltipHTML returning null prevents show ([297d01f](https://github.com/hpcc-systems/Visualization/commit/297d01f6b1704e5b147e2be097430ae1eac25088)), closes [#2929](https://github.com/hpcc-systems/Visualization/issues/2929)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))
* Revert "chore: Rework shim inclusion" ([462d55c](https://github.com/hpcc-systems/Visualization/commit/462d55c0b89cb74c6f2aacc29ccafebaf5a2c46c))






## [3.5.0](https://github.com/hpcc-systems/Visualization/compare/graph-v3.4.2...graph-v3.5.0) (2025-10-23)


### Features

* switch to simpler version stamp method ([d828033](https://github.com/hpcc-systems/Visualization/commit/d828033ec79f56c4d1579bca230bd03cf0d6328e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.12 to ^3.4.0
    * @hpcc-js/common bumped from ^3.4.2 to ^3.5.0
    * @hpcc-js/html bumped from ^3.2.13 to ^3.3.0
    * @hpcc-js/react bumped from ^3.3.2 to ^3.4.0
    * @hpcc-js/util bumped from ^3.3.12 to ^3.4.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.5.2 to ^1.6.0

## [3.4.2](https://github.com/hpcc-systems/Visualization/compare/graph-v3.4.1...graph-v3.4.2) (2025-10-09)


### Bug Fixes

* Bump versions to latest ([e200466](https://github.com/hpcc-systems/Visualization/commit/e20046603a824cb5bd1a8ab2a51d6f76805bb226))
* Bump versions to latest ([8c541d7](https://github.com/hpcc-systems/Visualization/commit/8c541d75e06bfbe1030ab003b5cccf4af68bc430))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.11 to ^3.3.12
    * @hpcc-js/common bumped from ^3.4.1 to ^3.4.2
    * @hpcc-js/html bumped from ^3.2.12 to ^3.2.13
    * @hpcc-js/react bumped from ^3.3.1 to ^3.3.2
    * @hpcc-js/util bumped from ^3.3.11 to ^3.3.12
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.5.1 to ^1.5.2

## [3.4.1](https://github.com/hpcc-systems/Visualization/compare/graph-v3.4.0...graph-v3.4.1) (2025-09-18)


### Bug Fixes

* bump versions ([e9719b8](https://github.com/hpcc-systems/Visualization/commit/e9719b875e4c65936921d2e6a0f76ab008b88114))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.10 to ^3.3.11
    * @hpcc-js/common bumped from ^3.4.0 to ^3.4.1
    * @hpcc-js/html bumped from ^3.2.11 to ^3.2.12
    * @hpcc-js/react bumped from ^3.3.0 to ^3.3.1
    * @hpcc-js/util bumped from ^3.3.10 to ^3.3.11
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.5.0 to ^1.5.1

## [3.4.0](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.12...graph-v3.4.0) (2025-08-26)


### Features

* Add @observablehq/notebook-kit support ([f8d806c](https://github.com/hpcc-systems/Visualization/commit/f8d806c68c8fd260ae83d0b2460dd5c0915da5cb))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.9 to ^3.3.10
    * @hpcc-js/common bumped from ^3.3.9 to ^3.4.0
    * @hpcc-js/html bumped from ^3.2.10 to ^3.2.11
    * @hpcc-js/react bumped from ^3.2.10 to ^3.3.0
    * @hpcc-js/util bumped from ^3.3.9 to ^3.3.10
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.9 to ^1.5.0

## [3.3.12](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.11...graph-v3.3.12) (2025-07-24)


### Bug Fixes

* vitest workspace is deprecated ([2b2584d](https://github.com/hpcc-systems/Visualization/commit/2b2584db7de0f62ea43144640931fd9d412373ab))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.8 to ^3.3.9
    * @hpcc-js/common bumped from ^3.3.8 to ^3.3.9
    * @hpcc-js/html bumped from ^3.2.9 to ^3.2.10
    * @hpcc-js/react bumped from ^3.2.9 to ^3.2.10
    * @hpcc-js/util bumped from ^3.3.8 to ^3.3.9
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.8 to ^1.4.9

## [3.3.11](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.10...graph-v3.3.11) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.7 to ^3.3.8
    * @hpcc-js/common bumped from ^3.3.7 to ^3.3.8
    * @hpcc-js/html bumped from ^3.2.8 to ^3.2.9
    * @hpcc-js/react bumped from ^3.2.8 to ^3.2.9
    * @hpcc-js/util bumped from ^3.3.7 to ^3.3.8
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.7 to ^1.4.8

## [3.3.10](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.9...graph-v3.3.10) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.6 to ^3.3.7
    * @hpcc-js/common bumped from ^3.3.6 to ^3.3.7
    * @hpcc-js/html bumped from ^3.2.7 to ^3.2.8
    * @hpcc-js/react bumped from ^3.2.7 to ^3.2.8
    * @hpcc-js/util bumped from ^3.3.6 to ^3.3.7
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.6 to ^1.4.7

## [3.3.9](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.8...graph-v3.3.9) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.5 to ^3.3.6
    * @hpcc-js/common bumped from ^3.3.5 to ^3.3.6
    * @hpcc-js/html bumped from ^3.2.6 to ^3.2.7
    * @hpcc-js/react bumped from ^3.2.6 to ^3.2.7
    * @hpcc-js/util bumped from ^3.3.5 to ^3.3.6
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.5 to ^1.4.6

## [3.3.8](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.7...graph-v3.3.8) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.4 to ^3.3.5
    * @hpcc-js/common bumped from ^3.3.4 to ^3.3.5
    * @hpcc-js/html bumped from ^3.2.5 to ^3.2.6
    * @hpcc-js/react bumped from ^3.2.5 to ^3.2.6
    * @hpcc-js/util bumped from ^3.3.4 to ^3.3.5
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.4 to ^1.4.5

## [3.3.7](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.6...graph-v3.3.7) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.3 to ^3.3.4
    * @hpcc-js/common bumped from ^3.3.3 to ^3.3.4
    * @hpcc-js/html bumped from ^3.2.4 to ^3.2.5
    * @hpcc-js/react bumped from ^3.2.4 to ^3.2.5
    * @hpcc-js/util bumped from ^3.3.3 to ^3.3.4
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.3 to ^1.4.4

## [3.3.6](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.5...graph-v3.3.6) (2025-07-03)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.2 to ^3.3.3
    * @hpcc-js/common bumped from ^3.3.2 to ^3.3.3
    * @hpcc-js/html bumped from ^3.2.3 to ^3.2.4
    * @hpcc-js/react bumped from ^3.2.3 to ^3.2.4
    * @hpcc-js/util bumped from ^3.3.2 to ^3.3.3
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.2 to ^1.4.3

## [3.3.5](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.4...graph-v3.3.5) (2025-06-24)


### Bug Fixes

* Sourcemaps out of sync ([c46b154](https://github.com/hpcc-systems/Visualization/commit/c46b1546855ee4a45bc299203dea430e84912d40))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.1 to ^3.3.2
    * @hpcc-js/common bumped from ^3.3.1 to ^3.3.2
    * @hpcc-js/html bumped from ^3.2.2 to ^3.2.3
    * @hpcc-js/react bumped from ^3.2.2 to ^3.2.3
    * @hpcc-js/util bumped from ^3.3.1 to ^3.3.2
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.1 to ^1.4.2

## [3.3.4](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.3...graph-v3.3.4) (2025-06-10)


### Bug Fixes

* Relax React peer dependency ([4fab392](https://github.com/hpcc-systems/Visualization/commit/4fab392ef6c81be640d82a2efbcfbf7061cfcb21))

## [3.3.3](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.2...graph-v3.3.3) (2025-04-03)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.3.0 to ^3.3.1
    * @hpcc-js/common bumped from ^3.3.0 to ^3.3.1
    * @hpcc-js/html bumped from ^3.2.1 to ^3.2.2
    * @hpcc-js/react bumped from ^3.2.1 to ^3.2.2
    * @hpcc-js/util bumped from ^3.3.0 to ^3.3.1
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.0 to ^1.4.1

## [3.3.2](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.1...graph-v3.3.2) (2025-02-05)


### Bug Fixes

* Resize markers and ensure correct colours ([b74d3ea](https://github.com/hpcc-systems/Visualization/commit/b74d3eaef37840ce1362e7ff570ce6884e7de242))

## [3.3.1](https://github.com/hpcc-systems/Visualization/compare/graph-v3.3.0...graph-v3.3.1) (2025-01-31)


### Bug Fixes

* Prevent React from being included in the bundle ([280db7a](https://github.com/hpcc-systems/Visualization/commit/280db7a82c01ce1a7c5ac8713e02eb4df9609bf3))

## [3.3.0](https://github.com/hpcc-systems/Visualization/compare/graph-v3.2.1...graph-v3.3.0) (2025-01-31)


### Features

* Add lit-html enabled graph ([8dec33c](https://github.com/hpcc-systems/Visualization/commit/8dec33c8391d6f5fa9717625a49a574401f1c158))

## [3.2.1](https://github.com/hpcc-systems/Visualization/compare/graph-v3.2.0...graph-v3.2.1) (2024-11-29)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/html bumped from ^3.2.0 to ^3.2.1
    * @hpcc-js/react bumped from ^3.2.0 to ^3.2.1

## [3.2.0](https://github.com/hpcc-systems/Visualization/compare/graph-v3.1.1...graph-v3.2.0) (2024-11-28)


### Features

* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.2.0 to ^3.3.0
    * @hpcc-js/common bumped from ^3.2.0 to ^3.3.0
    * @hpcc-js/html bumped from ^3.1.1 to ^3.2.0
    * @hpcc-js/react bumped from ^3.1.1 to ^3.2.0
    * @hpcc-js/util bumped from ^3.2.0 to ^3.3.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.3.0 to ^1.4.0

## [3.1.1](https://github.com/hpcc-systems/Visualization/compare/graph-v3.1.0...graph-v3.1.1) (2024-11-20)


### Bug Fixes

* Revert react back to preact ([9c2e0f0](https://github.com/hpcc-systems/Visualization/commit/9c2e0f0cbf7c43561b7f2c0707d5fb95971bd5ef))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/html bumped from ^3.1.0 to ^3.1.1
    * @hpcc-js/react bumped from ^3.1.0 to ^3.1.1

## [3.1.0](https://github.com/hpcc-systems/Visualization/compare/graph-v3.0.0...graph-v3.1.0) (2024-11-20)


### Features

* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))
* Switch to esbuild and ESM first packaging ([b752510](https://github.com/hpcc-systems/Visualization/commit/b752510b5074fbc9a606e4d189412798c241f414))
* Upgrade graph, html and react to v3 ([a1aa027](https://github.com/hpcc-systems/Visualization/commit/a1aa02785ed97c4ee18b3a83ab341f0423956b7c))
* Upgrade layout to v3 ([cbc463a](https://github.com/hpcc-systems/Visualization/commit/cbc463acb24fc2e7d0f3da93b4c0d9c6915aabd8))


### Bug Fixes

* Add guard against unknown event source ([5c61240](https://github.com/hpcc-systems/Visualization/commit/5c612400071cefa44c6f5e634976e0ba7ac90ac5)), closes [#4061](https://github.com/hpcc-systems/Visualization/issues/4061)
* Event.path is non-standard ([4edabd5](https://github.com/hpcc-systems/Visualization/commit/4edabd58cc0d06f079d959e847cf5a04eea45f4e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^3.1.0 to ^3.2.0
    * @hpcc-js/common bumped from ^3.1.0 to ^3.2.0
    * @hpcc-js/html bumped from ^3.0.0 to ^3.1.0
    * @hpcc-js/react bumped from ^3.0.0 to ^3.1.0
    * @hpcc-js/util bumped from ^3.1.0 to ^3.2.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.2.0 to ^1.3.0

## [2.87.0](https://github.com/hpcc-systems/Visualization/compare/graph-v2.86.0...graph-v2.87.0) (2024-10-23)


### Features

* Add better error handling for graphviz web-worker ([283e66d](https://github.com/hpcc-systems/Visualization/commit/283e66dd1a81372fbb30e124325d217ae075e6f7))
* Add React Custom Graph demo ([48f7140](https://github.com/hpcc-systems/Visualization/commit/48f7140592f3dcb400a95135d01115b8b475220a))
* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))


### Bug Fixes

* Add guard against unknown event source ([5c61240](https://github.com/hpcc-systems/Visualization/commit/5c612400071cefa44c6f5e634976e0ba7ac90ac5)), closes [#4061](https://github.com/hpcc-systems/Visualization/issues/4061)
* Event.path is non-standard ([4edabd5](https://github.com/hpcc-systems/Visualization/commit/4edabd58cc0d06f079d959e847cf5a04eea45f4e))
* **graph:** Fix failing tests ([0500277](https://github.com/hpcc-systems/Visualization/commit/0500277c4732087870a3f4558b6810341a418bb1))
* **GraphT:** Merge edges fails when ID matches, but source/target has changed ([b822ade](https://github.com/hpcc-systems/Visualization/commit/b822adef25e8d8780cab62f73e79972bb90712e2))
* **graph:** Tweak previous refactor to ensure backward compatibility ([0c86fbb](https://github.com/hpcc-systems/Visualization/commit/0c86fbb643e7845161d9cc044df7d8efa9658d80))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^2.13.0 to ^2.14.0
    * @hpcc-js/common bumped from ^2.72.0 to ^2.73.0
    * @hpcc-js/html bumped from ^2.43.0 to ^2.44.0
    * @hpcc-js/react bumped from ^2.54.0 to ^2.55.0
    * @hpcc-js/util bumped from ^2.52.0 to ^2.53.0

## [2.85.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.15...@hpcc-js/graph@2.85.16) (2024-07-02)



## 2.105.11 (2024-06-25)



## 2.105.10 (2024-06-19)



## 2.105.9 (2024-05-24)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.14...@hpcc-js/graph@2.85.15) (2024-05-24)



## 2.105.8 (2024-04-24)



## 2.105.7 (2024-04-22)



## 2.105.6 (2024-04-17)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.13...@hpcc-js/graph@2.85.14) (2024-04-17)



## 2.105.5 (2024-03-28)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.12...@hpcc-js/graph@2.85.13) (2024-03-28)



## 2.105.4 (2024-03-21)



## 2.105.3 (2024-03-19)



## 2.105.2 (2024-03-15)



## 2.105.1 (2024-03-15)



# 2.105.0 (2024-03-08)



## 2.104.42 (2024-02-28)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.11...@hpcc-js/graph@2.85.12) (2024-02-28)



## 2.104.41 (2024-02-16)



## 2.104.40 (2024-02-15)



## 2.104.39 (2024-02-06)



## 2.104.38 (2024-02-06)



## 2.104.37 (2024-01-25)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.10...@hpcc-js/graph@2.85.11) (2024-01-25)



## 2.104.36 (2024-01-23)



## 2.104.35 (2024-01-18)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.9...@hpcc-js/graph@2.85.10) (2024-01-18)



## 2.104.34 (2024-01-02)



## 2.104.33 (2023-11-16)



## 2.104.32 (2023-11-09)

**Note:** Version bump only for package @hpcc-js/graph






## [2.85.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.8...@hpcc-js/graph@2.85.9) (2023-11-09)



## 2.104.31 (2023-11-03)



## 2.104.30 (2023-10-26)

**Note:** Version bump only for package @hpcc-js/graph






## [2.85.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.7...@hpcc-js/graph@2.85.8) (2023-10-26)



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.6...@hpcc-js/graph@2.85.7) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.5...@hpcc-js/graph@2.85.6) (2023-09-14)



## 2.104.25 (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.4...@hpcc-js/graph@2.85.5) (2023-06-08)



## 2.104.19 (2023-03-14)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.3...@hpcc-js/graph@2.85.4) (2023-03-14)



## 2.104.18 (2023-02-22)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.2...@hpcc-js/graph@2.85.3) (2023-02-22)



## 2.104.17 (2023-01-20)

**Note:** Version bump only for package @hpcc-js/graph





## [2.85.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.1...@hpcc-js/graph@2.85.2) (2023-01-20)


### Bug Fixes

*  Event.path is non-standard ([4edabd5](https://github.com/hpcc-systems/Visualization/commit/4edabd58cc0d06f079d959e847cf5a04eea45f4e))



## 2.104.16 (2023-01-19)





## [2.85.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.85.0...@hpcc-js/graph@2.85.1) (2023-01-19)


### Bug Fixes

* Add guard against unknown event source ([5c61240](https://github.com/hpcc-systems/Visualization/commit/5c612400071cefa44c6f5e634976e0ba7ac90ac5)), closes [#4061](https://github.com/hpcc-systems/Visualization/issues/4061)



## 2.104.15 (2022-11-15)





# [2.85.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.84.4...@hpcc-js/graph@2.85.0) (2022-11-15)


### Features

*  Add better error handling for graphviz web-worker ([283e66d](https://github.com/hpcc-systems/Visualization/commit/283e66dd1a81372fbb30e124325d217ae075e6f7))



## 2.104.14 (2022-11-11)





## [2.84.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.84.3...@hpcc-js/graph@2.84.4) (2022-11-11)


### Bug Fixes

* **graph:**  Tweak previous refactor to ensure backward compatibility ([0c86fbb](https://github.com/hpcc-systems/Visualization/commit/0c86fbb643e7845161d9cc044df7d8efa9658d80))



## 2.104.13 (2022-11-09)






## [2.84.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.84.2...@hpcc-js/graph@2.84.3) (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)

**Note:** Version bump only for package @hpcc-js/graph






## [2.84.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.84.1...@hpcc-js/graph@2.84.2) (2022-10-11)


### Bug Fixes

* **GraphT:**  Merge edges fails when ID matches, but source/target has changed ([b822ade](https://github.com/hpcc-systems/Visualization/commit/b822adef25e8d8780cab62f73e79972bb90712e2))



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)





## [2.84.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.84.0...@hpcc-js/graph@2.84.1) (2022-10-03)


### Bug Fixes

* **graph:**  Fix failing tests ([0500277](https://github.com/hpcc-systems/Visualization/commit/0500277c4732087870a3f4558b6810341a418bb1))



## 2.104.8 (2022-09-29)





# [2.84.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.83.2...@hpcc-js/graph@2.84.0) (2022-09-29)


### Features

*  Add React Custom Graph demo ([48f7140](https://github.com/hpcc-systems/Visualization/commit/48f7140592f3dcb400a95135d01115b8b475220a))



## 2.104.7 (2022-09-28)





## [2.83.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.83.1...@hpcc-js/graph@2.83.2) (2022-09-28)



## 2.104.6 (2022-09-21)

**Note:** Version bump only for package @hpcc-js/graph





## [2.83.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.83.0...@hpcc-js/graph@2.83.1) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)

**Note:** Version bump only for package @hpcc-js/graph





# [2.83.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.82.1...@hpcc-js/graph@2.83.0) (2022-08-18)


### Bug Fixes

* **graph:**  Check if hasAttribute exists before calling it ([4829ee8](https://github.com/hpcc-systems/Visualization/commit/4829ee8721aece4473f30cafa7bbc093ec8c12eb))


### Features

* **graph:**  Add vertexExpansionFACharColumn to DataGraph ([9b11644](https://github.com/hpcc-systems/Visualization/commit/9b116448d84b5d751e3f6845317bf04889eb1a1b))



## 2.104.2 (2022-08-17)





## [2.82.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.82.0...@hpcc-js/graph@2.82.1) (2022-08-17)



## 2.104.1 (2022-08-16)

**Note:** Version bump only for package @hpcc-js/graph





# [2.82.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.81.0...@hpcc-js/graph@2.82.0) (2022-08-16)


### Bug Fixes

* Add graph2 dblclick annotation support ([a5b3d6b](https://github.com/hpcc-systems/Visualization/commit/a5b3d6b4c0d43296c652e0cf0ce92b8e86b526f5))


### Features

* Add anno event data to all mouse events ([54c6859](https://github.com/hpcc-systems/Visualization/commit/54c6859b455b4022814bb52cffc2bdff45bfa8f5))
* **graph:** Add vertex4.tsx ([99a3f4e](https://github.com/hpcc-systems/Visualization/commit/99a3f4e649282e1b541c4ede1d6bab4719e7bbfa)), closes [#3990](https://github.com/hpcc-systems/Visualization/issues/3990)



# 2.104.0 (2022-07-26)





# [2.81.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.80.3...@hpcc-js/graph@2.81.0) (2022-07-26)


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)





## [2.80.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.80.2...@hpcc-js/graph@2.80.3) (2022-06-23)



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)

**Note:** Version bump only for package @hpcc-js/graph





## [2.80.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.80.1...@hpcc-js/graph@2.80.2) (2022-04-27)



## 2.103.1 (2022-04-20)

**Note:** Version bump only for package @hpcc-js/graph





## [2.80.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.80.0...@hpcc-js/graph@2.80.1) (2022-04-20)



# 2.103.0 (2022-04-07)

**Note:** Version bump only for package @hpcc-js/graph





# [2.80.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.79.5...@hpcc-js/graph@2.80.0) (2022-04-07)


### Features

* **Table:**  Switch to react-data-grid from Fluent UI ([139ba72](https://github.com/hpcc-systems/Visualization/commit/139ba721ca55a0012de820df714636dba4017d7e))



## 2.102.11 (2022-03-24)





## [2.79.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.79.4...@hpcc-js/graph@2.79.5) (2022-03-24)



## 2.102.10 (2022-03-15)

**Note:** Version bump only for package @hpcc-js/graph





## [2.79.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.79.3...@hpcc-js/graph@2.79.4) (2022-03-15)


### Bug Fixes

* **Graph:** dagre regression ([5e8c18b](https://github.com/hpcc-systems/Visualization/commit/5e8c18b9cfe51caccddd99cba919d50ebb85d762))



## 2.102.9 (2022-03-15)





## [2.79.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.79.2...@hpcc-js/graph@2.79.3) (2022-03-15)


### Bug Fixes

* **Graph:** Make dagre a dependency ([73a6444](https://github.com/hpcc-systems/Visualization/commit/73a64442dae35648bc1fbd3fc4a87dcea6015ea3))



## 2.102.8 (2022-03-15)





## [2.79.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.79.1...@hpcc-js/graph@2.79.2) (2022-03-15)


### Bug Fixes

*  Graph regression (missing graphlib in bundle) ([6b9c98b](https://github.com/hpcc-systems/Visualization/commit/6b9c98bbb4d400e992cf85f4fcc5afb37ab6da10))



## 2.102.7 (2022-03-14)



## 2.102.6 (2022-03-11)



## 2.102.5 (2022-03-11)



## 2.102.4 (2022-03-10)



## 2.102.3 (2022-03-10)



## 2.102.2 (2022-03-08)



## 2.102.1 (2022-03-08)





## [2.79.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.79.0...@hpcc-js/graph@2.79.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/graph





# [2.79.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.78.0...@hpcc-js/graph@2.79.0) (2022-03-07)


### Bug Fixes

*  graph2/subgraphs failing gallery test ([b3db326](https://github.com/hpcc-systems/Visualization/commit/b3db32608ee2ffd854cd8de54196095397d01e35))


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





# [2.78.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.78.0) (2022-02-23)



# 2.100.0 (2022-02-18)



# 2.99.0 (2022-02-10)



# 2.98.0 (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)


### Bug Fixes

*  Add missing css for sankeyGraph ([c518a48](https://github.com/hpcc-systems/Visualization/commit/c518a488cff0a7d17d3e68446cfe6fb989586027))



# 2.93.0 (2021-11-18)


### Features

* Add edgeColorColumn to DataGraph ([fa608f9](https://github.com/hpcc-systems/Visualization/commit/fa608f944fcf5bc22d8c930dd2d2c926a95a0cea))



# 2.92.0 (2021-11-08)


### Bug Fixes

* Sankey data points mapped ([c5afd29](https://github.com/hpcc-systems/Visualization/commit/c5afd290292773b161a1a5b2d82cc3ba09a60cf8))


### Features

*  Add SankeyGraph ([679677c](https://github.com/hpcc-systems/Visualization/commit/679677c89dc9abd6590736f2ba39c8cd9879ece7))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)


### Bug Fixes

* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))



# 2.84.0 (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






# [2.77.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.77.0) (2022-02-10)



# 2.98.0 (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)


### Bug Fixes

*  Add missing css for sankeyGraph ([c518a48](https://github.com/hpcc-systems/Visualization/commit/c518a488cff0a7d17d3e68446cfe6fb989586027))



# 2.93.0 (2021-11-18)


### Features

* Add edgeColorColumn to DataGraph ([fa608f9](https://github.com/hpcc-systems/Visualization/commit/fa608f944fcf5bc22d8c930dd2d2c926a95a0cea))



# 2.92.0 (2021-11-08)


### Bug Fixes

* Sankey data points mapped ([c5afd29](https://github.com/hpcc-systems/Visualization/commit/c5afd290292773b161a1a5b2d82cc3ba09a60cf8))


### Features

*  Add SankeyGraph ([679677c](https://github.com/hpcc-systems/Visualization/commit/679677c89dc9abd6590736f2ba39c8cd9879ece7))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)


### Bug Fixes

* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))



# 2.84.0 (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






# [2.76.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.76.0) (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)


### Bug Fixes

*  Add missing css for sankeyGraph ([c518a48](https://github.com/hpcc-systems/Visualization/commit/c518a488cff0a7d17d3e68446cfe6fb989586027))



# 2.93.0 (2021-11-18)


### Features

* Add edgeColorColumn to DataGraph ([fa608f9](https://github.com/hpcc-systems/Visualization/commit/fa608f944fcf5bc22d8c930dd2d2c926a95a0cea))



# 2.92.0 (2021-11-08)


### Bug Fixes

* Sankey data points mapped ([c5afd29](https://github.com/hpcc-systems/Visualization/commit/c5afd290292773b161a1a5b2d82cc3ba09a60cf8))


### Features

*  Add SankeyGraph ([679677c](https://github.com/hpcc-systems/Visualization/commit/679677c89dc9abd6590736f2ba39c8cd9879ece7))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)


### Bug Fixes

* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))



# 2.84.0 (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






# [2.75.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.75.0) (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)


### Bug Fixes

*  Add missing css for sankeyGraph ([c518a48](https://github.com/hpcc-systems/Visualization/commit/c518a488cff0a7d17d3e68446cfe6fb989586027))



# 2.93.0 (2021-11-18)


### Features

* Add edgeColorColumn to DataGraph ([fa608f9](https://github.com/hpcc-systems/Visualization/commit/fa608f944fcf5bc22d8c930dd2d2c926a95a0cea))



# 2.92.0 (2021-11-08)


### Bug Fixes

* Sankey data points mapped ([c5afd29](https://github.com/hpcc-systems/Visualization/commit/c5afd290292773b161a1a5b2d82cc3ba09a60cf8))


### Features

*  Add SankeyGraph ([679677c](https://github.com/hpcc-systems/Visualization/commit/679677c89dc9abd6590736f2ba39c8cd9879ece7))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)


### Bug Fixes

* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))



# 2.84.0 (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.74.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.74.0) (2022-01-20)



# 2.94.0 (2022-01-19)


### Bug Fixes

*  Add missing css for sankeyGraph ([c518a48](https://github.com/hpcc-systems/Visualization/commit/c518a488cff0a7d17d3e68446cfe6fb989586027))



# 2.93.0 (2021-11-18)


### Features

* Add edgeColorColumn to DataGraph ([fa608f9](https://github.com/hpcc-systems/Visualization/commit/fa608f944fcf5bc22d8c930dd2d2c926a95a0cea))



# 2.92.0 (2021-11-08)


### Bug Fixes

* Sankey data points mapped ([c5afd29](https://github.com/hpcc-systems/Visualization/commit/c5afd290292773b161a1a5b2d82cc3ba09a60cf8))


### Features

*  Add SankeyGraph ([679677c](https://github.com/hpcc-systems/Visualization/commit/679677c89dc9abd6590736f2ba39c8cd9879ece7))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)


### Bug Fixes

* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))



# 2.84.0 (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






# [2.73.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.73.0) (2022-01-19)


### Bug Fixes

*  Add missing css for sankeyGraph ([c518a48](https://github.com/hpcc-systems/Visualization/commit/c518a488cff0a7d17d3e68446cfe6fb989586027))



# 2.93.0 (2021-11-18)


### Features

* Add edgeColorColumn to DataGraph ([fa608f9](https://github.com/hpcc-systems/Visualization/commit/fa608f944fcf5bc22d8c930dd2d2c926a95a0cea))



# 2.92.0 (2021-11-08)


### Bug Fixes

* Sankey data points mapped ([c5afd29](https://github.com/hpcc-systems/Visualization/commit/c5afd290292773b161a1a5b2d82cc3ba09a60cf8))


### Features

*  Add SankeyGraph ([679677c](https://github.com/hpcc-systems/Visualization/commit/679677c89dc9abd6590736f2ba39c8cd9879ece7))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)


### Bug Fixes

* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))



# 2.84.0 (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.72.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.72.0) (2021-11-18)


### Features

* Add edgeColorColumn to DataGraph ([fa608f9](https://github.com/hpcc-systems/Visualization/commit/fa608f944fcf5bc22d8c930dd2d2c926a95a0cea))



# 2.92.0 (2021-11-08)


### Features

*  Add SankeyGraph ([679677c](https://github.com/hpcc-systems/Visualization/commit/679677c89dc9abd6590736f2ba39c8cd9879ece7))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)


### Bug Fixes

* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))



# 2.84.0 (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.71.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.71.0) (2021-11-08)


### Features

*  Add SankeyGraph ([679677c](https://github.com/hpcc-systems/Visualization/commit/679677c89dc9abd6590736f2ba39c8cd9879ece7))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)


### Bug Fixes

* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))



# 2.84.0 (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






# [2.70.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.70.0) (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)


### Bug Fixes

* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))



# 2.84.0 (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.69.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.69.0) (2021-09-13)


### Bug Fixes

* **graph:**  Regression in previous PR ([02008b6](https://github.com/hpcc-systems/Visualization/commit/02008b62b8831fe3f28a460e04d1ad86b5347b30))



# 2.84.0 (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.68.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.68.0) (2021-09-13)


### Bug Fixes

* **comms:**  Workunit details should include formatted properties ([5e132f6](https://github.com/hpcc-systems/Visualization/commit/5e132f67499c3fc94f0b29ebead19f0681bb0f13))
* **graph:**  Support multi line edge labels ([2d241b2](https://github.com/hpcc-systems/Visualization/commit/2d241b2e5031f43358a712153f2c04ce492ff8bb))



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.67.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.67.0) (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






# [2.66.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.66.0) (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.65.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.65.0) (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.64.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.64.0) (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.63.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.63.0) (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)
* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.62.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.62.0) (2021-07-28)


### Features

* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






# [2.61.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.61.0) (2021-07-19)



# 2.73.0 (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.60.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.60.0) (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






# [2.59.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.59.0) (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






# [2.58.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.58.0) (2021-06-23)


### Features

* **comms:**  Update WUDetails API to latest version ([698d0ac](https://github.com/hpcc-systems/Visualization/commit/698d0ace5a750c0fb090589d8dd339bf1bda6279))



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.57.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.57.0) (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.56.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.56.0) (2021-05-19)



# 2.64.0 (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.55.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.55.0) (2021-05-13)


### Bug Fixes

* **graph:**  Bump WASM version ([c659cd5](https://github.com/hpcc-systems/Visualization/commit/c659cd5523fbe00282b9ee175c76b0a2f6da8c33))



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.54.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.54.0) (2021-04-29)


### Bug Fixes

*  Bump @hpcc-js/wasm to latest ([0c60208](https://github.com/hpcc-systems/Visualization/commit/0c60208a7940bf46f5f4a85958db023ee1da3410))



# 2.61.0 (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.53.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.53.0) (2021-04-06)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.52.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.52.0) (2021-03-16)



# 2.59.0 (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.51.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.51.0) (2021-02-24)


### Bug Fixes

* **graph:** Add dblclick to drag end callback ([afe2d2b](https://github.com/hpcc-systems/Visualization/commit/afe2d2b8e4336ca13d5fbde9d4933277b8ee2b12))



# 2.58.0 (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.50.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.50.0) (2021-02-24)


### Bug Fixes

* **graph:** Prevent double click vertex from zooming in ([1d89911](https://github.com/hpcc-systems/Visualization/commit/1d89911855638ad9886eca71547e3f1b6341b9da)), closes [#3775](https://github.com/hpcc-systems/Visualization/issues/3775)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.49.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.49.0) (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.48.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.48.0) (2021-02-19)


### Features

* **graph:** Add move all selected on drag ([adb5433](https://github.com/hpcc-systems/Visualization/commit/adb5433cbd7ca1d1f6b19aa334bb26cc2ad345d1)), closes [#3770](https://github.com/hpcc-systems/Visualization/issues/3770)
* **graph:** Add params for d3 force ([cb15647](https://github.com/hpcc-systems/Visualization/commit/cb15647a6aa08beb23b0822df77cc2014ce4ec7b)), closes [#3758](https://github.com/hpcc-systems/Visualization/issues/3758)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)



# 2.55.0 (2021-02-12)


### Bug Fixes

* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.47.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.47.0) (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.46.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.46.0) (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add showEdgeLabels to Graph2 ([b66c78a](https://github.com/hpcc-systems/Visualization/commit/b66c78a48fe2918f27817059ecd247bb56fb8c8e)), closes [#3727](https://github.com/hpcc-systems/Visualization/issues/3727)



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.45.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.45.0) (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.44.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.44.0) (2020-11-03)


### Bug Fixes

* **graph2:** Layout not triggered on option change ([c9a42fe](https://github.com/hpcc-systems/Visualization/commit/c9a42feb3b8dc1a68019aef576407dee45b5ad4f)), closes [#3722](https://github.com/hpcc-systems/Visualization/issues/3722)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.43.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.43.0) (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.42.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.42.0) (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.41.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.41.0) (2020-09-09)


### Bug Fixes

* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.40.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.40.0) (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.39.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.39.0) (2020-08-22)



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.38.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.38.0) (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.37.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.37.0) (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.36.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.36.0) (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.35.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.35.0) (2020-07-22)


### Bug Fixes

* Graph2 centerOnItem works as expected ([2507e19](https://github.com/hpcc-systems/Visualization/commit/2507e199c17b35164509f90e75177955b0150a99)), closes [#3651](https://github.com/hpcc-systems/Visualization/issues/3651)


### Features

* **Graph2:**  Refactor edge rendering ([1f52622](https://github.com/hpcc-systems/Visualization/commit/1f52622d29b72251ce1c06fea6c268dc7b2e828d))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)



# 2.26.0 (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.34.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.34.0) (2020-06-26)


### Features

* **Graph2:**  Additional Layouts ([4d4cf0d](https://github.com/hpcc-systems/Visualization/commit/4d4cf0d13a59572b987a72f5a25777d443c2da91))



# 2.25.0 (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






# [2.33.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.33.0) (2020-06-24)


### Features

* **Graph2:** Tweak layouts ([5543861](https://github.com/hpcc-systems/Visualization/commit/55438619cc75ec440c8577e4a16929633d6b9b29))
* Add graph2 vertex_dblclick ([84c2e7d](https://github.com/hpcc-systems/Visualization/commit/84c2e7db9612a40f6f575d92df43f0929580dd42)), closes [#3647](https://github.com/hpcc-systems/Visualization/issues/3647)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.32.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.32.0) (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.31.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.31.0) (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.30.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.30.0) (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.29.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.29.0) (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.28.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.28.0) (2020-06-15)


### Bug Fixes

* **graph:** GraphViz edges may have no pos ([3f8377f](https://github.com/hpcc-systems/Visualization/commit/3f8377f52bbd4b553e4481f51f54a1f99cf14cd7))


### Features

* Add automatic edge validation to Graph2 ([#3630](https://github.com/hpcc-systems/Visualization/issues/3630)) ([124d624](https://github.com/hpcc-systems/Visualization/commit/124d624eb69fd57867871aacf96cce66533308d1))



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.27.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.27.0) (2020-05-31)


### Features

* Add hideVertex and showVertex to graph2 ([df438c1](https://github.com/hpcc-systems/Visualization/commit/df438c1c38b28e24b0f4dd830b3934333ab44177)), closes [#3617](https://github.com/hpcc-systems/Visualization/issues/3617)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.26.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.26.0) (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.25.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.25.0) (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.24.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.24.0) (2020-05-20)



## 2.15.19 (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.23.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.23.0) (2020-05-19)


### Bug Fixes

* **wasm:** Graph layouts can get out of sync with current wasm versions ([c6ad069](https://github.com/hpcc-systems/Visualization/commit/c6ad069207f71830fc3acce508ad61907cef4417))



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.22.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.22.0) (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.21.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.21.0) (2020-05-15)


### Bug Fixes

* **Dashy:** Filter invalid edges ([a2d4a6b](https://github.com/hpcc-systems/Visualization/commit/a2d4a6b2ed751cd7178632054dfd531f67f4a319))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.20.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.20.0) (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.19.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.19.0) (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.18.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.18.0) (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.17.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.17.0) (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





# [2.16.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.16.0) (2020-04-17)


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





## [2.15.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.15.13) (2020-04-11)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))






## [2.15.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.15.12) (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





## [2.15.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.10...@hpcc-js/graph@2.15.11) (2020-04-11)


### Bug Fixes

* **wasm:** Bump wasm version to resolve folder override issue. ([6c53c18](https://github.com/hpcc-systems/Visualization/commit/6c53c182f01357445e2f2955d6f36ac8d500afc7))





## [2.15.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.9...@hpcc-js/graph@2.15.10) (2020-04-09)

**Note:** Version bump only for package @hpcc-js/graph





## [2.15.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.8...@hpcc-js/graph@2.15.9) (2020-04-09)


### Bug Fixes

* **build:** @hpcc-js/wasm out of sync ([585bc38](https://github.com/hpcc-systems/Visualization/commit/585bc38ba7c94f527ebdc807ecf59911c8791213))





## [2.15.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.7...@hpcc-js/graph@2.15.8) (2020-04-09)

**Note:** Version bump only for package @hpcc-js/graph





## [2.15.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.6...@hpcc-js/graph@2.15.7) (2020-04-08)


### Bug Fixes

* **graph:** WASM runtime out of sync with web worker ([bb2e5be](https://github.com/hpcc-systems/Visualization/commit/bb2e5bedcdfd83a9a26501f389c870bfd75faa4d))





## [2.15.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.5...@hpcc-js/graph@2.15.6) (2020-04-03)

**Note:** Version bump only for package @hpcc-js/graph





## [2.15.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.4...@hpcc-js/graph@2.15.5) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/graph





## [2.15.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.3...@hpcc-js/graph@2.15.4) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/graph






## [2.15.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.2...@hpcc-js/graph@2.15.3) (2020-03-20)

**Note:** Version bump only for package @hpcc-js/graph





## [2.15.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.1...@hpcc-js/graph@2.15.2) (2020-03-12)

**Note:** Version bump only for package @hpcc-js/graph





## [2.15.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.15.0...@hpcc-js/graph@2.15.1) (2020-03-05)

**Note:** Version bump only for package @hpcc-js/graph





# [2.15.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.14.2...@hpcc-js/graph@2.15.0) (2020-03-02)


### Bug Fixes

* **IE11:** d3-force >= v2 is not IE11 compatible ([0d254fa](https://github.com/hpcc-systems/Visualization/commit/0d254fade6f69b5080f6caa50d63ba15f4a23bb7))


### Features

* **Graph2:** Various improvements for ECL Watch integration ([668c9b4](https://github.com/hpcc-systems/Visualization/commit/668c9b40f8f84b2ce62fd0a6f59f44c4b9aa4483))





## [2.14.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.14.1...@hpcc-js/graph@2.14.2) (2020-02-13)

**Note:** Version bump only for package @hpcc-js/graph





## [2.14.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.14.0...@hpcc-js/graph@2.14.1) (2020-02-07)

**Note:** Version bump only for package @hpcc-js/graph






# [2.14.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.13.2...@hpcc-js/graph@2.14.0) (2020-02-07)


### Features

* **graph2:** Add vertex2 ([a817ca3](https://github.com/hpcc-systems/Visualization/commit/a817ca33fedac7c3c9de7bcf49b5592592dbc640))
* **graph2:** Improved widget_tree app ([a6a700d](https://github.com/hpcc-systems/Visualization/commit/a6a700d08e559dfac7d37840103d367ec2caf27e))





## [2.13.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.13.1...@hpcc-js/graph@2.13.2) (2020-02-04)


### Bug Fixes

* **graph:** Updated Graph2.md ([408ade5](https://github.com/hpcc-systems/Visualization/commit/408ade5fd6d8de163913e52f4af3a8708cfccc3b))





## [2.13.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.13.0...@hpcc-js/graph@2.13.1) (2020-01-23)

**Note:** Version bump only for package @hpcc-js/graph





# [2.13.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.12.0...@hpcc-js/graph@2.13.0) (2020-01-22)


### Features

* **Graph2:** Various Graph2 improvements: ([8482ff0](https://github.com/hpcc-systems/Visualization/commit/8482ff0c44e9945981c38e4d861536966089f88d))





# [2.12.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.11.1...@hpcc-js/graph@2.12.0) (2020-01-07)


### Features

* **Graph:** New "lite" Graph ([efb2e4a](https://github.com/hpcc-systems/Visualization/commit/efb2e4ae7e821ea1226600d6f46a07572579e620))






## [2.11.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.11.0...@hpcc-js/graph@2.11.1) (2019-12-11)

**Note:** Version bump only for package @hpcc-js/graph





# [2.11.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.10.4...@hpcc-js/graph@2.11.0) (2019-10-08)


### Features

* **AdjacencyGraph:** Add PP for user assigned columns ([af6e031](https://github.com/hpcc-systems/Visualization/commit/af6e031))





## [2.10.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.10.3...@hpcc-js/graph@2.10.4) (2019-09-27)


### Bug Fixes

* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f82))





## [2.10.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.10.2...@hpcc-js/graph@2.10.3) (2019-09-26)

**Note:** Version bump only for package @hpcc-js/graph





## [2.10.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.10.1...@hpcc-js/graph@2.10.2) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/graph





## [2.10.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.10.0...@hpcc-js/graph@2.10.1) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/graph





# [2.10.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.16...@hpcc-js/graph@2.10.0) (2019-08-13)


### Features

* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d681))





## [2.9.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.15...@hpcc-js/graph@2.9.16) (2019-08-06)

**Note:** Version bump only for package @hpcc-js/graph





## [2.9.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.14...@hpcc-js/graph@2.9.15) (2019-08-01)

**Note:** Version bump only for package @hpcc-js/graph





## [2.9.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.13...@hpcc-js/graph@2.9.14) (2019-07-10)

**Note:** Version bump only for package @hpcc-js/graph






## [2.9.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.12...@hpcc-js/graph@2.9.13) (2019-07-03)

**Note:** Version bump only for package @hpcc-js/graph





## [2.9.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.11...@hpcc-js/graph@2.9.12) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/graph





## [2.9.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.10...@hpcc-js/graph@2.9.11) (2019-06-26)


### Bug Fixes

* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07))






## [2.9.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.9...@hpcc-js/graph@2.9.10) (2019-06-20)


### Bug Fixes

* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf3))





## [2.9.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.8...@hpcc-js/graph@2.9.9) (2019-06-14)

**Note:** Version bump only for package @hpcc-js/graph






## [2.9.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.7...@hpcc-js/graph@2.9.8) (2019-05-16)

**Note:** Version bump only for package @hpcc-js/graph






## [2.9.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.6...@hpcc-js/graph@2.9.7) (2019-04-27)

**Note:** Version bump only for package @hpcc-js/graph






## [2.9.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.2...@hpcc-js/graph@2.9.6) (2019-04-06)

**Note:** Version bump only for package @hpcc-js/graph






## [2.9.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.2...@hpcc-js/graph@2.9.4) (2019-04-05)

**Note:** Version bump only for package @hpcc-js/graph






## [2.9.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.2...@hpcc-js/graph@2.9.3) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/graph






## [2.9.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.9.1...@hpcc-js/graph@2.9.2) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/graph






## [2.9.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.7.0...@hpcc-js/graph@2.9.1) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/graph






# [2.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.9...@hpcc-js/graph@2.9.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/graph






# [2.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.9...@hpcc-js/graph@2.8.0) (2019-04-01)

**Note:** Version bump only for package @hpcc-js/graph






# [2.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.9...@hpcc-js/graph@2.7.0) (2019-03-29)

**Note:** Version bump only for package @hpcc-js/graph






# [2.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.9...@hpcc-js/graph@2.6.0) (2019-03-21)


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))






## [2.5.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.8...@hpcc-js/graph@2.5.9) (2019-03-06)

**Note:** Version bump only for package @hpcc-js/graph






## [2.5.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.7...@hpcc-js/graph@2.5.8) (2019-02-20)

**Note:** Version bump only for package @hpcc-js/graph






## [2.5.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.6...@hpcc-js/graph@2.5.7) (2019-02-19)


### Bug Fixes

* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2))






## [2.5.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.5...@hpcc-js/graph@2.5.6) (2019-01-29)

**Note:** Version bump only for package @hpcc-js/graph






## [2.5.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.4...@hpcc-js/graph@2.5.5) (2019-01-08)

**Note:** Version bump only for package @hpcc-js/graph






## [2.5.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.3...@hpcc-js/graph@2.5.4) (2018-12-13)

**Note:** Version bump only for package @hpcc-js/graph






## [2.5.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.2...@hpcc-js/graph@2.5.3) (2018-12-06)

**Note:** Version bump only for package @hpcc-js/graph






## [2.5.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.1...@hpcc-js/graph@2.5.2) (2018-12-04)

**Note:** Version bump only for package @hpcc-js/graph






## [2.5.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.5.0...@hpcc-js/graph@2.5.1) (2018-11-27)

**Note:** Version bump only for package @hpcc-js/graph






<a name="2.5.0"></a>
# [2.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.4.0...@hpcc-js/graph@2.5.0) (2018-11-26)


### Features

* **toolbar:** Add selection group ([d6849ae](https://github.com/hpcc-systems/Visualization/commit/d6849ae))





<a name="2.4.0"></a>
# [2.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.3.0...@hpcc-js/graph@2.4.0) (2018-11-08)


### Features

* **readme:** Add packages/graph/README.md ([a98dfbb](https://github.com/hpcc-systems/Visualization/commit/a98dfbb))





<a name="2.3.0"></a>
# [2.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.2.1...@hpcc-js/graph@2.3.0) (2018-10-30)


### Bug Fixes

* **graph:** Use Vertex.pos as starting position ([bf93070](https://github.com/hpcc-systems/Visualization/commit/bf93070)), closes [#2928](https://github.com/hpcc-systems/Visualization/issues/2928)
* **Graph:** Calling raise during dragstart breaks click event ([e612378](https://github.com/hpcc-systems/Visualization/commit/e612378))
* **Graph:** Dragging Vertex causes it to snap to mouse position ([b064030](https://github.com/hpcc-systems/Visualization/commit/b064030)), closes [#2931](https://github.com/hpcc-systems/Visualization/issues/2931)


### Features

* **graph:** Optionally drag singleton neighbours with drag node ([5f7ab41](https://github.com/hpcc-systems/Visualization/commit/5f7ab41))
* **Graph:** Add option to clear selection on background click ([ccc72bf](https://github.com/hpcc-systems/Visualization/commit/ccc72bf))
* **Graph:** Add PP to change centroid colour ([c27c455](https://github.com/hpcc-systems/Visualization/commit/c27c455))
* **Graph:** Optionally highlight selected path to centroid ([a4c0b00](https://github.com/hpcc-systems/Visualization/commit/a4c0b00))
* **tooltip:** tooltipHTML returning null prevents show ([297d01f](https://github.com/hpcc-systems/Visualization/commit/297d01f)), closes [#2929](https://github.com/hpcc-systems/Visualization/issues/2929)





<a name="2.2.1"></a>
## [2.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.2.0...@hpcc-js/graph@2.2.1) (2018-10-05)


### Bug Fixes

* **graph:** Render callback not being called. ([525d325](https://github.com/hpcc-systems/Visualization/commit/525d325))





<a name="2.2.0"></a>
# [2.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.1.1...@hpcc-js/graph@2.2.0) (2018-09-25)


### Features

* **Graph:** Add "digraph" option to hierarchy layout ([28d8054](https://github.com/hpcc-systems/Visualization/commit/28d8054))





<a name="2.1.1"></a>
## [2.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.1.0...@hpcc-js/graph@2.1.1) (2018-09-24)


### Bug Fixes

* **PropertyExt:** Hash function very slow ([d846a9e](https://github.com/hpcc-systems/Visualization/commit/d846a9e))





<a name="2.1.0"></a>
# [2.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.0.1...@hpcc-js/graph@2.1.0) (2018-09-10)


### Features

* **Graph:** Additional color support ([679e6b5](https://github.com/hpcc-systems/Visualization/commit/679e6b5)), closes [#2845](https://github.com/hpcc-systems/Visualization/issues/2845) [#2829](https://github.com/hpcc-systems/Visualization/issues/2829)





<a name="2.0.1"></a>
## [2.0.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@2.0.0...@hpcc-js/graph@2.0.1) (2018-09-01)


### Bug Fixes

* **graph:** Subgraph text can reach beyond edge of border. ([c8db668](https://github.com/hpcc-systems/Visualization/commit/c8db668))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.23...@hpcc-js/graph@2.0.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/graph





<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.23...@hpcc-js/graph@2.0.0-rc.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/graph





<a name="0.2.23"></a>
## [0.2.23](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.22...@hpcc-js/graph@0.2.23) (2018-08-23)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.22"></a>
## [0.2.22](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.21...@hpcc-js/graph@0.2.22) (2018-08-15)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.21"></a>
## [0.2.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.20...@hpcc-js/graph@0.2.21) (2018-08-15)


### Bug Fixes

* **tooltip:** Workaround FF issue with getScreenCTM ([6978cfb](https://github.com/hpcc-systems/Visualization/commit/6978cfb)), closes [#2743](https://github.com/hpcc-systems/Visualization/issues/2743)




<a name="0.2.20"></a>
## [0.2.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.19...@hpcc-js/graph@0.2.20) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.19"></a>
## [0.2.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.18...@hpcc-js/graph@0.2.19) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.18"></a>
## [0.2.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.17...@hpcc-js/graph@0.2.18) (2018-08-10)


### Bug Fixes

* **graph:** FF tooltip fix for Graph ([687d6c1](https://github.com/hpcc-systems/Visualization/commit/687d6c1)), closes [#2742](https://github.com/hpcc-systems/Visualization/issues/2742)




<a name="0.2.17"></a>
## [0.2.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.16...@hpcc-js/graph@0.2.17) (2018-08-07)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.16"></a>
## [0.2.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.15...@hpcc-js/graph@0.2.16) (2018-08-02)


### Bug Fixes

* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ad))
* **graph:** Remove inline status messages. ([36030ad](https://github.com/hpcc-systems/Visualization/commit/36030ad))




<a name="0.2.15"></a>
## [0.2.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.14...@hpcc-js/graph@0.2.15) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.14"></a>
## [0.2.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.13...@hpcc-js/graph@0.2.14) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.13"></a>
## [0.2.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.12...@hpcc-js/graph@0.2.13) (2018-07-29)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.12"></a>
## [0.2.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.11...@hpcc-js/graph@0.2.12) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.11"></a>
## [0.2.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.10...@hpcc-js/graph@0.2.11) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.10"></a>
## [0.2.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.9...@hpcc-js/graph@0.2.10) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.9"></a>
## [0.2.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.8...@hpcc-js/graph@0.2.9) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.8"></a>
## [0.2.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.7...@hpcc-js/graph@0.2.8) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.7"></a>
## [0.2.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.6...@hpcc-js/graph@0.2.7) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.6"></a>
## [0.2.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.5...@hpcc-js/graph@0.2.6) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.5"></a>
## [0.2.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.4...@hpcc-js/graph@0.2.5) (2018-07-27)


### Bug Fixes

* **graph:** Fix graph Edges in IE11 ([38ad821](https://github.com/hpcc-systems/Visualization/commit/38ad821))




<a name="0.2.4"></a>
## [0.2.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.3...@hpcc-js/graph@0.2.4) (2018-06-28)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.3"></a>
## [0.2.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.2...@hpcc-js/graph@0.2.3) (2018-06-22)


### Bug Fixes

* **graph:** click event not firing ([f65e745](https://github.com/hpcc-systems/Visualization/commit/f65e745))




<a name="0.2.2"></a>
## [0.2.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.1...@hpcc-js/graph@0.2.2) (2018-06-20)


### Bug Fixes

* **graph:** Allow dragging regression ([f035789](https://github.com/hpcc-systems/Visualization/commit/f035789))




<a name="0.2.1"></a>
## [0.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.2.0...@hpcc-js/graph@0.2.1) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.2.0"></a>
# [0.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.1.5...@hpcc-js/graph@0.2.0) (2018-06-19)


### Bug Fixes

* **Graph:** Edge flicker when intersecting with Icon and TextBox ([f730f3e](https://github.com/hpcc-systems/Visualization/commit/f730f3e))


### Features

* Add lite serialize/deserialize ([799fa5f](https://github.com/hpcc-systems/Visualization/commit/799fa5f))




<a name="0.1.5"></a>
## [0.1.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.1.4...@hpcc-js/graph@0.1.5) (2018-06-15)


### Bug Fixes

* **Graph:** Edge flicker when intersecting with Icon and TextBox ([a8926c6](https://github.com/hpcc-systems/Visualization/commit/a8926c6))




<a name="0.1.4"></a>
## [0.1.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.1.3...@hpcc-js/graph@0.1.4) (2018-06-14)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.1.3"></a>
## [0.1.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.1.2...@hpcc-js/graph@0.1.3) (2018-06-01)


### Bug Fixes

* Optimize getBBox calls ([5114bb2](https://github.com/hpcc-systems/Visualization/commit/5114bb2)), closes [#2567](https://github.com/hpcc-systems/Visualization/issues/2567)




<a name="0.1.2"></a>
## [0.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.1.1...@hpcc-js/graph@0.1.2) (2018-05-28)




**Note:** Version bump only for package @hpcc-js/graph

<a name="0.1.1"></a>
## [0.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.1.0...@hpcc-js/graph@0.1.1) (2018-05-21)


### Bug Fixes

* MiniGantt click event was non standard ([988012a](https://github.com/hpcc-systems/Visualization/commit/988012a))




<a name="0.1.0"></a>
# [0.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/graph@0.0.78...@hpcc-js/graph@0.1.0) (2018-05-16)


### Features

* Add GMap US Counties ([12bae45](https://github.com/hpcc-systems/Visualization/commit/12bae45)), closes [#2554](https://github.com/hpcc-systems/Visualization/issues/2554)
* Graph support in the marshaller ([bcc2290](https://github.com/hpcc-systems/Visualization/commit/bcc2290)), closes [#2559](https://github.com/hpcc-systems/Visualization/issues/2559)
