# Back netflix films

## Test

Pour tester l'api graphql, suivre les étapes suivantes :

- configurer le fichier application.properties avec vos informations de bdd
- lancer le serveur avec votre ide
- accéder à http://localhost:8080/graphiql
- tapez une des requêtes ci-dessous

### Un seul film

```
query movieDetails {
  movieById(id: 1) {
    id
    nom
    dateSortie
    duree
  }
}
```

### Tous les films

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