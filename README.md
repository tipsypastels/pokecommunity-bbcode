# pokecommunity-bbcode

Code heavily based on [patorjk/Extendible-BBCode-Parser](https://github.com/patorjk/Extendible-BBCode-Parser).

## How to add tags

Create a file in `lib/tags` for your tag function. A basic file will look something like this.

```javascript
const BTag = ({ content }) => {
  return `<strong>${content}</strong>`;
}

module.exports = {
  name: 'b',
  tag: BTag,
};
```

The render function is passed an object of the form `{ params, content }`.

**Please add tests for your new tag! See the `tests` folder!**

## Tag settings

Before exporting your tag, you can define the following static properties to enable special settings.

- restrictChildrenTo - A list of BBCode tags which are allowed to be nested within this BBCode tag. If this property is omitted, any BBCode tag may be nested within the tag.

- restrictParentsTo - A list of BBCode tags which are allowed to be parents of this BBCode tag. If this property is omitted, any BBCode tag may be a parent of the tag.

- noParse - true or false. If true, none of the content WITHIN this tag will be parsed by the XBBCode parser.

An example:

```javascript
const NoParseTag = ({ content }) => content;
NoParseTag.noParse = true;

module.exports = {
  name: 'noparse',
  tag: NoParseTag,
};
```