const http = require('http')
const url = require('url')

const { AddUser } = require('./controller/userRegis')
const { dbConnection } = require('./db/connection')
const { ReadHTML } = require('./read/readHTML')

const port = 5000

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true)

  // Set CORS headers to allow requests from any origin (you may want to restrict this in production)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    // Pre-flight request, respond with 200 OK
    res.writeHead(200)
    res.end()
    return
  }

  // Handle API endpoint for user registration
  if (parsedUrl.pathname === '/api/register' && req.method === 'POST') {
    try {
      // Ensure the request body is properly parsed and handled
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', async () => {
        const userData = JSON.parse(body)
        await AddUser(userData, res)
      })
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          error: 'Terjadi kesalahan dalam pendaftaran pengguna.'
        })
      )
    }
  } else if (parsedUrl.pathname === '/' && req.method === 'GET') {
    // Handle the root URL by rendering login.html
    ReadHTML(
      'html/login.html',
      'css/style.css',
      'script/script.js',
      'Images/logo.png',
      res
    )
  } else if (parsedUrl.pathname.startsWith('/admin/') && req.method === 'GET') {
    // Handle other HTML routes based on the path (e.g., /admin/dashboard)
    const route = parsedUrl.pathname.slice(1) // remove the leading slash
    ReadHTML(
      `html/${route}.html`,
      'css/style.css',
      'script/script.js',
      'Images/logo.png',
      res
    )
  } else {
    // Respond with a 404 error for unrecognized routes
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Endpoint tidak ditemukan')
  }
})

// Open the database connection once when the server starts
dbConnection()
  .then((dbClient) => {
    console.log('Database Connected..')

    // Start listening on the specified port
    server.listen(port, (err) => {
      if (err) {
        console.error('Ada kesalahan saat menjalankan server...')
      } else {
        console.log(`Server berhasil dijalankan pada port ${port}`)
      }
    })
  })
  .catch((err) => {
    console.error(`Ada masalah saat mengkoneksikan Database ${err}`)
  })
