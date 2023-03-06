package fr.nietflix.service;

import fr.nietflix.dao.MovieRepository;
import fr.nietflix.model.Movie;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Optional<Movie> findOne(Long id) {
        return this.movieRepository.findById(id);
    }

    public Optional<Movie> findByName(String nom) {
        return this.movieRepository.findMovieByNom(nom);
    }

    public List<Movie> findAll() {
        return this.movieRepository.findAll();
    }

    public Movie create(Movie movie) {
        return this.movieRepository.saveAndFlush(movie);
    }

    public Movie update(Movie movie) {
        return this.movieRepository.saveAndFlush(movie);
    }

    public void delete(Long id) {
        this.movieRepository.deleteById(id);
    }
}
