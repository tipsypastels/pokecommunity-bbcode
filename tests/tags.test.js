/*
 * Before adding tests, check to see if there are any more specific
 * test files for this particular use case. For example, usergroup tags
 * have a seperate file with their own test helper.
 * 
 */

const { tagTest } = require('./testHelper');

tagTest('b', {
  bbcode: '[b]hello[/b]', 
  html: '<strong>hello</strong>',
});

tagTest('bbcode', {
  bbcode: '[bbcode]yo[/bbcode]',
  html: 'yo',
});

tagTest('center', {
  bbcode: '[center]of attention[/center]',
  html: '<span style="text-align: center">of attention</span>',
});

tagTest('cimg (real url)', {
  bbcode: '[cimg="width: 100%"]https://example.com/img.png[/cimg]',
  html: '<img style="width: 100%" src="https://example.com/img.png" />',
});

tagTest('cimg (fake url)', {
  bbcode: '[cimg=width: 100%]hello[/cimg]',
  html: '<img style="width: 100%" src="" />',
})

tagTest('class', {
  bbcode: '[class=red-text]red![/class]',
  html: '<div class="red-text">red!</div>',
})

tagTest('code (set language)', {
  bbcode: '[code=ruby]puts "yo!"[/code]',
  html: '<pre><code class="ruby">puts "yo!"</code></pre>',
});

tagTest('code (unset language)', {
  bbcode: '[code]die("PHP bad");[/code]',
  html: '<pre><code>die("PHP bad");</code></pre>',
});

tagTest('color (hex with hash)', {
  bbcode: '[color=#ff0000]red[/color]',
  html: '<span style="color: #ff0000;">red</span>',
});

tagTest('color (hex no hash)', {
  bbcode: '[color=ff0000]red[/color]',
  html: '<span style="color: #ff0000;">red</span>',
});

tagTest('color (word)', {
  bbcode: '[color=red]red[/color]',
  html: '<span style="color: red;">red</span>',
});

tagTest('div', {
  bbcode: '[div="color: red"]red![/div]',
  html: '<div style="color: red">red!</div>',
});

tagTest('highlight', {
  bbcode: '[highlight]highlight me[/highlight]',
  html: '<span class="highlight">highlight me</span>',
});

tagTest('i', {
  bbcode: '[i]hello[/i]',
  html: '<em>hello</em>',
});

tagTest('iclass', {
  bbcode: '[iclass=red-text]red![/iclass]',
  html: '<span class="red-text">red!</span>',
});

tagTest('img (real url)', {
  bbcode: '[img]https://example.com/img.png[/img]',
  html: '<img src="https://example.com/img.png" />',
});

tagTest('img (fake url)', {
  bbcode: '[img]hello[/img]',
  html: '<img src="" />',
});

tagTest('indent', {
  bbcode: '[indent]me[/indent]',
  html: '<blockquote>me</blockquote>',
});

tagTest('fa (no param)', {
  bbcode: '[fa]gifts[/fa]',
  html: '<i class="fas fa-gifts"></i>',
});

tagTest('fa (with param)', {
  bbcode: '[fa=fab]twitter[/fa]',
  html: '<i class="fab fa-twitter"></i>',
});

tagTest('font', {
  bbcode: '[font=courier]robot[/font]',
  html: '<span style="font-family: courier;">robot</span>',
})

// TODO these are the correct characters but uh
// not sure why we get the output like this :/
tagTest('noparse', {
  bbcode: '[noparse][b]yo[/b][/noparse]',
  html: '[b]yo&#91;/b&#93;',
});

tagTest('progress (set value)', {
  bbcode: '[progress=2]A bar[/progress]',
  html: '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemin="100" style="width: 2%;">A bar</div></div>',
});

tagTest('progress (no value)', {
  bbcode: '[progress]A bar[/progress]',
  html: '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemin="100" style="width: 0%;">A bar</div></div>',
});

tagTest('s', {
  bbcode: '[s]strike[/s]',
  html: '<span style="text-decoration: line-through;">strike</span>',
});

tagTest('size', {
  bbcode: '[size=2]BIG[/size]',
  html: '<font size="+2">BIG</font>',
});

tagTest('span', {
  bbcode: '[span="color: red"]red![/span]',
  html: '<span style="color: red">red!</span>',
});

tagTest('url', {
  bbcode: '[url="https://example.com"]x[/url]',
  html: '<a href="https://example.com">x</a>',
});