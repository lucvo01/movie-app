import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import { Alert, Box, Container, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import MovieList from "../components/MovieList";
import LoadingScreen from "../components/LoadingScreen";
// import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
// import GenreList from "../components/GenreList";
import MovieFilter from "../components/MovieFilter";
import MovieSearch from "../components/MovieSearch";

const apiKey = "096661a0ca80af081193ef63f856a4cf";
// const movieListURL = "/list/28";
const moviePopularURL = "/movie/popular";
const genresURL = "/genre/movie/list";
const searchURL = "/search/multi";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const methods = useForm();
  const { watch, reset } = methods;
  const filters = watch();
  const { filteredMovies, q } = applyFilter(movies, filters, genres);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredMovies.length / 12);

  const startIndex = (page - 1) * 12;
  const endIndex = startIndex + 12;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const resPopular = await apiService.get(
          `${moviePopularURL}?api_key=${apiKey}`
        );

        const resGenres = await apiService.get(
          `${genresURL}?api_key=${apiKey}`
        );
        setGenres(resGenres.data.genres);
        console.log("Genres", resGenres.data.genres);

        if (q) {
          const resSearch = await apiService.get(
            `${searchURL}?api_key=${apiKey}&query=${q}`
          );
          setMovies(resSearch.data.results);
        } else {
          setMovies(resPopular.data.items);
        }
        // console.log("Movies", response.data.items);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, [q]);

  return (
    <Container sx={{ display: "flex" }}>
      <Stack>
        <FormProvider methods={methods}>
          <MovieFilter genres={genres} resetFilter={reset} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <MovieSearch />
        </FormProvider>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <MovieList
                    movies={filteredMovies.slice(startIndex, endIndex)}
                  />
                </>
              )}
            </>
          )}
        </Box>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
          />
        </Stack>
      </Stack>
    </Container>
  );
}

export default HomePage;

function applyFilter(movies, filters, genres) {
  let filteredMovies = movies;
  let q = "";
  if (filters.genreName) {
    const genreId = genres.find((genre) => genre.name === filters.genreName).id;
    filteredMovies = movies.filter((movie) =>
      movie.genre_ids.includes(genreId)
    );
  }

  if (filters.searchQuery) {
    q = filters.searchQuery;
  }

  return { filteredMovies, q };
}
