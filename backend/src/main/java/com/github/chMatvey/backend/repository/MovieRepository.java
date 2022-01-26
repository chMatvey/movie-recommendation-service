package com.github.chMatvey.backend.repository;

import com.github.chMatvey.backend.model.Movie;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends Neo4jRepository<Movie, Long> {
    @Query("MATCH (n:Movie) WHERE toLower(n.title) CONTAINS $title return n")
    List<Movie> searchByTitle(@Param("title") String title);
}
