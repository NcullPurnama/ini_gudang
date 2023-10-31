const http = require('http')
const url = require('url')

const Routes = require('./router/routes')
const { dbConnection } = require('./db/connection')

const { AddUser } = require('./controller/userRegis')

const port = 5000

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true)

  // router api
  if (parsedUrl.pathname === '/api/register' && req.method === 'POST') {
    AddUser(req, res)
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Endpoint tidak ditemukan')
  }

  // router html dan url backend
  Routes(req, res)

  // database connection
  try {
    const { dbClient } = await dbConnection()

    console.log('Database Connected..')

    dbClient.close()
  } catch (err) {
    console.log(`Ada masalah saat mengkoneksikan Database ${err}`)
  }
})

// mencetak port and host
server.listen(port, (err) => {
  if (err) {
    console.log('Ada kesalahan saat menjalankan server...')
  } else {
    console.log(`Server berhasil dijalankan pada port ${port}`)
  }
})
