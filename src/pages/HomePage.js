import React, { useNavigate, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import apiService from "../app/apiService";
import { Alert, Box, Container, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import MovieList from "../components/MovieList";
import LoadingScreen from "../components/LoadingScreen";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultValues = {};
  const methods = useForm({ defaultValues });
  const { watch, reset } = methods;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          "/list/651?api_key=096661a0ca80af081193ef63f856a4cf"
        );
        setMovies(response.data.items);
        setError("");
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
                <MovieList movies={movies} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default HomePage;
