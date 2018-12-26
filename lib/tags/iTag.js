class iTag {
  render({ content }) {
    return `<em>${content}</em>`;
  }
}

module.exports = {
  name: 'i',
  tag: iTag,
};