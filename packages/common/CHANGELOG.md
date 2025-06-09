# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.72.0 (2024-07-23)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)
*  Potential prototype pollution ([dd69e58](https://github.com/hpcc-systems/Visualization/commit/dd69e5875de88e5598412202937f1fd1f3ed4710)), closes [#4069](https://github.com/hpcc-systems/Visualization/issues/4069)
*  textSize can leave remnants ([4624fee](https://github.com/hpcc-systems/Visualization/commit/4624fee4ee8c87512ebb47090050259a19ea43cf))
*  Unable to select "Accent" ordinal palette ([3031db5](https://github.com/hpcc-systems/Visualization/commit/3031db53a9d4e81e91693a4a5f902298c45fd3dc))
*  Widget.LazyRender Broken ([c34d901](https://github.com/hpcc-systems/Visualization/commit/c34d9018dbe594d378194a91f8ce371943430615)), closes [#2546](https://github.com/hpcc-systems/Visualization/issues/2546)
* Add noDeserialize to computedFields ([5f1e10c](https://github.com/hpcc-systems/Visualization/commit/5f1e10c1dcbb1dc9b5ea95193d4a0eb87f68cab9))
* Add scale to move within SVGWidget.ts ([7462e7c](https://github.com/hpcc-systems/Visualization/commit/7462e7c94b5ac6a60673e7191321f62251f0c7ae))
* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07379e59081c930d61485764e78c8a07a90))
* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf369d6d4081f0f5d9285bf3b1fd9b5b5999))
* **chart:** X-Axis focus hiding columns ([49f5d72](https://github.com/hpcc-systems/Visualization/commit/49f5d72c1e9d6ea208c5277aebe20b34d5382123))
* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)
* **Column:** Value labels not displaying correctly ([5f61050](https://github.com/hpcc-systems/Visualization/commit/5f61050ee3cf6976ace44f63ca0522cf66d7616c)), closes [#3248](https://github.com/hpcc-systems/Visualization/issues/3248)
* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ada4d7aad0ffe9ea5cf004b49ccec6710de))
* **dashy:** Improved Form support ([ddfe22e](https://github.com/hpcc-systems/Visualization/commit/ddfe22ea7b49101fff430aee5298da2935d6efce)), closes [#3334](https://github.com/hpcc-systems/Visualization/issues/3334)
* **database.field:** Missing valid method ([0d8f02e](https://github.com/hpcc-systems/Visualization/commit/0d8f02e197c114763573c3edc8642bdb2ecef601))
* **ddl:** Incorrect input/output lists in the DDL ([38ca0ac](https://github.com/hpcc-systems/Visualization/commit/38ca0ac9b2ec6b4ff95b5184c36439e213f3e61a))
* Drag end event has no stopPropagation ([8aed62d](https://github.com/hpcc-systems/Visualization/commit/8aed62d04d6a91d6cccddbec0655a7736b32c4e9))
* **eclwatch:** Hide canvas text Calculator ([4ed9631](https://github.com/hpcc-systems/Visualization/commit/4ed963153364a4ec69de05da8cfc2c4709bd3fe6))
* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2c956601f3b4740917c4c35896f7f6c1c4))
* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))
* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)
* **graph2:** Ctrl+Click should multi select ([9c8b8bd](https://github.com/hpcc-systems/Visualization/commit/9c8b8bd223181e460b18c31b470b86119931140f)), closes [#3762](https://github.com/hpcc-systems/Visualization/issues/3762)
* **html/common:** correct BreakdownTable tooltip height calculation ([5c77723](https://github.com/hpcc-systems/Visualization/commit/5c77723639ade13b1d07001d1e7b05cbddb5c805))
* Icon bar buttons should not cause navigation ([3cd7081](https://github.com/hpcc-systems/Visualization/commit/3cd70813aa85a812b65ad72b6f211a2e87e9b40d))
* **icon:** Remove pointer-events from icon text ([eea86f1](https://github.com/hpcc-systems/Visualization/commit/eea86f12c3f853d2b0b85797a77564a25ae464f3)), closes [#2702](https://github.com/hpcc-systems/Visualization/issues/2702)
* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))
* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)
* **marshaller:** Add missing "flyout" capability ([1f75e11](https://github.com/hpcc-systems/Visualization/commit/1f75e1182f9e79b97f60af9a9b6f5cb870888e79))
* Optimize getBBox calls ([5114bb2](https://github.com/hpcc-systems/Visualization/commit/5114bb28e9c06b7601141355a1a83dc823c25b19)), closes [#2567](https://github.com/hpcc-systems/Visualization/issues/2567)
* **PropertyExt:** Hash function very slow ([d846a9e](https://github.com/hpcc-systems/Visualization/commit/d846a9e5dab2e2c8abf7edf2dc46aef71a311ef4))
* **PropertyExt:** Hash sum is failing for PropertyArray ([3626cff](https://github.com/hpcc-systems/Visualization/commit/3626cff8f1f1bb2094db818664b29a13bd14bfc9))
* **PropertyExt:** Hashsum fails with proxied properties ([6cb79f5](https://github.com/hpcc-systems/Visualization/commit/6cb79f59916eadf4d73b66e5ba54f84578c47fa4))
* **PropertyExt:** Improved changed hashing ([ef05468](https://github.com/hpcc-systems/Visualization/commit/ef054685305a881536728758b3edd2c13030fb7d))
* **PropertyExt:** Incorrect hashSum calculation ([ec11938](https://github.com/hpcc-systems/Visualization/commit/ec119383ce00269355375d17499e1c5ff5337e09)), closes [#3173](https://github.com/hpcc-systems/Visualization/issues/3173)
* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))
* **rowToObj:** Add guard to rowToObj ([cf6581a](https://github.com/hpcc-systems/Visualization/commit/cf6581a267e9798bd95ff491436ee2ff3ea621f4))
* **style:** Ensure "px" exists for top/left ([40f6c5e](https://github.com/hpcc-systems/Visualization/commit/40f6c5e3a9b0281de2cc2e28533e87a7c28578c8))
* **SVGWidget:** Incomplete feColorMatrix node can cause IE/Edge to crash ([39c1e6e](https://github.com/hpcc-systems/Visualization/commit/39c1e6e6aa09bc6f03b39eeecb04ccf2ad3448ca)), closes [#3347](https://github.com/hpcc-systems/Visualization/issues/3347)
* TextBox text colour could be hard to read ([bb15dcc](https://github.com/hpcc-systems/Visualization/commit/bb15dcc3ee1b6250394467c54e6275828633bdd1))
* **textColor:** Improve transparent/unknown background handling (assume its white) ([f690858](https://github.com/hpcc-systems/Visualization/commit/f690858f70cf2ded8a1e314c33f5a15a64af32cf))
* textSize should work with coerced strings ([cfab0cd](https://github.com/hpcc-systems/Visualization/commit/cfab0cd455920060a207f764e0fe39d6018aa5c0))
* **textSize:** Cached value should be readonly ([b508834](https://github.com/hpcc-systems/Visualization/commit/b508834e41194ab8047c1f7973653ba876dd2e16))
* **timeline:** Calc EntityPin height ([1fd4ea3](https://github.com/hpcc-systems/Visualization/commit/1fd4ea3712d268bc83661ea8d835c15f7c4f4b5c))
* **timeline:** Revert to "nice" tick formats ([2835a92](https://github.com/hpcc-systems/Visualization/commit/2835a921bed81af7bd04588cb3d6491baa03eae9))
* **TitleBar:**  Select had incorrect "selected" value. ([4d69b46](https://github.com/hpcc-systems/Visualization/commit/4d69b46e3c053173570145e6f26c0e2a92168426))
* **TitleBar:** Tooltip not updatable ([8cf14d8](https://github.com/hpcc-systems/Visualization/commit/8cf14d8014aff7de32c666932a5886f7aa47401b))
* **Widget:**  Classed could share object with all Widgets ([b0c89f0](https://github.com/hpcc-systems/Visualization/commit/b0c89f05c6a01f141b3aef8a582da92dd395a58d))
* Widget flattenData now allows falsey values ([c71b3c3](https://github.com/hpcc-systems/Visualization/commit/c71b3c3144609d3d19df65c59593c17f5d7f95fb)), closes [#2647](https://github.com/hpcc-systems/Visualization/issues/2647)
* **widget:** Skip render if size is invalid ([b01c2d9](https://github.com/hpcc-systems/Visualization/commit/b01c2d99e0c05a4a8b1b611585b1e250da0a44c0))


### Features

*  Add ability to get a normalized array of WUDetail scopes ([752ada0](https://github.com/hpcc-systems/Visualization/commit/752ada0bc011dafc63c5bba4df130cee51a9c38d))
*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))
*  Expose import csv/tsv ([ec30bcf](https://github.com/hpcc-systems/Visualization/commit/ec30bcfeae9db77c296ff56b5b604ca7a5c7f01b))
* Add 14 new ordinal color palettes ([178488f](https://github.com/hpcc-systems/Visualization/commit/178488f11b90d3cd9f77ff91e12758a48b8c9d00))
* Add Collapsed publish param tag ([4b65e73](https://github.com/hpcc-systems/Visualization/commit/4b65e733fb06966baf37818ec82fcb23ea7ee940))
* Add CSV/TSV Support to databomb datasource ([fd96de0](https://github.com/hpcc-systems/Visualization/commit/fd96de0985fb79a4a88f9dc2efd79341b6dff1b0)), closes [#2564](https://github.com/hpcc-systems/Visualization/issues/2564)
* Add dataMeta to Widget.ts ([ce42a05](https://github.com/hpcc-systems/Visualization/commit/ce42a05aa7e92ee30e5695b7c003af79738b2b83)), closes [#3189](https://github.com/hpcc-systems/Visualization/issues/3189)
* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)
* Add GMap US Counties ([12bae45](https://github.com/hpcc-systems/Visualization/commit/12bae4544d16f4a5ea95373747c5459f39a8f304)), closes [#2554](https://github.com/hpcc-systems/Visualization/issues/2554)
* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* Add lite serialize/deserialize ([799fa5f](https://github.com/hpcc-systems/Visualization/commit/799fa5ff09395a04ec362f52d67230a28ed935c5))
* Add randomized palette sample ([6c95c57](https://github.com/hpcc-systems/Visualization/commit/6c95c578379ab03601dcc81c444a987f0600d00e)), closes [#2900](https://github.com/hpcc-systems/Visualization/issues/2900)
* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))
* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))
* **ChartPanel:**  Add API for toolbar buttons ([c87656b](https://github.com/hpcc-systems/Visualization/commit/c87656b3805c514e5a6a9aa3c22eea69a33c5dac)), closes [#2813](https://github.com/hpcc-systems/Visualization/issues/2813)
* **ChartPanel:** Download image includes legend (if visible) ([8c64922](https://github.com/hpcc-systems/Visualization/commit/8c64922b8cfd54e11250b5a590f45d45c905165a)), closes [#3299](https://github.com/hpcc-systems/Visualization/issues/3299)
* **chart:** Support runtime colour calculations ([820ff4f](https://github.com/hpcc-systems/Visualization/commit/820ff4f582b05a1e5f8157b106c22514340fe6e4))
* **chart:** Support runtime colour calculations ([18ceed4](https://github.com/hpcc-systems/Visualization/commit/18ceed47347e4971d1d7cdcad4d426ce4dcf010a))
* **dashy:** Add @hpcc-js/chart input mapping meta ([fb9e523](https://github.com/hpcc-systems/Visualization/commit/fb9e523308675cd26698cdbc151be62c594ba004))
* **dashy:** Add dermatology upgrade script to ddl-shim ([72f2a46](https://github.com/hpcc-systems/Visualization/commit/72f2a4675e56e268858b3ec5a17090fa357c20fc))
* **dashy:** Enable XYAxis range selection ([ec96d97](https://github.com/hpcc-systems/Visualization/commit/ec96d97d74818022b21f29919983c320957db78e))
* **dashy:** Minor usability tweaks ([9531690](https://github.com/hpcc-systems/Visualization/commit/9531690675d21cb54b0cca6909795e531aeaef5a))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* **dgrid2:**  Add column formatting ([7a9db35](https://github.com/hpcc-systems/Visualization/commit/7a9db35fce57d94a4f3a58e88cebe1c10f2ab605))
* **docs:** Add SummaryC.md ([7084ecc](https://github.com/hpcc-systems/Visualization/commit/7084ecc82597d18e33e867e14bdbb1f215215584))
* **entity:** Adds Entity, EntityCard, EntityPin, EntityVertexSigned-off-by: Jaman <jbrundage372@gmail.com> ([1f73572](https://github.com/hpcc-systems/Visualization/commit/1f73572a7caa1fd25b92ec4690f847b883e08108))
* **EntityRect:** Add EntityRect and EntityRectList ([34cceb3](https://github.com/hpcc-systems/Visualization/commit/34cceb37e1822e501fb13b4884454c8a8d122a03))
* **fachar:** Add generic click handling ([9c7a1c5](https://github.com/hpcc-systems/Visualization/commit/9c7a1c5c4e3a28fe25b5fcea58e37241b9bdef8d)), closes [#2932](https://github.com/hpcc-systems/Visualization/issues/2932)
* **fgrid:**  Add alternative to dgrid ([3a4841e](https://github.com/hpcc-systems/Visualization/commit/3a4841e7c6f898e0ff8bf0bfa55480c6ee5760d2))
* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d6819c6fd166f74e7385446dd477e8a1cdd01))
* Graph support in the marshaller ([bcc2290](https://github.com/hpcc-systems/Visualization/commit/bcc229003d03a6fcd42faaa70156f12814a4dc33)), closes [#2559](https://github.com/hpcc-systems/Visualization/issues/2559)
* **graph2:** Add marquee selection mode ([e973567](https://github.com/hpcc-systems/Visualization/commit/e973567194fc2671a11f22f0328f08cccf876c29)), closes [#3756](https://github.com/hpcc-systems/Visualization/issues/3756) [#2555](https://github.com/hpcc-systems/Visualization/issues/2555)
* **Graph:** Add option to clear selection on background click ([ccc72bf](https://github.com/hpcc-systems/Visualization/commit/ccc72bfdcf587af81c7596db8ad8d3e90e6c1129))
* **Graph:** Add PP to change centroid colour ([c27c455](https://github.com/hpcc-systems/Visualization/commit/c27c455dd8cb5693e8b6494ad4ebc86e0e0d81c6))
* **Graph:** Additional color support ([679e6b5](https://github.com/hpcc-systems/Visualization/commit/679e6b587560c4db167a9aacee2a067b387e4766)), closes [#2845](https://github.com/hpcc-systems/Visualization/issues/2845) [#2829](https://github.com/hpcc-systems/Visualization/issues/2829)
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)
* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfacc1b162f1a5d02b06d434375424b7d225f))
* **map:** Add cluster circles layer ([686dd4c](https://github.com/hpcc-systems/Visualization/commit/686dd4c5d5bcc877e9970855a514841a7d5bde90))
* **map:** Add polygon layer support to map and map-deck ([c74d082](https://github.com/hpcc-systems/Visualization/commit/c74d0824710940e4792604daeed8d17dcbe5eca4))
* **observable-md:** Add new Observable Markdown Widget ([c015ad3](https://github.com/hpcc-systems/Visualization/commit/c015ad394b2b3945fdbcdcdf6a5ec72514f2a492))
* **Pie:**  Add support for set selection ([b9af982](https://github.com/hpcc-systems/Visualization/commit/b9af98205d758f2e405b035df91fc57d2de1f0be))
* **PP:** Allow SET to optionally support text + value ([fd22216](https://github.com/hpcc-systems/Visualization/commit/fd2221603b79a332d7faf6b6c2eeeabd47b53676))
* **PP:** Support serialized classes + AutoExpand ([7afaefd](https://github.com/hpcc-systems/Visualization/commit/7afaefdc9a82208cee250c2eced98e69dae61204))
* Prevent Render when hidden ([1499c68](https://github.com/hpcc-systems/Visualization/commit/1499c68db126a6f7c04baf8d51a90b9b15c66596)), closes [#2547](https://github.com/hpcc-systems/Visualization/issues/2547)
* **PropertyEditor:**  Optionally highlight invalid properties ([7a2f86d](https://github.com/hpcc-systems/Visualization/commit/7a2f86dab6ed34b3819b462e82d27e3cb262ff11))
* **PropertyExt:** Add option to hide PP similar to disable ([b7d4340](https://github.com/hpcc-systems/Visualization/commit/b7d4340a26684af23ba131bf8da5b8847d880881))
* **readme:** Add packages/common/README.md ([65d6f5e](https://github.com/hpcc-systems/Visualization/commit/65d6f5ef1a099985e606a82f978a57cb3475a4a5))
* **readme:** Add README.md and samples for other ([51624b9](https://github.com/hpcc-systems/Visualization/commit/51624b9cd1a1f7590f870c82b58b55bcc2e4af8f))
* **SimpleSelection:**  Return selection state on click ([591f4aa](https://github.com/hpcc-systems/Visualization/commit/591f4aacb3a6f58098ad3e8290e9941f919765f7))
* Simplify Pie labels ([8506b4d](https://github.com/hpcc-systems/Visualization/commit/8506b4db8f0745777ca19bc8d90255714a32c5a5))
* **SVGWidget:** Allow SVG Widgets to Scroll ([df283f9](https://github.com/hpcc-systems/Visualization/commit/df283f9cd4866134c53d91603310aee0a8a1eef8))
* **SVGWidget:** Expose Blob Generation ([c4f4cb8](https://github.com/hpcc-systems/Visualization/commit/c4f4cb8c082c083e05be177cd0d72fd116bd2528))
* **SVGWiget:** Add image download capability ([46f19dc](https://github.com/hpcc-systems/Visualization/commit/46f19dc4751e9106d7e5cba6b974d251793cbd19)), closes [#3186](https://github.com/hpcc-systems/Visualization/issues/3186)
* **SVGZoomWidget:** Additional zoomTo methods ([09feedc](https://github.com/hpcc-systems/Visualization/commit/09feedc70b67d7939c5807dd4af4093bfd4e0476))
* **Table:** Add cell formatting ([aa067d3](https://github.com/hpcc-systems/Visualization/commit/aa067d3b557c6b8216b39d663c8e9886c78c93ff))
* **textbox:** Add fontSize ([0e10500](https://github.com/hpcc-systems/Visualization/commit/0e10500aa03aaba79aea1eb67325d28d1997fb5a)), closes [#2934](https://github.com/hpcc-systems/Visualization/issues/2934)
* **timeline:** Add EntityPin to timeline ([bab1b06](https://github.com/hpcc-systems/Visualization/commit/bab1b065bbab6efd6e2f657d51a0f0e7ccbd23c3))
* **timeline:** Add EntityPin to timeline ([25ce344](https://github.com/hpcc-systems/Visualization/commit/25ce344859a7803e404572fd5d2c6d39f280575d))
* **timeline:** Improved icon handling ([25819ba](https://github.com/hpcc-systems/Visualization/commit/25819bae4821e3e693d5d90850c873967f1dd5b5))
* **timeline:** Various improvements to MiniGantt ([3a7375d](https://github.com/hpcc-systems/Visualization/commit/3a7375df7ca8262b99702cc3af65e7b0d2dd636f)), closes [#2585](https://github.com/hpcc-systems/Visualization/issues/2585) [#2584](https://github.com/hpcc-systems/Visualization/issues/2584) [#2583](https://github.com/hpcc-systems/Visualization/issues/2583)
* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))
* **titlebar:** Add description functionality ([fbb1d80](https://github.com/hpcc-systems/Visualization/commit/fbb1d800f19dd0435890fa5154eecff4e4407e7c)), closes [#3030](https://github.com/hpcc-systems/Visualization/issues/3030)
* **toolbar:**  Allow consumer to disable toolbar buttons ([971cf74](https://github.com/hpcc-systems/Visualization/commit/971cf7445ef0d4d80baa7ba6029fbab51d83bbf0))
* **toolbar:** Add selection group ([d6849ae](https://github.com/hpcc-systems/Visualization/commit/d6849aecf19c906994ae631bdc9ffe7f72cdfbf8))
* **Widget:** Enhanced classed call to match d3 v4 call signature. ([f7e9141](https://github.com/hpcc-systems/Visualization/commit/f7e91418ff4a7660c2713f4635e2852765dd6497)), closes [#2933](https://github.com/hpcc-systems/Visualization/issues/2933)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))
* Revert "chore: Rework shim inclusion" ([462d55c](https://github.com/hpcc-systems/Visualization/commit/462d55c0b89cb74c6f2aacc29ccafebaf5a2c46c))





## [2.73.1](https://github.com/hpcc-systems/Visualization/compare/common-v2.73.0...common-v2.73.1) (2025-06-09)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/util bumped from ^2.53.0 to ^2.53.1

## [2.73.0](https://github.com/hpcc-systems/Visualization/compare/common-v2.72.0...common-v2.73.0) (2024-10-23)


### Features

* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))


### Bug Fixes

* **html/common:** correct BreakdownTable tooltip height calculation ([5c77723](https://github.com/hpcc-systems/Visualization/commit/5c77723639ade13b1d07001d1e7b05cbddb5c805))
* Potential prototype pollution ([dd69e58](https://github.com/hpcc-systems/Visualization/commit/dd69e5875de88e5598412202937f1fd1f3ed4710)), closes [#4069](https://github.com/hpcc-systems/Visualization/issues/4069)
* Unable to select "Accent" ordinal palette ([3031db5](https://github.com/hpcc-systems/Visualization/commit/3031db53a9d4e81e91693a4a5f902298c45fd3dc))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/util bumped from ^2.52.0 to ^2.53.0

## [2.71.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.17...@hpcc-js/common@2.71.18) (2024-07-02)



## 2.105.11 (2024-06-25)



## 2.105.10 (2024-06-19)



## 2.105.9 (2024-05-24)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.16...@hpcc-js/common@2.71.17) (2024-05-24)


### Bug Fixes

*  Unable to select "Accent" ordinal palette ([3031db5](https://github.com/hpcc-systems/Visualization/commit/3031db53a9d4e81e91693a4a5f902298c45fd3dc))



## 2.105.8 (2024-04-24)



## 2.105.7 (2024-04-22)



## 2.105.6 (2024-04-17)





## [2.71.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.15...@hpcc-js/common@2.71.16) (2024-04-17)



## 2.105.5 (2024-03-28)



## 2.105.4 (2024-03-21)



## 2.105.3 (2024-03-19)



## 2.105.2 (2024-03-15)



## 2.105.1 (2024-03-15)



# 2.105.0 (2024-03-08)



## 2.104.42 (2024-02-28)



## 2.104.41 (2024-02-16)



## 2.104.40 (2024-02-15)



## 2.104.39 (2024-02-06)



## 2.104.38 (2024-02-06)



## 2.104.37 (2024-01-25)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.14...@hpcc-js/common@2.71.15) (2024-01-25)



## 2.104.36 (2024-01-23)



## 2.104.35 (2024-01-18)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.13...@hpcc-js/common@2.71.14) (2024-01-18)



## 2.104.34 (2024-01-02)



## 2.104.33 (2023-11-16)



## 2.104.32 (2023-11-09)

**Note:** Version bump only for package @hpcc-js/common






## [2.71.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.12...@hpcc-js/common@2.71.13) (2023-11-09)


### Bug Fixes

* **html/common:** correct BreakdownTable tooltip height calculation ([5c77723](https://github.com/hpcc-systems/Visualization/commit/5c77723639ade13b1d07001d1e7b05cbddb5c805))



## 2.104.31 (2023-11-03)



## 2.104.30 (2023-10-26)






## [2.71.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.11...@hpcc-js/common@2.71.12) (2023-10-26)



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.10...@hpcc-js/common@2.71.11) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.9...@hpcc-js/common@2.71.10) (2023-09-14)



## 2.104.25 (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.8...@hpcc-js/common@2.71.9) (2023-06-08)



## 2.104.19 (2023-03-14)



## 2.104.18 (2023-02-22)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.7...@hpcc-js/common@2.71.8) (2023-02-22)


### Bug Fixes

*  Potential prototype pollution ([dd69e58](https://github.com/hpcc-systems/Visualization/commit/dd69e5875de88e5598412202937f1fd1f3ed4710)), closes [#4069](https://github.com/hpcc-systems/Visualization/issues/4069)



## 2.104.17 (2023-01-20)



## 2.104.16 (2023-01-19)



## 2.104.15 (2022-11-15)



## 2.104.14 (2022-11-11)





## [2.71.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.6...@hpcc-js/common@2.71.7) (2022-11-11)



## 2.104.13 (2022-11-09)

**Note:** Version bump only for package @hpcc-js/common






## [2.71.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.5...@hpcc-js/common@2.71.6) (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)

**Note:** Version bump only for package @hpcc-js/common






## [2.71.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.4...@hpcc-js/common@2.71.5) (2022-10-11)



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)



## 2.104.8 (2022-09-29)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.3...@hpcc-js/common@2.71.4) (2022-09-29)



## 2.104.7 (2022-09-28)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.2...@hpcc-js/common@2.71.3) (2022-09-28)



## 2.104.6 (2022-09-21)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.1...@hpcc-js/common@2.71.2) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)



## 2.104.2 (2022-08-17)

**Note:** Version bump only for package @hpcc-js/common





## [2.71.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.71.0...@hpcc-js/common@2.71.1) (2022-08-17)



## 2.104.1 (2022-08-16)



# 2.104.0 (2022-07-26)

**Note:** Version bump only for package @hpcc-js/common





# [2.71.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.70.0...@hpcc-js/common@2.71.0) (2022-07-26)


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)





# [2.70.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.69.0...@hpcc-js/common@2.70.0) (2022-06-23)


### Features

*  Expose import csv/tsv ([ec30bcf](https://github.com/hpcc-systems/Visualization/commit/ec30bcfeae9db77c296ff56b5b604ca7a5c7f01b))



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)





# [2.69.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.68.1...@hpcc-js/common@2.69.0) (2022-04-27)


### Features

* **dgrid2:**  Add column formatting ([7a9db35](https://github.com/hpcc-systems/Visualization/commit/7a9db35fce57d94a4f3a58e88cebe1c10f2ab605))



## 2.103.1 (2022-04-20)





## [2.68.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.68.0...@hpcc-js/common@2.68.1) (2022-04-20)



# 2.103.0 (2022-04-07)

**Note:** Version bump only for package @hpcc-js/common





# [2.68.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.67.0...@hpcc-js/common@2.68.0) (2022-04-07)


### Features

* **fgrid:**  Add alternative to dgrid ([3a4841e](https://github.com/hpcc-systems/Visualization/commit/3a4841e7c6f898e0ff8bf0bfa55480c6ee5760d2))



## 2.102.11 (2022-03-24)





# [2.67.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.66.1...@hpcc-js/common@2.67.0) (2022-03-24)


### Features

* **Pie:**  Add support for set selection ([b9af982](https://github.com/hpcc-systems/Visualization/commit/b9af98205d758f2e405b035df91fc57d2de1f0be))



## 2.102.10 (2022-03-15)



## 2.102.9 (2022-03-15)



## 2.102.8 (2022-03-15)



## 2.102.7 (2022-03-14)



## 2.102.6 (2022-03-11)



## 2.102.5 (2022-03-11)



## 2.102.4 (2022-03-10)



## 2.102.3 (2022-03-10)



## 2.102.2 (2022-03-08)



## 2.102.1 (2022-03-08)





## [2.66.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.66.0...@hpcc-js/common@2.66.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/common





# [2.66.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.65.0...@hpcc-js/common@2.66.0) (2022-03-07)


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





# [2.65.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.65.0) (2022-02-23)



# 2.100.0 (2022-02-18)



# 2.99.0 (2022-02-10)



# 2.98.0 (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)


### Bug Fixes

* Drag end event has no stopPropagation ([8aed62d](https://github.com/hpcc-systems/Visualization/commit/8aed62d04d6a91d6cccddbec0655a7736b32c4e9))



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)


### Bug Fixes

*  textSize can leave remnants ([4624fee](https://github.com/hpcc-systems/Visualization/commit/4624fee4ee8c87512ebb47090050259a19ea43cf))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)






# [2.64.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.64.0) (2022-02-10)



# 2.98.0 (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)


### Bug Fixes

* Drag end event has no stopPropagation ([8aed62d](https://github.com/hpcc-systems/Visualization/commit/8aed62d04d6a91d6cccddbec0655a7736b32c4e9))



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)


### Bug Fixes

*  textSize can leave remnants ([4624fee](https://github.com/hpcc-systems/Visualization/commit/4624fee4ee8c87512ebb47090050259a19ea43cf))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)






# [2.63.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.63.0) (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)


### Bug Fixes

* Drag end event has no stopPropagation ([8aed62d](https://github.com/hpcc-systems/Visualization/commit/8aed62d04d6a91d6cccddbec0655a7736b32c4e9))



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)


### Bug Fixes

*  textSize can leave remnants ([4624fee](https://github.com/hpcc-systems/Visualization/commit/4624fee4ee8c87512ebb47090050259a19ea43cf))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)






# [2.62.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.62.0) (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)


### Bug Fixes

* Drag end event has no stopPropagation ([8aed62d](https://github.com/hpcc-systems/Visualization/commit/8aed62d04d6a91d6cccddbec0655a7736b32c4e9))



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)


### Bug Fixes

*  textSize can leave remnants ([4624fee](https://github.com/hpcc-systems/Visualization/commit/4624fee4ee8c87512ebb47090050259a19ea43cf))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.61.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.61.0) (2022-01-20)


### Bug Fixes

* Drag end event has no stopPropagation ([8aed62d](https://github.com/hpcc-systems/Visualization/commit/8aed62d04d6a91d6cccddbec0655a7736b32c4e9))



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)


### Bug Fixes

*  textSize can leave remnants ([4624fee](https://github.com/hpcc-systems/Visualization/commit/4624fee4ee8c87512ebb47090050259a19ea43cf))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)






# [2.60.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.60.0) (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)


### Bug Fixes

*  textSize can leave remnants ([4624fee](https://github.com/hpcc-systems/Visualization/commit/4624fee4ee8c87512ebb47090050259a19ea43cf))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.59.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.59.0) (2021-11-08)


### Bug Fixes

*  textSize can leave remnants ([4624fee](https://github.com/hpcc-systems/Visualization/commit/4624fee4ee8c87512ebb47090050259a19ea43cf))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)






# [2.58.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.58.0) (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.57.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.57.0) (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)






# [2.56.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.56.0) (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.55.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.55.0) (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.54.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.54.0) (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.53.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.53.0) (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.52.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.52.0) (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)






# [2.51.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.51.0) (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)






# [2.50.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.50.0) (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)






# [2.49.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.49.0) (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.48.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.48.0) (2021-04-06)


### Features

* TitleBar long titles are now truncated ([012b1e8](https://github.com/hpcc-systems/Visualization/commit/012b1e82f6253120236c52f210e06af13d9a8a01))



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.47.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.47.0) (2021-02-22)


### Bug Fixes

* **graph:**  Zoom to fit regression ([4c69a35](https://github.com/hpcc-systems/Visualization/commit/4c69a353fbee7f86dd55913b87995724dc65d35d)), closes [#3772](https://github.com/hpcc-systems/Visualization/issues/3772)



# 2.56.0 (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.46.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.46.0) (2021-02-19)


### Features

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



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.45.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.45.0) (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.44.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.44.0) (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



# 2.49.0 (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.43.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.43.0) (2020-11-10)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.42.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.42.0) (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.41.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.41.0) (2020-10-08)


### Features

* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.40.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.40.0) (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.39.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.39.0) (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.38.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.38.0) (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.37.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.37.0) (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.36.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.36.0) (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)






# [2.35.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.35.0) (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Manually mapped missing FA4 icons to FA5 ([c49ebd4](https://github.com/hpcc-systems/Visualization/commit/c49ebd41138c56d0369d426c99a812f962364289)), closes [#3607](https://github.com/hpcc-systems/Visualization/issues/3607) [#3611](https://github.com/hpcc-systems/Visualization/issues/3611)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.34.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.34.0) (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.33.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.33.0) (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.32.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.32.0) (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.31.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.31.0) (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.30.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.30.0) (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.29.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.29.0) (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.28.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.28.0) (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.27.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.27.0) (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.26.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.26.0) (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.25.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.25.0) (2020-05-12)


### Bug Fixes

* **lazyRender:** callback failing regression ([9a5fce7](https://github.com/hpcc-systems/Visualization/commit/9a5fce7e4d2f11f42492ccedd68d7ce0a7e2a1e2))



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.24.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.24.0) (2020-04-21)


### Bug Fixes

* **faChar:** Move font-family into "style" ([7ffa6c0](https://github.com/hpcc-systems/Visualization/commit/7ffa6c06ce2747134f365d94a4c1cb62ea2784c6))



## 2.15.9 (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





# [2.23.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.23.0) (2020-04-17)


### Bug Fixes

* **PropertyExt:** Legacy code - "super" getting called twice. ([a31120b](https://github.com/hpcc-systems/Visualization/commit/a31120bff44b5fcdba5f01379b4017011af50858))


### Features

* Add graph icon and text font family support ([1c7769c](https://github.com/hpcc-systems/Visualization/commit/1c7769cb5c29af4e948e08c6a0498a1c964db1c1)), closes [#3531](https://github.com/hpcc-systems/Visualization/issues/3531)
* lazyRender returns this ([042d50d](https://github.com/hpcc-systems/Visualization/commit/042d50d2747227c379982c1335ca9855ccc1917d)), closes [#3551](https://github.com/hpcc-systems/Visualization/issues/3551)



## 2.15.7 (2020-04-11)





## [2.22.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.22.5) (2020-04-11)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/common





## [2.22.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.22.4) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/common





## [2.22.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.2...@hpcc-js/common@2.22.3) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/common





## [2.22.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.1...@hpcc-js/common@2.22.2) (2020-04-03)


### Bug Fixes

* **TitleBar:**  Select had incorrect "selected" value. ([4d69b46](https://github.com/hpcc-systems/Visualization/commit/4d69b46e3c053173570145e6f26c0e2a92168426))





## [2.22.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.22.0...@hpcc-js/common@2.22.1) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/common





# [2.22.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.21.3...@hpcc-js/common@2.22.0) (2020-03-30)


### Features

* **observable-md:** Add new Observable Markdown Widget ([c015ad3](https://github.com/hpcc-systems/Visualization/commit/c015ad394b2b3945fdbcdcdf6a5ec72514f2a492))






## [2.21.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.21.2...@hpcc-js/common@2.21.3) (2020-03-20)

**Note:** Version bump only for package @hpcc-js/common





## [2.21.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.21.1...@hpcc-js/common@2.21.2) (2020-03-02)

**Note:** Version bump only for package @hpcc-js/common





## [2.21.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.21.0...@hpcc-js/common@2.21.1) (2020-01-23)


### Bug Fixes

* Add noDeserialize to computedFields ([5f1e10c](https://github.com/hpcc-systems/Visualization/commit/5f1e10c1dcbb1dc9b5ea95193d4a0eb87f68cab9))





# [2.21.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.20.1...@hpcc-js/common@2.21.0) (2020-01-22)


### Features

* **PP:** Support serialized classes + AutoExpand ([7afaefd](https://github.com/hpcc-systems/Visualization/commit/7afaefdc9a82208cee250c2eced98e69dae61204))





## [2.20.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.20.0...@hpcc-js/common@2.20.1) (2020-01-07)


### Bug Fixes

* **textColor:** Improve transparent/unknown background handling (assume its white) ([f690858](https://github.com/hpcc-systems/Visualization/commit/f690858f70cf2ded8a1e314c33f5a15a64af32cf))
* **textSize:** Cached value should be readonly ([b508834](https://github.com/hpcc-systems/Visualization/commit/b508834e41194ab8047c1f7973653ba876dd2e16))






# [2.20.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.19.3...@hpcc-js/common@2.20.0) (2019-12-11)


### Features

* **docs:** Add SummaryC.md ([7084ecc](https://github.com/hpcc-systems/Visualization/commit/7084ecc))





## [2.19.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.19.2...@hpcc-js/common@2.19.3) (2019-09-26)

**Note:** Version bump only for package @hpcc-js/common





## [2.19.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.19.1...@hpcc-js/common@2.19.2) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/common





## [2.19.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.19.0...@hpcc-js/common@2.19.1) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/common





# [2.19.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.18.2...@hpcc-js/common@2.19.0) (2019-08-13)


### Bug Fixes

* **dashy:** Improved Form support ([ddfe22e](https://github.com/hpcc-systems/Visualization/commit/ddfe22e)), closes [#3334](https://github.com/hpcc-systems/Visualization/issues/3334)


### Features

* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d681))





## [2.18.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.18.1...@hpcc-js/common@2.18.2) (2019-08-06)


### Bug Fixes

* **SVGWidget:** Incomplete feColorMatrix node can cause IE/Edge to crash ([39c1e6e](https://github.com/hpcc-systems/Visualization/commit/39c1e6e)), closes [#3347](https://github.com/hpcc-systems/Visualization/issues/3347)





## [2.18.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.18.0...@hpcc-js/common@2.18.1) (2019-08-01)


### Bug Fixes

* **widget:** Skip render if size is invalid ([b01c2d9](https://github.com/hpcc-systems/Visualization/commit/b01c2d9))





# [2.18.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.17.3...@hpcc-js/common@2.18.0) (2019-07-10)


### Features

* **map:** Add cluster circles layer ([686dd4c](https://github.com/hpcc-systems/Visualization/commit/686dd4c))
* **map:** Add polygon layer support to map and map-deck ([c74d082](https://github.com/hpcc-systems/Visualization/commit/c74d082))
* **SVGWidget:** Expose Blob Generation ([c4f4cb8](https://github.com/hpcc-systems/Visualization/commit/c4f4cb8))






## [2.17.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.17.2...@hpcc-js/common@2.17.3) (2019-07-03)

**Note:** Version bump only for package @hpcc-js/common





## [2.17.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.17.1...@hpcc-js/common@2.17.2) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/common





## [2.17.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.17.0...@hpcc-js/common@2.17.1) (2019-06-26)


### Bug Fixes

* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07))
* **style:** Ensure "px" exists for top/left ([40f6c5e](https://github.com/hpcc-systems/Visualization/commit/40f6c5e))






# [2.17.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.16.9...@hpcc-js/common@2.17.0) (2019-06-20)


### Bug Fixes

* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf3))


### Features

* **ChartPanel:** Download image includes legend (if visible) ([8c64922](https://github.com/hpcc-systems/Visualization/commit/8c64922)), closes [#3299](https://github.com/hpcc-systems/Visualization/issues/3299)
* **dashy:** Add dermatology upgrade script to ddl-shim ([72f2a46](https://github.com/hpcc-systems/Visualization/commit/72f2a46))





## [2.16.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.16.8...@hpcc-js/common@2.16.9) (2019-06-14)

**Note:** Version bump only for package @hpcc-js/common






## [2.16.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.16.7...@hpcc-js/common@2.16.8) (2019-05-16)


### Bug Fixes

* **Column:** Value labels not displaying correctly ([5f61050](https://github.com/hpcc-systems/Visualization/commit/5f61050)), closes [#3248](https://github.com/hpcc-systems/Visualization/issues/3248)






## [2.16.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.16.6...@hpcc-js/common@2.16.7) (2019-04-27)

**Note:** Version bump only for package @hpcc-js/common






## [2.16.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.16.2...@hpcc-js/common@2.16.6) (2019-04-06)



## [2.16.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.16.2...@hpcc-js/common@2.16.4) (2019-04-05)

**Note:** Version bump only for package @hpcc-js/common






## [2.16.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.16.2...@hpcc-js/common@2.16.3) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/common






## [2.16.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.16.1...@hpcc-js/common@2.16.2) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/common






## [2.16.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.14.0...@hpcc-js/common@2.16.1) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/common






# [2.16.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.12.1...@hpcc-js/common@2.16.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/common






# [2.15.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.12.1...@hpcc-js/common@2.15.0) (2019-04-01)

**Note:** Version bump only for package @hpcc-js/common






# [2.14.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.12.1...@hpcc-js/common@2.14.0) (2019-03-29)


### Bug Fixes

* **PropertyExt:** Incorrect hashSum calculation ([ec11938](https://github.com/hpcc-systems/Visualization/commit/ec11938)), closes [#3173](https://github.com/hpcc-systems/Visualization/issues/3173)


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))
* **SVGWidget:** Allow SVG Widgets to Scroll ([df283f9](https://github.com/hpcc-systems/Visualization/commit/df283f9))
* Add dataMeta to Widget.ts ([ce42a05](https://github.com/hpcc-systems/Visualization/commit/ce42a05)), closes [#3189](https://github.com/hpcc-systems/Visualization/issues/3189)
* **SVGWiget:** Add image download capability ([46f19dc](https://github.com/hpcc-systems/Visualization/commit/46f19dc)), closes [#3186](https://github.com/hpcc-systems/Visualization/issues/3186)






# [2.13.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.12.1...@hpcc-js/common@2.13.0) (2019-03-21)


### Bug Fixes

* **PropertyExt:** Incorrect hashSum calculation ([ec11938](https://github.com/hpcc-systems/Visualization/commit/ec11938)), closes [#3173](https://github.com/hpcc-systems/Visualization/issues/3173)


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))
* **SVGWidget:** Allow SVG Widgets to Scroll ([df283f9](https://github.com/hpcc-systems/Visualization/commit/df283f9))






## [2.12.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.12.0...@hpcc-js/common@2.12.1) (2019-03-06)

**Note:** Version bump only for package @hpcc-js/common






# [2.12.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.11.0...@hpcc-js/common@2.12.0) (2019-02-19)


### Bug Fixes

* **marshaller:** Add missing "flyout" capability ([1f75e11](https://github.com/hpcc-systems/Visualization/commit/1f75e11))
* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2))


### Features

* **readme:** Add packages/common/README.md ([65d6f5e](https://github.com/hpcc-systems/Visualization/commit/65d6f5e))






# [2.11.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.10.0...@hpcc-js/common@2.11.0) (2019-01-29)


### Bug Fixes

* **chart:** X-Axis focus hiding columns ([49f5d72](https://github.com/hpcc-systems/Visualization/commit/49f5d72))


### Features

* **readme:** Add README.md and samples for other ([51624b9](https://github.com/hpcc-systems/Visualization/commit/51624b9))






# [2.10.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.9.0...@hpcc-js/common@2.10.0) (2019-01-08)


### Bug Fixes

* **PropertyExt:** Hashsum fails with proxied properties ([6cb79f5](https://github.com/hpcc-systems/Visualization/commit/6cb79f5))
* **rowToObj:** Add guard to rowToObj ([cf6581a](https://github.com/hpcc-systems/Visualization/commit/cf6581a))


### Features

* **PropertyExt:** Add option to hide PP similar to disable ([b7d4340](https://github.com/hpcc-systems/Visualization/commit/b7d4340))
* **SimpleSelection:**  Return selection state on click ([591f4aa](https://github.com/hpcc-systems/Visualization/commit/591f4aa))






# [2.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.8.0...@hpcc-js/common@2.9.0) (2018-12-13)


### Bug Fixes

* **ddl:** Incorrect input/output lists in the DDL ([38ca0ac](https://github.com/hpcc-systems/Visualization/commit/38ca0ac))


### Features

* **dashy:** Enable XYAxis range selection ([ec96d97](https://github.com/hpcc-systems/Visualization/commit/ec96d97))






# [2.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.7.0...@hpcc-js/common@2.8.0) (2018-12-06)


### Bug Fixes

* **PropertyExt:** Hash sum is failing for PropertyArray ([3626cff](https://github.com/hpcc-systems/Visualization/commit/3626cff))


### Features

* **dashy:** Minor usability tweaks ([9531690](https://github.com/hpcc-systems/Visualization/commit/9531690))
* **titlebar:** Add description functionality ([fbb1d80](https://github.com/hpcc-systems/Visualization/commit/fbb1d80)), closes [#3030](https://github.com/hpcc-systems/Visualization/issues/3030)






# [2.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.6.1...@hpcc-js/common@2.7.0) (2018-12-04)


### Bug Fixes

* **TitleBar:** Tooltip not updatable ([8cf14d8](https://github.com/hpcc-systems/Visualization/commit/8cf14d8))
* **Widget:**  Classed could share object with all Widgets ([b0c89f0](https://github.com/hpcc-systems/Visualization/commit/b0c89f0))


### Features

* **PropertyEditor:**  Optionally highlight invalid properties ([7a2f86d](https://github.com/hpcc-systems/Visualization/commit/7a2f86d))






## [2.6.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.6.0...@hpcc-js/common@2.6.1) (2018-11-27)

**Note:** Version bump only for package @hpcc-js/common






<a name="2.6.0"></a>
# [2.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.5.0...@hpcc-js/common@2.6.0) (2018-11-26)


### Bug Fixes

* **PropertyExt:** Improved changed hashing ([ef05468](https://github.com/hpcc-systems/Visualization/commit/ef05468))


### Features

* **toolbar:** Add selection group ([d6849ae](https://github.com/hpcc-systems/Visualization/commit/d6849ae))





<a name="2.5.0"></a>
# [2.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.4.0...@hpcc-js/common@2.5.0) (2018-11-08)


### Features

* **toolbar:**  Allow consumer to disable toolbar buttons ([971cf74](https://github.com/hpcc-systems/Visualization/commit/971cf74))





<a name="2.4.0"></a>
# [2.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.3.0...@hpcc-js/common@2.4.0) (2018-10-30)


### Features

* **fachar:** Add generic click handling ([9c7a1c5](https://github.com/hpcc-systems/Visualization/commit/9c7a1c5)), closes [#2932](https://github.com/hpcc-systems/Visualization/issues/2932)
* **Graph:** Add option to clear selection on background click ([ccc72bf](https://github.com/hpcc-systems/Visualization/commit/ccc72bf))
* **Graph:** Add PP to change centroid colour ([c27c455](https://github.com/hpcc-systems/Visualization/commit/c27c455))
* **textbox:** Add fontSize ([0e10500](https://github.com/hpcc-systems/Visualization/commit/0e10500)), closes [#2934](https://github.com/hpcc-systems/Visualization/issues/2934)
* **Widget:** Enhanced classed call to match d3 v4 call signature. ([f7e9141](https://github.com/hpcc-systems/Visualization/commit/f7e9141)), closes [#2933](https://github.com/hpcc-systems/Visualization/issues/2933)





<a name="2.3.0"></a>
# [2.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.2.1...@hpcc-js/common@2.3.0) (2018-10-05)


### Bug Fixes

* Add scale to move within SVGWidget.ts ([7462e7c](https://github.com/hpcc-systems/Visualization/commit/7462e7c))


### Features

* Add 14 new ordinal color palettes ([178488f](https://github.com/hpcc-systems/Visualization/commit/178488f))
* Add randomized palette sample ([6c95c57](https://github.com/hpcc-systems/Visualization/commit/6c95c57)), closes [#2900](https://github.com/hpcc-systems/Visualization/issues/2900)





<a name="2.2.1"></a>
## [2.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.2.0...@hpcc-js/common@2.2.1) (2018-09-24)


### Bug Fixes

* **PropertyExt:** Hash function very slow ([d846a9e](https://github.com/hpcc-systems/Visualization/commit/d846a9e))





<a name="2.2.0"></a>
# [2.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.1.0...@hpcc-js/common@2.2.0) (2018-09-10)


### Features

* **Graph:** Additional color support ([679e6b5](https://github.com/hpcc-systems/Visualization/commit/679e6b5)), closes [#2845](https://github.com/hpcc-systems/Visualization/issues/2845) [#2829](https://github.com/hpcc-systems/Visualization/issues/2829)





<a name="2.1.0"></a>
# [2.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@2.0.0...@hpcc-js/common@2.1.0) (2018-09-01)


### Features

* **ChartPanel:**  Add API for toolbar buttons ([c87656b](https://github.com/hpcc-systems/Visualization/commit/c87656b)), closes [#2813](https://github.com/hpcc-systems/Visualization/issues/2813)
* **PP:** Allow SET to optionally support text + value ([fd22216](https://github.com/hpcc-systems/Visualization/commit/fd22216))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.9.4...@hpcc-js/common@2.0.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/common





<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.9.4...@hpcc-js/common@2.0.0-rc.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/common





<a name="0.9.4"></a>
## [0.9.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.9.3...@hpcc-js/common@0.9.4) (2018-08-23)


### Bug Fixes

* **timeline:** Revert to "nice" tick formats ([2835a92](https://github.com/hpcc-systems/Visualization/commit/2835a92))




<a name="0.9.3"></a>
## [0.9.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.9.2...@hpcc-js/common@0.9.3) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.9.2"></a>
## [0.9.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.9.1...@hpcc-js/common@0.9.2) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.9.1"></a>
## [0.9.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.9.0...@hpcc-js/common@0.9.1) (2018-08-10)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.9.0"></a>
# [0.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.10...@hpcc-js/common@0.9.0) (2018-08-02)


### Bug Fixes

* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ad))
* **eclwatch:** Hide canvas text Calculator ([4ed9631](https://github.com/hpcc-systems/Visualization/commit/4ed9631))


### Features

* **SVGZoomWidget:** Additional zoomTo methods ([09feedc](https://github.com/hpcc-systems/Visualization/commit/09feedc))
* **timeline:** Improved icon handling ([25819ba](https://github.com/hpcc-systems/Visualization/commit/25819ba))
* **timeline:** Various improvements to MiniGantt ([3a7375d](https://github.com/hpcc-systems/Visualization/commit/3a7375d)), closes [#2585](https://github.com/hpcc-systems/Visualization/issues/2585) [#2584](https://github.com/hpcc-systems/Visualization/issues/2584) [#2583](https://github.com/hpcc-systems/Visualization/issues/2583)




<a name="0.8.10"></a>
## [0.8.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.9...@hpcc-js/common@0.8.10) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.8.9"></a>
## [0.8.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.8...@hpcc-js/common@0.8.9) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.8.8"></a>
## [0.8.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.7...@hpcc-js/common@0.8.8) (2018-07-29)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.8.7"></a>
## [0.8.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.6...@hpcc-js/common@0.8.7) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.8.6"></a>
## [0.8.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.5...@hpcc-js/common@0.8.6) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.8.5"></a>
## [0.8.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.4...@hpcc-js/common@0.8.5) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.8.4"></a>
## [0.8.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.3...@hpcc-js/common@0.8.4) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.8.3"></a>
## [0.8.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.2...@hpcc-js/common@0.8.3) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.8.2"></a>
## [0.8.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.1...@hpcc-js/common@0.8.2) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.8.1"></a>
## [0.8.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.8.0...@hpcc-js/common@0.8.1) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.8.0"></a>
# [0.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.7.1...@hpcc-js/common@0.8.0) (2018-07-27)


### Bug Fixes

* **icon:** Remove pointer-events from icon text ([eea86f1](https://github.com/hpcc-systems/Visualization/commit/eea86f1)), closes [#2702](https://github.com/hpcc-systems/Visualization/issues/2702)
* **timeline:** Calc EntityPin height ([1fd4ea3](https://github.com/hpcc-systems/Visualization/commit/1fd4ea3))


### Features

* Add Collapsed publish param tag ([4b65e73](https://github.com/hpcc-systems/Visualization/commit/4b65e73))




<a name="0.7.1"></a>
## [0.7.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.7.0...@hpcc-js/common@0.7.1) (2018-06-28)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.7.0"></a>
# [0.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.6.2...@hpcc-js/common@0.7.0) (2018-06-22)


### Features

* **EntityRect:** Add EntityRect and EntityRectList ([34cceb3](https://github.com/hpcc-systems/Visualization/commit/34cceb3))




<a name="0.6.2"></a>
## [0.6.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.6.1...@hpcc-js/common@0.6.2) (2018-06-20)


### Bug Fixes

* Widget flattenData now allows falsey values ([c71b3c3](https://github.com/hpcc-systems/Visualization/commit/c71b3c3)), closes [#2647](https://github.com/hpcc-systems/Visualization/issues/2647)
* **database.field:** Missing valid method ([0d8f02e](https://github.com/hpcc-systems/Visualization/commit/0d8f02e))




<a name="0.6.1"></a>
## [0.6.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.6.0...@hpcc-js/common@0.6.1) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.6.0"></a>
# [0.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.5.0...@hpcc-js/common@0.6.0) (2018-06-19)


### Bug Fixes

* Icon bar buttons should not cause navigation ([3cd7081](https://github.com/hpcc-systems/Visualization/commit/3cd7081))
* textSize should work with coerced strings ([cfab0cd](https://github.com/hpcc-systems/Visualization/commit/cfab0cd))


### Features

* Add lite serialize/deserialize ([799fa5f](https://github.com/hpcc-systems/Visualization/commit/799fa5f))
* Simplify Pie labels ([8506b4d](https://github.com/hpcc-systems/Visualization/commit/8506b4d))
* **chart:** Support runtime colour calculations ([18ceed4](https://github.com/hpcc-systems/Visualization/commit/18ceed4))
* **dashy:** Add [@hpcc-js](https://github.com/hpcc-js)/chart input mapping meta ([fb9e523](https://github.com/hpcc-systems/Visualization/commit/fb9e523))
* **Table:** Add cell formatting ([aa067d3](https://github.com/hpcc-systems/Visualization/commit/aa067d3))
* **timeline:** Add EntityPin to timeline ([bab1b06](https://github.com/hpcc-systems/Visualization/commit/bab1b06))




<a name="0.5.0"></a>
# [0.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.4.0...@hpcc-js/common@0.5.0) (2018-06-15)


### Features

* **chart:** Support runtime colour calculations ([820ff4f](https://github.com/hpcc-systems/Visualization/commit/820ff4f))




<a name="0.4.0"></a>
# [0.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.3.0...@hpcc-js/common@0.4.0) (2018-06-14)


### Features

* **timeline:** Add EntityPin to timeline ([25ce344](https://github.com/hpcc-systems/Visualization/commit/25ce344))




<a name="0.3.0"></a>
# [0.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.2.1...@hpcc-js/common@0.3.0) (2018-06-01)


### Bug Fixes

* Optimize getBBox calls ([5114bb2](https://github.com/hpcc-systems/Visualization/commit/5114bb2)), closes [#2567](https://github.com/hpcc-systems/Visualization/issues/2567)


### Features

* **entity:** Adds Entity, EntityCard, EntityPin, EntityVertexSigned-off-by: Jaman <jbrundage372@gmail.com> ([1f73572](https://github.com/hpcc-systems/Visualization/commit/1f73572))




<a name="0.2.1"></a>
## [0.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.2.0...@hpcc-js/common@0.2.1) (2018-05-28)




**Note:** Version bump only for package @hpcc-js/common

<a name="0.2.0"></a>
# [0.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.1.0...@hpcc-js/common@0.2.0) (2018-05-21)


### Bug Fixes

* TextBox text colour could be hard to read ([bb15dcc](https://github.com/hpcc-systems/Visualization/commit/bb15dcc))


### Features

*  Add ability to get a normalized array of WUDetail scopes ([752ada0](https://github.com/hpcc-systems/Visualization/commit/752ada0))




<a name="0.1.0"></a>
# [0.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/common@0.0.77...@hpcc-js/common@0.1.0) (2018-05-16)


### Bug Fixes

*  Widget.LazyRender Broken ([c34d901](https://github.com/hpcc-systems/Visualization/commit/c34d901)), closes [#2546](https://github.com/hpcc-systems/Visualization/issues/2546)


### Features

* Add CSV/TSV Support to databomb datasource ([fd96de0](https://github.com/hpcc-systems/Visualization/commit/fd96de0)), closes [#2564](https://github.com/hpcc-systems/Visualization/issues/2564)
* Add GMap US Counties ([12bae45](https://github.com/hpcc-systems/Visualization/commit/12bae45)), closes [#2554](https://github.com/hpcc-systems/Visualization/issues/2554)
* Graph support in the marshaller ([bcc2290](https://github.com/hpcc-systems/Visualization/commit/bcc2290)), closes [#2559](https://github.com/hpcc-systems/Visualization/issues/2559)
* Prevent Render when hidden ([1499c68](https://github.com/hpcc-systems/Visualization/commit/1499c68)), closes [#2547](https://github.com/hpcc-systems/Visualization/issues/2547)
