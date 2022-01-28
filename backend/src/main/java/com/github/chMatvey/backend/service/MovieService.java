package com.github.chMatvey.backend.service;

import com.github.chMatvey.backend.dto.MovieRequest;
import com.github.chMatvey.backend.dto.MovieResponse;
import com.github.chMatvey.backend.dto.SearchMovieRequest;
import com.github.chMatvey.backend.dto.WatchedRequest;
import com.github.chMatvey.backend.model.HasWatched;
import com.github.chMatvey.backend.model.Movie;
import com.github.chMatvey.backend.model.User;
import com.github.chMatvey.backend.repository.MovieRepository;
import com.github.chMatvey.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    public Optional<MovieResponse> getById(Long id) {
        return movieRepository.findById(id).map(MovieResponse::fromModel);
    }

    public List<MovieResponse> getAll() {
        return movieRepository.findLimit().stream().map(MovieResponse::fromModel).collect(Collectors.toList());
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

    public List<MovieResponse> getWatched(String username) {
        Optional<User> userOptional = userRepository.findById(username);
        if (userOptional.isEmpty()) {
            return emptyList();
        }
        User user = userOptional.get();
        if (user.getWatchedMovies() == null) {
            return emptyList();
        }
        return user.getWatchedMovies().stream()
                .map(HasWatched::getMovie)
                .map(MovieResponse::fromModel)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markWatched(WatchedRequest request) {
        User user = userRepository.findById(request.getUsername())
                .orElseGet(() -> userRepository.save(User.builder().username(request.getUsername()).build()));
        if (user.getWatchedMovies() == null) {
            user.setWatchedMovies(new HashSet<>());
        }
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
        boolean alreadyWatched = user.getWatchedMovies().stream()
                .map(HasWatched::getMovie)
                .anyMatch(watchedMovie -> watchedMovie.equals(movie));
        if (!alreadyWatched) {
            HasWatched hasWatched = HasWatched.builder()
                    .movie(movie)
                    .rating(request.getRating())
                    .build();
            user.getWatchedMovies().add(hasWatched);
            userRepository.save(user);
        }
    }
}
