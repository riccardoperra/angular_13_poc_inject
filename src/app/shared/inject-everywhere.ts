import { InjectFlags, Injector, ɵɵdirectiveInject } from '@angular/core';

// Angular doesn't export `NG_FACTORY_DEF`.
const NG_FACTORY_DEF = 'ɵfac';
const INJECTOR = 9;

export function injectEverywhere<This, Token>(
  ctor: ThisType<This>,
  token: Token,
  injectFlags?: InjectFlags
): Token {
  return ctor['__ngContext__'][INJECTOR].get(token, injectFlags);
}
