package com.github.chMatvey.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

import static org.springframework.data.neo4j.core.schema.Relationship.Direction.OUTGOING;

@Data
@Builder
@AllArgsConstructor
@Node
public class User {
    @Id
    private String username;

    @Relationship(type = "hasWatched", direction = OUTGOING)
    private Set<HasWatched> watchedMovies = new HashSet<>();
}
