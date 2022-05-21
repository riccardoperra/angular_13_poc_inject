import {
  ChangeDetectorRef,
  ErrorHandler,
  ViewRef,
  ɵɵdirectiveInject,
} from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { actionProxyHandler } from './proxy';
import { RxActions } from './types';

export const injectOnDestroy$ = () => {
  const subject$ = new ReplaySubject<void>(1);
  const viewRef = ɵɵdirectiveInject(ChangeDetectorRef) as ViewRef;

  const destroy = () => {
    console.log(
      `${viewRef['context'].constructor.name} -> Clean all observables`
    );
    subject$.next();
    subject$.complete();
  };

  /**
   * https://github.com/angular/angular/blob/0ff4eda3d4bd52fb145285a472e9c0237ea8e68f/packages/core/src/render3/instructions/shared.ts#L804-L806
   */
  queueMicrotask(() => {
    if (viewRef.destroyed) {
      destroy();
    }
    viewRef.onDestroy(destroy);
  });

  return subject$ as Observable<void>;
};

export function getActions<T extends {}>(): RxActions<T> {
  const destroy$ = injectOnDestroy$();
  const viewRef = ɵɵdirectiveInject(ChangeDetectorRef) as ViewRef;

  type SubjectMap<T> = { [K in keyof T]: Subject<T[K]> };

  const subjects: SubjectMap<T> = {} as SubjectMap<T>;
  const errorHandler = ɵɵdirectiveInject(ErrorHandler);

  const proxy = new Proxy(
    {} as RxActions<T>,
    actionProxyHandler(subjects as any, errorHandler)
  ) as RxActions<T>;

  destroy$.subscribe(() => {
    Object.values(subjects as Record<string, Subject<any>>).forEach(
      (subject: Subject<any>) => subject.complete()
    );
  });

  return proxy;
}
