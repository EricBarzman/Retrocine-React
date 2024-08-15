import sanityClient from "./sanityClient";
import * as queries from "./sanityQueries";
import axios from "axios";

// USER

export async function createUser({ firebaseId, username, email, avatarId }) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "user",
          username,
          firebaseId,
          email,
          avatar: {
            _type: "reference",
            _ref: avatarId,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${import.meta.env.VITE_APP_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/mutate/${import.meta.env.VITE_APP_SANITY_DATASET}`,
    mutation,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_SANITY_API_TOKEN}`,
      },
    }
  );

  return data;
}

export async function getUserInfo(firebaseUserId) {
  return await sanityClient.fetch(
    queries.getUserInfoQuery,
    { firebaseUserId },
    { cache: "no-cache" }
  );
}

export async function getUserFavorites(userId) {
  return await sanityClient.fetch(
    queries.getUserFavoritesQuery,
    { userId },
    { cache: "no-cache" }
  );
}


export async function getAvatars() {
  return await sanityClient.fetch(
    queries.getAllAvatarsQuery,
    {},
    { cache: "no-cache" }
  );
}

export async function updateUserAvatar({ userId, avatarObj }) {
  const mutation = {
    mutations: [
      {
        patch: {
          id: userId,
          set: {
            avatar: avatarObj
          }
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${import.meta.env.VITE_APP_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/mutate/${import.meta.env.VITE_APP_SANITY_DATASET}`,
    mutation,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_SANITY_API_TOKEN}`,
      },
    }
  );

  return data;
}

// TOPICS

export async function getTopics() {
  return await sanityClient.fetch(
    queries.getTopicsQuery,
    {},
    { cache: "no-cache" }
  );
}

export async function sendMessageToUs({ email, topic, content }) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "issue_message",
          email,
          content,
          topic: {
            _type: "reference",
            _ref: topic,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${import.meta.env.VITE_APP_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/mutate/${import.meta.env.VITE_APP_SANITY_DATASET}`,
    mutation,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_SANITY_API_TOKEN}`,
      },
    }
  );

  return data;
}

// MOVIES

export async function getAllMovies() {
  return await sanityClient.fetch(
    queries.getAllMoviesQuery,
    {},
    { cache: "no-cache" }
  );
}


export async function getGenres() {
  return await sanityClient.fetch(
    queries.getGenresQuery,
    {},
    { cache: "no-cache" }
  );
}


export async function getCountries() {
  return await sanityClient.fetch(
    queries.getCountriesQuery,
    {},
    { cache: "no-cache" }
  );
}

export async function getMoviesByGenre(genreId) {
  return await sanityClient.fetch(
    queries.getMoviesByGenreQuery,
    { genreId },
    { cache: "no-cache" }
  );
}

export async function getMoviesByCountry(countryId) {
  return await sanityClient.fetch(
    queries.getMoviesByCountryQuery,
    { countryId },
    { cache: "no-cache" }
  );
}

export async function getMovieBySlug(slug) {
  return await sanityClient.fetch(
    queries.getMovieBySlug,
    { slug },
    { cache: "no-cache" }
  );
}

export async function createUserFavorite(userId, movieId) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "user_favorite",
          user: {
            _type: "reference",
            _ref: userId,
          },
          movie: {
            _type: "reference",
            _ref: movieId,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${import.meta.env.VITE_APP_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/mutate/${import.meta.env.VITE_APP_SANITY_DATASET}`,
    mutation,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_SANITY_API_TOKEN}`,
      },
    }
  );

  return data;
}


export async function deleteUserFavorite(favoriteId) {
  await sanityClient.delete(favoriteId);
}