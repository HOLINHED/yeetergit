const PORT = 5000;

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const monk = require('monk');
const app = express();

const db = monk('localhost/yeeter');
const yeets = db.get('yeets');

app.enable('trust proxy');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Whoops! Wrong page :('
    });
});

app.get('/api', (req, res, next)=>{
    yeets
    .find()
    .then(yeets => {
        res.json(yeets);
    }).catch(next);
});

app.use(rateLimit({
    windowMs: 5 * 1000,
    max: 1
}));

app.post('/api', (req, res, next)=>{

    const yeet = {
        name: req.body.name.toString().trim(),
        content: req.body.content.toString().trim(),
        created: new Date()
    }

    if (yeet.name.toString().trim().length < 50 && yeet.content.toString().trim().length < 250 && yeet.name.toString() != '' && yeet.content.toString() != ''){
        yeets
        .insert(yeet)
        .then(newYeet => {
            res.json(newYeet);
        }).catch(next);
    }else{
        res.status(422);
        res.json({
            message: 'MORE THAN 250 CHARACTERS?!?!?! Totally uncalled for...',
        });
    }
});

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
        message: error.message
    });
  });

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});