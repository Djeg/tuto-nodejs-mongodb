import fastify from 'fastify'
import mongo from 'mongodb'

/**
 * Definission d'un fonction de démarrage asynchrone
 */
async function start() {
  // Création de l'application fastify
  const app = fastify({ logger: true })
  // On se connécte à notre cluster mongodb
  const client = await mongo.MongoClient.connect(
    'mongodb+srv://tutomongo:tutomongo@cluster0.kwadp.mongodb.net',
  )
  // On obtient la base de données
  const db = client.db('test')

  // On lance le serveur logique sur le port 4646
  app.listen(4646, '0.0.0.0')
}

start()
