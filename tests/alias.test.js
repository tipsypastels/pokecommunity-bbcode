const tagTest = require('./testHelper');

// all aliases work exactly the same so we really only need one test
// just make sure you're testing the original versions etc
tagTest('strong', {
  bbcode: '[strong]hi[/strong]',
  html: '<strong>hi</strong>',
});