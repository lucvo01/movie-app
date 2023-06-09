import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import { Alert, Box, Button, Grid, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import MovieList from "../components/MovieList";
import LoadingScreen from "../components/LoadingScreen";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import MovieFilter from "../components/MovieFilter";
import MovieSearch from "../components/MovieSearch";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useFilter from "../hooks/useFilter";

const apiKey = "096661a0ca80af081193ef63f856a4cf";
const moviePopularURL = "/movie/popular";
const genresURL = "/genre/movie/list";
const searchURL = "/search/multi";

function HomePage() {
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
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
    }
  }, [searchParams, methods]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const totalPages = Math.ceil(filteredMovies.length / 12);
  // const startIndex = (page - 1) * 20;
  // const endIndex = startIndex + 20;
  const genreId = filters.genreName
    ? genres.find((genre) => genre.name === filters.genreName)?.id
    : null;

  useEffect(() => {
    if (favorite) {
      const favoriteList = JSON.parse(window.localStorage.getItem("favorite"));
      const fetchFavoriteMovies = async () => {
        try {
          let response = [];
          console.log("favoriteList", favoriteList);
          response = favoriteList.map((id) =>
            apiService.get(`movie/${id}?api_key=${apiKey}`)
          );
          let favoriteMovies = await Promise.all(response);

          favoriteMovies = favoriteMovies.map((el) => {
            return el.data;
          });
          setFavoriteMovies(favoriteMovies);
          console.log("favoriteMovies", favoriteMovies);
        } catch (error) {
          console.error("Error fetching favorite movies:", error);
        }
      };
      fetchFavoriteMovies();
    }
  }, [favorite]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const resGenres = await apiService.get(
          `${genresURL}?api_key=${apiKey}`
        );
        setGenres(resGenres.data.genres);
        // console.log("Genres", resGenres.data.genres);

        if (q) {
          const resSearch = await apiService.get(
            `${searchURL}?api_key=${apiKey}&query=${q}&page=${page}`
          );
          setMovies(resSearch.data.results);
          setTotalPages(resSearch.data.total_pages);
          // console.log("Search", resSearch.data.results);
        } else {
          const resPopular = await apiService.get(
            `${moviePopularURL}?api_key=${apiKey}&page=${page}${
              genreId ? `&with_genres=${genreId}` : ""
            }`
          );

          setMovies(resPopular.data.results);
          setTotalPages(resPopular.data.total_pages);
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
  }, [q, filters.genreName, genreId, page]);

  return (
    <Grid container className="movie-list">
      <Grid xs={12}>
        <Stack
          marginTop={3}
          direction={{ xs: "column", sm: "row" }}
          // divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          padding={5}
          paddingTop={0}
        >
          {favorite ? (
            <></>
          ) : (
            <Box>
              <FormProvider methods={methods}>
                <MovieFilter genres={genres} resetFilter={reset} />
              </FormProvider>
            </Box>
          )}

          <Box sx={{ flexGrow: 1, gap: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "5px"
              }}
              flexDirection={{
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row"
              }}
            >
              {favorite ? (
                <></>
              ) : (
                <FormProvider methods={methods}>
                  <MovieSearch />
                </FormProvider>
              )}

              <Button
                onClick={() => setFavorite(!favorite)}
                sx={{
                  color: theme.palette.primary.lighter,
                  backgroundColor: theme.palette.primary.dark
                }}
              >
                <b>Favorite</b>
              </Button>
            </Box>
            <Box
              sx={{
                position: "relative",
                height: 1
              }}
            >
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
                          <Typography
                            variant="h4"
                            sx={{ fontWeight: 600, fontSize: "1.5em" }}
                          >
                            Favorite Movies
                          </Typography>
                          <MovieList movies={favoriteMovies} />
                        </>
                      ) : (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "5px"
                            }}
                            flexDirection={{
                              xs: "column",
                              sm: "column",
                              md: "row",
                              lg: "row"
                            }}
                          ></Box>
                          {/* <Typography
                            variant="h4"
                            sx={{ fontWeight: 600, fontSize: "1.5em" }}
                          >
                            Popular Movies
                          </Typography> */}
                          <MovieList movies={filteredMovies} />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              paddingTop: "50px"
                            }}
                          >
                            <Pagination
                              count={totalPages}
                              page={page}
                              onChange={(event, value) => {
                                setPage(value);
                              }}
                            />
                          </Box>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default HomePage;
