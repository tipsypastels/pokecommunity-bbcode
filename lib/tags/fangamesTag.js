const usergroup = require('../tagHelpers/usergroup');

const FangamesTag = ({ content, params }) => {
  return usergroup(content, 'fangames');
}

module.exports = {
  name: 'fangames',
  tag: FangamesTag,
};