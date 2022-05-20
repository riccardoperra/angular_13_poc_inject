import { Observable } from 'rxjs';

export type ValuesOf<O> = O[keyof O];
export type KeysOf<O> = keyof O;

type InstanceOrType<T> = T extends abstract new (...args: any) => infer R
  ? R
  : T;

type InferArguments<T> = T extends (...args: infer R) => any ? R : never;

type Select<U, K> = K extends keyof U ? U[K] : never;

type ExtractString<T extends object> = Extract<keyof T, string>;

type FunctionParamsOrValueType<U, K, F> = InferArguments<
  Select<U, K>
> extends never
  ? [F]
  : InferArguments<Select<U, K>>;

export type Actions = {};

export type ActionTransforms<T extends {}> = Partial<{
  [K in keyof T]: (...args: any[]) => T[K];
}>;

export type ActionDispatchFn<O extends unknown[]> = (
  ...value: InstanceOrType<O>
) => void;

export type ActionDispatchers<T extends Actions> = {
  [K in keyof T]: ActionDispatchFn<
    FunctionParamsOrValueType<T, K, Select<T, K>>
  >;
};

export type ActionObservables<T extends Actions> = {
  [K in ExtractString<T> as `${K}$`]: Observable<InstanceOrType<T[K]>>;
};

export type RxActions<T extends Actions> = ActionDispatchers<T> &
  ActionObservables<T>;
