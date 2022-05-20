import { ChangeDetectorRef, ɵɵdirectiveInject, ViewRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { injectOnDestroy$ } from '../action';
import { injectHold } from './hold';

export function injectCreateState<T extends object>(initialState: T) {
  const viewRef = ɵɵdirectiveInject(ChangeDetectorRef) as ViewRef;
  const destroy$ = injectOnDestroy$();
  const state$ = new BehaviorSubject<T>(initialState);
  const hold = injectHold();

  queueMicrotask(() => {
    state$.subscribe(() => viewRef.detectChanges());
  });
  hold(state$.pipe(skip(1)), () => viewRef.detectChanges());

  destroy$.subscribe(() => state$.complete());

  return new Proxy(state$, {
    get(target, prop) {
      if (isKeyOf(prop, initialState)) {
        return target.getValue()[prop];
      }
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      if (isKeyOf(prop, initialState)) {
        target.next({ [prop]: value } as any);
      } else {
        Reflect.set(target, prop, value);
      }
      return true;
    },
  }) as BehaviorSubject<T> & T;
}

export function isKeyOf<T extends Object>(key: any, obj: T): key is keyof T {
  return typeof key === 'string' && Object.keys(obj).includes(key);
}
