package com.github.chMatvey.backend.service;

import com.github.chMatvey.backend.dto.SearchMovieRequest;
import com.github.chMatvey.backend.model.Movie;
import com.github.chMatvey.backend.repository.MovieRepository;
import com.github.chMatvey.backend.dto.MovieRequest;
import com.github.chMatvey.backend.dto.MovieResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    public Optional<MovieResponse> getById(Long id) {
        return movieRepository.findById(id).map(MovieResponse::fromModel);
    }

    public List<MovieResponse> getAll() {
        return movieRepository.findAll().stream().map(MovieResponse::fromModel).collect(Collectors.toList());
    }

    public MovieResponse create(MovieRequest movieRequest) {
        throw new RuntimeException("Not Implemented");
    }

    public List<MovieResponse> search(SearchMovieRequest searchRequest) {
        return movieRepository.searchByTitle(searchRequest.getPattern().trim().toLowerCase())
                .stream()
                .map(MovieResponse::fromModel)
                .collect(Collectors.toList());
    }
}
