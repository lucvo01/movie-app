import { Stack, Fab, Button, Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function MovieDetail({ movie }) {
  const [favoriteList, setFavoriteList] = useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );
  // const isFavorite = favoriteList.includes(movie.id);
  const [favorite, setFavorite] = useState(favoriteList.includes(movie.id));

  const handleClick = () => {
    setFavorite(!favorite);
  };

  useEffect(() => {
    console.log(favorite);
    if (favorite && !favoriteList.includes(movie.id)) {
      favoriteList.push(movie.id);
      window.localStorage.setItem("favorite", JSON.stringify(favoriteList));
    }
    if (!favorite && favoriteList.includes(movie.id)) {
      const newFavoriteList = favoriteList.filter((item) => item !== movie.id);
      window.localStorage.setItem("favorite", JSON.stringify(newFavoriteList));
      setFavoriteList(newFavoriteList);
    }
  }, [favorite]);

  return (
    <Stack>
      {/* <CardActionArea>  */}
      <CardMedia
        sx={{ height: 600, width: 950, position: "relative" }}
        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        title="green iguana"
      >
        <Box
          onClick={handleClick}
          sx={{
            position: "absolute",
            bottom: 50,
            right: "50px",
            zIndex: 1
          }}
        >
          {favorite ? (
            <Fab color="primary" aria-label="add">
              <FavoriteIcon />
            </Fab>
          ) : (
            <Fab color="primary" aria-label="minus">
              <FavoriteBorderIcon />
            </Fab>
          )}
        </Box>
      </CardMedia>

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
