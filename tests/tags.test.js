const { process } = require('../lib/index');

function expectBB(bbcode, html) {
  return expect(process({ text: bbcode }).html).toBe(html);
}

test('[b]', () => {
  let bbcode = '[b]hello[/b]';
  let html   = '<strong>hello</strong>';
  
  expectBB(bbcode, html);
});

test('[bbcode]', () => {
  let bbcode = '[bbcode]yo[/bbcode]';
  let html   = 'yo';

  expectBB(bbcode, html);
})