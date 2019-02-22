const usergroup = require('../tagHelpers/usergroup');

const DeveloperTag = ({ content, params }) => {
  return usergroup(content, 'developer');
}

module.exports = {
  name: 'developer',
  tag: DeveloperTag,
};