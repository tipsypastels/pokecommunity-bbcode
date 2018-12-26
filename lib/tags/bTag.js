const BTag = ({ content }) => {
  return `<strong>${content}</strong>`
}

module.exports = {
  name: 'b',
  tag: BTag,
};