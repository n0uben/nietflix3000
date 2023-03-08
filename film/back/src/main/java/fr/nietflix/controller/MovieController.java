package fr.nietflix.controller;

import fr.nietflix.model.Movie;
import fr.nietflix.service.MovieService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class MovieController {

    private MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @QueryMapping
    public Movie movieById(@Argument Long id) {
        return this.movieService.findOne(id)
                .orElse(new Movie());
    }

    @QueryMapping
    public Movie movieByNom(@Argument String nom) {
        return this.movieService.findByName(nom)
                .orElse(new Movie());
    }

    @QueryMapping
    public List<Movie> allMovies() {
        return this.movieService.findAll();
    }

    @MutationMapping
    public Movie createMovie(@Argument String nom, @Argument String dateSortie, @Argument Integer duree) {
        Movie movieToCreate = new Movie();

        movieToCreate.setNom(nom);
        movieToCreate.setDateSortie(dateSortie);
        movieToCreate.setDuree(duree);

        return this.movieService.create(movieToCreate);
    }

    @MutationMapping
    public Movie updateMovie(@Argument Long id, @Argument String nom, @Argument String dateSortie, @Argument Integer duree) {
        return this.movieService.findOne(id)
                .map(movie -> {
                    movie.setNom(nom);
                    movie.setDateSortie(dateSortie);
                    movie.setDuree(duree);

                    this.movieService.update(movie);

                    return movie;
                }).orElse(new Movie());
    }

    @MutationMapping
    public Movie deleteMovie(@Argument Long id) {
        return this.movieService.findOne(id)
                .map(movie -> {
                        this.movieService.delete(id);
                        return movie;
        }).orElse(new Movie());
    }

}