import fastify from 'fastify'

const app = fastify({ logger: true })

app.get('/hello/:name', {}, (request, reply) => {
  request.method // GET
  const name = request.params.name
  const userAgent = request.headers.userAgent

  reply.code(201)
  reply.header('Techno', 'nodejs')

  return 'Bonjour ' + name
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
