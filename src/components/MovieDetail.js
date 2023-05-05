import { Stack, Fab, Button } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function MovieDetail({ movie }) {
  // let defaultList = JSON.parse(localStorage.setItem("favorite", []));

  const [favoriteList, setFavoriteList] = useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );
  const [favorite, setFavorite] = useState(false);

  const handleClick = () => {
    setFavorite(!favorite);
  };

  useEffect(() => {
    if (favorite && !favoriteList.includes(movie.id)) {
      favoriteList.push(movie.id);
      window.localStorage.setItem("favorite", JSON.stringify(favoriteList));
    }
    if (!favorite && favoriteList.includes(movie.id)) {
      const newFavoriteList = favoriteList.filter((item) => item !== movie.id);
      window.localStorage.setItem("favorite", JSON.stringify(newFavoriteList));
      setFavoriteList(newFavoriteList);
    }
  }, [favorite, movie.id]);

  return (
    <Stack>
      {/* <CardActionArea>  */}
      <CardMedia
        sx={{ height: 600, width: 950 }}
        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        title="green iguana"
      />
      <Button onClick={handleClick}>
        {favorite ? (
          <Fab color="primary" aria-label="add">
            <FavoriteIcon />
          </Fab>
        ) : (
          <Fab color="primary" aria-label="minus">
            <FavoriteBorderIcon />
          </Fab>
        )}
      </Button>

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
