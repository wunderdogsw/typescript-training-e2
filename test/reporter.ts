type Maybe<T> = jest.Maybe<T>
type Test = jest.Test
type TestResult = jest.TestResult
type AggregatedResult = jest.AggregatedResult
type ReporterOnStartOptions = jest.ReporterOnStartOptions
type Context = jest.Context

function reportFailed(result: TestResult) {
    console.log(`Test failed: ${result.failureMessage}`)
}

export default class Reporter implements jest.Reporter {
    onTestResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult): void {

    }
    onRunStart(results: AggregatedResult, options: ReporterOnStartOptions): void {

    }
    onTestStart(test: Test): void {

    }
    onRunComplete(contexts: Set<Context>, results: AggregatedResult): Maybe<Promise<void>> {
        for (const result of results.testResults) {
            if (result.failureMessage) {
                reportFailed(result)
            }
        }
    }
    getLastError(): Maybe<Error> {

    }
}
