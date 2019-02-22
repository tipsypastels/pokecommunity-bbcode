const usergroup = require('../tagHelpers/usergroup');

const AdminTag = ({ content, params }) => {
  return usergroup(content, 'admin');
}

module.exports = {
  name: 'admin',
  tag: AdminTag,
};