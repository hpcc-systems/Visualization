# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.53.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.53.0...@hpcc-js/timeline@2.53.1) (2024-08-22)



## 2.106.3 (2024-08-01)

**Note:** Version bump only for package @hpcc-js/timeline






# [2.53.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.52.1...@hpcc-js/timeline@2.53.0) (2024-08-01)


### Features

*  Expose Gantt selection method ([4faf833](https://github.com/hpcc-systems/Visualization/commit/4faf83336f693b7d7a651bbbe2c0ea7a63ad72eb))



## 2.106.2 (2024-07-29)



## 2.106.1 (2024-07-24)





## [2.52.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.52.0...@hpcc-js/timeline@2.52.1) (2024-07-24)



# 2.106.0 (2024-07-23)

**Note:** Version bump only for package @hpcc-js/timeline





# 2.52.0 (2024-07-23)


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)
* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f8273e454c4b103e0ed1965c18542f125482))
* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07379e59081c930d61485764e78c8a07a90))
* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf369d6d4081f0f5d9285bf3b1fd9b5b5999))
* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ada4d7aad0ffe9ea5cf004b49ccec6710de))
* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2c956601f3b4740917c4c35896f7f6c1c4))
* MiniGantt click event was non standard ([988012a](https://github.com/hpcc-systems/Visualization/commit/988012a8803551fcbd52c5462433b92fc4a345a5))
* **MiniGantt:** Fix corner case when data.length === 0 ([2e5b0de](https://github.com/hpcc-systems/Visualization/commit/2e5b0de10a4bf24101ef1e3b8333a1c90398afa3))
* **timeline:** Axis is adjusted according to maxYOffset ([4e8444a](https://github.com/hpcc-systems/Visualization/commit/4e8444a323b371036672353004ae9426a8ae6faa)), closes [#2773](https://github.com/hpcc-systems/Visualization/issues/2773)
* **timeline:** Calc EntityPin height ([1fd4ea3](https://github.com/hpcc-systems/Visualization/commit/1fd4ea3712d268bc83661ea8d835c15f7c4f4b5c))
* **timeline:** Event Only fails on FF with ([9c47911](https://github.com/hpcc-systems/Visualization/commit/9c4791164f76f2175ab40f875345e8b963f5d297)), closes [#2754](https://github.com/hpcc-systems/Visualization/issues/2754)
* **timeline:** Revert to "nice" tick formats ([2835a92](https://github.com/hpcc-systems/Visualization/commit/2835a921bed81af7bd04588cb3d6491baa03eae9))


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))
* Add bucketColumn to ReactGantt ([8cba4a1](https://github.com/hpcc-systems/Visualization/commit/8cba4a1081c5c78ac36a27dcb1aaaa2f349113bf))
* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))
* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))
* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))
* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d6819c6fd166f74e7385446dd477e8a1cdd01))
* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))
* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfacc1b162f1a5d02b06d434375424b7d225f))
* **readme:** Add README.md to timeline package ([708e69a](https://github.com/hpcc-systems/Visualization/commit/708e69a4d7b5be397841b149b58d4dff38de7834))
* **timeline:** Add centerOnMostRecent to MiniGantt ([fc87ae6](https://github.com/hpcc-systems/Visualization/commit/fc87ae6c72384611fb449857ab3e4f88bb447294)), closes [#3141](https://github.com/hpcc-systems/Visualization/issues/3141)
* **timeline:** Add EntityPin to timeline ([bab1b06](https://github.com/hpcc-systems/Visualization/commit/bab1b065bbab6efd6e2f657d51a0f0e7ccbd23c3))
* **timeline:** Add EntityPin to timeline ([25ce344](https://github.com/hpcc-systems/Visualization/commit/25ce344859a7803e404572fd5d2c6d39f280575d))
* **timeline:** Add event color parameters ([00791dd](https://github.com/hpcc-systems/Visualization/commit/00791dda22269084a74aa309d90fb4922d6ab4b6)), closes [#2654](https://github.com/hpcc-systems/Visualization/issues/2654)
* **timeline:** Add maxZoom and EntityPin collapse options ([d0198ce](https://github.com/hpcc-systems/Visualization/commit/d0198ce63bb07b0dcd5aafdaa7d60c49f1acd4ff))
* **timeline:** Add several features to MiniGantt ([90e8765](https://github.com/hpcc-systems/Visualization/commit/90e8765fcf1adb975a0facf4dd8ef1d2bd1ebeb4)), closes [#2676](https://github.com/hpcc-systems/Visualization/issues/2676) [#2674](https://github.com/hpcc-systems/Visualization/issues/2674)
* **timeline:** Add yOffsetColumn to MiniGantt.ts ([3ffa687](https://github.com/hpcc-systems/Visualization/commit/3ffa687bf5bc740c556f43a648adac97c713c09c)), closes [#2746](https://github.com/hpcc-systems/Visualization/issues/2746)
* **timeline:** Improved icon handling ([25819ba](https://github.com/hpcc-systems/Visualization/commit/25819bae4821e3e693d5d90850c873967f1dd5b5))
* **timeline:** Various improvements to MiniGantt ([3a7375d](https://github.com/hpcc-systems/Visualization/commit/3a7375df7ca8262b99702cc3af65e7b0d2dd636f)), closes [#2585](https://github.com/hpcc-systems/Visualization/issues/2585) [#2584](https://github.com/hpcc-systems/Visualization/issues/2584) [#2583](https://github.com/hpcc-systems/Visualization/issues/2583)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))
* Revert "chore: Rework shim inclusion" ([462d55c](https://github.com/hpcc-systems/Visualization/commit/462d55c0b89cb74c6f2aacc29ccafebaf5a2c46c))






## [2.51.26](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.25...@hpcc-js/timeline@2.51.26) (2024-07-02)



## 2.105.11 (2024-06-25)



## 2.105.10 (2024-06-19)



## 2.105.9 (2024-05-24)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.25](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.24...@hpcc-js/timeline@2.51.25) (2024-05-24)



## 2.105.8 (2024-04-24)



## 2.105.7 (2024-04-22)



## 2.105.6 (2024-04-17)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.24](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.23...@hpcc-js/timeline@2.51.24) (2024-04-17)



## 2.105.5 (2024-03-28)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.23](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.22...@hpcc-js/timeline@2.51.23) (2024-03-28)



## 2.105.4 (2024-03-21)



## 2.105.3 (2024-03-19)



## 2.105.2 (2024-03-15)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.22](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.21...@hpcc-js/timeline@2.51.22) (2024-03-15)



## 2.105.1 (2024-03-15)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.20...@hpcc-js/timeline@2.51.21) (2024-03-15)



# 2.105.0 (2024-03-08)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.19...@hpcc-js/timeline@2.51.20) (2024-03-08)



## 2.104.42 (2024-02-28)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.18...@hpcc-js/timeline@2.51.19) (2024-02-28)



## 2.104.41 (2024-02-16)



## 2.104.40 (2024-02-15)



## 2.104.39 (2024-02-06)



## 2.104.38 (2024-02-06)



## 2.104.37 (2024-01-25)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.17...@hpcc-js/timeline@2.51.18) (2024-01-25)



## 2.104.36 (2024-01-23)



## 2.104.35 (2024-01-18)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.16...@hpcc-js/timeline@2.51.17) (2024-01-18)



## 2.104.34 (2024-01-02)



## 2.104.33 (2023-11-16)



## 2.104.32 (2023-11-09)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.51.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.15...@hpcc-js/timeline@2.51.16) (2023-11-09)



## 2.104.31 (2023-11-03)



## 2.104.30 (2023-10-26)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.51.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.14...@hpcc-js/timeline@2.51.15) (2023-10-26)



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.13...@hpcc-js/timeline@2.51.14) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.12...@hpcc-js/timeline@2.51.13) (2023-09-14)



## 2.104.25 (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.11...@hpcc-js/timeline@2.51.12) (2023-06-08)



## 2.104.19 (2023-03-14)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.10...@hpcc-js/timeline@2.51.11) (2023-03-14)



## 2.104.18 (2023-02-22)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.9...@hpcc-js/timeline@2.51.10) (2023-02-22)



## 2.104.17 (2023-01-20)



## 2.104.16 (2023-01-19)



## 2.104.15 (2022-11-15)



## 2.104.14 (2022-11-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.8...@hpcc-js/timeline@2.51.9) (2022-11-11)



## 2.104.13 (2022-11-09)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.51.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.7...@hpcc-js/timeline@2.51.8) (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.51.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.6...@hpcc-js/timeline@2.51.7) (2022-10-11)



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)



## 2.104.8 (2022-09-29)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.5...@hpcc-js/timeline@2.51.6) (2022-09-29)



## 2.104.7 (2022-09-28)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.4...@hpcc-js/timeline@2.51.5) (2022-09-28)



## 2.104.6 (2022-09-21)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.3...@hpcc-js/timeline@2.51.4) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.2...@hpcc-js/timeline@2.51.3) (2022-08-18)



## 2.104.2 (2022-08-17)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.1...@hpcc-js/timeline@2.51.2) (2022-08-17)



## 2.104.1 (2022-08-16)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.51.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.51.0...@hpcc-js/timeline@2.51.1) (2022-08-16)



# 2.104.0 (2022-07-26)

**Note:** Version bump only for package @hpcc-js/timeline





# [2.51.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.50.8...@hpcc-js/timeline@2.51.0) (2022-07-26)


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)





## [2.50.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.50.7...@hpcc-js/timeline@2.50.8) (2022-06-23)



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.50.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.50.6...@hpcc-js/timeline@2.50.7) (2022-04-27)



## 2.103.1 (2022-04-20)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.50.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.50.5...@hpcc-js/timeline@2.50.6) (2022-04-20)



# 2.103.0 (2022-04-07)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.50.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.50.4...@hpcc-js/timeline@2.50.5) (2022-04-07)



## 2.102.11 (2022-03-24)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.50.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.50.3...@hpcc-js/timeline@2.50.4) (2022-03-24)



## 2.102.10 (2022-03-15)



## 2.102.9 (2022-03-15)



## 2.102.8 (2022-03-15)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.50.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.50.2...@hpcc-js/timeline@2.50.3) (2022-03-15)



## 2.102.7 (2022-03-14)



## 2.102.6 (2022-03-11)



## 2.102.5 (2022-03-11)



## 2.102.4 (2022-03-10)



## 2.102.3 (2022-03-10)



## 2.102.2 (2022-03-08)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.50.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.50.1...@hpcc-js/timeline@2.50.2) (2022-03-08)



## 2.102.1 (2022-03-08)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.50.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.50.0...@hpcc-js/timeline@2.50.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/timeline





# [2.50.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.49.1...@hpcc-js/timeline@2.50.0) (2022-03-07)


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





## [2.49.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.49.0...@hpcc-js/timeline@2.49.1) (2022-03-04)

**Note:** Version bump only for package @hpcc-js/timeline





# [2.49.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.49.0) (2022-02-23)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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






# [2.48.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.48.0) (2022-02-18)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.47.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.47.0) (2022-02-10)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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






# [2.46.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.46.0) (2022-02-10)


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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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






# [2.45.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.45.0) (2022-02-09)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.44.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.44.0) (2022-01-20)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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






# [2.43.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.43.0) (2022-01-19)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.42.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.42.0) (2021-11-08)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.41.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.41.0) (2021-10-15)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.40.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.40.0) (2021-10-15)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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






# [2.39.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.39.0) (2021-10-03)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.38.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.38.0) (2021-09-08)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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






# [2.37.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.37.0) (2021-08-25)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.36.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.36.0) (2021-08-04)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.35.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.35.0) (2021-08-04)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.34.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.34.0) (2021-08-04)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.33.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.33.0) (2021-07-28)


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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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






# [2.32.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.32.0) (2021-07-16)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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






# [2.31.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.31.0) (2021-07-02)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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






# [2.30.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.30.0) (2021-06-15)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.29.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.29.0) (2021-05-19)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.28.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.28.0) (2021-05-08)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.27.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.27.0) (2021-04-06)



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


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.26.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.26.0) (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.25.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.25.0) (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.24.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.24.0) (2020-12-15)



# 2.50.0 (2020-12-01)


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.23.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.23.0) (2020-12-01)


### Bug Fixes

* Add deselection to ReactGantt ([af0a27f](https://github.com/hpcc-systems/Visualization/commit/af0a27f908794e01a825a4bc7614264f4ce43247)), closes [#3735](https://github.com/hpcc-systems/Visualization/issues/3735)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.22.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.22.0) (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.21.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.21.0) (2020-10-23)



# 2.45.0 (2020-10-16)



# 2.44.0 (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.20.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.20.0) (2020-10-09)


### Features

* Add timeline series widgets ([ac28b3c](https://github.com/hpcc-systems/Visualization/commit/ac28b3c16d6631df467f1e5b01bc94a1e6ff9421))



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.19.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.19.0) (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.18.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.18.0) (2020-09-09)



# 2.38.0 (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.17.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.17.0) (2020-09-03)



# 2.37.0 (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.16.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.16.0) (2020-08-26)



# 2.36.0 (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.15.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.15.0) (2020-08-25)



# 2.35.0 (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.14.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.14.0) (2020-08-24)


### Features

* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.13.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.13.0) (2020-08-22)



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


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.12.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.12.0) (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.11.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.11.0) (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.10.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.10.0) (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





# [2.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.9.0) (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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






# [2.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.8.0) (2020-06-24)


### Features

* Improved MiniGantt render performance ([1cc51db](https://github.com/hpcc-systems/Visualization/commit/1cc51db30cc12889bb0cbc9852c48b70611952d3))



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





## [2.7.36](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.36) (2020-06-23)



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

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.35](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.35) (2020-06-17)



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

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.34](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.34) (2020-06-17)



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

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.33](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.33) (2020-06-15)



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

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.32](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.32) (2020-05-31)



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

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.31](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.31) (2020-05-21)



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

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.30](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.30) (2020-05-20)



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

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.29](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.29) (2020-05-20)



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

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.28](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.28) (2020-05-19)



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

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.27](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.27) (2020-05-15)



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

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.26](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.26) (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.25](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.25) (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.24](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.24) (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.23](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.23) (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.22](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.22) (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.21) (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.20) (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.19) (2020-04-11)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.18) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.16...@hpcc-js/timeline@2.7.17) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.15...@hpcc-js/timeline@2.7.16) (2020-04-03)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.14...@hpcc-js/timeline@2.7.15) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.13...@hpcc-js/timeline@2.7.14) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.7.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.12...@hpcc-js/timeline@2.7.13) (2020-03-20)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.11...@hpcc-js/timeline@2.7.12) (2020-03-02)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.10...@hpcc-js/timeline@2.7.11) (2020-02-04)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.9...@hpcc-js/timeline@2.7.10) (2020-01-23)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.8...@hpcc-js/timeline@2.7.9) (2020-01-22)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.7...@hpcc-js/timeline@2.7.8) (2020-01-07)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.7.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.6...@hpcc-js/timeline@2.7.7) (2019-12-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.5...@hpcc-js/timeline@2.7.6) (2019-10-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.4...@hpcc-js/timeline@2.7.5) (2019-10-08)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.3...@hpcc-js/timeline@2.7.4) (2019-09-27)


