import S from 'fluent-json-schema'

/**
 * Définie la mise à jour d'un auteur
 */
export const UpdateAuthorSchema = S.object()
  .prop('name', S.string())
  .prop('bookIds', S.array().items(S.string()))

/**
 * Définie un schèma pour la création d'un auteur
 */
export const NewAuthorSchema = S.object()
  .required(['name'])
  .extend(UpdateAuthorSchema)

/**
 * Définie le schèma d'un auteur dans la base de données
 */
export const AuthorSchema = S.object()
  .required(['name', '_id'])
  .prop('_id', S.string())
  .extend(NewAuthorSchema)

/**
 * Définie une collection d'auteur
 */
export const AuthorCollectionSchema = S.array().items(AuthorSchema)
