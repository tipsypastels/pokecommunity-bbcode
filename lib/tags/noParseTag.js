class NoParseTag {
  render({ content }) {
    return content;
  }
}

NoParseTag.noParse = true;

module.exports = {
  name: 'noparse',
  tag: NoParseTag,
};