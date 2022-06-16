const Chewy = require('./lib/lib');

Chewy.suite('suite', async () => {
    console.log('suite cb');
    Chewy.assertEq([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
    Chewy.test('test', () => {
        console.log('test cb');
    })
})

Chewy.suite('suite2', async () => {
    console.log('suite cb');
    Chewy.assertEq([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
    Chewy.test('test', () => {
        console.log('test cb');
    })
})