const PORT = 5000;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});

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