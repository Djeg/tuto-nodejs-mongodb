import {
  UpdateBookSchema,
  BookSchema,
  BookCollectionSchema,
  NewBookSchema,
  BookSearchCriteria,
} from '../schemas/books-schema.js'
import mongo from 'mongodb'

/**
 * Un plugin fastify est une fonction asynchrone qui recois l'application
 * en premier paramètre et des options en second paramètre
 */
export default async function bookController(app) {
  const BookModel = app.BookModel

  // EXO 1
  // Création d'une route qui récupére tout les livres
  app.get(
    '/books',
    {
      schema: {
        response: {
          200: BookCollectionSchema,
        },
        querystring: BookSearchCriteria,
      },
    },
    async request => {
      // On s'assure que l'utilisateur soit authentifié:
      await request.jwtVerify()

      return BookModel.fetchAll(request.query)
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
      // On retourne le livre
      return BookModel.fetchOneById(request.params.id)
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

      const result = await BookModel.insertOne(body)

      const livre = await BookModel.fetchOneById(result.insertedId)

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

      await BookModel.updateOneById(request.params.id, body)

      const livre = await BookModel.fetchOneById(request.params.id)

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
      const livre = await BookModel.fetchOneById(request.params.id)

      await BookModel.deleteOne(request.params.id)

      return livre
    },
  )
}
