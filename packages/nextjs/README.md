<p align="center">
  <a href="https://debugg-ai.io/?utm_source=github&utm_medium=logo" target="_blank">
    <img src="https://debugg-ai-brand.storage.googleapis.com/debugg-ai-wordmark-dark-280x84.png" alt="DebuggAI" width="280" height="84">
  </a>
</p>

# DebuggAI SDK wrapper for Next.js

[![npm version](https://img.shields.io/npm/v/@debugg-ai/nextjs.svg)](https://www.npmjs.com/package/@debugg-ai/nextjs)
[![npm dm](https://img.shields.io/npm/dm/@debugg-ai/nextjs.svg)](https://www.npmjs.com/package/@debugg-ai/nextjs)
[![npm dt](https://img.shields.io/npm/dt/@debugg-ai/nextjs.svg)](https://www.npmjs.com/package/@debugg-ai/nextjs)

> See the [Official DebuggAI Next.js SDK Docs](https://docs.debugg.ai) to get started.

## Compatibility

Currently, the minimum supported version of Next.js is `13.2.0`.

## Installation

To get started installing the SDK, use the DebuggAI Next.js Wizard by running the following command in your terminal or
read the [Getting Started Docs](https://docs.debugg.ai/platforms/javascript/guides/nextjs/):

```sh
npx @debugg-ai/wizard@latest -i nextjs
```

The wizard will prompt you to log in to DebuggAI. After the wizard setup is completed, the SDK will automatically capture
unhandled errors, and monitor performance.

## Custom Usage

To set context information or to send manual events, you can use `@debugg-ai/nextjs` as follows:

```ts
import * as DebuggAI from '@debugg-ai/nextjs';

// Set user information, as well as tags and further extras
DebuggAI.setTag('user_mode', 'admin');
DebuggAI.setUser({ id: '4711' });
DebuggAI.setContext('application_area', { location: 'checkout' });

// Add a breadcrumb for future events
DebuggAI.addBreadcrumb({
  message: '"Add to cart" clicked',
  // ...
});

// Capture exceptions or messages
DebuggAI.captureException(new Error('Oh no.'));
DebuggAI.captureMessage('Hello, world!');
```

## Links

- [Official SDK Docs](https://docs.debugg.ai/platforms/javascript/guides/nextjs/)
- [Debugg.ai](https://debugg.ai/?utm_source=github&utm_medium=npm_nextjs)
- [Debugg AI Discord Server](https://discord.gg/frJsD2Vx)
