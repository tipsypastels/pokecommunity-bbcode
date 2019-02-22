const HighlightTag = ({ content, params }) => {
  return `<span class="highlight">${content}</span>`;
}

module.exports = {
  name: 'highlight',
  tag: HighlightTag,
};