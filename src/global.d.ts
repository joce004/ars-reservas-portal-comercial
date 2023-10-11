/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type PickNullable<T, K extends keyof T> = Pick<Nullable<T>, K> & Omit<T, K>;

type OmitNullable<T, K extends keyof T> = Omit<Nullable<T>, K> & Pick<T, K>;

type Unknown<T> = Partial<Record<keyof T, unknown>>;

type Modify<T, R extends Unknown<T>> = Omit<T, keyof R> & R;

type HintedString<KnownValues extends string> = (string & {}) | KnownValues;

type Permutations<T extends string, U extends string = T> = T extends any
  ? T | `${T} ${Permutations<Exclude<U, T>>}`
  : never;
