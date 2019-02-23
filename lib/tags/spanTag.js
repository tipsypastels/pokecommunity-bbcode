const SpanTag = ({ content, params }) => {
  return `<span style="${params}">${content}</span>`;
}

module.exports = {
  name: 'span',
  tag: SpanTag,
};