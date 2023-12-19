import ForkTsCheckerNotifierWebpackPlugin from './index';
import { Issue } from 'fork-ts-checker-webpack-plugin/lib/issue';

const error: Issue = {
  code: 'code',
  severity: 'error',
  message: 'broken things',
  file: 'errorFile.ts',
  location: {
    start: {
      line: 10,
      column: 10,
    },
    end: {
      line: 10,
      column: 10,
    },
  },
};

const warning: Issue = {
  code: 'code',
  severity: 'warning',
  message: 'worrying things',
  file: 'warningFile.ts',
  location: {
    start: {
      line: 10,
      column: 10,
    },
    end: {
      line: 10,
      column: 10,
    },
  },
};

describe('buildNotification', () => {
  test('first notification is skipped', () => {
    const plugin = new ForkTsCheckerNotifierWebpackPlugin({
      skipFirstNotification: true,
    });

    const returnValue = plugin.buildNotification([]);

    expect(returnValue).toBe(undefined);
    expect(plugin.isFirstBuild).toBe(false);
  });

  test('given warning and error should trigger error notification', () => {
    const plugin = new ForkTsCheckerNotifierWebpackPlugin();

    const returnValue = plugin.buildNotification([warning, error]);

    if (returnValue === undefined) {
      throw Error();
    }

    expect(returnValue.title).toBe(`Error in ${error.file}`);
    expect(returnValue.message).toBe(error.message);
    expect(returnValue.icon.endsWith('error.png')).toBe(true);
    expect(plugin.lastBuildSucceeded).toBe(false);
  });

  test('given warning should trigger warning notification', () => {
    const plugin = new ForkTsCheckerNotifierWebpackPlugin();

    const returnValue = plugin.buildNotification([warning]);

    if (returnValue === undefined) {
      throw Error();
    }

    expect(returnValue.title).toBe(`Warning in ${warning.file}`);
    expect(returnValue.message).toBe(warning.message);
    expect(returnValue.icon.endsWith('warning.png')).toBe(true);
    expect(plugin.lastBuildSucceeded).toBe(false);
  });

  test('given warning when excludeWarnings is true should return success', () => {
    const plugin = new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
    });

    const returnValue = plugin.buildNotification([warning]);

    if (returnValue === undefined) {
      throw Error();
    }

    expect(returnValue.title).toBe('Type check succeeded');
    expect(returnValue.message).toBe(
      'No type errors! See warning(s) in console!',
    );
    expect(returnValue.icon.endsWith('built.png')).toBe(true);
    expect(plugin.lastBuildSucceeded).toBe(true);
  });

  test('given no errors or warnings should return success', () => {
    const plugin = new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
    });

    const returnValue = plugin.buildNotification([]);

    if (returnValue === undefined) {
      throw Error();
    }

    expect(returnValue.title).toBe('Type check succeeded');
    expect(returnValue.message).toBe('No type errors!');
    expect(returnValue.icon.endsWith('built.png')).toBe(true);
    expect(plugin.lastBuildSucceeded).toBe(true);
  });
});