### Bug Fixes

* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f82))





## [2.7.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.2...@hpcc-js/timeline@2.7.3) (2019-09-26)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.1...@hpcc-js/timeline@2.7.2) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.7.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.7.0...@hpcc-js/timeline@2.7.1) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/timeline





# [2.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.17...@hpcc-js/timeline@2.7.0) (2019-08-13)


### Features

* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d681))





## [2.6.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.16...@hpcc-js/timeline@2.6.17) (2019-08-06)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.6.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.15...@hpcc-js/timeline@2.6.16) (2019-08-01)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.6.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.14...@hpcc-js/timeline@2.6.15) (2019-07-10)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.6.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.13...@hpcc-js/timeline@2.6.14) (2019-07-04)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.6.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.12...@hpcc-js/timeline@2.6.13) (2019-07-03)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.6.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.11...@hpcc-js/timeline@2.6.12) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.6.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.10...@hpcc-js/timeline@2.6.11) (2019-06-26)


### Bug Fixes

* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07))






## [2.6.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.9...@hpcc-js/timeline@2.6.10) (2019-06-20)


### Bug Fixes

* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf3))





## [2.6.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.8...@hpcc-js/timeline@2.6.9) (2019-06-14)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.6.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.7...@hpcc-js/timeline@2.6.8) (2019-05-16)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.6.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.6...@hpcc-js/timeline@2.6.7) (2019-04-27)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.6.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.2...@hpcc-js/timeline@2.6.6) (2019-04-06)



