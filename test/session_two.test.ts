import * as second from '~/session_two'
import { Map } from '~/session_two'

const a = 'a', b = 'b', c = 'c'
type TestMap = Map<string>

type TestCase<FP, SP, RET> = {
  input: [FP, SP],
  expected: RET
}

function pretty(p: object | string): string {
  if(typeof p === 'string') {
    return p
  } else {
    return `{ ${Object.keys(p).join(', ')} }`
  }
}

function prettyParams(input: (object | string)[], expected: object | string) {
  const prettyInput = input
  .map(pretty)
  .join(', ')
  const prettyOutput = pretty(expected)
  return {
    input: prettyInput,
    output: prettyOutput
  }
}

describe('Session two', () => {
  describe('The Map type', () => {
    describe('get(a, key)', () => {
      const { get } = second
      type GetCase = TestCase<TestMap, string, string | undefined>
      const testCases: GetCase[] = [
        {
          input: [{ a, b }, 'a'],
          expected: 'a'
        },
        {
          input: [{ a, b, c }, 'c'],
          expected: c
        },
        {
          input: [{ a, b }, 'c'],
          expected: undefined
        },
        {
          input: [{ }, 'foo'],
          expected: undefined
        }
      ]
      testCases.forEach(({ input, expected }: GetCase) => {
        const pretty = prettyParams(input, expected || '')
        it(`should return ${pretty.output} for the input ${pretty.input}, `, () => {
          expect(get.apply(null, input)).toEqual(expected)
        })
      })
    })

    describe('remove(a, key)', () => {
      const { remove } = second
      type RemoveCase = TestCase<TestMap, string, TestMap>

      const testCases: RemoveCase[] = [
        {
          input: [{ a, b }, 'a'],
          expected: { b }
        },
        {
          input: [{ a, b, c }, 'c'],
          expected: { a, b }
        },
        {
          input: [{ a, b }, 'c'],
          expected: { a, b }
        },
        {
          input: [{ }, 'foo'],
          expected: {}
        }
      ]
      testCases.forEach(({ input, expected }: RemoveCase) => {
        const pretty = prettyParams(input, expected || '')
        it(`should return ${pretty.output} for the input ${pretty.input}, `, () => {
          expect(remove.apply(null, input)).toEqual(expected)
        })
      })
    })

    describe('intersection(a, b)', () => {
      const { intersection } = second
      type RemoveCase = TestCase<TestMap, TestMap, TestMap>
      const testCases: RemoveCase[] = [        {
          input: [{ a, b }, { c }],
          expected: {}
        },
        {
          input: [{ a, b }, { a }],
          expected: { a }
        },
        {
          input: [{ a, b, c }, { a, b, c }],
          expected: { a, b, c }
        },
        {
          input: [{}, { a, b }],
          expected: {}
        },
        {
          input: [{}, {}],
          expected: {}
        }
      ]
      testCases.forEach(({ input, expected }: RemoveCase) => {
        const pretty = prettyParams(input, expected)
        it(`should return ${pretty.output} for the input ${pretty.input}, `, () => {
          expect(intersection.apply(null, input)).toEqual(expected)
        })
      })
    })

    describe('difference(a, b)', () => {
      const { difference } = second
      type DifferenceCase = TestCase<TestMap, TestMap, TestMap>
      const testCases: DifferenceCase[] = [
        {
          input: [{ a, b }, { c }],
          expected: { a, b, c }
        },
        {
          input: [{ a, b }, { a }],
          expected: { b }
        },
        {
          input: [{ a, b, c }, { a, b, c }],
          expected: {}
        },
        {
          input: [{}, { a, b }],
          expected: { a, b }
        },
        {
          input: [{}, {}],
          expected: {}
        }
      ]
      testCases.forEach(({ input, expected }: DifferenceCase) => {
        const pretty = prettyParams(input, expected)
        it(`should return ${pretty.output} for the input ${pretty.input}, `, () => {
          expect(difference.apply(null, input)).toEqual(expected)
        })
      })
    })
  })

  describe('commonProperties', () => {
    const { commonProperties } = second
    type A = {
      a: string,
    }

    type B = {
      a: string,
      b: number
    }

    type C = {
      a: string,
      b: number,
      c: () => void
    }

    type D = {
      b: number,
      c: () => void,
      d: Array<number>
    }

    it('should return the intersection of types A and B', () => {
      const left: A = { a }
      const right: B = { a, b: 0}
      expect(commonProperties(left, right)).toEqual({ a })
    })

    it('should carry the properties of the right-hand side type', () => {
      const left: A = { a }
      const right = { a: 0 }
      expect(commonProperties(left, right)).toEqual(right)
    })

    it('should drop properties that don\'t exist on the rhs object', () => {
      const left: C = {
        a,
        b: 0,
        c: () => null
      }

      const right: D = {
        b: 0,
        c: () => null,
        d: []
      }
      expect(commonProperties(left, right)).toEqual({b: 0, c: right.c})
    })
  })
})
