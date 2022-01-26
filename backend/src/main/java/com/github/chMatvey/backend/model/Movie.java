package com.github.chMatvey.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

import static org.springframework.data.neo4j.core.schema.Relationship.Direction.OUTGOING;

@Data
@Builder
@AllArgsConstructor
@Node
public class Movie {
    @Id
    private Long id;
    private String title;
    private Integer duration;
    private Double rating;

    @Property("small_image_ref")
    private String smallImageRef;

    @Property("large_image_ref")
    private String largeImageRef;

    @Property("release_year")
    private Integer releaseYear;

    @Property("min_age")
    private Integer minAge;

    @Property("voice_count")
    private Long voiceCount;

    @Property("kinopoisk_id")
    private Long kinopoiskId;

    @Property("kinopoisk_ref")
    private String kinopoiskRef;

    @Relationship(type = "hasCast", direction = OUTGOING)
    private Set<HasCast> persons = new HashSet<>();

    @Relationship(type = "hasGenre", direction = OUTGOING)
    private Set<Genre> genre = new HashSet<>();

    @Relationship(type = "hasCountry", direction = OUTGOING)
    private Country country;
}
