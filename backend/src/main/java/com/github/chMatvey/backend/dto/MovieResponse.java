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
                .smallImageRef("https://avatars.mds.yandex.net/get-ott/239697/2a000001690548526451fb58ed9b682f9812/375x234")
                .largeImageRef("https://kinopoisk-ru.clstorage.net/t1w6d1135/69e275WzJwA/qIL7ZgZm_3oBl31ztvCdn-r9Htr7I6B486JSKQ-vVLUlkXYkUxEFsk8lxg6_ncKe8pVyACRnQ4oQig-lUMrKEH0TrrSDI2j6UxcvpmNnms2sKssQJyopdW8qW6ZVsUql9kHxskKGBiJY85bYeEyThX3QIsWl5RARz06XuQ5RUgTgQvlnATFwcQbN_XK5sdAQ-nPa2a3oLLCkLFXuXfLLbjEB6DvExQ7iEbOcE-mDHYF7BS6L5S8W2EdFVH_EmlXOa08yIIJ597iNyrc_8DqVGTf7l1Uu4WI8LOle7tpyy6w_R-66gklJaxP0mJhuzZfD94RtC-RhW9kOiJx7C5oXhCJO8COO8H5wDY9_OTB0nRu3fNKaLKxsN2UrGSIVd0llsMVsOsEICWBTvVrW7sBdg7wGpoZp71Xey47Q8A3ZUQslTHZjB_MwvsSAdjO19JjX8LpaE2qhorwp4lYglXeJYjiI63jETUcin3LXVmZLHQm-xOFCLuZW2kQO3PSN1VSP7YozaMQ2f39OSvDyOPsX0XB8G17sIGj5I-Ia7h1wA239Di6ww05OKhm1VJOhSpsAsoapQKpuVx9Pix9wQJ8axuSGPu_PffH5BEbzenQ4nZ0xvR3fpWcltulvG6SR84Klt8ki9MHFDyOXP5uXrc3cgzqFIsqlrNJUwQ3avA2XF4dpz3vhTnf2fQ3Jsba4MJrf-nLcHeqoYzBqo1MqGnFMbnbIaHnEDo_gVrPf0iAGWM8wBGZKYuXWGAWF1LNLFx8OLETzowA-sn_Az3A2sDvfFPi9Xdqs5iq-Ja2bZF0wz6iwjWm1hQgH6hJ1UNfhTROE-oKkzO3hktbPihk6hFWVB2SFv-zKNHzzSAh6ur36UNq4dxvVbW4vdyvpEaqSc8wlP43kO4wJT67ZORnTqIzeCPuC6kygJNxeD8mYO4_UXY8jwX-pzDy4uAeKuPa5u9yfczxTW6vuIvtmbdYoWLPDKvCCI_INjsPiELQck6iFm4c7QyaF7WqS1AYJFP0AkxFAaU8-II55ODkNhr959rnck7P2H9lgbGiwaukV7hwzT2X3B6-2xABOYxl_W1HhxprI-wKrA69iEBpIxh_9RJFfBKzPcqsBMfp-yIV1d7Ux2VL7O5TV7GupuSlllSRaco3lPcCgfguEz22dt9PZIoIUwbsDbQVuqt_aDQcRNQzWVQktyvIkCb55N05PPb-18thYPXDWnmTuY7Aq7RfpkH5FbbbHKfPIREYr17mZUaOD1057QubBLieXkgBAGbNAlZbIJYN_Jsj28HENBXf4czVXn_X6lF3iYOM4LWLUYlX7xehygOqxDAbAYpZ9HlDtiRrMs8JtiqGr25CDwhp4Rt7Uj-uFO65OvfJ2z42wMLZwn1kw9FqbKCZrNKmrlKXfNwwpcgjneoSPTGJTtdnaakBUxjjOr4tob1JZw49aOIdXGMQqxfNpx3C2_0EANje2ehGSNXgcH62v7DWsIx1vXnpNYroGJDGLiA5i370XFKkKnMJySWqJZe0SEEWJEXOAVRQPqgF6Iwr_9riHR3h2Pb1V3Pi8lxniIiHxraDU6ZSyTeT2geJ8AAbPqFn6GFnoAhIA8IDkAq9l29cNTpk7xtTSyGGN_q7LdP8yjAj6-bP6Hl0yOBbUquqi9uFgmSUfcAWp98gpckIJRKub_9CWagodgnZE4kTt4dMVA49VvMVb2ENuhH_phPS-tw-NN3E8u5SQPH-S2mbu4z9obRfgknHM4zLGan4FBIxnGrrbWijMVED0iKdL723TWUlJ1P-LkhGGq07yoU43fT1BCLB2eLFZ03v8FZXjYSW0IK1UZhzwCaT3Rig1SAYDr927HlNhAt0Hs8ukhuZtHVzExpK8BFfSD2ME-iNIfn79QEQw9Xz5FFXzdR5RrKqq-aXlXSRVtUgkeobocMgJhSzVMZgfoE4diXEI5YJsrFYdgI4f8sDfFoRsBfkuRrf6uURF8L3w-VXX8bJdmqvsKzgqKRXiUPdKoP7MYLBOz84iUHOXEKiOE0o6y-0NL6eX0sDC0zyEltdIpYx3qgJ1vPYAATFxOXsWX3y81Jui4evw6WjeYBw6zSq-QCg4BYdJat55V5inRNwLvswjjCRr35DDQViwAd0aCymNt6YAeH-zTki1cz33HpOyt9UWpuAqc6ZkFS4e9oMlc0dmecmPgWzQOxYb7kNUQnQAasyorBMXx87ZdYCe3cNpxDYjQzhw-kyPuv5_99JY8v2bm2bv4jjrb5lp2DmKJn3OITUMzMgv1XwbW68IUkd0Su5IKupfVojJ2_BGXNoP7IG47oP7eX5FwDu5vfWamvMyX9mhqS2_LSef4NC4yOFxQay0QYsFpZC60ldtQNoJckvvim1mlNmLwdv7zBVaAC1OM2QE9T67wQj7vvs4lxN5_Z_Srq9ovKUoXmkWvUthOgZo9czMC6gZd9ufYkOTTLdNY0Lga9AUiE-TOIGd0s5lzj2jhLG_NUfOe7pxMlYQcTsRlCBq4nuj6FftFnBF6HBIZvHJzwZk2vyUGSAEXAJ_AKMF7SqdVoVH3bpGVFBBJco4rgQ79PHMD_J5eTEcWbv3mtZiaOD4rGEa59yxCWvyziczzExGp9DzktIoiRQOccRjQ2XnHVgHB9_3jBxXwSEHN6pAfrKxTIEzeX_xV9R7M1xTYuzoeWahHCEUv8Aj8E-i9AlGC-cftFETL82XCDdLI0zm7N-XzUHX9UCSEE3sjvEiBD_xPs4C8bW1PdBQN38SFqaoonNoa50tnbFBqPdGorpIBscnWb_eFK9EGkd5iGJDbq3XmEaGVbAGmRLO5cX2pg8-OnfOAn24s3lfUbD_0RLjaaW3LKTfaBd3A-T2hKn8yo7NINg8WJTvyx4AdIThgenqGtoOz9u8j5LdDKvM9S6G8zz5g0m4t3C8XZi0tR8ZqyHt_a7hWy9WvkchMkcvu0COgK3buFEXKsCVjzvNZMjspRhZBY")
                .releaseYear(model.getReleaseYear())
                .minAge(model.getMinAge())
                .voiceCount(model.getVoiceCount())
                .kinopoiskId(model.getKinopoiskId())
                .kinopoiskRef(model.getKinopoiskRef())
                .genre(model.getGenre())
                .country(model.getCountry())
                .build();
    }
}
