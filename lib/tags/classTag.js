const ClassTag = ({ content, params }) => {
  return `<div class="${params}">${content}</div>`;
}

module.exports = {
  name: 'class',
  tag: ClassTag,
};