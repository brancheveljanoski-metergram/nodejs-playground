const typeorm = require("typeorm");
const Movie = require("./models/movie").Movie;

typeorm.createConnection({
    type: "postgres",
    host: "localhost",
    port: 3000,
    username: "postgres",
    password: "privremen",
    database: "Movie",
    synchronize: true,
    logging: false,
    entities: [
        require("./entity/movie-schema")
    ]
}).then(function (connection) {

    const movie = new Movie(1, 'My Title', 2022, 95, 9.3, 5000);
    const movie2 = new Movie(2, 'My Title', 2022, 95, 9.3, 5000);

    return connection
        .manager
        .then(() => {

            let movieRepo = connection.getRepository(Movie);
            movieRepo.save([movie, movie2])
                .then(function (savedMovie) {
                    console.log("Post has been saved: ", savedMovie);
                    console.log("Now lets load all posts: ");
                    return movieRepo.find();
                })
                .then(function (allMovies) {
                    console.log("All posts: ", allMovies);
                });
        });

}).catch(function (error) {
    console.log("Error: ", error);
});