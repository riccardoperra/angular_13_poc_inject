import { ChangeDetectorRef, ViewRef, ɵɵdirectiveInject } from '@angular/core';
import { Subscription } from 'rxjs';

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
