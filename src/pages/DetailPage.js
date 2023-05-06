import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import apiService from "../app/apiService";
import MovieDetail from "../components/MovieDetail";
import { Container } from "@mui/material";

function DetailPage() {
  let params = useParams();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/${params.id}?api_key=096661a0ca80af081193ef63f856a4cf&language=en-US`
        );
        setMovie(response.data);
        setError("");
        console.log("Movie Detail", response.data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      {movie && <MovieDetail movie={movie} />}
    </Container>
  );
}

export default DetailPage;
