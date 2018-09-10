var path = require('path');
var notifier = require('node-notifier');
var util = require('util');

var ForkTsCheckerNotifierWebpackPlugin = (module.exports = function(options) {
  this.options = options || {};
  this.lastBuildSucceeded = false;
  this.isFirstBuild = true;
  this.titlePrefix = this.options.title ? this.options.title + ' - ' : '';
});

ForkTsCheckerNotifierWebpackPlugin.prototype.buildNotification = function(
  normalizedMessages
) {
  if (this.isFirstBuild) {
    this.isFirstBuild = false;

    if (this.options.skipFirstNotification) {
      return undefined;
    }
  }

  var firstError = normalizedMessages.find(function(diagnostic) {
    return diagnostic.isErrorSeverity();
  });

  var firstWarning = normalizedMessages.find(function(diagnostic) {
    return diagnostic.isWarningSeverity();
  });

  if (firstError) {
    this.lastBuildSucceeded = false;

    return {
      title: util.format(
        '%s%s',
        this.titlePrefix,
        'Error in ' + path.basename(firstError.getFile())
      ),
      message: firstError.getContent(),
      icon: path.join(__dirname, 'images/error.png')
    };
  }

  if (firstWarning && !this.options.excludeWarnings) {
    this.lastBuildSucceeded = false;

    return {
      title: util.format(
        '%s%s',
        this.titlePrefix,
        'Warning in ' + path.basename(firstWarning.getFile())
      ),
      message: firstWarning.getContent(),
      icon: path.join(__dirname, 'images/warning.png')
    };
  }

  if (
    !this.options.skipSuccessful &&
    (!this.lastBuildSucceeded || this.options.alwaysNotify)
  ) {
    this.lastBuildSucceeded = true;

    return {
      title: util.format('%sType check succeeded', this.titlePrefix),
      message: util.format(
        '%s%s',
        'No type errors!',
        firstWarning ? ' See warning(s) in console!' : ''
      ),
      icon: path.join(__dirname, 'images/built.png')
    };
  }
};

ForkTsCheckerNotifierWebpackPlugin.prototype.compilationDone = function(
  diagnostics,
  lints
) {
  var notification = this.buildNotification([].concat(diagnostics, lints));
  if (notification) {
    notifier.notify(notification);
  }
};

ForkTsCheckerNotifierWebpackPlugin.prototype.apply = function(compiler) {
  if ('hooks' in compiler) {
    // webpack 4
    compiler.hooks.forkTsCheckerReceive.tap(
      'fork-ts-checker-notifier-webpack-plugin',
      this.compilationDone.bind(this)
    );
  } else {
    // webpack 2 / 3
    compiler.plugin('fork-ts-checker-receive', this.compilationDone.bind(this));
  }
};
