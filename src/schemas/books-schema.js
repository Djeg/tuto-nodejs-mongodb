import S from 'fluent-json-schema'

/**
 * Définition du schèma pour un nouveau livre
 */
export const NewBookSchema = S.object()
  .additionalProperties(false)
  .prop('title', S.string().required())
  .prop('description', S.string().required())
  .prop('price', S.number().required())

/**
 * Définition du schèma d'un livre
 */
export const BookSchema = S.object()
  .prop('_id', S.string().required())
  .extend(NewBookSchema)
