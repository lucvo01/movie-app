import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "./form";

function MovieSearch({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ searchQuery: event.target.searchQuery.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FTextField
        name="searchQuery"
        sx={{ width: 300 }}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon onClick={handleSubmit} />
            </InputAdornment>
          )
        }}
      />
    </form>
  );
}
export default MovieSearch;
