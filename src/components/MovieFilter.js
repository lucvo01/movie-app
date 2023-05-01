import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

function MovieFilter({ genres }) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Genre
      </Typography>
      <FRadioGroup
        name="genre"
        options={genres.map((item) => item.name)}
        row={false}
      />
    </Stack>
  );
}

export default MovieFilter;
