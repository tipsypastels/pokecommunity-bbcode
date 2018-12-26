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

tagTest('i', {
  bbcode: '[i]hello[/i]',
  html: '<em>hello</em>',
});

tagTest('fa (no param)', {
  bbcode: '[fa]gifts[/fa]',
  html: '<i class="fas fa-gifts"></i>',
});

tagTest('fa (with param)', {
  bbcode: '[fa=fab]twitter[/fa]',
  html: '<i class="fab fa-twitter"></i>',
});

// TODO these are the correct characters but uh
// not sure why we get the output like this :/
tagTest('noparse', {
  bbcode: '[noparse][b]yo[/b][/noparse]',
  html: '[b]yo&#91;/b&#93;',
});