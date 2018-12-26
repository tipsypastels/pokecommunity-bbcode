const tagTest = require('./testHelper');

tagTest('b', {
  bbcode: '[b]hello[/b]', 
  html: '<strong>hello</strong>',
});

tagTest('bbcode', {
  bbcode: '[bbcode]yo[/bbcode]',
  html: 'yo',
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

tagTest('i', {
  bbcode: '[i]hello[/i]',
  html: '<em>hello</em>',
});

tagTest('img (real url)', {
  bbcode: '[img]https://example.com/img.png[/img]',
  html: '<img src="https://example.com/img.png" />',
});

tagTest('img (fake url)', {
  bbcode: '[img]hello[/img]',
  html: '<img src="" />',
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

tagTest('size', {
  bbcode: '[size=2]BIG[/size]',
  html: '<font size="+2">BIG</font>',
})