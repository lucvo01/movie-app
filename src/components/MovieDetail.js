import { Stack, Fab, Box, Chip } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";

function MovieDetail({ movie }) {
  const theme = useTheme();
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
  }, [favorite, movie.id, favoriteList]);

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
          sx={{
            position: "relative"
          }}
          title={movie.title}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
            width="100%"
          />
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
          <b>Duration:</b> {movie.runtime} minutes
          <br />
          <b>Release Date:</b> {movie.release_date}
          <br />
          <b>Tag line:</b> {movie.tagline}
        </Typography>
        <Typography>
          <b>Genres:</b>{" "}
          {movie.genres.map((genre) => (
            <Chip
              label={`${genre.name}`}
              sx={{ color: theme.palette.primary.light }}
            />
          ))}
        </Typography>
      </Box>
    </Stack>
  );
}

export default MovieDetail;
