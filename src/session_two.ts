/**
 *  An utility type for a readonly HashMap style Dictionary
 *  (ES6 reserved the name Map)
 */

export interface Dictionary<T> {
  readonly [key: string]: T | undefined;
}

/**
 * Extract a value pointed by the key from the Dictionary object
 */

export function get<T>(a: Dictionary<T>, key: string): T | undefined {
  return undefined;
}

/**
 * Return a new Dictionary with the `key` removed
 */

export function remove<T>(a: Dictionary<T>, key: string): Dictionary<T> {
  return {};
}

/**
 * Return a new Dictionary with all the [key, value] pairs from a and b
 */

export function union<T>(a: Dictionary<T>, b: Dictionary<T>): Dictionary<T> {
  return {};
}

/**
 * Return a new Dictionary with all the [key, value] pairs that exist both in a and b
 */

export function intersection<T>(
  a: Dictionary<T>,
  b: Dictionary<T>
): Dictionary<T> {
  return {};
}

/**
 * Return a new Dictionary with all the [key, value] pairs that do not exist in both a and b
 */

export function difference<T>(
  a: Dictionary<T>,
  b: Dictionary<T>
): Dictionary<T> {
  return {};
}

/**
 * Return a new array from input chunked to `count` chunks, ie.
 * [1,2,3,4], 2 => [[1, 2], [3, 4]]
 */

export function chunk<A>(input: Array<A>, count: number): Array<Array<A>> {
  return [];
}

/**
 * Zip the arrays a and b together, ie,
 * [1,2,3], ["a", "b", "c"] => [[1, "a"], [2, "b"], [3, "c"]]
 *
 * Note the use of the tuple type:
 * https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple
 */

export function zip<A, B>(a: Array<A>, b: Array<B>): Array<[A, B]> {
  return [];
}

/**
 * Intermingle, or merge two arrays into one by mixing the elements one after the other, ie.
 * [1,2,3], ["a", "b", "c"] => [1, "a", 2, "b", 3, "c"]
 */

export function intermingle<A, B>(a: Array<A>, b: Array<B>): Array<A | B> {
  const arr: Array<A | B> = [];
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    arr.push(a[i]);
    arr.push(b[i]);
  }
  return arr;
}

/**
 * Return a new object with same fields as the parameter, but with a new `timestamp` field.
 * 
 * NOTE/HINT: object spread doesn't work with generic types yet, try Object.assign
 */

interface Timestamped {
  timestamp: number
}

export function withTimestamp<T extends object>(value: T, timestamp: number): T & Timestamped {
  return value as T & Timestamped
}

/**
 * 1. Return an object which has the same fields as the parameter, but
 *    the value of each field is the lenght of the fields name.
 *    e.g.
 *    { foobar: '', bar: 66 } => { foobar: 6, bar: 3 }
 * 
 * 2. Then, make KeyLengths<T> and keyLenghts() externally type safe, no `any`!
 *    Sometimes internal `any` use is unavoidable, but try to make it as
 *    type safe as possible.
 */

type KeyLengths<T> = any // :(

export function keyLengths<T>(value: T): KeyLengths<T> {
  return {} as KeyLengths<T>
}

function verifyKeyLengthsTypes() {
  const lengths = keyLengths({
    username: 'root',
    password: 'iddqd',
  })
  // These should have OK types
  const usernameLen: number = lengths.username
  const passwordLen: number = lengths.password

  // These should not pass type check
  const flurbLen: number = lengths.flurb
  const usernameStr: string = lengths.username
  const passwordStr: string = lengths.password

  // Just to get rid of "unused variable" warning
  console.log(usernameLen, passwordLen, flurbLen, usernameStr, passwordStr)
}
