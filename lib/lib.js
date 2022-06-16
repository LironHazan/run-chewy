const assert = require("node:assert");

const isAsync = (fn) => fn.constructor.name === 'AsyncFunction'; // https://github.com/tc39/proposal-async-await/issues/78#issuecomment-164408675
const noop = () => {};
const group = (description, handler) => {
    console.log(`Running: [ ${description} ]`);
    if (isAsync(handler)) {
        return handler().then(noop)
            .catch((err) => {
                console.error(err)
            });
    }
    handler();
}

/**
 * Example:
 *
 * Chewy.suite('suite', async () => {
 *     console.log('suite cb');
 *     Chewy.assertEq([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
 *     Chewy.test('test', () => {
 *         console.log('test cb');
 *     })
 * })
 */

class Chewy {
    static suite = group;
    static test = group;
    static x = Chewy; //todo implement skip
    static assertEq = (actual, expected) => assert.strict.deepEqual(actual, expected);
}

module.exports = Chewy;