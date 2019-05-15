const ALIASES = {
  'em':         'i',
  'strong':     'b',
  'colour':     'color',
  'centre':     'center',
  
  'php':        'code',
  
  'staffadmin': 'admin',
  'dev':        'developer',
  'moderator':  'mod',
  
  'silvertier': 'crystaltier',
  'goldtier':   'crystaltier',
  'supporter':  'crystaltier',

  'cd':         'div',
  'x':          'div',
  'css-div':    'div',
  
  'css-span':   'span',
  
  'cssc':       'class',
  'spanclass':  'iclass',
};

module.exports = function includeAliases(TAGS) {
  const aliasMap = {};

  Object.keys(ALIASES).forEach(alias => {
    let aliasTo = ALIASES[alias];
    aliasMap[alias] = TAGS[aliasTo];
  });

  return Object.assign({}, TAGS, aliasMap);
}