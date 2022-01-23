package com.github.chMatvey.backend.repository;

import com.github.chMatvey.backend.model.Movie;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface MovieRepository extends Neo4jRepository<Movie, Long> {
}
