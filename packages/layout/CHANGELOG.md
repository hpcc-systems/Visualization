# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.51.2](https://github.com/hpcc-systems/Visualization/compare/layout-v2.51.1...layout-v2.51.2) (2025-10-23)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^2.14.1 to ^2.14.2
    * @hpcc-js/chart bumped from ^2.86.1 to ^2.86.2
    * @hpcc-js/common bumped from ^2.73.1 to ^2.73.2
    * @hpcc-js/dgrid2 bumped from ^2.5.1 to ^2.5.2

## [2.51.1](https://github.com/hpcc-systems/Visualization/compare/layout-v2.51.0...layout-v2.51.1) (2025-06-09)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^2.14.0 to ^2.14.1
    * @hpcc-js/chart bumped from ^2.86.0 to ^2.86.1
    * @hpcc-js/common bumped from ^2.73.0 to ^2.73.1
    * @hpcc-js/dgrid2 bumped from ^2.5.0 to ^2.5.1

## [2.51.0](https://github.com/hpcc-systems/Visualization/compare/layout-v2.50.2...layout-v2.51.0) (2024-10-23)


### Features

* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/api bumped from ^2.13.0 to ^2.14.0
    * @hpcc-js/chart bumped from ^2.85.0 to ^2.86.0
    * @hpcc-js/common bumped from ^2.72.0 to ^2.73.0
    * @hpcc-js/dgrid2 bumped from ^2.4.0 to ^2.5.0

## [2.50.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.50.1...@hpcc-js/layout@2.50.2) (2024-08-22)



## 2.106.3 (2024-08-01)



## 2.106.2 (2024-07-29)



## 2.106.1 (2024-07-24)

**Note:** Version bump only for package @hpcc-js/layout






## [2.50.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.50.0...@hpcc-js/layout@2.50.1) (2024-07-24)



# 2.106.0 (2024-07-23)

**Note:** Version bump only for package @hpcc-js/layout





# 2.50.0 (2024-07-23)


### Bug Fixes

