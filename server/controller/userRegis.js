const { dbConnection } = require('../db/connection')

const AddUser = async (req, res) => {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', async () => {
    try {
      const userData = JSON.parse(body)
      const { email, username, password } = userData

      const { dbClient, database } = await dbConnection()
      const tabel = database.collection('users')

      if (!email || !username || !password) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: 'Email, username, dan password harus diisi'
          })
        )
        return
      }

      const userExist = await tabel.findOne({ email })

      if (userExist) {
        res.writeHead(409, { 'Content-Type': 'application/json' })
        res.end(`Email ${email} sudah terdaftar`)
        return
      }

      const result = await tabel.insertOne(userData)

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          message: 'Pengguna berhasil terdaftar',
          IdUser: result.insertedId
        })
      )

      dbClient.close()
    } catch (err) {
      console.error('Gagal mendaftarkan pengguna:', err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Gagal mendaftarkan pengguna' }))
    }
  })
}

module.exports = { AddUser }
