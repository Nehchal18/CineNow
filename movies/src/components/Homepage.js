import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import MoviesItem from "./Movies/MoviesItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
console.log(movies);
  return (
    <Box width="100%" height="100%" marginTop={2}>
      <Box margin={"auto"} width={"80%"} height={"40vh"} padding={2}>
        <img
          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
          alt="movie"
          width="100%"
          height="100%"
        />
      </Box>
      <Box padding={5} margin={"auto"}>
        <Typography variant="h4" align="center" textAlign={"center"}>
          Latest release
        </Typography>
      </Box>
      <Box
        display={"flex"}
        width={"80%"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        margin={"auto"}
      >
        {movies && movies.slice(0,4).map((movie, index) => (
          <MoviesItem
            id={movie._id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            posterUrl={movie.posterUrl}
          />
        ))}
      </Box>
      <Box display={"flex"} padding={5} margin={"auto"}>
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default Homepage;
