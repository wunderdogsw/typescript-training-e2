/**
 *  An utility type for a readonly Dictionary
 */

export type Dictionary<T> = {
  readonly [key: string]: T | undefined
}

/**
 * Extract a value pointed by the key from the Dictionary object
 */

export function get<T>(a: Dictionary<T>, key: string): T | undefined {
  return undefined
}

/**
 * Return a new Dictionary with the `key` removed
 */

export function remove<T>(a: Dictionary<T>, key: string): Dictionary<T> {
  return {}
}

/**
 * Return a new Dictionary with all the [key, value] pairs from a and b
 */

export function union<T>(a: Dictionary<T>, b: Dictionary<T>): Dictionary<T> {
  return {}
}

/**
 * Return a new Dictionary with all the [key, value] pairs that exist both in a and b
 */

export function intersection<T>(a: Dictionary<T>, b: Dictionary<T>): Dictionary<T> {
  return {}
}

/**
 * Return a new Dictionary with all the [key, value] pairs that do not exist in both a and b
 */

export function difference<T>(a: Dictionary<T>, b: Dictionary<T>): Dictionary<T> {
  return {}
}

interface Indexed {
  readonly [key: string]: any
}

type Common<A, B> = Pick<B, Extract<keyof A, keyof B>>

/**
 * Return an object that has all the properties from the type B
 * where the property is common for both A and B
 */

export function commonProperties<A extends Indexed, B extends Indexed>(
  a: A,
  b: B
): Common<A, B> {
  return {} as Common<A, B>
}

/**
 * Return a new array from input chunked to `count` chunks, ie.
 * [1,2,3,4], 2 => [[1, 2], [3, 4]]
 */

export function chunk<T>(input: Array<T>, count: number): Array<Array<T>> {
  return []
}

/**
 * Zip the arrays a and b together, ie,
 * [1,2,3], ["a", "b", "c"] => [[1, "a"], [2, "b"], [3, "c"]]
 *
 * Note the use of the tuple type:
 * https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple
 */

export function zip<T, K>(a: Array<T>, b: Array<K>): Array<[T, K]> {
  return []
}
