const { process } = require('../lib/index');

function tagTest(name, { bbcode, html }) {
  return test(name, () => {
    return expect(process({ text: bbcode }).html).toBe(html);
  });
}

module.exports = tagTest;