# Back netflix films

Cette documentation montre les requêtes possibles sur l'API graphql Nietflix Films.

1\. Plus d'infos
----------------

Pour plus d'informations, consulter
la [documentation officielle](https://graphql.org/graphql-js/mutations-and-input-types/) sur les requêtes

A noter : l'endpoint pour vos requêtes sur l'api est : `http://localhost:8080/graphql` (à ne pas confondre avec
l'adresse du bac à sable de test)

2.Les requêtes disponibles
--------------------------

Pour tester l'api graphql, suivre les étapes suivantes :

* configurer le fichier application.properties avec vos informations de bdd
* lancer le serveur avec votre ide
* Accéder au bac à sable de test sur `http://localhost:8080/graphiql`
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
    }
}
```

### 2.2 Tous les films

```
query listMovies {
    allMovies {
        id
        nom
        dateSortie
        duree
    }
}
```

### 2.3 Créer un film

```
mutation {
    createMovie(nom: "un bien bon film", description: "la description", dateSortie: "1992", duree: 120) 
    {
        id
    }
}
```

### 2.4 Modifier un film

```
mutation {
updateMovie(id: 1, nom: "un bien bon film 2", description: "une nouvelle description", dateSortie: "1993", duree: 120) {
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