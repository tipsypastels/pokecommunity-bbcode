const STag = ({ content }) => {
  return `<span style="text-decoration: line-through;">${content}</span>`;
}

module.exports = {
  name: 's',
  tag: STag,
};