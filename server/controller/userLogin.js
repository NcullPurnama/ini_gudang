const { dbConnection } = require('../db/connection')

const UserLogin = async (req, res) => {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', async () => {
    try {
      const userData = JSON.parse(body)
      const { username, password } = userData

      const { dbClient, database } = await dbConnection()
      const usersCollection = database.collection('users')

      if (!username || !password) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: 'Username dan Password harus diisi'
          })
        )
        return
      }

      const findUser = await usersCollection.findOne({ username, password })

      if (findUser) {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          Location: '/admin/dashboard'
        })
        res.end(JSON.stringify({ message: 'Login berhasil' }))
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: 'Login gagal silahkan cek Username atau Password'
          })
        )
      }

      dbClient.close()
    } catch (err) {
      console.error('Gagal melakukan login:', err)
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Data yang dikirim tidak valid' }))
    }
  })
}

module.exports = { UserLogin }
