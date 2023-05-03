// import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import apiService from "../app/apiService";


const apiKey = "096661a0ca80af081193ef63f856a4cf";
// const searchURL = "/search/multi";

function SearchResults({q}) {
    //  let params = useParams();
     const [movies, setMovies] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

    useEffect(() => {
      const fetch = async () => {
        setLoading(true);
        try {
          const resSearch = await apiService.get(
            `?api_key=${apiKey}&query=${q}`
          );
          setMovies(resSearch.data.results);
          console.log("Search", resSearch.data.results);
          console.log("Search", `?api_key=${apiKey}&query=${q}`);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      fetch();
    }, [q]);

  return <>{movies}</>;
}

export default SearchResults;
