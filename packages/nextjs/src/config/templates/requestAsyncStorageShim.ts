import type { WebFetchHeaders } from '@debugg-ai/core';

export interface RequestAsyncStorage {
  getStore: () =>
    | {
        headers: WebFetchHeaders;
      }
    | undefined;
}

export const requestAsyncStorage = undefined;
export const workUnitAsyncStorage = undefined;
