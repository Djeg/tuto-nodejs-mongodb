# Exercice NodeJS & MongoDB

## Installation

- Cloner ou télécharger le projet
- lance la commande `npm install`
- Éditer le fichier `.env`
- lancer la commande `npm start`

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

## Session 3 - Les schemas

Pour faire ces exercices, tout d'abord installer `fluent-json-schema`.

Ensuite créer un fichier `src/schemas/book-schemas.js`
et placez tout vos schèmas à l'intérieur.

### Exo 1

Définir le schéma suivant pour la route `POST /books`:

### body:

| champ       | type   |
| ----------- | ------ |
| title       | string |
| description | string |
| price       | number |

### response 200 :

| champ                      | type   |
| -------------------------- | ------ |
| \_id                       | string |
| +tout les champs plus haut |

### Exo 2

Définir le schéma suivant pour la route `GET /books`:

### Response 200:

Un tableaux de `book` définie plus haut

### Exo 3

Définir le schéma suivant pour la route `PATCH /books/:id`:

### body:

| champ                            | type |
| -------------------------------- | ---- |
| même que le POST mais non requis |

### Response 200:

Le book définie plus haut

## Exo 4

Définir le schèma suivant pour la route `DELETE /books/:id`:

### Response 200:

Un `book` définie plus haut

## Exemple de requêtes RESTFull

```

Je veux récupérer les commentaires du pantalon n°10 (Collection)



GET https://super-vetement.api.io/pantalons/10/commentaires (Collection / Document ?) (OK: Collection)
                                 /pantalons
                                    /10
                                      /commentaires


GET https://super-vetement.api.io/commentaires?pantalon=10
                                 /commentaires (Collection)


Je veux récupérer l'autheur du livre n°10 (Document)

GET https://super-livre.api.io/auteurs?livre=10 (Pas OK)
                              /auteurs (Collection)

GET https://super-livre.api.io/auteurs/livres?id=10 (Pas Ok)
                              /auteurs (Collection)
                                /livres (Collection)

GET https://super-livre.api.io/livres?id=10&auteur (Pas OK)
                              /livres (Collection)

GET https://super-livre.api.io/auteur/livre/10 (Pas OK)
                              /auteur
                                /livre
                                  /10

GET https://super-livre.api.io/livres/10?auteur (Pas Ok)
                              /livres (Collection)
                                /10 (Document)

GET https://super-livre.api.io/livres/10/auteur (OK)
                              /livres (Collection)
                                /10 (Document)
                                  /auteur (Document)

Je veux ajouter un commentaire sur le pantalons n°5

POST https://super-vetement.api.io/commentaires/pantalons/5 (Pas OK)
                                  /commentaires (Collection)
                                    /pantalons (Collection)
                                      /5


POST https://super-vetement.api.io/pantalons/5/commentaires (OK)
                                  /pantalons (Collection)
                                    /5 (Document)
                                      /commentaires (Collection)


PATCH https://super-vetement.api.io/pantalons/5 (OK)


```
