import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import { Alert, Box, Button, Container, Stack, Divider } from "@mui/material";
import { FormProvider } from "../components/form";
import MovieList from "../components/MovieList";
import LoadingScreen from "../components/LoadingScreen";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import MovieFilter from "../components/MovieFilter";
import MovieSearch from "../components/MovieSearch";
import  '../App.css';
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useFilter from "../hooks/useFilter";

const apiKey = "096661a0ca80af081193ef63f856a4cf";
// const movieListURL = "/list/28";
const moviePopularURL = "/movie/popular";
const genresURL = "/genre/movie/list";
const searchURL = "/search/multi";

function HomePage() {
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);
  let [searchParams] = useSearchParams();

  const defaultValues = { genreName: "", query: "" };
  const methods = useForm({ defaultValues });
  const { watch, reset } = methods;
  const filters = watch();
  const { filteredMovies, q } = useFilter(movies, filters, genres, favorite);

  useEffect(() => {
    if (searchParams.get("query")) {
      methods.setValue("query", searchParams.get("query"));
      // console.log("searchParams", searchParams.get("query"));
    }
  }, [searchParams, methods]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const totalPages = Math.ceil(filteredMovies.length / 12);
  const startIndex = (page - 1) * 20;
  const endIndex = startIndex + 20;
  const genreId = filters.genreName ? genres.find(genre => genre.name === filters.genreName)?.id : null;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
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
          setTotalPages(resSearch.data.total_pages)
          console.log("Search", resSearch.data.results);
        } else {
          
          const resPopular = await apiService.get(
            `${moviePopularURL}?api_key=${apiKey}${genreId ? `&with_genres=${genreId}` : ''}`);
          // const resPopular = await apiService.get(
          //   `${moviePopularURL}?api_key=${apiKey}`
          // );
          setMovies(resPopular.data.results);
          setTotalPages(resPopular.data.total_pages)
          console.log("Popular", resPopular.data.results);
        }
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, [q, filters.genreName, genreId]);

  return (
    <Container className="movie-list">
      <Stack
        marginTop={3}
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={5}
      >
        <Stack>
          <FormProvider methods={methods}>
            <MovieFilter genres={genres} resetFilter={reset} />
          </FormProvider>
        </Stack>
        <Stack sx={{ flexGrow: 1, gap: 3 }}>
          <Stack
            sx={{
              alignItems: "center"
            }}
          >
            <Box>
              <FormProvider methods={methods}>
                <MovieSearch />
                <Button
                  onClick={() => setFavorite(!favorite)}
                  sx={{
                    marginLeft: 2,
                    color: theme.palette.primary.lighter,
                    backgroundColor: theme.palette.primary.dark
                  }}
                >
                  <b>Favorite</b>
                </Button>
              </FormProvider>
            </Box>
          </Stack>
          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <>
                    {favorite ? (
                      <>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                          Favorite Movies
                        </Typography>
                        <MovieList
                          movies={filteredMovies.slice(startIndex, endIndex)}
                        />
                      </>
                    ) : (
                      <>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                          Popular Movies
                        </Typography>
                        <MovieList
                          movies={filteredMovies.slice(startIndex, endIndex)}
                        />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Box>
          <Stack sx={{ alignItems: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => {
                setPage(value);
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export default HomePage;

// function applyFilter(movies, filters, genres, favorite) {
//   const { genreName, query } = filters;
//   let filteredMovies = movies;
//   let q = "";
//   if (genreName) {
//     const genreId = genres.find((genre) => genre.name === genreName).id;
//     filteredMovies = filteredMovies.filter(
//       (movie) => movie && movie.genre_ids && movie.genre_ids.includes(genreId)
//     );
//   }

//   if (query) {
//     q = query;
//   }

//   if (favorite) {
//     const favoriteList = window.localStorage.getItem("favorite");
//     filteredMovies = movies.filter(
//       (movie) => favoriteList && favoriteList.includes(movie.id)
//     );
//     if (genreName) {
//       const genreId = genres.find(
//         (genre) => genre.name === filters.genreName
//       ).id;
//       filteredMovies = filteredMovies.filter(
//         (movie) => movie && movie.genre_ids && movie.genre_ids.includes(genreId)
//       );
//     }
//   }

//   return { filteredMovies, q };
// }
