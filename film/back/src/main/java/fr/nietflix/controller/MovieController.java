package fr.nietflix.controller;

import fr.nietflix.model.Movie;
import fr.nietflix.service.MovieService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Controller
@CrossOrigin
public class MovieController {

    private final MovieService movieService;

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
    public Movie createMovie(@Argument Movie movie) {
        Movie newMovie = new Movie();

        newMovie.setNom(movie.getNom());
        newMovie.setDescription(movie.getDescription());
        newMovie.setDateSortie(movie.getDateSortie());
        newMovie.setDuree(movie.getDuree());
        newMovie.setGenre(movie.getGenre());
        newMovie.setImageUrl(movie.getImageUrl());

        return this.movieService.create(newMovie);
    }

    @MutationMapping
    public Movie updateMovie(@Argument Movie movie) {
        return this.movieService.findOne(movie.getId())
                .map(movieBdd -> {
                    movieBdd.setNom(movie.getNom());
                    movieBdd.setDescription(movie.getDescription());
                    movieBdd.setDateSortie(movie.getDateSortie());
                    movieBdd.setDuree(movie.getDuree());
                    movieBdd.setGenre(movie.getGenre());
                    movieBdd.setImageUrl(movie.getImageUrl());

                    this.movieService.update(movieBdd);

                    return movieBdd;
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
