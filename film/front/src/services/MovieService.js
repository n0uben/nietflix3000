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
                        genre
                        imageUrl
                      }
                    }`
        })
    }

    create(film) {
        return http.post("/graphql", {
            query: `mutation {
                        createMovie(movie: {
                            nom: "${film.nom}",
                            description: "${film.description}",
                            dateSortie: "${film.dateSortie}",
                            duree: ${film.duree},
                            genre: "${film.genre}",
                            imageUrl: "${film.imageUrl}"
                        }) {
                        id
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
                            duree: ${film.duree},
                            genre: "${film.genre}",
                            imageUrl: "${film.imageUrl}"
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