const express = require('express');
const path = require('path');
const moviesRouter = require('./routes/movies');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.resolve('./public')));

app.use('/movies', moviesRouter);


app.all('*', (req, res) => {
    res.status(404).sendFile(path.resolve('./public/notFound.html'));
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
})
