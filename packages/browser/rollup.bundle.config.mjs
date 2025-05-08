import { makeBaseBundleConfig, makeBundleConfigVariants } from '@sentry-internal/rollup-utils';

const builds = [];

const browserPluggableIntegrationFiles = ['contextlines', 'httpclient', 'reportingobserver', 'browserprofiling'];

const reexportedPluggableIntegrationFiles = [
  'captureconsole',
  'dedupe',
  'extraerrordata',
  'rewriteframes',
  'feedback',
  'modulemetadata',
  'graphqlclient',
  'spotlight',
];

browserPluggableIntegrationFiles.forEach(integrationName => {
  const integrationsBundleConfig = makeBaseBundleConfig({
    bundleType: 'addon',
    entrypoints: [`src/integrations/${integrationName}.ts`],
    licenseTitle: `@debugg-ai/browser - ${integrationName}`,
    outputFileBase: () => `bundles/${integrationName}`,
  });

  builds.push(...makeBundleConfigVariants(integrationsBundleConfig));
});

reexportedPluggableIntegrationFiles.forEach(integrationName => {
  const integrationsBundleConfig = makeBaseBundleConfig({
    bundleType: 'addon',
    entrypoints: [`src/integrations-bundle/index.${integrationName}.ts`],
    licenseTitle: `@debugg-ai/browser - ${integrationName}`,
    outputFileBase: () => `bundles/${integrationName}`,
  });

  builds.push(...makeBundleConfigVariants(integrationsBundleConfig));
});

// Bundle config for additional exports we don't want to include in the main SDK bundle
// if we need more of these, we can generalize the config as for pluggable integrations
builds.push(
  ...makeBundleConfigVariants(
    makeBaseBundleConfig({
      bundleType: 'addon',
      entrypoints: ['src/pluggable-exports-bundle/index.multiplexedtransport.ts'],
      licenseTitle: '@debugg-ai/browser - multiplexedtransport',
      outputFileBase: () => 'bundles/multiplexedtransport',
    }),
  ),
);

const baseBundleConfig = makeBaseBundleConfig({
  bundleType: 'standalone',
  entrypoints: ['src/index.bundle.ts'],
  licenseTitle: '@debugg-ai/browser',
  outputFileBase: () => 'bundles/bundle',
});

const tracingBaseBundleConfig = makeBaseBundleConfig({
  bundleType: 'standalone',
  entrypoints: ['src/index.bundle.tracing.ts'],
  licenseTitle: '@debugg-ai/browser (Performance Monitoring)',
  outputFileBase: () => 'bundles/bundle.tracing',
});

const replayBaseBundleConfig = makeBaseBundleConfig({
  bundleType: 'standalone',
  entrypoints: ['src/index.bundle.replay.ts'],
  licenseTitle: '@debugg-ai/browser (Replay)',
  outputFileBase: () => 'bundles/bundle.replay',
});

const feedbackBaseBundleConfig = makeBaseBundleConfig({
  bundleType: 'standalone',
  entrypoints: ['src/index.bundle.feedback.ts'],
  licenseTitle: '@debugg-ai/browser & @sentry/feedback',
  outputFileBase: () => 'bundles/bundle.feedback',
});

const tracingReplayBaseBundleConfig = makeBaseBundleConfig({
  bundleType: 'standalone',
  entrypoints: ['src/index.bundle.tracing.replay.ts'],
  licenseTitle: '@debugg-ai/browser (Performance Monitoring and Replay)',
  outputFileBase: () => 'bundles/bundle.tracing.replay',
});

const tracingReplayFeedbackBaseBundleConfig = makeBaseBundleConfig({
  bundleType: 'standalone',
  entrypoints: ['src/index.bundle.tracing.replay.feedback.ts'],
  licenseTitle: '@debugg-ai/browser (Performance Monitoring, Replay, and Feedback)',
  outputFileBase: () => 'bundles/bundle.tracing.replay.feedback',
});

builds.push(
  ...makeBundleConfigVariants(baseBundleConfig),
  ...makeBundleConfigVariants(tracingBaseBundleConfig),
  ...makeBundleConfigVariants(replayBaseBundleConfig),
  ...makeBundleConfigVariants(feedbackBaseBundleConfig),
  ...makeBundleConfigVariants(tracingReplayBaseBundleConfig),
  ...makeBundleConfigVariants(tracingReplayFeedbackBaseBundleConfig),
);

export default builds;