## [2.6.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.2...@hpcc-js/timeline@2.6.4) (2019-04-05)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.6.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.2...@hpcc-js/timeline@2.6.3) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.6.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.6.1...@hpcc-js/timeline@2.6.2) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.6.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.4.0...@hpcc-js/timeline@2.6.1) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/timeline






# [2.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.2.2...@hpcc-js/timeline@2.6.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/timeline






# [2.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.2.2...@hpcc-js/timeline@2.5.0) (2019-04-01)

**Note:** Version bump only for package @hpcc-js/timeline






# [2.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.2.2...@hpcc-js/timeline@2.4.0) (2019-03-29)

**Note:** Version bump only for package @hpcc-js/timeline






# [2.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.2.2...@hpcc-js/timeline@2.3.0) (2019-03-21)


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))






## [2.2.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.2.1...@hpcc-js/timeline@2.2.2) (2019-03-11)

**Note:** Version bump only for package @hpcc-js/timeline





## [2.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.2.0...@hpcc-js/timeline@2.2.1) (2019-03-07)

**Note:** Version bump only for package @hpcc-js/timeline






# [2.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.1.2...@hpcc-js/timeline@2.2.0) (2019-03-06)


### Features

* **timeline:** Add centerOnMostRecent to MiniGantt ([fc87ae6](https://github.com/hpcc-systems/Visualization/commit/fc87ae6)), closes [#3141](https://github.com/hpcc-systems/Visualization/issues/3141)






## [2.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.1.1...@hpcc-js/timeline@2.1.2) (2019-02-20)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.1.0...@hpcc-js/timeline@2.1.1) (2019-02-19)


### Bug Fixes

* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2))






