import { ChangeDetectorRef, ɵɵdirectiveInject, ViewRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { getActions, injectOnDestroy$ } from '../action';
import { RxActions } from '../action/types';
import { injectHold } from './hold';

export function injectCreateState<T extends object>(
  initialState: T,
  mode: 'detectChanges' | 'markForCheck' = 'detectChanges'
) {
  const viewRef = ɵɵdirectiveInject(ChangeDetectorRef) as ViewRef;
  const destroy$ = injectOnDestroy$();
  const state$ = new BehaviorSubject<T>(initialState);
  const hold = injectHold();

  const triggerCd = () => {
    if (mode === 'detectChanges') {
      viewRef.detectChanges();
    } else {
      viewRef.markForCheck();
    }
  };

  // `cd.detectChanges()` cannot be invoked when component is not ready
  queueMicrotask(() => {
    state$.subscribe(triggerCd);
  });
  hold(state$.pipe(skip(1)), triggerCd);

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
        target.next({ ...target.value, [prop]: value } as any);
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

type BetterState<T extends object, Actions extends {}> = BehaviorSubject<T> &
  T & {
    actions: RxActions<Actions>;
    hold: <T>(o$: Observable<T>, cb: (value: T) => void) => void;
  };

/**
 * State management with `hold`, `getActions` features and automatic change detection
 */
export function injectBetterState<T extends object, Actions extends {}>(
  initialState: T,
  mode: 'detectChanges' | 'markForCheck' = 'detectChanges'
): BetterState<T, Actions> {
  const state = injectCreateState(initialState, mode);
  const hold = injectHold();
  const actions = getActions<Actions>();
  state['hold'] = hold;
  state['actions'] = actions;
  return state as BetterState<T, Actions>;
}
