package com.github.chMatvey.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.*;

@Data
@Builder
@AllArgsConstructor
@RelationshipProperties
public class HasCast {
    @Id
    @GeneratedValue
    private Long id;
    private Integer order;
    private String role;

    @Property("cast_type")
    private String castType;

    @TargetNode
    private Person person;
}
