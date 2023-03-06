package fr.nietflix.controller;

import fr.nietflix.model.Movie;
import fr.nietflix.service.MovieService;
import org.springframework.graphql.data.method.annotation.Argument;
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
    public List<Movie> allMovies() {
        return this.movieService.findAll();
    }
}
