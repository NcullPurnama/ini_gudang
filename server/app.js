const http = require('http')
const url = require('url')

const Routes = require('./router/routes')
const { dbConnection } = require('./db/connection')

const { AddUser } = require('./controller/userRegis')
const { UserLogin } = require('./controller/userLogin')

const ReadHTML = require('./read/readHTML')

const port = 4000

const server = http.createServer(async (req, res) => {
  // router
  Routes(req, res)

  // router api dan frontend
  const url = req.url

  if (req.method === 'POST') {
    switch (url) {
      case '/api/register':
        AddUser(req, res)
        break

      case '/api/login':
        UserLogin(req, res)
        break
    }
  } else if (req.method === 'GET') {
    switch (url) {
      case '/admin/dashboard':
        ReadHTML(
          'html/dashboard.html',
          'css/style.css',
          'script/script.js',
          'Images/logo.png',
          res
        )
        break

      case '/admin/kwitansi':
        ReadHTML(
          'html/kwitansi.html',
          'css/style.css',
          'script/script.js',
          'Images/logo.png',
          res
        )
        break

      case '/admin/payment':
        ReadHTML(
          'html/payment.html',
          'css/style.css',
          'script/script.js',
          'Images/logo.png',
          res
        )
        break

      case '/admin/stock':
        ReadHTML(
          'html/stock.html',
          'css/style.css',
          'script/script.js',
          'Images/logo.png',
          res
        )
        break

      default:
        ReadHTML(
          'html/index.html',
          'css/style.css',
          'script/script.js',
          'Images/logo.png',
          res
        )
        break
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Endpoint tidak ditemukan')
  }

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
