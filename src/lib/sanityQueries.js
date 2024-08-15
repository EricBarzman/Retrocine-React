
export const getAllAvatarsQuery = `*[_type == "avatar"] {
    _id,
    label,
    "imageUrl": image.asset->path,
}`

export const getUserInfoQuery = `*[_type == "user" && firebaseId == $firebaseUserId][0] {
    _id,
    username,
    firebaseId,
    email,
    about,
    avatar->{_id, label, "imageUrl": image.asset->path}
}`

export const getUserFavoritesQuery = `*[_type == "user_favorite" && user._ref == $userId] {
    _id,
    movie->{
        _id,
        title,
        "slug": slug.current,
        director->{_id, first_name, last_name},
        country->{_id, name, region},
        year,
        youtube_id,
        "imageUrl": image.asset->url,
    },
}`

export const getTopicsQuery = `*[_type == "topic"] {
    _id,
    label,
    label_text
}`

export const getGenresQuery = `*[_type == "genre"] {
    _id,
    label,
    slug,
}`

export const getCountriesQuery = `*[_type == "country"] {
    _id,
    name,
    region,
}`

export const getAllMoviesQuery = `*[_type == "movie"] {
    _id,
    title,
    "slug": slug.current,
    director->{_id, first_name, last_name},
    country->{_id, name, region},
    year,
    youtube_id,
    "imageUrl": image.asset->url,
}`

export const getMoviesByGenreQuery = `*[_type == "movie" && genre._ref == $genreId] {
    _id,
    title,
    "slug": slug.current,
    director->{_id, first_name, last_name},
    country->{_id, name, region},
    year,
    "imageUrl": image.asset->url,
}`

export const getMoviesByCountryQuery = `*[_type == "movie" && country._ref == $countryId] {
    _id,
    title,
    "slug": slug.current,
    director->{_id, first_name, last_name},
    country->{_id, name, region},
    year,
    "imageUrl": image.asset->url,
}`

export const getMovieById = `*[_type == "movie" && _id == $movieId][0] {
    _id,
    title,
    "slug": slug.current,
    short_description,
    genre->{_id, label},
    director->{_id, first_name, last_name},
    country->{_id, name, region},
    year,
    decade,
    youtube_id,
    "imageUrl": image.asset->url,
}`

export const getMovieBySlug = `*[_type == "movie" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    short_description,
    genre->{_id, label},
    director->{_id, first_name, last_name},
    country->{_id, name, region},
    year,
    decade,
    youtube_id,
    "imageUrl": image.asset->url,
}`