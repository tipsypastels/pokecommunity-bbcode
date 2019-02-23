const DivTag = ({ content, params }) => {
  return `<div style="${params}">${content}</div>`;
}

module.exports = {
  name: 'div',
  tag: DivTag,
};