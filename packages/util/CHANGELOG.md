# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.52.0 (2024-07-23)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)
*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)
* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07379e59081c930d61485764e78c8a07a90))
* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf369d6d4081f0f5d9285bf3b1fd9b5b5999))
* **Compare2:** Remove O^2 algorithm ([fa4ccd1](https://github.com/hpcc-systems/Visualization/commit/fa4ccd1508542bb213ae8f7e9b69666040ddb70e))
* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))
* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))
* **Graph2:** Removal of Vertex Issue ([957382a](https://github.com/hpcc-systems/Visualization/commit/957382ae537f95c00ab2f13eb0e5027e2fe0c09f))
* **GraphT:**  Merge edges fails when ID matches, but source/target has changed ([b822ade](https://github.com/hpcc-systems/Visualization/commit/b822adef25e8d8780cab62f73e79972bb90712e2))
* **marshaller:** Race condition ([2673d29](https://github.com/hpcc-systems/Visualization/commit/2673d290f88c6b860b6687852c6ae45fa79da13c)), closes [#3106](https://github.com/hpcc-systems/Visualization/issues/3106)
* **PropertyExt:** Hash function very slow ([d846a9e](https://github.com/hpcc-systems/Visualization/commit/d846a9e5dab2e2c8abf7edf2dc46aef71a311ef4))
* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))
* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))
* Tweak sources to ensure compatibility with Angular 6 ([6b21f2e](https://github.com/hpcc-systems/Visualization/commit/6b21f2e0aab8a5ccad22486bafbbb25f1d15e10c))
* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)
* **Workunit:** Relax monitoring frequency ([bc19bd6](https://github.com/hpcc-systems/Visualization/commit/bc19bd6bca0749b220a4c701bae92691c791a708))
* **WsCloud:**  Extra parsing for Result: "string" in GetPODs ([b3dfe32](https://github.com/hpcc-systems/Visualization/commit/b3dfe327f606fb505829abe7bed16fd9a9bfed03))


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))
*  Add React Custom Graph demo ([48f7140](https://github.com/hpcc-systems/Visualization/commit/48f7140592f3dcb400a95135d01115b8b475220a))
*  Add strict function ref comparisons for deepEquals ([ffb891d](https://github.com/hpcc-systems/Visualization/commit/ffb891df84ae3f6eeae9333786c865ace4cb6a13))
*  Add support for numeric IDs ([f88cc16](https://github.com/hpcc-systems/Visualization/commit/f88cc16527d935add373b1dfe06311811ae8a449))
*  Bump WsWorkunits services ([9ee2210](https://github.com/hpcc-systems/Visualization/commit/9ee221012ba7d2caccc4986409527573c8388c34))
* Add lite serialize/deserialize ([799fa5f](https://github.com/hpcc-systems/Visualization/commit/799fa5ff09395a04ec362f52d67230a28ed935c5))
* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))
* **compare:** New compare function for Object Arrays ([b335d02](https://github.com/hpcc-systems/Visualization/commit/b335d02c2ede496ce96c9c73b0836f8ceabb0be1))
* **dashy:** Support common datasources properly ([34d6fb7](https://github.com/hpcc-systems/Visualization/commit/34d6fb72fef0d3d25b777b174de0c28092f5c9b4))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))
* **fgrid:**  Add alternative to dgrid ([3a4841e](https://github.com/hpcc-systems/Visualization/commit/3a4841e7c6f898e0ff8bf0bfa55480c6ee5760d2))
* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d6819c6fd166f74e7385446dd477e8a1cdd01))
* **graph:**  Add "allItems" to graph data structure ([9e1ddad](https://github.com/hpcc-systems/Visualization/commit/9e1ddad6e6e1ba39ac8991414906e9dc2d27d692))
* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))
* **Graph2:** Various improvements for ECL Watch integration ([668c9b4](https://github.com/hpcc-systems/Visualization/commit/668c9b40f8f84b2ce62fd0a6f59f44c4b9aa4483))
* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))
* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfacc1b162f1a5d02b06d434375424b7d225f))
* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))
* **observable:**  Add support for importing local ojs/omd files ([4cb1d78](https://github.com/hpcc-systems/Visualization/commit/4cb1d78ac7a06be99d383f6a5bebb719018e6f54))
* **pie:** Better pie label positioning ([f2fa36c](https://github.com/hpcc-systems/Visualization/commit/f2fa36c4ed133f347b10e3500bcbd398508a354d)), closes [#2994](https://github.com/hpcc-systems/Visualization/issues/2994) [#2956](https://github.com/hpcc-systems/Visualization/issues/2956)
* **util:** Add Dijkstra algorithm to graph2 ([79a71f4](https://github.com/hpcc-systems/Visualization/commit/79a71f4842f53962e50903cbf641d07692dc464e))
* **util:** Add new Graph data collection ([b0391db](https://github.com/hpcc-systems/Visualization/commit/b0391dbcaf31637d65eea16d7f933aa7c42d8f3e))
* **WsStore:** Add WsStore support to comms layer ([21d0c6d](https://github.com/hpcc-systems/Visualization/commit/21d0c6d0e1975ad7b28ed50a96f637852c9f7de4))


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))
* Revert "chore: Rework shim inclusion" ([462d55c](https://github.com/hpcc-systems/Visualization/commit/462d55c0b89cb74c6f2aacc29ccafebaf5a2c46c))





## [3.3.3](https://github.com/hpcc-systems/Visualization/compare/util-v3.3.2...util-v3.3.3) (2025-07-03)


### Bug Fixes

* Improve type-leaks test ([379961d](https://github.com/hpcc-systems/Visualization/commit/379961dedff41a4546003da34936380664acfc84))
* Improve type-leaks test ([0dbd604](https://github.com/hpcc-systems/Visualization/commit/0dbd604b181056fe93af069377a8ceb0c1391543))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.2 to ^1.4.3

## [3.3.2](https://github.com/hpcc-systems/Visualization/compare/util-v3.3.1...util-v3.3.2) (2025-06-24)


### Bug Fixes

* Sourcemaps out of sync ([c46b154](https://github.com/hpcc-systems/Visualization/commit/c46b1546855ee4a45bc299203dea430e84912d40))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.1 to ^1.4.2

## [3.3.1](https://github.com/hpcc-systems/Visualization/compare/util-v3.3.0...util-v3.3.1) (2025-04-03)


### Bug Fixes

* Revert text autosize changes ([4709091](https://github.com/hpcc-systems/Visualization/commit/47090910e3957381fadbe069a3087314643841b3))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.0 to ^1.4.1

## [3.3.0](https://github.com/hpcc-systems/Visualization/compare/util-v3.2.0...util-v3.3.0) (2024-11-28)


### Features

* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.3.0 to ^1.4.0

## [3.2.0](https://github.com/hpcc-systems/Visualization/compare/util-v3.1.0...util-v3.2.0) (2024-11-20)


### Features

* Add dgrid ([da14281](https://github.com/hpcc-systems/Visualization/commit/da14281ee8c91d6440734f6cf3cb1bfb6118a415))
* Upgrade layout to v3 ([cbc463a](https://github.com/hpcc-systems/Visualization/commit/cbc463acb24fc2e7d0f3da93b4c0d9c6915aabd8))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.2.0 to ^1.3.0

## [3.1.0](https://github.com/hpcc-systems/Visualization/compare/util-v3.0.0...util-v3.1.0) (2024-10-24)


### Features

* Add React Custom Graph demo ([48f7140](https://github.com/hpcc-systems/Visualization/commit/48f7140592f3dcb400a95135d01115b8b475220a))
* Bump WsWorkunits services ([9ee2210](https://github.com/hpcc-systems/Visualization/commit/9ee221012ba7d2caccc4986409527573c8388c34))
* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))
* Switch to esbuild (common, api, chart) ([a855017](https://github.com/hpcc-systems/Visualization/commit/a855017b8b35ee53ca4a3a060973bf4b87c8916b))
* Switch to esbuild and ESM first packaging ([b752510](https://github.com/hpcc-systems/Visualization/commit/b752510b5074fbc9a606e4d189412798c241f414))
* Switch to esbuild and ESM first packaging (comms) ([3bc7e54](https://github.com/hpcc-systems/Visualization/commit/3bc7e54da7a70d5bfc57ea4b1a87fb02913cbf40))


### Bug Fixes

* **GraphT:** Merge edges fails when ID matches, but source/target has changed ([b822ade](https://github.com/hpcc-systems/Visualization/commit/b822adef25e8d8780cab62f73e79972bb90712e2))

## [2.53.0](https://github.com/hpcc-systems/Visualization/compare/util-v2.52.0...util-v2.53.0) (2024-10-23)


### Features

* Add React Custom Graph demo ([48f7140](https://github.com/hpcc-systems/Visualization/commit/48f7140592f3dcb400a95135d01115b8b475220a))
* Bump WsWorkunits services ([9ee2210](https://github.com/hpcc-systems/Visualization/commit/9ee221012ba7d2caccc4986409527573c8388c34))
* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))


### Bug Fixes

* **GraphT:** Merge edges fails when ID matches, but source/target has changed ([b822ade](https://github.com/hpcc-systems/Visualization/commit/b822adef25e8d8780cab62f73e79972bb90712e2))

## [2.51.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.51.0...@hpcc-js/util@2.51.1) (2024-07-02)



## 2.105.11 (2024-06-25)



## 2.105.10 (2024-06-19)



## 2.105.9 (2024-05-24)



## 2.105.8 (2024-04-24)



## 2.105.7 (2024-04-22)



## 2.105.6 (2024-04-17)

**Note:** Version bump only for package @hpcc-js/util





# [2.51.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.50.6...@hpcc-js/util@2.51.0) (2024-04-17)


### Features

*  Bump WsWorkunits services ([9ee2210](https://github.com/hpcc-systems/Visualization/commit/9ee221012ba7d2caccc4986409527573c8388c34))



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



## 2.104.36 (2024-01-23)



## 2.104.35 (2024-01-18)



## 2.104.34 (2024-01-02)



## 2.104.33 (2023-11-16)



## 2.104.32 (2023-11-09)



## 2.104.31 (2023-11-03)



## 2.104.30 (2023-10-26)






## [2.50.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.50.5...@hpcc-js/util@2.50.6) (2023-10-26)



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/util





## [2.50.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.50.4...@hpcc-js/util@2.50.5) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/util





## [2.50.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.50.3...@hpcc-js/util@2.50.4) (2023-09-14)



## 2.104.25 (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)

**Note:** Version bump only for package @hpcc-js/util





## [2.50.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.50.2...@hpcc-js/util@2.50.3) (2023-06-08)



## 2.104.19 (2023-03-14)



## 2.104.18 (2023-02-22)



## 2.104.17 (2023-01-20)



## 2.104.16 (2023-01-19)



## 2.104.15 (2022-11-15)



## 2.104.14 (2022-11-11)

**Note:** Version bump only for package @hpcc-js/util





## [2.50.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.50.1...@hpcc-js/util@2.50.2) (2022-11-11)



## 2.104.13 (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)

**Note:** Version bump only for package @hpcc-js/util





## [2.50.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.50.0...@hpcc-js/util@2.50.1) (2022-10-11)


### Bug Fixes

* **GraphT:**  Merge edges fails when ID matches, but source/target has changed ([b822ade](https://github.com/hpcc-systems/Visualization/commit/b822adef25e8d8780cab62f73e79972bb90712e2))



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)



## 2.104.8 (2022-09-29)





# [2.50.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.49.1...@hpcc-js/util@2.50.0) (2022-09-29)


### Features

*  Add React Custom Graph demo ([48f7140](https://github.com/hpcc-systems/Visualization/commit/48f7140592f3dcb400a95135d01115b8b475220a))



## 2.104.7 (2022-09-28)



## 2.104.6 (2022-09-21)





## [2.49.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.49.0...@hpcc-js/util@2.49.1) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)



## 2.104.2 (2022-08-17)

**Note:** Version bump only for package @hpcc-js/util





# [2.49.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.48.0...@hpcc-js/util@2.49.0) (2022-08-17)



## 2.104.1 (2022-08-16)



# 2.104.0 (2022-07-26)


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)





# [2.48.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.47.1...@hpcc-js/util@2.48.0) (2022-06-23)


### Features

*  Add strict function ref comparisons for deepEquals ([ffb891d](https://github.com/hpcc-systems/Visualization/commit/ffb891df84ae3f6eeae9333786c865ace4cb6a13))



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)



## 2.103.1 (2022-04-20)





## [2.47.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.47.0...@hpcc-js/util@2.47.1) (2022-04-20)


### Bug Fixes

* **WsCloud:**  Extra parsing for Result: "string" in GetPODs ([b3dfe32](https://github.com/hpcc-systems/Visualization/commit/b3dfe327f606fb505829abe7bed16fd9a9bfed03))



# 2.103.0 (2022-04-07)





# [2.47.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.46.2...@hpcc-js/util@2.47.0) (2022-04-07)


### Features

* **fgrid:**  Add alternative to dgrid ([3a4841e](https://github.com/hpcc-systems/Visualization/commit/3a4841e7c6f898e0ff8bf0bfa55480c6ee5760d2))



## 2.102.11 (2022-03-24)





## [2.46.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.46.1...@hpcc-js/util@2.46.2) (2022-03-24)



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

**Note:** Version bump only for package @hpcc-js/util





## [2.46.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.46.0...@hpcc-js/util@2.46.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/util





# [2.46.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.45.0...@hpcc-js/util@2.46.0) (2022-03-07)


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





# [2.45.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.45.0) (2022-02-23)



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


### Features

*  Add support for numeric IDs ([f88cc16](https://github.com/hpcc-systems/Visualization/commit/f88cc16527d935add373b1dfe06311811ae8a449))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)


### Features

* **observable:**  Add support for importing local ojs/omd files ([4cb1d78](https://github.com/hpcc-systems/Visualization/commit/4cb1d78ac7a06be99d383f6a5bebb719018e6f54))



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))






# [2.44.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.44.0) (2022-02-10)



# 2.98.0 (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)


### Features

*  Add support for numeric IDs ([f88cc16](https://github.com/hpcc-systems/Visualization/commit/f88cc16527d935add373b1dfe06311811ae8a449))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)


### Features

* **observable:**  Add support for importing local ojs/omd files ([4cb1d78](https://github.com/hpcc-systems/Visualization/commit/4cb1d78ac7a06be99d383f6a5bebb719018e6f54))



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))






# [2.43.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.43.0) (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)


### Features

*  Add support for numeric IDs ([f88cc16](https://github.com/hpcc-systems/Visualization/commit/f88cc16527d935add373b1dfe06311811ae8a449))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)


### Features

* **observable:**  Add support for importing local ojs/omd files ([4cb1d78](https://github.com/hpcc-systems/Visualization/commit/4cb1d78ac7a06be99d383f6a5bebb719018e6f54))



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))






# [2.42.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.42.0) (2022-02-09)



# 2.96.0 (2022-01-22)



# 2.95.0 (2022-01-20)



# 2.94.0 (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)


### Features

*  Add support for numeric IDs ([f88cc16](https://github.com/hpcc-systems/Visualization/commit/f88cc16527d935add373b1dfe06311811ae8a449))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)


### Features

* **observable:**  Add support for importing local ojs/omd files ([4cb1d78](https://github.com/hpcc-systems/Visualization/commit/4cb1d78ac7a06be99d383f6a5bebb719018e6f54))



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.41.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.41.0) (2022-01-19)



# 2.93.0 (2021-11-18)



# 2.92.0 (2021-11-08)


### Features

*  Add support for numeric IDs ([f88cc16](https://github.com/hpcc-systems/Visualization/commit/f88cc16527d935add373b1dfe06311811ae8a449))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)


### Features

* **observable:**  Add support for importing local ojs/omd files ([4cb1d78](https://github.com/hpcc-systems/Visualization/commit/4cb1d78ac7a06be99d383f6a5bebb719018e6f54))



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.40.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.40.0) (2021-11-08)


### Features

*  Add support for numeric IDs ([f88cc16](https://github.com/hpcc-systems/Visualization/commit/f88cc16527d935add373b1dfe06311811ae8a449))



# 2.91.0 (2021-10-15)



# 2.89.0 (2021-10-08)



# 2.88.0 (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)


### Features

* **observable:**  Add support for importing local ojs/omd files ([4cb1d78](https://github.com/hpcc-systems/Visualization/commit/4cb1d78ac7a06be99d383f6a5bebb719018e6f54))



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))






# [2.39.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.39.0) (2021-10-03)



# 2.87.0 (2021-10-01)



# 2.86.0 (2021-09-28)



# 2.85.0 (2021-09-13)



# 2.84.0 (2021-09-13)



# 2.83.0 (2021-09-08)


### Features

* **observable:**  Add support for importing local ojs/omd files ([4cb1d78](https://github.com/hpcc-systems/Visualization/commit/4cb1d78ac7a06be99d383f6a5bebb719018e6f54))



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.38.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.38.0) (2021-09-08)


### Features

* **observable:**  Add support for importing local ojs/omd files ([4cb1d78](https://github.com/hpcc-systems/Visualization/commit/4cb1d78ac7a06be99d383f6a5bebb719018e6f54))



# 2.82.0 (2021-08-25)



# 2.81.0 (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))






# [2.37.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.37.0) (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.36.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.36.0) (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.35.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.35.0) (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.34.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.34.0) (2021-08-04)


### Features

* **logging:**  Add ability to override raw writing ([35bcbdc](https://github.com/hpcc-systems/Visualization/commit/35bcbdcd5678c8d7997cf2aea17c42c845feaa1e))



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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.33.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.33.0) (2021-07-28)


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



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))






# [2.32.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.32.0) (2021-07-16)


### Bug Fixes

*  Workunit.clone() fails. ([b0e5c60](https://github.com/hpcc-systems/Visualization/commit/b0e5c603df80c34614727ae347823f4874149b14)), closes [#3829](https://github.com/hpcc-systems/Visualization/issues/3829)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))






# [2.31.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.31.0) (2021-07-02)


### Features

* **graph:**  Various optimizations and tweaks ([0e7fda6](https://github.com/hpcc-systems/Visualization/commit/0e7fda6505bc6c78d21b07b5202b68415a8c21e8))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



# 2.52.0 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))






# [2.30.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.30.0) (2021-06-15)


### Bug Fixes

*  Remove evaluation code to prevent downstream security warnings ([b0514c5](https://github.com/hpcc-systems/Visualization/commit/b0514c5639d7a8da44673dfaa71551a30dc56a9a)), closes [#3797](https://github.com/hpcc-systems/Visualization/issues/3797)



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


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.29.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.29.0) (2021-02-19)


### Bug Fixes

* **stateful:**  Switch to deepEquals for void() ([77a56a3](https://github.com/hpcc-systems/Visualization/commit/77a56a3c3c3c0de291c73a3bc5550678ee377e96))



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.28.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.28.0) (2020-12-15)


### Bug Fixes

* **security:** Potential prototype pollution ([d4afd6e](https://github.com/hpcc-systems/Visualization/commit/d4afd6e9af3fdf371ee11aca8c0cf70587e7e1f2))



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.27.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.27.0) (2020-11-10)


### Bug Fixes

* **util:** Graph2 remove inEdge bug ([a6be6b8](https://github.com/hpcc-systems/Visualization/commit/a6be6b83786e60f21a273ef366238eb233860b53)), closes [#3729](https://github.com/hpcc-systems/Visualization/issues/3729)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.26.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.26.0) (2020-08-22)



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


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.25.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.25.0) (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.24.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.24.0) (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.23.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.23.0) (2020-07-22)



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)



# 2.23.0 (2020-06-23)


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))






# [2.22.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.22.0) (2020-06-23)


### Features

* Add polar coordinate functions to util ([c30ea95](https://github.com/hpcc-systems/Visualization/commit/c30ea95d1f30f5b1aa72ad6d327eb7ae09b93098))



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.21.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.21.0) (2020-06-17)


### Bug Fixes

* **dashy:**  Race condition ([52f90b3](https://github.com/hpcc-systems/Visualization/commit/52f90b3fb3c250b2beed346f83ed7813e0e6834c))



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


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.20.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.20.0) (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.19.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.19.0) (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.18.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.18.0) (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.17.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.17.0) (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.16.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.16.0) (2020-05-19)



## 2.15.18 (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.15.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.15.0) (2020-05-15)


### Bug Fixes

* **Dashy:** DataGraph not clearing on new selection. ([0aed76b](https://github.com/hpcc-systems/Visualization/commit/0aed76b843f2539cbfb2b0dc553868248441d259))



## 2.15.17 (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.14.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.14.0) (2020-05-15)


### Features

* Initial OJS Support ([09e72a5](https://github.com/hpcc-systems/Visualization/commit/09e72a522046d0f14eef5f5418d07ea771886ed9))



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.13.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.13.0) (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





# [2.12.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.12.0) (2020-04-17)



## 2.15.7 (2020-04-11)


### Features

* **dispatch:** Add better typing for dispatch messages ([b7c0c6f](https://github.com/hpcc-systems/Visualization/commit/b7c0c6f969ac8f54a0b4ccc18c78dc7aee02e5b3))





## [2.11.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.11.5) (2020-04-11)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/util





## [2.11.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.11.4) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/util





## [2.11.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.2...@hpcc-js/util@2.11.3) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/util





## [2.11.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.1...@hpcc-js/util@2.11.2) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/util





## [2.11.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.11.0...@hpcc-js/util@2.11.1) (2020-03-20)

**Note:** Version bump only for package @hpcc-js/util





# [2.11.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.10.0...@hpcc-js/util@2.11.0) (2020-03-02)


### Bug Fixes

* **Compare2:** Remove O^2 algorithm ([fa4ccd1](https://github.com/hpcc-systems/Visualization/commit/fa4ccd1508542bb213ae8f7e9b69666040ddb70e))
* **Graph2:** Removal of Vertex Issue ([957382a](https://github.com/hpcc-systems/Visualization/commit/957382ae537f95c00ab2f13eb0e5027e2fe0c09f))


### Features

* **Graph2:** Various improvements for ECL Watch integration ([668c9b4](https://github.com/hpcc-systems/Visualization/commit/668c9b40f8f84b2ce62fd0a6f59f44c4b9aa4483))





# [2.10.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.9.0...@hpcc-js/util@2.10.0) (2020-01-22)


### Features

* **util:** Add Dijkstra algorithm to graph2 ([79a71f4](https://github.com/hpcc-systems/Visualization/commit/79a71f4842f53962e50903cbf641d07692dc464e))





# [2.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.8.4...@hpcc-js/util@2.9.0) (2020-01-07)


### Features

* **compare:** New compare function for Object Arrays ([b335d02](https://github.com/hpcc-systems/Visualization/commit/b335d02c2ede496ce96c9c73b0836f8ceabb0be1))
* **util:** Add new Graph data collection ([b0391db](https://github.com/hpcc-systems/Visualization/commit/b0391dbcaf31637d65eea16d7f933aa7c42d8f3e))






## [2.8.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.8.3...@hpcc-js/util@2.8.4) (2019-12-11)

**Note:** Version bump only for package @hpcc-js/util





## [2.8.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.8.2...@hpcc-js/util@2.8.3) (2019-09-26)

**Note:** Version bump only for package @hpcc-js/util





## [2.8.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.8.1...@hpcc-js/util@2.8.2) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/util





## [2.8.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.8.0...@hpcc-js/util@2.8.1) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/util





# [2.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.7.6...@hpcc-js/util@2.8.0) (2019-08-13)


### Features

* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d681))





## [2.7.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.7.5...@hpcc-js/util@2.7.6) (2019-08-01)


### Bug Fixes

* **Workunit:** Relax monitoring frequency ([bc19bd6](https://github.com/hpcc-systems/Visualization/commit/bc19bd6))






## [2.7.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.7.4...@hpcc-js/util@2.7.5) (2019-07-03)

**Note:** Version bump only for package @hpcc-js/util





## [2.7.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.7.3...@hpcc-js/util@2.7.4) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/util





## [2.7.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.7.2...@hpcc-js/util@2.7.3) (2019-06-26)


### Bug Fixes

* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07))






## [2.7.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.7.1...@hpcc-js/util@2.7.2) (2019-06-20)


### Bug Fixes

* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf3))
* Tweak sources to ensure compatibility with Angular 6 ([6b21f2e](https://github.com/hpcc-systems/Visualization/commit/6b21f2e))





## [2.7.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.7.0...@hpcc-js/util@2.7.1) (2019-06-14)

**Note:** Version bump only for package @hpcc-js/util






# [2.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.6.7...@hpcc-js/util@2.7.0) (2019-05-16)


### Features

* **WsStore:** Add WsStore support to comms layer ([21d0c6d](https://github.com/hpcc-systems/Visualization/commit/21d0c6d))






## [2.6.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.6.6...@hpcc-js/util@2.6.7) (2019-04-27)

**Note:** Version bump only for package @hpcc-js/util






## [2.6.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.6.2...@hpcc-js/util@2.6.6) (2019-04-06)



## [2.6.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.6.2...@hpcc-js/util@2.6.4) (2019-04-05)

**Note:** Version bump only for package @hpcc-js/util






## [2.6.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.6.2...@hpcc-js/util@2.6.3) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/util






## [2.6.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.6.1...@hpcc-js/util@2.6.2) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/util






## [2.6.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.4.0...@hpcc-js/util@2.6.1) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/util






# [2.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.2.2...@hpcc-js/util@2.6.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/util






# [2.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.2.2...@hpcc-js/util@2.5.0) (2019-04-01)

**Note:** Version bump only for package @hpcc-js/util






# [2.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.2.2...@hpcc-js/util@2.4.0) (2019-03-29)

**Note:** Version bump only for package @hpcc-js/util






# [2.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.2.2...@hpcc-js/util@2.3.0) (2019-03-21)


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))






## [2.2.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.2.1...@hpcc-js/util@2.2.2) (2019-02-19)

**Note:** Version bump only for package @hpcc-js/util






## [2.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.2.0...@hpcc-js/util@2.2.1) (2019-01-29)


### Bug Fixes

* **marshaller:** Race condition ([2673d29](https://github.com/hpcc-systems/Visualization/commit/2673d29)), closes [#3106](https://github.com/hpcc-systems/Visualization/issues/3106)






# [2.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.1.5...@hpcc-js/util@2.2.0) (2019-01-08)


### Features

* **pie:** Better pie label positioning ([f2fa36c](https://github.com/hpcc-systems/Visualization/commit/f2fa36c)), closes [#2994](https://github.com/hpcc-systems/Visualization/issues/2994) [#2956](https://github.com/hpcc-systems/Visualization/issues/2956)






## [2.1.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.1.4...@hpcc-js/util@2.1.5) (2018-12-13)

**Note:** Version bump only for package @hpcc-js/util






## [2.1.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.1.3...@hpcc-js/util@2.1.4) (2018-12-04)

**Note:** Version bump only for package @hpcc-js/util






## [2.1.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.1.2...@hpcc-js/util@2.1.3) (2018-11-27)

**Note:** Version bump only for package @hpcc-js/util






<a name="2.1.2"></a>
## [2.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.1.1...@hpcc-js/util@2.1.2) (2018-10-05)

**Note:** Version bump only for package @hpcc-js/util





<a name="2.1.1"></a>
## [2.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.1.0...@hpcc-js/util@2.1.1) (2018-09-24)


### Bug Fixes

* **PropertyExt:** Hash function very slow ([d846a9e](https://github.com/hpcc-systems/Visualization/commit/d846a9e))





<a name="2.1.0"></a>
# [2.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.0.1...@hpcc-js/util@2.1.0) (2018-09-10)


### Features

* **dashy:** Support common datasources properly ([34d6fb7](https://github.com/hpcc-systems/Visualization/commit/34d6fb7))





<a name="2.0.1"></a>
## [2.0.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@2.0.0...@hpcc-js/util@2.0.1) (2018-09-01)

**Note:** Version bump only for package @hpcc-js/util





<a name="2.0.0"></a>
# [2.0.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.14...@hpcc-js/util@2.0.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/util





<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.14...@hpcc-js/util@2.0.0-rc.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/util





<a name="0.1.14"></a>
## [0.1.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.13...@hpcc-js/util@0.1.14) (2018-08-23)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.13"></a>
## [0.1.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.12...@hpcc-js/util@0.1.13) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.12"></a>
## [0.1.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.11...@hpcc-js/util@0.1.12) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.11"></a>
## [0.1.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.10...@hpcc-js/util@0.1.11) (2018-08-10)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.10"></a>
## [0.1.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.9...@hpcc-js/util@0.1.10) (2018-08-02)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.9"></a>
## [0.1.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.8...@hpcc-js/util@0.1.9) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.8"></a>
## [0.1.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.7...@hpcc-js/util@0.1.8) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.7"></a>
## [0.1.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.6...@hpcc-js/util@0.1.7) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.6"></a>
## [0.1.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.5...@hpcc-js/util@0.1.6) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.5"></a>
## [0.1.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.4...@hpcc-js/util@0.1.5) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.4"></a>
## [0.1.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.3...@hpcc-js/util@0.1.4) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.3"></a>
## [0.1.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.2...@hpcc-js/util@0.1.3) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.2"></a>
## [0.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.1...@hpcc-js/util@0.1.2) (2018-06-28)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.1"></a>
## [0.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.1.0...@hpcc-js/util@0.1.1) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/util

<a name="0.1.0"></a>
# [0.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.0.74...@hpcc-js/util@0.1.0) (2018-06-19)


### Features

* Add lite serialize/deserialize ([799fa5f](https://github.com/hpcc-systems/Visualization/commit/799fa5f))




<a name="0.0.74"></a>
## [0.0.74](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/util@0.0.73...@hpcc-js/util@0.0.74) (2018-06-01)




**Note:** Version bump only for package @hpcc-js/util
