import type { DsnComponents, DsnLike, DsnProtocol } from '../types-hoist/dsn';
import { DEBUG_BUILD } from './debug-build';
import { consoleSandbox, logger } from './logger';

/** Regular expression used to parse a Dsn. */
const DSN_REGEX = /^(https?):\/\/([^\/]+)\/api\/v1\/ingest\/([a-f0-9\-]+)\/([a-f0-9\-]+)\/?$/;

function isValidProtocol(protocol?: string): protocol is DsnProtocol {
  return protocol === 'http' || protocol === 'https';
}

/**
 * Renders the string representation of this Dsn.
 *
 * By default, this will render the public representation without the password
 * component. To get the deprecated private representation, set `withPassword`
 * to true.
 *
 * @param withPassword When set to true, the password will be included.
 */
export function dsnToString(dsn: DsnComponents, withPassword: boolean = false): string {
  const { host, path, pass, port, projectId, protocol, publicKey } = dsn;
  // Public key is the company key
  // Project ID is the project key
  return `${protocol}://${host}${port ? `:${port}` : ''}/api/v1/ingest/${publicKey}/${projectId}/`;
}

/**
 * Parses a Dsn from a given string.
 *
 * @param str A Dsn as string
 * @returns Dsn as DsnComponents or undefined if @param str is not a valid DSN string
 */
export function dsnFromString(str: string): DsnComponents | undefined {
  const match = DSN_REGEX.exec(str);

  if (!match) {
    // This should be logged to the console
    consoleSandbox(() => {
      // eslint-disable-next-line no-console
      console.error(`Invalid Debugg AI Dsn: ${str}`);
    });
    return undefined;
  }

  let [protocol, host = '', publicKey = '', projectId = ''] = match.slice(1);
  // let path = '';
  let pass = '';
  let port = '';
  const path = 'api/v1/ingest';
  const split = projectId.split('/');
  if (split.length > 1) {
    // path = split.slice(0, -1).join('/');
    projectId = split.pop() as string;
  }

  return dsnFromComponents({ host, pass, path, projectId, port, protocol: protocol as DsnProtocol, publicKey });
}

function dsnFromComponents(components: DsnComponents): DsnComponents {
  return {
    protocol: components.protocol,
    publicKey: components.publicKey || '',
    pass: components.pass || '',
    host: components.host,
    port: components.port || '',
    path: components.path || '',
    projectId: components.projectId,
  };
}

function validateDsn(dsn: DsnComponents): boolean {
  if (!DEBUG_BUILD) {
    return true;
  }

  const { port, projectId, protocol } = dsn;

  const requiredComponents: ReadonlyArray<keyof DsnComponents> = ['protocol', 'publicKey', 'host', 'projectId'];
  const hasMissingRequiredComponent = requiredComponents.find(component => {
    if (!dsn[component]) {
      logger.error(`Invalid Debugg AI Dsn: ${component} missing`);
      return true;
    }
    return false;
  });

  if (hasMissingRequiredComponent) {
    return false;
  }

  if (!projectId.match(/^\d+$/)) {
    logger.error(`Invalid Debugg AI Dsn: Invalid projectId ${projectId}`);
    return false;
  }

  if (!isValidProtocol(protocol)) {
    logger.error(`Invalid Debugg AI Dsn: Invalid protocol ${protocol}`);
    return false;
  }

  if (port && isNaN(parseInt(port, 10))) {
    logger.error(`Invalid Debugg AI Dsn: Invalid port ${port}`);
    return false;
  }

  return true;
}

/**
 * Creates a valid Sentry Dsn object, identifying a Sentry instance and project.
 * @returns a valid DsnComponents object or `undefined` if @param from is an invalid DSN source
 */
export function makeDsn(from: DsnLike): DsnComponents | undefined {
  const components = typeof from === 'string' ? dsnFromString(from) : dsnFromComponents(from);
  if (!components || !validateDsn(components)) {
    return undefined;
  }
  return components;
}
