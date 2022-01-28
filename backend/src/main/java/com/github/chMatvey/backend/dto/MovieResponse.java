package com.github.chMatvey.backend.dto;

import com.github.chMatvey.backend.model.Country;
import com.github.chMatvey.backend.model.Genre;
import com.github.chMatvey.backend.model.Movie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Set;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieResponse {
    private Long id;
    private String title;
    private Integer duration;
    private Double rating;
    private String smallImageRef;
    private String largeImageRef;
    private Integer releaseYear;
    private Integer minAge;
    private Long voiceCount;
    private Long kinopoiskId;
    private String kinopoiskRef;
    private Set<Genre> genre;
    private Country country;

    public static MovieResponse fromModel(Movie model) {
        return MovieResponse.builder()
                .id(model.getId())
                .title(model.getTitle())
                .duration(model.getDuration())
                .rating(model.getRating())
                .smallImageRef(getSmallLink(model))
                .largeImageRef(getLargeLink(model))
                .releaseYear(model.getReleaseYear())
                .minAge(model.getMinAge())
                .voiceCount(model.getVoiceCount())
                .kinopoiskId(model.getKinopoiskId())
                .kinopoiskRef(model.getKinopoiskRef())
                .genre(model.getGenre())
                .country(model.getCountry())
                .build();
    }

    private static String getSmallLink(Movie movie) {
        if (movie.getSmallImageRef() != null) {
            return movie.getSmallImageRef();
        } else if (movie.getSmallTeaserImageRef() != null) {
            return movie.getSmallTeaserImageRef();
        } else {
            return "https://ih0.redbubble.net/image.343726250.4611/flat,800x800,075,f.jpg";
        }
    }

    private static String getLargeLink(Movie movie) {
        if (movie.getLargeImageRef() != null) {
            return movie.getLargeImageRef();
        } else if (movie.getLargeTeaserImageRef() != null) {
            return movie.getLargeTeaserImageRef();
        } else {
            return "https://rus-traktor.ru/upload/iblock/a9a/a9ad0beca41b996c2939e95a8b775150.jpg";
        }
    }
}
