import http from '../main'
class MovieService {

    getAll() {
        return http.post("/graphql", {
            query: `query {
                        allMovies {
                            id
                            nom
                        }
                    }`
        })
    }

    getOne(id) {
        return http.post("/graphql", {
            query: `query {
                      movieById(id: ${id}) {
                        id
                        nom
                        description
                        dateSortie
                        duree
                      }
                    }`
        })
    }

    update(film) {
        return http.post("/graphql", {
            query: `mutation {
                        updateMovie(movie: {
                            id: "${film.id}",
                            nom: "${film.nom}",
                            description: "${film.description}",
                            dateSortie: "${film.dateSortie}",
                            duree: ${film.duree}
                        }) {
                        id
                        }
                    }`
        })
    }

    delete(id) {
        return http.post("/graphql", {
            query: `mutation {
                        deleteMovie(id: ${id}) {
                        id
                        }
                    }`
        })
    }
}

export default new MovieService();