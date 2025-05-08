import type { Scope } from '@debugg-ai/core';
import { context } from '@opentelemetry/api';
import { getScopesFromContext } from '@debugg-ai/opentelemetry';

/**
 * Update the active isolation scope.
 * Should be used with caution!
 */
export function setIsolationScope(isolationScope: Scope): void {
  const scopes = getScopesFromContext(context.active());
  if (scopes) {
    scopes.isolationScope = isolationScope;
  }
}
