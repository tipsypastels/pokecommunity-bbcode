const { argv } = process;

if (argv.length <= 2) {
  throw "A name is required to generate a tag.";
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const fs = require('fs');
const name = argv[argv.length - 1].toLowerCase();

if (fs.existsSync(`lib/tags/${name}Tag.js`)) {
  throw "A file for this tag is already present.";
}

const klassName = `${capitalize(name)}Tag`
const fileContents = `
class ${klassName} {
  render({ content, params }) {
    // Put your return statement here! You must return the full HTML content.
  }
}

module.exports = {
  name: '${name}',
  tag: ${klassName},
};
`.trim();

fs.writeFile(`lib/tags/${name}Tag.js`, fileContents, err => {
  if (err) {
    return console.log(err)
  } 

  console.log(`Your tag was created! Find it in lib/tags/${name}Tag.js!`);
});