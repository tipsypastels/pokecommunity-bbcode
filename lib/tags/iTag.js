const ITag = ({ content }) => {
  return `<em>${content}</em>`;
}

module.exports = {
  name: 'i',
  tag: ITag,
};