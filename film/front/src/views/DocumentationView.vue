<template>
  <div class="documentation container-fluid">
    <div class="row">
      <div class="col">
        <h1>Documentation</h1>
        <p>Cette documentation montre les requêtes possibles sur l'API graphql Nietflix Films.</p>

        <h2>1. Plus d'infos</h2>
        <p>Pour plus d'informations, consulter la <a href="https://graphql.org/graphql-js/mutations-and-input-types/" target="_blank">documentation officielle</a> sur les requêtes </p>
        <p>A noter : l'endpoint pour vos requêtes sur l'api est :
          <code>http://localhost:8080/graphql </code>
          (à ne pas confondre avec l'adresse du bac à sable de test)
        </p>

        <h2>2.Les requêtes disponibles</h2>

        <p>Pour tester l'api graphql, suivre les étapes suivantes :</p>
        <ul>
          <li>configurer le fichier application.properties avec vos informations de bdd</li>
          <li>lancer le serveur avec votre ide</li>
          <li>Accéder au bac à sable de test sur <code>http://localhost:8080/graphiql</code></li>
          <li>tapez une des requêtes ci-dessous</li>
        </ul>

        <h3>2.1 Un seul film</h3>
        <h4>2.1.1 avec l'id </h4>
        <pre>
          <code>
            query movieDetails {
              movieById(id: 1) {
                id
                nom
                description
                dateSortie
                duree
              }
            }
          </code>
        </pre>

        <h4>2.1.2 avec le nom</h4>
        <pre>
          <code>
            query {
              movieByNom(nom: "test") {
                id
                nom
                description
                dateSortie
                duree
              }
            }
          </code>
        </pre>

        <h3>2.2 Tous les films</h3>
        <pre>
          <code>
            query listMovies {
                allMovies {
                    id
                    nom
                    description
                    dateSortie
                    duree
                }
            }
          </code>
        </pre>


        <h3>2.3 Créer un film</h3>
        <pre>
          <code>
            mutation {
              createMovie(movie: {
                nom: "le nom",
                description: "desc"
                dateSortie: "2023"
                duree: 90
              })
              {
                id
                nom
                description
                dateSortie
                duree
              }
            }
          </code>
        </pre>

        <h3>2.4 Modifier un film</h3>
        <pre>
          <code>
            mutation {
              updateMovie(movie: {
                id: 1,
                nom: "le nom",
                description: "desc"
                dateSortie: "1924"
                duree: 90
              })
              {
                id
                nom
                description
                dateSortie
                duree
              }
            }
          </code>
        </pre>

        <h3>2.5 Supprimer un film</h3>
        <pre>
          <code>
            mutation {
              deleteMovie(id: 1) {
                id
              }
            }
          </code>
        </pre>

      </div>
    </div>


  </div>
</template>

<style>
code {
  display: block;
  background-color: lightgrey;
}
</style>
