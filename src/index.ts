import { Movie } from "./database/entities/Movie"; 
import express from"express";
import * as HTTP from "http-status-codes";
import MoviesRouter from "./routes/movies";
import { config } from "./config";

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


