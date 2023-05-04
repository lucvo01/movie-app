import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieList({setFavoriteList, movies, loading}) {
  return (
    <Grid container spacing={2} mt={1}>
      {movies.map((movie, index) => (
        <Grid key={movie.id} item xs={6} md={4} lg={3}>
          <MovieCard movie={movie} setFavoriteList={setFavoriteList} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieList;
