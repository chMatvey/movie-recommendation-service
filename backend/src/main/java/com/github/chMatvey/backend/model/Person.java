package com.github.chMatvey.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;

@Data
@Builder
@AllArgsConstructor
@Node
public class Person {
    @Id
    private Long id;
    private String name;

    @Property("kinopoisk_id")
    private Long kinopoiskId;
}
