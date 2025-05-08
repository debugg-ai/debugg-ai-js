import type { SpanOrigin } from '@debugg-ai/core';
import { SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN } from '@debugg-ai/core';
import type { Span } from '@opentelemetry/api';

/** Adds an origin to an OTEL Span. */
export function addOriginToSpan(span: Span, origin: SpanOrigin): void {
  span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, origin);
}
