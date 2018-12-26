const NoParseTag = ({ content }) => content;
NoParseTag.noParse = true;

module.exports = {
  name: 'noparse',
  tag: NoParseTag,
};