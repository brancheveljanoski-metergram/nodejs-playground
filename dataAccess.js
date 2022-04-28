const { json } = require('express/lib/response');
const fs = require('fs');

let path = './movies.json';
const rawData = fs.readFileSync(path);
let movies = JSON.parse(rawData);


//---------------------JSON Reading-----------------------

function getAll(){
    return movies;
}

function getByID(ID){
   const movie = movies.find(movie => movie.imdbID == ID);
   movie;
}

function getByGenre(genre){
    const genreMovies = movies.filter(movie =>movie.Genre.includes(genre));
    genreMovies;
}

function getByActor(actor){
    const actorMovies = movies.filter(movie =>movie.Actors.includes(actor));
    actorMovies;
}

function sortByRating(isASC){
    let sortedMovies;

    if(isASC){
        sortedMovies=movies
        .sort((movieA, movieB) => movieA.imdbRating - movieB.imdbRating)
    }else{
        sortedMovies=movies
        .sort((movieA, movieB) => movieB.imdbRating - movieA.imdbRating)
    }
    
    const movieTitleAndRating = sortedMovies
    .map(m => {return {Title: m.Title, imdbRating: m.imdbRating}})

    return movieTitleAndRating;
}

function totalLengthOfMovies(){
    const totalLen = movies.reduce((total, movie)=> {
        const movieLen= parseInt(movie.Runtime);
        return !isNaN(movieLen) ? movieLen + total : total;
    }, 0)

    return totalLen;
}

function getUrls(){
    const urls = movies.map(movie => {
        return `https://www.imdb.com/title/${movie.imdbID}/`;
    });

    return urls;
}


function totalImdbVotes(){
    const totalVotes = movies.reduce((total, movie) => {
        const movieVotes = parseInt(movie.imdbVotes.replace(/,/g, ''));
        return !isNaN(movieVotes) ? movieVotes + total : total;
    }, 0);

    return totalVotes;
}

function allLanguagues(){
    const allLanguages = movies.reduce((languages, movie)=> {
        return languages.concat(movie.Language.split(", "));
    }, languages = [])

    return [...new Set(allLanguages)];
}


//----------------------JSON Writing----------------

function writeToJSON(data){
    fs.writeFile(path, JSON.stringify(data, null, "\t"), (err)=>{
        if(err) return false;
    });

    return true;
}

function addMovie(newMovie){
    if(getByID(newMovie.imdbID) != undefined){
        console.log(false);
        return false;
    }
    movies.push(newMovie);
    
    if(writeToJSON(movies)) {
        return true
    };
    
    return false;
    
}


function editMovie(editedMovie){
    const movieIndex = movies.findIndex(movie => movie.imdbID == editedMovie.imdbID);
    movies[movieIndex] = editedMovie;

    if(writeToJSON(movies)) {
        return true
    };

    return false;
}

function deleteMovie(movieID){
    const movieIndex = movies.findIndex(movie => movie.imdbID == movieID);
    if(movieIndex != -1){
        movies.splice(movieIndex, 1);
        if(writeToJSON(movies)) {
            return true
        };

        return false;
    }

    return false;
}



module.exports = {getAll, getByID, getByActor, getByGenre, getUrls, sortByRating, totalImdbVotes, totalLengthOfMovies, allLanguagues, addMovie, editMovie, deleteMovie};