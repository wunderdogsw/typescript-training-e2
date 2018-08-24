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

    describe('union(a, b)', () => {
      const { union } = second
      type UnionCase = TestCase<TestMap, TestMap, TestMap>
      const testCases: UnionCase[] = [        {
          input: [{ a, b }, { c }],
          expected: {a, b, c}
        },
        {
          input: [{ a, b }, { a }],
          expected: { a, b }
        },
        {
          input: [{ a, b, c }, { a, b, c }],
          expected: { a, b, c }
        },
        {
          input: [{}, { a, b }],
          expected: {a, b}
        },
        {
          input: [{}, {}],
          expected: {}
        }
      ]
      testCases.forEach(({ input, expected }: UnionCase) => {
        const pretty = prettyParams(input, expected)
        it(`should return ${pretty.output} for the input ${pretty.input}, `, () => {
          expect(union.apply(null, input)).toEqual(expected)
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

  describe('intermingle(a, b)', () => {
    const { intermingle } = second
    type RepeatCase = TestCase<Array<string>, Array<number>, Array<string | number>>
    const testCases: RepeatCase[] = [
      {
        input: [[a], [0]],
        expected: [a, 0]
      },
      {
        input: [[a, b, c], [1, 2, 3]],
        expected: [a, 1, b, 2, c, 3]
      },
      {
        input: [[a, b, c], [1]],
        expected: [a, 1]
      }
    ]
    testCases.forEach(({ input, expected }: RepeatCase) => {
      const pretty = prettyParams(input, expected)
      it(`should return ${pretty.output} for the input ${pretty.input} `, () => {
        expect(intermingle.apply(null, input)).toEqual(expected)
      })
    })
  })

  describe('withTimestamp(value)', () => {
    const { withTimestamp } = second
    it('should return an identical object with "timestamp" field', () => {
      const value = { name: 'John Doe' }
      const timestamp = Date.now()
      expect(withTimestamp(value, timestamp)).toEqual({
        name: 'John Doe',
        timestamp,
      })
    })

    it('should not modify the original value', () => {
      const value = { name: 'John Doe' }
      expect(value).toEqual({ name: 'John Doe' })
    })
  })

  describe('keyLengths(value)', () => {
    const { keyLengths } = second

    it('should return an object with the field lengths of the original object', () => {
      const value = {
        foobar: '',
        bar: 5,
        buzz: new Date(),
      }
      expect(keyLengths(value)).toEqual({ foobar: 6, bar: 3, buzz: 4 })
    })
  })
})
