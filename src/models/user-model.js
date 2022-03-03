import mongo from 'mongodb'
import { createHmac } from 'crypto'

/**
 * Contient toutes les opération des utilisateur sur la base de données
 */
export default async function userModel(app) {
  const collection = app.db.collection('users')

  /**
   * Créez un nouvel utilisateur
   */
  async function register(user) {
    // Crypte le mot de passe avant de l'enregistrer dans la base
    user.password = createHmac('sha256', 'clefs secrete')
      .update(user.password)
      .digest('hex')

    return collection.insertOne(user)
  }

  /**
   * Vérifie si un utilisateur existe
   */
  async function login({ email, password }) {
    // Récupére le user par son email
    const user = await collection.findOne({
      email: email,
    })

    // Vérifie le mot de passe
    const isPasswordValid =
      user.password ===
      createHmac('sha256', 'clefs secrete').update(password).digest('hex')

    if (!isPasswordValid) {
      throw Error('Mot de passe invalide')
    }

    return user
  }

  /**
   * Récupére tout les utilisateurs
   */
  async function fetchAll() {
    return collection.find().toArray()
  }

  /**
   * Récupére un utilisateur
   */
  async function fetchOne(id) {
    return collection.findOne({
      _id: mongo.ObjectId(id),
    })
  }

  app.decorate('UserModel', {
    register,
    fetchAll,
    fetchOne,
    login,
  })
}
