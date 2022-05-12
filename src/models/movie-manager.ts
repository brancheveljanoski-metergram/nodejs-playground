import { EntityManager, Repository } from "typeorm";
import {Movie} from "../entity/Movie";
import movies from "../movies.json";

import {validateMovie} from '../validation/validation-schema';


//interface Movie{
//   id: string;
//}

export class MovieManager {
    
    private readonly moviesTable: Repository<Movie>;

    constructor(private readonly tx: EntityManager) {
        this.moviesTable = this.tx.getRepository(Movie);
    }

    async getMovies(): Promise<{ entities: Movie[]; total: number }> {
        const [entities, total] = await this.moviesTable.findAndCount();

        return { entities, total };
    }

    sortMoviesByRating(movieList) {
        const sortedMovies = movieList.sort((movie1, movie2) => movie1.imdbRating - movie2.imdbRating);
        const result = sortedMovies.map(movie => ({ Title: movie.Title, imdbRating: movie.imdbRating }))

        return result;

    }

    async getSpecificMovieById(id:string):Promise<Movie> {
        const movie = await this.moviesTable.findOneBy({imbdId: id})

        if(movie){
            return movie;
        }
        throw new Error("Movie does not exist!")
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

    addNewMovie(newMovie):Promise<Movie> {
      
        if(!validateMovie.validate(newMovie)){
            throw new Error("Invalid movie!")
        }

        try{
            return this.moviesTable.save(newMovie)
        }catch(error){
            console.log(error);
            throw new Error("Faild to add new movie!");
        }
    }

    editExistingMovie(movieToEdit) {
        const found = movies.some(movie => movie.Title === movieToEdit.title)

        if (found) {
            const updMovie = req.body;
            movies.forEach(movie => {
                if (movie.Title === movieToEdit.title) {
                    movie.Title = updMovie.Title ? updMovie.Title : movie.Title;
                    movie.Genre = updMovie.Genre ? updMovie.Genre : movie.Genre;

                    return ({ msg: 'Movie updated', movie })
                }
            })
        } else {
            return ({ msg: `No movie with the actor name of ${movieToEdit.title}` })
        }
    }

    deleteMovie(movie) {
        //find movie
        //check if it exists 
        if(!validateMovie){
            throw new Error("Movie does not exist")
        }

        try{
            return this.moviesTable.remove(movie)
        }catch(error){
            console.log(error);
            throw new Error("Faild to delete movie");
        }
        
    }
}

