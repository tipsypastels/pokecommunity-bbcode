const usergroup = require('../tagHelpers/usergroup');

const PlatinumtierTag = ({ content, params }) => {
  return usergroup(content, 't4');
}

module.exports = {
  name: 'platinumtier',
  tag: PlatinumtierTag,
};