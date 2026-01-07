# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.2.3](https://github.com/hpcc-systems/Visualization/compare/ddl-shim-v3.2.2...ddl-shim-v3.2.3) (2026-01-07)


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.7.0 to ^1.8.0

## [3.2.2](https://github.com/hpcc-systems/Visualization/compare/ddl-shim-v3.2.1...ddl-shim-v3.2.2) (2025-11-20)


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.6.1 to ^1.7.0

## [3.2.1](https://github.com/hpcc-systems/Visualization/compare/ddl-shim-v3.2.0...ddl-shim-v3.2.1) (2025-10-29)


### Bug Fixes

* revert vite back to the stable releases ([136469b](https://github.com/hpcc-systems/Visualization/commit/136469b0070c2d3090a128361ed411818347c41c))

## [3.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.21.0...@hpcc-js/ddl-shim@3.2.1) (2025-10-29)


### Bug Fixes

* bump versions ([e9719b8](https://github.com/hpcc-systems/Visualization/commit/e9719b875e4c65936921d2e6a0f76ab008b88114))
* Bump versions to latest ([8c541d7](https://github.com/hpcc-systems/Visualization/commit/8c541d75e06bfbe1030ab003b5cccf4af68bc430))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))
* sync test port numbers ([d1b8764](https://github.com/hpcc-systems/Visualization/commit/d1b8764acfeeb17ca91cec8b8f8428f40062b81d))
* vitest workspace is deprecated ([2b2584d](https://github.com/hpcc-systems/Visualization/commit/2b2584db7de0f62ea43144640931fd9d412373ab))
* Windows build and test failing ([6a9952f](https://github.com/hpcc-systems/Visualization/commit/6a9952f3c3fac12ffac01deca2aef2960713b6ff))


### Features

*  Drop preact-shim and bump versions ([92add6f](https://github.com/hpcc-systems/Visualization/commit/92add6fffd2bbc932c134a30651577722697e14b))
* switch to "main" from trunk ([99e2723](https://github.com/hpcc-systems/Visualization/commit/99e272308e283ac58dc2c14d8236f92ba53b6960))
* switch to simpler version stamp method ([d828033](https://github.com/hpcc-systems/Visualization/commit/d828033ec79f56c4d1579bca230bd03cf0d6328e))
* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))
* Upgrade ddl-shim to v3 ([4861665](https://github.com/hpcc-systems/Visualization/commit/4861665dabe9b485c567bc40028849cfb1cb3171))



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






# 2.21.0 (2024-07-23)


### Bug Fixes

*  Add extra references to assist the DDL2 schema generation ([5138367](https://github.com/hpcc-systems/Visualization/commit/5138367bf0e8909ffb35fee74c441644ee0af19d))
*  NodeJS v18 fetch + rejectUnauthorization = false ([d01d23f](https://github.com/hpcc-systems/Visualization/commit/d01d23f5a5f8ed31b233800144be047d7c5f1495))
* **comms:**  NodeJS regression ([c646f6a](https://github.com/hpcc-systems/Visualization/commit/c646f6a0dbe970395a80f5ae0ef2e8923eabacb7)), closes [#3904](https://github.com/hpcc-systems/Visualization/issues/3904)
* DDL upgrade failing on SLIDER ([fbb355c](https://github.com/hpcc-systems/Visualization/commit/fbb355c25357dac25a1bab7b59fb373ee99d5aa6)), closes [#2579](https://github.com/hpcc-systems/Visualization/issues/2579)
* DDL Upgrade Title and Properties are optional ([8de579b](https://github.com/hpcc-systems/Visualization/commit/8de579bd9dc21545e2b3a98f6d9c1851244bfb78)), closes [#2586](https://github.com/hpcc-systems/Visualization/issues/2586)
* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))
* **ddl-shim:** bin / cli not resolving dependencies correctly ([a7983bc](https://github.com/hpcc-systems/Visualization/commit/a7983bc9242b7f1803cbaf16d6b4bc52ed6aebf9))
* **ddl-shim:** npx @hpcc-js/ddl-shim fails with missing module "tslib" ([0f23414](https://github.com/hpcc-systems/Visualization/commit/0f234146ca1e99759027243f6deb4cf85dff1cbf))
* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))
* **ddl-upgrade:** Runtime error upgrading ddl ([13b782a](https://github.com/hpcc-systems/Visualization/commit/13b782a90792b9532297540fe75dabe46d8dca16)), closes [#2605](https://github.com/hpcc-systems/Visualization/issues/2605)
* **ddl-upgrade:** SCALE not handled ([90f24a7](https://github.com/hpcc-systems/Visualization/commit/90f24a712cd9feeb07d53e01322d2547fa1457c9)), closes [#2830](https://github.com/hpcc-systems/Visualization/issues/2830)
* **ddl:** Don't convert FAChar hex values to chars ([22ed38c](https://github.com/hpcc-systems/Visualization/commit/22ed38cb33afc4834f5c6a4af9db9f99547b67aa)), closes [#2917](https://github.com/hpcc-systems/Visualization/issues/2917)
* **ddl:** Merge Dreas changes ([50392f8](https://github.com/hpcc-systems/Visualization/commit/50392f810c7f7f7d36ce3c9ff396861043342d16))
* **ddl:** Optionally lowercase field IDs ([05cc16b](https://github.com/hpcc-systems/Visualization/commit/05cc16bfd863ad8ef24a50b500f2579fa1cc85d9))
* **ddl:** Remove "0" annotations during the upgrade process ([0e268ff](https://github.com/hpcc-systems/Visualization/commit/0e268fff1d629b2ace1b93c04edfad96affd1afc))
* **ddl:** Upgrade tweaks from Drea ([f9ded6a](https://github.com/hpcc-systems/Visualization/commit/f9ded6af6f3839508ea5e24840547357898ebf08))
* **marshaller:** Add missing "flyout" capability ([1f75e11](https://github.com/hpcc-systems/Visualization/commit/1f75e1182f9e79b97f60af9a9b6f5cb870888e79))
* Output ID was wrong ([ee1369f](https://github.com/hpcc-systems/Visualization/commit/ee1369f0fe5b5e726f26de1122d4ef93b22ba756))
* **unpkg:** Webpacked shims have incorrect package.json ([1f9807f](https://github.com/hpcc-systems/Visualization/commit/1f9807fcedccc99a95b5b4ce04a24532a15a0c4f))


### Features

*  Add cli options to ddl-shim ([82b9ab3](https://github.com/hpcc-systems/Visualization/commit/82b9ab31f4f6164ff3884f8f30a44f75ce3c5a6a)), closes [#2562](https://github.com/hpcc-systems/Visualization/issues/2562)
*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))
* Add lite serialize/deserialize ([799fa5f](https://github.com/hpcc-systems/Visualization/commit/799fa5ff09395a04ec362f52d67230a28ed935c5))
* **comms:** Add publish method to workunit.ts ([379d341](https://github.com/hpcc-systems/Visualization/commit/379d341e99cfe57e139bb73b5365f09e0f9e6e4d))
* **Dashy:**  Add support for "set" HIPIE inputs ([42986b9](https://github.com/hpcc-systems/Visualization/commit/42986b943941715e61cfa7210be98cbad10bd0c4))
* **dashy:** Add @hpcc-js/chart input mapping meta ([fb9e523](https://github.com/hpcc-systems/Visualization/commit/fb9e523308675cd26698cdbc151be62c594ba004))
* **dashy:** Add dermatology upgrade script to ddl-shim ([72f2a46](https://github.com/hpcc-systems/Visualization/commit/72f2a4675e56e268858b3ec5a17090fa357c20fc))
* **dashy:** Import DDL2 from address bar ([3ec2acc](https://github.com/hpcc-systems/Visualization/commit/3ec2accfc34a364c0c484dfd86a42d7ec9c424e2))
* **Dashy:** Improved REST support ([ccc9abc](https://github.com/hpcc-systems/Visualization/commit/ccc9abceb2def98124aa57ff20a3ae0d770e24a9))
* **dashy:** Support common datasources properly ([34d6fb7](https://github.com/hpcc-systems/Visualization/commit/34d6fb72fef0d3d25b777b174de0c28092f5c9b4))
* **ddl:** Move layout string into DDL 2.0 ([f1f8eb4](https://github.com/hpcc-systems/Visualization/commit/f1f8eb42f8833b501f6d2ca1fb7591fb98e81046)), closes [#2641](https://github.com/hpcc-systems/Visualization/issues/2641)
* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d6819c6fd166f74e7385446dd477e8a1cdd01))
* Graph support in the marshaller ([bcc2290](https://github.com/hpcc-systems/Visualization/commit/bcc229003d03a6fcd42faaa70156f12814a4dc33)), closes [#2559](https://github.com/hpcc-systems/Visualization/issues/2559)
* Improve dashy experience ([6b5ed37](https://github.com/hpcc-systems/Visualization/commit/6b5ed3782db2e9c0ed54f6afa33e4ad080ee6e92)), closes [#2532](https://github.com/hpcc-systems/Visualization/issues/2532) [#2531](https://github.com/hpcc-systems/Visualization/issues/2531) [#2530](https://github.com/hpcc-systems/Visualization/issues/2530)
* Integrate Web Components ([e27946e](https://github.com/hpcc-systems/Visualization/commit/e27946e437a164e0e07a80a415f8513226a693be))
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))
* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfacc1b162f1a5d02b06d434375424b7d225f))
* **marshaller:** Add "hookSend" to ElementContainer ([0741568](https://github.com/hpcc-systems/Visualization/commit/0741568a951e998cef366637b40867048d011881)), closes [#3181](https://github.com/hpcc-systems/Visualization/issues/3181)
* **marshaller:** Add Static Filter Option ([0515dc6](https://github.com/hpcc-systems/Visualization/commit/0515dc626b80b1e7daa7974607ff22f8c394e804)), closes [#3476](https://github.com/hpcc-systems/Visualization/issues/3476)


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))





## [3.2.0](https://github.com/hpcc-systems/Visualization/compare/ddl-shim-v3.1.0...ddl-shim-v3.2.0) (2025-10-23)


### Features

* switch to simpler version stamp method ([d828033](https://github.com/hpcc-systems/Visualization/commit/d828033ec79f56c4d1579bca230bd03cf0d6328e))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.5.2 to ^1.6.0

## [3.1.0](https://github.com/hpcc-systems/Visualization/compare/ddl-shim-v3.0.0...ddl-shim-v3.1.0) (2025-10-23)


### Features

* Add @observablehq/notebook-kit support ([f8d806c](https://github.com/hpcc-systems/Visualization/commit/f8d806c68c8fd260ae83d0b2460dd5c0915da5cb))
* Drop preact-shim and bump versions ([29f2684](https://github.com/hpcc-systems/Visualization/commit/29f26841c8cfa303321bd7e86daaedc4d37168d8))
* Drop preact-shim and bump versions ([92add6f](https://github.com/hpcc-systems/Visualization/commit/92add6fffd2bbc932c134a30651577722697e14b))
* switch to "main" from trunk ([99e2723](https://github.com/hpcc-systems/Visualization/commit/99e272308e283ac58dc2c14d8236f92ba53b6960))
* Switch to vite for dev server and build process ([1c01a39](https://github.com/hpcc-systems/Visualization/commit/1c01a392460c3ef0d7c668a772e786943c2659f3))
* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))
* Upgrade ddl-shim to v3 ([3e146cd](https://github.com/hpcc-systems/Visualization/commit/3e146cdf3c973bede127514f47db7267b41c3a5a))
* Upgrade ddl-shim to v3 ([4861665](https://github.com/hpcc-systems/Visualization/commit/4861665dabe9b485c567bc40028849cfb1cb3171))


### Bug Fixes

* bump versions ([e9719b8](https://github.com/hpcc-systems/Visualization/commit/e9719b875e4c65936921d2e6a0f76ab008b88114))
* Bump versions to latest ([e200466](https://github.com/hpcc-systems/Visualization/commit/e20046603a824cb5bd1a8ab2a51d6f76805bb226))
* Bump versions to latest ([8c541d7](https://github.com/hpcc-systems/Visualization/commit/8c541d75e06bfbe1030ab003b5cccf4af68bc430))
* Revert text autosize changes ([4709091](https://github.com/hpcc-systems/Visualization/commit/47090910e3957381fadbe069a3087314643841b3))
* Sourcemaps out of sync ([c46b154](https://github.com/hpcc-systems/Visualization/commit/c46b1546855ee4a45bc299203dea430e84912d40))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))
* sync test port numbers ([d1b8764](https://github.com/hpcc-systems/Visualization/commit/d1b8764acfeeb17ca91cec8b8f8428f40062b81d))
* vitest workspace is deprecated ([2b2584d](https://github.com/hpcc-systems/Visualization/commit/2b2584db7de0f62ea43144640931fd9d412373ab))
* Windows build and test failing ([85717cc](https://github.com/hpcc-systems/Visualization/commit/85717ccf0957ed32ee25979a87b35b7f629b4c66))
* Windows build and test failing ([6a9952f](https://github.com/hpcc-systems/Visualization/commit/6a9952f3c3fac12ffac01deca2aef2960713b6ff))

## [2.24.0](https://github.com/hpcc-systems/Visualization/compare/ddl-shim-v2.23.0...ddl-shim-v2.24.0) (2025-10-22)


### Features

* Add @observablehq/notebook-kit support ([f8d806c](https://github.com/hpcc-systems/Visualization/commit/f8d806c68c8fd260ae83d0b2460dd5c0915da5cb))
* Drop preact-shim and bump versions ([29f2684](https://github.com/hpcc-systems/Visualization/commit/29f26841c8cfa303321bd7e86daaedc4d37168d8))
* Drop preact-shim and bump versions ([92add6f](https://github.com/hpcc-systems/Visualization/commit/92add6fffd2bbc932c134a30651577722697e14b))
* Switch to vite for dev server and build process ([1c01a39](https://github.com/hpcc-systems/Visualization/commit/1c01a392460c3ef0d7c668a772e786943c2659f3))
* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))
* Upgrade ddl-shim to v3 ([3e146cd](https://github.com/hpcc-systems/Visualization/commit/3e146cdf3c973bede127514f47db7267b41c3a5a))
* Upgrade ddl-shim to v3 ([4861665](https://github.com/hpcc-systems/Visualization/commit/4861665dabe9b485c567bc40028849cfb1cb3171))


### Bug Fixes

* bump versions ([e9719b8](https://github.com/hpcc-systems/Visualization/commit/e9719b875e4c65936921d2e6a0f76ab008b88114))
* Bump versions to latest ([e200466](https://github.com/hpcc-systems/Visualization/commit/e20046603a824cb5bd1a8ab2a51d6f76805bb226))
* Bump versions to latest ([8c541d7](https://github.com/hpcc-systems/Visualization/commit/8c541d75e06bfbe1030ab003b5cccf4af68bc430))
* Sourcemaps out of sync ([c46b154](https://github.com/hpcc-systems/Visualization/commit/c46b1546855ee4a45bc299203dea430e84912d40))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))
* sync test port numbers ([d1b8764](https://github.com/hpcc-systems/Visualization/commit/d1b8764acfeeb17ca91cec8b8f8428f40062b81d))
* vitest workspace is deprecated ([2b2584d](https://github.com/hpcc-systems/Visualization/commit/2b2584db7de0f62ea43144640931fd9d412373ab))
* Windows build and test failing ([85717cc](https://github.com/hpcc-systems/Visualization/commit/85717ccf0957ed32ee25979a87b35b7f629b4c66))
* Windows build and test failing ([6a9952f](https://github.com/hpcc-systems/Visualization/commit/6a9952f3c3fac12ffac01deca2aef2960713b6ff))

## [2.23.0](https://github.com/hpcc-systems/Visualization/compare/ddl-shim-v2.22.0...ddl-shim-v2.23.0) (2025-10-22)


### Features

* Add @observablehq/notebook-kit support ([f8d806c](https://github.com/hpcc-systems/Visualization/commit/f8d806c68c8fd260ae83d0b2460dd5c0915da5cb))
* Drop preact-shim and bump versions ([29f2684](https://github.com/hpcc-systems/Visualization/commit/29f26841c8cfa303321bd7e86daaedc4d37168d8))
* Drop preact-shim and bump versions ([92add6f](https://github.com/hpcc-systems/Visualization/commit/92add6fffd2bbc932c134a30651577722697e14b))
* Switch to vite for dev server and build process ([1c01a39](https://github.com/hpcc-systems/Visualization/commit/1c01a392460c3ef0d7c668a772e786943c2659f3))
* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))
* Upgrade ddl-shim to v3 ([3e146cd](https://github.com/hpcc-systems/Visualization/commit/3e146cdf3c973bede127514f47db7267b41c3a5a))
* Upgrade ddl-shim to v3 ([4861665](https://github.com/hpcc-systems/Visualization/commit/4861665dabe9b485c567bc40028849cfb1cb3171))


### Bug Fixes

* bump versions ([e9719b8](https://github.com/hpcc-systems/Visualization/commit/e9719b875e4c65936921d2e6a0f76ab008b88114))
* Bump versions to latest ([e200466](https://github.com/hpcc-systems/Visualization/commit/e20046603a824cb5bd1a8ab2a51d6f76805bb226))
* Bump versions to latest ([8c541d7](https://github.com/hpcc-systems/Visualization/commit/8c541d75e06bfbe1030ab003b5cccf4af68bc430))
* Revert text autosize changes ([4709091](https://github.com/hpcc-systems/Visualization/commit/47090910e3957381fadbe069a3087314643841b3))
* Sourcemaps out of sync ([c46b154](https://github.com/hpcc-systems/Visualization/commit/c46b1546855ee4a45bc299203dea430e84912d40))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))
* sync test port numbers ([d1b8764](https://github.com/hpcc-systems/Visualization/commit/d1b8764acfeeb17ca91cec8b8f8428f40062b81d))
* vitest workspace is deprecated ([2b2584d](https://github.com/hpcc-systems/Visualization/commit/2b2584db7de0f62ea43144640931fd9d412373ab))
* Windows build and test failing ([85717cc](https://github.com/hpcc-systems/Visualization/commit/85717ccf0957ed32ee25979a87b35b7f629b4c66))
* Windows build and test failing ([6a9952f](https://github.com/hpcc-systems/Visualization/commit/6a9952f3c3fac12ffac01deca2aef2960713b6ff))

## [2.22.0](https://github.com/hpcc-systems/Visualization/compare/ddl-shim-v2.21.0...ddl-shim-v2.22.0) (2024-10-23)


### Features

* Rename "lint" to "lint-all" and revert "lint" to break on error. ([227ab65](https://github.com/hpcc-systems/Visualization/commit/227ab656f9ce64580a0c8a7015e53ac455b16be4))


### Bug Fixes

* NodeJS v18 fetch + rejectUnauthorization = false ([d01d23f](https://github.com/hpcc-systems/Visualization/commit/d01d23f5a5f8ed31b233800144be047d7c5f1495))

## [2.20.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.20.6...@hpcc-js/ddl-shim@2.20.7) (2024-07-02)



## 2.105.11 (2024-06-25)



## 2.105.10 (2024-06-19)



## 2.105.9 (2024-05-24)



## 2.105.8 (2024-04-24)



## 2.105.7 (2024-04-22)



## 2.105.6 (2024-04-17)



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

**Note:** Version bump only for package @hpcc-js/ddl-shim






## [2.20.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.20.5...@hpcc-js/ddl-shim@2.20.6) (2023-10-26)



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.20.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.20.4...@hpcc-js/ddl-shim@2.20.5) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.20.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.20.3...@hpcc-js/ddl-shim@2.20.4) (2023-09-14)


### Bug Fixes

*  NodeJS v18 fetch + rejectUnauthorization = false ([d01d23f](https://github.com/hpcc-systems/Visualization/commit/d01d23f5a5f8ed31b233800144be047d7c5f1495))



## 2.104.25 (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)





## [2.20.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.20.2...@hpcc-js/ddl-shim@2.20.3) (2023-06-08)



## 2.104.19 (2023-03-14)



## 2.104.18 (2023-02-22)



## 2.104.17 (2023-01-20)



## 2.104.16 (2023-01-19)



## 2.104.15 (2022-11-15)



## 2.104.14 (2022-11-11)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.20.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.20.1...@hpcc-js/ddl-shim@2.20.2) (2022-11-11)



## 2.104.13 (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)



## 2.104.8 (2022-09-29)



## 2.104.7 (2022-09-28)



## 2.104.6 (2022-09-21)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.20.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.20.0...@hpcc-js/ddl-shim@2.20.1) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)



## 2.104.2 (2022-08-17)

**Note:** Version bump only for package @hpcc-js/ddl-shim





# [2.20.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.19.1...@hpcc-js/ddl-shim@2.20.0) (2022-08-17)



## 2.104.1 (2022-08-16)



# 2.104.0 (2022-07-26)


### Features

*  Add observable web component ([33fbe07](https://github.com/hpcc-systems/Visualization/commit/33fbe07eb8a5deeabd98467b1bce1fcda0d2dbab))



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)



## 2.103.1 (2022-04-20)



# 2.103.0 (2022-04-07)



## 2.102.11 (2022-03-24)





## [2.19.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.19.0...@hpcc-js/ddl-shim@2.19.1) (2022-03-24)



## 2.102.10 (2022-03-15)



## 2.102.9 (2022-03-15)



## 2.102.8 (2022-03-15)



## 2.102.7 (2022-03-14)



## 2.102.6 (2022-03-11)



## 2.102.5 (2022-03-11)



## 2.102.4 (2022-03-10)



## 2.102.3 (2022-03-10)



## 2.102.2 (2022-03-08)

**Note:** Version bump only for package @hpcc-js/ddl-shim





# [2.19.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.18.1...@hpcc-js/ddl-shim@2.19.0) (2022-03-08)


### Features

* Integrate Web Components ([e27946e](https://github.com/hpcc-systems/Visualization/commit/e27946e437a164e0e07a80a415f8513226a693be))



## 2.102.1 (2022-03-08)





## [2.18.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.18.0...@hpcc-js/ddl-shim@2.18.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/ddl-shim





# [2.18.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.25...@hpcc-js/ddl-shim@2.18.0) (2022-03-07)


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





## [2.17.25](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.25) (2022-02-23)



# 2.100.0 (2022-02-18)


### Bug Fixes

* **comms:**  NodeJS regression ([c646f6a](https://github.com/hpcc-systems/Visualization/commit/c646f6a0dbe970395a80f5ae0ef2e8923eabacb7)), closes [#3904](https://github.com/hpcc-systems/Visualization/issues/3904)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






## [2.17.24](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.24) (2022-02-18)


### Bug Fixes

* **comms:**  NodeJS regression ([c646f6a](https://github.com/hpcc-systems/Visualization/commit/c646f6a0dbe970395a80f5ae0ef2e8923eabacb7)), closes [#3904](https://github.com/hpcc-systems/Visualization/issues/3904)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.23](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.23) (2022-02-10)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






## [2.17.22](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.22) (2022-02-10)


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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






## [2.17.21](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.21) (2022-02-09)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.20](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.20) (2022-01-19)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






## [2.17.19](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.19) (2021-10-03)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.18](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.18) (2021-09-08)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






## [2.17.17](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.17) (2021-08-25)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.16](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.16) (2021-07-02)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






## [2.17.15](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.15) (2020-08-22)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.14](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.14) (2020-07-22)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.13](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.13) (2020-07-22)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)






## [2.17.12](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.12) (2020-06-15)



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


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.11](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.11) (2020-05-31)



# 2.16.0 (2020-05-21)



## 2.15.21 (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.10) (2020-05-20)



## 2.15.20 (2020-05-20)



## 2.15.19 (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.9) (2020-05-19)



## 2.15.18 (2020-05-15)



## 2.15.17 (2020-05-15)



## 2.15.16 (2020-05-14)



## 2.15.15 (2020-05-12)



## 2.15.14 (2020-05-07)


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.8) (2020-05-07)


### Bug Fixes

* **ddl upgrade:** Catch mismatched mapping issue ([23f3352](https://github.com/hpcc-systems/Visualization/commit/23f335221d1b5462f2f9bbb8f4d3935b1ece253e))



## 2.15.13 (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.7) (2020-04-24)


### Bug Fixes

* **ddl-shim:** npx @hpcc-js/ddl-shim not working ([0a3d97c](https://github.com/hpcc-systems/Visualization/commit/0a3d97c39ec075a7018ba9cae4215754e1c62896))



## 2.15.12 (2020-04-22)



## 2.15.11 (2020-04-21)



## 2.15.10 (2020-04-21)



## 2.15.9 (2020-04-17)



## 2.15.7 (2020-04-11)





## [2.17.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.6) (2020-04-17)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.17.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.5) (2020-04-11)



## 2.15.7 (2020-04-11)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.17.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.4) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.17.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.2...@hpcc-js/ddl-shim@2.17.3) (2020-04-11)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.17.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.1...@hpcc-js/ddl-shim@2.17.2) (2020-03-30)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.17.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.17.0...@hpcc-js/ddl-shim@2.17.1) (2020-03-12)

**Note:** Version bump only for package @hpcc-js/ddl-shim





# [2.17.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.16.0...@hpcc-js/ddl-shim@2.17.0) (2020-03-05)


### Features

* **Dashy:**  Add support for "set" HIPIE inputs ([42986b9](https://github.com/hpcc-systems/Visualization/commit/42986b943941715e61cfa7210be98cbad10bd0c4))





# [2.16.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.15.1...@hpcc-js/ddl-shim@2.16.0) (2020-02-13)


### Features

* **Dashy:** Improved REST support ([ccc9abc](https://github.com/hpcc-systems/Visualization/commit/ccc9abceb2def98124aa57ff20a3ae0d770e24a9))





## [2.15.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.15.0...@hpcc-js/ddl-shim@2.15.1) (2020-02-07)

**Note:** Version bump only for package @hpcc-js/ddl-shim





# [2.15.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.14.2...@hpcc-js/ddl-shim@2.15.0) (2020-01-22)


### Features

* **marshaller:** Add Static Filter Option ([0515dc6](https://github.com/hpcc-systems/Visualization/commit/0515dc626b80b1e7daa7974607ff22f8c394e804)), closes [#3476](https://github.com/hpcc-systems/Visualization/issues/3476)





## [2.14.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.14.1...@hpcc-js/ddl-shim@2.14.2) (2020-01-07)

**Note:** Version bump only for package @hpcc-js/ddl-shim






## [2.14.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.14.0...@hpcc-js/ddl-shim@2.14.1) (2019-12-11)

**Note:** Version bump only for package @hpcc-js/ddl-shim





# [2.14.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.13.2...@hpcc-js/ddl-shim@2.14.0) (2019-10-11)


### Features

* **comms:** Add publish method to workunit.ts ([379d341](https://github.com/hpcc-systems/Visualization/commit/379d341))





## [2.13.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.13.1...@hpcc-js/ddl-shim@2.13.2) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.13.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.13.0...@hpcc-js/ddl-shim@2.13.1) (2019-08-30)

**Note:** Version bump only for package @hpcc-js/ddl-shim





# [2.13.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.12.4...@hpcc-js/ddl-shim@2.13.0) (2019-08-13)


### Features

* **gallery:** Switch to jsdelivr from unpkg ([cb1d681](https://github.com/hpcc-systems/Visualization/commit/cb1d681))





## [2.12.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.12.3...@hpcc-js/ddl-shim@2.12.4) (2019-08-01)


### Bug Fixes

* **ddl-shim:** bin / cli not resolving dependencies correctly ([a7983bc](https://github.com/hpcc-systems/Visualization/commit/a7983bc))






## [2.12.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.12.2...@hpcc-js/ddl-shim@2.12.3) (2019-07-03)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.12.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.12.1...@hpcc-js/ddl-shim@2.12.2) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/ddl-shim





## [2.12.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.12.0...@hpcc-js/ddl-shim@2.12.1) (2019-06-27)

**Note:** Version bump only for package @hpcc-js/ddl-shim





# [2.12.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.11.1...@hpcc-js/ddl-shim@2.12.0) (2019-06-20)


### Features

* **dashy:** Add dermatology upgrade script to ddl-shim ([72f2a46](https://github.com/hpcc-systems/Visualization/commit/72f2a46))





## [2.11.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.11.0...@hpcc-js/ddl-shim@2.11.1) (2019-06-14)

**Note:** Version bump only for package @hpcc-js/ddl-shim






# [2.11.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.6...@hpcc-js/ddl-shim@2.11.0) (2019-04-06)



# [2.9.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.6...@hpcc-js/ddl-shim@2.9.0) (2019-04-05)

**Note:** Version bump only for package @hpcc-js/ddl-shim






# [2.8.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.6...@hpcc-js/ddl-shim@2.8.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/ddl-shim






# [2.7.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.6...@hpcc-js/ddl-shim@2.7.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/ddl-shim






# [2.6.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.6...@hpcc-js/ddl-shim@2.6.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/ddl-shim






# [2.5.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.6...@hpcc-js/ddl-shim@2.5.0) (2019-04-02)

**Note:** Version bump only for package @hpcc-js/ddl-shim






# [2.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.6...@hpcc-js/ddl-shim@2.4.0) (2019-04-01)

**Note:** Version bump only for package @hpcc-js/ddl-shim






# [2.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.6...@hpcc-js/ddl-shim@2.3.0) (2019-03-29)

**Note:** Version bump only for package @hpcc-js/ddl-shim






# [2.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.6...@hpcc-js/ddl-shim@2.2.0) (2019-03-21)


### Features

* **loader:** Improved loader to manage specific versions ([cfcdfac](https://github.com/hpcc-systems/Visualization/commit/cfcdfac))
* **marshaller:** Add "hookSend" to ElementContainer ([0741568](https://github.com/hpcc-systems/Visualization/commit/0741568)), closes [#3181](https://github.com/hpcc-systems/Visualization/issues/3181)






## [2.1.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.5...@hpcc-js/ddl-shim@2.1.6) (2019-02-19)


### Bug Fixes

* **marshaller:** Add missing "flyout" capability ([1f75e11](https://github.com/hpcc-systems/Visualization/commit/1f75e11))






## [2.1.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.4...@hpcc-js/ddl-shim@2.1.5) (2018-12-13)

**Note:** Version bump only for package @hpcc-js/ddl-shim






## [2.1.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.3...@hpcc-js/ddl-shim@2.1.4) (2018-12-04)

**Note:** Version bump only for package @hpcc-js/ddl-shim






## [2.1.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.2...@hpcc-js/ddl-shim@2.1.3) (2018-11-27)

**Note:** Version bump only for package @hpcc-js/ddl-shim






<a name="2.1.2"></a>
## [2.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.1...@hpcc-js/ddl-shim@2.1.2) (2018-10-30)


### Bug Fixes

* **ddl:** Don't convert FAChar hex values to chars ([22ed38c](https://github.com/hpcc-systems/Visualization/commit/22ed38c)), closes [#2917](https://github.com/hpcc-systems/Visualization/issues/2917)
* **ddl-upgrade:** Runtime error upgrading ddl ([13b782a](https://github.com/hpcc-systems/Visualization/commit/13b782a)), closes [#2605](https://github.com/hpcc-systems/Visualization/issues/2605)
* **ddl-upgrade:** SCALE not handled ([90f24a7](https://github.com/hpcc-systems/Visualization/commit/90f24a7)), closes [#2830](https://github.com/hpcc-systems/Visualization/issues/2830)





<a name="2.1.1"></a>
## [2.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.1.0...@hpcc-js/ddl-shim@2.1.1) (2018-09-24)


### Bug Fixes

* **ddl:** Optionally lowercase field IDs ([05cc16b](https://github.com/hpcc-systems/Visualization/commit/05cc16b))
* **ddl:** Remove "0" annotations during the upgrade process ([0e268ff](https://github.com/hpcc-systems/Visualization/commit/0e268ff))





<a name="2.1.0"></a>
# [2.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.0.1...@hpcc-js/ddl-shim@2.1.0) (2018-09-10)


### Bug Fixes

* **ddl:** Upgrade tweaks from Drea ([f9ded6a](https://github.com/hpcc-systems/Visualization/commit/f9ded6a))


### Features

* **dashy:** Support common datasources properly ([34d6fb7](https://github.com/hpcc-systems/Visualization/commit/34d6fb7))





<a name="2.0.1"></a>
## [2.0.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@2.0.0...@hpcc-js/ddl-shim@2.0.1) (2018-09-01)


### Bug Fixes

* **ddl:** Merge Dreas changes ([50392f8](https://github.com/hpcc-systems/Visualization/commit/50392f8))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.4.1...@hpcc-js/ddl-shim@2.0.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/ddl-shim





<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.4.1...@hpcc-js/ddl-shim@2.0.0-rc.0) (2018-08-24)

**Note:** Version bump only for package @hpcc-js/ddl-shim





<a name="0.4.1"></a>
## [0.4.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.4.0...@hpcc-js/ddl-shim@0.4.1) (2018-08-23)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.4.0"></a>
# [0.4.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.3.2...@hpcc-js/ddl-shim@0.4.0) (2018-08-15)


### Bug Fixes

* **ddl-shim:** npx [@hpcc-js](https://github.com/hpcc-js)/ddl-shim fails with missing module "tslib" ([0f23414](https://github.com/hpcc-systems/Visualization/commit/0f23414))


### Features

* **dashy:** Import DDL2 from address bar ([3ec2acc](https://github.com/hpcc-systems/Visualization/commit/3ec2acc))




<a name="0.3.2"></a>
## [0.3.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.3.1...@hpcc-js/ddl-shim@0.3.2) (2018-08-14)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.3.1"></a>
## [0.3.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.3.0...@hpcc-js/ddl-shim@0.3.1) (2018-08-14)


### Bug Fixes

* **unpkg:** Webpacked shims have incorrect package.json ([1f9807f](https://github.com/hpcc-systems/Visualization/commit/1f9807f))




<a name="0.3.0"></a>
# [0.3.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.10...@hpcc-js/ddl-shim@0.3.0) (2018-08-10)


### Features

* **ddl:** Move layout string into DDL 2.0 ([f1f8eb4](https://github.com/hpcc-systems/Visualization/commit/f1f8eb4)), closes [#2641](https://github.com/hpcc-systems/Visualization/issues/2641)




<a name="0.2.10"></a>
## [0.2.10](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.9...@hpcc-js/ddl-shim@0.2.10) (2018-08-02)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.2.9"></a>
## [0.2.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.8...@hpcc-js/ddl-shim@0.2.9) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.2.8"></a>
## [0.2.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.7...@hpcc-js/ddl-shim@0.2.8) (2018-07-30)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.2.7"></a>
## [0.2.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.6...@hpcc-js/ddl-shim@0.2.7) (2018-07-29)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.2.6"></a>
## [0.2.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.5...@hpcc-js/ddl-shim@0.2.6) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.2.5"></a>
## [0.2.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.4...@hpcc-js/ddl-shim@0.2.5) (2018-07-28)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.2.4"></a>
## [0.2.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.3...@hpcc-js/ddl-shim@0.2.4) (2018-07-27)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.2.3"></a>
## [0.2.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.2...@hpcc-js/ddl-shim@0.2.3) (2018-06-28)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.2.2"></a>
## [0.2.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.1...@hpcc-js/ddl-shim@0.2.2) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.2.1"></a>
## [0.2.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.2.0...@hpcc-js/ddl-shim@0.2.1) (2018-06-19)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.2.0"></a>
# [0.2.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.1.9...@hpcc-js/ddl-shim@0.2.0) (2018-06-19)


### Bug Fixes

* Output ID was wrong ([ee1369f](https://github.com/hpcc-systems/Visualization/commit/ee1369f))


### Features

* **dashy:** Add [@hpcc-js](https://github.com/hpcc-js)/chart input mapping meta ([fb9e523](https://github.com/hpcc-systems/Visualization/commit/fb9e523))
* Add lite serialize/deserialize ([799fa5f](https://github.com/hpcc-systems/Visualization/commit/799fa5f))




<a name="0.1.9"></a>
## [0.1.9](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.1.8...@hpcc-js/ddl-shim@0.1.9) (2018-06-01)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.1.8"></a>
## [0.1.8](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.1.7...@hpcc-js/ddl-shim@0.1.8) (2018-05-28)


### Bug Fixes

* DDL upgrade failing on SLIDER ([fbb355c](https://github.com/hpcc-systems/Visualization/commit/fbb355c)), closes [#2579](https://github.com/hpcc-systems/Visualization/issues/2579)
* DDL Upgrade Title and Properties are optional ([8de579b](https://github.com/hpcc-systems/Visualization/commit/8de579b)), closes [#2586](https://github.com/hpcc-systems/Visualization/issues/2586)




<a name="0.1.7"></a>
## [0.1.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.1.6...@hpcc-js/ddl-shim@0.1.7) (2018-05-21)


### Bug Fixes

*  Add extra references to assist the DDL2 schema generation ([5138367](https://github.com/hpcc-systems/Visualization/commit/5138367))




<a name="0.1.6"></a>
## [0.1.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.1.4...@hpcc-js/ddl-shim@0.1.6) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.1.4"></a>
## [0.1.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.1.3...@hpcc-js/ddl-shim@0.1.4) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.1.3"></a>
## [0.1.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.1.2...@hpcc-js/ddl-shim@0.1.3) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.1.2"></a>
## [0.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.1.1...@hpcc-js/ddl-shim@0.1.2) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.1.1"></a>
## [0.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.1.0...@hpcc-js/ddl-shim@0.1.1) (2018-05-16)




**Note:** Version bump only for package @hpcc-js/ddl-shim

<a name="0.1.0"></a>
# [0.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/ddl-shim@0.0.35...@hpcc-js/ddl-shim@0.1.0) (2018-05-16)


### Features

*  Add cli options to ddl-shim ([82b9ab3](https://github.com/hpcc-systems/Visualization/commit/82b9ab3)), closes [#2562](https://github.com/hpcc-systems/Visualization/issues/2562)
* Graph support in the marshaller ([bcc2290](https://github.com/hpcc-systems/Visualization/commit/bcc2290)), closes [#2559](https://github.com/hpcc-systems/Visualization/issues/2559)
* Improve dashy experience ([6b5ed37](https://github.com/hpcc-systems/Visualization/commit/6b5ed37)), closes [#2532](https://github.com/hpcc-systems/Visualization/issues/2532) [#2531](https://github.com/hpcc-systems/Visualization/issues/2531) [#2530](https://github.com/hpcc-systems/Visualization/issues/2530)
