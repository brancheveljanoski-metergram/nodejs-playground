const express = require('express');
const movies = require('./movieManipulation');
const app = express();
const port = 5000;
app.use(express.json());

app.get('/movies/', (req, res) => {
    res.json(movies.getAllMovies());
});

app.get('/movies/query', (req, res)=>{
    const {genre, actor, imdbSort} = req.query;
    let allMovies = movies.getAllMovies();
    if(genre)
        allMovies = allMovies.filter(m =>m.Genre.includes(genre));

    if(actor)
        allMovies = allMovies.filter(m =>m.Actors.includes(actor));

    if(imdbSort){
        if(imdbSort === 'DESC'||'desc')
            allMovies = movies.sortByRating(true, allMovies)
        else if(imdbSort === 'ASC'||'asc')
            allMovies = movies.sortByRating(false, allMovies)
    }
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