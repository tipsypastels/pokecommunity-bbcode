module.exports = function(content, klass) {
  return `<span class="usergroup usergroup-${klass}">${content}</span>`;
};