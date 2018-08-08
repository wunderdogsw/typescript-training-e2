/**
 * Return an object with properties that exist on both type A and B
 */

export type Map<T> = {
  [key: string]: T | undefined
};

export function union<T>(a: Map<T>, b: Map<T>): Map<T> {
  return {}
}

export function intersection<T>(a: Map<T>, b: Map<T>): Map<T> {
  return {}
}

export function difference<T>(a: Map<T>, b: Map<T>): Map<T> {
  return {}
}
