# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.6.0](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.5.1...dataflow-v9.6.0) (2025-11-20)


### Features

* Histogram should honour "buckets" option ([#4485](https://github.com/hpcc-systems/Visualization/issues/4485)) ([c3733d4](https://github.com/hpcc-systems/Visualization/commit/c3733d48f98974576f0498bb9a644a938c960fc7))
* update pipe.ts to use unlimited vardic types ([#4484](https://github.com/hpcc-systems/Visualization/issues/4484)) ([8f321c3](https://github.com/hpcc-systems/Visualization/commit/8f321c34de9cd5bbc03d2ce701992a3be6ef006a))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.6.1 to ^1.7.0

## [9.5.1](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.5.0...dataflow-v9.5.1) (2025-10-29)


### Bug Fixes

* revert vite back to the stable releases ([136469b](https://github.com/hpcc-systems/Visualization/commit/136469b0070c2d3090a128361ed411818347c41c))

## [9.5.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dataflow@9.0.0...@hpcc-js/dataflow@9.5.1) (2025-10-29)


### Bug Fixes

* common up nodejs bundle rules ([0cc25c3](https://github.com/hpcc-systems/Visualization/commit/0cc25c3d3533395e4f01e5b2c03ebaa7ff8207a3))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))
* sync test port numbers ([d1b8764](https://github.com/hpcc-systems/Visualization/commit/d1b8764acfeeb17ca91cec8b8f8428f40062b81d))
* vitest workspace is deprecated ([2b2584d](https://github.com/hpcc-systems/Visualization/commit/2b2584db7de0f62ea43144640931fd9d412373ab))


### Features

*  Switch to esbuild and ESM first packaging ([b752510](https://github.com/hpcc-systems/Visualization/commit/b752510b5074fbc9a606e4d189412798c241f414))
* Switch to esbuild and ESM first packaging (comms) ([3bc7e54](https://github.com/hpcc-systems/Visualization/commit/3bc7e54da7a70d5bfc57ea4b1a87fb02913cbf40))
* switch to simpler version stamp method ([d828033](https://github.com/hpcc-systems/Visualization/commit/d828033ec79f56c4d1579bca230bd03cf0d6328e))
* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))
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






# 9.0.0 (2024-07-23)


### Bug Fixes

* **dataflow:** Add backward compatibility ([483c4f7](https://github.com/hpcc-systems/Visualization/commit/483c4f797f2ce5b51100162aeb104896f2a3fca7))
* **histogram:**  Generator input could fail ([e91b591](https://github.com/hpcc-systems/Visualization/commit/e91b59106d2584048df7def9de708004c4be2a3f))


### Features

*  Add maxWeight to Heat chart ([59ee802](https://github.com/hpcc-systems/Visualization/commit/59ee80246e45fa5464f6fed4ed7f488ee3fca0cb))
* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))
* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))
* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))
* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))


### Reverts

* Revert "chore(security): Bump versions" ([cfd8239](https://github.com/hpcc-systems/Visualization/commit/cfd8239224493eacb8805cf43c2ca2c7cedf915b))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>






## [9.5.0](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.4.3...dataflow-v9.5.0) (2025-10-23)


### Features

* switch to simpler version stamp method ([d828033](https://github.com/hpcc-systems/Visualization/commit/d828033ec79f56c4d1579bca230bd03cf0d6328e))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.5.2 to ^1.6.0

## [9.4.3](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.4.2...dataflow-v9.4.3) (2025-10-09)


### Bug Fixes

* common up nodejs bundle rules ([0cc25c3](https://github.com/hpcc-systems/Visualization/commit/0cc25c3d3533395e4f01e5b2c03ebaa7ff8207a3))

## [9.4.2](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.4.1...dataflow-v9.4.2) (2025-10-09)


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.5.1 to ^1.5.2

## [9.4.1](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.4.0...dataflow-v9.4.1) (2025-09-18)


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.5.0 to ^1.5.1

## [9.4.0](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.3.9...dataflow-v9.4.0) (2025-08-26)


### Features

* Add @observablehq/notebook-kit support ([f8d806c](https://github.com/hpcc-systems/Visualization/commit/f8d806c68c8fd260ae83d0b2460dd5c0915da5cb))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.9 to ^1.5.0

## [9.3.9](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.3.8...dataflow-v9.3.9) (2025-07-24)


### Bug Fixes

* sync test port numbers ([d1b8764](https://github.com/hpcc-systems/Visualization/commit/d1b8764acfeeb17ca91cec8b8f8428f40062b81d))
* vitest workspace is deprecated ([2b2584d](https://github.com/hpcc-systems/Visualization/commit/2b2584db7de0f62ea43144640931fd9d412373ab))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.8 to ^1.4.9

## [9.3.8](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.3.7...dataflow-v9.3.8) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.7 to ^1.4.8

## [9.3.7](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.3.6...dataflow-v9.3.7) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.6 to ^1.4.7

## [9.3.6](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.3.5...dataflow-v9.3.6) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.5 to ^1.4.6

## [9.3.5](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.3.4...dataflow-v9.3.5) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.4 to ^1.4.5

## [9.3.4](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.3.3...dataflow-v9.3.4) (2025-07-04)


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.3 to ^1.4.4

## [9.3.3](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.3.2...dataflow-v9.3.3) (2025-07-03)


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.2 to ^1.4.3

## [9.3.2](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.3.1...dataflow-v9.3.2) (2025-06-24)


### Bug Fixes

* Sourcemaps out of sync ([c46b154](https://github.com/hpcc-systems/Visualization/commit/c46b1546855ee4a45bc299203dea430e84912d40))
* Sourcemaps out of sync ([cf240dc](https://github.com/hpcc-systems/Visualization/commit/cf240dc9c56be036877598635af411bccf1938b9))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.1 to ^1.4.2

## [9.3.1](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.3.0...dataflow-v9.3.1) (2025-04-03)


### Bug Fixes

* Revert text autosize changes ([4709091](https://github.com/hpcc-systems/Visualization/commit/47090910e3957381fadbe069a3087314643841b3))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.4.0 to ^1.4.1

## [9.3.0](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.2.0...dataflow-v9.3.0) (2024-11-28)


### Features

* Switch to vite for dev server and build process ([fdd3cac](https://github.com/hpcc-systems/Visualization/commit/fdd3cacd13aed0b2527b9d32c37a1ac7d74c6f66))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.3.0 to ^1.4.0

## [9.2.0](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.1.0...dataflow-v9.2.0) (2024-11-20)


### Features

* Upgrade layout to v3 ([cbc463a](https://github.com/hpcc-systems/Visualization/commit/cbc463acb24fc2e7d0f3da93b4c0d9c6915aabd8))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @hpcc-js/esbuild-plugins bumped from ^1.2.0 to ^1.3.0

## [9.1.0](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.0.0...dataflow-v9.1.0) (2024-10-24)


### Features

* Add maxWeight to Heat chart ([59ee802](https://github.com/hpcc-systems/Visualization/commit/59ee80246e45fa5464f6fed4ed7f488ee3fca0cb))
* Switch to esbuild and ESM first packaging ([b752510](https://github.com/hpcc-systems/Visualization/commit/b752510b5074fbc9a606e4d189412798c241f414))
* Switch to esbuild and ESM first packaging (comms) ([3bc7e54](https://github.com/hpcc-systems/Visualization/commit/3bc7e54da7a70d5bfc57ea4b1a87fb02913cbf40))

## [9.1.0](https://github.com/hpcc-systems/Visualization/compare/dataflow-v9.0.0...dataflow-v9.1.0) (2024-10-23)


### Features

* Add maxWeight to Heat chart ([59ee802](https://github.com/hpcc-systems/Visualization/commit/59ee80246e45fa5464f6fed4ed7f488ee3fca0cb))

## [8.1.7](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dataflow@8.1.6...@hpcc-js/dataflow@8.1.7) (2024-07-02)



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



## 2.104.29 (2023-09-18)



## 2.104.28 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/dataflow






## [8.1.6](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dataflow@8.1.5...@hpcc-js/dataflow@8.1.6) (2023-09-14)



## 2.104.27 (2023-09-14)



## 2.104.26 (2023-09-14)

**Note:** Version bump only for package @hpcc-js/dataflow





## [8.1.5](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dataflow@8.1.4...@hpcc-js/dataflow@8.1.5) (2023-09-14)



## 2.104.25 (2023-07-17)



## 2.104.24 (2023-07-13)



## 2.104.23 (2023-06-28)



## 2.104.22 (2023-06-27)



## 2.104.21 (2023-06-14)



## 2.104.20 (2023-06-08)



## 2.104.19 (2023-03-14)



## 2.104.18 (2023-02-22)



## 2.104.17 (2023-01-20)



## 2.104.16 (2023-01-19)



## 2.104.15 (2022-11-15)



## 2.104.14 (2022-11-11)



## 2.104.13 (2022-11-09)



## 2.104.12 (2022-10-16)



## 2.104.11 (2022-10-11)



## 2.104.10 (2022-10-04)



## 2.104.9 (2022-10-03)



## 2.104.8 (2022-09-29)



## 2.104.7 (2022-09-28)



## 2.104.6 (2022-09-21)

**Note:** Version bump only for package @hpcc-js/dataflow





## [8.1.4](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dataflow@8.1.3...@hpcc-js/dataflow@8.1.4) (2022-09-15)



## 2.104.4 (2022-09-08)



## 2.104.3 (2022-08-18)



## 2.104.2 (2022-08-17)

**Note:** Version bump only for package @hpcc-js/dataflow





## [8.1.3](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dataflow@8.1.2...@hpcc-js/dataflow@8.1.3) (2022-08-17)



## 2.104.1 (2022-08-16)



# 2.104.0 (2022-07-26)



## 2.103.6 (2022-06-27)



## 2.103.5 (2022-06-23)



## 2.103.4 (2022-05-31)



## 2.103.3 (2022-05-13)



## 2.103.2 (2022-04-27)



## 2.103.1 (2022-04-20)



# 2.103.0 (2022-04-07)



## 2.102.11 (2022-03-24)

**Note:** Version bump only for package @hpcc-js/dataflow





## [8.1.2](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dataflow@8.1.1...@hpcc-js/dataflow@8.1.2) (2022-03-24)



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

**Note:** Version bump only for package @hpcc-js/dataflow





## [8.1.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dataflow@8.1.0...@hpcc-js/dataflow@8.1.1) (2022-03-08)



# 2.102.0 (2022-03-07)

**Note:** Version bump only for package @hpcc-js/dataflow





# [8.1.0](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dataflow@8.0.1...@hpcc-js/dataflow@8.1.0) (2022-03-07)


### Features

* Integrate Web Components ([ed1b14f](https://github.com/hpcc-systems/Visualization/commit/ed1b14f1cc8a82a4fbde1cf6767a0195bc16933b))



## 2.101.2 (2022-03-05)



## 2.101.1 (2022-03-04)





## [8.0.1](https://github.com/hpcc-systems/Visualization/compare/@hpcc-js/dataflow@8.0.0...@hpcc-js/dataflow@8.0.1) (2022-02-23)

**Note:** Version bump only for package @hpcc-js/dataflow






# 11.0.0 (2022-02-10)



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


### Bug Fixes

* **dataflow:** Add backward compatibility ([483c4f7](https://github.com/hpcc-systems/Visualization/commit/483c4f797f2ce5b51100162aeb104896f2a3fca7))
* **histogram:**  Generator input could fail ([e91b591](https://github.com/hpcc-systems/Visualization/commit/e91b59106d2584048df7def9de708004c4be2a3f))



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)


### Features

* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>



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


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))






# 10.0.0 (2022-02-10)


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


### Bug Fixes

* **dataflow:** Add backward compatibility ([483c4f7](https://github.com/hpcc-systems/Visualization/commit/483c4f797f2ce5b51100162aeb104896f2a3fca7))
* **histogram:**  Generator input could fail ([e91b591](https://github.com/hpcc-systems/Visualization/commit/e91b59106d2584048df7def9de708004c4be2a3f))



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)


### Features

* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>



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


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))






# 9.0.0 (2022-02-09)



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


### Bug Fixes

* **dataflow:** Add backward compatibility ([483c4f7](https://github.com/hpcc-systems/Visualization/commit/483c4f797f2ce5b51100162aeb104896f2a3fca7))
* **histogram:**  Generator input could fail ([e91b591](https://github.com/hpcc-systems/Visualization/commit/e91b59106d2584048df7def9de708004c4be2a3f))



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)


### Features

* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>



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


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))





# 8.0.0 (2022-01-19)



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


### Bug Fixes

* **dataflow:** Add backward compatibility ([483c4f7](https://github.com/hpcc-systems/Visualization/commit/483c4f797f2ce5b51100162aeb104896f2a3fca7))
* **histogram:**  Generator input could fail ([e91b591](https://github.com/hpcc-systems/Visualization/commit/e91b59106d2584048df7def9de708004c4be2a3f))



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)


### Features

* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>



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


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))






# 7.0.0 (2021-10-03)



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


### Bug Fixes

* **dataflow:** Add backward compatibility ([483c4f7](https://github.com/hpcc-systems/Visualization/commit/483c4f797f2ce5b51100162aeb104896f2a3fca7))
* **histogram:**  Generator input could fail ([e91b591](https://github.com/hpcc-systems/Visualization/commit/e91b59106d2584048df7def9de708004c4be2a3f))



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)


### Features

* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>



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


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))





# 6.0.0 (2021-09-08)



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


### Bug Fixes

* **dataflow:** Add backward compatibility ([483c4f7](https://github.com/hpcc-systems/Visualization/commit/483c4f797f2ce5b51100162aeb104896f2a3fca7))
* **histogram:**  Generator input could fail ([e91b591](https://github.com/hpcc-systems/Visualization/commit/e91b59106d2584048df7def9de708004c4be2a3f))



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)


### Features

* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>



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


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))






# 5.0.0 (2021-08-25)



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


### Bug Fixes

* **dataflow:** Add backward compatibility ([483c4f7](https://github.com/hpcc-systems/Visualization/commit/483c4f797f2ce5b51100162aeb104896f2a3fca7))
* **histogram:**  Generator input could fail ([e91b591](https://github.com/hpcc-systems/Visualization/commit/e91b59106d2584048df7def9de708004c4be2a3f))



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)


### Features

* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>



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


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))





# 4.0.0 (2021-07-02)



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


### Bug Fixes

* **dataflow:** Add backward compatibility ([483c4f7](https://github.com/hpcc-systems/Visualization/commit/483c4f797f2ce5b51100162aeb104896f2a3fca7))
* **histogram:**  Generator input could fail ([e91b591](https://github.com/hpcc-systems/Visualization/commit/e91b59106d2584048df7def9de708004c4be2a3f))



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)


### Features

* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>



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


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))






# 3.0.0 (2021-02-01)


### Bug Fixes

* **dataflow:** Add backward compatibility ([483c4f7](https://github.com/hpcc-systems/Visualization/commit/483c4f797f2ce5b51100162aeb104896f2a3fca7))
* **histogram:**  Generator input could fail ([e91b591](https://github.com/hpcc-systems/Visualization/commit/e91b59106d2584048df7def9de708004c4be2a3f))



# 2.51.0 (2020-12-15)



# 2.50.0 (2020-12-01)



# 2.49.0 (2020-11-10)



# 2.48.0 (2020-11-03)



# 2.47.0 (2020-10-28)



# 2.46.0 (2020-10-23)



# 2.45.0 (2020-10-16)


### Features

* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>



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


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))






# 3.0.0 (2020-10-16)


### Features

* **dataflow:** Add support for "sensors" ([1457387](https://github.com/hpcc-systems/Visualization/commit/1457387ea407a97e808e58cbc153d00a3ef13f03))


### BREAKING CHANGES

* **dataflow:** chain renamed to pipe
* **dataflow:** ScalarActivities refactored into "observers" and "sensors"

Signed-off-by: Gordon Smith <GordonJSmith@gmail.com>



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


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))






# 2.5.0 (2020-08-22)


### Features

* **dataflow:**  Additional statistics ([83c5a1e](https://github.com/hpcc-systems/Visualization/commit/83c5a1e23c68a64fa59e2b2f300211007e1449a5))
* **dataflow:** Add histogram support ([040c1f3](https://github.com/hpcc-systems/Visualization/commit/040c1f31c0913e819fd2e7d9d85ad50f549cd79b))



# 2.33.0 (2020-08-08)



# 2.32.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))





# 2.4.0 (2020-08-05)



# 2.31.0 (2020-07-29)



# 2.30.0 (2020-07-29)



# 2.29.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))





# 2.3.0 (2020-07-28)



# 2.28.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))





# 2.2.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))





# 2.1.0 (2020-07-22)


### Features

* **dataflow:** Add iterator based data flow library ([6197935](https://github.com/hpcc-systems/Visualization/commit/6197935c2a2b0e70006e743a94b191792740fd17))
