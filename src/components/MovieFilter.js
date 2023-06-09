import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FRadioGroup, FSelect } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

function MovieFilter({ genres, resetFilter }) {
  return (
    <Stack
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      flexDirection={{ xs: "row", sm: "column" }}
    >
      <Box display={{ xs: "flex", sm: "none" }}>
        <FSelect name="genreName" size="small">
          <option disabled value="">
            <em>--Select Genre--</em>
          </option>
          {genres.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </FSelect>
      </Box>

      <Box
        spacing={1}
        display={{ xs: "none", sm: "flex" }}
        flexDirection="column"
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Genre
        </Typography>
        <FRadioGroup
          name="genreName"
          options={genres.map((item) => item.name)}
          row={false}
        />
      </Box>
      <Box>
        <Button
          size="medium"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Reset
        </Button>
      </Box>
    </Stack>
  );
}

export default MovieFilter;
