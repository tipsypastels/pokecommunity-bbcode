const IndentTag = ({ content, params }) => {
  return `<blockquote>${content}</blockquote>`;
}

module.exports = {
  name: 'indent',
  tag: IndentTag,
};