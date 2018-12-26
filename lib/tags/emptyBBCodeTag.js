class EmptyBBCodeTag {
  render({ content }) {
    return content;
  }
}

module.exports = {
  name: 'bbcode',
  tag: EmptyBBCodeTag,
};