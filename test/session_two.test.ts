import * as second from '~/session_two'

const a = 'a',
  b = 'b',
  c = 'c'

function prettyObject(o: object): string {
  return`{ ${Object.keys(o).join(', ')} }`
}

function prettyParams(input: object[], expected: object) {
  const prettyInput = input
  .map(prettyObject)
  .join(', ')
  const prettyOutput = prettyObject(expected)
  return {
    input: prettyInput,
    output: prettyOutput
  }
}

describe('Session two', () => {
  type TestCase = {
    input: Array<object>
    expected: object
  }
  describe('The Map type', () => {
    describe('union(a, b)', () => {
      const { union } = second
      const testCases: TestCase[] = [
        {
          input: [{ a, b }, { c }],
          expected: { a, b, c }
        },
        {
          input: [{ a, b }, {}],
          expected: { a, b }
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
      testCases.forEach(({ input, expected }: TestCase) => {
        const pretty = prettyParams(input, expected)
        it(`should return ${pretty.output} for the input ${pretty.input}, `, () => {
          expect(union.apply(null, input)).toEqual(expected)
        })
      })
    })

    describe('intersection(a, b)', () => {
      const { intersection } = second
      const testCases: TestCase[] = [
        {
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
      testCases.forEach(({ input, expected }: TestCase) => {
        const pretty = prettyParams(input, expected)
        it(`should return ${pretty.output} for the input ${pretty.input}, `, () => {
          expect(intersection.apply(null, input)).toEqual(expected)
        })
      })
    })

    describe('difference(a, b)', () => {
      const { difference } = second
      const testCases: TestCase[] = [
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
      testCases.forEach(({ input, expected }: TestCase) => {
        const pretty = prettyParams(input, expected)
        it(`should return ${pretty.output} for the input ${pretty.input}, `, () => {
          expect(difference.apply(null, input)).toEqual(expected)
        })
      })
    })
  })
})
