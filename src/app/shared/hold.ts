import { ChangeDetectorRef, ViewRef, ɵɵdirectiveInject } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 *
 * Hold an observable subscription and unsubscribe on component unmount.
 *
 * @example
 * ```typescript
 *
 * const obs$ = of(1, 2, 3, 4, 5);
 * hold(obs$.pipe(delay(10)), (value) => console.log(value));
 *
 * ```
 *
 */
export function injectHold() {
  const subscription = new Subscription();
  const viewRef = ɵɵdirectiveInject(ChangeDetectorRef) as ViewRef;
  queueMicrotask(() =>
    viewRef.onDestroy(() => {
      console.log('Hold -> unsubscribe');
      subscription.unsubscribe();
    })
  );
  return (source$, observer) => {
    const sub = source$.subscribe(observer);
    subscription.add(sub);
    return sub;
  };
}
