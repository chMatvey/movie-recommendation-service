package com.github.chMatvey.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

@Data
@Builder
@AllArgsConstructor
@RelationshipProperties
public class HasWatched {
    @Id
    @GeneratedValue
    private Long id;
    private Integer rating;
    private String feedback;

    @TargetNode
    private Movie movie;
}
