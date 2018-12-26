const UTag = ({ content }) => {
  return `<span style="text-decoration: underline">${content}</span>`;
}

module.exports = {
  name: 'u',
  tag: UTag,
};