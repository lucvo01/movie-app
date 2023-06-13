import React from "react";
import MovieList from "../components/MovieList";
import { useEffect } from "react";
import apiService from "../app/apiService";

function Favorite({ movies, favorite }) {
  const favoriteList = window.localStorage.getItem("favorite");

  useEffect(() => {
    const fetchFavoriteMovies = async (favoriteList) => {
      try {
        // const favoriteList = window.localStorage.getItem("favorite");
        const apiKey = "096661a0ca80af081193ef63f856a4cf";
        const requests = favoriteList.map((id) =>
          apiService.get(`movie/${id}?api_key=${apiKey}`)
        );
        const favoriteMovies = await Promise.all(requests);
        console.log(favoriteMovies);
        // Process the favorite movies data here
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchFavoriteMovies();
  }, [favorite]);

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
