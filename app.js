const express = require('express')
const path = require('path')
const app = express()

const movies = require('./movies.json');


//Gets All Movies 
app.get('/movies', (req,res)=>{
    res.json(movies);
})


//Filter Movies By Genre
app.get('/movies/:genre',(req,res)=>{
    res.json(movies.filter(movie => 
        movie.Genre.includes(req.params.genre)))
})


//Filter Movies By Actor                                                                                            
app.get('/movies/:actor',(req,res)=>{
    const found= movies.some(movie=>movie.Actors.includes(req.params.actor))

    if(found){
        res.json(movies.filter(movie => 
            movie.Actors.includes(req.params.actor)))
    }else{
        res.status(400).json({msg: `No movie with the actor name of ${req.params.actor}`})
    }
})


//Sort Movies By IMDB rating
app.get('/movies/sort',(req,res)=>{

    let sortedMovies;
    sortedMovies=movies.sort((movie1,movie2)=>movie1.imdbRating-movie2.imdbRating)
    //res.json(movies.sort((movie1,movie2)=>movie1.imdbRating-movie2.imdbRating))

    const movieTitleAndRating = sortedMovies.map(movie=>{return{Title: movie.Title, imdbRating: movie.imdbRating}})

    res.json(movieTitleAndRating);


})


//Get Specific Movie By Rating
app.get('/movies/:rating',(req,res)=>{
    res.json(movies.filter(movie => 
        movie.imdbRating == req.params.rating))
})


//Get movies data
app.get('/movies/lenght', (req,res)=>{
    const result = movies.reduce((sum, movie) =>{
        const lenght = parseInt(movie.Runtime);
        return lenght ? lenght + sum : lenght;
    },0)

    res.json(result)
})

app.get('/movies/imdbUrls',(req,res)=>{
    const url = movies.map(movie => {
        return `https://www.imdb.com/title/${movie.imdbID}/`;
    })

    res.json(url);
})

app.get('/movies/votes',(req,res)=>{
    const result = movies.reduce((sum, movie) => {
        const votes = parseInt(movie.imdbVotes.replace(/,/g, ''));
        return votes ? votes + sum : sum;
    }, 0);

    res.json(result)
})

app.get('/movies/languages',(req,res)=>{
    const allLagnuages = movies.reduce((languages, movie)=> {
        return languages.concat(movie.Language.split(", "));
    }, languages = [])

    const unique = [...new Set(allLagnuages)];
    res.json(unique);

})

//Body Parses Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))


//Add New Movie
app.post('/movies',(req,res)=>{
    const newMovie= {
        title: req.body.Title,
        genre: req.body.Genre
    }
    if(!newMovie.title || !newMovie.genre){
        return res.status(400).json({msg: 'Please include a title and genre'})
    }

    movies.push(newMovie)
    res.json(movies)
})


//Edit Existing Movie
app.put('/movies/:title',(req,res)=>{
    const found= movies.some(movie=>movie.Title === req.params.title)

    if(found){
        const updMovie = req.body;
        movies.forEach(movie =>{
            if(movie.Title === req.params.title){
                movie.Title = updMovie.Title ? updMovie.Title : movie.Title;
                movie.Genre = updMovie.Genre ? updMovie.Genre : movie.Genre;

                res.json({msg: 'Movie updated', movie})
            }
        })
    }else{
        res.status(400).json({msg: `No movie with the actor name of ${req.params.title}`})
    }
})


//Delete Existing Movie
app.delete('/movies/:title',(req,res)=>{
    const found= movies.some(movie=>movie.Title === req.params.title)

    if(found){
        res.json({msg: 'Movie deleted', movies: movies.filter(movie => 
            movie.Title !== req.params.title)})
    }else{
        res.status(400).json({msg: `No movie with the title name of ${req.params.title}`})
    }
})

app.listen(1000,()=>{
    console.log('server is listening on port 10000...')
})