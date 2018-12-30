const { urlPattern } = require('../patterns');

const UrlTag = ({ content, params }) => {
  let url;

  if (params.match(urlPattern)) {
    url = params;
  } else {
    url = '';
  }

  return `<a href="${url}">${content}</a>`;
}

module.exports = {
  name: 'url',
  tag: UrlTag,
};