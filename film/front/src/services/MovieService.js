import http from '../main'
class MovieService {

    getAll() {
        return http.post("/graphql", {
            query: `query {
                        allMovies {
                            id
                            nom
                            dateSortie
                            duree
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
}

export default new MovieService();