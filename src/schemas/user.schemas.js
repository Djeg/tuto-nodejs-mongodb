import S from 'fluent-json-schema'

/**
 * Définie le schèma d'une mise à jour d'utilisateur
 */
export const UpdateUserSchema = S.object()
  .prop('email', S.string())
  .prop('password', S.string())

/**
 * Définie le schèma de creation d'un user
 */
export const NewUserSchema = S.object()
  .required(['email', 'password'])
  .extend(UpdateUserSchema)

/**
 * Définie le schèma d'un utilisateur dans la base de données
 */
export const UserSchema = S.object()
  .prop('_id', S.string().required())
  .extend(NewUserSchema)

/**
 * Collection d'utilisateur
 */
export const UserCollectionSchema = S.array().items(UserSchema)

/**
 * Schèma d'un token
 */
export const UserTokenSchema = S.object().prop('token', S.string().required())
