const { MongoClient } = require('mongodb')

const dbURL =
  'mongodb+srv://PurwaWiadnyana:2@dbwdnyana.gmzfj6d.mongodb.net/db_inigudang?retryWrites=true&w=majority'
const dbName = 'db_inigudang'

const dbConnection = async () => {
  try {
    const dbClient = await MongoClient.connect(dbURL)
    const database = dbClient.db(dbName)

    return { dbClient, database }
  } catch (err) {
    console.log(`Error connecting to the database ${err}`)
    throw err
  }
}

module.exports = { dbConnection }
