// import React from "react";

function useFilter(movies, filters, genres, favorite) {
  const { genreName, query } = filters;
  let filteredMovies = movies;
  let q = "";
  if (genreName) {
    const genreId = genres.find((genre) => genre.name === genreName).id;
    filteredMovies = filteredMovies.filter(
      (movie) => movie && movie.genre_ids && movie.genre_ids.includes(genreId)
    );
  }

  if (query) {
    q = query;
  }

  if (favorite) {
    const favoriteList = window.localStorage.getItem("favorite");
    filteredMovies = movies.filter(
      (movie) => favoriteList && favoriteList.includes(movie.id)
    );
    if (genreName) {
      const genreId = genres.find(
        (genre) => genre.name === filters.genreName
      ).id;
      filteredMovies = filteredMovies.filter(
        (movie) => movie && movie.genre_ids && movie.genre_ids.includes(genreId)
      );
    }
  }

  return { filteredMovies, q };
}

export default useFilter;
