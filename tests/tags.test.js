const { process } = require('../lib/index');

function tagTest(name, { bbcode, html }) {
  return test(name, () => {
    return expect(process({ text: bbcode }).html).toBe(html);
  });
}

tagTest('b', {
  bbcode: '[b]hello[/b]', 
  html: '<strong>hello</strong>',
});

tagTest('bbcode', {
  bbcode: '[bbcode]yo[/bbcode]',
  html: 'yo',
});

// TODO these are the correct characters but uh
// not sure why we get the output like this :/
tagTest('noparse', {
  bbcode: '[noparse][b]yo[/b][/noparse]',
  html: '[b]yo&#91;/b&#93;',
});