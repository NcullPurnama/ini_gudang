const http = require('http')
const qs = require('querystring')

const Routes = require('./router/routes')
const dbConnection = require('./db/connection')

const port = 5000

const server = http.createServer(async (req, res) => {
  // memanggil router
  Routes(req, res)

  // database connection
  try {
    const { dbClient, database } = await dbConnection()

    console.log('Database Connected..')

    const tabel = await database.listCollections().toArray()
    console.log('Tabel:', tabel)

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
