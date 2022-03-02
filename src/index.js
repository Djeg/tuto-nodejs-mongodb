import fastify from 'fastify'
import mongo from 'mongodb'
import oas from 'fastify-oas'
import bookRoutes from './routes/book-routes.js'

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
    routePrefix: '/documentation',
    /**
     * Active ou désactive la documentation
     */
    exposeRoute: true,
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
          url: 'http://0.0.0.0:4646',
          description: "Server de l'api",
        },
      ],
    },
  })

  // On enregistre le plugin des routes pour les livres
  app.register(bookRoutes)

  // On lance le serveur logique sur le port 4646
  app.listen(4646, '0.0.0.0')
}

start()
