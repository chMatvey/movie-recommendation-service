package com.github.chMatvey.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WatchedRequest {
    private String username;
    private Long movieId;
    private Integer rating;
}