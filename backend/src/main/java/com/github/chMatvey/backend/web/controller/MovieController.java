package com.github.chMatvey.backend.web.controller;

import com.github.chMatvey.backend.model.Movie;
import com.github.chMatvey.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("api/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieRepository movieRepository;

    @GetMapping("/{id}")
    ResponseEntity<Movie> get(@PathVariable Long id) {
        return of(movieRepository.findById(id));
    }

    @GetMapping
    ResponseEntity<List<Movie>> all() {
        return ok(movieRepository.findAll());
    }

    @PostMapping
    ResponseEntity<Movie> create(@RequestBody Movie movie) throws URISyntaxException {
        movie.setId(null);
        Movie result = movieRepository.save(movie);
        return created(new URI("api/movies/" + result.getId())).body(result);
    }

    @PutMapping("/{id}")
    ResponseEntity<Movie> update(@PathVariable Long id, @RequestBody Movie movie) {
        movie.setId(id);
        return ok(movieRepository.save(movie));
    }
}
