const typeorm = require("typeorm");
const Movie = require("./models/movie").Movie;


const movie = new Movie(1, 'My Title', 2022, 95, 9.3, 5000);
const movie2 = new Movie(2, 'My Title', 2022, 95, 9.3, 5000);

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

dataSource
    .initialize()
    .then(() => {

        let movieRepo = dataSource.getRepository('Movie');

        dataSource.manager.save([movie, movie2])
            // movieRepo.save()
            .then((savedMovies) => {
                console.log(`Saved movies: ${savedMovies}`);

                return movieRepo.find();
            })
            .then((allMovies) => {
                console.log(`All movies: ${allMovies}`);
            })
    })
    .catch((error) => {
        console.log(error);
    })
