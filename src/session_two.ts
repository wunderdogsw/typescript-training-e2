/**
 *  An utility type for a readonly HashMap style Dictionary
 *  (ES6 reserved the name Map)
 */

export interface Dictionary<T> {
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

export function intersection<T>(
    a: Dictionary<T>,
    b: Dictionary<T>
): Dictionary<T> {
    return {}
}

/**
 * Return a new Dictionary with all the [key, value] pairs that do not exist in both a and b
 */

export function difference<T>(
    a: Dictionary<T>,
    b: Dictionary<T>
): Dictionary<T> {
    return {}
}

/**
 * Return a new array from input chunked to `count` chunks, ie.
 * [1,2,3,4], 2 => [[1, 2], [3, 4]]
 */

export function chunk<A>(input: Array<A>, count: number): Array<Array<A>> {
    return []
}

/**
 * Zip the arrays a and b together, ie,
 * [1,2,3], ["a", "b", "c"] => [[1, "a"], [2, "b"], [3, "c"]]
 *
 * Note the use of the tuple type:
 * https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple
 */

export function zip<A, B>(a: Array<A>, b: Array<B>): Array<[A, B]> {
    return []
}

/**
 * Intermingle, or merge two arrays into one by mixing the elements one after the other, ie.
 * [1,2,3], ["a", "b", "c"] => [1, "a", 2, "b", 3, "c"]
 */

export function intermingle<A, B>(a: Array<A>, b: Array<B>): Array<A | B> {
    const arr: Array<A | B> = []
    return arr
}

/**
 * Return a new object with same fields as the parameter, but with a new `timestamp` field.
 */

interface Timestamped {
    timestamp: number
}

export function withTimestamp<T extends object>(
    value: T,
    timestamp: number
): T & Timestamped {
    return value as T & Timestamped
}

/**
 * Return an object which has the same fields as the parameter, but
 * the value of each field is the length of the fields name.
 * e.g.
 * { a: '', abc: 66 } => { a: 1, abc: 3 }
 */

type KeyLengths<T> = { [Key in keyof T]: number }

export function keyLengths<T>(value: T): KeyLengths<T> {
    return {} as KeyLengths<T>
}

/**
 * Calculate the volume of Cube, Sphere and Cylinder using a single function.
 */

interface Cube {
    type: 'cube'
    size: number
}

interface Sphere {
    type: 'sphere'
    radius: number
}

interface Cylinder {
    type: 'cylinder'
    radius: number
    height: number
}

type Shape = Cube | Sphere | Cylinder

export function volume(shape: Shape): number {
    return 0
}
