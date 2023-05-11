import path from 'path';
import notifier from 'node-notifier';
import util from 'util';
import forkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Issue } from 'fork-ts-checker-webpack-plugin/lib/issue';
import type { Compiler } from 'webpack';

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

  buildNotification(issues: Issue[]) {
    if (this.isFirstBuild) {
      this.isFirstBuild = false;

      if (this.options.skipFirstNotification) {
        return undefined;
      }
    }

    const firstError = issues.find((issue) => issue.severity === 'error');
    const firstWarning = issues.find((issue) => issue.severity === 'warning');

    if (firstError) {
      this.lastBuildSucceeded = false;

      return {
        title: util.format(
          '%s%s',
          this.titlePrefix,
          'Error in ' + path.basename(firstError.file || '')
        ),
        message: firstError.message,
        icon: path.join(__dirname, 'images/error.png'),
      };
    }

    if (firstWarning && !this.options.excludeWarnings) {
      this.lastBuildSucceeded = false;

      return {
        title: util.format(
          '%s%s',
          this.titlePrefix,
          'Warning in ' + path.basename(firstWarning.file || '')
        ),
        message: firstWarning.message,
        icon: path.join(__dirname, 'images/warning.png'),
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
        icon: path.join(__dirname, 'images/built.png'),
      };
    }
  }

  compilationDone = (issues: Issue[]): Issue[] => {
    const notification = this.buildNotification(issues);
    if (notification) {
      notifier.notify(notification);
    }
    return issues;
  };

  apply(compiler: Compiler) {
    // webpack 4+
    try {
      forkTsCheckerWebpackPlugin
        .getCompilerHooks(compiler)
        .issues.tap(
          'fork-ts-checker-notifier-webpack-plugin',
          this.compilationDone
        );
    } catch (error) {
      console.error(`
        Something went wrong in accessing the hooks.
        Most likely the order of plugins is wrong.\n
        Check the documentation for "fork-ts-checker-notifier-webpack-plugin"\n
      `);
      throw Error(`Error: ${error}`);
    }
  }
}

export = ForkTsCheckerNotifierWebpackPlugin;
