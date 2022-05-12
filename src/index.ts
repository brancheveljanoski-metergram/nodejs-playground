import { AppDataSource } from "./data-source";
import { Movie } from "./entity/Movie"; 

import express = require("express");
const app = express();
app.use(express.json());

import HTTP = require("http-status-codes");

import MoviesRouter = require("./routes/movies");
import { config } from "./config";

const metadata=require("reflect-metadata") 

app.get("/", (_, res) =>
    res.status(200).json({
        message: HTTP.getStatusText(HTTP.StatusCodes.OK),
        status: HTTP.StatusCodes.OK
    })
);

app.use("/movies", MoviesRouter);

app.listen(config.PORT, () => {
    console.log(`Server listening on port ${config.PORT}`);
});

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const movie = new Movie()
    movie.title = "Avatar"
    movie.year = 2021
    movie.runtime = 25
    movie.imdbRating = 7.2
    movie.imdbVotes = 4
    await AppDataSource.manager.save(movie)
    console.log("Saved a new user with id: " + movie.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(Movie)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
