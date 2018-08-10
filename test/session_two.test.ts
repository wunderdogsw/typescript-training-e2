import * as second from '~/session_two'
import { Dictionary } from '~/session_two'

const a = 'a', b = 'b', c = 'c', d = 'd'
type TestMap = Dictionary<string>

type TestCase<FP, SP, RET> = {
  input: [FP, SP],
  expected: RET
}

function pretty(p: object | number | string | Array<{}> | undefined): string {
  if(Array.isArray(p)) {
    const children = p.map(value => pretty(value)).join(', ')
    return `[${children}]`
  }
  if(p === undefined) {
    return 'undefined'
  }
  if(typeof p === 'number') {
    return p.toString()
  }
  if(typeof p === 'string') {
    return p
  } else {
    return `{ ${Object.keys(p).join(', ')} }`
  }
}

function prettyParams(input: (object | string | number | Array<{}>)[], expected: object | string | Array<unknown> | undefined) {
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
  describe('The Dictionary type', () => {
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

  describe('chunk(input, n)', () => {
    const { chunk } = second
    type ChunkCase = TestCase<Array<string>, number, Array<Array<string>>>
    const testCases: ChunkCase[] = [
      {
        input: [[a], 2],
        expected: [[a]]
      },
      {
        input: [[a, b, c], 1],
        expected: [[a], [b], [c]]
      },
      {
        input: [[a, b, c, d], 2],
        expected: [[a, b], [c, d]]
      },
      {
        input: [[a, b, c, d], 3],
        expected: [[a, b, c], [d]]
      },
      {
        input: [[a, b, c, d], 4],
        expected: [[a, b, c, d]]
      }
    ]
    testCases.forEach(({ input, expected }: ChunkCase) => {
      const pretty = prettyParams(input, expected)
      it(`should return ${pretty.output} for the input ${pretty.input} `, () => {
        expect(chunk.apply(null, input)).toEqual(expected)
      })
    })
  })

  describe('zip(input, n)', () => {
    const { zip } = second
    type ZipCase = TestCase<Array<string>, Array<number>, Array<[string, number]>>
    const testCases: ZipCase[] = [
      {
        input: [[a], [0]],
        expected: [[a, 0]]
      },
      {
        input: [[a, b, c], [1, 2, 3]],
        expected: [[a, 1], [b, 2], [c, 3]]
      },
      {
        input: [[a, b, c], [1]],
        expected: [[a, 1]]
      }
    ]
    testCases.forEach(({ input, expected }: ZipCase) => {
      const pretty = prettyParams(input, expected)
      it(`should return ${pretty.output} for the input ${pretty.input} `, () => {
        expect(zip.apply(null, input)).toEqual(expected)
      })
    })
  })
})
