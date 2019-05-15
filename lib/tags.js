const includeAliases = require('./aliases');

const usergroup = require('./tagHelpers/usergroup');

const {
  urlPattern,
  colorNamePattern,
  colorCodePattern,
  emailPattern,
  fontFacePattern,
  hexPattern,
} = require('./patterns');

const TAGS = {
  admin({ content, params }) {
    return usergroup(content, 'admin');
  },

  bbcode({ content }) {
    return content;
  },

  bss({ content, params }) {
    return usergroup(content, 'bss');
  },

  b({ content }) {
    return `<strong>${content}</strong>`
  },

  center({ content, params }) {
    return `<span style="text-align: center">${content}</span>`;
  },

  cimg({ content, params }) {
    let url;

    if (content.match(urlPattern)) {
      url = content;
    } else {
      url = '';
    }

    return `<img style="${params}" src="${url}" />`;
  },

  class({ content, params }) {
    return `<div class="${params}">${content}</div>`;
  },

  code({ content, params }) {
    if (params) {
      return `<pre><code class="${params}">${content}</code></pre>`;
    }

    return `<pre><code>${content}</code></pre>`;
  },

  color({ content, params }) {
    let color;
    
    if (params.match(hexPattern)) {
      color = `#${params}`;
    } else {
      color = params;
    }
    
    return `<span style="color: ${color};">${content}</span>`;
  },

  crystaltier({ content, params }) {
    return usergroup(content, 't3');
  },

  daily({ content, params }) {
    return usergroup(content, 'daily');
  },

  developer({ content, params }) {
    return usergroup(content, 'developer');
  },

  div({ content, params }) {
    return `<div style="${params}">${content}</div>`;
  },

  fangames({ content, params }) {
    return usergroup(content, 'fangames');
  },

  fa({ content, params }) {
    let group = params || 'fas';
    return `<i class="${group} fa-${content}"></i>`;
  },

  font({ content, params }) {
    return `<span style="font-family: ${params};">${content}</span>`;
  },

  highlight({ content, params }) {
    return `<span class="highlight">${content}</span>`;
  },

  iclass({ content, params }) {
    return `<span class="${params}">${content}</span>`;
  },

  img({ content }) {
    let url;

    if (content.match(urlPattern)) {
      url = content;
    } else {
      url = '';
    }

    return `<img src="${url}" />`;
  },

  indent({ content, params }) {
    return `<blockquote>${content}</blockquote>`;
  },

  i({ content }) {
    return `<em>${content}</em>`;
  },

  moderoid({ content, params }) {
    return usergroup(content, 'moderoid');
  },

  mod({ content }) {
    return usergroup(content, 'mod');
  },

  noparse({ content }) {
    return content;
  },

  owner({ content, params }) {
    return usergroup(content, 'owner');
  },

  pclogo() {
    return `<i class="icon-pokecommunity"></i>`;
  },

  platinumtier({ content, params }) {
    return usergroup(content, 't4');
  },

  // TODO react?
  progress({ content, params }) {
    let state = params || 0;

    return `<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="${state}" aria-valuemin="0" aria-valuemin="100" style="width: ${state}%;">${content}</div></div>`;
  },

  size({ content, params }) {
    return `<font size="+${params}">${content}</font>`;
  },

  smt({ content, params }) {
    return usergroup(content, 'pr');
  },

  span({ content, params }) {
    return `<span style="${params}">${content}</span>`;
  },

  s({ content }) {
    return `<span style="text-decoration: line-through;">${content}</span>`;
  },

  url({ content, params }) {
    let url;

    if (params.match(urlPattern)) {
      url = params;
    } else {
      url = '';
    }

    return `<a href="${url}">${content}</a>`;
  },

  u({ content }) {
    return `<span style="text-decoration: underline">${content}</span>`;
  },
};

TAGS.noparse.noParse = true;

module.exports = includeAliases(TAGS);