const FontTag = ({ content, params }) => {
  return `<span style="font-family: ${params};">${content}</span>`;
}

module.exports = {
  name: 'font',
  tag: FontTag,
};