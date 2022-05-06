class Movie {
    constructor(id, title, year, runtime, imdbRating, imdbVotes) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.imdbRating = imdbRating;
        this.imdbVotes = imdbVotes;
    }
}

module.exports = { Movie: Movie }