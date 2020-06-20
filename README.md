# fork-ts-checker-notifier-webpack-plugin

[![npm Version](https://img.shields.io/npm/v/fork-ts-checker-notifier-webpack-plugin.svg)](https://www.npmjs.com/package/fork-ts-checker-notifier-webpack-plugin)
[![build](https://travis-ci.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin.svg?branch=master)](https://travis-ci.com/johnnyreilly/fork-ts-checker-notifier-webpack-plugin/)
[![node version](https://img.shields.io/node/v/fork-ts-checker-notifier-webpack-plugin.svg)](https://www.npmjs.com/package/fork-ts-checker-notifier-webpack-plugin)

This is a [webpack](http://webpack.github.io/) plugin that uses the [node-notifier](https://github.com/mikaelbr/node-notifier) package to display build status system notifications to the user. It's purpose is to work with the [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin). This deliberately has a similar API as the excellent [webpack-notifier](https://github.com/Turbo87/webpack-notifier) plugin. If you are not using fork-ts-checker-webpack-plugin and you want system notifications then you probably want webpack-notifier.

The plugin will notify you about the first run (success/fail), all failed runs and the first successful run after recovering from
a build failure. In other words: it will stay silent if everything is fine with your build.

## Installation

This plugin requires minimum **fork-ts-checker-webpack-plugin@5**, **webpack 4**, see [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin) for minimum requirements.

Use `yarn` to install packages:

    yarn add --dev fork-ts-checker-webpack-plugin fork-ts-checker-notifier-webpack-plugin

Alternatively, use `npm`:

    npm install --save-dev fork-ts-checker-webpack-plugin fork-ts-checker-notifier-webpack-plugin

## Usage

In the `webpack.config.js` file:

```js
var ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

var config = module.exports = {
  /**
   * Plugin order is important.
   * A wrong order will cause some hooks to be undefined
   * and the build to fail
   */
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
  ]
},
```

## Configuration

### Title

Title prefix shown in the notifications.

```js
new ForkTsCheckerNotifierWebpackPlugin({ title: 'Webpack' });
```

### Exclude Warnings

If set to `true`, warnings will not cause a notification.

```js
new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true });
```

### Always Notify

Trigger a notification every time. Call it "noisy-mode".

```js
new ForkTsCheckerNotifierWebpackPlugin({ alwaysNotify: true });
```

### Skip Notification on the First Build

Do not notify on the first build. This allows you to receive notifications on subsequent incremental builds without being notified on the initial build.

```js
new ForkTsCheckerNotifierWebpackPlugin({ skipFirstNotification: true });
```

### Skip Notification for successfull builds

Skip notifications for successful builds.

```js
new ForkTsCheckerNotifierWebpackPlugin({ skipSuccessful: true });
```
