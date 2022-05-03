const fs = require('fs');
let file = './movies.json';
const moviefile = fs.readFileSync(file);
let movies = JSON.parse(moviefile);

function getAllMovies(){
    return movies;
}

function filterByGenre(genre){
    const genreMovies = movies.filter(movie =>movie.Genre.includes(genre));
    genreMovies;
}

function filterByActor(actor){
    const actorMovies = movies.filter(movie =>movie.Actors.includes(actor));
    actorMovies;
}

function sortByRating(isDESC,allMovies){
    let result;
    if(isDESC){
        result=allMovies.sort((x, y) => y.imdbRating - x.imdbRating)
    }else{
        result=allMovies.sort((x, y) => x.imdbRating - y.imdbRating)
    }
    const resultFinal = result.map(m => {return {Title: m.Title, imdbRating: m.imdbRating}})
    return resultFinal;
}

function getSpecificMovie(ID){
    const movie = movies.find(movie => movie.imdbID == ID);
    return movie;
}

function totalLengthOfAllMovies(){
    const result = movies.reduce((sum, movie)=> {
        const length = parseInt(movie.Runtime);
        return length ? length + sum : sum;
    }, 0)
    var num = result;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hours and " + rminutes + " minutes.";
}

function imdbUrls(){
    const imdburls = movies.map(movie => {
        return `https://www.imdb.com/title/${movie.imdbID}/`;
    });
    return imdburls;
}

function totalImdbVotes(){
    const result = movies.reduce((sum, movie) => {
        const votes = parseInt(movie.imdbVotes.replace(/,/g, ''));
        return votes ? votes + sum : sum;
    }, 0);

    return result;
}

function onlyUnique(allLanguages, index, self) { 
    return self.indexOf(allLanguages) === index;
}

function allLanguagues(){
    const allLanguages = movies.reduce((languages, movie)=> {
        return languages.concat(movie.Language.split(", "));
    }, languages = [])
    var unique = allLanguages.filter(onlyUnique);
    return unique;
}

function writeJSON(data){
    fs.writeFile(file, JSON.stringify(data, null, "\t"), (err)=>{
        if(err) 
            return false;
    });

    return true;
}

function addNewMovie(movie){
    if(getSpecificMovie(movie.imdbID) == undefined){
        movies.push(movie);
        if(writeJSON(movies)) {
            return true
        };
    }
    return false;
}

function deleteExistingMovie(id){
    const index = movies.findIndex(m => m.imdbID == id);
    if(index != -1){
        movies.splice(index, 1);
        if(writeJSON(movies)) {
            return true
        };
        return false;
    }
    return false;
}

module.exports = {getAllMovies, filterByActor, filterByGenre, imdbUrls, sortByRating, getSpecificMovie, totalImdbVotes, totalLengthOfAllMovies, allLanguagues, addNewMovie, deleteExistingMovie};
