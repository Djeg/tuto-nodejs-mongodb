import fastify from 'fastify'
import mongo from 'mongodb'
import oas from 'fastify-oas'
import {
  UpdateBookSchema,
  BookSchema,
  BookCollectionSchema,
  NewBookSchema,
} from './schemas/books-schema.js'

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

  // EXO 1
  // Création d'une route qui récupére tout les livres
  app.get(
    '/books',
    {
      schema: {
        response: {
          200: BookCollectionSchema,
        },
      },
    },
    async () => {
      // Récupération de plusieurs livre. Cette instruction
      // nous retourne un tableaux de livre (un objet avec
      // tout les champs du livre)
      const livres = await db.collection('books').find().toArray()

      return livres
    },
  )

  // EXO 2
  // Création d'une route qui récupére un seul livre
  app.get(
    '/books/:id',
    {
      schema: {
        response: {
          200: BookSchema,
        },
      },
    },
    async request => {
      // On demande à un récupérer un seul livre
      const livre = await db.collection('books').findOne({
        // On récupére le livre par son ID. Attention
        // à bien envoyé l'identifiant dans la fonction
        // mongo.ObjectId
        _id: mongo.ObjectId(request.params.id),
      })

      // On retourne le livre
      return livre
    },
  )

  // EXO 3
  // Création d'une route pour créer un nouveau livre
  app.post(
    '/books',
    {
      schema: {
        body: NewBookSchema,
        response: {
          200: BookSchema,
        },
      },
    },
    async request => {
      const body = request.body

      const result = await db.collection('books').insertOne(body)

      const livre = await db.collection('books').findOne({
        _id: mongo.ObjectId(result.insertedId),
      })

      return livre
    },
  )

  // EXO 4
  // Création d'une route pour modifier un livre
  app.patch(
    '/books/:id',
    {
      schema: {
        body: UpdateBookSchema,
        response: {
          200: BookSchema,
        },
      },
    },
    async request => {
      const body = request.body

      await db
        .collection('books')
        .updateOne({ _id: mongo.ObjectId(request.params.id) }, { $set: body })

      const livre = await db.collection('books').findOne({
        _id: mongo.ObjectId(request.params.id),
      })

      return livre
    },
  )

  // EXO 5
  // Création d'une route pour supprimer un livre
  app.delete(
    '/books/:id',
    {
      schema: {
        response: {
          200: BookSchema,
        },
      },
    },
    async request => {
      const livre = await db.collection('books').findOne({
        _id: mongo.ObjectId(request.params.id),
      })

      await db.collection('books').deleteOne({
        _id: mongo.ObjectId(request.params.id),
      })

      return livre
    },
  )

  // On lance le serveur logique sur le port 4646
  app.listen(4646, '0.0.0.0')
}

start()
