import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

function MovieFilter({ genres, resetFilter }) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Genre
      </Typography>
      <FRadioGroup
        name="genreName"
        options={genres.map((item) => item.name)}
        row={false}
        onClick={(event) => console.log(event.target.id)}
      />
      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default MovieFilter;
