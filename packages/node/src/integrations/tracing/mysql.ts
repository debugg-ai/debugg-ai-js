import type { IntegrationFn } from '@debugg-ai/core';
import { defineIntegration } from '@debugg-ai/core';
import { MySQLInstrumentation } from '@opentelemetry/instrumentation-mysql';
import { generateInstrumentOnce } from '../../otel/instrument';

const INTEGRATION_NAME = 'Mysql';

export const instrumentMysql = generateInstrumentOnce(INTEGRATION_NAME, () => new MySQLInstrumentation({}));

const _mysqlIntegration = (() => {
  return {
    name: INTEGRATION_NAME,
    setupOnce() {
      instrumentMysql();
    },
  };
}) satisfies IntegrationFn;

/**
 * Adds Sentry tracing instrumentation for the [mysql](https://www.npmjs.com/package/mysql) library.
 *
 * For more information, see the [`mysqlIntegration` documentation](https://docs.sentry.io/platforms/javascript/guides/node/configuration/integrations/mysql/).
 *
 * @example
 * ```javascript
 * const Sentry = require('@debugg-ai/node');
 *
 * Sentry.init({
 *  integrations: [Sentry.mysqlIntegration()],
 * });
 * ```
 */
export const mysqlIntegration = defineIntegration(_mysqlIntegration);
