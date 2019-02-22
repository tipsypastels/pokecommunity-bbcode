const usergroup = require('../tagHelpers/usergroup');

const ModeroidTag = ({ content, params }) => {
  return usergroup(content, 'moderoid');
}

module.exports = {
  name: 'moderoid',
  tag: ModeroidTag,
};