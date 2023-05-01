import {useState, useEffect}from "react";
import apiService from '../app/apiService';
function FetchData({page}) {

const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

// const [page, setPage] = useState(1);
  const totalPages = Math.ceil(movies.length/15);
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex * 10;

  useEffect(() => {
    const apiKey = '096661a0ca80af081193ef63f856a4cf';
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/list/28?api_key=${apiKey}`
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
  }, [page]);

  return {movies: movies.slice(startIndex, endIndex), totalPages, loading, error};
}
export default FetchData;
