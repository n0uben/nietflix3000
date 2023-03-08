<template>
  <div class="documentation container-fluid">
    <div class="row">
      <div class="col">
        <h1>Documentation</h1>

        <h2>Test</h2>

        <p>Pour tester l'api graphql, suivre les étapes suivantes :</p>
        <ul>
          <li>configurer le fichier application.properties avec vos informations de bdd</li>
          <li>lancer le serveur avec votre ide</li>
          <li>accéder à http://localhost:8080/graphiql</li>
          <li>tapez une des requêtes ci-dessous</li>
        </ul>

        <h3>Un seul film</h3>
        <pre>
          <code>
            query movieDetails {
              movieById(id: 1) {
                id
                nom
                dateSortie
                duree
              }
            }
          </code>
        </pre>

        <h3>Tous les films</h3>
        <pre>
          <code>
            query listMovies {
                allMovies {
                    id
                    nom
                    dateSortie
                    duree
                }
            }
          </code>
        </pre>


        <h3>Créer un film</h3>
        <pre>
          <code>
            mutation {
              createMovie(nom: "un bien bon film", dateSortie: "1992", duree: 120)
                {
                  id
                }
              }
          </code>
        </pre>

        <h3>Modifier un film</h3>
        <pre>
          <code>
            mutation {
              updateMovie(id: 1, nom: "un bien bon film", dateSortie: "1993", duree: 120) {
                id
              }
            }
          </code>
        </pre>

        <h3>Supprimer un film</h3>
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
