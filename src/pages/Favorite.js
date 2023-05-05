import React from "react";
import MovieList from "../components/MovieList";

function Favorite({ movies }) {
  const favoriteList = window.localStorage.getItem("favorite");

  const favoriteMovies =
    movies &&
    movies.filter((movie) => favoriteList && favoriteList.includes(movie.id));

  return (
    <div>
      <MovieList movies={favoriteMovies} />
    </div>
  );
}

export default Favorite;
