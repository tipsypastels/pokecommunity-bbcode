const usergroup = require('../tagHelpers/usergroup');

const DailyTag = ({ content, params }) => {
  return usergroup(content, 'daily');
}

module.exports = {
  name: 'daily',
  tag: DailyTag,
};