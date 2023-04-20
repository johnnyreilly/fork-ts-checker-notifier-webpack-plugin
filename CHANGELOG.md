# Changelog

## v7.0.0

- [Update to support `fork-ts-checker-webpack-plugin` v8](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/64)

**BREAKING CHANGES**

This drops support for `fork-ts-checker-webpack-plugin` versions < 8 - if you need to use v7 then please use <https://www.npmjs.com/package/fork-ts-checker-notifier-webpack-plugin/v/6.0.0>

## v6.0.0

- [Update to support `fork-ts-checker-webpack-plugin` v7](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/57)

**BREAKING CHANGES**

This drops support for `fork-ts-checker-webpack-plugin` versions < 7 - if you need to use v6 then please use <https://www.npmjs.com/package/fork-ts-checker-notifier-webpack-plugin/v/5.0.0>

## v5.0.0

- Upgrade `node-notifier` to `v8.0.2` to resolve [CVE-2020-7789](https://github.com/advisories/GHSA-5fw9-fq32-wv5p)

**BREAKING CHANGES**

This drops support for `node-notifier` versions < 8.

## v4.0.0

- [Update to support `fork-ts-checker-webpack-plugin` v6](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/39)

**BREAKING CHANGES**

This drops support for `fork-ts-checker-webpack-plugin` versions < 6 - if you need to use one of those versions then please use <https://www.npmjs.com/package/fork-ts-checker-notifier-webpack-plugin/v/3.0.0>

## v3.0.0

- [Update to support `fork-ts-checker-webpack-plugin` v5](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/37)

**BREAKING CHANGES**

This drops support for `fork-ts-checker-webpack-plugin` versions < 5 and `node` version < 10 - if you need to use one of those versions then please use <https://www.npmjs.com/package/fork-ts-checker-notifier-webpack-plugin/v/2.0.0>

## v2.0.0

- [Update to support `fork-ts-checker-webpack-plugin` v4](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/34) - thanks @madaz!

**BREAKING CHANGES**

This drops support for `fork-ts-checker-webpack-plugin` versions < 4 - if you need to use one of those versions then please use <https://www.npmjs.com/package/fork-ts-checker-notifier-webpack-plugin/v/1.0.3>

## v1.0.3

- Updated node-notifier version from `^5.1.2` to `^6.0.0` to [fix an issue wih SnoreToast on Windows 10 Pro](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/issues/28) - thanks @Wojtasik!
- [Updated github workflows with push.yml and release.yml](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/issues/30) - thanks @Wojtasik!

## v1.0.2

- [Fix TypeScript types - include NormalizedMessage](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/23) - thanks @johnnyreilly

## v1.0.1

- [Fix TypeScript types](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/20) - thanks @cdeutsch

## v1.0.0

- [`1.0.0`](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/15) - thanks @johnnyreilly!

## v1.0.0-alpha.0

- [`Make compatible with fork-ts-checker-webpack-plugin 1.0.0-alpha.1`](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/11) - thanks @johnnyreilly!

## v0.7.0

- [`Make compatible with fork-ts-checker-webpack-plugin 0.5.0`](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/10) - thanks @johnnyreilly!

## v0.6.2

- [Fix TypeScript compiler complains about unknown module `NormalizedMessage`](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/8) - thanks @n0v1!

## v0.6.1

- Updated README and added try/catch for forkTsCheckerReceive - thanks @Rolandisimo!

## v0.6.0

- [Rewrite in TypeScript and add test pack - minimum node version 6.0](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/6) - thanks @johnnyreilly!

## v0.5.0

- [Fix no notification when build succeed with warnings and excludeWarnings was set to true. Show basename instead of the full path. Updated messages](https://github.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/pull/4) - thanks @deftomat!

## v0.4.0

- Added webpack 4 support - thanks @johnnyreilly!

## v0.2.0

- Added option to skip successful build notifications - thanks @Igogrek!

## v0.1.4

- Handle lints as well as diagnostics

## v0.1.3

- Initial version
