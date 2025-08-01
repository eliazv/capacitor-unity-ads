import { registerPlugin } from '@capacitor/core';

import type { UnityadsPlugin } from './definitions';

const Unityads = registerPlugin<UnityadsPlugin>('Unityads', {
  web: () => import('./web').then((m) => new m.UnityadsWeb()),
});

export * from './definitions';
export { Unityads };
