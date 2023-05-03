import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import ImageListItem from "@mui/material/ImageListItem";
import { styled } from "@mui/material/styles";
// import { fCurrency } from "../utils";
// import apiService from "../app/apiService";
// import { BASE_URL } from "../app/config";

// Define the styles for the Card component
const StyledCard = styled(Card)({
  transition: "transition 0.2s",
  "&:hover": {
    transform: "scale(1.2)",
    zIndex: 1
  }
});

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          onClick={() =>
            navigate(`/movie/${movie.id}`)
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
          </Stack>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

export default MovieCard;
