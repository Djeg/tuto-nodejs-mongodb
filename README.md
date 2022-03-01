# Exercice NodeJS & MongoDB

## Partie 1 - Les routes

Vous pouvez mettre chacun de ces exercices dans le fichier
`src/index.js`. Chaque exercices peut-être testé avec le fichier
`request.http` :)

N'hésitez pas à demander de l'aide au formateur !

### Exo 1

Créer une route `GET /hello-world` qui retourne la chaîne de
caractère "bonjour tout le monde" !

### Exo 2

Créer une route `GET /hello/:name` qui accépte un paramètre
name et affiche la chaine de caractère suivante :
`Bonjour ${name}`.

### Exo 3

Créer une route `GET /additionner/:x/:y` qui accépte 2 paramètres
et retourne le résultat de l'addition des 2 chiffres.

### Exo 4

Créer une route `GET /calculer/:x/:y` qui accépte 2 paramètres
de routes, ainsi qu'un en-tête HTTP "Operation" qui peut être
égale à "additionner", "soustraire", "multiplier".

Lorsque l'en-tête http est égale a:

- additioner: Additionner les 2 nombres
- soustraire: Soustraire les 2 nombres
- multiplier: Multiplier les 2 nombres

Si l'en-tête HTTP "Operation" n'est pas présent retourner une réponse
avec le code "404" et la chaine de caractère "Veuillez préciser une opération"

### Exo 5

Avec le tableaux suivant:

```js
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
```

Créer une méthode `GET /personnes` qui retourne le tableaux
de nom.

Ajouter aussi une query string `nom=ju`, si la query est présente alors
retourner uniquement les noms contenant "ju"

## Session 2 - MongoDB

Toujours dans le fichier `src/index.js`, ajouter les
exercices les uns à la suite des autres. Vous pouvez tester
chaques exercices graçe au fichier `request.http`.

### Exo1 - Lister tout les livres

Créer une route `GET /books`. Cette route doit retourner
tout les documents de la collection `books`

### Exo2 - Récupérer un livre

Créer une route `GET /books/:id`. Cette route doit retourne
le document avec l'identifiant donné.

### Exo3 - Créer un livre

Créer un route `POST /books` qui accépte le body suivant:

```json
{
  "title": "Super titre",
  "description": "Superbe description"
}
```

On enregistre dans la base de données le contenu du body. Et
récupérer le document tout juste inséré dans la base de données
et le retourner.

### Exo4 - Modifier un livre

Créer un route `PATCH /books/:id` qui accépte le body suivant:

```json
{
  "title": "Super titre modifier"
}
```

On modifie le livre avec le body de requête. Et
récupérer le document tout juste modifié dans la base de données
et le retourner.

### Exo5 - Supprimer un livre

Créer un route `DELETE /books/:id`.

On supprime le livre dans la base de donnée. Retourner le livre
tout juste supprimer.
