const express = require('express');
const { ClientRequest } = require('http');
const movies = require('./dataAccess');
const validator = require('./validationSchemas');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/movies/', (req, res) => {
    res.status(200).json(movies.getAll());
});

app.get('/api/movies/query', (req, res)=>{

    const {genre, actor, imdbSort} = req.query;
    let movieList = movies.getAll();

    if(actor){
        movieList = movieList.filter(movie =>movie.Actors.includes(actor));
    }

    if(genre){
        movieList = movieList.filter(movie =>movie.Genre.includes(genre));
    }
    if(imdbSort){
        if(imdbSort === 'ASC'){
            movieList = movies.sortByRating(true, movieList)
        }
        else if(imdbSort === 'DESC'){
            movieList = movies.sortByRating(true, movieList)
        }
    }

    res.status(200).json(movieList);
    
});

app.get('/api/movies/:imdbID', (req, res)=>{
    const imdbID = req.params.imdbID;
    const movie = movies.getByID(imdbID);
    if(!movie){
        res.status(404).send(`Movie with imdbID of ${imdbID} not found!`);
    }
    res.status(200).json(movie);
});

app.get('/api/movies/data/length', (req, res)=>{
    res.status(200).json(`${movies.totalLengthOfMovies()} min`);
});

app.get('/api/movies/data/urls', (req, res)=>{
    res.status(200).json(movies.getUrls());
});

app.get('/api/movies/data/votes', (req, res)=>{
    res.status(200).json(Number(movies.totalImdbVotes()));
});

app.get('/api/movies/data/languages', (req, res)=>{
    res.status(200).json(movies.allLanguagues());
});


app.post('/api/movies', (req, res)=>{

    const {error} = validator.validMovie.validate(req.body);

    if(error){
        res.status(400).json(error.details);
        return;
    }

    if(movies.addMovie(req.body)){
        res.status(201).send(`/api/movies/${req.body.imdbID}`);
    }
    
    res.status(400).end();
});

app.put('/api/movies', (req, res)=>{

    const {error} = validator.validMovie.validate(req.body);

    if(error){
        res.status(400).json(error.details);
        return;
    }

    const movieID= req.body.imdbID;

    if(movies.getByID(movieID)){
        if(movies.editMovie(req.body)){
            res.status(200).json({
                status: 'ok',
                data: movies.getByID(movieID),
                path: `/api/movies/${req.body.imdbID}`
            });
        }
        return;
    }
    if(movies.addMovie(req.body)){
        res.status(201).json({
            status: 'created',
            data: movies.getByID(movieID),
            path: `/api/movies/${req.body.imdbID}`
        });
        return;
    }
    
    res.status(400).end();
});

app.delete('/api/movies/:imdbID', (req, res)=>{
    const movieID = req.params.imdbID;
    if(movies.deleteMovie(movieID)){
        res.status(200).end();
    }
    res.status(400).end();
});

app.listen(port, ()=>{
    console.log(`Server on port ${port}`);
})

