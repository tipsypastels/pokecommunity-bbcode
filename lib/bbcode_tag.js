class Tag {
  render({ content }) {
    return content;
  }
}

Tag = Object.assign(Tag, {
  restrictChildrenTo: [],
  restrictParentsTo: [],
  noParse: false,
});

module.exports = Tag;