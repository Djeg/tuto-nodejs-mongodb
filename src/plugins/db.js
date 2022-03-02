import mongo from 'mongodb'

/**
 * Configure une connection à la base de données
 */
export default async function dbPlugin(app) {
  // On se connécte à notre cluster mongodb
  const client = await mongo.MongoClient.connect(process.env.MONGO_URL)

  // On obtient la base de données
  const db = client.db(process.env.MONGO_DATABASE)

  app.decorate('db', db)
}
