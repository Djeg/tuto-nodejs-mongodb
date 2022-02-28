import fastify from 'fastify'

const app = fastify({ logger: true })

app.get('/hello', {}, () => {
  return 'Bonjour à tous !'
})

app.listen(4646, '0.0.0.0')
