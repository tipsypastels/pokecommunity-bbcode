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

const funcName = `${capitalize(name)}Tag`
const fileContents = `
const ${funcName} = ({ content, params }) => {
  // Create the HTML output here
}

module.exports = {
  name: '${name}',
  tag: ${funcName},
};
`.trim();

fs.writeFile(`lib/tags/${name}Tag.js`, fileContents, err => {
  if (err) {
    return console.log(err)
  } 

  console.log(`Your tag was created! Find it in lib/tags/${name}Tag.js!`);
});