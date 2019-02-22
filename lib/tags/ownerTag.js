const usergroup = require('../tagHelpers/usergroup');

const OwnerTag = ({ content, params }) => {
  return usergroup(content, 'owner');
}

module.exports = {
  name: 'owner',
  tag: OwnerTag,
};