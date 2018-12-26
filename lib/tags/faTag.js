class FaTag {
  render({ content, params }) {
    let group = params || 'fas';
    return `<i class="${group} fa-${content}"></i>`;
  }
}

module.exports = {
  name: 'fa',
  tag: FaTag,
};