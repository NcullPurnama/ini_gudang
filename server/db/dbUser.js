const dbConnection = require('./connection')

const dbUser = async () => {
  try {
    const { dbClient, database } = await dbConnection()

    const tbName = 'users '
    const tabel = database.collection(tbName)

    const tbExist = await database.listCollections({ name: tabel }).toArray()

    if (tbExist.length === 0) {
      const newData = { nama, username, password }

      await tabel.insertMany(newData)

      console.log(`Nama Tabel baru berhasil dibuat ${tbName}`)
    } else {
      console.log(`Nama Tabel sudah tersedia ${tbName}`)
    }

    dbClient.close()
  } catch (err) {
    console.error(err)
  }
}

dbUser()
