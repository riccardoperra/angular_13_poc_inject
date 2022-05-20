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
    subject$.next();
    subject$.complete();
  };

  viewRef.onDestroy(destroy);

  return subject$ as Observable<void>;
};

export function getActions<T extends {}>(): RxActions<T> {
  const destroy$ = new ReplaySubject<void>(1);
  const viewRef = ɵɵdirectiveInject(ChangeDetectorRef) as ViewRef;

  const destroy = () => {
    destroy$.next();
    destroy$.complete();
  };

  type SubjectMap<T> = { [K in keyof T]: Subject<T[K]> };

  const subjects: SubjectMap<T> = {} as SubjectMap<T>;
  const errorHandler = ɵɵdirectiveInject(ErrorHandler);

  queueMicrotask(() => {
    // Check if lView has been destroyed before that microtask event
    if (viewRef.destroyed) {
      destroy();
    }
    viewRef.onDestroy(destroy);
  });

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
