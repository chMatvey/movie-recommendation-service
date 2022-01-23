package com.github.chMatvey.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Data
@Builder
@AllArgsConstructor
@Node
public class Genre {
    @Id
    private Long id;
    private String name;
}
