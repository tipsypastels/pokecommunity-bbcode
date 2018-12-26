class SizeTag {
  render({ content, params }) {
    return `<font size="+${params}">${content}</font>`;
  }
}

module.exports = {
  name: 'size',
  tag: SizeTag,
};