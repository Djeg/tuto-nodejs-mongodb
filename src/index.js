import fastify from 'fastify'
import mongo from 'mongodb'
import { NewBookSchema, BookSchema } from './schemas/books-schema.js'

/**
 * Definission d'un fonction de démarrage asynchrone
 */
async function start() {
  // Création de l'application fastify
  const app = fastify({ logger: true })
  // On se connécte à notre cluster mongodb
  const client = await mongo.MongoClient.connect(
    'mongodb+srv://tutomongo:tutomongo@cluster0.kwadp.mongodb.net',
  )
  // On obtient la base de données
  const db = client.db('test')

  // EXO 1
  // Création d'une route qui récupére tout les livres
  app.get('/books', {}, async () => {
    // Récupération de plusieurs livre. Cette instruction
    // nous retourne un tableaux de livre (un objet avec
    // tout les champs du livre)
    const livres = await db.collection('books').find().toArray()

    return livres
  })

  // EXO 2
  // Création d'une route qui récupére un seul livre
  app.get('/books/:id', {}, async request => {
    // On demande à un récupérer un seul livre
    const livre = await db.collection('books').findOne({
      // On récupére le livre par son ID. Attention
      // à bien envoyé l'identifiant dans la fonction
      // mongo.ObjectId
      _id: mongo.ObjectId(request.params.id),
    })

    // On retourne le livre
    return livre
  })

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

      const result = await db.collection('books').insertOne(body)

      const livre = await db.collection('books').findOne({
        _id: mongo.ObjectId(result.insertedId),
      })

      return livre
    },
  )

  // EXO 4
  // Création d'une route pour modifier un livre
  app.patch('/books/:id', {}, async request => {
    const body = request.body

    await db
      .collection('books')
      .updateOne({ _id: mongo.ObjectId(request.params.id) }, { $set: body })

    const livre = await db.collection('books').findOne({
      _id: mongo.ObjectId(request.params.id),
    })

    return livre
  })

  // EXO 5
  // Création d'une route pour supprimer un livre
  app.delete('/books/:id', {}, async request => {
    const livre = await db.collection('books').findOne({
      _id: mongo.ObjectId(request.params.id),
    })

    await db.collection('books').deleteOne({
      _id: mongo.ObjectId(request.params.id),
    })

    return livre
  })

  // On lance le serveur logique sur le port 4646
  app.listen(4646, '0.0.0.0')
}

start()
