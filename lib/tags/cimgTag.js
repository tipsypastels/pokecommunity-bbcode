const { urlPattern } = require('../patterns');

const CimgTag = ({ content, params }) => {
  let url;

  if (content.match(urlPattern)) {
    url = content;
  } else {
    url = '';
  }

  return `<img style="${params}" src="${url}" />`;
}

module.exports = {
  name: 'cimg',
  tag: CimgTag,
};