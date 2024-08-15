export const getAllMoviesQuery = `*[_type == "movie"] {
    _id,
    title,
    short_description,
    genre,
    director,
    country,
    year,
    decade,
    youtube_id,
    "imageUrl": image.asset->url,
}`

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
    avatar
}`

export const getUserFavoritesQuery = `*[_type == "user_favorite" && user._ref == $userId] {
    _id,
    "movieId": movie._ref,
}`

export const getTopicsQuery = `*[_type == "topic"] {
    _id,
    label,
    label_text
}`