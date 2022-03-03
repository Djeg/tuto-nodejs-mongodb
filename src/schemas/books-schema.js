import S from 'fluent-json-schema'

/**
 * Définition du schèma pour une mise à jour d'un livre
 */
export const UpdateBookSchema = S.object()
  .additionalProperties(false)
  .prop('title', S.string())
  .prop('description', S.string())
  .prop('price', S.number())

/**
 * Definition du schèma pour la création d'un livre
 */
export const NewBookSchema = S.object()
  .required(['title', 'description', 'price'])
  .extend(UpdateBookSchema)

/**
 * Définition du schèma d'un livre
 */
export const BookSchema = S.object()
  .prop('_id', S.string().required())
  .extend(NewBookSchema)

/**
 * Définition du schèma d'une collection de livre
 */
export const BookCollectionSchema = S.array().items(BookSchema)

/**
 * Définition des critères de recherche pour les livres
 */
export const BookSearchCriteria = S.object()
  .prop('limit', S.number())
  .prop('page', S.number())
  .prop('sort', S.string())
  .prop('direction', S.number())
  .prop('title', S.string())
