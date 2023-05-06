import React, { useState, useEffect, useContext } from "react";
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
// import  '../App.css';
import Switch from "@mui/material/Switch";
// import FavoriteSwitch from "../components/FavoriteSwitch";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

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
  let [searchParams, setSearchParams] = useSearchParams();

  const defaultValues = {};
  const methods = useForm({ defaultValues });
  const { watch, reset } = methods;
  const filters = watch();
  const { filteredMovies, q } = applyFilter(movies, filters, genres, favorite);

  useEffect(() => {
    if (searchParams.get("query")) {
      methods.setValue("query", searchParams.get("query"));
    }
  }, []);

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
        console.log("Popular", resPopular.data.results);

        if (q) {
          const resSearch = await apiService.get(
            `${searchURL}?api_key=${apiKey}&query=${q}`
          );
          setMovies(resSearch.data.results);
          console.log("Search", resSearch.data.results);
        } else {
          setMovies(resPopular.data.results);
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
    <Container sx={{ display: "flex" }} className="movie-list">
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
              {/* <Switch
              label="Favorite"
              // checked={checked}
              onChange={() => setFavorite(!favorite)}
              inputProps={{ "aria-label": "controlled" }}
            /> */}
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

function applyFilter(movies, filters, genres, favorite) {
  let filteredMovies = movies;
  let q = "";
  if (filters.genreName) {
    const genreId = genres.find((genre) => genre.name === filters.genreName).id;
    filteredMovies = movies.filter((movie) =>
      movie.genre_ids.includes(genreId)
    );
  }

  if (filters.query) {
    q = filters.query;
  }

  if (favorite) {
    const favoriteList = window.localStorage.getItem("favorite");
    filteredMovies = movies.filter(
      (movie) => favoriteList && favoriteList.includes(movie.id)
    );
    if (filters.genreName) {
      const genreId = genres.find(
        (genre) => genre.name === filters.genreName
      ).id;
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
    }
  }

  return { filteredMovies, q };
}
