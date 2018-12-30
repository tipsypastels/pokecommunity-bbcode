const XBBCODE = require('../lib/index');

let someValue = 0;

XBBCODE.addHook('b', () => {
  someValue = 1;
});

// called for side effects
XBBCODE.process({ text: '[b]yo[/b]' });

test('the value should have changed when the hook was called', () => {
  expect(someValue).toBe(1);
});