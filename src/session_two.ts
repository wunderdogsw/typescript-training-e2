/**
 * Return an object with properties that exist on both type A and B
 */

export type Map<T> = {
  readonly [key: string]: T | undefined;
};

export function get<T>(a: Map<T>, key: string): T | undefined {
  return a[key];
}

export function remove<T>(a: Map<T>, key: string): Map<T> {
  const { [key]: _value, ...b } = a;
  return b;
}

export function union<T>(a: Map<T>, b: Map<T>): Map<T> {
  return {};
}

export function intersection<T>(a: Map<T>, b: Map<T>): Map<T> {
  return {};
}

export function difference<T>(a: Map<T>, b: Map<T>): Map<T> {
  return {};
}

interface Indexed {
  [key: string]: any
}

type Common<A, B> = Pick<B, Extract<keyof A, keyof B>>;

/**
 * Return an object that inherits all the properties from the type B
 * where the property is common for both A and B
 */

export function commonProperties<A extends Indexed, B extends Indexed>(a: A, b: B): Common<A, B> {
  return ({} as Common<A, B>)
}