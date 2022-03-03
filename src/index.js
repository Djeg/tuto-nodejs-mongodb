import fastify from 'fastify'
import bookController from './controller/book-controller.js'
import dotenv from 'dotenv'
import dbPlugin from './plugins/db.js'
import fp from 'fastify-plugin'
import apiDocPlugin from './plugins/api-doc.js'
import bookModelPlugin from './models/book-model.js'

/**
 * On lit les variables d'environement du fichier
 * `.env`
 */
dotenv.config()

// Création de l'application fastify
const app = fastify({
  logger: process.env.VERBOSE === 'true',
})

// Enregistrement des plugins générale
app.register(fp(dbPlugin))
app.register(fp(apiDocPlugin))

// Enregistrement des models
app.register(fp(bookModelPlugin))

// Enregistrement des controller
app.register(bookController)

// On lance le serveur logique sur le port 4646
app.listen(process.env.PORT, process.env.HOST)
