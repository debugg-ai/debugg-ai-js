import type { MissingInstrumentationContext } from '@debugg-ai/core';
import { isCjs } from './commonjs';

export const createMissingInstrumentationContext = (pkg: string): MissingInstrumentationContext => ({
  package: pkg,
  'javascript.is_cjs': isCjs(),
});
