# TypeScript session two exercises

## Working with the exercises

The exercises are supplied as function stubs in `src/session_two.ts` which you are expected to fill in.

The function stubs are accompanied by tests in `test/session_two.tests.ts`. When a test set for a given function passes, an exercise has been completed.

### Running the tests
```bash
yarn install
yarn watch
```

### Working with the exercises

Open the `src/session_two.ts` in an editor with TypeScript support (a recent version of VS Code is highly recommended), fill in the behavior to the function stubs and run the test set.

*Note!* When doing an individual exercise, it is probably the most convenient to make sure only the tests for that exercise are being executed with `.only`. Try the following:

```
  describe('The Map type', () => {
    describe('get(a, key)', () => {
```

Change the signature to

```
  describe('The Map type', () => {
    describe.only('get(a, key)', () => {
```

As long as there are failing tests, just keep repeating the process. Enjoy!
