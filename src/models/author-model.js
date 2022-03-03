import mongo from 'mongodb'

/**
 * Définie le model d'un Auteur. Permet d'interargir
 * avec les auteurs dans la base de données
 */
export default async function authorModel(app) {
  const collection = app.db.collection('authors')

  /**
   * Récupére tout les auteur depuis la base de données
   */
  async function fetchAll() {
    return collection.find().toArray()
  }

  /**
   * Récupére un seul auteur
   */
  async function fetchOne(id) {
    return collection.findOne({
      _id: mongo.ObjectId(id),
    })
  }

  /**
   * Insére un nouvel auteur
   */
  async function insertOne(author) {
    return collection.insertOne(author)
  }

  /**
   * Met à jour un auteur
   */
  async function updateOne(id, author) {
    return collection.updateOne({ _id: mongo.ObjectId(id) }, { $set: author })
  }

  /**
   * Supprime un auteur
   */
  async function deleteOne(id) {
    return collection.deleteOne({
      _id: mongo.ObjectId(id),
    })
  }

  app.decorate('AuthorModel', {
    fetchAll,
    fetchOne,
    insertOne,
    updateOne,
    deleteOne,
  })
}
