const HEX_REGEX = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

class ColorTag {
  render({ content, params }) {
    let color;

    if (params.match(HEX_REGEX)) {
      color = `#${params}`;
    } else {
      color = params;
    }

    return `<span style="color: ${color};">${content}</span>`;
  }
}

module.exports = {
  name: 'color',
  tag: ColorTag,
};