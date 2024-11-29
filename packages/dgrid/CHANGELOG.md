# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.33.0 (2024-07-23)


### Bug Fixes

*  DGrid table sorting fails when undefined cells exist ([19864cb](https://github.com/hpcc-systems/Visualization/commit/19864cbb098dc1dcfe05958a1e23aac5e48e33e9))
*  Undefined background color issue ([957d362](https://github.com/hpcc-systems/Visualization/commit/957d362862c1f0679fd1930c1b1f863a064f528a))
* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f8273e454c4b103e0ed1965c18542f125482))
* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07379e59081c930d61485764e78c8a07a90))
* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf369d6d4081f0f5d9285bf3b1fd9b5b5999))
* Custom cell render fails with plain string ([3cd8004](https://github.com/hpcc-systems/Visualization/commit/3cd80047be277304dfcf52f6274af8878f0f9cba))
* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ada4d7aad0ffe9ea5cf004b49ccec6710de))
* **dgrid:**  DatasourceStore defaulting to page "-1" ([31cadd4](https://github.com/hpcc-systems/Visualization/commit/31cadd4de5bd5bf36ae63da17a2dd039974888d7))
* **dgrid:**  Typo in multiSelect property ([399bed7](https://github.com/hpcc-systems/Visualization/commit/399bed713a00a6ff95d482ff4bb90cf200f194e5))
* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)
* **dgrid:** Click regression (multi selection) ([19616d0](https://github.com/hpcc-systems/Visualization/commit/19616d06313b8c9670fbd8697db782140fefa26a))
* **dgrid:** Exit/Enter/Update Issue ([19d9e90](https://github.com/hpcc-systems/Visualization/commit/19d9e906ae7e587850d26845d576f920346255c8))
* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))
* **dgrid:** Maintain scroll pos and pagination on refresh. ([0c15ab4](https://github.com/hpcc-systems/Visualization/commit/0c15ab4b03ddd79caabd5a69503888eaae12f11a))
* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))
* **dgrid:** PP for DGrid messages have wrong type ([5d5844b](https://github.com/hpcc-systems/Visualization/commit/5d5844b2c5340b74a30cac93beb3a6d95fab52cd))
* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2c956601f3b4740917c4c35896f7f6c1c4))
* **marshaller:** Finish support for databombs dataset fields ([2e6ab95](https://github.com/hpcc-systems/Visualization/commit/2e6ab953fb4e1cf60113db22ce7c3a601d73917b))
* Potential replace issues ([da7e3ca](https://github.com/hpcc-systems/Visualization/commit/da7e3ca2d314623ff069a9246753b18532762168))
* **PropertyExt:** Hash function very slow ([d846a9e](https://github.com/hpcc-systems/Visualization/commit/d846a9e5dab2e2c8abf7edf2dc46aef71a311ef4))
* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))
* **table:** Remove check for data change from table ([265ee8b](https://github.com/hpcc-systems/Visualization/commit/265ee8b7e4f6e7b87073752a74e8485705bcf184))


### Features

*  Add maxWeight to Heat chart ([59ee802](https://github.com/hpcc-systems/Visualization/commit/59ee80246e45fa5464f6fed4ed7f488ee3fca0cb))
*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))
* Auto size columns on table load. ([c78bd60](https://github.com/hpcc-systems/Visualization/commit/c78bd603b781c949501707d5ece394232efcdf00)), closes [#2558](https://github.com/hpcc-systems/Visualization/issues/2558)
* **dashy:** Add preliminary support for "object" field types ([a322fb0](https://github.com/hpcc-systems/Visualization/commit/a322fb031b877951a3f24f48a74927fef3c908a4))
* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))
* **dgrid:** Add custom sort property ([e8543f2](https://github.com/hpcc-systems/Visualization/commit/e8543f29af341e32c2f4415a714ce617337cedc2)), closes [#3192](https://github.com/hpcc-systems/Visualization/issues/3192)
* **dgrid:** Add multi select support ([984a9b9](https://github.com/hpcc-systems/Visualization/commit/984a9b9a701d049cb52f1e073fa6f1062b1d9e2c))
* **dgrid:** Add PP for noDataMessage and loadingMessage ([da3e5da](https://github.com/hpcc-systems/Visualization/commit/da3e5daca49d7d3037b460b6e7d7bbc236073505))
* **dgrid:** Data-driven cell colours ([44ba508](https://github.com/hpcc-systems/Visualization/commit/44ba508075ce305f1c321d461fc7aad85f0b7a10))
* **doc:** Add dgrid/docs/Table.md ([337f47a](https://github.com/hpcc-systems/Visualization/commit/337f47a263d31a8a23fa118b1bbed45bb223ccfb))
* **fgrid:**  Add alternative to dgrid ([3a4841e](https://github.com/hpcc-systems/Visualization/commit/3a4841e7c6f898e0ff8bf0bfa55480c6ee5760d2))
* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d6819c6fd166f74e7385446dd477e8a1cdd01))
* Improve dashy experience ([6b5ed37](https://github.com/hpcc-systems/Visualization/commit/6b5ed3782db2e9c0ed54f6afa33e4ad080ee6e92)), closes [#2532](https://github.com/hpcc-systems/Visualization/issues/2532) [#2531](https://github.com/hpcc-systems/Visualization/issues/2531) [#2530](https://github.com/hpcc-systems/Visualization/issues/2530)
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))
* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfacc1b162f1a5d02b06d434375424b7d225f))
* **Table:** Add cell formatting ([aa067d3](https://github.com/hpcc-systems/Visualization/commit/aa067d3b557c6b8216b39d663c8e9886c78c93ff))
* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))






## [3.2.1](https://github.com/hpcc-systems/Visualization/compare/dgrid-v3.2.0...dgrid-v3.2.1) (2024-11-29)


### Bug Fixes

* Nested datasets not rendering correctly ([71d18a4](https://github.com/hpcc-systems/Visualization/commit/71d18a4958fb892b49ed56cc0332542aefee8b63))
* Paged dgrid failing in strict mode ([9a738c1](https://github.com/hpcc-systems/Visualization/commit/9a738c11a9e72c6204273540c0fc056b6789872b))


### Dependencies

* The following workspace dependencies were updated
  * peerDependencies
    * @hpcc-js/dgrid-shim bumped from ^3.1.0 to ^3.1.1

## [3.2.0](https://github.com/hpcc-systems/Visualization/compare/dgrid-v3.1.0...dgrid-v3.2.0) (2024-11-28)


### Features

* Drop preact-shim and bump versions ([92add6f](https://github.com/hpcc-systems/Visualization/commit/92add6fffd2bbc932c134a30651577722697e14b))
* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.2.0 to ^3.3.0
    * @hpcc-js/util bumped from ^3.2.0 to ^3.3.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.3.0 to ^1.4.0

## [3.1.0](https://github.com/hpcc-systems/Visualization/compare/dgrid-v3.0.0...dgrid-v3.1.0) (2024-11-20)


### Features

* Add dgrid ([da14281](https://github.com/hpcc-systems/Visualization/commit/da14281ee8c91d6440734f6cf3cb1bfb6118a415))
* Add maxWeight to Heat chart ([59ee802](https://github.com/hpcc-systems/Visualization/commit/59ee80246e45fa5464f6fed4ed7f488ee3fca0cb))
* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))
* Switch to esbuild and ESM first packaging ([b752510](https://github.com/hpcc-systems/Visualization/commit/b752510b5074fbc9a606e4d189412798c241f414))
* Upgrade ddl-shim to v3 ([4861665](https://github.com/hpcc-systems/Visualization/commit/4861665dabe9b485c567bc40028849cfb1cb3171))
* Upgrade eclwatch to v3 ([a32c104](https://github.com/hpcc-systems/Visualization/commit/a32c10417922a45b450731d4331280576db8025f))
* Upgrade layout to v3 ([cbc463a](https://github.com/hpcc-systems/Visualization/commit/cbc463acb24fc2e7d0f3da93b4c0d9c6915aabd8))


### Bug Fixes

* Custom cell render fails with plain string ([3cd8004](https://github.com/hpcc-systems/Visualization/commit/3cd80047be277304dfcf52f6274af8878f0f9cba))
* Revert arguments removal ([20c34f1](https://github.com/hpcc-systems/Visualization/commit/20c34f17c8a49bc4a608631f4d1f7b4140b5270e))
* Undefined background color issue ([957d362](https://github.com/hpcc-systems/Visualization/commit/957d362862c1f0679fd1930c1b1f863a064f528a))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^3.1.0 to ^3.2.0
    * @hpcc-js/dgrid-shim bumped from ^3.0.0 to ^3.1.0
    * @hpcc-js/util bumped from ^3.1.0 to ^3.2.0
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.2.0 to ^1.3.0

## [2.34.0](https://github.com/hpcc-systems/Visualization/compare/dgrid-v2.33.0...dgrid-v2.34.0) (2024-10-23)


### Features

* Add maxWeight to Heat chart ([59ee802](https://github.com/hpcc-systems/Visualization/commit/59ee80246e45fa5464f6fed4ed7f488ee3fca0cb))
* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))


### Bug Fixes

* Custom cell render fails with plain string ([3cd8004](https://github.com/hpcc-systems/Visualization/commit/3cd80047be277304dfcf52f6274af8878f0f9cba))
* Undefined background color issue ([957d362](https://github.com/hpcc-systems/Visualization/commit/957d362862c1f0679fd1930c1b1f863a064f528a))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @hpcc-js/common bumped from ^2.72.0 to ^2.73.0
    * @hpcc-js/ddl-shim bumped from ^2.21.0 to ^2.22.0
    * @hpcc-js/dgrid-shim bumped from ^2.25.0 to ^2.26.0
    * @hpcc-js/util bumped from ^2.52.0 to ^2.53.0

## [2.32.23](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.22...@hpcc-js/dgrid@2.32.23) (2024-07-10)


### Bug Fixes

*  Undefined background color issue ([957d362](https://github.com/hpcc-systems/Visualization/commit/957d362862c1f0679fd1930c1b1f863a064f528a))



## 2.105.13 (2024-07-09)





## [2.32.22](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.21...@hpcc-js/dgrid@2.32.22) (2024-07-09)


### Bug Fixes

* Custom cell render fails with plain string ([3cd8004](https://github.com/hpcc-systems/Visualization/commit/3cd80047be277304dfcf52f6274af8878f0f9cba))



## 2.105.12 (2024-07-02)






## [2.32.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.20...@hpcc-js/dgrid@2.32.21) (2024-07-02)



## 2.105.11 (2024-06-25)



## 2.105.10 (2024-06-19)



## 2.105.9 (2024-05-24)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.19...@hpcc-js/dgrid@2.32.20) (2024-05-24)



## 2.105.8 (2024-04-24)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.32.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.18...@hpcc-js/dgrid@2.32.19) (2024-04-24)



## 2.105.7 (2024-04-22)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.32.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.17...@hpcc-js/dgrid@2.32.18) (2024-04-22)



## 2.105.6 (2024-04-17)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.16...@hpcc-js/dgrid@2.32.17) (2024-04-17)



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

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.15...@hpcc-js/dgrid@2.32.16) (2024-01-25)



## 2.104.36 (2024-01-23)



## 2.104.35 (2024-01-18)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.14...@hpcc-js/dgrid@2.32.15) (2024-01-18)



## 2.104.34 (2024-01-02)



## 2.104.33 (2023-11-16)



## 2.104.32 (2023-11-09)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.32.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.13...@hpcc-js/dgrid@2.32.14) (2023-11-09)



## 2.104.31 (2023-11-03)



## 2.104.30 (2023-10-26)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.32.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.12...@hpcc-js/dgrid@2.32.13) (2023-10-26)



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.11...@hpcc-js/dgrid@2.32.12) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.10...@hpcc-js/dgrid@2.32.11) (2023-09-14)



## 2.104.25 (2023-07-17)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.32.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.9...@hpcc-js/dgrid@2.32.10) (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.8...@hpcc-js/dgrid@2.32.9) (2023-06-08)



## 2.104.19 (2023-03-14)



## 2.104.18 (2023-02-22)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.7...@hpcc-js/dgrid@2.32.8) (2023-02-22)



## 2.104.17 (2023-01-20)



## 2.104.16 (2023-01-19)



## 2.104.15 (2022-11-15)



## 2.104.14 (2022-11-11)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.6...@hpcc-js/dgrid@2.32.7) (2022-11-11)



## 2.104.13 (2022-11-09)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.32.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.5...@hpcc-js/dgrid@2.32.6) (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.32.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.4...@hpcc-js/dgrid@2.32.5) (2022-10-11)



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)



## 2.104.8 (2022-09-29)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.3...@hpcc-js/dgrid@2.32.4) (2022-09-29)



## 2.104.7 (2022-09-28)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.2...@hpcc-js/dgrid@2.32.3) (2022-09-28)



## 2.104.6 (2022-09-21)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.1...@hpcc-js/dgrid@2.32.2) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)



## 2.104.2 (2022-08-17)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.32.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.32.0...@hpcc-js/dgrid@2.32.1) (2022-08-17)



## 2.104.1 (2022-08-16)



# 2.104.0 (2022-07-26)

**Note:** Version bump only for package @hpcc-js/dgrid





# [2.32.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.31.3...@hpcc-js/dgrid@2.32.0) (2022-07-26)


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)





## [2.31.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.31.2...@hpcc-js/dgrid@2.31.3) (2022-06-23)



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.31.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.31.1...@hpcc-js/dgrid@2.31.2) (2022-04-27)



## 2.103.1 (2022-04-20)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.31.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.31.0...@hpcc-js/dgrid@2.31.1) (2022-04-20)



# 2.103.0 (2022-04-07)

**Note:** Version bump only for package @hpcc-js/dgrid





# [2.31.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.30.3...@hpcc-js/dgrid@2.31.0) (2022-04-07)


### Features

* **fgrid:**  Add alternative to dgrid ([3a4841e](https://github.com/hpcc-systems/Visualization/commit/3a4841e7c6f898e0ff8bf0bfa55480c6ee5760d2))



## 2.102.11 (2022-03-24)





## [2.30.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.30.2...@hpcc-js/dgrid@2.30.3) (2022-03-24)



## 2.102.10 (2022-03-15)



## 2.102.9 (2022-03-15)



## 2.102.8 (2022-03-15)



## 2.102.7 (2022-03-14)



## 2.102.6 (2022-03-11)



## 2.102.5 (2022-03-11)



## 2.102.4 (2022-03-10)



## 2.102.3 (2022-03-10)



## 2.102.2 (2022-03-08)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.30.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.30.1...@hpcc-js/dgrid@2.30.2) (2022-03-08)



## 2.102.1 (2022-03-08)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.30.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.30.0...@hpcc-js/dgrid@2.30.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/dgrid





# [2.30.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.29.1...@hpcc-js/dgrid@2.30.0) (2022-03-07)


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





## [2.29.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.29.0...@hpcc-js/dgrid@2.29.1) (2022-03-04)

**Note:** Version bump only for package @hpcc-js/dgrid





# [2.29.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.29.0) (2022-02-23)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))






# [2.28.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.28.0) (2022-02-18)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.27.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.27.0) (2022-02-10)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))






# [2.26.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.26.0) (2022-02-10)


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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))






# [2.25.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.25.0) (2022-02-09)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.24.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.24.0) (2022-01-20)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))






# [2.23.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.23.0) (2022-01-19)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.22.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.22.0) (2021-11-08)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.21.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.21.0) (2021-10-15)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.20.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.20.0) (2021-10-15)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))






# [2.19.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.19.0) (2021-10-03)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.18.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.18.0) (2021-09-08)



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


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))






# [2.17.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.17.0) (2021-08-25)



# 2.80.0 (2021-08-16)



# 2.79.0 (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.16.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.16.0) (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.15.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.15.0) (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.14.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.14.0) (2021-08-04)



# 2.76.0 (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.13.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.13.0) (2021-07-28)



# 2.75.0 (2021-07-21)



# 2.74.0 (2021-07-19)



# 2.73.0 (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))






# [2.12.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.12.0) (2021-07-16)



# 2.72.0 (2021-07-07)



# 2.71.0 (2021-07-02)


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))






# [2.11.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.11.0) (2021-07-02)


### Features

* **dgrid:**  Allow selection to be set ([6d75d61](https://github.com/hpcc-systems/Visualization/commit/6d75d61c462751f38a40f3ac9da9c6c6e802fb0e))



# 2.70.0 (2021-06-23)



# 2.69.0 (2021-06-23)



# 2.68.0 (2021-06-16)



# 2.67.0 (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))






# [2.10.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.10.0) (2021-06-15)



# 2.66.0 (2021-05-26)



# 2.65.0 (2021-05-19)



# 2.64.0 (2021-05-13)



# 2.63.0 (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





# [2.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.9.0) (2021-05-08)


### Features

* **WUResult:**  Add optional filter ([6c8ef3a](https://github.com/hpcc-systems/Visualization/commit/6c8ef3a7edaf7cedf95e8b95e93884a223b4cd37))



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.43](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.43) (2021-04-06)



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.42](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.42) (2021-02-22)



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.41](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.41) (2021-02-19)



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


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.40](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.40) (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.39](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.39) (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.38](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.38) (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.37](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.37) (2020-10-23)


### Bug Fixes

* **Result:**  Improved SET OF support ([4472ead](https://github.com/hpcc-systems/Visualization/commit/4472eadadc1eac98cba4dc3bb111421ae204674f))



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.36](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.36) (2020-10-09)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.35](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.35) (2020-10-08)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.34](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.34) (2020-09-09)


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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.33](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.33) (2020-08-22)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.32](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.32) (2020-08-08)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.31](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.31) (2020-08-05)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.30](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.30) (2020-07-22)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.29](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.29) (2020-07-22)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))






## [2.8.28](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.28) (2020-06-23)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.27](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.27) (2020-06-17)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.26](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.26) (2020-06-17)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.25](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.25) (2020-06-17)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.24](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.24) (2020-06-15)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.23](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.23) (2020-05-31)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.22](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.22) (2020-05-21)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.21) (2020-05-20)



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


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.20) (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.19) (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.18) (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.17) (2020-05-12)



## 2.15.14 (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.16) (2020-05-07)



## 2.15.13 (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.15) (2020-04-24)



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.14) (2020-04-21)


### Bug Fixes

* **dgrid:** Formatter cell renderer regression ([58f7c1d](https://github.com/hpcc-systems/Visualization/commit/58f7c1d8b94dafd5ee9b900dcf66a8352bdd402b))



## 2.15.10 (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.13) (2020-04-21)


### Bug Fixes

* **dgrid:** Allow embedding of html by default ([75157f1](https://github.com/hpcc-systems/Visualization/commit/75157f19685c77b31780c0d77ea1072f4c5879aa)), closes [#3573](https://github.com/hpcc-systems/Visualization/issues/3573)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.12) (2020-04-17)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.11) (2020-04-11)



## 2.15.7 (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.10) (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.8...@hpcc-js/dgrid@2.8.9) (2020-04-11)


### Bug Fixes

* **dgrid:** Nested tables not rendering correctly ([4e92090](https://github.com/hpcc-systems/Visualization/commit/4e92090fc98f76a99a14b135090f91ebe2ca4bc3))





## [2.8.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.7...@hpcc-js/dgrid@2.8.8) (2020-04-03)


### Bug Fixes

* **dgrid:**  Typo in multiSelect property ([399bed7](https://github.com/hpcc-systems/Visualization/commit/399bed713a00a6ff95d482ff4bb90cf200f194e5))





## [2.8.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.6...@hpcc-js/dgrid@2.8.7) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.8.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.5...@hpcc-js/dgrid@2.8.6) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.8.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.4...@hpcc-js/dgrid@2.8.5) (2020-03-20)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.8.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.3...@hpcc-js/dgrid@2.8.4) (2020-03-12)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.8.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.2...@hpcc-js/dgrid@2.8.3) (2020-03-05)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.8.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.1...@hpcc-js/dgrid@2.8.2) (2020-03-02)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.8.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.8.0...@hpcc-js/dgrid@2.8.1) (2020-02-14)


### Bug Fixes

* **dgrid:** Click regression (multi selection) ([19616d0](https://github.com/hpcc-systems/Visualization/commit/19616d06313b8c9670fbd8697db782140fefa26a))





# [2.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.7.5...@hpcc-js/dgrid@2.8.0) (2020-02-13)


### Features

* **dgrid:** Add multi select support ([984a9b9](https://github.com/hpcc-systems/Visualization/commit/984a9b9a701d049cb52f1e073fa6f1062b1d9e2c))





## [2.7.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.7.4...@hpcc-js/dgrid@2.7.5) (2020-02-07)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.7.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.7.3...@hpcc-js/dgrid@2.7.4) (2020-01-29)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.7.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.7.2...@hpcc-js/dgrid@2.7.3) (2020-01-23)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.7.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.7.1...@hpcc-js/dgrid@2.7.2) (2020-01-22)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.7.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.7.0...@hpcc-js/dgrid@2.7.1) (2020-01-07)

**Note:** Version bump only for package @hpcc-js/dgrid






# [2.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.6.5...@hpcc-js/dgrid@2.7.0) (2019-12-11)


### Features

* **doc:** Add dgrid/docs/Table.md ([337f47a](https://github.com/hpcc-systems/Visualization/commit/337f47a))





## [2.6.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.6.4...@hpcc-js/dgrid@2.6.5) (2019-10-11)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.6.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.6.3...@hpcc-js/dgrid@2.6.4) (2019-09-27)


### Bug Fixes

* **build:** Remove duplicate d3 packages from bundles ([b379f82](https://github.com/hpcc-systems/Visualization/commit/b379f82))





## [2.6.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.6.2...@hpcc-js/dgrid@2.6.3) (2019-09-26)


### Bug Fixes

* **marshaller:** Finish support for databombs dataset fields ([2e6ab95](https://github.com/hpcc-systems/Visualization/commit/2e6ab95))





## [2.6.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.6.1...@hpcc-js/dgrid@2.6.2) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.6.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.6.0...@hpcc-js/dgrid@2.6.1) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/dgrid





# [2.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.5.8...@hpcc-js/dgrid@2.6.0) (2019-08-13)


### Features

* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d681))





## [2.5.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.5.7...@hpcc-js/dgrid@2.5.8) (2019-08-06)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.5.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.5.6...@hpcc-js/dgrid@2.5.7) (2019-08-01)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.5.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.5.5...@hpcc-js/dgrid@2.5.6) (2019-07-10)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.5.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.5.4...@hpcc-js/dgrid@2.5.5) (2019-07-03)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.5.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.5.3...@hpcc-js/dgrid@2.5.4) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.5.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.5.2...@hpcc-js/dgrid@2.5.3) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/dgrid





## [2.5.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.5.1...@hpcc-js/dgrid@2.5.2) (2019-06-26)


### Bug Fixes

* **build:** Source map reference missing in index.min.js ([bf3bb07](https://github.com/hpcc-systems/Visualization/commit/bf3bb07))






## [2.5.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.5.0...@hpcc-js/dgrid@2.5.1) (2019-06-20)


### Bug Fixes

* **build:** Source maps not referencing TS files ([08c3cf3](https://github.com/hpcc-systems/Visualization/commit/08c3cf3))





# [2.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.4.8...@hpcc-js/dgrid@2.5.0) (2019-06-14)


### Features

* **dgrid:** Add custom sort property ([e8543f2](https://github.com/hpcc-systems/Visualization/commit/e8543f2)), closes [#3192](https://github.com/hpcc-systems/Visualization/issues/3192)






## [2.4.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.4.7...@hpcc-js/dgrid@2.4.8) (2019-05-16)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.4.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.4.6...@hpcc-js/dgrid@2.4.7) (2019-04-27)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.4.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.4.2...@hpcc-js/dgrid@2.4.6) (2019-04-06)



## [2.4.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.4.2...@hpcc-js/dgrid@2.4.4) (2019-04-05)



## 2.6.3 (2019-04-02)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.4.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.4.2...@hpcc-js/dgrid@2.4.3) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.4.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.4.1...@hpcc-js/dgrid@2.4.2) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.4.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.2.0...@hpcc-js/dgrid@2.4.1) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/dgrid






# [2.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.16...@hpcc-js/dgrid@2.4.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/dgrid






# [2.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.16...@hpcc-js/dgrid@2.3.0) (2019-04-01)

**Note:** Version bump only for package @hpcc-js/dgrid






# [2.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.16...@hpcc-js/dgrid@2.2.0) (2019-03-29)

**Note:** Version bump only for package @hpcc-js/dgrid






# [2.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.16...@hpcc-js/dgrid@2.1.0) (2019-03-21)


### Bug Fixes

* **dgrid:** Exit/Enter/Update Issue ([19d9e90](https://github.com/hpcc-systems/Visualization/commit/19d9e90))


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))






## [2.0.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.15...@hpcc-js/dgrid@2.0.16) (2019-03-06)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.0.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.14...@hpcc-js/dgrid@2.0.15) (2019-02-19)


### Bug Fixes

* Ensure all widgets can be re-targeted ([d1f02c2](https://github.com/hpcc-systems/Visualization/commit/d1f02c2))






## [2.0.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.13...@hpcc-js/dgrid@2.0.14) (2019-01-29)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.0.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.12...@hpcc-js/dgrid@2.0.13) (2019-01-08)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.0.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.11...@hpcc-js/dgrid@2.0.12) (2018-12-13)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.0.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.10...@hpcc-js/dgrid@2.0.11) (2018-12-06)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.0.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.9...@hpcc-js/dgrid@2.0.10) (2018-12-04)

**Note:** Version bump only for package @hpcc-js/dgrid






## [2.0.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.8...@hpcc-js/dgrid@2.0.9) (2018-11-27)

**Note:** Version bump only for package @hpcc-js/dgrid






<a name="2.0.8"></a>
## [2.0.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.7...@hpcc-js/dgrid@2.0.8) (2018-11-26)

**Note:** Version bump only for package @hpcc-js/dgrid





<a name="2.0.7"></a>
## [2.0.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.6...@hpcc-js/dgrid@2.0.7) (2018-11-08)


### Bug Fixes

* **dgrid:**  DatasourceStore defaulting to page "-1" ([31cadd4](https://github.com/hpcc-systems/Visualization/commit/31cadd4))





<a name="2.0.6"></a>
## [2.0.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.5...@hpcc-js/dgrid@2.0.6) (2018-10-30)

**Note:** Version bump only for package @hpcc-js/dgrid





<a name="2.0.5"></a>
## [2.0.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.4...@hpcc-js/dgrid@2.0.5) (2018-10-05)

**Note:** Version bump only for package @hpcc-js/dgrid





<a name="2.0.4"></a>
## [2.0.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.3...@hpcc-js/dgrid@2.0.4) (2018-09-25)

**Note:** Version bump only for package @hpcc-js/dgrid





<a name="2.0.3"></a>
## [2.0.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.2...@hpcc-js/dgrid@2.0.3) (2018-09-24)


### Bug Fixes

* **dgrid:** Maintain scroll pos and pagination on refresh. ([0c15ab4](https://github.com/hpcc-systems/Visualization/commit/0c15ab4))
* **PropertyExt:** Hash function very slow ([d846a9e](https://github.com/hpcc-systems/Visualization/commit/d846a9e))





<a name="2.0.2"></a>
## [2.0.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.1...@hpcc-js/dgrid@2.0.2) (2018-09-10)

**Note:** Version bump only for package @hpcc-js/dgrid





<a name="2.0.1"></a>
## [2.0.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@2.0.0...@hpcc-js/dgrid@2.0.1) (2018-09-01)


### Bug Fixes

* **table:** Remove check for data change from table ([265ee8b](https://github.com/hpcc-systems/Visualization/commit/265ee8b))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.3.6...@hpcc-js/dgrid@2.0.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/dgrid





<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.3.6...@hpcc-js/dgrid@2.0.0-rc.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/dgrid





<a name="0.3.6"></a>
## [0.3.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.3.5...@hpcc-js/dgrid@0.3.6) (2018-08-23)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.3.5"></a>
## [0.3.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.3.4...@hpcc-js/dgrid@0.3.5) (2018-08-15)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.3.4"></a>
## [0.3.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.3.3...@hpcc-js/dgrid@0.3.4) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.3.3"></a>
## [0.3.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.3.2...@hpcc-js/dgrid@0.3.3) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.3.2"></a>
## [0.3.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.3.1...@hpcc-js/dgrid@0.3.2) (2018-08-12)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.3.1"></a>
## [0.3.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.3.0...@hpcc-js/dgrid@0.3.1) (2018-08-10)


### Bug Fixes

* **dgrid:** PP for DGrid messages have wrong type ([5d5844b](https://github.com/hpcc-systems/Visualization/commit/5d5844b))




<a name="0.3.0"></a>
# [0.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.19...@hpcc-js/dgrid@0.3.0) (2018-08-07)


### Features

* **dgrid:** Add PP for noDataMessage and loadingMessage ([da3e5da](https://github.com/hpcc-systems/Visualization/commit/da3e5da))




<a name="0.2.19"></a>
## [0.2.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.18...@hpcc-js/dgrid@0.2.19) (2018-08-02)


### Bug Fixes

* **d3-event:** d3-event is a global instance. ([92760ad](https://github.com/hpcc-systems/Visualization/commit/92760ad))




<a name="0.2.18"></a>
## [0.2.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.17...@hpcc-js/dgrid@0.2.18) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.17"></a>
## [0.2.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.16...@hpcc-js/dgrid@0.2.17) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.16"></a>
## [0.2.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.15...@hpcc-js/dgrid@0.2.16) (2018-07-29)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.15"></a>
## [0.2.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.14...@hpcc-js/dgrid@0.2.15) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.14"></a>
## [0.2.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.13...@hpcc-js/dgrid@0.2.14) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.13"></a>
## [0.2.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.12...@hpcc-js/dgrid@0.2.13) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.12"></a>
## [0.2.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.11...@hpcc-js/dgrid@0.2.12) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.11"></a>
## [0.2.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.10...@hpcc-js/dgrid@0.2.11) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.10"></a>
## [0.2.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.9...@hpcc-js/dgrid@0.2.10) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.9"></a>
## [0.2.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.8...@hpcc-js/dgrid@0.2.9) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.8"></a>
## [0.2.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.7...@hpcc-js/dgrid@0.2.8) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.7"></a>
## [0.2.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.6...@hpcc-js/dgrid@0.2.7) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.6"></a>
## [0.2.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.5...@hpcc-js/dgrid@0.2.6) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.5"></a>
## [0.2.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.4...@hpcc-js/dgrid@0.2.5) (2018-06-28)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.4"></a>
## [0.2.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.3...@hpcc-js/dgrid@0.2.4) (2018-06-22)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.3"></a>
## [0.2.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.2...@hpcc-js/dgrid@0.2.3) (2018-06-20)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.2"></a>
## [0.2.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.1...@hpcc-js/dgrid@0.2.2) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.1"></a>
## [0.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.2.0...@hpcc-js/dgrid@0.2.1) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.2.0"></a>
# [0.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.10...@hpcc-js/dgrid@0.2.0) (2018-06-19)


### Features

* **dgrid:** Data-driven cell colours ([44ba508](https://github.com/hpcc-systems/Visualization/commit/44ba508))
* **Table:** Add cell formatting ([aa067d3](https://github.com/hpcc-systems/Visualization/commit/aa067d3))




<a name="0.1.10"></a>
## [0.1.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.9...@hpcc-js/dgrid@0.1.10) (2018-06-15)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.1.9"></a>
## [0.1.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.8...@hpcc-js/dgrid@0.1.9) (2018-06-14)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.1.8"></a>
## [0.1.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.7...@hpcc-js/dgrid@0.1.8) (2018-06-01)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.1.7"></a>
## [0.1.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.6...@hpcc-js/dgrid@0.1.7) (2018-05-28)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.1.6"></a>
## [0.1.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.5...@hpcc-js/dgrid@0.1.6) (2018-05-21)


### Bug Fixes

*  DGrid table sorting fails when undefined cells exist ([19864cb](https://github.com/hpcc-systems/Visualization/commit/19864cb))




<a name="0.1.5"></a>
## [0.1.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.4...@hpcc-js/dgrid@0.1.5) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.1.4"></a>
## [0.1.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.3...@hpcc-js/dgrid@0.1.4) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.1.3"></a>
## [0.1.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.2...@hpcc-js/dgrid@0.1.3) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.1.2"></a>
## [0.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.1...@hpcc-js/dgrid@0.1.2) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.1.1"></a>
## [0.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.1.0...@hpcc-js/dgrid@0.1.1) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/dgrid

<a name="0.1.0"></a>
# [0.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dgrid@0.0.88...@hpcc-js/dgrid@0.1.0) (2018-05-16)


### Features

* Auto size columns on table load. ([c78bd60](https://github.com/hpcc-systems/Visualization/commit/c78bd60)), closes [#2558](https://github.com/hpcc-systems/Visualization/issues/2558)
* Improve dashy experience ([6b5ed37](https://github.com/hpcc-systems/Visualization/commit/6b5ed37)), closes [#2532](https://github.com/hpcc-systems/Visualization/issues/2532) [#2531](https://github.com/hpcc-systems/Visualization/issues/2531) [#2530](https://github.com/hpcc-systems/Visualization/issues/2530)
