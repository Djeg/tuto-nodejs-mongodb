import {
  AuthorCollectionSchema,
  NewAuthorSchema,
  AuthorSchema,
} from '../schemas/author-schema.js'

/**
 * Définie ici toutes les routes pour les auteurs
 */
export default async function authorController(app) {
  const { AuthorModel } = app

  /**
   * Liste tout les auteurs
   */
  app.get(
    '/authors',
    {
      schema: {
        response: {
          200: AuthorCollectionSchema,
        },
      },
    },
    async () => {
      return AuthorModel.fetchAll()
    },
  )

  /**
   * Création de l'auteur
   */
  app.post(
    '/authors',
    {
      schema: {
        body: NewAuthorSchema,
        response: {
          200: AuthorSchema,
        },
      },
    },
    async request => {
      const result = await AuthorModel.insertOne(request.body)

      return AuthorModel.fetchOne(result.insertedId)
    },
  )
}
