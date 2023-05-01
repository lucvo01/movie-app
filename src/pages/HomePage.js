import React, {  useState, useEffect } from "react";
// import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
// import axios from "axios";
import apiService from "../app/apiService";
import { Alert, Box, Container, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import MovieList from "../components/MovieList";
import LoadingScreen from "../components/LoadingScreen";
import Typography from '@mui/material/Typography';
import Pagination  from '@mui/material/Pagination';
import GenreList from '../components/GenreList';

const apiKey = '096661a0ca80af081193ef63f856a4cf';
const movieListURL = "/list/28";
const genresURL = "/genre/movie/list";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultValues = {};
  const methods = useForm({ defaultValues });
  const { watch, reset } = methods;

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

        setGenres(resGenres.data.genres)
        console.log("Genres", resGenres.data.genres);
        
        setMovies(response.data.items);
        setError("");
        setTotalPages(Math.ceil(response.data.items.length/12))
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
    <Container>
      <Stack>
        <FormProvider methods={methods}>
          {/* <ProductFilter resetFilter={reset} /> */}
        </FormProvider>
        
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            {/* <ProductSearch />
            <ProductSort /> */}
          </Stack>
        </FormProvider>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                
                <MovieList movies={movies.slice(startIndex, endIndex)} />
            
              )}
            </>
          )}
        </Box>
        <Stack spacing={2}>
          <GenreList genres={genres}/>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalPages} page={page}  onChange={(event, value) => {
            setPage(value);
          }} />
    </Stack>
      </Stack>
    </Container>
  );
}

export default HomePage;
