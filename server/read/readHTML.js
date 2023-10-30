const fs = require('fs')

const ReadIndexHTML = (cb) => {
  fs.readFile('html/index.html', 'utf-8', (err, data) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, data)
    }
  })
}

module.exports = ReadIndexHTML
