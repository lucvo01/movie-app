import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { fCurrency } from "../utils";
import apiService from "../app/apiService";
import { BASE_URL } from "../app/config";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=096661a0ca80af081193ef63f856a4cf&language=en-US/${movie.backdrop_path}`}
          onClick={() =>
            // console.log(
            //   `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=096661a0ca80af081193ef63f856a4cf&language=en-US/${movie.backdrop_path}`
            // )
            navigate(`/move/${movie.id}`)
          }
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {movie.title}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography component="span" sx={{}}>
              Release Date: {movie.release_date}
            </Typography>
            {/* {movie.priceSale && (
              <Typography
                component="span"
                sx={{ color: "text.disabled", textDecoration: "line-through" }}
              >
                {fCurrency(movie.budget)}
              </Typography>
            )} */}
            {/* <Typography variant="subtitle1">
              {fCurrency(movie.price)}
            </Typography> */}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
