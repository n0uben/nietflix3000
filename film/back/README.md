# Back netflix films

Cette documentation montre les requêtes possibles sur l'API graphql Nietflix Films ainsi que la configuration du projet.

1\. Plus d'infos
----------------

Pour plus d'informations, consulter
la [documentation officielle](https://graphql.org/graphql-js/mutations-and-input-types/) sur les requêtes

A noter : l'endpoint pour vos requêtes sur l'api est : `http://localhost:8081/graphql` (à ne pas confondre avec
l'adresse du bac à sable de test)

2\. Les requêtes disponibles
--------------------------

Pour tester l'api graphql, suivre les étapes suivantes :

* configurer le fichier application.properties avec vos informations de bdd
* lancer le serveur avec votre ide
* Accéder au bac à sable de test sur `http://localhost:8081/graphiql`
* tapez une des requêtes ci-dessous

### 2.1 Un seul film

#### 2.1.1 avec l'id

```
query {
  movieById(id: 1) {
    id
    nom
    description
    dateSortie
    duree
    genre
    imageUrl
  }
}
```

#### 2.1.2 avec le nom

```
query {
movieByNom(nom: "test") {
    id
    nom
    description
    dateSortie
    duree
    genre
    imageUrl
    }
}
```

### 2.2 Tous les films

```
query listMovies {
    allMovies {
        id
        nom
        description
        dateSortie
        duree
        genre
        imageUrl
    }
}
```

### 2.3 Créer un film

```
mutation {
    createMovie(nom: "un bien bon film",
        description: "la description",
        dateSortie: "1992", duree: 120,
        genre: "le genre, imageUrl: "http://localhost:8081/uploads/masuperimage.png") {
        id
    }
}
```

### 2.4 Modifier un film

```
mutation {
updateMovie(id: 1,
            nom: "un bien bon film 2",
            description: "une nouvelle description", dateSortie: "1993",
            duree: 120, genre: "genre test", imageUrl: "http://localhost:8081/uploads/masuperimage.png") {
            id
}
}
```

### 2.5 Supprimer un film

```
mutation {
deleteMovie(id: 1) {
id
}
}
```

## 3. Configuration et lancement du projet

Pour lancer le projet :
1. créer une base de données mysql
2. modifier les 3 premieres lignes du fichier "application.properties" avec vos informations de connexion à la base de données créée.

A noter : si vous créez une BDD nommée "nietflixfilms" sur un wamp par défaut, vous pouvez sauter l'étape 2.
