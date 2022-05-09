const express = require('express');
const path = require('path');
const moviesRouter = require('./routes/movies-router');

const typeorm = require("typeorm");
const Movie = require("./models/movie").Movie;

const app = express();
const port = 3001;

let dataSource = new typeorm.DataSource({
    type: "postgres",
    host: "localhost",
    port: 3000,
    username: "postgres",
    password: "privremen",
    database: "Movie",
    synchronize: true,
    entities: [require("./entity/movie-schema")],
});

const ds = {
    source: null,
    promise: null
}
ds.promise = dataSource.initialize().then(() => { ds.source = dataSource.getRepository('Movie') });


app.use(express.json());
app.use(express.static(path.resolve('./public')));

app.use('/movies', moviesRouter);


app.all('*', (req, res) => {
    res.status(404).sendFile(path.resolve('./public/notFound.html'));
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
})

module.exports = ds;