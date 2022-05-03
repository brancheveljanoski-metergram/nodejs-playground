const express = require('express');
const movies = require('./movieManipulation');
const app = express();
const port = 5000;
app.use(express.json());

app.get('/movies/', (req, res) => {
    res.json(movies.getAllMovies());
});

app.get('/movies/filtering', (req, res)=>{
    const {genre, actor, imdbSort} = req.query;
    let allMovies = movies.getAllMovies();
    
    if(genre)
        allMovies = movies.filterByGenre(`${genre}`);

    else if(actor)
        allMovies = movies.filterByActor(`${actor}`);

    else if(imdbSort){
        if(imdbSort === 'DESC'||'desc')
            allMovies = movies.sortByRating(true, allMovies)
        else if(imdbSort === 'ASC'||'asc')
            allMovies = movies.sortByRating(false, allMovies)
    }
    else
        res.send('Invalid filter!')
        
    res.json(allMovies);
});

app.get('/movies/:imdbID', (req, res)=>{
    const id = req.params.imdbID;
    const movie = movies.getSpecificMovie(id);
    res.json(movie);
});

app.get('/movies/information/length', (req, res)=>{
    res.json(`${movies.totalLengthOfAllMovies()}`);
});

app.get('/movies/information/languages', (req, res)=>{
    res.json(movies.allLanguagues());
});

app.get('/movies/information/imdbUrls', (req, res)=>{
    res.json(movies.imdbUrls());
});

app.get('/movies/information/votes', (req, res)=>{
    res.json(movies.totalImdbVotes());
});

app.post('/movies', (req, res)=>{
    if(err) return;
    if(movies.addNewMovie(req.body)){
        res.send(`/movies/${req.body.imdbID}`);
    }
    res.end();
});

app.delete('/movies/:imdbID', (req, res)=>{
    const id = req.params.imdbID;
    if(movies.deleteExistingMovie(id)){
        res.end();
    }
    res.end();
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})