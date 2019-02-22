const usergroup = require('../tagHelpers/usergroup');

const CrystaltierTag = ({ content, params }) => {
  return usergroup(content, 't3');
}

module.exports = {
  name: 'crystaltier',
  tag: CrystaltierTag,
};