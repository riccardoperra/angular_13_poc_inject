import {
  InjectFlags,
  Injector,
  ProviderToken,
  Type,
  ɵɵdirectiveInject,
} from '@angular/core';

// Angular doesn't export `NG_FACTORY_DEF`.
// const NG_FACTORY_DEF = 'ɵfac';
const INJECTOR = 9;
const NG_CONTEXT = '__ngContext__';

export function injectEverywhere<This, Token>(
  ctor: ThisType<This>,
  token: ProviderToken<Token>,
  injectFlags?: InjectFlags
): Token {
  // Get __ngContext__, then take the Injector from the component metadata.
  return ctor[NG_CONTEXT][INJECTOR].get(token, injectFlags);
}