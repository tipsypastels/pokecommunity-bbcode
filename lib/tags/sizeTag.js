const SizeTag = ({ content, params }) => {
  return `<font size="+${params}">${content}</font>`;
}

module.exports = {
  name: 'size',
  tag: SizeTag,
};