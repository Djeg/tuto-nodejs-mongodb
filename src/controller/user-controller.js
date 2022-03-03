import {
  UserCollectionSchema,
  NewUserSchema,
  UserSchema,
  UserTokenSchema,
} from '../schemas/user.schemas.js'

/**
 * Contient toutes les routes des utilisateurs
 */
export default async function userController(app) {
  const { UserModel } = app

  /**
   * Liste tout les utilisateurs
   */
  app.get(
    '/users',
    {
      schema: {
        response: {
          200: UserCollectionSchema,
        },
      },
    },
    UserModel.fetchAll,
  )

  /**
   * Créé un nouvel utilisateur
   */
  app.post(
    '/users',
    {
      schema: {
        body: NewUserSchema,
        response: {
          200: UserSchema,
        },
      },
    },
    async request => {
      const { insertedId } = await UserModel.register(request.body)

      return UserModel.fetchOne(insertedId)
    },
  )

  /**
   * Génére un token JWT
   */
  app.post(
    '/users/token',
    {
      schema: {
        body: NewUserSchema,
        response: {
          200: UserTokenSchema,
        },
      },
    },
    async request => {
      // On récupére le user
      const user = await UserModel.login(request.body)

      // Créer le JWT
      return {
        token: app.jwt.sign(user),
      }
    },
  )
}
