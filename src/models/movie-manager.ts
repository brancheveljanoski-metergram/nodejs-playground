import { EntityManager, Repository } from "typeorm";
import { Movie } from "../database/entities/Movie";
import movies from "../movies.json";

import { validateMovie } from '../validation/validation-schema';

export interface GetMoviesQuery {
    actor?: string;
    genre?: string[];
    imdbSort?: string;
}

export class MovieManager {

    private readonly moviesTable: Repository<Movie>;

    constructor(private readonly tx: EntityManager) {
        this.moviesTable = this.tx.getRepository(Movie);
    }

    async getMovies(): Promise<{ entities: Movie[]; total: number }> {
        const [entities, total] = await this.moviesTable.findAndCount();

        return { entities, total };

    }

    async getSpecificMovieById(id: string): Promise<Movie> {
        const movie = await this.moviesTable.findOne(id)

        if (movie) {
            return movie;
        }
        throw new Error("Movie does not exist!")
    }

    sortMoviesByRating(movieList: any) {
        const sortedMovies = movieList.sort((movie1, movie2) => movie1.imdbRating - movie2.imdbRating);
        const result = sortedMovies.map(movie => ({ Title: movie.Title, imdbRating: movie.imdbRating }))

        return result;

    }

    getMoviesData() {
        return {
            totalLengthOfAllMovies: movies.reduce(
                (totalLength, movie) => movie.Runtime !== 'N/A'
                    ? totalLength + parseInt(movie.Runtime)
                    : totalLength,
                0
            ),
            imdbUrls: movies.map(movie => `https://www.imdb.com/title/${movie.imdbID}`),
            totalImdbVotes: movies.reduce(
                (totalVotes, movie) =>
                    movie.imdbVotes !== 'N/A'
                        ? totalVotes + parseInt(movie.imdbVotes.replace(/[^0-9]/g, ''))
                        : totalVotes,
                0
            ),
            allLanguagues: [...new Set(
                movies.reduce((languages: string[], movie) => languages.concat(movie.Language.split(', ')), [])
            )]
        };
    }

    async addNewMovie(newMovie: any): Promise<Movie> {

        if (!validateMovie.validate(newMovie)) {
            throw new Error("Invalid movie!")
        }

        try {
            return this.moviesTable.save(newMovie)
        } catch (error) {
            console.log(error);
            throw new Error("Faild to add new movie!");
        }
    }


    editExistingMovie(movie: Movie) {
        const found = this.moviesTable.find()

        if (!found) {
            return ({ msg: `No movie with the actor name of ${movie.title}` })
        }

        this.moviesTable.update(movie.title, movie)
        return { success: true }
    }

    async deleteMovie(movie: any) {
        //find movie
        //check if it exists 
        const exists = this.moviesTable.find(movie)
        if (exists) {
            if (!validateMovie) {
                throw new Error("Movie does not exist")
            }

            try {
                await this.moviesTable.remove(movie)
            } catch (error) {
                console.log(error);
                throw new Error("Faild to delete movie");
            }
        }
        throw new Error("Movie does not exist")
    }
}

