exports.render = (colors, options) => {
  return [{ name: `${options.colors}-light`, colors: colors.light }, { name: `${options.colors}-dark`, colors: colors.dark }]
    .filter(colorSet => !!colorSet.colors)
    .map(colorSet => [
      renderInlinePreview(colorSet),
      renderFullPreview(colorSet),
    ])
    .reduce((acc, curr) => acc.concat(curr), []);
};

const renderInlinePreview = colorSet => {
  const width = 160;
  const height = 24;
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">

      <rect fill="${colorSet.colors.shade0}" x="0" y="0" width="160" height="24"></rect>

      <rect fill="${colorSet.colors.shade1}" x="8" y="13" width="18" height="3"></rect>
      <rect fill="${colorSet.colors.shade2}" x="29" y="13" width="18" height="3"></rect>
      <rect fill="${colorSet.colors.shade3}" x="50" y="13" width="18" height="3"></rect>
      <rect fill="${colorSet.colors.shade4}" x="71" y="13" width="18" height="3"></rect>
      <rect fill="${colorSet.colors.shade5}" x="92" y="13" width="18" height="3"></rect>
      <rect fill="${colorSet.colors.shade6}" x="113" y="13" width="18" height="3"></rect>
      <rect fill="${colorSet.colors.shade7}" x="134" y="13" width="18" height="3"></rect>

      <rect fill="${colorSet.colors.accent0}" x="8" y="8" width="11" height="3"></rect>
      <rect fill="${colorSet.colors.accent1}" x="27" y="8" width="11" height="3"></rect>
      <rect fill="${colorSet.colors.accent2}" x="46" y="8" width="11" height="3"></rect>
      <rect fill="${colorSet.colors.accent3}" x="65" y="8" width="11" height="3"></rect>
      <rect fill="${colorSet.colors.accent4}" x="84" y="8" width="11" height="3"></rect>
      <rect fill="${colorSet.colors.accent5}" x="103" y="8" width="11" height="3"></rect>
      <rect fill="${colorSet.colors.accent6}" x="122" y="8" width="11" height="3"></rect>
      <rect fill="${colorSet.colors.accent7}" x="141" y="8" width="11" height="3"></rect>

    </svg>
  `;
  return Promise.resolve({ name: `${colorSet.name}-inline.svg`, contents: Buffer.from(svgString, 'utf8') });
};

const renderFullPreview = colorSet => {
  const getCircles = () => {
    const offsetX = 51;
    const distX = 54;
    return [
      colorSet.colors.accent0,
      colorSet.colors.accent1,
      colorSet.colors.accent2,
      colorSet.colors.accent3,
      colorSet.colors.accent4,
      colorSet.colors.accent5,
      colorSet.colors.accent6,
      colorSet.colors.accent7,
    ].map((color, i) => `<circle fill="${color}" cx="${offsetX + distX * i}" cy="49" r="21"></circle>`);
  };
  const getStops = () => {
    return [
      colorSet.colors.shade7,
      colorSet.colors.shade6,
      colorSet.colors.shade5,
      colorSet.colors.shade4,
      colorSet.colors.shade3,
      colorSet.colors.shade2,
      colorSet.colors.shade1,
    ].map((color, i, arr) => `<stop stop-color="${color}" offset="${100 / (arr.length-1) * i}%"></stop>`);
  };
  const svgString = `
    <svg width="480px" height="160px" viewBox="0 0 480 160" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="shade-scale">
          ${getStops()}
        </linearGradient>
      </defs>
      <rect fill="${colorSet.colors.shade0}" x="0" y="0" width="480" height="160"></rect>
      ${getCircles()}
      <rect fill="url(#shade-scale)" x="30" y="86" width="420" height="42"></rect>
    </svg>
  `;
  return Promise.resolve({ name: `${colorSet.name}-full.svg`, contents: Buffer.from(svgString, 'utf8') });
};
