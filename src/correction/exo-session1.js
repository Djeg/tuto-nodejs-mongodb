import fastify from 'fastify'

const app = fastify({ logger: true })

/**
 * ===== EXERCICE SESSION 1 =====
 */
// EXO 1
app.get('/hello-world', {}, () => {
  return 'Bonjour tout le monde'
})

// EXO 2
app.get('/hello/:name', {}, (request, reply) => {
  const name = request.params.name

  return 'Bonjour ' + name
})

// EXO 3
app.get('/additionner/:x/:y', {}, request => {
  return parseInt(request.params.x) + parseInt(request.params.y)
})

// EXO 4
app.get('/calculer/:x/:y', {}, (request, reply) => {
  const operation = request.headers.operation
  const x = parseInt(request.params.x)
  const y = parseInt(request.params.y)

  if ('additionner' === operation) {
    return x + y
  }

  if ('soustraire' === operation) {
    return x - y
  }

  if ('multiplier' === operation) {
    return x * y
  }

  reply.code(404)

  return 'Veuillez préciser une opération'
})

// EXO 5
app.get('/personnes', {}, request => {
  const nameCriteria = request.query.name
  const names = [
    'john',
    'jack',
    'jane',
    'jerome',
    'jean',
    'jule',
    'justine',
    'juliette',
    'jeremy',
  ]

  if (!nameCriteria) {
    return names
  }

  return names.filter(name => name.includes(nameCriteria))
})

app.post('/test', {}, () => {
  return 'test post'
})

app.get('/pantalons', {}, request => {
  const taille = request.query.taille

  return [
    {
      id: 1,
      name: 'super pantalon',
      price: 25.8,
    },
    {
      id: 2,
      name: 'super pantalon 2',
      price: 32.8,
    },
  ]
})

app.post('/users/token', {}, request => {
  request.body.email
  request.body.password
})

app.listen(4646, '0.0.0.0')
