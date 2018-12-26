const { urlPattern } = require('../patterns');

const ImgTag = ({ content }) => {
  let url;
  
  if (content.match(urlPattern)) {
    url = content;
  } else {
    url = '';
  }
  
  return `<img src="${url}" />`;
}

module.exports = {
  name: 'img',
  tag: ImgTag,
};