import { WebPlugin } from '@capacitor/core';

import type { UnityadsPlugin } from './definitions';

export class UnityadsWeb extends WebPlugin implements UnityadsPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
