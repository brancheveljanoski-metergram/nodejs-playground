const express = require("express");
const movies = require("./controllers/movies.js");

const app = express();
const port = 5000;
app.use(express.json());

app.get("/movies/", movies.getMovies);

app.get("/movies/filtering", movies.filterMovies);

app.get("/movies/:imdbID", movies.getMovie);

app.get("/movies/information/length", movies.totalLength);

app.get("/movies/information/languages", movies.movieLanguages);

app.get("/movies/information/imdbUrls", movies.movieUrls);

app.get("/movies/information/votes", movies.movieVotes);

app.post("/movies", movies.newMovie);

app.delete("/movies/:imdbID", movies.movieDel);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
