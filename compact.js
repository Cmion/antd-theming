const fs = require('fs')

try {
  // Use clean-css-cli to minify
  const light = fs.readFileSync('./stm-light.css', 'utf8');
  const dark = fs.readFileSync('./stm-dark.css', 'utf8');
  const content = `html[data-theme='light'] {
    ${light}
  }
  html[data-theme='dark'] {
    ${dark}
  }
  `
  fs.writeFileSync('./stm-compact.less', content)
} catch (err) {
  console.error(err)
}