# [2.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.14...@hpcc-js/timeline@2.1.0) (2019-01-29)


### Features

* **readme:** Add README.md to timeline package ([708e69a](https://github.com/hpcc-systems/Visualization/commit/708e69a))






## [2.0.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.13...@hpcc-js/timeline@2.0.14) (2019-01-08)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.0.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.12...@hpcc-js/timeline@2.0.13) (2018-12-13)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.0.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.11...@hpcc-js/timeline@2.0.12) (2018-12-06)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.0.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.10...@hpcc-js/timeline@2.0.11) (2018-12-04)

**Note:** Version bump only for package @hpcc-js/timeline






## [2.0.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.9...@hpcc-js/timeline@2.0.10) (2018-11-27)

**Note:** Version bump only for package @hpcc-js/timeline






<a name="2.0.9"></a>
## [2.0.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.8...@hpcc-js/timeline@2.0.9) (2018-11-26)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="2.0.8"></a>
## [2.0.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.7...@hpcc-js/timeline@2.0.8) (2018-11-09)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="2.0.7"></a>
## [2.0.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.6...@hpcc-js/timeline@2.0.7) (2018-11-08)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="2.0.6"></a>
## [2.0.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.5...@hpcc-js/timeline@2.0.6) (2018-10-30)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="2.0.5"></a>
## [2.0.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.4...@hpcc-js/timeline@2.0.5) (2018-10-15)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="2.0.4"></a>
## [2.0.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.3...@hpcc-js/timeline@2.0.4) (2018-10-05)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="2.0.3"></a>
## [2.0.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.2...@hpcc-js/timeline@2.0.3) (2018-09-24)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="2.0.2"></a>
## [2.0.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.1...@hpcc-js/timeline@2.0.2) (2018-09-10)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="2.0.1"></a>
## [2.0.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@2.0.0...@hpcc-js/timeline@2.0.1) (2018-09-01)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="2.0.0"></a>
# [2.0.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.7.5...@hpcc-js/timeline@2.0.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.7.5...@hpcc-js/timeline@2.0.0-rc.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/timeline





<a name="0.7.5"></a>
## [0.7.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.7.4...@hpcc-js/timeline@0.7.5) (2018-08-23)


### Bug Fixes

* **timeline:** Revert to "nice" tick formats ([2835a92](https://github.com/hpcc-systems/Visualization/commit/2835a92))




<a name="0.7.4"></a>
## [0.7.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.7.3...@hpcc-js/timeline@0.7.4) (2018-08-15)


### Bug Fixes

* **timeline:** Event Only fails on FF with ([9c47911](https://github.com/hpcc-systems/Visualization/commit/9c47911)), closes [#2754](https://github.com/hpcc-systems/Visualization/issues/2754)




<a name="0.7.3"></a>
## [0.7.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.7.2...@hpcc-js/timeline@0.7.3) (2018-08-15)


### Bug Fixes

* **timeline:** Axis is adjusted according to maxYOffset ([4e8444a](https://github.com/hpcc-systems/Visualization/commit/4e8444a)), closes [#2773](https://github.com/hpcc-systems/Visualization/issues/2773)




<a name="0.7.2"></a>
## [0.7.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.7.1...@hpcc-js/timeline@0.7.2) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.7.1"></a>
## [0.7.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.7.0...@hpcc-js/timeline@0.7.1) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.7.0"></a>
# [0.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.6.0...@hpcc-js/timeline@0.7.0) (2018-08-10)


### Features

* **timeline:** Add yOffsetColumn to MiniGantt.ts ([3ffa687](https://github.com/hpcc-systems/Visualization/commit/3ffa687)), closes [#2746](https://github.com/hpcc-systems/Visualization/issues/2746)




<a name="0.6.0"></a>
# [0.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.5.0...@hpcc-js/timeline@0.6.0) (2018-08-07)


### Features

* **timeline:** Add several features to MiniGantt ([90e8765](https://github.com/hpcc-systems/Visualization/commit/90e8765)), closes [#2676](https://github.com/hpcc-systems/Visualization/issues/2676) [#2674](https://github.com/hpcc-systems/Visualization/issues/2674)




<a name="0.5.0"></a>
# [0.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.13...@hpcc-js/timeline@0.5.0) (2018-08-02)


### Bug Fixes

* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ad))
* **MiniGantt:** Fix corner case when data.length === 0 ([2e5b0de](https://github.com/hpcc-systems/Visualization/commit/2e5b0de))


### Features

* **timeline:** Improved icon handling ([25819ba](https://github.com/hpcc-systems/Visualization/commit/25819ba))
* **timeline:** Various improvements to MiniGantt ([3a7375d](https://github.com/hpcc-systems/Visualization/commit/3a7375d)), closes [#2585](https://github.com/hpcc-systems/Visualization/issues/2585) [#2584](https://github.com/hpcc-systems/Visualization/issues/2584) [#2583](https://github.com/hpcc-systems/Visualization/issues/2583)




<a name="0.4.13"></a>
## [0.4.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.12...@hpcc-js/timeline@0.4.13) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.12"></a>
## [0.4.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.11...@hpcc-js/timeline@0.4.12) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.11"></a>
## [0.4.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.10...@hpcc-js/timeline@0.4.11) (2018-07-29)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.10"></a>
## [0.4.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.9...@hpcc-js/timeline@0.4.10) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.9"></a>
## [0.4.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.8...@hpcc-js/timeline@0.4.9) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.8"></a>
## [0.4.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.7...@hpcc-js/timeline@0.4.8) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.7"></a>
## [0.4.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.6...@hpcc-js/timeline@0.4.7) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.6"></a>
## [0.4.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.5...@hpcc-js/timeline@0.4.6) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.5"></a>
## [0.4.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.4...@hpcc-js/timeline@0.4.5) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.4"></a>
## [0.4.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.3...@hpcc-js/timeline@0.4.4) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.3"></a>
## [0.4.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.2...@hpcc-js/timeline@0.4.3) (2018-07-27)


### Bug Fixes

* **timeline:** Calc EntityPin height ([1fd4ea3](https://github.com/hpcc-systems/Visualization/commit/1fd4ea3))




<a name="0.4.2"></a>
## [0.4.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.1...@hpcc-js/timeline@0.4.2) (2018-07-02)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.1"></a>
## [0.4.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.4.0...@hpcc-js/timeline@0.4.1) (2018-06-28)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.4.0"></a>
# [0.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.3.2...@hpcc-js/timeline@0.4.0) (2018-06-22)


### Features

* **timeline:** Add event color parameters ([00791dd](https://github.com/hpcc-systems/Visualization/commit/00791dd)), closes [#2654](https://github.com/hpcc-systems/Visualization/issues/2654)




<a name="0.3.2"></a>
## [0.3.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.3.1...@hpcc-js/timeline@0.3.2) (2018-06-20)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.3.1"></a>
## [0.3.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.3.0...@hpcc-js/timeline@0.3.1) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.3.0"></a>
# [0.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.2.0...@hpcc-js/timeline@0.3.0) (2018-06-19)


### Features

* **timeline:** Add EntityPin to timeline ([bab1b06](https://github.com/hpcc-systems/Visualization/commit/bab1b06))




<a name="0.2.0"></a>
# [0.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.1.1...@hpcc-js/timeline@0.2.0) (2018-06-15)


### Features

* **timeline:** Add maxZoom and EntityPin collapse options ([d0198ce](https://github.com/hpcc-systems/Visualization/commit/d0198ce))




<a name="0.1.1"></a>
## [0.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.1.0...@hpcc-js/timeline@0.1.1) (2018-06-15)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.1.0"></a>
# [0.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.0.83...@hpcc-js/timeline@0.1.0) (2018-06-14)


### Features

* **timeline:** Add EntityPin to timeline ([25ce344](https://github.com/hpcc-systems/Visualization/commit/25ce344))




<a name="0.0.83"></a>
## [0.0.83](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.0.82...@hpcc-js/timeline@0.0.83) (2018-06-01)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.0.82"></a>
## [0.0.82](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.0.81...@hpcc-js/timeline@0.0.82) (2018-05-28)




**Note:** Version bump only for package @hpcc-js/timeline

<a name="0.0.81"></a>
## [0.0.81](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.0.80...@hpcc-js/timeline@0.0.81) (2018-05-21)


### Bug Fixes

* MiniGantt click event was non standard ([988012a](https://github.com/hpcc-systems/Visualization/commit/988012a))




<a name="0.0.80"></a>
## [0.0.80](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/timeline@0.0.79...@hpcc-js/timeline@0.0.80) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/timeline
