import { CardActionArea, Stack, Fab } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import PlayIcon from "@mui/icons-material/Add";
import { BASE_URL } from "../app/config";

function MovieDetail({ movie }) {
  return (
    <Stack>
      {/* <CardActionArea>  */}
      <CardMedia
        sx={{ height: 600, width: 950 }}
        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        title="green iguana"
      />
      <Fab color="primary" aria-label="add">
        <PlayIcon />
      </Fab>
      {/* </CardActionArea> */}
      <Typography>
        <h1>{movie.title}</h1>
      </Typography>
      <Typography>
        <b>Release Date:</b> {movie.release_date}
      </Typography>
      <Typography>
        <b>Overview:</b> {movie.overview}
      </Typography>
      <Typography>
        <b>Tag line:</b> {movie.tagline}
      </Typography>
    </Stack>
  );
}

export default MovieDetail;
