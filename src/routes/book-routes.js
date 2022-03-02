import {
  UpdateBookSchema,
  BookSchema,
  BookCollectionSchema,
  NewBookSchema,
} from '../schemas/books-schema.js'
import mongo from 'mongodb'

/**
 * Un plugin fastify est une fonction asynchrone qui recois l'application
 * en premier paramètre et des options en second paramètre
 */
export default async function bookRoutes(app) {
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
      const livres = await app.db.collection('books').find().toArray()

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
      const livre = await app.db.collection('books').findOne({
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

      const result = await app.db.collection('books').insertOne(body)

      const livre = await app.db.collection('books').findOne({
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

      await app.db
        .collection('books')
        .updateOne({ _id: mongo.ObjectId(request.params.id) }, { $set: body })

      const livre = await app.db.collection('books').findOne({
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
      const livre = await app.db.collection('books').findOne({
        _id: mongo.ObjectId(request.params.id),
      })

      await app.db.collection('books').deleteOne({
        _id: mongo.ObjectId(request.params.id),
      })

      return livre
    },
  )
}
