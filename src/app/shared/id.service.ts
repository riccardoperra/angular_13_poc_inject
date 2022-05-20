import { Inject, Injectable, InjectionToken } from '@angular/core';

const IDENTIFIER_PREFIX = new InjectionToken<string>(
  'identifierService/prefix',
  { providedIn: 'root', factory: () => 'uid' }
);

@Injectable({ providedIn: 'root' })
export class IdentifierService {
  private static autoId: number = 0;

  constructor(@Inject(IDENTIFIER_PREFIX) readonly idPrefix: string) {}

  next(): string {
    return `${this.idPrefix}_${IdentifierService.autoId++}${Date.now()}`;
  }
}
