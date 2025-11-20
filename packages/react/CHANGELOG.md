# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.4.2](https://github.com/hpcc-systems/Visualization/compare/react-v3.4.1...react-v3.4.2) (2025-11-20)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.5.1 to ^3.5.2
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.6.1 to ^1.7.0

## [3.4.1](https://github.com/hpcc-systems/Visualization/compare/react-v3.4.0...react-v3.4.1) (2025-10-29)


### Bug Fixes

* revert vite back to the stable releases ([136469b](https://github.com/hpcc-systems/Visualization/commit/136469b0070c2d3090a128361ed411818347c41c))

## [3.4.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.54.0...@hpcc-js/react@3.4.1) (2025-10-29)


### Bug Fixes

* bump versions ([e9719b8](https://github.com/hpcc-systems/Visualization/commit/e9719b875e4c65936921d2e6a0f76ab008b88114))
* Revert react back to preact ([9c2e0f0](https://github.com/hpcc-systems/Visualization/commit/9c2e0f0cbf7c43561b7f2c0707d5fb95971bd5ef))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))
* vitest workspace is deprecated ([2b2584d](https://github.com/hpcc-systems/Visualization/commit/2b2584db7de0f62ea43144640931fd9d412373ab))


### Features

*  Drop preact-shim and bump versions ([24044a4](https://github.com/hpcc-systems/Visualization/commit/24044a4604cd3c6a481c91d1e7c21ac88790fff6))
*  Drop preact-shim and bump versions ([92add6f](https://github.com/hpcc-systems/Visualization/commit/92add6fffd2bbc932c134a30651577722697e14b))
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






# 2.54.0 (2024-07-23)


### Bug Fixes

* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f8273e454c4b103e0ed1965c18542f125482))
* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07379e59081c930d61485764e78c8a07a90))
* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf369d6d4081f0f5d9285bf3b1fd9b5b5999))
* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ada4d7aad0ffe9ea5cf004b49ccec6710de))
* **graph:**  Tweak previous refactor to ensure backward compatibility ([0c86fbb](https://github.com/hpcc-systems/Visualization/commit/0c86fbb643e7845161d9cc044df7d8efa9658d80))
* **marshaller:**  DataGraph should merge data by default ([a39da51](https://github.com/hpcc-systems/Visualization/commit/a39da51e42add8be09be702a07bd0fa83fef5895))


### Features

*  Add ability to get a normalized array of WUDetail scopes ([752ada0](https://github.com/hpcc-systems/Visualization/commit/752ada0bc011dafc63c5bba4df130cee51a9c38d))
*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))
*  Add React Custom Graph demo ([48f7140](https://github.com/hpcc-systems/Visualization/commit/48f7140592f3dcb400a95135d01115b8b475220a))
* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Add lite serialize/deserialize ([799fa5f](https://github.com/hpcc-systems/Visualization/commit/799fa5ff09395a04ec362f52d67230a28ed935c5))
* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* Add padding and yOffset to ImageChar ([34e8c55](https://github.com/hpcc-systems/Visualization/commit/34e8c554dedb262a371fee07e3aebdcd40f870f6))
* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))
* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d6819c6fd166f74e7385446dd477e8a1cdd01))
* **graph:**  Add vertexExpansionFACharColumn to DataGraph ([9b11644](https://github.com/hpcc-systems/Visualization/commit/9b116448d84b5d751e3f6845317bf04889eb1a1b))
* **graph2:** Add vertex2 ([a817ca3](https://github.com/hpcc-systems/Visualization/commit/a817ca33fedac7c3c9de7bcf49b5592592dbc640))
* **graph2:** Improved widget_tree app ([a6a700d](https://github.com/hpcc-systems/Visualization/commit/a6a700d08e559dfac7d37840103d367ec2caf27e))
* **Graph2:** Various improvements for ECL Watch integration ([668c9b4](https://github.com/hpcc-systems/Visualization/commit/668c9b40f8f84b2ce62fd0a6f59f44c4b9aa4483))
* **graph:** Add vertex4.tsx ([99a3f4e](https://github.com/hpcc-systems/Visualization/commit/99a3f4e649282e1b541c4ede1d6bab4719e7bbfa)), closes [#3990](https://github.com/hpcc-systems/Visualization/issues/3990)
* **Graph:** New "lite" Graph ([efb2e4a](https://github.com/hpcc-systems/Visualization/commit/efb2e4ae7e821ea1226600d6f46a07572579e620))
* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))
* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfacc1b162f1a5d02b06d434375424b7d225f))
* **PReact:** Bump PReact version and add some widgets ([19658d3](https://github.com/hpcc-systems/Visualization/commit/19658d337127fac2e9e4b56d430100c77cf9fdad))
* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))
* Revert "chore: Rework shim inclusion" ([462d55c](https://github.com/hpcc-systems/Visualization/commit/462d55c0b89cb74c6f2aacc29ccafebaf5a2c46c))






## [3.4.0](https://github.com/hpcc-systems/Visualization/compare/react-v3.3.2...react-v3.4.0) (2025-10-23)


### Features

* switch to simpler version stamp method ([d828033](https://github.com/hpcc-systems/Visualization/commit/d828033ec79f56c4d1579bca230bd03cf0d6328e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.4.2 to ^3.5.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.5.2 to ^1.6.0

## [3.3.2](https://github.com/hpcc-systems/Visualization/compare/react-v3.3.1...react-v3.3.2) (2025-10-09)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.4.1 to ^3.4.2
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.5.1 to ^1.5.2

## [3.3.1](https://github.com/hpcc-systems/Visualization/compare/react-v3.3.0...react-v3.3.1) (2025-09-18)


### Bug Fixes

* bump versions ([e9719b8](https://github.com/hpcc-systems/Visualization/commit/e9719b875e4c65936921d2e6a0f76ab008b88114))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.4.0 to ^3.4.1
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.5.0 to ^1.5.1

## [3.3.0](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.10...react-v3.3.0) (2025-08-26)


### Features

* Add @observablehq/notebook-kit support ([f8d806c](https://github.com/hpcc-systems/Visualization/commit/f8d806c68c8fd260ae83d0b2460dd5c0915da5cb))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.9 to ^3.4.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.9 to ^1.5.0

## [3.2.10](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.9...react-v3.2.10) (2025-07-24)


### Bug Fixes

* vitest workspace is deprecated ([2b2584d](https://github.com/hpcc-systems/Visualization/commit/2b2584db7de0f62ea43144640931fd9d412373ab))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.8 to ^3.3.9
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.8 to ^1.4.9

## [3.2.9](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.8...react-v3.2.9) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.7 to ^3.3.8
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.7 to ^1.4.8

## [3.2.8](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.7...react-v3.2.8) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.6 to ^3.3.7
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.6 to ^1.4.7

## [3.2.7](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.6...react-v3.2.7) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.5 to ^3.3.6
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.5 to ^1.4.6

## [3.2.6](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.5...react-v3.2.6) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.4 to ^3.3.5
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.4 to ^1.4.5

## [3.2.5](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.4...react-v3.2.5) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.3 to ^3.3.4
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.3 to ^1.4.4

## [3.2.4](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.3...react-v3.2.4) (2025-07-03)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.2 to ^3.3.3
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.2 to ^1.4.3

## [3.2.3](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.2...react-v3.2.3) (2025-06-24)


### Bug Fixes

* Sourcemaps out of sync ([c46b154](https://github.com/hpcc-systems/Visualization/commit/c46b1546855ee4a45bc299203dea430e84912d40))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.1 to ^3.3.2
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.1 to ^1.4.2

## [3.2.2](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.1...react-v3.2.2) (2025-04-03)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.0 to ^3.3.1
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.0 to ^1.4.1

## [3.2.1](https://github.com/hpcc-systems/Visualization/compare/react-v3.2.0...react-v3.2.1) (2024-11-29)


### Bug Fixes

* Revert text autosize changes ([75d7693](https://github.com/hpcc-systems/Visualization/commit/75d76939f7f28a767706ce83f8385250ce45624b))

## [3.2.0](https://github.com/hpcc-systems/Visualization/compare/react-v3.1.1...react-v3.2.0) (2024-11-28)


### Features

* Drop preact-shim and bump versions ([24044a4](https://github.com/hpcc-systems/Visualization/commit/24044a4604cd3c6a481c91d1e7c21ac88790fff6))
* Drop preact-shim and bump versions ([92add6f](https://github.com/hpcc-systems/Visualization/commit/92add6fffd2bbc932c134a30651577722697e14b))
* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.2.0 to ^3.3.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.3.0 to ^1.4.0

## [3.1.1](https://github.com/hpcc-systems/Visualization/compare/react-v3.1.0...react-v3.1.1) (2024-11-20)


### Bug Fixes

* Revert react back to preact ([9c2e0f0](https://github.com/hpcc-systems/Visualization/commit/9c2e0f0cbf7c43561b7f2c0707d5fb95971bd5ef))

## [3.1.0](https://github.com/hpcc-systems/Visualization/compare/react-v3.0.0...react-v3.1.0) (2024-11-20)


### Features

* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))
* Upgrade graph, html and react to v3 ([a1aa027](https://github.com/hpcc-systems/Visualization/commit/a1aa02785ed97c4ee18b3a83ab341f0423956b7c))
* Upgrade layout to v3 ([cbc463a](https://github.com/hpcc-systems/Visualization/commit/cbc463acb24fc2e7d0f3da93b4c0d9c6915aabd8))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.1.0 to ^3.2.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.2.0 to ^1.3.0

## [2.55.0](https://github.com/hpcc-systems/Visualization/compare/react-v2.54.0...react-v2.55.0) (2024-10-23)


### Features

* Add React Custom Graph demo ([48f7140](https://github.com/hpcc-systems/Visualization/commit/48f7140592f3dcb400a95135d01115b8b475220a))
* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))


### Bug Fixes

* **graph:** Tweak previous refactor to ensure backward compatibility ([0c86fbb](https://github.com/hpcc-systems/Visualization/commit/0c86fbb643e7845161d9cc044df7d8efa9658d80))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^2.72.0 to ^2.73.0
    * @hpcc-js/preact-shim bumped from ^2.17.0 to ^2.18.0

## [2.53.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.16...@hpcc-js/react@2.53.17) (2024-07-02)



## 2.105.11 (2024-06-25)



## 2.105.10 (2024-06-19)



## 2.105.9 (2024-05-24)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.15...@hpcc-js/react@2.53.16) (2024-05-24)



## 2.105.8 (2024-04-24)



## 2.105.7 (2024-04-22)



## 2.105.6 (2024-04-17)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.14...@hpcc-js/react@2.53.15) (2024-04-17)



## 2.105.5 (2024-03-28)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.13...@hpcc-js/react@2.53.14) (2024-03-28)



## 2.105.4 (2024-03-21)



## 2.105.3 (2024-03-19)



## 2.105.2 (2024-03-15)



## 2.105.1 (2024-03-15)



# 2.105.0 (2024-03-08)



## 2.104.42 (2024-02-28)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.12...@hpcc-js/react@2.53.13) (2024-02-28)



## 2.104.41 (2024-02-16)



## 2.104.40 (2024-02-15)



## 2.104.39 (2024-02-06)



## 2.104.38 (2024-02-06)



## 2.104.37 (2024-01-25)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.11...@hpcc-js/react@2.53.12) (2024-01-25)



## 2.104.36 (2024-01-23)



## 2.104.35 (2024-01-18)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.10...@hpcc-js/react@2.53.11) (2024-01-18)



## 2.104.34 (2024-01-02)



## 2.104.33 (2023-11-16)



## 2.104.32 (2023-11-09)

**Note:** Version bump only for package @hpcc-js/react






## [2.53.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.9...@hpcc-js/react@2.53.10) (2023-11-09)



## 2.104.31 (2023-11-03)



## 2.104.30 (2023-10-26)

**Note:** Version bump only for package @hpcc-js/react






## [2.53.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.8...@hpcc-js/react@2.53.9) (2023-10-26)



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.7...@hpcc-js/react@2.53.8) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.6...@hpcc-js/react@2.53.7) (2023-09-14)



## 2.104.25 (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.5...@hpcc-js/react@2.53.6) (2023-06-08)



## 2.104.19 (2023-03-14)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.4...@hpcc-js/react@2.53.5) (2023-03-14)



## 2.104.18 (2023-02-22)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.3...@hpcc-js/react@2.53.4) (2023-02-22)



## 2.104.17 (2023-01-20)



## 2.104.16 (2023-01-19)



## 2.104.15 (2022-11-15)



## 2.104.14 (2022-11-11)

**Note:** Version bump only for package @hpcc-js/react





## [2.53.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.2...@hpcc-js/react@2.53.3) (2022-11-11)


### Bug Fixes

* **graph:**  Tweak previous refactor to ensure backward compatibility ([0c86fbb](https://github.com/hpcc-systems/Visualization/commit/0c86fbb643e7845161d9cc044df7d8efa9658d80))



## 2.104.13 (2022-11-09)






## [2.53.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.1...@hpcc-js/react@2.53.2) (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)

**Note:** Version bump only for package @hpcc-js/react






## [2.53.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.53.0...@hpcc-js/react@2.53.1) (2022-10-11)



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)



## 2.104.8 (2022-09-29)

**Note:** Version bump only for package @hpcc-js/react





# [2.53.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.52.2...@hpcc-js/react@2.53.0) (2022-09-29)


### Features

*  Add React Custom Graph demo ([48f7140](https://github.com/hpcc-systems/Visualization/commit/48f7140592f3dcb400a95135d01115b8b475220a))



## 2.104.7 (2022-09-28)





## [2.52.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.52.1...@hpcc-js/react@2.52.2) (2022-09-28)



## 2.104.6 (2022-09-21)

**Note:** Version bump only for package @hpcc-js/react





## [2.52.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.52.0...@hpcc-js/react@2.52.1) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)

**Note:** Version bump only for package @hpcc-js/react





# [2.52.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.51.1...@hpcc-js/react@2.52.0) (2022-08-18)


### Features

* **graph:**  Add vertexExpansionFACharColumn to DataGraph ([9b11644](https://github.com/hpcc-systems/Visualization/commit/9b116448d84b5d751e3f6845317bf04889eb1a1b))



## 2.104.2 (2022-08-17)





## [2.51.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.51.0...@hpcc-js/react@2.51.1) (2022-08-17)



## 2.104.1 (2022-08-16)

**Note:** Version bump only for package @hpcc-js/react





# [2.51.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.50.0...@hpcc-js/react@2.51.0) (2022-08-16)


### Features

* **graph:** Add vertex4.tsx ([99a3f4e](https://github.com/hpcc-systems/Visualization/commit/99a3f4e649282e1b541c4ede1d6bab4719e7bbfa)), closes [#3990](https://github.com/hpcc-systems/Visualization/issues/3990)



# 2.104.0 (2022-07-26)





# [2.50.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.49.7...@hpcc-js/react@2.50.0) (2022-07-26)


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)





## [2.49.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.49.6...@hpcc-js/react@2.49.7) (2022-06-23)



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)

**Note:** Version bump only for package @hpcc-js/react





## [2.49.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.49.5...@hpcc-js/react@2.49.6) (2022-04-27)



## 2.103.1 (2022-04-20)

**Note:** Version bump only for package @hpcc-js/react





## [2.49.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.49.4...@hpcc-js/react@2.49.5) (2022-04-20)



# 2.103.0 (2022-04-07)

**Note:** Version bump only for package @hpcc-js/react





## [2.49.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.49.3...@hpcc-js/react@2.49.4) (2022-04-07)



## 2.102.11 (2022-03-24)

**Note:** Version bump only for package @hpcc-js/react





## [2.49.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.49.2...@hpcc-js/react@2.49.3) (2022-03-24)



## 2.102.10 (2022-03-15)



## 2.102.9 (2022-03-15)



## 2.102.8 (2022-03-15)

**Note:** Version bump only for package @hpcc-js/react





## [2.49.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.49.1...@hpcc-js/react@2.49.2) (2022-03-15)



## 2.102.7 (2022-03-14)



## 2.102.6 (2022-03-11)



## 2.102.5 (2022-03-11)



## 2.102.4 (2022-03-10)



## 2.102.3 (2022-03-10)



## 2.102.2 (2022-03-08)



## 2.102.1 (2022-03-08)

**Note:** Version bump only for package @hpcc-js/react





## [2.49.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.49.0...@hpcc-js/react@2.49.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/react





# [2.49.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.48.0...@hpcc-js/react@2.49.0) (2022-03-07)


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





# [2.48.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.48.0) (2022-02-23)



# 2.100.0 (2022-02-18)



# 2.99.0 (2022-02-10)



# 2.98.0 (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)


### Bug Fixes

* **marshaller:**  DataGraph should merge data by default ([a39da51](https://github.com/hpcc-systems/Visualization/commit/a39da51e42add8be09be702a07bd0fa83fef5895))



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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






# [2.47.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.47.0) (2022-02-10)



# 2.98.0 (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)


### Bug Fixes

* **marshaller:**  DataGraph should merge data by default ([a39da51](https://github.com/hpcc-systems/Visualization/commit/a39da51e42add8be09be702a07bd0fa83fef5895))



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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






# [2.46.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.46.0) (2022-02-10)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))



# 2.97.0 (2022-02-09)


### Bug Fixes

* **marshaller:**  DataGraph should merge data by default ([a39da51](https://github.com/hpcc-systems/Visualization/commit/a39da51e42add8be09be702a07bd0fa83fef5895))



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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






# [2.45.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.45.0) (2022-02-09)


### Bug Fixes

* **marshaller:**  DataGraph should merge data by default ([a39da51](https://github.com/hpcc-systems/Visualization/commit/a39da51e42add8be09be702a07bd0fa83fef5895))



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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





# [2.44.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.44.0) (2022-01-20)



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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






# [2.43.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.43.0) (2022-01-19)



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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





# [2.42.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.42.0) (2021-11-08)



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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






# [2.41.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.41.0) (2021-10-03)



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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





# [2.40.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.40.0) (2021-09-08)



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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






# [2.39.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.39.0) (2021-08-25)



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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





# [2.38.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.38.0) (2021-08-04)



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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





# [2.37.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.37.0) (2021-08-04)



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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





# [2.36.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.36.0) (2021-08-04)



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))
* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))



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





# [2.35.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.35.0) (2021-07-28)



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


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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






# [2.34.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.34.0) (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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






# [2.33.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.33.0) (2021-07-02)



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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






# [2.32.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.32.0) (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.31.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.31.0) (2021-05-19)



# 2.64.0 (2021-05-13)


### Features

* **graph:** Show labels on hover while hidden ([e16fb01](https://github.com/hpcc-systems/Visualization/commit/e16fb01765fe55d61b0eb22531fd236230d99e29)), closes [#3785](https://github.com/hpcc-systems/Visualization/issues/3785)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.30.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.30.0) (2021-04-06)



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


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.29.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.29.0) (2021-02-22)



# 2.56.0 (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.28.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.28.0) (2021-02-19)



# 2.55.0 (2021-02-12)



# 2.54.0 (2021-02-05)



# 2.53.0 (2021-02-02)



## 3.0.1 (2021-02-01)



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.27.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.27.0) (2020-12-15)



# 2.50.0 (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.26.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.26.0) (2020-12-01)


### Features

* Add several publish properties to Graph2 ([7b288de](https://github.com/hpcc-systems/Visualization/commit/7b288de977ce0e35420f1f04a7560c14d3164284))



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.25.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.25.0) (2020-11-10)



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.24.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.24.0) (2020-10-09)



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.23.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.23.0) (2020-10-08)



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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.22.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.22.0) (2020-08-24)


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


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.21.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.21.0) (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.20.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.20.0) (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.19.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.19.0) (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.18.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.18.0) (2020-07-22)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.17.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.17.0) (2020-07-22)


### Features

* Add Graph2 property showVertexLabels ([994d0cc](https://github.com/hpcc-systems/Visualization/commit/994d0cc74079330453271e990cfbab0122eede28)), closes [#3664](https://github.com/hpcc-systems/Visualization/issues/3664)
* Vertex3 placement adjusts for missing data ([5573bf5](https://github.com/hpcc-systems/Visualization/commit/5573bf5b954ffffee8f616f10aebc2120a2651f4))



# 2.26.0 (2020-06-26)



# 2.25.0 (2020-06-24)



# 2.24.0 (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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






# [2.16.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.16.0) (2020-06-23)


### Features

* Vertex3 omits subtext for subText empty str ([54738fd](https://github.com/hpcc-systems/Visualization/commit/54738fd16263b7563ce8c716206067d5e45a7d23)), closes [#3655](https://github.com/hpcc-systems/Visualization/issues/3655)



# 2.23.0 (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.15.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.15.0) (2020-06-23)



# 2.22.0 (2020-06-17)



# 2.21.0 (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.14.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.14.0) (2020-06-17)



# 2.20.0 (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.13.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.13.0) (2020-06-17)



# 2.19.0 (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.12.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.12.0) (2020-06-15)



# 2.18.0 (2020-06-02)



# 2.17.0 (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.11.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.11.0) (2020-05-31)



# 2.16.0 (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





# [2.10.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.10.0) (2020-05-21)


### Features

* **DataGraph:** Add dynamic mapping ([974fed2](https://github.com/hpcc-systems/Visualization/commit/974fed27508b0b2bc9244189f1ec0163e6620705))
* Add new vertex for RIN ([47fb4e1](https://github.com/hpcc-systems/Visualization/commit/47fb4e15b08224196708d9c323796c3a1051c226))



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





## [2.9.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.15) (2020-05-20)



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

**Note:** Version bump only for package @hpcc-js/react





## [2.9.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.14) (2020-05-19)



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

**Note:** Version bump only for package @hpcc-js/react





## [2.9.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.13) (2020-05-15)



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

**Note:** Version bump only for package @hpcc-js/react





## [2.9.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.12) (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/react





## [2.9.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.11) (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/react





## [2.9.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.10) (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/react





## [2.9.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.9) (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/react





## [2.9.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.8) (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/react





## [2.9.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.7) (2020-04-11)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/react





## [2.9.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.6) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/react





## [2.9.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.4...@hpcc-js/react@2.9.5) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/react





## [2.9.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.3...@hpcc-js/react@2.9.4) (2020-04-03)

**Note:** Version bump only for package @hpcc-js/react





## [2.9.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.2...@hpcc-js/react@2.9.3) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/react





## [2.9.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.1...@hpcc-js/react@2.9.2) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/react






## [2.9.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.9.0...@hpcc-js/react@2.9.1) (2020-03-20)

**Note:** Version bump only for package @hpcc-js/react





# [2.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.8.0...@hpcc-js/react@2.9.0) (2020-03-02)


### Features

* **Graph2:** Various improvements for ECL Watch integration ([668c9b4](https://github.com/hpcc-systems/Visualization/commit/668c9b40f8f84b2ce62fd0a6f59f44c4b9aa4483))





# [2.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.7.0...@hpcc-js/react@2.8.0) (2020-02-13)


### Features

* Add padding and yOffset to ImageChar ([34e8c55](https://github.com/hpcc-systems/Visualization/commit/34e8c554dedb262a371fee07e3aebdcd40f870f6))





# [2.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.6.3...@hpcc-js/react@2.7.0) (2020-02-07)


### Features

* **graph2:** Add vertex2 ([a817ca3](https://github.com/hpcc-systems/Visualization/commit/a817ca33fedac7c3c9de7bcf49b5592592dbc640))
* **graph2:** Improved widget_tree app ([a6a700d](https://github.com/hpcc-systems/Visualization/commit/a6a700d08e559dfac7d37840103d367ec2caf27e))





## [2.6.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.6.2...@hpcc-js/react@2.6.3) (2020-02-04)

**Note:** Version bump only for package @hpcc-js/react





## [2.6.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.6.1...@hpcc-js/react@2.6.2) (2020-01-23)

**Note:** Version bump only for package @hpcc-js/react





## [2.6.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.6.0...@hpcc-js/react@2.6.1) (2020-01-22)

**Note:** Version bump only for package @hpcc-js/react





# [2.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.5.5...@hpcc-js/react@2.6.0) (2020-01-07)


### Features

* **Graph:** New "lite" Graph ([efb2e4a](https://github.com/hpcc-systems/Visualization/commit/efb2e4ae7e821ea1226600d6f46a07572579e620))
* **PReact:** Bump PReact version and add some widgets ([19658d3](https://github.com/hpcc-systems/Visualization/commit/19658d337127fac2e9e4b56d430100c77cf9fdad))






## [2.5.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.5.4...@hpcc-js/react@2.5.5) (2019-12-11)

**Note:** Version bump only for package @hpcc-js/react





## [2.5.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.5.3...@hpcc-js/react@2.5.4) (2019-09-27)


### Bug Fixes

* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f82))





## [2.5.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.5.2...@hpcc-js/react@2.5.3) (2019-09-26)

**Note:** Version bump only for package @hpcc-js/react





## [2.5.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.5.1...@hpcc-js/react@2.5.2) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/react





## [2.5.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.5.0...@hpcc-js/react@2.5.1) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/react





# [2.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.16...@hpcc-js/react@2.5.0) (2019-08-13)


### Features

* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d681))





## [2.4.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.15...@hpcc-js/react@2.4.16) (2019-08-06)

**Note:** Version bump only for package @hpcc-js/react





## [2.4.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.14...@hpcc-js/react@2.4.15) (2019-08-01)

**Note:** Version bump only for package @hpcc-js/react





## [2.4.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.13...@hpcc-js/react@2.4.14) (2019-07-10)

**Note:** Version bump only for package @hpcc-js/react






## [2.4.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.12...@hpcc-js/react@2.4.13) (2019-07-03)

**Note:** Version bump only for package @hpcc-js/react





## [2.4.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.11...@hpcc-js/react@2.4.12) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/react





## [2.4.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.10...@hpcc-js/react@2.4.11) (2019-06-26)


### Bug Fixes

* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07))






## [2.4.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.9...@hpcc-js/react@2.4.10) (2019-06-20)


### Bug Fixes

* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf3))





## [2.4.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.8...@hpcc-js/react@2.4.9) (2019-06-14)

**Note:** Version bump only for package @hpcc-js/react






## [2.4.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.7...@hpcc-js/react@2.4.8) (2019-05-16)

**Note:** Version bump only for package @hpcc-js/react






## [2.4.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.6...@hpcc-js/react@2.4.7) (2019-04-27)

**Note:** Version bump only for package @hpcc-js/react






## [2.4.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.2...@hpcc-js/react@2.4.6) (2019-04-06)


## [2.4.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.2...@hpcc-js/react@2.4.4) (2019-04-05)

**Note:** Version bump only for package @hpcc-js/react






## [2.4.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.2...@hpcc-js/react@2.4.3) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/react






## [2.4.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.4.1...@hpcc-js/react@2.4.2) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/react






## [2.4.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.2.0...@hpcc-js/react@2.4.1) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/react






# [2.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.15...@hpcc-js/react@2.4.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/react






# [2.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.15...@hpcc-js/react@2.3.0) (2019-04-01)

**Note:** Version bump only for package @hpcc-js/react






# [2.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.15...@hpcc-js/react@2.2.0) (2019-03-29)

**Note:** Version bump only for package @hpcc-js/react






# [2.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.15...@hpcc-js/react@2.1.0) (2019-03-21)


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))






## [2.0.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.14...@hpcc-js/react@2.0.15) (2019-03-06)

**Note:** Version bump only for package @hpcc-js/react






## [2.0.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.13...@hpcc-js/react@2.0.14) (2019-02-19)

**Note:** Version bump only for package @hpcc-js/react






## [2.0.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.12...@hpcc-js/react@2.0.13) (2019-01-29)

**Note:** Version bump only for package @hpcc-js/react






## [2.0.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.11...@hpcc-js/react@2.0.12) (2019-01-08)

**Note:** Version bump only for package @hpcc-js/react






## [2.0.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.10...@hpcc-js/react@2.0.11) (2018-12-13)

**Note:** Version bump only for package @hpcc-js/react






## [2.0.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.9...@hpcc-js/react@2.0.10) (2018-12-06)

**Note:** Version bump only for package @hpcc-js/react






## [2.0.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.8...@hpcc-js/react@2.0.9) (2018-12-04)

**Note:** Version bump only for package @hpcc-js/react






## [2.0.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.7...@hpcc-js/react@2.0.8) (2018-11-27)

**Note:** Version bump only for package @hpcc-js/react






<a name="2.0.7"></a>
## [2.0.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.6...@hpcc-js/react@2.0.7) (2018-11-26)

**Note:** Version bump only for package @hpcc-js/react





<a name="2.0.6"></a>
## [2.0.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.5...@hpcc-js/react@2.0.6) (2018-11-08)

**Note:** Version bump only for package @hpcc-js/react





<a name="2.0.5"></a>
## [2.0.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.4...@hpcc-js/react@2.0.5) (2018-10-30)

**Note:** Version bump only for package @hpcc-js/react





<a name="2.0.4"></a>
## [2.0.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.3...@hpcc-js/react@2.0.4) (2018-10-05)

**Note:** Version bump only for package @hpcc-js/react





<a name="2.0.3"></a>
## [2.0.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.2...@hpcc-js/react@2.0.3) (2018-09-24)

**Note:** Version bump only for package @hpcc-js/react





<a name="2.0.2"></a>
## [2.0.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.1...@hpcc-js/react@2.0.2) (2018-09-10)

**Note:** Version bump only for package @hpcc-js/react





<a name="2.0.1"></a>
## [2.0.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@2.0.0...@hpcc-js/react@2.0.1) (2018-09-01)

**Note:** Version bump only for package @hpcc-js/react





<a name="2.0.0"></a>
# [2.0.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.20...@hpcc-js/react@2.0.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/react





<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.20...@hpcc-js/react@2.0.0-rc.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/react





<a name="0.2.20"></a>
## [0.2.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.19...@hpcc-js/react@0.2.20) (2018-08-23)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.19"></a>
## [0.2.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.18...@hpcc-js/react@0.2.19) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.18"></a>
## [0.2.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.17...@hpcc-js/react@0.2.18) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.17"></a>
## [0.2.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.16...@hpcc-js/react@0.2.17) (2018-08-10)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.16"></a>
## [0.2.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.15...@hpcc-js/react@0.2.16) (2018-08-02)


### Bug Fixes

* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ad))




<a name="0.2.15"></a>
## [0.2.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.14...@hpcc-js/react@0.2.15) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.14"></a>
## [0.2.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.13...@hpcc-js/react@0.2.14) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.13"></a>
## [0.2.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.12...@hpcc-js/react@0.2.13) (2018-07-29)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.12"></a>
## [0.2.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.11...@hpcc-js/react@0.2.12) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.11"></a>
## [0.2.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.10...@hpcc-js/react@0.2.11) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.10"></a>
## [0.2.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.9...@hpcc-js/react@0.2.10) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.9"></a>
## [0.2.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.8...@hpcc-js/react@0.2.9) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.8"></a>
## [0.2.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.7...@hpcc-js/react@0.2.8) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.7"></a>
## [0.2.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.6...@hpcc-js/react@0.2.7) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.6"></a>
## [0.2.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.5...@hpcc-js/react@0.2.6) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.5"></a>
## [0.2.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.4...@hpcc-js/react@0.2.5) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.4"></a>
## [0.2.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.3...@hpcc-js/react@0.2.4) (2018-06-28)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.3"></a>
## [0.2.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.2...@hpcc-js/react@0.2.3) (2018-06-22)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.2"></a>
## [0.2.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.1...@hpcc-js/react@0.2.2) (2018-06-20)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.1"></a>
## [0.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.2.0...@hpcc-js/react@0.2.1) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.2.0"></a>
# [0.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.1.4...@hpcc-js/react@0.2.0) (2018-06-19)


### Features

* Add lite serialize/deserialize ([799fa5f](https://github.com/hpcc-systems/Visualization/commit/799fa5f))




<a name="0.1.4"></a>
## [0.1.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.1.3...@hpcc-js/react@0.1.4) (2018-06-15)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.1.3"></a>
## [0.1.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.1.2...@hpcc-js/react@0.1.3) (2018-06-14)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.1.2"></a>
## [0.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.1.1...@hpcc-js/react@0.1.2) (2018-06-01)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.1.1"></a>
## [0.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.1.0...@hpcc-js/react@0.1.1) (2018-05-28)




**Note:** Version bump only for package @hpcc-js/react

<a name="0.1.0"></a>
# [0.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.0.78...@hpcc-js/react@0.1.0) (2018-05-21)


### Features

*  Add ability to get a normalized array of WUDetail scopes ([752ada0](https://github.com/hpcc-systems/Visualization/commit/752ada0))




<a name="0.0.78"></a>
## [0.0.78](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/react@0.0.77...@hpcc-js/react@0.0.78) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/react
