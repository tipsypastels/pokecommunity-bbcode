const CenterTag = ({ content, params }) => {
  return `<span style="text-align: center">${content}</span>`;
}

module.exports = {
  name: 'center',
  tag: CenterTag,
};