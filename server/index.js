const PORT = 5000;

const express = require('express');

const app = express();
const server = app.listen(PORT);

console.log(`started server on ${PORT}`);

//response to / get request
app.get('/', (req, res)=>{
    res.send(JSON.stringify({
        error: 501,
        message: 'Whoopsie Doopsie! To use the API, please use /api'
    }));
});

app.get('/api', (req, res)=>{
    res.send(JSON.stringify({
        message: "Request handled!"
    }));
});