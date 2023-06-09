import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
// import { fCurrency } from "../utils";

const StyledCard = styled(Card)({
  position: "relative",
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
      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardMedia
          component="img"
  
          image={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {movie.title}
          </Typography>

        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

export default MovieCard;
