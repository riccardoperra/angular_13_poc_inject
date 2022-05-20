import {
  Inject,
  Injectable,
  InjectionToken,
  ɵɵdirectiveInject,
} from '@angular/core';

const IDENTIFIER_PREFIX = new InjectionToken<string>(
  'identifierService/prefix',
  { providedIn: 'root', factory: () => 'uid' }
);

export const withIdentifier = (prefix: string) => [
  { provide: IDENTIFIER_PREFIX, useValue: `${prefix}_` },
  IdentifierService,
];

@Injectable({ providedIn: 'root' })
export class IdentifierService {
  private static autoId: number = 0;
  private readonly idPrefix = ɵɵdirectiveInject(IDENTIFIER_PREFIX);

  next(): string {
    return `${this.idPrefix}_${IdentifierService.autoId++}${Date.now()}`;
  }
}
