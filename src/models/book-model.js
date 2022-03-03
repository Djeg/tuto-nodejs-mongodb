import mongo from 'mongodb'

/**
 * Configure les fonction du model pour les livres
 */
export default async function bookModelPlugin(app) {
  const collection = app.db.collection('books')

  /**
   * Vas chercher tout les livres
   */
  async function fetchAll({
    limit = parseInt(process.env.DEFAULT_LIMIT),
    page = 1,
    sort = '_id',
    direction = -1,
    title = undefined,
  }) {
    const findCriterias = {}

    if (title) {
      findCriterias.title = new RegExp(title)
    }

    return collection
      .find(findCriterias)
      .sort({ [sort]: direction })
      .limit(limit)
      .skip(limit * (page - 1))
      .toArray()
  }

  /**
   * Récupére un seul livre
   */
  async function fetchOneById(id) {
    return collection.findOne({
      _id: mongo.ObjectId(id),
    })
  }

  /**
   * Insére un nouveau livre
   */
  async function insertOne(book) {
    return collection.insertOne(book)
  }

  /**
   * Met à jour un livre
   */
  async function updateOneById(id, update) {
    return collection.updateOne({ _id: mongo.ObjectId(id) }, { $set: update })
  }

  /**
   * Supprime un live
   */
  async function removeOne(id) {
    return collection.deleteOne({
      _id: mongo.ObjectId(id),
    })
  }

  app.decorate('BookModel', {
    fetchAll,
    fetchOneById,
    insertOne,
    updateOneById,
    removeOne,
  })
}
