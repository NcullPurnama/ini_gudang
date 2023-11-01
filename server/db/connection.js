const { MongoClient } = require('mongodb')

const dbURL =
  'mongodb+srv://viddyvirstandi28:ViddyPurnama02@viddy.dk1bmjv.mongodb.net/db_inigudang?retryWrites=true&w=majority'
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
