const CodeTag = ({ content, params }) => {
  if (params) {
    return `<pre><code class="${params}">${content}</code></pre>`;
  }

  return `<pre><code>${content}</code></pre>`;
}

module.exports = {
  name: 'code',
  tag: CodeTag,
};