# pokecommunity-bbcode

Code heavily based on [patorjk/Extendible-BBCode-Parser](https://github.com/patorjk/Extendible-BBCode-Parser).

## How to add tags

Create a file in `lib/tags` for your tag class. A basic file will look something like this.

```javascript
const { Tag, registerTag } = require('../index');

class BTag extends Tag {
  render({ content }) {
    return `<strong>${content}</strong>`;
  }
}

registerTag('b', BTag);
```

The render function is passed an object of the form `{ params, content }`.

## Tag settings

Before registering your tag, you can use the `setContext` static method to define some special properties. Those are.

- restrictChildrenTo - A list of BBCode tags which are allowed to be nested within this BBCode tag. If this property is omitted, any BBCode tag may be nested within the tag.

- restrictParentsTo - A list of BBCode tags which are allowed to be parents of this BBCode tag. If this property is omitted, any BBCode tag may be a parent of the tag.

- noParse - true or false. If true, none of the content WITHIN this tag will be parsed by the XBBCode parser.

An example:

```javascript
const { Tag, registerTag } = require('./index');

class NoParseTag extends Tag {
  render({ content }) {
    return content;
  }
}

NoParseTag.setContext({
  noParse: true,
});

registerTag('noparse', NoParseTag);
```