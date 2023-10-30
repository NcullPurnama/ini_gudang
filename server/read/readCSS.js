const fs = require('fs')

const ReadStyleCSS = (cb) => {
  fs.readFile('css/style.css', 'utf-8', (err, data) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, data)
    }
  })
}

module.exports = ReadStyleCSS
