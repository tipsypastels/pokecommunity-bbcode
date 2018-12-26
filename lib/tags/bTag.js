class BTag {
  render({ content }) {
    return `<strong>${content}</strong>`;
  }
}

module.exports = {
  name: 'b',
  tag: BTag,
};