*  Include custom fonts in DownloadPNG ([74488ef](https://github.com/hpcc-systems/Visualization/commit/74488efad5d121f7d7dc70387b1bd13f5f2955c9)), closes [#3728](https://github.com/hpcc-systems/Visualization/issues/3728)
*  Switch to grid2 for layout ([04c7345](https://github.com/hpcc-systems/Visualization/commit/04c7345437554a76f328011b070d92c1adef2aea))
* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f8273e454c4b103e0ed1965c18542f125482))
* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07379e59081c930d61485764e78c8a07a90))
* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf369d6d4081f0f5d9285bf3b1fd9b5b5999))
* **Carousel:** Carousel should not render when hidden ([4a08063](https://github.com/hpcc-systems/Visualization/commit/4a08063c41cc88a5d350671fef5c2bbfd0addcfc))
* Changed d3 style use to v4+ format ([f79f272](https://github.com/hpcc-systems/Visualization/commit/f79f272b0924b73deb7cc33042a6db8dd904faa4)), closes [#3250](https://github.com/hpcc-systems/Visualization/issues/3250)
* ChartPanel legend hides when dataVisible ([766e7bf](https://github.com/hpcc-systems/Visualization/commit/766e7bff659c8d0a138d54e6b3a23e1e13297c6b)), closes [#3932](https://github.com/hpcc-systems/Visualization/issues/3932)
* **ChartPanel:** Add missing render callback call. ([b36f677](https://github.com/hpcc-systems/Visualization/commit/b36f677890263f0ddcec4b5fe0e1b13afba9101c))
* **ChartPanel:** Legend toggle not refreshing columns ([7841145](https://github.com/hpcc-systems/Visualization/commit/78411451bad6566ae14c6bb993615de08da9a534)), closes [#2835](https://github.com/hpcc-systems/Visualization/issues/2835)
* **comms:** rejectUnauthorized does nothing in NodeJS ([38f793d](https://github.com/hpcc-systems/Visualization/commit/38f793d5ccd9a40078b1df36c799e6300153b8c3))
* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ada4d7aad0ffe9ea5cf004b49ccec6710de))
* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2c956601f3b4740917c4c35896f7f6c1c4))
* **FlexGrid:** Add exit/remove to FlexGrid.ts ([99b43df](https://github.com/hpcc-systems/Visualization/commit/99b43df027e6d8fdcd5c58470b00806fb18e2011)), closes [#2964](https://github.com/hpcc-systems/Visualization/issues/2964)
* **ie11:** Fixed IE11 Border2 flex issue ([3814cd9](https://github.com/hpcc-systems/Visualization/commit/3814cd94fa2fc2ac06d253f3c08d4fd4860e798b)), closes [#3055](https://github.com/hpcc-systems/Visualization/issues/3055)
* **layout:** Grid layout not rendering. ([861689b](https://github.com/hpcc-systems/Visualization/commit/861689b267c9429eff26afae1eb89c0c26b77441))
* **legend:**  Legend incorrect for 2D charts ([2aefc66](https://github.com/hpcc-systems/Visualization/commit/2aefc66975b712ca7f3cfcce828c8d201b646c60)), closes [#2814](https://github.com/hpcc-systems/Visualization/issues/2814)
* Legend scrolling issue ([a207294](https://github.com/hpcc-systems/Visualization/commit/a2072941e3b4fe4c270fcb12763458528c41fefa))
* Legend text alignment adjusted for IE ([75e1dfb](https://github.com/hpcc-systems/Visualization/commit/75e1dfb806b04b957df36aead3fbdae6ec9c81c5)), closes [#3450](https://github.com/hpcc-systems/Visualization/issues/3450)
* Legend total translate fixed for IE ([2bc7541](https://github.com/hpcc-systems/Visualization/commit/2bc75411978e048d1e395ef7f064495259d1c7d7)), closes [#3281](https://github.com/hpcc-systems/Visualization/issues/3281)
* **Legend:** _boundingBox may be undefined ([f6e957f](https://github.com/hpcc-systems/Visualization/commit/f6e957f0ef5d3dd244061cd16a446f6127a2c0de))
* **Legend:** Add room for scrollbar to display ([b0cfc56](https://github.com/hpcc-systems/Visualization/commit/b0cfc56cb4808a2fb6b0c8da9e3dd9f75fc7e4fe)), closes [#3488](https://github.com/hpcc-systems/Visualization/issues/3488)
* **Legend:** Fails to render when data is empty. ([939b776](https://github.com/hpcc-systems/Visualization/commit/939b776267e524a5ca81388babd7727c927fca55)), closes [#3351](https://github.com/hpcc-systems/Visualization/issues/3351)
* **legend:** Issue with numeric labels ([b43e4ff](https://github.com/hpcc-systems/Visualization/commit/b43e4fff454e12d045a427fd5755b8be20133155))
* **Legend:** Legend should use "fillColor" when available ([aadb4d5](https://github.com/hpcc-systems/Visualization/commit/aadb4d5af3e0650dbc2250470f84b03e52c5d7e2)), closes [#2842](https://github.com/hpcc-systems/Visualization/issues/2842)
* **legend:** Limiting legend value sums by columns ([af994e2](https://github.com/hpcc-systems/Visualization/commit/af994e2fd913395a88c233f70cde3dbd71295047))
* **Legend:** Regression causing issues with legend clicks ([285ddbe](https://github.com/hpcc-systems/Visualization/commit/285ddbe28c0239c83224553616f058dfa8869f78)), closes [#3134](https://github.com/hpcc-systems/Visualization/issues/3134)
* **legend:** Show/Hide series was not refreshing correctly ([61e975c](https://github.com/hpcc-systems/Visualization/commit/61e975c4d8efd1123287834dcf4cb46c8c7c3c2a)), closes [#2812](https://github.com/hpcc-systems/Visualization/issues/2812)
* **legend:** Summing legend totals via dataFamily ([46ff93f](https://github.com/hpcc-systems/Visualization/commit/46ff93f250db3e6eeca8cd778513c2c0c65751cb))
* **legend:** Summing series correctly ([ea89530](https://github.com/hpcc-systems/Visualization/commit/ea89530da857d6692309c565a2e28de9e2cde7e9)), closes [#2991](https://github.com/hpcc-systems/Visualization/issues/2991)
* **lint:** Fixed lint issue with Modal.ts ([85e987b](https://github.com/hpcc-systems/Visualization/commit/85e987b6edcd4cd30a1fa5889513ee728771968e))
* **marshaller:** Add missing "flyout" capability ([1f75e11](https://github.com/hpcc-systems/Visualization/commit/1f75e1182f9e79b97f60af9a9b6f5cb870888e79))
* MiniGantt click event was non standard ([988012a](https://github.com/hpcc-systems/Visualization/commit/988012a8803551fcbd52c5462433b92fc4a345a5))
* Minor layout render timing issues ([a85d084](https://github.com/hpcc-systems/Visualization/commit/a85d084221293137107d1ee883cee9e40b5aec69))
* **modal:** Add fixedHeight and fixedWidth to v2 ([ac01f4e](https://github.com/hpcc-systems/Visualization/commit/ac01f4e596b54e4c3d5fd79e093762b87172293d))


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))
* Add 4 new layout widgets ([46d6051](https://github.com/hpcc-systems/Visualization/commit/46d605199bfa0d30ea8209942643a740ac15fd17)), closes [#2891](https://github.com/hpcc-systems/Visualization/issues/2891)
* Add applyLayout to Grid ([5bd0dd3](https://github.com/hpcc-systems/Visualization/commit/5bd0dd3ad6bc629f90330282c14ac373155f98b3))
* Add enhancements to Legend ([4d37b9b](https://github.com/hpcc-systems/Visualization/commit/4d37b9bfabe32f013370bad056133f482a5c4c1e)), closes [#3710](https://github.com/hpcc-systems/Visualization/issues/3710) [#3697](https://github.com/hpcc-systems/Visualization/issues/3697)
* Add GMap US Counties ([12bae45](https://github.com/hpcc-systems/Visualization/commit/12bae4544d16f4a5ea95373747c5459f39a8f304)), closes [#2554](https://github.com/hpcc-systems/Visualization/issues/2554)
* Add intuitive closing logic for flyout ([e5cff53](https://github.com/hpcc-systems/Visualization/commit/e5cff5366ab32b2419c6770d55a8731f3089eb55)), closes [#3319](https://github.com/hpcc-systems/Visualization/issues/3319)
* Add option to show legend values ([ccc0c6c](https://github.com/hpcc-systems/Visualization/commit/ccc0c6cc3e79acd860fbb388c577a4f1d8248be3)), closes [#2887](https://github.com/hpcc-systems/Visualization/issues/2887) [#2892](https://github.com/hpcc-systems/Visualization/issues/2892)
* Add pie series percentages ([cc2493f](https://github.com/hpcc-systems/Visualization/commit/cc2493ff4eab18cc13dee620ec9756e4c8ae3d84)), closes [#2888](https://github.com/hpcc-systems/Visualization/issues/2888)
* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))
* **ChartPanel:**  Add API for toolbar buttons ([c87656b](https://github.com/hpcc-systems/Visualization/commit/c87656b3805c514e5a6a9aa3c22eea69a33c5dac)), closes [#2813](https://github.com/hpcc-systems/Visualization/issues/2813)
* ChartPanel title hide and overlay options ([685710f](https://github.com/hpcc-systems/Visualization/commit/685710ff2b1ad03c165a52c60bb8427359b22b61))
* **ChartPanel:** Download image includes legend (if visible) ([8c64922](https://github.com/hpcc-systems/Visualization/commit/8c64922b8cfd54e11250b5a590f45d45c905165a)), closes [#3299](https://github.com/hpcc-systems/Visualization/issues/3299)
* **dashy:** Add dermatology upgrade script to ddl-shim ([72f2a46](https://github.com/hpcc-systems/Visualization/commit/72f2a4675e56e268858b3ec5a17090fa357c20fc))
* **dgrid2:**  Add column formatting ([7a9db35](https://github.com/hpcc-systems/Visualization/commit/7a9db35fce57d94a4f3a58e88cebe1c10f2ab605))
* **FlexBox:** Add option to force scroll bars ([11e3ce7](https://github.com/hpcc-systems/Visualization/commit/11e3ce7a3f97c603ec24c9c502b92bbb7abeab55))
* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d6819c6fd166f74e7385446dd477e8a1cdd01))
* Graph support in the marshaller ([bcc2290](https://github.com/hpcc-systems/Visualization/commit/bcc229003d03a6fcd42faaa70156f12814a4dc33)), closes [#2559](https://github.com/hpcc-systems/Visualization/issues/2559)
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))
* Layered.ts can give placement to layers ([2d56383](https://github.com/hpcc-systems/Visualization/commit/2d5638326dbbe58eb83fbb95182decaa0d1368ce))
* **legend:** Add legend for HexBin and Contour ([21a2ee8](https://github.com/hpcc-systems/Visualization/commit/21a2ee8c7152c9310d881f8e3f651416639638c1))
* **Legend:** Add max label width for legend ([073d09c](https://github.com/hpcc-systems/Visualization/commit/073d09c5af39f8892b336ff21911e77645ad34d8)), closes [#3154](https://github.com/hpcc-systems/Visualization/issues/3154)
* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfacc1b162f1a5d02b06d434375424b7d225f))
* **panel:** Add _hideToggleLegendList ([616bc77](https://github.com/hpcc-systems/Visualization/commit/616bc77b4c76af140467bd7b60453526a9623c9c))
* **panel:** Add file download name options ([3e5b0a6](https://github.com/hpcc-systems/Visualization/commit/3e5b0a6f2a2be5fb11e9e98c69e497d21322dda6)), closes [#3335](https://github.com/hpcc-systems/Visualization/issues/3335)
* **readme:** Add packages/layout/README.md ([5ff0a39](https://github.com/hpcc-systems/Visualization/commit/5ff0a3999fff79d7be6e442b8d59c42f4ec50e1f))
* **SVGWidget:** Allow SVG Widgets to Scroll ([df283f9](https://github.com/hpcc-systems/Visualization/commit/df283f9cd4866134c53d91603310aee0a8a1eef8))
* **SVGWiget:** Add image download capability ([46f19dc](https://github.com/hpcc-systems/Visualization/commit/46f19dc4751e9106d7e5cba6b974d251793cbd19)), closes [#3186](https://github.com/hpcc-systems/Visualization/issues/3186)
* **titlebar:** Add description functionality ([fbb1d80](https://github.com/hpcc-systems/Visualization/commit/fbb1d800f19dd0435890fa5154eecff4e4407e7c)), closes [#3030](https://github.com/hpcc-systems/Visualization/issues/3030)
* **toolbar:** Add selection group ([d6849ae](https://github.com/hpcc-systems/Visualization/commit/d6849aecf19c906994ae631bdc9ffe7f72cdfbf8))


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))
* Revert "chore: Rework shim inclusion" ([462d55c](https://github.com/hpcc-systems/Visualization/commit/462d55c0b89cb74c6f2aacc29ccafebaf5a2c46c))






## [2.49.23](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.22...@hpcc-js/layout@2.49.23) (2024-07-02)



## 2.105.11 (2024-06-25)



## 2.105.10 (2024-06-19)



## 2.105.9 (2024-05-24)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.22](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.21...@hpcc-js/layout@2.49.22) (2024-05-24)



## 2.105.8 (2024-04-24)



## 2.105.7 (2024-04-22)



## 2.105.6 (2024-04-17)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.20...@hpcc-js/layout@2.49.21) (2024-04-17)



## 2.105.5 (2024-03-28)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.19...@hpcc-js/layout@2.49.20) (2024-03-28)



## 2.105.4 (2024-03-21)



## 2.105.3 (2024-03-19)



## 2.105.2 (2024-03-15)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.18...@hpcc-js/layout@2.49.19) (2024-03-15)



## 2.105.1 (2024-03-15)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.17...@hpcc-js/layout@2.49.18) (2024-03-15)



# 2.105.0 (2024-03-08)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.16...@hpcc-js/layout@2.49.17) (2024-03-08)



## 2.104.42 (2024-02-28)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.15...@hpcc-js/layout@2.49.16) (2024-02-28)



## 2.104.41 (2024-02-16)



## 2.104.40 (2024-02-15)



## 2.104.39 (2024-02-06)



## 2.104.38 (2024-02-06)



## 2.104.37 (2024-01-25)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.14...@hpcc-js/layout@2.49.15) (2024-01-25)



## 2.104.36 (2024-01-23)



## 2.104.35 (2024-01-18)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.13...@hpcc-js/layout@2.49.14) (2024-01-18)



## 2.104.34 (2024-01-02)



## 2.104.33 (2023-11-16)



## 2.104.32 (2023-11-09)

**Note:** Version bump only for package @hpcc-js/layout






## [2.49.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.12...@hpcc-js/layout@2.49.13) (2023-11-09)



## 2.104.31 (2023-11-03)



## 2.104.30 (2023-10-26)

**Note:** Version bump only for package @hpcc-js/layout






## [2.49.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.11...@hpcc-js/layout@2.49.12) (2023-10-26)



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.10...@hpcc-js/layout@2.49.11) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.9...@hpcc-js/layout@2.49.10) (2023-09-14)



## 2.104.25 (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.8...@hpcc-js/layout@2.49.9) (2023-06-08)



## 2.104.19 (2023-03-14)



## 2.104.18 (2023-02-22)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.7...@hpcc-js/layout@2.49.8) (2023-02-22)



## 2.104.17 (2023-01-20)



## 2.104.16 (2023-01-19)



## 2.104.15 (2022-11-15)



## 2.104.14 (2022-11-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.6...@hpcc-js/layout@2.49.7) (2022-11-11)



## 2.104.13 (2022-11-09)

**Note:** Version bump only for package @hpcc-js/layout






## [2.49.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.5...@hpcc-js/layout@2.49.6) (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)

**Note:** Version bump only for package @hpcc-js/layout






## [2.49.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.4...@hpcc-js/layout@2.49.5) (2022-10-11)



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)



## 2.104.8 (2022-09-29)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.3...@hpcc-js/layout@2.49.4) (2022-09-29)



## 2.104.7 (2022-09-28)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.2...@hpcc-js/layout@2.49.3) (2022-09-28)



## 2.104.6 (2022-09-21)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.1...@hpcc-js/layout@2.49.2) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)



## 2.104.2 (2022-08-17)

**Note:** Version bump only for package @hpcc-js/layout





## [2.49.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.49.0...@hpcc-js/layout@2.49.1) (2022-08-17)



## 2.104.1 (2022-08-16)



# 2.104.0 (2022-07-26)

**Note:** Version bump only for package @hpcc-js/layout





# [2.49.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.48.1...@hpcc-js/layout@2.49.0) (2022-07-26)


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)





## [2.48.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.48.0...@hpcc-js/layout@2.48.1) (2022-06-23)



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)

**Note:** Version bump only for package @hpcc-js/layout





# [2.48.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.47.5...@hpcc-js/layout@2.48.0) (2022-04-27)


### Features

* **dgrid2:**  Add column formatting ([7a9db35](https://github.com/hpcc-systems/Visualization/commit/7a9db35fce57d94a4f3a58e88cebe1c10f2ab605))



## 2.103.1 (2022-04-20)





## [2.47.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.47.4...@hpcc-js/layout@2.47.5) (2022-04-20)



# 2.103.0 (2022-04-07)

**Note:** Version bump only for package @hpcc-js/layout





## [2.47.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.47.3...@hpcc-js/layout@2.47.4) (2022-04-07)


### Bug Fixes

*  Switch to grid2 for layout ([04c7345](https://github.com/hpcc-systems/Visualization/commit/04c7345437554a76f328011b070d92c1adef2aea))
* ChartPanel legend hides when dataVisible ([766e7bf](https://github.com/hpcc-systems/Visualization/commit/766e7bff659c8d0a138d54e6b3a23e1e13297c6b)), closes [#3932](https://github.com/hpcc-systems/Visualization/issues/3932)



## 2.102.11 (2022-03-24)





## [2.47.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.47.2...@hpcc-js/layout@2.47.3) (2022-03-24)



## 2.102.10 (2022-03-15)



## 2.102.9 (2022-03-15)



## 2.102.8 (2022-03-15)



## 2.102.7 (2022-03-14)



## 2.102.6 (2022-03-11)



## 2.102.5 (2022-03-11)



## 2.102.4 (2022-03-10)



## 2.102.3 (2022-03-10)



## 2.102.2 (2022-03-08)

**Note:** Version bump only for package @hpcc-js/layout





## [2.47.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.47.1...@hpcc-js/layout@2.47.2) (2022-03-08)



## 2.102.1 (2022-03-08)

**Note:** Version bump only for package @hpcc-js/layout





## [2.47.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.47.0...@hpcc-js/layout@2.47.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/layout





# [2.47.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.46.1...@hpcc-js/layout@2.47.0) (2022-03-07)


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





## [2.46.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.46.0...@hpcc-js/layout@2.46.1) (2022-03-04)

**Note:** Version bump only for package @hpcc-js/layout





# [2.46.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.46.0) (2022-02-23)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.45.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.45.0) (2022-02-18)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.44.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.44.0) (2022-02-10)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.43.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.43.0) (2022-02-10)


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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.42.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.42.0) (2022-02-09)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.41.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.41.0) (2022-01-20)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.40.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.40.0) (2022-01-19)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.39.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.39.0) (2021-11-08)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.38.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.38.0) (2021-10-15)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.37.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.37.0) (2021-10-15)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.36.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.36.0) (2021-10-03)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.35.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.35.0) (2021-09-08)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.34.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.34.0) (2021-08-25)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.33.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.33.0) (2021-08-04)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.32.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.32.0) (2021-08-04)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.31.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.31.0) (2021-08-04)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.30.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.30.0) (2021-07-28)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.29.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.29.0) (2021-07-16)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.28.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.28.0) (2021-07-02)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






# [2.27.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.27.0) (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.26.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.26.0) (2021-05-08)



# 2.62.0 (2021-04-29)



# 2.61.0 (2021-04-06)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.25.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.25.0) (2021-04-06)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.24.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.24.0) (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.23.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.23.0) (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.22.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.22.0) (2020-12-15)



# 2.50.0 (2020-12-01)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.21.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.21.0) (2020-12-01)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.20.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.20.0) (2020-11-10)


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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.19.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.19.0) (2020-10-23)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.18.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.18.0) (2020-10-09)


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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





# [2.17.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.17.0) (2020-10-08)


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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.16.46](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.46) (2020-09-09)



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



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.45](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.45) (2020-08-22)



# 2.33.0 (2020-08-08)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.44](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.44) (2020-08-08)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.43](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.43) (2020-08-05)



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



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.42](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.42) (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.41](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.41) (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout






## [2.16.40](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.40) (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.39](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.39) (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.38](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.38) (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.37](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.37) (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.36](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.36) (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.35](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.35) (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.34](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.34) (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.33](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.33) (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.32](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.32) (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.31](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.31) (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.30](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.30) (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.29](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.29) (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.28](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.28) (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.27](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.27) (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.26](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.26) (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.25](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.25) (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.24](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.24) (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.23](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.23) (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.22](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.22) (2020-04-11)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.21) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.19...@hpcc-js/layout@2.16.20) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.18...@hpcc-js/layout@2.16.19) (2020-04-03)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.17...@hpcc-js/layout@2.16.18) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.16...@hpcc-js/layout@2.16.17) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/layout






## [2.16.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.15...@hpcc-js/layout@2.16.16) (2020-03-20)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.14...@hpcc-js/layout@2.16.15) (2020-03-12)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.13...@hpcc-js/layout@2.16.14) (2020-03-05)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.12...@hpcc-js/layout@2.16.13) (2020-03-02)


### Bug Fixes

* **Legend:** _boundingBox may be undefined ([f6e957f](https://github.com/hpcc-systems/Visualization/commit/f6e957f0ef5d3dd244061cd16a446f6127a2c0de))





## [2.16.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.11...@hpcc-js/layout@2.16.12) (2020-02-14)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.10...@hpcc-js/layout@2.16.11) (2020-02-13)


### Bug Fixes

* Legend scrolling issue ([a207294](https://github.com/hpcc-systems/Visualization/commit/a2072941e3b4fe4c270fcb12763458528c41fefa))





## [2.16.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.9...@hpcc-js/layout@2.16.10) (2020-02-07)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.8...@hpcc-js/layout@2.16.9) (2020-02-04)


### Bug Fixes

* **Legend:** Add room for scrollbar to display ([b0cfc56](https://github.com/hpcc-systems/Visualization/commit/b0cfc56cb4808a2fb6b0c8da9e3dd9f75fc7e4fe)), closes [#3488](https://github.com/hpcc-systems/Visualization/issues/3488)





## [2.16.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.7...@hpcc-js/layout@2.16.8) (2020-01-29)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.6...@hpcc-js/layout@2.16.7) (2020-01-23)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.5...@hpcc-js/layout@2.16.6) (2020-01-22)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.4...@hpcc-js/layout@2.16.5) (2020-01-07)

**Note:** Version bump only for package @hpcc-js/layout






## [2.16.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.3...@hpcc-js/layout@2.16.4) (2019-12-11)


### Bug Fixes

* Legend text alignment adjusted for IE ([75e1dfb](https://github.com/hpcc-systems/Visualization/commit/75e1dfb)), closes [#3450](https://github.com/hpcc-systems/Visualization/issues/3450)





## [2.16.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.2...@hpcc-js/layout@2.16.3) (2019-10-11)

**Note:** Version bump only for package @hpcc-js/layout





## [2.16.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.1...@hpcc-js/layout@2.16.2) (2019-09-27)


### Bug Fixes

* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f82))





## [2.16.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.16.0...@hpcc-js/layout@2.16.1) (2019-09-26)

**Note:** Version bump only for package @hpcc-js/layout





# [2.16.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.15.1...@hpcc-js/layout@2.16.0) (2019-09-09)


### Features

* Add intuitive closing logic for flyout ([e5cff53](https://github.com/hpcc-systems/Visualization/commit/e5cff53)), closes [#3319](https://github.com/hpcc-systems/Visualization/issues/3319)





## [2.15.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.15.0...@hpcc-js/layout@2.15.1) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/layout





# [2.15.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.14.0...@hpcc-js/layout@2.15.0) (2019-08-30)


### Features

* **panel:** Add file download name options ([3e5b0a6](https://github.com/hpcc-systems/Visualization/commit/3e5b0a6)), closes [#3335](https://github.com/hpcc-systems/Visualization/issues/3335)





# [2.14.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.13.8...@hpcc-js/layout@2.14.0) (2019-08-13)


### Features

* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d681))





## [2.13.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.13.7...@hpcc-js/layout@2.13.8) (2019-08-07)


### Bug Fixes

* **Legend:** Fails to render when data is empty. ([939b776](https://github.com/hpcc-systems/Visualization/commit/939b776)), closes [#3351](https://github.com/hpcc-systems/Visualization/issues/3351)





## [2.13.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.13.6...@hpcc-js/layout@2.13.7) (2019-08-06)

**Note:** Version bump only for package @hpcc-js/layout





## [2.13.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.13.5...@hpcc-js/layout@2.13.6) (2019-08-01)

**Note:** Version bump only for package @hpcc-js/layout





## [2.13.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.13.4...@hpcc-js/layout@2.13.5) (2019-07-10)

**Note:** Version bump only for package @hpcc-js/layout






## [2.13.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.13.3...@hpcc-js/layout@2.13.4) (2019-07-03)

**Note:** Version bump only for package @hpcc-js/layout





## [2.13.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.13.2...@hpcc-js/layout@2.13.3) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/layout





## [2.13.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.13.1...@hpcc-js/layout@2.13.2) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/layout





## [2.13.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.13.0...@hpcc-js/layout@2.13.1) (2019-06-26)


### Bug Fixes

* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07))






# [2.13.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.12.9...@hpcc-js/layout@2.13.0) (2019-06-20)


### Bug Fixes

* Legend total translate fixed for IE ([2bc7541](https://github.com/hpcc-systems/Visualization/commit/2bc7541)), closes [#3281](https://github.com/hpcc-systems/Visualization/issues/3281)
* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf3))


### Features

* Add applyLayout to Grid ([5bd0dd3](https://github.com/hpcc-systems/Visualization/commit/5bd0dd3))
* **ChartPanel:** Download image includes legend (if visible) ([8c64922](https://github.com/hpcc-systems/Visualization/commit/8c64922)), closes [#3299](https://github.com/hpcc-systems/Visualization/issues/3299)
* **dashy:** Add dermatology upgrade script to ddl-shim ([72f2a46](https://github.com/hpcc-systems/Visualization/commit/72f2a46))





## [2.12.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.12.8...@hpcc-js/layout@2.12.9) (2019-06-14)

**Note:** Version bump only for package @hpcc-js/layout






## [2.12.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.12.7...@hpcc-js/layout@2.12.8) (2019-05-16)


### Bug Fixes

* Changed d3 style use to v4+ format ([f79f272](https://github.com/hpcc-systems/Visualization/commit/f79f272)), closes [#3250](https://github.com/hpcc-systems/Visualization/issues/3250)






## [2.12.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.12.6...@hpcc-js/layout@2.12.7) (2019-04-27)

**Note:** Version bump only for package @hpcc-js/layout






## [2.12.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.12.2...@hpcc-js/layout@2.12.6) (2019-04-06)

**Note:** Version bump only for package @hpcc-js/layout






## [2.12.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.12.2...@hpcc-js/layout@2.12.4) (2019-04-05)

**Note:** Version bump only for package @hpcc-js/graph






## [2.12.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.12.2...@hpcc-js/layout@2.12.3) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/layout






## [2.12.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.12.1...@hpcc-js/layout@2.12.2) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/layout






## [2.12.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.10.0...@hpcc-js/layout@2.12.1) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/layout






# [2.12.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.8.0...@hpcc-js/layout@2.12.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/graph






# [2.11.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.8.0...@hpcc-js/layout@2.11.0) (2019-04-01)

**Note:** Version bump only for package @hpcc-js/graph






# [2.10.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.8.0...@hpcc-js/layout@2.10.0) (2019-03-29)

**Note:** Version bump only for package @hpcc-js/graph






# [2.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.8.0...@hpcc-js/layout@2.9.0) (2019-03-21)


### Bug Fixes

* **legend:** Issue with numeric labels ([b43e4ff](https://github.com/hpcc-systems/Visualization/commit/b43e4ff))


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))
* **SVGWidget:** Allow SVG Widgets to Scroll ([df283f9](https://github.com/hpcc-systems/Visualization/commit/df283f9))






# [2.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.7.0...@hpcc-js/layout@2.8.0) (2019-03-07)


### Features

* **FlexBox:** Add option to force scroll bars ([11e3ce7](https://github.com/hpcc-systems/Visualization/commit/11e3ce7))






# [2.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.6.5...@hpcc-js/layout@2.7.0) (2019-03-06)


### Features

* **Legend:** Add max label width for legend ([073d09c](https://github.com/hpcc-systems/Visualization/commit/073d09c)), closes [#3154](https://github.com/hpcc-systems/Visualization/issues/3154)






## [2.6.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.6.4...@hpcc-js/layout@2.6.5) (2019-02-20)


### Bug Fixes

* **Legend:** Regression causing issues with legend clicks ([285ddbe](https://github.com/hpcc-systems/Visualization/commit/285ddbe)), closes [#3134](https://github.com/hpcc-systems/Visualization/issues/3134)






## [2.6.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.6.3...@hpcc-js/layout@2.6.4) (2019-02-19)


### Bug Fixes

* **marshaller:** Add missing "flyout" capability ([1f75e11](https://github.com/hpcc-systems/Visualization/commit/1f75e11))
* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2))






## [2.6.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.6.2...@hpcc-js/layout@2.6.3) (2019-01-29)

**Note:** Version bump only for package @hpcc-js/layout






## [2.6.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.6.1...@hpcc-js/layout@2.6.2) (2019-01-08)


### Bug Fixes

* **ie11:** Fixed IE11 Border2 flex issue ([3814cd9](https://github.com/hpcc-systems/Visualization/commit/3814cd9)), closes [#3055](https://github.com/hpcc-systems/Visualization/issues/3055)






## [2.6.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.6.0...@hpcc-js/layout@2.6.1) (2018-12-13)

**Note:** Version bump only for package @hpcc-js/layout






# [2.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.5.2...@hpcc-js/layout@2.6.0) (2018-12-06)


### Features

* **titlebar:** Add description functionality ([fbb1d80](https://github.com/hpcc-systems/Visualization/commit/fbb1d80)), closes [#3030](https://github.com/hpcc-systems/Visualization/issues/3030)






## [2.5.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.5.1...@hpcc-js/layout@2.5.2) (2018-12-04)


### Bug Fixes

* **legend:** Summing legend totals via dataFamily ([46ff93f](https://github.com/hpcc-systems/Visualization/commit/46ff93f))






## [2.5.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.5.0...@hpcc-js/layout@2.5.1) (2018-11-27)


### Bug Fixes

* **legend:** Summing series correctly ([ea89530](https://github.com/hpcc-systems/Visualization/commit/ea89530)), closes [#2991](https://github.com/hpcc-systems/Visualization/issues/2991)






<a name="2.5.0"></a>
# [2.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.4.0...@hpcc-js/layout@2.5.0) (2018-11-26)


### Bug Fixes

* **ChartPanel:** Add missing render callback call. ([b36f677](https://github.com/hpcc-systems/Visualization/commit/b36f677))


### Features

* **toolbar:** Add selection group ([d6849ae](https://github.com/hpcc-systems/Visualization/commit/d6849ae))





<a name="2.4.0"></a>
# [2.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.3.1...@hpcc-js/layout@2.4.0) (2018-11-09)


### Bug Fixes

* **legend:** Limiting legend value sums by columns ([af994e2](https://github.com/hpcc-systems/Visualization/commit/af994e2))


### Features

* **readme:** Add packages/layout/README.md ([5ff0a39](https://github.com/hpcc-systems/Visualization/commit/5ff0a39))





<a name="2.3.1"></a>
## [2.3.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.3.0...@hpcc-js/layout@2.3.1) (2018-11-08)


### Bug Fixes

* **FlexGrid:** Add exit/remove to FlexGrid.ts ([99b43df](https://github.com/hpcc-systems/Visualization/commit/99b43df)), closes [#2964](https://github.com/hpcc-systems/Visualization/issues/2964)





<a name="2.3.0"></a>
# [2.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.2.0...@hpcc-js/layout@2.3.0) (2018-10-30)


### Features

* Add 4 new layout widgets ([46d6051](https://github.com/hpcc-systems/Visualization/commit/46d6051)), closes [#2891](https://github.com/hpcc-systems/Visualization/issues/2891)
* Layered.ts can give placement to layers ([2d56383](https://github.com/hpcc-systems/Visualization/commit/2d56383))





<a name="2.2.0"></a>
# [2.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.1.3...@hpcc-js/layout@2.2.0) (2018-10-05)


### Features

* Add option to show legend values ([ccc0c6c](https://github.com/hpcc-systems/Visualization/commit/ccc0c6c)), closes [#2887](https://github.com/hpcc-systems/Visualization/issues/2887) [#2892](https://github.com/hpcc-systems/Visualization/issues/2892)
* Add pie series percentages ([cc2493f](https://github.com/hpcc-systems/Visualization/commit/cc2493f)), closes [#2888](https://github.com/hpcc-systems/Visualization/issues/2888)





<a name="2.1.3"></a>
## [2.1.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.1.2...@hpcc-js/layout@2.1.3) (2018-09-25)

**Note:** Version bump only for package @hpcc-js/layout





<a name="2.1.2"></a>
## [2.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.1.1...@hpcc-js/layout@2.1.2) (2018-09-24)


### Bug Fixes

* **Carousel:** Carousel should not render when hidden ([4a08063](https://github.com/hpcc-systems/Visualization/commit/4a08063))
* **layout:** Grid layout not rendering. ([861689b](https://github.com/hpcc-systems/Visualization/commit/861689b))





<a name="2.1.1"></a>
## [2.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.1.0...@hpcc-js/layout@2.1.1) (2018-09-10)


### Bug Fixes

* **ChartPanel:** Legend toggle not refreshing columns ([7841145](https://github.com/hpcc-systems/Visualization/commit/7841145)), closes [#2835](https://github.com/hpcc-systems/Visualization/issues/2835)
* **Legend:** Legend should use "fillColor" when available ([aadb4d5](https://github.com/hpcc-systems/Visualization/commit/aadb4d5)), closes [#2842](https://github.com/hpcc-systems/Visualization/issues/2842)





<a name="2.1.0"></a>
# [2.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@2.0.0...@hpcc-js/layout@2.1.0) (2018-09-01)


### Bug Fixes

* **legend:**  Legend incorrect for 2D charts ([2aefc66](https://github.com/hpcc-systems/Visualization/commit/2aefc66)), closes [#2814](https://github.com/hpcc-systems/Visualization/issues/2814)
* **legend:** Show/Hide series was not refreshing correctly ([61e975c](https://github.com/hpcc-systems/Visualization/commit/61e975c)), closes [#2812](https://github.com/hpcc-systems/Visualization/issues/2812)


### Features

* **ChartPanel:**  Add API for toolbar buttons ([c87656b](https://github.com/hpcc-systems/Visualization/commit/c87656b)), closes [#2813](https://github.com/hpcc-systems/Visualization/issues/2813)





<a name="2.0.0"></a>
# [2.0.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.4.0...@hpcc-js/layout@2.0.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/layout





<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.4.0...@hpcc-js/layout@2.0.0-rc.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/layout





<a name="0.4.0"></a>
# [0.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.21...@hpcc-js/layout@0.4.0) (2018-08-23)


### Features

* **legend:** Add legend for HexBin and Contour ([21a2ee8](https://github.com/hpcc-systems/Visualization/commit/21a2ee8))




<a name="0.3.21"></a>
## [0.3.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.20...@hpcc-js/layout@0.3.21) (2018-08-15)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.20"></a>
## [0.3.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.19...@hpcc-js/layout@0.3.20) (2018-08-15)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.19"></a>
## [0.3.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.18...@hpcc-js/layout@0.3.19) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.18"></a>
## [0.3.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.17...@hpcc-js/layout@0.3.18) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.17"></a>
## [0.3.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.16...@hpcc-js/layout@0.3.17) (2018-08-12)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.16"></a>
## [0.3.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.15...@hpcc-js/layout@0.3.16) (2018-08-10)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.15"></a>
## [0.3.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.14...@hpcc-js/layout@0.3.15) (2018-08-07)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.14"></a>
## [0.3.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.13...@hpcc-js/layout@0.3.14) (2018-08-02)


### Bug Fixes

* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ad))




<a name="0.3.13"></a>
## [0.3.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.12...@hpcc-js/layout@0.3.13) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.12"></a>
## [0.3.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.11...@hpcc-js/layout@0.3.12) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.11"></a>
## [0.3.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.10...@hpcc-js/layout@0.3.11) (2018-07-29)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.10"></a>
## [0.3.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.9...@hpcc-js/layout@0.3.10) (2018-07-29)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.9"></a>
## [0.3.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.8...@hpcc-js/layout@0.3.9) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.8"></a>
## [0.3.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.7...@hpcc-js/layout@0.3.8) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.7"></a>
## [0.3.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.6...@hpcc-js/layout@0.3.7) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.6"></a>
## [0.3.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.5...@hpcc-js/layout@0.3.6) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.5"></a>
## [0.3.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.4...@hpcc-js/layout@0.3.5) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.4"></a>
## [0.3.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.3...@hpcc-js/layout@0.3.4) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.3"></a>
## [0.3.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.2...@hpcc-js/layout@0.3.3) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.2"></a>
## [0.3.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.1...@hpcc-js/layout@0.3.2) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.1"></a>
## [0.3.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.3.0...@hpcc-js/layout@0.3.1) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.3.0"></a>
# [0.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.2.9...@hpcc-js/layout@0.3.0) (2018-07-27)


### Features

* **panel:** Add _hideToggleLegendList ([616bc77](https://github.com/hpcc-systems/Visualization/commit/616bc77))




<a name="0.2.9"></a>
## [0.2.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.2.8...@hpcc-js/layout@0.2.9) (2018-07-02)


### Bug Fixes

* **lint:** Fixed lint issue with Modal.ts ([85e987b](https://github.com/hpcc-systems/Visualization/commit/85e987b))




<a name="0.2.8"></a>
## [0.2.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.2.7...@hpcc-js/layout@0.2.8) (2018-06-28)


### Bug Fixes

* **modal:** Add fixedHeight and fixedWidth to v2 ([ac01f4e](https://github.com/hpcc-systems/Visualization/commit/ac01f4e))




<a name="0.2.7"></a>
## [0.2.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.2.6...@hpcc-js/layout@0.2.7) (2018-06-22)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.2.6"></a>
## [0.2.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.2.5...@hpcc-js/layout@0.2.6) (2018-06-20)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.2.5"></a>
## [0.2.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.2.4...@hpcc-js/layout@0.2.5) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.2.4"></a>
## [0.2.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.2.3...@hpcc-js/layout@0.2.4) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.2.3"></a>
## [0.2.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.2.2...@hpcc-js/layout@0.2.3) (2018-06-19)


### Bug Fixes

* Minor layout render timing issues ([a85d084](https://github.com/hpcc-systems/Visualization/commit/a85d084))




<a name="0.2.2"></a>
## [0.2.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.2.1...@hpcc-js/layout@0.2.2) (2018-06-15)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.2.1"></a>
## [0.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.2.0...@hpcc-js/layout@0.2.1) (2018-06-14)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.2.0"></a>
# [0.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.1.7...@hpcc-js/layout@0.2.0) (2018-06-01)


### Features

* ChartPanel title hide and overlay options ([685710f](https://github.com/hpcc-systems/Visualization/commit/685710f))




<a name="0.1.7"></a>
## [0.1.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.1.6...@hpcc-js/layout@0.1.7) (2018-05-28)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.1.6"></a>
## [0.1.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.1.5...@hpcc-js/layout@0.1.6) (2018-05-21)


### Bug Fixes

* MiniGantt click event was non standard ([988012a](https://github.com/hpcc-systems/Visualization/commit/988012a))




<a name="0.1.5"></a>
## [0.1.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.1.4...@hpcc-js/layout@0.1.5) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.1.4"></a>
## [0.1.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.1.3...@hpcc-js/layout@0.1.4) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.1.3"></a>
## [0.1.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.1.2...@hpcc-js/layout@0.1.3) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.1.2"></a>
## [0.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.1.1...@hpcc-js/layout@0.1.2) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.1.1"></a>
## [0.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.1.0...@hpcc-js/layout@0.1.1) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/layout

<a name="0.1.0"></a>
# [0.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/layout@0.0.77...@hpcc-js/layout@0.1.0) (2018-05-16)


### Features

* Add GMap US Counties ([12bae45](https://github.com/hpcc-systems/Visualization/commit/12bae45)), closes [#2554](https://github.com/hpcc-systems/Visualization/issues/2554)
* Graph support in the marshaller ([bcc2290](https://github.com/hpcc-systems/Visualization/commit/bcc2290)), closes [#2559](https://github.com/hpcc-systems/Visualization/issues/2559)
