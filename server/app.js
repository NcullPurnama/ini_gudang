const http = require('http')
const qs = require('querystring')

const Routes = require('./router/routes')

const port = 5000

const server = http.createServer(async (req, res) => {
  // memanggil router
  Routes(req, res)

  // database connection
})

// mencetak port and host
server.listen(port, (err) => {
  if (err) {
    console.log('Ada kesalahan saat menjalankan server...')
  } else {
    console.log(`Server berhasil dijalankan pada port ${port}`)
  }
})
