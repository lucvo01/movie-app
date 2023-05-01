import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import apiService from "../app/apiService";

function DetailPage({ movie }) {
  let params = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/${movie.id}?api_key=096661a0ca80af081193ef63f856a4cf&language=en-US`
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
    <div>
      <h1>DetailPage - MovieId: {params.id}</h1>
    </div>
  );
}

export default DetailPage;
