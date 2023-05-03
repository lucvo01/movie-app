import apiService from "./jobs.json";
import React, { useState, useEffect } from "react";

async function getMovies(page, q = null) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  try {
    const response = await apiService.get(`${movieListURL}?api_key=${apiKey}`);
    const resGenres = await apiService.get(`${genresURL}?api_key=${apiKey}`);
    setGenres(resGenres.data.genres);
    console.log("Genres", resGenres.data.genres);

    setMovies(response.data.items);
    console.log("Movies", response.data.items);

    // setError("");
  } catch (error) {
    console.log(error);
    // setError(error.message);
  }
  const totalPages = Math.ceil(filteredMovies.length / 12);
  const startIndex = (page - 1) * 12;
  const endIndex = startIndex + 12;


  if (q) {
    let filteredMovies = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.description.includes(q) ||
        job.city.includes(q) ||
        job.skills.some((skill) => skill.includes(q))
    );
    return { jobs: filteredMovies, pagesTotal: 1 };
  } else {
    return { jobs: jobs.slice(startIndex, endIndex), totalPages };
  }
}

async function getMovie(id) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
  await promise;

  return jobs.find((job) => job.id === id);
}
const api = { getMovies, getMovie };

export default api;
