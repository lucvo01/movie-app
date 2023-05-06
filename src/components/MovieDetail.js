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
      <Box
        sx={{
          p: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2
        }}
      >
        {/* <CardActionArea>  */}
        <CardMedia
          sx={{ height: 600, width: 950, position: "relative" }}
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          title={movie.title}
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
        <Typography variant="h1" fontSize={30}>
          <b>{movie.title}</b> - <i>{movie.tagline}</i>
        </Typography>
        <Typography>
          <b>Overview:</b> {movie.overview}
        </Typography>
        <Typography>
          <b>Release Date:</b> {movie.release_date}
        </Typography>
        <Typography>
          <b>Tag line:</b> {movie.tagline}
        </Typography>
      </Box>
    </Stack>
  );
}

export default MovieDetail;
