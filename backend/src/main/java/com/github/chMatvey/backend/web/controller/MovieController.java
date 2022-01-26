package com.github.chMatvey.backend.web.controller;

import com.github.chMatvey.backend.dto.MovieRequest;
import com.github.chMatvey.backend.dto.MovieResponse;
import com.github.chMatvey.backend.dto.SearchMovieRequest;
import com.github.chMatvey.backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("api/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;

    @GetMapping("/{id}")
    ResponseEntity<MovieResponse> get(@PathVariable Long id) {
        return of(movieService.getById(id));
    }

    @GetMapping
    ResponseEntity<List<MovieResponse>> all() {
        return ok(movieService.getAll());
    }

    @PostMapping
    ResponseEntity<MovieResponse> create(@RequestBody MovieRequest request) throws URISyntaxException {
        MovieResponse result = movieService.create(request);
        return created(new URI("api/movies/" + result.getId())).body(result);
    }

    @PostMapping("/search")
    ResponseEntity<List<MovieResponse>> search(@RequestBody SearchMovieRequest request) {
        return ok(movieService.search(request));
    }
}
