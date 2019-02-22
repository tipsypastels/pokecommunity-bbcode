const { process } = require('../lib/index');

function tagTest(name, { bbcode, html }) {
  return test(name, () => {
    return expect(process({ text: bbcode }).html).toBe(html);
  });
}

function usergroupTest(group, className = group) {
  return tagTest(group, {
    bbcode: `[${group}]username[/${group}]`,
    html: `<span class="usergroup usergroup-${className}">username</span>`,
  });
}

function usergroupTestAll(...groups) {
  groups.forEach(group => {
    usergroupTest(group);
  });
}

module.exports = { tagTest, usergroupTest, usergroupTestAll };