const usergroup = require('../tagHelpers/usergroup');

const ModTag = ({ content }) => {
  return usergroup(content, 'mod');
}

module.exports = {
  name: 'mod',
  tag: ModTag,
};