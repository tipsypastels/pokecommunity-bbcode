const usergroup = require('../tagHelpers/usergroup');

const BssTag = ({ content, params }) => {
  return usergroup(content, 'bss');
}

module.exports = {
  name: 'bss',
  tag: BssTag,
};