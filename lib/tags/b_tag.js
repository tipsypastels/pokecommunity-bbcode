const { Tag, registerTag } = require('../index');

class BTag extends Tag {
  render({ content }) {
    return `<strong>${content}</strong>`;
  }
}

registerTag('b', BTag);