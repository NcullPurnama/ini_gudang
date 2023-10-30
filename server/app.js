const http = require('http')
const url = require('node:url')
const qs = require('querystring')

const ReadIndexHTML = require('./read/readHTML')

const port = 8000

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  ReadIndexHTML((err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('Error file HTML not Found..')
    } else {
      res.write(data)
    }

    res.end()
  })
})

// mencetak port and host
server.listen(port, (err) => {
  if (err) {
    console.log('Ada kesalahan saat menjalankan server...')
  } else {
    console.log(`Server berhasil dijalankan pada port ${port}`)
  }
})
