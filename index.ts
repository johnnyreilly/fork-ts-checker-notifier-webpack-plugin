import * as path from 'path';
import * as notifier from 'node-notifier';
import * as util from 'util';
import { NormalizedMessage } from './types/NormalizedMessage';

interface Options {
  /** Title prefix shown in the notifications. */
  title?: string;
  /** If set to `true`, warnings will not cause a notification. */
  excludeWarnings?: boolean;
  /** Trigger a notification every time.  Call it "noisy-mode". */
  alwaysNotify?: boolean;
  /** Do not notify on the first build.  This allows you to receive notifications on subsequent incremental builds without being notified on the initial build. */
  skipFirstNotification?: boolean;
  /** Skip notifications for successful builds. */
  skipSuccessful?: boolean;
}

class ForkTsCheckerNotifierWebpackPlugin {
  options: Options;
  lastBuildSucceeded: boolean;
  isFirstBuild: boolean;
  titlePrefix: string;

  constructor(options?: Options) {
    this.options = options || {};
    this.lastBuildSucceeded = false;
    this.isFirstBuild = true;
    this.titlePrefix = this.options.title ? this.options.title + ' - ' : '';
  }

  buildNotification(normalizedMessages: NormalizedMessage[]) {
    if (this.isFirstBuild) {
      this.isFirstBuild = false;

      if (this.options.skipFirstNotification) {
        return undefined;
      }
    }

    var firstError = normalizedMessages.find(diagnostic => diagnostic.isErrorSeverity());
    var firstWarning = normalizedMessages.find(diagnostic => diagnostic.isWarningSeverity());

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
  }

  compilationDone = (diagnostics: NormalizedMessage[], lints: NormalizedMessage[]) => {
    var notification = this.buildNotification([ ...diagnostics, ...lints]);
    if (notification) {
      notifier.notify(notification);
    }
  }

  apply(compiler: any) {
    if ('hooks' in compiler) {
      // webpack 4
      try {
        compiler.hooks.forkTsCheckerReceive.tap(
          'fork-ts-checker-notifier-webpack-plugin',
          this.compilationDone
        );
      } catch (error) {
        console.error(`
          Something went wrong in accessing the hooks.
          Most likely the order of plugins is wrong.\n
          Check the documentation for "fork-ts-checker-notifier-webpack-plugin"\n
        `)
        throw Error(`Error: ${error}`);
      }
    } else {
      // webpack 2 / 3
      compiler.plugin(
        'fork-ts-checker-receive',
        this.compilationDone
      );
    }
  }
}

export = ForkTsCheckerNotifierWebpackPlugin;
