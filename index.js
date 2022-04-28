const express = require('express');
const movies = require('./dataAccess');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    
});

app.post('/', (req, res)=>{
    console.log(req);
    res.send('Got a POST req');
});

app.put('/user', (req, res)=>{
    console.log('Got PUT for user'+ req);
    res.send("Got a PUT req");
});

app.delete('/user', (req, res)=>{
    console.log('Got DELETE for user'+ req);
    res.send("Got a DELETE req");
});

app.listen(port, ()=>{
    console.log(`Server on port ${port}`);
})