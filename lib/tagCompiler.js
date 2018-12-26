const fs   = require('fs');
const path = require('path');

const tags = {};
const tagsFolder = path.join(__dirname, 'tags');

fs.readdirSync(tagsFolder).forEach(file => {
  let { name, tag } = require(`./tags/${file}`);
  tags[name] = tag;
});

module.exports = tags;