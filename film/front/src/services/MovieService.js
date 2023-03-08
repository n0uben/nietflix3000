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
}

export default new MovieService();