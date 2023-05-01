import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import { Alert, Box, Container, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import MovieList from "../components/MovieList";
import LoadingScreen from "../components/LoadingScreen";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
// import GenreList from "../components/GenreList";
import MovieFilter from "../components/MovieFilter";

const apiKey = "096661a0ca80af081193ef63f856a4cf";
const movieListURL = "/list/28";
const genresURL = "/genre/movie/list";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultValues = {};
  const methods = useForm();
  const { watch, reset } = methods;
  const filters = watch();
  const filteredMovies = applyFilter(movies, filters);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const startIndex = (page - 1) * 12;
  const endIndex = startIndex + 12;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `${movieListURL}?api_key=${apiKey}`
        );
        const resGenres = await apiService.get(
          `${genresURL}?api_key=${apiKey}`
        );

        setGenres(resGenres.data.genres);
        console.log("Genres", resGenres.data.genres);

        setMovies(response.data.items);
        setError("");
        setTotalPages(Math.ceil(response.data.items.length / 12));
        console.log(response.data.items.slice(0, 12));
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Container sx={{ display: "flex" }}>
      <Stack>
        {/* <GenreList genres={genres} /> */}
        <FormProvider methods={methods}>
          <MovieFilter genres={genres} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        {/* <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}>
            <ProductSearch />
            <ProductSort />
          </Stack>
        </FormProvider> */}
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <MovieList movies={movies.slice(startIndex, endIndex)} />
                </>
              )}
            </>
          )}
        </Box>
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
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

function applyFilter(movies, filters) {
  let filteredMovies = movies;
  if(filters.genre.length > 0){
    filteredMovies = movies.filter((movie) =>
      filters.genre.includes(movie.genre_ids)
    );
  }
  return filteredMovies;
}