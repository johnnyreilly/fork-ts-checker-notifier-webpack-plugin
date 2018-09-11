import ForkTsCheckerNotifierWebpackPlugin = require('./index');
import { NormalizedMessage } from './types/NormalizedMessage';

const error = new NormalizedMessage({
  type: NormalizedMessage.TYPE_DIAGNOSTIC,
  code: 'code',
  severity: 'error',
  content: 'broken things',
  file: 'errorFile.ts',
  line: 10,
  character: 4
});

const warning = new NormalizedMessage({
  type: NormalizedMessage.TYPE_LINT,
  code: 'code',
  severity: 'warning',
  content: 'worrying things',
  file: 'warningFile.ts',
  line: 20,
  character: 8
});

describe('buildNotification', () => {
  test('first notification is skipped', () => {
    const plugin = new ForkTsCheckerNotifierWebpackPlugin({
      skipFirstNotification: true
    });

    const returnValue = plugin.buildNotification([]);

    expect(returnValue).toBe(undefined);
    expect(plugin.isFirstBuild).toBe(false);
  });

  test('given warning and error should trigger error notification', () => {
    const plugin = new ForkTsCheckerNotifierWebpackPlugin();

    const returnValue = plugin.buildNotification([warning, error]);

    expect(returnValue!.title).toBe(`Error in ${error.file}`);
    expect(returnValue!.message).toBe(error.content);
    expect(returnValue!.icon.endsWith('error.png')).toBe(true);
    expect(plugin.lastBuildSucceeded).toBe(false);
  });

  test('given warning should trigger warning notification', () => {
    const plugin = new ForkTsCheckerNotifierWebpackPlugin();

    const returnValue = plugin.buildNotification([warning]);

    expect(returnValue!.title).toBe(`Warning in ${warning.file}`);
    expect(returnValue!.message).toBe(warning.content);
    expect(returnValue!.icon.endsWith('warning.png')).toBe(true);
    expect(plugin.lastBuildSucceeded).toBe(false);
  });

  test('given warning when excludeWarnings is true should return success', () => {
    const plugin = new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true });

    const returnValue = plugin.buildNotification([warning]);

    expect(returnValue!.title).toBe('Type check succeeded');
    expect(returnValue!.message).toBe('No type errors! See warning(s) in console!');
    expect(returnValue!.icon.endsWith('built.png')).toBe(true);
    expect(plugin.lastBuildSucceeded).toBe(true);
  });

  test('given no errors or warnings should return success', () => {
    const plugin = new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true });

    const returnValue = plugin.buildNotification([]);

    expect(returnValue!.title).toBe('Type check succeeded');
    expect(returnValue!.message).toBe('No type errors!');
    expect(returnValue!.icon.endsWith('built.png')).toBe(true);
    expect(plugin.lastBuildSucceeded).toBe(true);
  });
});
