import { Observable, Subject, takeUntil } from 'rxjs';
import { KeysOf, RxActions, ValuesOf } from './types';
import { ErrorHandler } from '@angular/core';

export function actionProxyHandler<T>(
  subjects: { [K in keyof T]: Subject<ValuesOf<T>> },
  errorHandler?: ErrorHandler
): ProxyHandler<RxActions<T>> {
  return {
    get(_, property: string) {
      type KeysOfT = KeysOf<T>;
      type ValuesOfT = ValuesOf<T>;
      const prop = property as KeysOfT;

      if (prop.toString().split('').pop() === '$') {
        const propName = prop.toString().slice(0, -1) as KeysOfT;
        subjects[propName] = subjects[propName] || new Subject<ValuesOfT>();
        return subjects[propName];
      }

      return (args: ValuesOfT) => {
        subjects[prop] = subjects[prop] || new Subject<ValuesOfT>();
        try {
          subjects[prop].next(args);
        } catch (err) {
          errorHandler?.handleError(err);
        }
      };
    },
    set() {
      throw new Error('No setters available. To emit call the property name.');
    },
  };
}
