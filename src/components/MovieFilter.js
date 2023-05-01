import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";


function MovieFilter({genres}) {
    
  return (<Stack>
    <Typography>Genre</Typography>
    <FRadioGroup 
            name="Genre"
          options={genres.map((item) => item.name)}
          row={false}/>
  </Stack>);
}

export default MovieFilter;
