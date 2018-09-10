const ForkTsCheckerNotifierWebpackPlugin = require('./index');

test('first notification is skipped', () => {
  const plugin = new ForkTsCheckerNotifierWebpackPlugin({ skipFirstNotification: true });

  const returnValue = plugin.buildNotification([]);

  expect(returnValue).toBe(undefined);
  expect(plugin.isFirstBuild).toBe(false);
});