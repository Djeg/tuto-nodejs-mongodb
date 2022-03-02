import fastify from 'fastify'
import mongo from 'mongodb'
import oas from 'fastify-oas'
import bookRoutes from './routes/book-routes.js'
import dotenv from 'dotenv'

/**
 * On lit les variables d'environement du fichier
 * `.env`
 */
dotenv.config()

/**
 * Definission d'un fonction de démarrage asynchrone
 */
async function start() {
  // Création de l'application fastify
  const app = fastify({
    logger: process.env.VERBOSE === 'true',
  })
  // On se connécte à notre cluster mongodb
  const client = await mongo.MongoClient.connect(process.env.MONGO_URL)
  // On obtient la base de données
  const db = client.db(process.env.MONGO_DATABASE)

  /**
   * Permet d'accéder à la base de données depuis
   * notre application en faisant : app.db
   */
  app.decorate('db', db)

  // On enregistre le plugin OAS nous permettant d'avoir une documentation
  // compléte de notre API
  app.register(oas, {
    /**
     * Définie la route pour accéder à la documentation
     */
    routePrefix: process.env.API_DOC_PATH,
    /**
     * Active ou désactive la documentation
     */
    exposeRoute: process.env.API_DOC === 'true',
    /**
     * Configure l'interface de documentation
     */
    swagger: {
      /**
       * Définie les info générales de notre api
       */
      info: {
        title: 'Book api',
        description: 'Api de livres',
      },
      /**
       * Définie ce que notre api recois comme format (consumes) et
       * ce qu'elle retourne comme format (produces)
       */
      consumes: ['application/json'],
      produces: ['application/json'],
      /**
       * Configure le server de notre api
       */
      servers: [
        {
          url: `http://${process.env.HOST}:${process.env.PORT}`,
          description: "Server de l'api",
        },
      ],
    },
  })

  // On enregistre le plugin des routes pour les livres
  app.register(bookRoutes)

  // On lance le serveur logique sur le port 4646
  app.listen(process.env.PORT, process.env.HOST)
}

start()
