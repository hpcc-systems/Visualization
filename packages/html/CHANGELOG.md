# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.43.0 (2024-07-23)


### Bug Fixes

* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f8273e454c4b103e0ed1965c18542f125482))
* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07379e59081c930d61485764e78c8a07a90))
* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf369d6d4081f0f5d9285bf3b1fd9b5b5999))
* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ada4d7aad0ffe9ea5cf004b49ccec6710de))
* **html/common:** correct BreakdownTable tooltip height calculation ([5c77723](https://github.com/hpcc-systems/Visualization/commit/5c77723639ade13b1d07001d1e7b05cbddb5c805))


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))
* Add MiniGantt back compat to React timeline ([dac0ce8](https://github.com/hpcc-systems/Visualization/commit/dac0ce8d90736171a113b3918a5b075331039d6d))
* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))
* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))
* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d6819c6fd166f74e7385446dd477e8a1cdd01))
* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)
* **html:** Add BreakdownTable.ts ([32d0508](https://github.com/hpcc-systems/Visualization/commit/32d0508dcd6c0c684a37c1c4433a01950abf03de))
* **html:** Add HTMLTooltip.ts ([de56368](https://github.com/hpcc-systems/Visualization/commit/de56368525f205208500b8e722cf0f9466ac150c))
* **html:** Add SimpleTable.ts ([879977f](https://github.com/hpcc-systems/Visualization/commit/879977f7d9bd7bfb39a0dedb78b1f5b525fedd43))
* **html:** Add StatsTable.ts ([0fb04ec](https://github.com/hpcc-systems/Visualization/commit/0fb04ec100b746a0fd288a6bb82fccba3222dee0))
* **html:** Add StyledTable.ts ([9463632](https://github.com/hpcc-systems/Visualization/commit/94636321e5c24a5e132ff5f0aab28cfb575d5def))
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))
* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfacc1b162f1a5d02b06d434375424b7d225f))
* **PReact:** Bump PReact version and add some widgets ([19658d3](https://github.com/hpcc-systems/Visualization/commit/19658d337127fac2e9e4b56d430100c77cf9fdad))


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))
* Revert "chore: Rework shim inclusion" ([462d55c](https://github.com/hpcc-systems/Visualization/commit/462d55c0b89cb74c6f2aacc29ccafebaf5a2c46c))






## [3.2.4](https://github.com/hpcc-systems/Visualization/compare/html-v3.2.3...html-v3.2.4) (2025-07-03)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.2 to ^3.3.3
    * @hpcc-js/react bumped from ^3.2.3 to ^3.2.4
    * @hpcc-js/util bumped from ^3.3.2 to ^3.3.3
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.2 to ^1.4.3

## [3.2.3](https://github.com/hpcc-systems/Visualization/compare/html-v3.2.2...html-v3.2.3) (2025-06-24)


### Bug Fixes

* Sourcemaps out of sync ([c46b154](https://github.com/hpcc-systems/Visualization/commit/c46b1546855ee4a45bc299203dea430e84912d40))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.1 to ^3.3.2
    * @hpcc-js/react bumped from ^3.2.2 to ^3.2.3
    * @hpcc-js/util bumped from ^3.3.1 to ^3.3.2
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.1 to ^1.4.2

## [3.2.2](https://github.com/hpcc-systems/Visualization/compare/html-v3.2.1...html-v3.2.2) (2025-04-03)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.3.0 to ^3.3.1
    * @hpcc-js/react bumped from ^3.2.1 to ^3.2.2
    * @hpcc-js/util bumped from ^3.3.0 to ^3.3.1
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.0 to ^1.4.1

## [3.2.1](https://github.com/hpcc-systems/Visualization/compare/html-v3.2.0...html-v3.2.1) (2024-11-29)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/react bumped from ^3.2.0 to ^3.2.1

## [3.2.0](https://github.com/hpcc-systems/Visualization/compare/html-v3.1.1...html-v3.2.0) (2024-11-28)


### Features

* Drop preact-shim and bump versions ([92add6f](https://github.com/hpcc-systems/Visualization/commit/92add6fffd2bbc932c134a30651577722697e14b))
* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.2.0 to ^3.3.0
    * @hpcc-js/react bumped from ^3.1.1 to ^3.2.0
    * @hpcc-js/util bumped from ^3.2.0 to ^3.3.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.3.0 to ^1.4.0

## [3.1.1](https://github.com/hpcc-systems/Visualization/compare/html-v3.1.0...html-v3.1.1) (2024-11-20)


### Bug Fixes

* Revert react back to preact ([9c2e0f0](https://github.com/hpcc-systems/Visualization/commit/9c2e0f0cbf7c43561b7f2c0707d5fb95971bd5ef))

## [3.1.0](https://github.com/hpcc-systems/Visualization/compare/html-v3.0.0...html-v3.1.0) (2024-11-20)


### Features

* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))
* Switch to esbuild and ESM first packaging ([b752510](https://github.com/hpcc-systems/Visualization/commit/b752510b5074fbc9a606e4d189412798c241f414))
* Upgrade graph, html and react to v3 ([a1aa027](https://github.com/hpcc-systems/Visualization/commit/a1aa02785ed97c4ee18b3a83ab341f0423956b7c))
* Upgrade layout to v3 ([cbc463a](https://github.com/hpcc-systems/Visualization/commit/cbc463acb24fc2e7d0f3da93b4c0d9c6915aabd8))


### Bug Fixes

* **html/common:** correct BreakdownTable tooltip height calculation ([5c77723](https://github.com/hpcc-systems/Visualization/commit/5c77723639ade13b1d07001d1e7b05cbddb5c805))
* Remove preact references from html ([c78df51](https://github.com/hpcc-systems/Visualization/commit/c78df51374830780123c1a80000f9b5e3da94e8c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.1.0 to ^3.2.0
    * @hpcc-js/util bumped from ^3.1.0 to ^3.2.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.2.0 to ^1.3.0

## [2.44.0](https://github.com/hpcc-systems/Visualization/compare/html-v2.43.0...html-v2.44.0) (2024-10-23)


### Features

* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))


### Bug Fixes

* **html/common:** correct BreakdownTable tooltip height calculation ([5c77723](https://github.com/hpcc-systems/Visualization/commit/5c77723639ade13b1d07001d1e7b05cbddb5c805))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^2.72.0 to ^2.73.0
    * @hpcc-js/preact-shim bumped from ^2.17.0 to ^2.18.0
    * @hpcc-js/util bumped from ^2.52.0 to ^2.53.0

## [2.42.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.20...@hpcc-js/html@2.42.21) (2024-07-02)



## 2.105.11 (2024-06-25)



## 2.105.10 (2024-06-19)



## 2.105.9 (2024-05-24)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.19...@hpcc-js/html@2.42.20) (2024-05-24)



## 2.105.8 (2024-04-24)



## 2.105.7 (2024-04-22)



## 2.105.6 (2024-04-17)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.18...@hpcc-js/html@2.42.19) (2024-04-17)



## 2.105.5 (2024-03-28)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.17...@hpcc-js/html@2.42.18) (2024-03-28)



## 2.105.4 (2024-03-21)



## 2.105.3 (2024-03-19)



## 2.105.2 (2024-03-15)



## 2.105.1 (2024-03-15)



# 2.105.0 (2024-03-08)



## 2.104.42 (2024-02-28)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.16...@hpcc-js/html@2.42.17) (2024-02-28)



## 2.104.41 (2024-02-16)



## 2.104.40 (2024-02-15)



## 2.104.39 (2024-02-06)



## 2.104.38 (2024-02-06)



## 2.104.37 (2024-01-25)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.15...@hpcc-js/html@2.42.16) (2024-01-25)



## 2.104.36 (2024-01-23)



## 2.104.35 (2024-01-18)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.14...@hpcc-js/html@2.42.15) (2024-01-18)



## 2.104.34 (2024-01-02)



## 2.104.33 (2023-11-16)



## 2.104.32 (2023-11-09)

**Note:** Version bump only for package @hpcc-js/html






## [2.42.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.13...@hpcc-js/html@2.42.14) (2023-11-09)


### Bug Fixes

* **html/common:** correct BreakdownTable tooltip height calculation ([5c77723](https://github.com/hpcc-systems/Visualization/commit/5c77723639ade13b1d07001d1e7b05cbddb5c805))



## 2.104.31 (2023-11-03)



## 2.104.30 (2023-10-26)






## [2.42.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.12...@hpcc-js/html@2.42.13) (2023-10-26)



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.11...@hpcc-js/html@2.42.12) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.10...@hpcc-js/html@2.42.11) (2023-09-14)



## 2.104.25 (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.9...@hpcc-js/html@2.42.10) (2023-06-08)



## 2.104.19 (2023-03-14)



## 2.104.18 (2023-02-22)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.8...@hpcc-js/html@2.42.9) (2023-02-22)



## 2.104.17 (2023-01-20)



## 2.104.16 (2023-01-19)



## 2.104.15 (2022-11-15)



## 2.104.14 (2022-11-11)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.7...@hpcc-js/html@2.42.8) (2022-11-11)



## 2.104.13 (2022-11-09)

**Note:** Version bump only for package @hpcc-js/html






## [2.42.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.6...@hpcc-js/html@2.42.7) (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)

**Note:** Version bump only for package @hpcc-js/html






## [2.42.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.5...@hpcc-js/html@2.42.6) (2022-10-11)



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)



## 2.104.8 (2022-09-29)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.4...@hpcc-js/html@2.42.5) (2022-09-29)



## 2.104.7 (2022-09-28)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.3...@hpcc-js/html@2.42.4) (2022-09-28)



## 2.104.6 (2022-09-21)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.2...@hpcc-js/html@2.42.3) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)



## 2.104.2 (2022-08-17)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.1...@hpcc-js/html@2.42.2) (2022-08-17)



## 2.104.1 (2022-08-16)

**Note:** Version bump only for package @hpcc-js/html





## [2.42.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.42.0...@hpcc-js/html@2.42.1) (2022-08-16)



# 2.104.0 (2022-07-26)

**Note:** Version bump only for package @hpcc-js/html





# [2.42.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.41.7...@hpcc-js/html@2.42.0) (2022-07-26)


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)





## [2.41.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.41.6...@hpcc-js/html@2.41.7) (2022-06-23)



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)

**Note:** Version bump only for package @hpcc-js/html





## [2.41.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.41.5...@hpcc-js/html@2.41.6) (2022-04-27)



## 2.103.1 (2022-04-20)

**Note:** Version bump only for package @hpcc-js/html





## [2.41.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.41.4...@hpcc-js/html@2.41.5) (2022-04-20)



# 2.103.0 (2022-04-07)

**Note:** Version bump only for package @hpcc-js/html





## [2.41.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.41.3...@hpcc-js/html@2.41.4) (2022-04-07)



## 2.102.11 (2022-03-24)

**Note:** Version bump only for package @hpcc-js/html





## [2.41.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.41.2...@hpcc-js/html@2.41.3) (2022-03-24)



## 2.102.10 (2022-03-15)



## 2.102.9 (2022-03-15)



## 2.102.8 (2022-03-15)

**Note:** Version bump only for package @hpcc-js/html





## [2.41.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.41.1...@hpcc-js/html@2.41.2) (2022-03-15)



## 2.102.7 (2022-03-14)



## 2.102.6 (2022-03-11)



## 2.102.5 (2022-03-11)



## 2.102.4 (2022-03-10)



## 2.102.3 (2022-03-10)



## 2.102.2 (2022-03-08)



## 2.102.1 (2022-03-08)

**Note:** Version bump only for package @hpcc-js/html





## [2.41.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.41.0...@hpcc-js/html@2.41.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/html





# [2.41.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.40.0...@hpcc-js/html@2.41.0) (2022-03-07)


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





# [2.40.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.40.0) (2022-02-23)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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






# [2.39.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.39.0) (2022-02-10)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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






# [2.38.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.38.0) (2022-02-10)


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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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






# [2.37.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.37.0) (2022-02-09)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.36.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.36.0) (2022-01-20)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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






# [2.35.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.35.0) (2022-01-19)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.34.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.34.0) (2021-11-08)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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






# [2.33.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.33.0) (2021-10-03)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.32.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.32.0) (2021-09-08)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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






# [2.31.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.31.0) (2021-08-25)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.30.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.30.0) (2021-08-04)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.29.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.29.0) (2021-08-04)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.28.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.28.0) (2021-08-04)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.27.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.27.0) (2021-07-28)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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






# [2.26.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.26.0) (2021-07-16)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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






# [2.25.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.25.0) (2021-07-02)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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






# [2.24.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.24.0) (2021-06-15)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.23.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.23.0) (2021-04-06)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.22.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.22.0) (2021-02-22)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.21.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.21.0) (2021-02-19)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.20.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.20.0) (2020-12-15)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.19.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.19.0) (2020-12-01)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.18.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.18.0) (2020-11-10)



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


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.17.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.17.0) (2020-10-09)



# 2.43.0 (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.16.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.16.0) (2020-10-08)



# 2.42.0 (2020-09-24)



# 2.41.0 (2020-09-18)



# 2.40.0 (2020-09-15)



# 2.39.0 (2020-09-09)


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.15.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.15.0) (2020-09-09)


### Features

* Added weight markers to DirectoryTree.ts ([73c9b20](https://github.com/hpcc-systems/Visualization/commit/73c9b20473614b20f5b194418c81e9d1ddf98a08))



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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.14.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.14.0) (2020-08-24)


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

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.13.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.13.0) (2020-08-22)



# 2.33.0 (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.12.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.12.0) (2020-08-08)


### Features

* Adds react gantt widgets ([cf869fe](https://github.com/hpcc-systems/Visualization/commit/cf869fea1997f54ad4057bd4e939bd39eea071eb))



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.11.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.11.0) (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.10.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.10.0) (2020-07-22)


### Features

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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





# [2.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.9.0) (2020-07-22)


### Features

* **Graph2:** Add vertex tooltip support ([461f096](https://github.com/hpcc-systems/Visualization/commit/461f096dff5b33c1b8d430f27b67dd7240f2a544)), closes [#3646](https://github.com/hpcc-systems/Visualization/issues/3646)



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






## [2.8.23](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.23) (2020-06-23)



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

**Note:** Version bump only for package @hpcc-js/html





## [2.8.22](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.22) (2020-06-17)



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

**Note:** Version bump only for package @hpcc-js/html





## [2.8.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.21) (2020-06-17)



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

**Note:** Version bump only for package @hpcc-js/html





## [2.8.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.20) (2020-06-15)



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

**Note:** Version bump only for package @hpcc-js/html





## [2.8.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.19) (2020-05-31)



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

**Note:** Version bump only for package @hpcc-js/html





## [2.8.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.18) (2020-05-21)



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

**Note:** Version bump only for package @hpcc-js/html





## [2.8.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.17) (2020-05-20)



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

**Note:** Version bump only for package @hpcc-js/html





## [2.8.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.16) (2020-05-19)



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

**Note:** Version bump only for package @hpcc-js/html





## [2.8.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.15) (2020-05-15)



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

**Note:** Version bump only for package @hpcc-js/html





## [2.8.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.14) (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.13) (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.12) (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.11) (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.10) (2020-04-11)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.9) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.7...@hpcc-js/html@2.8.8) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.6...@hpcc-js/html@2.8.7) (2020-04-03)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.5...@hpcc-js/html@2.8.6) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.4...@hpcc-js/html@2.8.5) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/html






## [2.8.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.3...@hpcc-js/html@2.8.4) (2020-03-20)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.2...@hpcc-js/html@2.8.3) (2020-03-02)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.1...@hpcc-js/html@2.8.2) (2020-01-23)

**Note:** Version bump only for package @hpcc-js/html





## [2.8.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.8.0...@hpcc-js/html@2.8.1) (2020-01-22)

**Note:** Version bump only for package @hpcc-js/html





# [2.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.7.5...@hpcc-js/html@2.8.0) (2020-01-07)


### Features

* **PReact:** Bump PReact version and add some widgets ([19658d3](https://github.com/hpcc-systems/Visualization/commit/19658d337127fac2e9e4b56d430100c77cf9fdad))






## [2.7.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.7.4...@hpcc-js/html@2.7.5) (2019-12-11)

**Note:** Version bump only for package @hpcc-js/html





## [2.7.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.7.3...@hpcc-js/html@2.7.4) (2019-09-27)


### Bug Fixes

* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f82))





## [2.7.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.7.2...@hpcc-js/html@2.7.3) (2019-09-26)

**Note:** Version bump only for package @hpcc-js/html





## [2.7.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.7.1...@hpcc-js/html@2.7.2) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/html





## [2.7.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.7.0...@hpcc-js/html@2.7.1) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/html





# [2.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.16...@hpcc-js/html@2.7.0) (2019-08-13)


### Features

* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d681))





## [2.6.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.15...@hpcc-js/html@2.6.16) (2019-08-06)

**Note:** Version bump only for package @hpcc-js/html





## [2.6.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.14...@hpcc-js/html@2.6.15) (2019-08-01)

**Note:** Version bump only for package @hpcc-js/html





## [2.6.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.13...@hpcc-js/html@2.6.14) (2019-07-10)

**Note:** Version bump only for package @hpcc-js/html






## [2.6.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.12...@hpcc-js/html@2.6.13) (2019-07-03)

**Note:** Version bump only for package @hpcc-js/html





## [2.6.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.11...@hpcc-js/html@2.6.12) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/html





## [2.6.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.10...@hpcc-js/html@2.6.11) (2019-06-26)


### Bug Fixes

* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07))






## [2.6.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.9...@hpcc-js/html@2.6.10) (2019-06-20)


### Bug Fixes

* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf3))





## [2.6.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.8...@hpcc-js/html@2.6.9) (2019-06-14)

**Note:** Version bump only for package @hpcc-js/html






## [2.6.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.7...@hpcc-js/html@2.6.8) (2019-05-16)

**Note:** Version bump only for package @hpcc-js/html






## [2.6.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.6...@hpcc-js/html@2.6.7) (2019-04-27)

**Note:** Version bump only for package @hpcc-js/html






## [2.6.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.2...@hpcc-js/html@2.6.6) (2019-04-06)

**Note:** Version bump only for package @hpcc-js/html






## [2.6.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.2...@hpcc-js/html@2.6.4) (2019-04-05)

**Note:** Version bump only for package @hpcc-js/graph






## [2.6.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.2...@hpcc-js/html@2.6.3) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/html






## [2.6.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.6.1...@hpcc-js/html@2.6.2) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/html






## [2.6.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.4.0...@hpcc-js/html@2.6.1) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/graph






# [2.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.2.0...@hpcc-js/html@2.6.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/graph






# [2.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.2.0...@hpcc-js/html@2.5.0) (2019-04-01)

**Note:** Version bump only for package @hpcc-js/graph






# [2.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.2.0...@hpcc-js/html@2.4.0) (2019-03-29)

**Note:** Version bump only for package @hpcc-js/graph






# [2.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.2.0...@hpcc-js/html@2.3.0) (2019-03-21)


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))






# [2.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.1.0...@hpcc-js/html@2.2.0) (2019-03-07)


### Features

* **html:** Add BreakdownTable.ts ([32d0508](https://github.com/hpcc-systems/Visualization/commit/32d0508))
* **html:** Add StatsTable.ts ([0fb04ec](https://github.com/hpcc-systems/Visualization/commit/0fb04ec))






# [2.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.14...@hpcc-js/html@2.1.0) (2019-03-06)


### Features

* **html:** Add HTMLTooltip.ts ([de56368](https://github.com/hpcc-systems/Visualization/commit/de56368))
* **html:** Add SimpleTable.ts ([879977f](https://github.com/hpcc-systems/Visualization/commit/879977f))
* **html:** Add StyledTable.ts ([9463632](https://github.com/hpcc-systems/Visualization/commit/9463632))






## [2.0.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.13...@hpcc-js/html@2.0.14) (2019-02-19)

**Note:** Version bump only for package @hpcc-js/html






## [2.0.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.12...@hpcc-js/html@2.0.13) (2019-01-29)

**Note:** Version bump only for package @hpcc-js/html






## [2.0.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.11...@hpcc-js/html@2.0.12) (2019-01-08)

**Note:** Version bump only for package @hpcc-js/html






## [2.0.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.10...@hpcc-js/html@2.0.11) (2018-12-13)

**Note:** Version bump only for package @hpcc-js/html






## [2.0.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.9...@hpcc-js/html@2.0.10) (2018-12-06)

**Note:** Version bump only for package @hpcc-js/html






## [2.0.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.8...@hpcc-js/html@2.0.9) (2018-12-04)

**Note:** Version bump only for package @hpcc-js/html






## [2.0.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.7...@hpcc-js/html@2.0.8) (2018-11-27)

**Note:** Version bump only for package @hpcc-js/html






<a name="2.0.7"></a>
## [2.0.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.6...@hpcc-js/html@2.0.7) (2018-11-26)

**Note:** Version bump only for package @hpcc-js/html





<a name="2.0.6"></a>
## [2.0.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.5...@hpcc-js/html@2.0.6) (2018-11-08)

**Note:** Version bump only for package @hpcc-js/html





<a name="2.0.5"></a>
## [2.0.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.4...@hpcc-js/html@2.0.5) (2018-10-30)

**Note:** Version bump only for package @hpcc-js/html





<a name="2.0.4"></a>
## [2.0.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.3...@hpcc-js/html@2.0.4) (2018-10-05)

**Note:** Version bump only for package @hpcc-js/html





<a name="2.0.3"></a>
## [2.0.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.2...@hpcc-js/html@2.0.3) (2018-09-24)

**Note:** Version bump only for package @hpcc-js/html





<a name="2.0.2"></a>
## [2.0.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.1...@hpcc-js/html@2.0.2) (2018-09-10)

**Note:** Version bump only for package @hpcc-js/html





<a name="2.0.1"></a>
## [2.0.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@2.0.0...@hpcc-js/html@2.0.1) (2018-09-01)

**Note:** Version bump only for package @hpcc-js/html





<a name="2.0.0"></a>
# [2.0.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.104...@hpcc-js/html@2.0.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/html





<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.104...@hpcc-js/html@2.0.0-rc.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/html





<a name="0.0.104"></a>
## [0.0.104](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.103...@hpcc-js/html@0.0.104) (2018-08-23)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.103"></a>
## [0.0.103](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.102...@hpcc-js/html@0.0.103) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.102"></a>
## [0.0.102](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.101...@hpcc-js/html@0.0.102) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.101"></a>
## [0.0.101](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.100...@hpcc-js/html@0.0.101) (2018-08-10)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.100"></a>
## [0.0.100](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.99...@hpcc-js/html@0.0.100) (2018-08-02)


### Bug Fixes

* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ad))




<a name="0.0.99"></a>
## [0.0.99](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.98...@hpcc-js/html@0.0.99) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.98"></a>
## [0.0.98](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.97...@hpcc-js/html@0.0.98) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.97"></a>
## [0.0.97](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.96...@hpcc-js/html@0.0.97) (2018-07-29)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.96"></a>
## [0.0.96](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.95...@hpcc-js/html@0.0.96) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.95"></a>
## [0.0.95](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.94...@hpcc-js/html@0.0.95) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.94"></a>
## [0.0.94](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.93...@hpcc-js/html@0.0.94) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.93"></a>
## [0.0.93](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.92...@hpcc-js/html@0.0.93) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.92"></a>
## [0.0.92](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.91...@hpcc-js/html@0.0.92) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.91"></a>
## [0.0.91](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.90...@hpcc-js/html@0.0.91) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.90"></a>
## [0.0.90](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.89...@hpcc-js/html@0.0.90) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.89"></a>
## [0.0.89](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.88...@hpcc-js/html@0.0.89) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.88"></a>
## [0.0.88](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.87...@hpcc-js/html@0.0.88) (2018-06-28)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.87"></a>
## [0.0.87](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.86...@hpcc-js/html@0.0.87) (2018-06-22)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.86"></a>
## [0.0.86](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.85...@hpcc-js/html@0.0.86) (2018-06-20)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.85"></a>
## [0.0.85](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.84...@hpcc-js/html@0.0.85) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.84"></a>
## [0.0.84](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.83...@hpcc-js/html@0.0.84) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.83"></a>
## [0.0.83](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.82...@hpcc-js/html@0.0.83) (2018-06-15)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.82"></a>
## [0.0.82](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.81...@hpcc-js/html@0.0.82) (2018-06-14)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.81"></a>
## [0.0.81](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.80...@hpcc-js/html@0.0.81) (2018-06-01)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.80"></a>
## [0.0.80](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.79...@hpcc-js/html@0.0.80) (2018-05-28)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.79"></a>
## [0.0.79](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.78...@hpcc-js/html@0.0.79) (2018-05-21)




**Note:** Version bump only for package @hpcc-js/html

<a name="0.0.78"></a>
## [0.0.78](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/html@0.0.77...@hpcc-js/html@0.0.78) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/html
