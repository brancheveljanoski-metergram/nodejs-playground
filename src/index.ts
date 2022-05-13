import express from"express";
import * as HTTP from "http-status-codes";
import MoviesRouter from "./routes/movies";
import { config } from "./config";
import { DatabaseConnection } from "./database/connection";

const app = express();

app.use(express.json());

app.get("/", (_, res) =>
    res.status(200).json({
        message: HTTP.getStatusText(HTTP.StatusCodes.OK),
        status: HTTP.StatusCodes.OK
    })
);

app.use("/movies", MoviesRouter);

async function startServer() {
    // test db connection
    await new DatabaseConnection().getEntityManager();
    app.listen(config.PORT, () => {
        console.log(`Server listening on port ${config.PORT}`);
    });
}

startServer();
