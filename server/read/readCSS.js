const fs = require('fs')

const ReadCSS = (path, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/css'
  })

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('Error File CSS Not Found..')
    } else {
      res.write(data)
    }
    res.end()
  })
}

module.exports = ReadCSS
