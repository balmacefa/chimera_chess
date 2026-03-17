const sharp = require('sharp');

sharp('src/app/icon.svg')
  .resize(180, 180)
  .png()
  .toFile('src/app/apple-icon.png')
  .then(() => console.log('apple-icon.png created'))
  .catch(err => console.error(err));