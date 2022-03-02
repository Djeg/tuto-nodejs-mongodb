async function additionner(x, y) {
  return x + y
}

async function start() {
  const resultat = await additionner(3, 4)

  console.log(resultat)
}

start()
