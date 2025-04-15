/// <reference types="node-notifier" />

declare module 'toasted-notifier' {
  import nodeNotifier = require('node-notifier');
  export = nodeNotifier;
}