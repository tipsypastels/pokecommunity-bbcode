const IclassTag = ({ content, params }) => {
  return `<span class="${params}">${content}</span>`;
}

module.exports = {
  name: 'iclass',
  tag: IclassTag,
};