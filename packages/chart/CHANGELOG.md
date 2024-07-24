# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.84.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.84.0...@hpcc-js/chart@2.84.1) (2024-07-24)


### Bug Fixes

* Tidy up StatChart to be more consistent ([fe6d47f](https://github.com/hpcc-systems/Visualization/commit/fe6d47f1d045fec4eb12163a2784dccd62f020af))



# 2.106.0 (2024-07-23)





# 2.84.0 (2024-07-23)


### Bug Fixes

*  Don't relocate text in "Stacked" mode. ([2944a96](https://github.com/hpcc-systems/Visualization/commit/2944a964d2ec23306a41a77d51de511503e3649d))
*  Don't relocate text in "Stacked" mode. ([344179e](https://github.com/hpcc-systems/Visualization/commit/344179e00362aa45b7f1934bda84dfa65cb1bee6))
*  Merge conflict ([241e861](https://github.com/hpcc-systems/Visualization/commit/241e86168384df952f5e0e9d8b3c3ec8157f0288))
*  Mixins not working within a ES6 environment ([7fe772a](https://github.com/hpcc-systems/Visualization/commit/7fe772ae2037f2bbd932cf6fb4c1d6eecc75b698))
* Add standard click events to RadialBar.ts ([4fc0162](https://github.com/hpcc-systems/Visualization/commit/4fc0162cbff25ebf5ac9185272043d43fc9233a0)), closes [#2863](https://github.com/hpcc-systems/Visualization/issues/2863)
* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)
* **axis:** Axis text not displaying ([23f4951](https://github.com/hpcc-systems/Visualization/commit/23f49514466e17929d9ea8df22292e1da90a3ef1)), closes [#2753](https://github.com/hpcc-systems/Visualization/issues/2753)
* **Axis:** Edge case when only one data point is present ([0e559dc](https://github.com/hpcc-systems/Visualization/commit/0e559dcad8adc563098e4f46efcdf012f6fba7e4))
* **axis:** Remove svgLine getBBox call ([2d0f548](https://github.com/hpcc-systems/Visualization/commit/2d0f548f29ae02cfbb28d8062dd3816628ae7099)), closes [#2705](https://github.com/hpcc-systems/Visualization/issues/2705)
* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)
* Better bubble text clipping ([98fe1ff](https://github.com/hpcc-systems/Visualization/commit/98fe1fff81ed8f51b588743600f5e5a46063e222))
* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f8273e454c4b103e0ed1965c18542f125482))
* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07379e59081c930d61485764e78c8a07a90))
* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf369d6d4081f0f5d9285bf3b1fd9b5b5999))
* Changed d3 style use to v4+ format ([f79f272](https://github.com/hpcc-systems/Visualization/commit/f79f272b0924b73deb7cc33042a6db8dd904faa4)), closes [#3250](https://github.com/hpcc-systems/Visualization/issues/3250)
* **chart:** Corrected pointShapeColumn use condition ([065af16](https://github.com/hpcc-systems/Visualization/commit/065af1648031434bc4d5c8e442f37a3432d692dd)), closes [#3225](https://github.com/hpcc-systems/Visualization/issues/3225)
* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))
* **chart:** Remove dependency on Google font ([27db490](https://github.com/hpcc-systems/Visualization/commit/27db4909069e443f79d44ef20d1d0cbce3a1de1c))
* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)
* **chart:** X-Axis focus hiding columns ([49f5d72](https://github.com/hpcc-systems/Visualization/commit/49f5d72c1e9d6ea208c5277aebe20b34d5382123))
* **chart:** XYAxis rendering issue when top/right text extends beyond the axis line ([c6cabb9](https://github.com/hpcc-systems/Visualization/commit/c6cabb90e223fc7310e6f43eba748d0f199a9a07)), closes [#3126](https://github.com/hpcc-systems/Visualization/issues/3126)
* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)
* **column:** Correctly adjusts valueText position ([269399e](https://github.com/hpcc-systems/Visualization/commit/269399eab6059ca926f75b3b5410406a35d2e085)), closes [#3140](https://github.com/hpcc-systems/Visualization/issues/3140)
* **Column:** Value labels not displaying correctly ([5f61050](https://github.com/hpcc-systems/Visualization/commit/5f61050ee3cf6976ace44f63ca0522cf66d7616c)), closes [#3248](https://github.com/hpcc-systems/Visualization/issues/3248)
* **comms:** rejectUnauthorized does nothing in NodeJS ([38f793d](https://github.com/hpcc-systems/Visualization/commit/38f793d5ccd9a40078b1df36c799e6300153b8c3))
* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ada4d7aad0ffe9ea5cf004b49ccec6710de))
* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)
* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2c956601f3b4740917c4c35896f7f6c1c4))
* **HexBin:** Classic closure bug with "data" ([0daeaac](https://github.com/hpcc-systems/Visualization/commit/0daeaac455b18e98bef3e5e33794b06ae4e4505f)), closes [#2871](https://github.com/hpcc-systems/Visualization/issues/2871)
* **hexbin:** Tooltip missing label and series information ([a38805a](https://github.com/hpcc-systems/Visualization/commit/a38805a74d5dd4d80723f6707949c01dd1d75d2e))
* **line:** Use proper colors to match legend ([a5d7543](https://github.com/hpcc-systems/Visualization/commit/a5d7543862e0d0a932039857a7350aef994329e9)), closes [#2957](https://github.com/hpcc-systems/Visualization/issues/2957)
* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)
* **pie:** Conditionally center on labels ([9251699](https://github.com/hpcc-systems/Visualization/commit/9251699692ea7e49532e478f4fbadee8b7223875)), closes [#3301](https://github.com/hpcc-systems/Visualization/issues/3301)
* **pie:** Pie centerOnLabels limited by radius ([7406091](https://github.com/hpcc-systems/Visualization/commit/7406091fd0de60ee52ec76c9363908d05ead9f3a)), closes [#3175](https://github.com/hpcc-systems/Visualization/issues/3175)
* **scatter:** Add darken properties to Scatter ([4c4c880](https://github.com/hpcc-systems/Visualization/commit/4c4c88024a2c7848d7575985027d6f57470d945f)), closes [#3078](https://github.com/hpcc-systems/Visualization/issues/3078)
* TextBox text colour could be hard to read ([bb15dcc](https://github.com/hpcc-systems/Visualization/commit/bb15dcc3ee1b6250394467c54e6275828633bdd1))
* **tooltip:** Add SVGElement to end of show args ([fea34a2](https://github.com/hpcc-systems/Visualization/commit/fea34a2d7774812bbb5f2cd9a8066904386d7031)), closes [#2703](https://github.com/hpcc-systems/Visualization/issues/2703)
* **tooltip:** Workaround FF issue with getScreenCTM ([6978cfb](https://github.com/hpcc-systems/Visualization/commit/6978cfb80a2fd8608d02cb1d3635fdf6083bc242)), closes [#2743](https://github.com/hpcc-systems/Visualization/issues/2743)
* Tweak sources to ensure compatibility with Angular 6 ([6b21f2e](https://github.com/hpcc-systems/Visualization/commit/6b21f2e0aab8a5ccad22486bafbbb25f1d15e10c))
* valueCendered now works with Bar.ts ([5ba31ed](https://github.com/hpcc-systems/Visualization/commit/5ba31ed41af385cf5bac38e94525223fff61cd97)), closes [#2911](https://github.com/hpcc-systems/Visualization/issues/2911)
* **WordCloud:** Click event did not include entire row. ([a81117f](https://github.com/hpcc-systems/Visualization/commit/a81117f45d261bb9f459c1ea575cb801b4cc2fb3))
* **xyaxis:** Corrected calcMargin logic ([643b320](https://github.com/hpcc-systems/Visualization/commit/643b320e7a9a9406d5cf9c4dddc08647f85035bd)), closes [#3133](https://github.com/hpcc-systems/Visualization/issues/3133)


### Features

*  Add ability to get a normalized array of WUDetail scopes ([752ada0](https://github.com/hpcc-systems/Visualization/commit/752ada0bc011dafc63c5bba4df130cee51a9c38d))
*  Add maxWeight to Heat chart ([59ee802](https://github.com/hpcc-systems/Visualization/commit/59ee80246e45fa5464f6fed4ed7f488ee3fca0cb))
*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))
*  Add showDomainTotal to Column Chart ([c7de54a](https://github.com/hpcc-systems/Visualization/commit/c7de54a0276782aa8fc0df99f297ff771b047861))
* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add 2d selection to XYAxis ([3d13227](https://github.com/hpcc-systems/Visualization/commit/3d13227246741e1a357a52efdf3d79fd8b7bd9b7))
* Add Axis Padding ([a38074e](https://github.com/hpcc-systems/Visualization/commit/a38074e55980d9ec129157359025a54c8b42446d))
* Add BubbleXY ([5c61c39](https://github.com/hpcc-systems/Visualization/commit/5c61c3907204c2a6c8e688b593b0165d21c517fe))
* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))
* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)
* Add dataMeta to Widget.ts ([ce42a05](https://github.com/hpcc-systems/Visualization/commit/ce42a05aa7e92ee30e5695b7c003af79738b2b83)), closes [#3189](https://github.com/hpcc-systems/Visualization/issues/3189)
* Add font size parameters to Summary and SummaryC ([96dd115](https://github.com/hpcc-systems/Visualization/commit/96dd115ca2e56306d28d454136674431995f9410)), closes [#2617](https://github.com/hpcc-systems/Visualization/issues/2617)
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)
* Add HalfDonut and QuarterDonut widgets ([ca0f80c](https://github.com/hpcc-systems/Visualization/commit/ca0f80c2ea145014ae35229423fb8e95147e3fcc)), closes [#2889](https://github.com/hpcc-systems/Visualization/issues/2889)
* Add orientation to QuartileCandlestick.ts ([64697bd](https://github.com/hpcc-systems/Visualization/commit/64697bd92ca248de97bdfddbf242a8204b520f60)), closes [#3188](https://github.com/hpcc-systems/Visualization/issues/3188)
* Add pie series percentages ([cc2493f](https://github.com/hpcc-systems/Visualization/commit/cc2493ff4eab18cc13dee620ec9756e4c8ae3d84)), closes [#2888](https://github.com/hpcc-systems/Visualization/issues/2888)
* Add showLabels to Pie.ts ([04a946c](https://github.com/hpcc-systems/Visualization/commit/04a946c1640d7589e140678682aff829a454f7df)), closes [#3292](https://github.com/hpcc-systems/Visualization/issues/3292)
* Add two publish params to chart_Summary ([4a58c56](https://github.com/hpcc-systems/Visualization/commit/4a58c56c432f53dba3eb3691172cac7c94ba05d2))
* Add value display options for XYAxis etc ([6cd35ea](https://github.com/hpcc-systems/Visualization/commit/6cd35eaefb8996ce4e3daed132e17bf13056e9ae)), closes [#2890](https://github.com/hpcc-systems/Visualization/issues/2890) [#2707](https://github.com/hpcc-systems/Visualization/issues/2707)
* Add value text to Column/Bar chart ([62c62b7](https://github.com/hpcc-systems/Visualization/commit/62c62b79c0ed2672189d380d8d2be81862636d1b)), closes [#2553](https://github.com/hpcc-systems/Visualization/issues/2553)
* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))
* Adjust position of cutoff values ([f4e2284](https://github.com/hpcc-systems/Visualization/commit/f4e22848e1c360f312ce0845b84ae30a45c4ba1d)), closes [#2912](https://github.com/hpcc-systems/Visualization/issues/2912)
* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))
* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))
* **chart:** Add QuartileCandlestick.ts ([0ba17ab](https://github.com/hpcc-systems/Visualization/commit/0ba17ab3b1487259fc0bfa7e1b21a64c044270d6))
* **chart:** Add RadialBar chart ([58db845](https://github.com/hpcc-systems/Visualization/commit/58db84553cb5e9c8fdf7168eb01d745e0cebf430))
* **chart:** Add StatChart ([0ce8483](https://github.com/hpcc-systems/Visualization/commit/0ce848388075d6effaa4ccc3dfa60c0ca2bd432d)), closes [#3477](https://github.com/hpcc-systems/Visualization/issues/3477)
* **chart:** Support runtime colour calculations ([820ff4f](https://github.com/hpcc-systems/Visualization/commit/820ff4f582b05a1e5f8157b106c22514340fe6e4))
* **chart:** Support runtime colour calculations ([18ceed4](https://github.com/hpcc-systems/Visualization/commit/18ceed47347e4971d1d7cdcad4d426ce4dcf010a))
* **column:** Add inner/outer padding for column/ordinal charts ([6011435](https://github.com/hpcc-systems/Visualization/commit/60114352c2373cef180e2e0d0369c66075541755))
* **column:** Add option to show percent values ([1bee061](https://github.com/hpcc-systems/Visualization/commit/1bee06111216103f481ee719ee3733204851483d)), closes [#2969](https://github.com/hpcc-systems/Visualization/issues/2969)
* **dashy:** Add @hpcc-js/chart input mapping meta ([fb9e523](https://github.com/hpcc-systems/Visualization/commit/fb9e523308675cd26698cdbc151be62c594ba004))
* **dashy:** Enable XYAxis range selection ([ec96d97](https://github.com/hpcc-systems/Visualization/commit/ec96d97d74818022b21f29919983c320957db78e))
* **dgrid2:**  Add column formatting ([7a9db35](https://github.com/hpcc-systems/Visualization/commit/7a9db35fce57d94a4f3a58e88cebe1c10f2ab605))
* **docs:** Add 6 chart md files with verbiage ([bdd7274](https://github.com/hpcc-systems/Visualization/commit/bdd727403e16d7f195ac2313644afe955c845062))
* **docs:** Add Bubble.md ([9067dfb](https://github.com/hpcc-systems/Visualization/commit/9067dfb5352a2bd6e32a9e41f1ca5b9ef2fca299))
* **docs:** Add Bullet md ([9ea81bf](https://github.com/hpcc-systems/Visualization/commit/9ea81bffe239b0803e122c04ecbccdd7b672bb91))
* **docs:** Add Contour and HexBin ([b146f3b](https://github.com/hpcc-systems/Visualization/commit/b146f3bde702d6e45de3cd346bed7cde57d593fe))
* **docs:** Add Gantt.md ([0c77392](https://github.com/hpcc-systems/Visualization/commit/0c77392fb3810f3ce9042c03d8f119138b4c6965))
* **docs:** Add Gauge.md ([c76174e](https://github.com/hpcc-systems/Visualization/commit/c76174ec791106593062a848ec36d34e3d79b4f6))
* **docs:** Add Line.md, Scatter.md and Step.md ([9cf2d5e](https://github.com/hpcc-systems/Visualization/commit/9cf2d5ea66001ec04d7dd0380c76ecf739d98be1))
* **docs:** Add QuartileCandlestick md ([11d7f7f](https://github.com/hpcc-systems/Visualization/commit/11d7f7f9e5e62b00dbebfc6f799567a03662af2b))
* **docs:** Add Radar.md ([fc43adb](https://github.com/hpcc-systems/Visualization/commit/fc43adb4e1eccaec843f6fe0c4c5b0c38b3e1e8c))
* **docs:** Add RadialBar.md ([e157c9b](https://github.com/hpcc-systems/Visualization/commit/e157c9b21a57af89782190948f97c7422699718d))
* **docs:** Add Summary.md ([#3435](https://github.com/hpcc-systems/Visualization/issues/3435)) ([6970c88](https://github.com/hpcc-systems/Visualization/commit/6970c88d10cf92b12c84a394972a404cc1d7f1ac))
* **docs:** Add SummaryC.md ([7084ecc](https://github.com/hpcc-systems/Visualization/commit/7084ecc82597d18e33e867e14bdbb1f215215584))
* **docs:** Add WordCloud.md ([48d3e31](https://github.com/hpcc-systems/Visualization/commit/48d3e31da1125f7f8c16099b1c814ee69e89fb68))
* **docs:** Add XYAxis.md ([8bf86b7](https://github.com/hpcc-systems/Visualization/commit/8bf86b7bccc2341aee5cfb006ac3a582da363aa0))
* **docs:** First cut at new documentation / landing page ([ffa1583](https://github.com/hpcc-systems/Visualization/commit/ffa158328625d53280afab654fd88c9e515a265b))
* **fgrid:**  Add alternative to dgrid ([3a4841e](https://github.com/hpcc-systems/Visualization/commit/3a4841e7c6f898e0ff8bf0bfa55480c6ee5760d2))
* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d6819c6fd166f74e7385446dd477e8a1cdd01))
* **Gauge:** Add "click" event for entire Gauge ([3674f9e](https://github.com/hpcc-systems/Visualization/commit/3674f9e841dae5af23650481d9e7696ff8c64d2c))
* **Gauge:** Emphasis gauge is "clickable" ([6ff744d](https://github.com/hpcc-systems/Visualization/commit/6ff744db621497a1c74c39de911add7f310ddf36))
* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))
* **HexBin:** Add selection support ([c5591c3](https://github.com/hpcc-systems/Visualization/commit/c5591c38eabf13d33267f7f559b70d95bb5b7b98))
* **hexbin:** Add tooltip to HexBin.ts ([60f40d9](https://github.com/hpcc-systems/Visualization/commit/60f40d90ea2a2241b208d50bf94d0a33bd11e3e9))
* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))
* **legend:** Add legend for HexBin and Contour ([21a2ee8](https://github.com/hpcc-systems/Visualization/commit/21a2ee8c7152c9310d881f8e3f651416639638c1))
* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfacc1b162f1a5d02b06d434375424b7d225f))
* **Pie:**  Add support for set selection ([b9af982](https://github.com/hpcc-systems/Visualization/commit/b9af98205d758f2e405b035df91fc57d2de1f0be))
* **pie:** Add selectByLabel ([b1ca48c](https://github.com/hpcc-systems/Visualization/commit/b1ca48c98a30358bdb206e46703e8fc846d23973))
* **pie:** Add showSeriesValue to Pie ([87fbb89](https://github.com/hpcc-systems/Visualization/commit/87fbb89827f677cd38e4457282c1c6c143698735)), closes [#3156](https://github.com/hpcc-systems/Visualization/issues/3156)
* **pie:** Added showPercentageDecimals to Pie ([a6108a8](https://github.com/hpcc-systems/Visualization/commit/a6108a86718f957a758632029b7f0a340a2743ce)), closes [#3077](https://github.com/hpcc-systems/Visualization/issues/3077)
* **pie:** Better pie label positioning ([f2fa36c](https://github.com/hpcc-systems/Visualization/commit/f2fa36c4ed133f347b10e3500bcbd398508a354d)), closes [#2994](https://github.com/hpcc-systems/Visualization/issues/2994) [#2956](https://github.com/hpcc-systems/Visualization/issues/2956)
* **Radar:** Adds Radar widget Signed-off-by: Jaman <jbrundage372@gmail.com> ([4d0bd10](https://github.com/hpcc-systems/Visualization/commit/4d0bd10a99a02c3d10044bd061781f0f7b26bff6))
* **Radar:** Adds Radar widget Signed-off-by: Jaman <jbrundage372@gmail.com> ([a6c73ed](https://github.com/hpcc-systems/Visualization/commit/a6c73edfc9869958366a11563bb9c01851496ae7))
* **readme:** Add README.md for chart package ([2681ca0](https://github.com/hpcc-systems/Visualization/commit/2681ca01e423c37a456192c1671ad2905c59fc26))
* remove Column string format rounding ([7876e56](https://github.com/hpcc-systems/Visualization/commit/7876e56e900a7595e63da446469185b727dca700))
* Simplify Pie labels ([8506b4d](https://github.com/hpcc-systems/Visualization/commit/8506b4db8f0745777ca19bc8d90255714a32c5a5))
* **SVGWidget:** Allow SVG Widgets to Scroll ([df283f9](https://github.com/hpcc-systems/Visualization/commit/df283f9cd4866134c53d91603310aee0a8a1eef8))
* Value/label/icon anchoring in SummaryC.ts ([1161678](https://github.com/hpcc-systems/Visualization/commit/1161678e55a750b8f3175ae34ac94eccd459b0db))
* **website:** Add Tutorial Docs ([3721b7b](https://github.com/hpcc-systems/Visualization/commit/3721b7bfbc183ca9172b05d31205dbf9d8345733))
* **Widget:** Enhanced classed call to match d3 v4 call signature. ([f7e9141](https://github.com/hpcc-systems/Visualization/commit/f7e91418ff4a7660c2713f4635e2852765dd6497)), closes [#2933](https://github.com/hpcc-systems/Visualization/issues/2933)
* **xyaxis:** Add xAxisTitle support to XYAxis.ts ([54cc9ba](https://github.com/hpcc-systems/Visualization/commit/54cc9ba238bcc5a59e44d6d9e293d9c8c79d15e7)), closes [#3191](https://github.com/hpcc-systems/Visualization/issues/3191)
* **XYAxis:** Expose axis ticks methods ([6d40e1a](https://github.com/hpcc-systems/Visualization/commit/6d40e1a8f987ac3c13ffead2de087d8b990a5612))


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))
* Revert "chore: Rework shim inclusion" ([462d55c](https://github.com/hpcc-systems/Visualization/commit/462d55c0b89cb74c6f2aacc29ccafebaf5a2c46c))






## [2.83.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.83.3...@hpcc-js/chart@2.83.4) (2024-07-02)



## 2.105.11 (2024-06-25)



## 2.105.10 (2024-06-19)



## 2.105.9 (2024-05-24)

**Note:** Version bump only for package @hpcc-js/chart





## [2.83.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.83.2...@hpcc-js/chart@2.83.3) (2024-05-24)



## 2.105.8 (2024-04-24)



## 2.105.7 (2024-04-22)



## 2.105.6 (2024-04-17)

**Note:** Version bump only for package @hpcc-js/chart





## [2.83.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.83.1...@hpcc-js/chart@2.83.2) (2024-04-17)



## 2.105.5 (2024-03-28)



## 2.105.4 (2024-03-21)



## 2.105.3 (2024-03-19)



## 2.105.2 (2024-03-15)

**Note:** Version bump only for package @hpcc-js/chart





## [2.83.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.83.0...@hpcc-js/chart@2.83.1) (2024-03-15)


### Bug Fixes

*  Merge conflict ([241e861](https://github.com/hpcc-systems/Visualization/commit/241e86168384df952f5e0e9d8b3c3ec8157f0288))



## 2.105.1 (2024-03-15)





# [2.83.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.82.0...@hpcc-js/chart@2.83.0) (2024-03-15)


### Bug Fixes

*  Don't relocate text in "Stacked" mode. ([2944a96](https://github.com/hpcc-systems/Visualization/commit/2944a964d2ec23306a41a77d51de511503e3649d))


### Features

* Add Axis Padding ([a38074e](https://github.com/hpcc-systems/Visualization/commit/a38074e55980d9ec129157359025a54c8b42446d))



# 2.105.0 (2024-03-08)





# [2.82.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.10...@hpcc-js/chart@2.82.0) (2024-03-08)


### Bug Fixes

*  Don't relocate text in "Stacked" mode. ([344179e](https://github.com/hpcc-systems/Visualization/commit/344179e00362aa45b7f1934bda84dfa65cb1bee6))


### Features

*  Add showDomainTotal to Column Chart ([c7de54a](https://github.com/hpcc-systems/Visualization/commit/c7de54a0276782aa8fc0df99f297ff771b047861))



## 2.104.42 (2024-02-28)



## 2.104.41 (2024-02-16)



## 2.104.40 (2024-02-15)



## 2.104.39 (2024-02-06)



## 2.104.38 (2024-02-06)



## 2.104.37 (2024-01-25)





## [2.81.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.9...@hpcc-js/chart@2.81.10) (2024-01-25)



## 2.104.36 (2024-01-23)



## 2.104.35 (2024-01-18)

**Note:** Version bump only for package @hpcc-js/chart





## [2.81.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.8...@hpcc-js/chart@2.81.9) (2024-01-18)



## 2.104.34 (2024-01-02)



## 2.104.33 (2023-11-16)



## 2.104.32 (2023-11-09)

**Note:** Version bump only for package @hpcc-js/chart






## [2.81.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.7...@hpcc-js/chart@2.81.8) (2023-11-09)



## 2.104.31 (2023-11-03)



## 2.104.30 (2023-10-26)

**Note:** Version bump only for package @hpcc-js/chart






## [2.81.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.6...@hpcc-js/chart@2.81.7) (2023-10-26)



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/chart





## [2.81.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.5...@hpcc-js/chart@2.81.6) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/chart





## [2.81.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.4...@hpcc-js/chart@2.81.5) (2023-09-14)



## 2.104.25 (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)

**Note:** Version bump only for package @hpcc-js/chart





## [2.81.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.3...@hpcc-js/chart@2.81.4) (2023-06-08)



## 2.104.19 (2023-03-14)



## 2.104.18 (2023-02-22)

**Note:** Version bump only for package @hpcc-js/chart





## [2.81.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.2...@hpcc-js/chart@2.81.3) (2023-02-22)



## 2.104.17 (2023-01-20)



## 2.104.16 (2023-01-19)



## 2.104.15 (2022-11-15)



## 2.104.14 (2022-11-11)

**Note:** Version bump only for package @hpcc-js/chart





## [2.81.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.1...@hpcc-js/chart@2.81.2) (2022-11-11)



## 2.104.13 (2022-11-09)

**Note:** Version bump only for package @hpcc-js/chart






## [2.81.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.81.0...@hpcc-js/chart@2.81.1) (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)

**Note:** Version bump only for package @hpcc-js/chart






# [2.81.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.80.4...@hpcc-js/chart@2.81.0) (2022-10-11)


### Features

* remove Column string format rounding ([7876e56](https://github.com/hpcc-systems/Visualization/commit/7876e56e900a7595e63da446469185b727dca700))



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)



## 2.104.8 (2022-09-29)





## [2.80.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.80.3...@hpcc-js/chart@2.80.4) (2022-09-29)



## 2.104.7 (2022-09-28)

**Note:** Version bump only for package @hpcc-js/chart





## [2.80.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.80.2...@hpcc-js/chart@2.80.3) (2022-09-28)



## 2.104.6 (2022-09-21)

**Note:** Version bump only for package @hpcc-js/chart





## [2.80.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.80.1...@hpcc-js/chart@2.80.2) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)



## 2.104.2 (2022-08-17)

**Note:** Version bump only for package @hpcc-js/chart





## [2.80.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.80.0...@hpcc-js/chart@2.80.1) (2022-08-17)



## 2.104.1 (2022-08-16)



# 2.104.0 (2022-07-26)

**Note:** Version bump only for package @hpcc-js/chart





# [2.80.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.79.1...@hpcc-js/chart@2.80.0) (2022-07-26)


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)





## [2.79.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.79.0...@hpcc-js/chart@2.79.1) (2022-06-23)



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)

**Note:** Version bump only for package @hpcc-js/chart





# [2.79.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.78.1...@hpcc-js/chart@2.79.0) (2022-04-27)


### Features

* **dgrid2:**  Add column formatting ([7a9db35](https://github.com/hpcc-systems/Visualization/commit/7a9db35fce57d94a4f3a58e88cebe1c10f2ab605))



## 2.103.1 (2022-04-20)





## [2.78.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.78.0...@hpcc-js/chart@2.78.1) (2022-04-20)



# 2.103.0 (2022-04-07)

**Note:** Version bump only for package @hpcc-js/chart





# [2.78.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.77.0...@hpcc-js/chart@2.78.0) (2022-04-07)


### Bug Fixes

*  Mixins not working within a ES6 environment ([7fe772a](https://github.com/hpcc-systems/Visualization/commit/7fe772ae2037f2bbd932cf6fb4c1d6eecc75b698))


### Features

* **fgrid:**  Add alternative to dgrid ([3a4841e](https://github.com/hpcc-systems/Visualization/commit/3a4841e7c6f898e0ff8bf0bfa55480c6ee5760d2))



## 2.102.11 (2022-03-24)





# [2.77.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.76.1...@hpcc-js/chart@2.77.0) (2022-03-24)


### Features

* **Pie:**  Add support for set selection ([b9af982](https://github.com/hpcc-systems/Visualization/commit/b9af98205d758f2e405b035df91fc57d2de1f0be))
* **pie:** Add selectByLabel ([b1ca48c](https://github.com/hpcc-systems/Visualization/commit/b1ca48c98a30358bdb206e46703e8fc846d23973))



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





## [2.76.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.76.0...@hpcc-js/chart@2.76.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/chart





# [2.76.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.75.0...@hpcc-js/chart@2.76.0) (2022-03-07)


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





# [2.75.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.75.0) (2022-02-23)



# 2.100.0 (2022-02-18)



# 2.99.0 (2022-02-10)



# 2.98.0 (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)



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


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.74.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.74.0) (2022-02-10)



# 2.98.0 (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)



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


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.73.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.73.0) (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)



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


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.72.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.72.0) (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)



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


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.71.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.71.0) (2022-01-20)



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)



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


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.70.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.70.0) (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)



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


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.69.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.69.0) (2021-11-08)



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


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.68.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.68.0) (2021-10-03)



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


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.67.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.67.0) (2021-09-08)



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.66.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.66.0) (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.65.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.65.0) (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.64.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.64.0) (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.63.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.63.0) (2021-08-04)



# 2.76.0 (2021-07-28)


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.62.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.62.0) (2021-07-28)


### Features

* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.61.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.61.0) (2021-07-16)



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.60.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.60.0) (2021-07-02)



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


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.59.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.59.0) (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.58.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.58.0) (2021-04-06)


### Bug Fixes

* **chart:** Set Heat bg color to transparent ([c0e2c01](https://github.com/hpcc-systems/Visualization/commit/c0e2c01e1433f4315b28e2bd52ba4dce4d72e36a)), closes [#3782](https://github.com/hpcc-systems/Visualization/issues/3782)



# 2.60.0 (2021-03-16)



# 2.59.0 (2021-02-24)



# 2.58.0 (2021-02-24)



# 2.57.0 (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.57.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.57.0) (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.56.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.56.0) (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.55.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.55.0) (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.54.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.54.0) (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.53.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.53.0) (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.52.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.52.0) (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.51.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.51.0) (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.50.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.50.0) (2020-09-03)


### Features

* **HeatChart:**  Add support for elliptical "blobs" ([2d7da78](https://github.com/hpcc-systems/Visualization/commit/2d7da7866ea682c15dbbb07034528ae49ee3ee54))



# 2.37.0 (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.49.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.49.0) (2020-08-26)


### Bug Fixes

* **chart:** Heat Chart palette issue ([ab94f8c](https://github.com/hpcc-systems/Visualization/commit/ab94f8c079e6f0e0ae4726ca85f810dea95743eb))



# 2.36.0 (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.48.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.48.0) (2020-08-25)


### Features

* **chart:**  Added Heat Chart ([f87739d](https://github.com/hpcc-systems/Visualization/commit/f87739d66cdabf1fb77c47595a46051cc4abf5f6))



# 2.35.0 (2020-08-24)



# 2.34.0 (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.47.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.47.0) (2020-08-22)


### Bug Fixes

* Pie label click passes correct selection ([b0d7a63](https://github.com/hpcc-systems/Visualization/commit/b0d7a6313301df5d510706d20198a89ab9683be9)), closes [#3864](https://github.com/hpcc-systems/Visualization/issues/3864)



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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.46.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.46.0) (2020-08-08)


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


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.45.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.45.0) (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.44.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.44.0) (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.43.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.43.0) (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.42.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.42.0) (2020-06-23)


### Bug Fixes

* ellipsis tooltip shows for any truncated row ([518ddbc](https://github.com/hpcc-systems/Visualization/commit/518ddbcbeee9c3888b02b1f979de25485d99358b)), closes [#3641](https://github.com/hpcc-systems/Visualization/issues/3641)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.41.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.41.0) (2020-06-17)


### Bug Fixes

* Column/Bar events moved to parent dataCell ([e541d81](https://github.com/hpcc-systems/Visualization/commit/e541d81dab54c5ac0d2f5d2b8b23ad41ee29aa57)), closes [#3631](https://github.com/hpcc-systems/Visualization/issues/3631)



# 2.20.0 (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.40.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.40.0) (2020-06-17)


### Features

* Improved Bar and Column tooltip handling ([35e898a](https://github.com/hpcc-systems/Visualization/commit/35e898aa11324c947d3dba9918a11667cf85937a)), closes [#3632](https://github.com/hpcc-systems/Visualization/issues/3632)



# 2.19.0 (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.39.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.39.0) (2020-06-15)


### Bug Fixes

* Apply font-family to inner text element ([#3629](https://github.com/hpcc-systems/Visualization/issues/3629)) ([ed1d87d](https://github.com/hpcc-systems/Visualization/commit/ed1d87d5c6b467a67d9bf08eeb4567131cf8c0ce)), closes [#3626](https://github.com/hpcc-systems/Visualization/issues/3626)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.38.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.38.0) (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.37.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.37.0) (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.36.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.36.0) (2020-05-20)



## 2.15.20 (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.35.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.35.0) (2020-05-20)


### Bug Fixes

* **Bar:** Alternative approach to Axis Icon mappings. ([1a7be19](https://github.com/hpcc-systems/Visualization/commit/1a7be19da7e885096568c9530981f364740fd68f)), closes [#3606](https://github.com/hpcc-systems/Visualization/issues/3606)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.34.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.34.0) (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.33.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.33.0) (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.32.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.32.0) (2020-05-15)



## 2.15.16 (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.31.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.31.0) (2020-05-14)


### Features

* **Axis:** Add label / icon mapping ([259c06a](https://github.com/hpcc-systems/Visualization/commit/259c06a2d999ddfc996804379cf26e4ace8da9ab))



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.30.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.30.0) (2020-05-12)



## 2.15.14 (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.29.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.29.0) (2020-05-07)


### Features

* Add Column innerText and value font props ([a8ef440](https://github.com/hpcc-systems/Visualization/commit/a8ef4407b96689562ccd50c5ab3ce7c7100617b9)), closes [#3568](https://github.com/hpcc-systems/Visualization/issues/3568)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.28.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.28.0) (2020-04-22)


### Features

* Add __lparam to color callbacks ([ef920bd](https://github.com/hpcc-systems/Visualization/commit/ef920bd8c209f8475dbb18bd1a2d8cca482b2333))
* Add fontSize and fontFamily to Axis ([d84a62a](https://github.com/hpcc-systems/Visualization/commit/d84a62ad7a6d265839ab3213eff037181eb81b20)), closes [#3569](https://github.com/hpcc-systems/Visualization/issues/3569)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.27.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.27.10) (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/chart





## [2.27.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.27.9) (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/chart





## [2.27.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.27.8) (2020-04-11)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/chart





## [2.27.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.27.7) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/chart





## [2.27.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.5...@hpcc-js/chart@2.27.6) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/chart





## [2.27.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.4...@hpcc-js/chart@2.27.5) (2020-04-03)

**Note:** Version bump only for package @hpcc-js/chart





## [2.27.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.3...@hpcc-js/chart@2.27.4) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/chart





## [2.27.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.2...@hpcc-js/chart@2.27.3) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/chart






## [2.27.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.1...@hpcc-js/chart@2.27.2) (2020-03-20)

**Note:** Version bump only for package @hpcc-js/chart





## [2.27.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.27.0...@hpcc-js/chart@2.27.1) (2020-03-02)

**Note:** Version bump only for package @hpcc-js/chart





# [2.27.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.26.2...@hpcc-js/chart@2.27.0) (2020-02-04)


### Features

* **chart:** Add StatChart ([0ce8483](https://github.com/hpcc-systems/Visualization/commit/0ce848388075d6effaa4ccc3dfa60c0ca2bd432d)), closes [#3477](https://github.com/hpcc-systems/Visualization/issues/3477)
* **Gauge:** Emphasis gauge is "clickable" ([6ff744d](https://github.com/hpcc-systems/Visualization/commit/6ff744db621497a1c74c39de911add7f310ddf36))





## [2.26.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.26.1...@hpcc-js/chart@2.26.2) (2020-01-23)

**Note:** Version bump only for package @hpcc-js/chart





## [2.26.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.26.0...@hpcc-js/chart@2.26.1) (2020-01-22)

**Note:** Version bump only for package @hpcc-js/chart





# [2.26.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.25.0...@hpcc-js/chart@2.26.0) (2020-01-07)


### Features

* **XYAxis:** Expose axis ticks methods ([6d40e1a](https://github.com/hpcc-systems/Visualization/commit/6d40e1a8f987ac3c13ffead2de087d8b990a5612))






# [2.25.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.24.0...@hpcc-js/chart@2.25.0) (2019-12-11)


### Features

* **docs:** Add RadialBar.md ([e157c9b](https://github.com/hpcc-systems/Visualization/commit/e157c9b))
* **docs:** Add SummaryC.md ([7084ecc](https://github.com/hpcc-systems/Visualization/commit/7084ecc))





# [2.24.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.23.0...@hpcc-js/chart@2.24.0) (2019-10-11)


### Features

* **docs:** Add Gantt.md ([0c77392](https://github.com/hpcc-systems/Visualization/commit/0c77392))
* **docs:** Add Radar.md ([fc43adb](https://github.com/hpcc-systems/Visualization/commit/fc43adb))
* **docs:** Add Summary.md ([#3435](https://github.com/hpcc-systems/Visualization/issues/3435)) ([6970c88](https://github.com/hpcc-systems/Visualization/commit/6970c88))





# [2.23.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.22.0...@hpcc-js/chart@2.23.0) (2019-10-08)


### Features

* **docs:** Add Bubble.md ([9067dfb](https://github.com/hpcc-systems/Visualization/commit/9067dfb))
* **docs:** Add Contour and HexBin ([b146f3b](https://github.com/hpcc-systems/Visualization/commit/b146f3b))
* **docs:** Add Line.md, Scatter.md and Step.md ([9cf2d5e](https://github.com/hpcc-systems/Visualization/commit/9cf2d5e))
* **docs:** Add XYAxis.md ([8bf86b7](https://github.com/hpcc-systems/Visualization/commit/8bf86b7))





# [2.22.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.21.0...@hpcc-js/chart@2.22.0) (2019-09-27)


### Bug Fixes

* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f82))


### Features

* **docs:** Add QuartileCandlestick md ([11d7f7f](https://github.com/hpcc-systems/Visualization/commit/11d7f7f))





# [2.21.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.20.2...@hpcc-js/chart@2.21.0) (2019-09-26)


### Features

* **docs:** Add 6 chart md files with verbiage ([bdd7274](https://github.com/hpcc-systems/Visualization/commit/bdd7274))
* **docs:** Add Bullet md ([9ea81bf](https://github.com/hpcc-systems/Visualization/commit/9ea81bf))
* **docs:** Add Gauge.md ([c76174e](https://github.com/hpcc-systems/Visualization/commit/c76174e))
* **docs:** Add WordCloud.md ([48d3e31](https://github.com/hpcc-systems/Visualization/commit/48d3e31))
* **docs:** First cut at new documentation / landing page ([ffa1583](https://github.com/hpcc-systems/Visualization/commit/ffa1583))
* **website:** Add Tutorial Docs ([3721b7b](https://github.com/hpcc-systems/Visualization/commit/3721b7b))





## [2.20.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.20.1...@hpcc-js/chart@2.20.2) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/chart





## [2.20.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.20.0...@hpcc-js/chart@2.20.1) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/chart





# [2.20.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.19.1...@hpcc-js/chart@2.20.0) (2019-08-13)


### Features

* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d681))





## [2.19.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.19.0...@hpcc-js/chart@2.19.1) (2019-08-06)

**Note:** Version bump only for package @hpcc-js/chart





# [2.19.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.18.5...@hpcc-js/chart@2.19.0) (2019-08-01)


### Features

* Add two publish params to chart_Summary ([4a58c56](https://github.com/hpcc-systems/Visualization/commit/4a58c56))





## [2.18.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.18.4...@hpcc-js/chart@2.18.5) (2019-07-10)

**Note:** Version bump only for package @hpcc-js/chart





## [2.18.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.18.3...@hpcc-js/chart@2.18.4) (2019-07-04)


### Bug Fixes

* **WordCloud:** Click event did not include entire row. ([a81117f](https://github.com/hpcc-systems/Visualization/commit/a81117f))






## [2.18.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.18.2...@hpcc-js/chart@2.18.3) (2019-07-03)

**Note:** Version bump only for package @hpcc-js/chart





## [2.18.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.18.1...@hpcc-js/chart@2.18.2) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/chart





## [2.18.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.18.0...@hpcc-js/chart@2.18.1) (2019-06-26)


### Bug Fixes

* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07))






# [2.18.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.17.3...@hpcc-js/chart@2.18.0) (2019-06-20)


### Bug Fixes

* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf3))
* Tweak sources to ensure compatibility with Angular 6 ([6b21f2e](https://github.com/hpcc-systems/Visualization/commit/6b21f2e))
* **chart:** Remove dependency on Google font ([27db490](https://github.com/hpcc-systems/Visualization/commit/27db490))
* **pie:** Conditionally center on labels ([9251699](https://github.com/hpcc-systems/Visualization/commit/9251699)), closes [#3301](https://github.com/hpcc-systems/Visualization/issues/3301)


### Features

* Add showLabels to Pie.ts ([04a946c](https://github.com/hpcc-systems/Visualization/commit/04a946c)), closes [#3292](https://github.com/hpcc-systems/Visualization/issues/3292)





## [2.17.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.17.2...@hpcc-js/chart@2.17.3) (2019-06-14)

**Note:** Version bump only for package @hpcc-js/chart






## [2.17.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.17.1...@hpcc-js/chart@2.17.2) (2019-05-16)


### Bug Fixes

* Changed d3 style use to v4+ format ([f79f272](https://github.com/hpcc-systems/Visualization/commit/f79f272)), closes [#3250](https://github.com/hpcc-systems/Visualization/issues/3250)
* **Column:** Value labels not displaying correctly ([5f61050](https://github.com/hpcc-systems/Visualization/commit/5f61050)), closes [#3248](https://github.com/hpcc-systems/Visualization/issues/3248)






## [2.17.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.17.0...@hpcc-js/chart@2.17.1) (2019-04-27)

**Note:** Version bump only for package @hpcc-js/chart






# [2.17.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.14.2...@hpcc-js/chart@2.17.0) (2019-04-06)



# [2.15.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.14.2...@hpcc-js/chart@2.15.0) (2019-04-05)


### Bug Fixes

* **chart:** Corrected pointShapeColumn use condition ([065af16](https://github.com/hpcc-systems/Visualization/commit/065af16)), closes [#3225](https://github.com/hpcc-systems/Visualization/issues/3225)


### Features

* Add orientation to QuartileCandlestick.ts ([64697bd](https://github.com/hpcc-systems/Visualization/commit/64697bd)), closes [#3188](https://github.com/hpcc-systems/Visualization/issues/3188)
* **xyaxis:** Add xAxisTitle support to XYAxis.ts ([54cc9ba](https://github.com/hpcc-systems/Visualization/commit/54cc9ba)), closes [#3191](https://github.com/hpcc-systems/Visualization/issues/3191)






## [2.14.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.14.2...@hpcc-js/chart@2.14.3) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/chart






## [2.14.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.14.1...@hpcc-js/chart@2.14.2) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/chart






## [2.14.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.12.0...@hpcc-js/chart@2.14.1) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/chart






# [2.14.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.10.0...@hpcc-js/chart@2.14.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/chart






# [2.13.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.10.0...@hpcc-js/chart@2.13.0) (2019-04-01)

**Note:** Version bump only for package @hpcc-js/chart






# [2.12.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.10.0...@hpcc-js/chart@2.12.0) (2019-03-29)

**Note:** Version bump only for package @hpcc-js/chart






# [2.11.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.10.0...@hpcc-js/chart@2.11.0) (2019-03-21)


### Bug Fixes

* **pie:** Pie centerOnLabels limited by radius ([7406091](https://github.com/hpcc-systems/Visualization/commit/7406091)), closes [#3175](https://github.com/hpcc-systems/Visualization/issues/3175)


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))
* **pie:** Add showSeriesValue to Pie ([87fbb89](https://github.com/hpcc-systems/Visualization/commit/87fbb89)), closes [#3156](https://github.com/hpcc-systems/Visualization/issues/3156)
* **SVGWidget:** Allow SVG Widgets to Scroll ([df283f9](https://github.com/hpcc-systems/Visualization/commit/df283f9))






# [2.10.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.9.0...@hpcc-js/chart@2.10.0) (2019-03-11)


### Features

* **chart:** Add QuartileCandlestick.ts ([0ba17ab](https://github.com/hpcc-systems/Visualization/commit/0ba17ab))





# [2.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.8.3...@hpcc-js/chart@2.9.0) (2019-03-07)


### Bug Fixes

* **column:** Correctly adjusts valueText position ([269399e](https://github.com/hpcc-systems/Visualization/commit/269399e)), closes [#3140](https://github.com/hpcc-systems/Visualization/issues/3140)


### Features

* **Gauge:** Add "click" event for entire Gauge ([3674f9e](https://github.com/hpcc-systems/Visualization/commit/3674f9e))






## [2.8.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.8.2...@hpcc-js/chart@2.8.3) (2019-03-06)

**Note:** Version bump only for package @hpcc-js/chart






## [2.8.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.8.1...@hpcc-js/chart@2.8.2) (2019-02-20)


### Bug Fixes

* **xyaxis:** Corrected calcMargin logic ([643b320](https://github.com/hpcc-systems/Visualization/commit/643b320)), closes [#3133](https://github.com/hpcc-systems/Visualization/issues/3133)






## [2.8.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.8.0...@hpcc-js/chart@2.8.1) (2019-02-19)


### Bug Fixes

* **chart:** XYAxis rendering issue when top/right text extends beyond the axis line ([c6cabb9](https://github.com/hpcc-systems/Visualization/commit/c6cabb9)), closes [#3126](https://github.com/hpcc-systems/Visualization/issues/3126)
* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2))






# [2.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.7.0...@hpcc-js/chart@2.8.0) (2019-01-29)


### Bug Fixes

* **chart:** X-Axis focus hiding columns ([49f5d72](https://github.com/hpcc-systems/Visualization/commit/49f5d72))
* **scatter:** Add darken properties to Scatter ([4c4c880](https://github.com/hpcc-systems/Visualization/commit/4c4c880)), closes [#3078](https://github.com/hpcc-systems/Visualization/issues/3078)


### Features

* **pie:** Added showPercentageDecimals to Pie ([a6108a8](https://github.com/hpcc-systems/Visualization/commit/a6108a8)), closes [#3077](https://github.com/hpcc-systems/Visualization/issues/3077)






# [2.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.6.0...@hpcc-js/chart@2.7.0) (2019-01-08)


### Features

* **pie:** Better pie label positioning ([f2fa36c](https://github.com/hpcc-systems/Visualization/commit/f2fa36c)), closes [#2994](https://github.com/hpcc-systems/Visualization/issues/2994) [#2956](https://github.com/hpcc-systems/Visualization/issues/2956)






# [2.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.5.3...@hpcc-js/chart@2.6.0) (2018-12-13)


### Features

* **dashy:** Enable XYAxis range selection ([ec96d97](https://github.com/hpcc-systems/Visualization/commit/ec96d97))






## [2.5.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.5.2...@hpcc-js/chart@2.5.3) (2018-12-06)

**Note:** Version bump only for package @hpcc-js/chart






## [2.5.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.5.1...@hpcc-js/chart@2.5.2) (2018-12-04)

**Note:** Version bump only for package @hpcc-js/chart






## [2.5.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.5.0...@hpcc-js/chart@2.5.1) (2018-11-27)

**Note:** Version bump only for package @hpcc-js/chart






<a name="2.5.0"></a>
# [2.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.4.1...@hpcc-js/chart@2.5.0) (2018-11-26)


### Features

* **column:** Add inner/outer padding for column/ordinal charts ([6011435](https://github.com/hpcc-systems/Visualization/commit/6011435))
* **column:** Add option to show percent values ([1bee061](https://github.com/hpcc-systems/Visualization/commit/1bee061)), closes [#2969](https://github.com/hpcc-systems/Visualization/issues/2969)





<a name="2.4.1"></a>
## [2.4.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.4.0...@hpcc-js/chart@2.4.1) (2018-11-09)


### Bug Fixes

* **line:** Use proper colors to match legend ([a5d7543](https://github.com/hpcc-systems/Visualization/commit/a5d7543)), closes [#2957](https://github.com/hpcc-systems/Visualization/issues/2957)





<a name="2.4.0"></a>
# [2.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.3.0...@hpcc-js/chart@2.4.0) (2018-11-08)


### Features

* **readme:** Add README.md for chart package ([2681ca0](https://github.com/hpcc-systems/Visualization/commit/2681ca0))





<a name="2.3.0"></a>
# [2.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.2.1...@hpcc-js/chart@2.3.0) (2018-10-30)


### Features

* Adjust position of cutoff values ([f4e2284](https://github.com/hpcc-systems/Visualization/commit/f4e2284)), closes [#2912](https://github.com/hpcc-systems/Visualization/issues/2912)
* **Widget:** Enhanced classed call to match d3 v4 call signature. ([f7e9141](https://github.com/hpcc-systems/Visualization/commit/f7e9141)), closes [#2933](https://github.com/hpcc-systems/Visualization/issues/2933)
* Value/label/icon anchoring in SummaryC.ts ([1161678](https://github.com/hpcc-systems/Visualization/commit/1161678))





<a name="2.2.1"></a>
## [2.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.2.0...@hpcc-js/chart@2.2.1) (2018-10-15)


### Bug Fixes

* valueCendered now works with Bar.ts ([5ba31ed](https://github.com/hpcc-systems/Visualization/commit/5ba31ed)), closes [#2911](https://github.com/hpcc-systems/Visualization/issues/2911)





<a name="2.2.0"></a>
# [2.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.1.2...@hpcc-js/chart@2.2.0) (2018-10-05)


### Bug Fixes

* **HexBin:** Classic closure bug with "data" ([0daeaac](https://github.com/hpcc-systems/Visualization/commit/0daeaac)), closes [#2871](https://github.com/hpcc-systems/Visualization/issues/2871)


### Features

* Add HalfDonut and QuarterDonut widgets ([ca0f80c](https://github.com/hpcc-systems/Visualization/commit/ca0f80c)), closes [#2889](https://github.com/hpcc-systems/Visualization/issues/2889)
* Add pie series percentages ([cc2493f](https://github.com/hpcc-systems/Visualization/commit/cc2493f)), closes [#2888](https://github.com/hpcc-systems/Visualization/issues/2888)
* Add value display options for XYAxis etc ([6cd35ea](https://github.com/hpcc-systems/Visualization/commit/6cd35ea)), closes [#2890](https://github.com/hpcc-systems/Visualization/issues/2890) [#2707](https://github.com/hpcc-systems/Visualization/issues/2707)





<a name="2.1.2"></a>
## [2.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.1.1...@hpcc-js/chart@2.1.2) (2018-09-24)


### Bug Fixes

* **hexbin:** Tooltip missing label and series information ([a38805a](https://github.com/hpcc-systems/Visualization/commit/a38805a))
* Add standard click events to RadialBar.ts ([4fc0162](https://github.com/hpcc-systems/Visualization/commit/4fc0162)), closes [#2863](https://github.com/hpcc-systems/Visualization/issues/2863)





<a name="2.1.1"></a>
## [2.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.1.0...@hpcc-js/chart@2.1.1) (2018-09-10)

**Note:** Version bump only for package @hpcc-js/chart





<a name="2.1.0"></a>
# [2.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@2.0.0...@hpcc-js/chart@2.1.0) (2018-09-01)


### Features

* **chart:** Add RadialBar chart ([58db845](https://github.com/hpcc-systems/Visualization/commit/58db845))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.10.0...@hpcc-js/chart@2.0.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/chart





<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.10.0...@hpcc-js/chart@2.0.0-rc.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/chart





<a name="0.10.0"></a>
# [0.10.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.9.5...@hpcc-js/chart@0.10.0) (2018-08-23)


### Features

* **legend:** Add legend for HexBin and Contour ([21a2ee8](https://github.com/hpcc-systems/Visualization/commit/21a2ee8))




<a name="0.9.5"></a>
## [0.9.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.9.4...@hpcc-js/chart@0.9.5) (2018-08-15)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.9.4"></a>
## [0.9.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.9.3...@hpcc-js/chart@0.9.4) (2018-08-15)


### Bug Fixes

* **tooltip:** Workaround FF issue with getScreenCTM ([6978cfb](https://github.com/hpcc-systems/Visualization/commit/6978cfb)), closes [#2743](https://github.com/hpcc-systems/Visualization/issues/2743)




<a name="0.9.3"></a>
## [0.9.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.9.2...@hpcc-js/chart@0.9.3) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.9.2"></a>
## [0.9.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.9.1...@hpcc-js/chart@0.9.2) (2018-08-14)


### Bug Fixes

* **axis:** Axis text not displaying ([23f4951](https://github.com/hpcc-systems/Visualization/commit/23f4951)), closes [#2753](https://github.com/hpcc-systems/Visualization/issues/2753)




<a name="0.9.1"></a>
## [0.9.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.9.0...@hpcc-js/chart@0.9.1) (2018-08-10)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.9.0"></a>
# [0.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.11...@hpcc-js/chart@0.9.0) (2018-08-07)


### Features

* **hexbin:** Add tooltip to HexBin.ts ([60f40d9](https://github.com/hpcc-systems/Visualization/commit/60f40d9))




<a name="0.8.11"></a>
## [0.8.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.10...@hpcc-js/chart@0.8.11) (2018-08-02)


### Bug Fixes

* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ad))




<a name="0.8.10"></a>
## [0.8.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.9...@hpcc-js/chart@0.8.10) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.8.9"></a>
## [0.8.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.8...@hpcc-js/chart@0.8.9) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.8.8"></a>
## [0.8.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.7...@hpcc-js/chart@0.8.8) (2018-07-29)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.8.7"></a>
## [0.8.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.6...@hpcc-js/chart@0.8.7) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.8.6"></a>
## [0.8.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.5...@hpcc-js/chart@0.8.6) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.8.5"></a>
## [0.8.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.4...@hpcc-js/chart@0.8.5) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.8.4"></a>
## [0.8.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.3...@hpcc-js/chart@0.8.4) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.8.3"></a>
## [0.8.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.2...@hpcc-js/chart@0.8.3) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.8.2"></a>
## [0.8.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.1...@hpcc-js/chart@0.8.2) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.8.1"></a>
## [0.8.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.8.0...@hpcc-js/chart@0.8.1) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.8.0"></a>
# [0.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.7.1...@hpcc-js/chart@0.8.0) (2018-07-27)


### Bug Fixes

* **axis:** Remove svgLine getBBox call ([2d0f548](https://github.com/hpcc-systems/Visualization/commit/2d0f548)), closes [#2705](https://github.com/hpcc-systems/Visualization/issues/2705)
* **tooltip:** Add SVGElement to end of show args ([fea34a2](https://github.com/hpcc-systems/Visualization/commit/fea34a2)), closes [#2703](https://github.com/hpcc-systems/Visualization/issues/2703)


### Features

* Add 2d selection to XYAxis ([3d13227](https://github.com/hpcc-systems/Visualization/commit/3d13227))




<a name="0.7.1"></a>
## [0.7.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.7.0...@hpcc-js/chart@0.7.1) (2018-07-02)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.7.0"></a>
# [0.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.6.0...@hpcc-js/chart@0.7.0) (2018-06-28)


### Features

* Add BubbleXY ([5c61c39](https://github.com/hpcc-systems/Visualization/commit/5c61c39))




<a name="0.6.0"></a>
# [0.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.5.2...@hpcc-js/chart@0.6.0) (2018-06-22)


### Features

* **HexBin:** Add selection support ([c5591c3](https://github.com/hpcc-systems/Visualization/commit/c5591c3))




<a name="0.5.2"></a>
## [0.5.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.5.1...@hpcc-js/chart@0.5.2) (2018-06-20)


### Bug Fixes

* **Axis:** Edge case when only one data point is present ([0e559dc](https://github.com/hpcc-systems/Visualization/commit/0e559dc))




<a name="0.5.1"></a>
## [0.5.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.5.0...@hpcc-js/chart@0.5.1) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.5.0"></a>
# [0.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.4.0...@hpcc-js/chart@0.5.0) (2018-06-19)


### Bug Fixes

* Better bubble text clipping ([98fe1ff](https://github.com/hpcc-systems/Visualization/commit/98fe1ff))


### Features

* Add font size parameters to Summary and SummaryC ([96dd115](https://github.com/hpcc-systems/Visualization/commit/96dd115)), closes [#2617](https://github.com/hpcc-systems/Visualization/issues/2617)
* Simplify Pie labels ([8506b4d](https://github.com/hpcc-systems/Visualization/commit/8506b4d))
* **chart:** Support runtime colour calculations ([18ceed4](https://github.com/hpcc-systems/Visualization/commit/18ceed4))
* **dashy:** Add [@hpcc-js](https://github.com/hpcc-js)/chart input mapping meta ([fb9e523](https://github.com/hpcc-systems/Visualization/commit/fb9e523))
* **Radar:** Adds Radar widget Signed-off-by: Jaman <jbrundage372@gmail.com> ([a6c73ed](https://github.com/hpcc-systems/Visualization/commit/a6c73ed))




<a name="0.4.0"></a>
# [0.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.3.0...@hpcc-js/chart@0.4.0) (2018-06-15)


### Features

* **chart:** Support runtime colour calculations ([820ff4f](https://github.com/hpcc-systems/Visualization/commit/820ff4f))




<a name="0.3.0"></a>
# [0.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.2.2...@hpcc-js/chart@0.3.0) (2018-06-14)


### Features

* **Radar:** Adds Radar widget Signed-off-by: Jaman <jbrundage372@gmail.com> ([4d0bd10](https://github.com/hpcc-systems/Visualization/commit/4d0bd10))




<a name="0.2.2"></a>
## [0.2.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.2.1...@hpcc-js/chart@0.2.2) (2018-06-01)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.2.1"></a>
## [0.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.2.0...@hpcc-js/chart@0.2.1) (2018-05-28)




**Note:** Version bump only for package @hpcc-js/chart

<a name="0.2.0"></a>
# [0.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.1.0...@hpcc-js/chart@0.2.0) (2018-05-21)


### Bug Fixes

* TextBox text colour could be hard to read ([bb15dcc](https://github.com/hpcc-systems/Visualization/commit/bb15dcc))


### Features

*  Add ability to get a normalized array of WUDetail scopes ([752ada0](https://github.com/hpcc-systems/Visualization/commit/752ada0))




<a name="0.1.0"></a>
# [0.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/chart@0.0.79...@hpcc-js/chart@0.1.0) (2018-05-16)


### Features

* Add value text to Column/Bar chart ([62c62b7](https://github.com/hpcc-systems/Visualization/commit/62c62b7)), closes [#2553](https://github.com/hpcc-systems/Visualization/issues/2553)
