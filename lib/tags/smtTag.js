const usergroup = require('../tagHelpers/usergroup');

const SmtTag = ({ content, params }) => {
  return usergroup(content, 'pr');
}

module.exports = {
  name: 'smt',
  tag: SmtTag,
};