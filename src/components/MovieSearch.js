import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "./form";
// import { useState } from "react";

function MovieSearch({ onSubmit }) {

  return (
 <form onSubmit={onSubmit}>
      <FTextField 
        name="query"
        sx={{ width: 300 }}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
</form>
  );
}
export default MovieSearch;
