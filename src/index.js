const express = require("express");
const HTTP = require("http-status-codes");
const MoviesRouter = require("./routes/movies.js");
const { config } = require("./config");

const app = express();

app.use(express.json());

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